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
	if (lastPage.pathname.includes("/product")) {
		itemsInCart = [JSON.parse(localStorage.getItem("buy"))];
	}
} catch (error) {}

const shippingName = document.getElementById("SHIPPINGname");
const shippingStreetAddress = document.getElementById("SHIPPINGadd1");
const shippingAddress2 = document.getElementById("SHIPPINGadd2");
const shippingCity = document.getElementById("SHIPPINGcity");
const shippingState = document.getElementById("SHIPPINGstate");
const shippingZipcode = document.getElementById("SHIPPINGzipcode");
const shippingCountry = document.getElementById("SHIPPINGcountry");
const shippingPhone = document.getElementById("SHIPPINGphone");

const billingName = document.getElementById("BILLINGname");
const billingStreetAddress = document.getElementById("BILLINGadd1");
const billingAddress2 = document.getElementById("BILLINGadd2");
const billingCity = document.getElementById("BILLINGcity");
const billingState = document.getElementById("BILLINGstate");
const billingZipcode = document.getElementById("BILLINGzipcode");
const billingCountry = document.getElementById("BILLINGcountry");
const billingPhone = document.getElementById("BILLINGphone");
const shippingAddressDOM = document.querySelector(".shipping");
const billingAddressDOM = document.querySelector(".billing");

const formSteps = [...document.querySelectorAll("sec")];
const comText = [...document.querySelectorAll(".com-text")];
const continueButton = document.getElementById("next");
const prevFormButton = document.getElementById("prev");
const continueShoppingBtn = document.getElementById("continue");
const formContainer = document.querySelector(".orders-in-cart");
const formSlide = document.getElementById("formslide");
const form = document.getElementById("form");
const errorMessage = document.getElementById("error-message");
const thankYouPage = document.querySelector(".orders-in-cart");
const thankYouPageOriginalHeight = thankYouPage.clientHeight;

const formStateDOM = document.querySelector(".form-stage");

const cartSummary = JSON.parse(localStorage.getItem("cartSummary"));
const shoppingDetailsDOM = document.getElementById("shopping-details");
const subTotal = document.getElementById("sub-total");
const deliveryFee = document.getElementById("del-fee");
const cartTotal = document.getElementById("total");
const numberOfItemsInCart = document.getElementById("items-in-cart");

const pages = [
	`<div id="shipping" class="fs sec stepps shipping-info">
								<h1>Shipping Information</h1>
								<span class="inputed-info"
									>Please enter your shipping information</span
								>
								<div class="flex-form">
									<div class="form-group">
										<div class="form-field">
											<label for="">Contact Name</label>
											<input
												type="text"
												name="SHIPPINGname"
												id="SHIPPINGname"
												placeholder="Contact Name"
												class="address"
												value="Jake Erler" />
										</div>
										<div class="form-field">
											<label for="">Street Address</label>
											<input
												class="address"
												type="text"
												name="SHIPPINGadd1"
												id="SHIPPINGadd1"
												value="1304 Martin Luther King Dr"
												placeholder="" />
										</div>
										<div class="form-field">
											<label for="">Street Address 2</label>
											<input
												type="text"
												class=""
												name="SHIPPINGadd2"
												id="SHIPPINGadd2"
												value=""
												placeholder="Address 2" />
										</div>
										<div class="form-field">
											<label for="City">City</label>
											<input
												type="text"
												class="address"
												name="SHIPPINGcity"
												id="SHIPPINGcity"
												value="Baton Rouge"
												placeholder="City" />
										</div>
									</div>
									<div class="form-group">
										<div class="form-field">
											<label for="">State</label>
											<input
												type="text"
												class="address"
												name="SHIPPINGstate"
												id="SHIPPINGstate"
												value="Colorado"
												placeholder="State" />
										</div>
										<div class="form-field">
											<label for="">Zipcode</label>
											<input
												type="text"
												class="address"
												name="SHIPPINGzipcode"
												id="SHIPPINGzipcode"
												value="11002"
												placeholder="Zipode" />
										</div>
										<div class="form-field">
											<label for="">Country</label>
											<input
												type="text"
												class="address"
												name="SHIPPINGcountry"
												id="SHIPPINGcountry"
												value="USA"
												placeholder="Country" />
										</div>
										<div class="form-field">
											<label for="">Mobile Number</label>
											<input
												class="address"
												type="text"
												name="SHIPPINGphone"
												id="SHIPPINGphone"
												value="8188828891"
												placeholder="Mobile Number" />
										</div>
									</div>
								</div>
								<div class="check-b">
									<label class="option container">
										<input onClick="${() => same()}"" type="checkbox" name="" id="matchaddress" />
										<span class="checkmark"></span>
										<p class="checck">Same as Billing Address</p>
									</label>
								</div>
								<div id="billing" class="fs sec stepps shipping-info">
									<h1>Billing Information</h1>
									<span class="inputed-info"
										>Please enter your billing information</span
									>

									<div class="flex-form">
										<div class="form-group">
											<div class="form-field">
												<label for="">Contact Name</label>
												<input
													type="text"
													name="BILLINGname"
													id="BILLINGname"
													placeholder="Contact Name"
													class="address" />
											</div>
											<div class="form-field">
												<label for="">Street Address</label>
												<input
													class="address"
													type="text"
													name="BILLINGadd1"
													id="BILLINGadd1"
													placeholder="Street Address" />
											</div>
											<div class="form-field">
												<label for="">Street Address 2</label>
												<input
													type="text"
													class=""
													name="BILLINGadd2"
													id="BILLINGadd2"
													placeholder="Address 2" />
											</div>
											<div class="form-field">
												<label for="City">City</label>
												<input
													type="text"
													class="address"
													name="BILLINGcity"
													id="BILLINGcity"
													placeholder="City" />
											</div>
										</div>
										<div class="form-group">
											<div class="form-field">
												<label for="">State</label>
												<input
													type="text"
													class="address"
													name="BILLINGstate"
													id="BILLINGstate"
													placeholder="State" />
											</div>
											<div class="form-field">
												<label for="">Zipcode</label>
												<input
													type="text"
													class="address"
													name="BILLINGzipcode"
													id="BILLINGzipcode"
													placeholder="Zipode" />
											</div>
											<div class="form-field">
												<label for="">Country</label>
												<input
													type="text"
													class="address"
													name="BILLINGcountry"
													id="BILLINGcountry"
													placeholder="Country" />
											</div>
											<div class="form-field">
												<label for="">Mobile Number</label>
												<input
													class="address"
													type="text"
													name="BILLINGphone"
													id="BILLINGphone"
													placeholder="Mobile Number" />
											</div>
										</div>
									</div>
								</div>
							</div>`,
	`<div id="review" class="fs stepps payment-info">
								<div class="inputed-info"></div>
								<div class="form-section">
									<div class="sec credit-card psec">
										<h1 class="pi">Review your information</h1>
										<div class="review">
											<div class="address">
												<div class="ads shipping" id="ads"></div>
												<div class="ads billing" id="ads"></div>
											</div>
											<div class="total-review">
												<span class="shipp">Shopping details</span>
												<div class="item-box">
													<ul id="shopping-details"></ul>
												</div>
												<div class="finalbreakdown">
													<div class="brkdiv">
														<h1 id="tt">Subtotal</h1>
														<h1 id="tt">$ <span id="sub-total">${cartSummary?.subtotal}</span></h1>
													</div>
													<div class="brkdiv">
														<h1 id="tt">Delivery Fee</h1>
														<h1 id="tt">$ <span id="del-fee">${cartSummary?.deliveryfee}</span></h1>
													</div>
													<sub>10% Discount</sub>
													<hr />
													<div class="brkdiv total">
														<h1 id="tt2">Total</h1>
														<h1 id="tt2">$ <span id="total">${cartSummary?.total}</span></h1>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>`,
	`<div id="payment" class="fs stepps payment-info">
								<div class="inputed-info"></div>
								<div class="form-section">
									<div id="credit-card" class="sec credit-card psec">
										<h1 class="pi">Payment Information</h1>
										<div class="card-form">
											<form action="" id="payment-form">
												<div id="payment-element"><h1>Loading...</h1></div>
												<!-- <button id="payButton" class="check-out"></button> -->
											</form>
										</div>
									</div>
								</div>
							</div>`,
	`
    <div class="fs sec confirmation-code">

								<div class="thank-you-content">
								<h1 class="ordercom">Order Completed</h1>
									<img src="assets/images/order.png" alt="" />
									<div class="confirm-note">
										<h1>Thank you!</h1>
										<p>
											Your order has been placed. Your confirmation code is
											<strong>A25GJE200OD93J24</strong>
										</p>
									</div>
								</div>
							</div>`,
];

let allInputs;
form.addEventListener("submit", (e) => {
	e.preventDefault();
	if (count === 1) {
		allInputs = Object.fromEntries(new FormData(e.target));
	}
});

// Options for the observer (observe changes to child elements and their attributes)
const observerOptions = {
	childList: true, // Watch for changes in the child elements (content changes)
	attributes: true, // Watch for changes in attributes (e.g., size or style changes)
	subtree: true, // Watch for changes in the entire subtree of the container
};

// Callback function to execute when a mutation is observed
function debounce(func, time) {
	let id;

	return function (...args) {
		if (id) {
			clearTimeout(id);
		}

		id = setTimeout(() => {
			func.apply(this, args);
		}, time);
	};
}

function same() {
	console.log("Same clicked");
}

const mutationCallback = function (mutationsList, observer) {
	for (const mutation of mutationsList) {
		if (
			mutation.type === "childList" ||
			mutation.type === "attributes" ||
			mutation.type === "subtree"
		) {
			let check = () => {
				formContainer.style.height = `${
					document.querySelector(".sec").offsetHeight + 30
				}px`;
			};
			debounce(()=>check(), 100)()
		}
	}
};

// Create a new MutationObserver and start observing the container
const observer = new MutationObserver(mutationCallback);
observer.observe(formContainer, observerOptions);

// Steps indicator
const completionCircles = [...document.querySelectorAll(".circle")];
let progressBar = document.getElementById("progress-bar");
const markComplete = (step) => {
	if (step < 3) {
		progressBar.style.width = `${(step + 1) * 33}%`;
		completionCircles[step + 1].className += " next-stage";
	} else {
		completionCircles[step].className += " next-stage";
	}
	completionCircles[step].classList.remove("next-stage");
	completionCircles[step].className += " completed";
	completionCircles[step].innerHTML =
		"<img class='check-image' src='assets/images/check-mark.png'></img>";
};

const unMarkComplete = (step) => {
	progressBar.style.width = `${step * 33}%`;
	completionCircles[step + 1].classList.remove("next-stage");
	completionCircles[step].className = "circle";
	completionCircles[step].innerHTML = `<h1>${step + 1}</h1>`;
	setTimeout(() => {
		completionCircles[step].className += " next-stage";
	}, 0);
};

const element = document.getElementById("orders-in-cart");
const animate = gsap;
const animatFormForward = () => {
	let distance = element.clientWidth;
	animate.to(element, { opacity: 0, duration: 0.2 });
	animate.to(element, { x: distance / 2, opacity: 0 }, ">50%");
	animate.to(element, { opacity: 1, x: 0 }, ">");
};

const animateFormBackword = () => {
	let distance = element.clientWidth;
	animate.to(element, { opacity: 0, duration: 0.2 });
	animate.to(element, { x: -distance / 2, opacity: 0 }, ">50%");
	animate.to(element, { opacity: 1, x: 0 }, ">");
};

// set form width to the parent container width
let complete = 0;
const displayForm = (counter) => {
	setTimeout(() => {
		complete = counter;
		formContainer.innerHTML = pages[counter];
		const matchAddressCheckbox = document.getElementById("matchaddress");
		if (matchAddressCheckbox)
			matchAddressCheckbox.onclick = (e) => matchInfo(e);
	}, 400);
};

const back = () => {
	setTimeout(()=>console.log(count),1000)
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
	if (count === 1) setTimeout(()=>displayShippingInfo(count), 400);
	continueButton.innerText = "Continue";
};

const displayError = (message) => {
	errorMessage.innerText = message;
	errorMessage.style.opacity = "1";
	errorMessage.parentElement.style.height = "auto";
};

const removeError = () => {
	errorMessage.style.opacity = "0";
	// errorMessage?.parentElement.style.height = "auto";
};

formContainer.innerHTML = pages[0];
formContainer.style.opacity = "1";
document.getElementById("matchaddress").onclick = (e) => matchInfo(e);

// Match shipping information with billing information
function matchInfo(e) {
	document.getElementById("billing").style.display = document.getElementById(
		"matchaddress"
	).checked
		? "none"
		: "flex";

	if (e.target.checked === true) {
		document.getElementById("BILLINGname").value =
			document.getElementById("SHIPPINGname").value;
		document.getElementById("BILLINGadd1").value =
			document.getElementById("SHIPPINGadd1").value;
		document.getElementById("BILLINGadd2").value =
			document.getElementById("SHIPPINGadd2").value;
		document.getElementById("BILLINGcity").value =
			document.getElementById("SHIPPINGcity").value;
		document.getElementById("BILLINGstate").value =
			document.getElementById("SHIPPINGstate").value;
		document.getElementById("BILLINGzipcode").value =
			document.getElementById("SHIPPINGzipcode").value;
		document.getElementById("BILLINGcountry").value =
			document.getElementById("SHIPPINGcountry").value;
		document.getElementById("BILLINGphone").value =
			document.getElementById("SHIPPINGphone").value;
	} else {
		document.getElementById("BILLINGname").value = "";
		document.getElementById("BILLINGadd1").value = "";
		document.getElementById("BILLINGadd2").value = "";
		document.getElementById("BILLINGcity").value = "";
		document.getElementById("BILLINGstate").value = "";
		document.getElementById("BILLINGzipcode").value = "";
		document.getElementById("BILLINGcountry").value = "";
		document.getElementById("BILLINGphone").value = "";
	}
}

// Load stripe payment element and make payment

const confirmPayment = async (elements, _stripe) => {
	const stripe = _stripe;
	const { error } = await stripe.confirmPayment({
		elements,
		confirmParams: {
			// return_url: window.location.origin + "/thank-you",
		},
		redirect: "if_required",
	});

	if (error) {
		displayError(error.message);
		continueButton.innerText = "Pay";
	} else {
		removeError();
		displayForm(3);
		markComplete(3);
		animatFormForward();
		continueButton.innerText = "Continue Shopping";
		continueButton.style.width = "100%";
		prevFormButton.style.display = "none";

		continueButton.addEventListener("click", (e) => {
			window.location.href = "shop";
		});

		localStorage.removeItem("cartSummary");
		if (lastPage.pathname === "/product") {
			localStorage.removeItem("buy");
		} else {
			localStorage.removeItem("Cart");
			numberOfItemsInCart.innerText = 0;
		}
	}
};

const loadPaymentElement = async (e) => {
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

	continueButton.innerText = "Pay";
	continueButton.onclick = () => {
		if(count === 2) {
			continueButton.innerText = "Processing...";
			confirmPayment(elements, stripe)
		}
	};

};
const customerInformationReview = (customerInfo) => {
	let saved = JSON.parse(sessionStorage.getItem("customerInfo"));

	document.querySelector(".billing").innerHTML = `
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

	document.querySelector(".shipping").innerHTML = `
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
};

const displayShippingInfo = (count) => {
	let customerInfo;
	let saved =
		JSON.parse(sessionStorage.getItem("customerInfo")) === null
			? false
			: JSON.parse(sessionStorage.getItem("customerInfo"));
	window.scrollTo(0, 0);
	const {
		SHIPPINGname,
		SHIPPINGadd1,
		SHIPPINGadd2,
		SHIPPINGcity,
		SHIPPINGstate,
		SHIPPINGcountry,
		SHIPPINGzipcode,
		SHIPPINGphone,
		BILLINGname,
		BILLINGadd1,
		BILLINGadd2,
		BILLINGcity,
		BILLINGstate,
		BILLINGzipcode,
		BILLINGcountry,
		BILLINGphone,
	} = allInputs;

	customerInfo = {
		shippingInformation: {
			name: SHIPPINGname || saved.shippingInformation.name,
			streetAddress: SHIPPINGadd1 || saved.shippingInformation.streetAddress,
			streetAddress2:
				SHIPPINGadd2 || saved.shippingInformation?.streetAddress2 || "",
			city: SHIPPINGcity || saved.shippingInformation.city,
			state: SHIPPINGstate || saved.shippingInformation.state,
			zipcode: SHIPPINGzipcode || saved.shippingInformation.zipcode,
			country: SHIPPINGcountry || saved.shippingInformation.country,
			phone: SHIPPINGphone || saved.shippingInformation.phone,
		},
		billingInformation: {
			name: BILLINGname || saved.billingInformation.name,
			streetAddress: BILLINGadd1 || saved.billingInformation.streetAddress,
			streetAddress2:
				BILLINGadd2 || saved.billingInformation?.streetAddress2 || "",
			city: BILLINGcity || saved.billingInformation.city,
			state: BILLINGstate || saved.billingInformation.state,
			zipcode: BILLINGzipcode || saved.billingInformation.zipcode,
			country: BILLINGcountry || saved.billingInformation.country,
			phone: BILLINGphone || saved.billingInformation.phone,
		},
	};

	let x = "";
	if (itemsInCart !== null) {
		continueShoppingBtn.addEventListener("click", (e) => {
			window.location.href = "shop";
		});

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

	document.getElementById("shopping-details").innerHTML = x;
	customerInformationReview(customerInfo);
	sessionStorage.setItem("customerInfo", JSON.stringify(customerInfo));
};

let count = 0;
const checkFields = (e) => {

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

	const validateForm = () => {
		const currentFields = [...document.querySelectorAll(".address")];
		let filterEmptyFields, filterFilledFields;

		if (count === 0) {
			filterEmptyFields = currentFields.filter((ad) => ad.value.length === 0);
			filterFilledFields = currentFields.filter((ad) => ad.value.length > 0);
		}

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

			count++;
			markComplete(count);
			animatFormForward();
			displayForm(count);
			setTimeout(()=>displayShippingInfo(count), 400);

		}

		if (filterEmptyFields.length > 0) {
			displayError("Error : one or more field(s) is empty");
			inputEmpty(filterEmptyFields);
		}
	};

	if (count === 0) {
		validateForm();
		return;
	}

	if (count === 1) {
		debounce(() => {
			count = 2
			loadPaymentElement() }, 500)()
		displayForm(2);
		markComplete(2);
		animatFormForward();
		return;
	}


};

try {
	let totalitemsnumber = originalCart
		.map((amt) => amt.amount)
		.reduce((x, y) => x + y, 0);
	numberOfItemsInCart.innerText = totalitemsnumber;
} catch (error) {}

try {
	subTotal.innerText = cartSummary.subtotal;
	deliveryFee.innerText = cartSummary.deliveryfee;
	cartTotal.innerText = cartSummary.total;
} catch (error) {}

if (itemsInCart === null) {
	numberOfItemsInCart.innerText = 0;

}

if (cartSummary === null) {
	formContainer.innerHTML =
		"<div class='checkout-unavailable'><h1>Opps, check out is unavailable at the moment, please add some items to cart</h1><div>";
	continueButton.innerText = "Go to Shop";
	prevFormButton.style.display = "none";
	document.querySelector(".progress").style.display = "none";
	continueButton.addEventListener("click", (e) => {
		window.location.href = "shop";
	});
}

continueButton.addEventListener("click", checkFields);
prevFormButton.addEventListener("click", back);
markComplete(0);
