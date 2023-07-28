const express = require("express");
const cors = require("cors");

const app = express();

app.use(
	cors({
		origin: "https://geminis.vercel.app",
		methods: ["POST", "GET"],
		credentials: true,
	})
);

const { resolve } = require("path");

// Replace if using a different env file or config
const env = require("dotenv").config({ path: "./.env" });

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
	apiVersion: "2020-08-27",
	appInfo: {
		// For sample support and debugging, not required for production:
		name: "stripe-samples/<your-sample-name>",
		version: "0.0.1",
		url: "https://github.com/stripe-samples",
	},
});

const PORT = process.env.PORT || 3000;

// app.use(express.static(process.env.STATIC_DIR));

app.use(
	express.json({
		// We need the raw body to verify webhook signatures.
		// Let's compute it only when hitting the Stripe webhook endpoint.
		verify: function (req, res, buf) {
			if (req.originalUrl.startsWith("/webhook")) {
				req.rawBody = buf.toString();
			}
		},
	})
);

app.get("/", (req, res) => {
	// const path = resolve(process.env.STATIC_DIR);
	// res.sendFile(path);
	res.json("sorry🧐, but you are in the wrong place🤷🏾‍♂️..");
});

app.get("/config", (req, res) => {
	res.send({
		publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
	});
});

app.post("/create-payment-intent", async (req, res) => {
	const { totalItemPrice } = await req.body;
	const paymentIntent = await stripe.paymentIntents.create({
		amount: totalItemPrice,
		currency: "usd",
		automatic_payment_methods: { enabled: true },
	});

	res.send({ clientSecret: paymentIntent.client_secret });
});

// Expose a endpoint as a webhook handler for asynchronous events.
// Configure your webhook in the stripe developer dashboard
// https://dashboard.stripe.com/test/webhooks
app.post("/webhook", async (req, res) => {
	let data, eventType;

	// Check if webhook signing is configured.
	if (process.env.STRIPE_WEBHOOK_SECRET) {
		// Retrieve the event by verifying the signature using the raw body and secret.
		let event;
		let signature = req.headers["stripe-signature"];
		try {
			event = stripe.webhooks.constructEvent(
				req.rawBody,
				signature,
				process.env.STRIPE_WEBHOOK_SECRET
			);
		} catch (err) {
			console.log(`⚠️  Webhook signature verification failed.`);
			return res.sendStatus(400);
		}
		data = event.data;
		eventType = event.type;
	} else {
		// Webhook signing is recommended, but if the secret is not configured in `config.js`,
		// we can retrieve the event data directly from the request body.
		data = req.body.data;
		eventType = req.body.type;
	}

	if (eventType === "payment_intent.succeeded") {
		// Funds have been captured
		// Fulfill any orders, e-mail receipts, etc
		// To cancel the payment after capture you will need to issue a Refund (https://stripe.com/docs/api/refunds)
		console.log("💰 Payment captured!");
	} else if (eventType === "payment_intent.payment_failed") {
		console.log("❌ Payment failed.");
	}
	res.sendStatus(200);
});

app.listen(PORT, () =>
	console.log(`Node server listening at http://localhost:${PORT}`)
);
