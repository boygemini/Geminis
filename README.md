# Stripe Sample Blueprint

This is a repo to help you get started with creating a sample.

1. Clone this repository and add the sample specific logic.

```
git clone https://github.com/stripe-samples/template
```

2. Language specific instructions:

   - Update the Java artifactId to use a specific sample related name. Update the README with the right package name.

3. Update the sample README below and delete this boilerplate text.

4. Update the .cli.json with details on your sample.

5. Update the sample CONTRIBUTING.md file with the correct links and Stripe features.

Below is everything you should include in your original sample README. Everything above should be deleted.

# Name of sample

A brief description of what this sample shows. Keep it 3 - 5 sentences.

A quick screenshot of the demo view:
<img src="https://cf.ltkcdn.net/dogs/images/std/236742-699x450-cutest-puppy-videos.jpg" alt="Preview of sample" align="center">

Features:

- One cool thing about this sample 😃
- Another cool thing about the sample 🏋️
- The final cool thing about the sample 💡

## How to run locally

This sample includes 5 server implementations in Node, Ruby, Python, Java, and PHP.

Follow the steps below to run locally.

**1. Clone and configure the sample**

The Stripe CLI is the fastest way to clone and configure a sample to run locally.

**Using the Stripe CLI**

If you haven't already installed the CLI, follow the [installation steps](https://github.com/stripe/stripe-cli#installation) in the project README. The CLI is useful for cloning samples and locally testing webhooks and Stripe integrations.

In your terminal shell, run the Stripe CLI command to clone the sample:

```
stripe samples create REPLACE-WITH-NAME
```

The CLI will walk you through picking your integration type, server and client languages, and configuring your .env config file with your Stripe API keys.

**Installing and cloning manually**

If you do not want to use the Stripe CLI, you can manually clone and configure the sample yourself:

```
git clone https://github.com/stripe-samples/REPLACE-WITH-NAME
```

Copy the .env.example file into a file named .env in the folder of the server you want to use. For example:

```
cp .env.example server/node/.env
```

You will need a Stripe account in order to run the demo. Once you set up your account, go to the Stripe [developer dashboard](https://stripe.com/docs/development#api-keys) to find your API keys.

```
STRIPE_PUBLISHABLE_KEY=<replace-with-your-publishable-key>
STRIPE_SECRET_KEY=<replace-with-your-secret-key>
```

`STATIC_DIR` tells the server where to the client files are located and does not need to be modified unless you move the server files.

**2. Follow the server instructions on how to run:**

Pick the server language you want and follow the instructions in the server folder README on how to run.

For example, if you want to run the Node server:

```
cd server/node # there's a README in this folder with instructions
npm install
npm start
```

**3. [Optional] Run a webhook locally:**

If you want to test the `using-webhooks` integration with a local webhook on your machine, you can use the Stripe CLI to easily spin one up.

Make sure to [install the CLI](https://stripe.com/docs/stripe-cli) and [link your Stripe account](https://stripe.com/docs/stripe-cli#link-account).

```
stripe listen --forward-to localhost:4242/webhook
```

The CLI will print a webhook secret key to the console. Set `STRIPE_WEBHOOK_SECRET` to this value in your .env file.

You should see events logged in the console where the CLI is running.

When you are ready to create a live webhook endpoint, follow our guide in the docs on [configuring a webhook endpoint in the dashboard](https://stripe.com/docs/webhooks/setup#configure-webhook-settings).

**4. [Mobile clients] Set up the client app:**

Finally, choose a mobile client implementation and follow the instruction in the app's README (e.g. `using-webhooks/client/ios/README.md`) to run.

When the app is running, use `4242424242424242` as a test card number with any CVC code + a future expiration date.

Use the `4000000000003220` test card number to trigger a 3D Secure challenge flow.

Read more about testing on Stripe at https://stripe.com/docs/testing.

## FAQ

Q: Why did you pick these frameworks?

A: We chose the most minimal framework to convey the key Stripe calls and concepts you need to understand. These demos are meant as an educational tool that helps you roadmap how to integrate Stripe within your own system independent of the framework.

## Get support

If you found a bug or want to suggest a new [feature/use case/sample], please [file an issue](../../issues).

If you have questions, comments, or need help with code, we're here to help:

- on [Discord](https://stripe.com/go/developer-chat)
- on Twitter at [@StripeDev](https://twitter.com/StripeDev)
- on Stack Overflow at the [stripe-payments](https://stackoverflow.com/tags/stripe-payments/info) tag

Sign up to [stay updated with developer news](https://go.stripe.global/dev-digest).

## Author(s)

[@adreyfus-stripe](https://twitter.com/adrind)

## Contributing

If you'd like to contribute to this sample, please check out the guidelines in [CONTRIBUTING.md](CONTRIBUTING.md)

## Code of conduct

This repository has a [code of conduct](CODE_OF_CONDUCT.md), please read it before opening an issue or a PR.
