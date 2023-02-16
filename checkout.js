const originalCart = JSON.parse(localStorage.getItem("Cart"));
let itemsInCart = JSON.parse(localStorage.getItem("Cart"));

const lastPage = new URL(document.referrer);
if (lastPage.pathname === "/product.html") {
	itemsInCart = [JSON.parse(localStorage.getItem("buy"))];
}

const shippingName = document.getElementById("ship-name");
const shippingStreetAddress = document.getElementById("ship-add1");
const shippingAddress2 = document.getElementById("ship-add2");
const shippingCity = document.getElementById("ship-city");
const shippingState = document.getElementById("ship-state");
const shippingZipcode = document.getElementById("ship-zipcode");
const shippingCountry = document.getElementById("ship-country");
const shippingPhone = document.getElementById("ship-phone");

const billingName = document.getElementById("bill-name");
const billingStreetAddress = document.getElementById("bill-add1");
const billingAddress2 = document.getElementById("bill-add2");
const billingCity = document.getElementById("bill-city");
const billingState = document.getElementById("bill-state");
const billingZipcode = document.getElementById("bill-zipcode");
const billingCountry = document.getElementById("bill-country");
const billingPhone = document.getElementById("bill-phone");
const shippingAddressDOM = document.querySelector(".shipping");
const billingAddressDOM = document.querySelector(".billing");

const formSteps = [...document.querySelectorAll("sec")];
const comText = [...document.querySelectorAll(".com-text")];
const continueButton = document.getElementById("next");
const prevFormButton = document.getElementById("prev");
const continueShoppingBtn = document.getElementById("continue");
const formContainer = document.querySelector(".orders-in-cart");
const formSlide = document.getElementById("formslide");
const form = document.querySelectorAll(".fs");
const errorMessage = document.getElementById("error-message");
const thankYouPage = document.querySelector(".orders-in-cart");
const thankYouPageOriginalHeight = thankYouPage.clientHeight;

const cartSummary = JSON.parse(localStorage.getItem("cartSummary"));
const shoppingDetailsDOM = document.getElementById("shopping-details");
const subTotal = document.getElementById("sub-total");
const deliveryFee = document.getElementById("del-fee");
const cartTotal = document.getElementById("total");
const numberOfItemsInCart = document.getElementById("items-in-cart");

// Steps indicator
const completionCircles = [...document.querySelectorAll(".circle")];
const markComplete = (step) => {
	completionCircles[step].className += " completed";
	completionCircles[step].innerHTML =
		"<img class='check-image' src='IMAGES/check-mark.png'></img>";
	comText[step].className += " comtext";
};

const unMarkComplete = (step) => {
	completionCircles[step].className = completionCircles[step].className.replace(
		"completed",
		""
	);
	comText[step].className = comText[step].className.replace("comtext", "");
	completionCircles[step].innerHTML = `<h1>${step + 1}</h1>`;
};

// validate for and proceed
const proceed = (e) => {
	checkFields(e);
};

const back = () => {
	let complete = formContainer.scrollLeft / formContainer.clientWidth;
	count <= 0 ? (count = 0) : (count -= 1);
	complete <= 0 ? (complete = 1) : null;
	unMarkComplete(complete);
	formContainer.scrollLeft -= formContainer.clientWidth;
	continueButton.innerText = "Continue";
};

// Match shipping information with billing information
const matchButton = document.getElementById("matchaddress");
matchButton.addEventListener("click", (e) => {
	if (e.target.checked === true) {
		billingName.value = shippingName.value;
		billingStreetAddress.value = shippingStreetAddress.value;
		billingAddress2.value = shippingAddress2.value;
		billingCity.value = shippingCity.value;
		billingState.value = shippingState.value;
		billingZipcode.value = shippingZipcode.value;
		billingCountry.value = shippingCountry.value;
		billingPhone.value = shippingPhone.value;
	} else {
		billingName.value = "";
		billingStreetAddress.value = "";
		billingAddress2.value = "";
		billingCity.value = "";
		billingState.value = "";
		billingZipcode.value = "";
		billingCountry.value = "";
		billingPhone.value = "";
	}
});

// set form width to the parent container width
const animateForm = (counter) => {
	formSlide.style.height = form[counter].scrollHeight + "px";
};

form.forEach((f) => {
	f.style.width = formContainer.clientWidth + "px";
});
formSlide.style.height = form[0].scrollHeight + "px";

// Load stripe payment element and make payment

const confirmPayment = async (elements, _stripe) => {
	const stripe = _stripe;
	const { error } = await stripe.confirmPayment({
		elements,
		confirmParams: {
			// return_url: window.location.origin + "/thank-you.html",
		},
		redirect: "if_required",
	});

	if (error) {
		errorMessage.innerText = error.message;
		errorMessage.style.opacity = "1";
	} else {
		// thankYouPage.style.height = thankYouPageOriginalHeight + "px";
		formContainer.scrollLeft += formContainer.clientWidth * 4;
		continueButton.innerText = "Continue Shopping";
		// prevFormButton.style.display = "none";
		continueButton.addEventListener("click", (e) => {
			window.location.href = "gemshop.html";
		});
		markComplete(4);

		if (lastPage.pathname === "/product.html") {
			localStorage.removeItem("buy");
		} else {
			localStorage.removeItem("Cart");
			numberOfItemsInCart.innerText = 0;
			prevFormButton.style.display = "none";
		}
	}
};

const loadPaymentElement = async (e) => {
	continueButton.innerText = "Please wait...";
	const totalItemPrice = Number(cartSummary.total * 100).toFixed();
	const { publishableKey } = await fetch("/config").then((r) => r.json());
	const stripe = Stripe(publishableKey);

	const { clientSecret } = await fetch("/create-payment-intent", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			totalItemPrice: totalItemPrice,
		}),
	}).then((r) => r.json());

	const elements = await stripe.elements({ clientSecret });
	const paymentElement = elements.create("payment");
	paymentElement.mount("#payment-element");
	continueButton.innerText = "Make Payment";
	continueButton.addEventListener("click", () => {
		continueButton.innerText = "Processing...";
		confirmPayment(elements, stripe);
	});
};

const customerInformationReview = (customerInfo) => {
	shippingAddressDOM.innerHTML = `
				<h1>Shipping Information</h1>
				<p class="name">${customerInfo.shippingInformation.name}</p>
				<p class="s-details">
					${customerInfo.shippingInformation.streetAddress},
					${customerInfo.shippingInformation.streetAddress2}<br>
					${customerInfo.shippingInformation.city},
					${customerInfo.shippingInformation.state},
					${customerInfo.shippingInformation.zipcode},
					${customerInfo.shippingInformation.country}.
				</p>
				<div style="display: flex; column-gap: 10px">
					<p class="s-details">${customerInfo.shippingInformation.phone}</p>
				</div>`;
	billingAddressDOM.innerHTML = `
				<h1>Billing Information</h1>
				<p class="name">${customerInfo.billingInformation.name}</p>
				<p class="s-details">
					${customerInfo.billingInformation.streetAddress},
					${customerInfo.billingInformation.streetAddress2}<br>
					${customerInfo.billingInformation.city},
					${customerInfo.billingInformation.state},
					${customerInfo.billingInformation.zipcode},
					${customerInfo.billingInformation.country}.
				</p>
				<div style="display: flex; column-gap: 10px">
					<p class="s-details">${customerInfo.billingInformation.phone}</p>
				</div>`;
};

let count = 0;
const checkFields = (e) => {
	const customerInfo = {
		shippingInformation: {
			name: shippingName.value,
			streetAddress: shippingStreetAddress.value,
			streetAddress2: shippingAddress2.value,
			city: shippingCity.value,
			state: shippingState.value,
			zipcode: shippingZipcode.value,
			country: shippingCountry.value,
			phone: shippingPhone.value,
		},
		billingInformation: {
			name: billingName.value,
			streetAddress: billingStreetAddress.value,
			streetAddress2: billingAddress2.value,
			city: billingCity.value,
			state: billingState.value,
			zipcode: billingZipcode.value,
			country: billingCountry.value,
			phone: billingPhone.value,
		},
	};

	const inputGood = (filterFilledFields) => {
		filterFilledFields.forEach(
			(box) => (box.style.border = ".5px solid #090a0a5f")
		);
	};

	const inputEmpty = (filterEmptyFields) => {
		filterEmptyFields.forEach((box) => (box.style.border = ".5px solid red"));
	};

	const validateForm = (fields) => {
		const currentFields = [...document.querySelectorAll(fields)];
		const filterEmptyFields = currentFields.filter(
			(ad) => ad.value.length == 0
		);
		const filterFilledFields = currentFields.filter(
			(ad) => ad.value.length > 0
		);

		inputGood(filterFilledFields);

		currentFields.forEach((f) => {
			f.addEventListener("input", (e) => {
				f.style.border = ".5px solid #090a0a5f";
				errorMessage.style.opacity = "0";
			});
		});

		if (filterEmptyFields.length === 0) {
			inputGood(filterFilledFields);
			errorMessage.style.opacity = "0";
			formContainer.scrollLeft += formContainer.clientWidth;

			count++;
			markComplete(count);
			if (count === 2) {
				customerInformationReview(customerInfo);
				animateForm(2);
			}
		}

		if (filterEmptyFields.length > 0) {
			errorMessage.style.opacity = "1";
			errorMessage.innerText = "Error : one or more field(s) is empty";
			inputEmpty(filterEmptyFields);
		}
	};

	if (formContainer.scrollLeft === 0) {
		validateForm(".address1");
		animateForm(1);
	}

	if (formContainer.scrollLeft === formContainer.clientWidth) {
		validateForm(".address2");
	}

	if (formContainer.scrollLeft === formContainer.clientWidth * 2) {
		formSlide.style.height = " auto";
		loadPaymentElement();
		validateForm()
	}
};

subTotal.innerText = cartSummary.subtotal;
deliveryFee.innerText = cartSummary.deliveryfee;
cartTotal.innerText = cartSummary.total;

if (itemsInCart === null) {
	numberOfItemsInCart.innerText = 0;
	formContainer.innerHTML =
		"<div class='checkout-unavailable'><h1>Opps, check out is unavailable at the moment, please add some items to cart</h1><div>";
	continueButton.innerText = "Go to Shop";
	continueShoppingBtn.style.display = "none";
	continueButton.addEventListener("click", (e) => {
		window.location.href = "gemshop.html";
	});
	// prevFormButton.style.display = "none";
}

let x = "";
if (itemsInCart !== null) {
	continueShoppingBtn.addEventListener("click", (e) => {
		window.location.href = "gemshop.html";
	});

	try {
		let totalitemsnumber = originalCart
			.map((amt) => amt.amount)
			.reduce((x, y) => x + y, 0);
		numberOfItemsInCart.innerText = totalitemsnumber;
	} catch (error) {}

	for (let item of itemsInCart) {
		x += `<li>
			<div class="iitem">
				<span class='itemamount'>${item.amount} x</span>
				<img src=${item.itemInfo.itemImg[0]} alt="" /><span
					class="item-name"
					>${item.itemInfo.name}</span
				>
			</div>
		</li>`;
	}
}

shoppingDetailsDOM.innerHTML = x;
continueButton.addEventListener("click", proceed);
prevFormButton.addEventListener("click", back);
markComplete(0);
