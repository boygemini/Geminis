(() => {
	let webPage = document.querySelector("html");
	webPage.style.opacity = "1";
	webPage.style.transition = "1s ease-in-out";
})();

const originalCart = JSON.parse(localStorage.getItem("Cart"));
let itemsInCart = JSON.parse(localStorage.getItem("Cart"));

let lastPage;
try {
	lastPage = new URL(document.referrer);
	if (lastPage.pathname === "/product.html") {
		itemsInCart = [JSON.parse(localStorage.getItem("buy"))];
	}
} catch (error) {}

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
const form = [...document.querySelectorAll(".fs")];
const errorMessage = document.getElementById("error-message");
const thankYouPage = document.querySelector(".orders-in-cart");
const thankYouPageOriginalHeight = thankYouPage.clientHeight;
const formStage = [
	"Shipping Information",
	"Billing Infomation",
	"Review",
	"Payment",
	"Confirmation",
];

const formStateDOM = document.querySelector(".form-stage");

const cartSummary = JSON.parse(localStorage.getItem("cartSummary"));
const shoppingDetailsDOM = document.getElementById("shopping-details");
const subTotal = document.getElementById("sub-total");
const deliveryFee = document.getElementById("del-fee");
const cartTotal = document.getElementById("total");
const numberOfItemsInCart = document.getElementById("items-in-cart");

// Steps indicator
const completionCircles = [...document.querySelectorAll(".circle")];
let progressBar = document.getElementById("progress-bar");
const markComplete = (step) => {
	if (step < 4) {
		progressBar.style.width = `${(step + 1) * 25}%`;
		completionCircles[step + 1].className += " next-stage";
	} else {
		completionCircles[step].className += " next-stage";
	}
	console.log(step);
	// formStateDOM.innerText = formStage[step + 2];
	// formStateDOM.innerText = formStage[step];
	completionCircles[step].classList.remove("next-stage");
	completionCircles[step].className += " completed";
	completionCircles[step].innerHTML =
		"<img class='check-image' src='assets/images/check-mark.png'></img>";
};

const unMarkComplete = (step) => {
	progressBar.style.width = `${step * 25}%`;
	completionCircles[step + 1].classList.remove("next-stage");
	completionCircles[step].className = "circle";
	completionCircles[step].innerHTML = `<h1>${step + 1}</h1>`;
	setTimeout(() => {
		completionCircles[step].className += " next-stage";
	}, 0);
	// formStateDOM.innerText = formStage[step - 1];
};

const animatFormForward = () => {
	formSlide.className += " formfadout";
	setTimeout(() => {
		formSlide.className = formSlide.className.replace(
			"formfadout",
			"formfadin"
		);
	}, 400);

	setTimeout(() => {
		formSlide.classList.remove("formfadout", "formfadin");
	}, 1500);
};

const animateFormBackword = () => {
	formSlide.className += " reverseformout";

	setTimeout(() => {
		formSlide.className = formSlide.className.replace(
			"reverseformout",
			"reverseformin"
		);
	}, 400);

	setTimeout(() => {
		formSlide.classList.remove("reverseformout", "reverseformin");
	}, 1500);
};

// set form width to the parent container width
let complete = 0;
const displayForm = (counter) => {
	let lastFormHeight = formContainer.scrollHeight;
	setTimeout(() => {
		complete = counter;
		form.forEach((form) => {
			form.style.display = "none";
		});

		form[counter].style.display = "flex";
		formContainer.style.height = lastFormHeight + "px";
		setTimeout(() => {
			formContainer.style.height = form[counter].scrollHeight + "px";
		}, 1);
	}, 400);
};

const back = () => {
	window.scrollTo(0, 0);
	if (complete <= 0) {
		complete = 0;
	} else {
		animateFormBackword();
		complete -= 1;
	}

	if (complete <= count) {
		count = complete;
	}

	removeError();
	unMarkComplete(complete + 1);
	displayForm(complete);
	continueButton.innerText = "Continue";
};

const displayError = (message) => {
	errorMessage.innerText = message;
	errorMessage.style.display = "block";
	setTimeout(() => {
		errorMessage.style.opacity = "1";
	}, 200);
	errorMessage.parentElement.style.height = "auto";
};

const removeError = () => {
	errorMessage.style.opacity = "0";
	setTimeout(() => {
		errorMessage.style.display = "none";
	}, 200);
	errorMessage.parentElement.style.height = "auto";
};

form.forEach((form) => {
	form.style.display = "none";
});
form[0].style.display = "flex";

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
		displayError(error.message);
		continueButton.innerText = "Make Payment";
	} else {
		removeError();
		displayForm(4);
		markComplete(4);
		continueButton.innerText = "Continue Shopping";
		continueButton.style.width = "100%";
		prevFormButton.style.display = "none";

		continueButton.addEventListener("click", (e) => {
			window.location.href = "shop.html";
		});

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
	formContainer.style.height = "auto";
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
	window.scrollTo(0, 0);
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
		filterFilledFields.forEach((box) => {
			box.style.border = ".5px solid #090a0a5f";
			box.previousElementSibling.style.color = "";
		});
	};

	const inputEmpty = (filterEmptyFields) => {
		filterEmptyFields.forEach((box) => {
			box.style.border = ".5px solid red";
			box.previousElementSibling.style.color = "red";
		});
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
				f.previousElementSibling.style.color = "";
				removeError();
			});
		});

		if (filterEmptyFields.length === 0) {
			inputGood(filterFilledFields);
			removeError();
			formContainer.scrollLeft += formContainer.clientWidth;

			count++;
			markComplete(count);
			displayForm(count);
			animatFormForward();
			if (count === 2) {
				displayForm(2);
				customerInformationReview(customerInfo);
			}
		}

		if (filterEmptyFields.length > 0) {
			displayError("Error : one or more field(s) is empty");
			inputEmpty(filterEmptyFields);
		}
	};

	if (form[0].style.display === "flex") {
		validateForm(".address1");
		return;
	}

	if (form[1].style.display === "flex") {
		validateForm(".address2");
		return;
	}

	if (form[2].style.display === "flex") {
		loadPaymentElement();
		validateForm();
		displayForm(3);
		markComplete(3);
		animatFormForward();
		return;
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
		window.location.href = "shop.html";
	});
	// prevFormButton.style.display = "none";
}

let x = "";
if (itemsInCart !== null) {
	continueShoppingBtn.addEventListener("click", (e) => {
		window.location.href = "shop.html";
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
continueButton.addEventListener("click", checkFields);
prevFormButton.addEventListener("click", back);
markComplete(0);
