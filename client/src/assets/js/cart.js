"use strict";

(() => {
	let webPage = document.querySelector("html");
	webPage.style.opacity = "1";
	webPage.style.transition = "1s ease-in-out";
})();

let Holder = document.getElementById("orders-in-cart");
let totalCar = document.getElementById("cartsum");
let totalCar2 = document.getElementById("cartsum2");
let totalQuantity = document.getElementById("totalquantity");
let checkButton = document.getElementById("checkout");
let boxModal = document.getElementById("boxmodal");
let AskbuttonDiv = document.getElementById("askbuttondiv");
let Message = document.getElementById("message");

// Button links
const toShop = () => {
	window.location.href = "shop.html";
};

const goHome = () => {
	window.location.href = "index.html";
};

// ITEM COUNTER
let cartCounter = document.getElementById("items-in-cart");

// CLEAR CART
const clearCart = () => {
	localStorage.removeItem("Cart");
	totalQuantity.innerHTML = "0";
	cartCounter.innerText = "0";
	totalCar.innerText = "0";
	// totalCar2.innerText = "0"
	checkButton.disabled = true;
	checkButton.style.opacity = "50%";
	document.getElementById("allTotal").innerText = _item.allTotal();
	Storage.indicateEmptyCart();
};

class Storage {
	// RETRIEVE ITEMS IN CART
	static getFees() {
		return JSON.parse(localStorage.getItem("StoreItems"));
	}

	// RETRIEVE ITEMS IN CART
	static getItemsInCart() {
		return JSON.parse(localStorage.getItem("Cart"));
	}

	// GET THE NUMBER OF ITEMS IN CART
	static numberOfItemsInCart() {
		if (this.getItemsInCart() === null || undefined) {
			return "0";
		} else {
			let mapCart = this.getItemsInCart().map((cI) => cI.amount);
			let reduceCart = mapCart.reduce((x, y) => x + y, 0);
			return reduceCart;
		}
	}

	// EMPTY CART INDICATOR
	static indicateEmptyCart() {
		if (Number(Storage.numberOfItemsInCart()) === 0) {
			Holder.innerHTML = `<div class = "empty-cart"><p>Oopps, your cart is empty 😒</p></div>`;
			Holder.style.justifyContent = "center";
			Holder.style.alignItems = "center";
		}
	}
}

class _item {
	// DISPLAY SUM OF ALL ITEMS
	static sumTotal() {
		let Q2 = document.querySelectorAll("#q2");
		let totalItemPrice = document.querySelectorAll("#price");
		let getbackcart = JSON.parse(localStorage.getItem("Cart"));
		let allTotal = document.getElementById("allTotal");
		for (let i in getbackcart) {
			let sum =
				Number(getbackcart[i].amount) *
				Number(getbackcart[i].itemInfo.newItemPrice);
			getbackcart[i].itemInfo.itemTotal = sum;
			localStorage.Cart = JSON.stringify(getbackcart);
			totalItemPrice[i].innerText = getbackcart[i].itemInfo.itemTotal;
			Q2[i].innerText = getbackcart[i].amount;
			totalCar.innerText = CartItems.sumTotal();
			// totalCar2.innerText = CartItems.sumTotal()
			allTotal.innerText = _item.allTotal();
		}
	}

	static allTotal() {
		return (
			Number(CartItems.sumTotal()) +
			Number(Storage.getFees().taxesAndDeliveryFees[0].deliveryFee) +
			Number(Storage.getFees().taxesAndDeliveryFees[0].tax) -
			(Number(Storage.getFees().taxesAndDeliveryFees[0].discount) / 100) *
				Number(CartItems.sumTotal())
		).toFixed(2);
	}
}

class CartItems {
	// INCREASE QUNTITY OF AN ITEM
	static increaseItem(altheredItemID) {
		let getbackcart = JSON.parse(localStorage.getItem("Cart"));
		let amt = document.querySelectorAll("#amount");
		let itemID = Number(altheredItemID);
		for (let i in getbackcart) {
			if (itemID === Number(getbackcart[i].id)) {
				getbackcart[i].amount += 1;
				amt[i].value = getbackcart[i].amount;
				localStorage.Cart = JSON.stringify(getbackcart);
				cartCounter.innerText = Storage.numberOfItemsInCart();
				totalQuantity.innerText = Storage.numberOfItemsInCart();
				// totalCar2.innerText = CartItems.sumTotal()
			}
			_item.sumTotal(); //
		}
	}

	// DECREASE QUNTITY OF AN ITEM
	static decreaseItem(altheredItemID) {
		let getbackcart = JSON.parse(localStorage.getItem("Cart"));
		let amt = document.querySelectorAll("#amount");
		let itemID = Number(altheredItemID);
		for (let i in getbackcart) {
			if (itemID === Number(getbackcart[i].id)) {
				getbackcart[i].amount -= 1;
				if (getbackcart[i].amount < 1) {
					boxModal.style.display = "flex";
					AskbuttonDiv.innerHTML = `<button class="askbutton no" id="no">No</button><button
                    class="askbutton yes" id="yes">Yes</button>`;
					Message.innerText =
						"🛒 Cart\n\nDo you want to remove this item from cart?";

					yes.addEventListener("click", () => {
						boxModal.style.display = "none";
						return this.removeItem(altheredItemID);
					});

					no.addEventListener("click", () => {
						boxModal.style.display = "none";
					});
					getbackcart[i].amount = 1;
				}
				amt[i].value = getbackcart[i].amount;
				localStorage.Cart = JSON.stringify(getbackcart);
				cartCounter.innerText = Storage.numberOfItemsInCart();
				totalQuantity.innerText = Storage.numberOfItemsInCart();
				// totalCar2.innerText = CartItems.sumTotal()
			}
			_item.sumTotal();
		}
	}

	// REMOVE ITEM FROM CART
	static removeItem(altheredItemID) {
		let getbackcart = JSON.parse(localStorage.getItem("Cart"));
		let itemID = altheredItemID;
		let filteredCart = getbackcart.filter(
			(items) => items.id !== itemID.toString()
		);

		if (filteredCart.length === 0) {
			totalCar.innerText = "0";
			// totalCar2.innerText = "0"
			allTotal.innerText = (
				Number(Storage.getFees().taxesAndDeliveryFees[0].deliveryFee) +
				Number(Storage.getFees().taxesAndDeliveryFees[0].tax)
			).toFixed(2);

			document.getElementById("discount").innerText =
				Storage.getFees().taxesAndDeliveryFees[0].discount;

			document.getElementById("deliveryfee").innerText =
				Storage.getFees().taxesAndDeliveryFees[0].deliveryFee;

			document.getElementById("tax").innerText =
				Storage.getFees().taxesAndDeliveryFees[0].tax;

			checkButton.disabled = true;
			checkButton.style.opacity = "50%";
		} else {
			checkButton.disabled = false;
			checkButton.style.opacity = "100%";
		}

		localStorage.Cart = JSON.stringify(filteredCart);
		cartCounter.innerText = Storage.numberOfItemsInCart();
		totalQuantity.innerText = Storage.numberOfItemsInCart();
		displayItems.CART(Storage.getItemsInCart());
		Storage.indicateEmptyCart();
		_item.sumTotal();
	}

	// CONTROLS THE TOTAL QUANTITY OF A SPECIFIC ITEM
	static updateQuantity(altheredItemID) {
		let getbackcart = JSON.parse(localStorage.getItem("Cart"));
		let inputedAmount = Number(event.target.value);
		let itemID = Number(altheredItemID);
		for (let i in getbackcart) {
			if (itemID === Number(getbackcart[i].id)) {
				if (inputedAmount < 1 || isNaN(inputedAmount)) {
					boxModal.style.display = "flex";
					Message.innerText = "🛒 Cart\n\nBobo, enter a number greater than 0";
					AskbuttonDiv.innerHTML = `<button class="askbutton yes" id="ok">Okay</button>`;

					ok.addEventListener("click", (e) => {
						boxModal.style.display = "none";
					});

					localStorage.Cart = JSON.stringify(getbackcart);
					event.target.value = getbackcart[i].amount;
				}

				if (inputedAmount > 0) {
					getbackcart[i].amount = inputedAmount;
					localStorage.Cart = JSON.stringify(getbackcart);
					cartCounter.innerText = Storage.numberOfItemsInCart();
					totalQuantity.innerText = Storage.numberOfItemsInCart();
				}
			}
		}
		_item.sumTotal();
	}

	// SUM TOTAL OF CART ITEMS
	static sumTotal() {
		let getbackcart = JSON.parse(localStorage.getItem("Cart"));
		if (getbackcart === null || getbackcart.length === 0) {
			return "0";
		}

		if (getbackcart.length !== 0) {
			let filterCart = getbackcart.filter((it) => {
				return it.itemInfo;
			});
			let mappedCart = filterCart.map((item) =>
				Number(item.itemInfo.itemTotal)
			);
			let reducedCart = mappedCart.reduce((x, y) => x + y);
			return reducedCart;
		}
	}
}

class displayItems {
	static CART(category) {
		let itemCreated = "";
		for (let i in category) {
			/* ITEM QUANTITY */
			const getCount = () => {
				return category[i].amount;
			};

			/* ITEM NUMBERING */
			const displayNumbering = () => {
				if (i <= 8) {
					return "0" + (Number(i) + 1);
				}

				if (i > 8) {
					return Number(i) + 1;
				}
			};

			console.log(category[i].itemInfo.itemImg[0]);

			itemCreated += `<div class="order">
      <h1 class = "numbering">${displayNumbering()}</h1>


		<a href="product.html?item=${
			category[i].id
		}" id="img-con" onclick="viewProduct(event)" data-id=${
				category[i].id
			} aria-label="visit product">
			<div id="img-cont"
			style='background-image:url(${category[i].itemInfo.itemImg[0]})' alt=""  >
			</div>
		</a>


        <div class="order-info">
            <div class="info">
                <h1 class="item-name">${category[i].itemInfo.name}</h1>
                <h2 class="item-title">${category[i].itemInfo.description1}</h2>
                <h2>Color : <span> Space Grey</span></h2>
            </div>

			<div class="item-price">
            <div class="item-price-total">
                <span class="currency">$</span><span class="price" id = "price">${
									category[i].itemInfo.itemTotal
								}</span>
            </div>
            <div class="item-price-calc">
                <span id = "q2">${
									category[i].amount
								}</span><span>x</span><span><span>$</span>${
				category[i].itemInfo.newItemPrice
			}</span>
          </div>
        </div>

            <div class="qty">
                <h2>Quantity</h2>
                <div class="quantity">
                    <button onclick = "CartItems.decreaseItem(${
											category[i].id
										})">-</button><input type="text" value="${getCount()}" aria-labelledby="quantity" aria-label="quantity" id = "amount" onblur = "CartItems.updateQuantity(${
				category[i].id
			})"><button onclick = "CartItems.increaseItem(${
				category[i].id
			})">+</button>
                </div>
            </div>


        </div>
			<div class="save-delete">
                <h2>Save for later</h2>
                <h2 class="delete" onclick = "CartItems.removeItem(${
									category[i].id
								})">Delete</h2>
            </div>
      </div>`;
		}
		Holder.innerHTML = itemCreated;
	}
}

// DISPLAY NUMBER OF ITEMS IN CART
cartCounter.innerText = Storage.numberOfItemsInCart();
totalQuantity.innerText = Storage.numberOfItemsInCart();

// DISPLAY SUBTOTAL
// totalCar2.innerText = CartItems.sumTotal()
totalCar.innerText = CartItems.sumTotal();

// DISPLAY THE SERVICE FEES AND CHARGES
discount.innerText = Storage.getFees().taxesAndDeliveryFees[0].discount;
tax.innerText = Storage.getFees().taxesAndDeliveryFees[0].tax;
deliveryfee.innerText = Storage.getFees().taxesAndDeliveryFees[0].deliveryFee;

// DISPLAY ALL OVERALL TOTAL
allTotal.innerText = _item.allTotal();

// SUMMARISE CART DETAILS FORM CHECKOUT
const toCheckOut = () => {
	let cartSummary = {
		total: _item.allTotal(),
		subtotal: CartItems.sumTotal(),
		deliveryfee: 3,
	};
	localStorage.setItem("cartSummary", JSON.stringify(cartSummary));
	window.location.href = "checkout.html";
};

// INDICATE IF CART IS EMPTY
Storage.indicateEmptyCart();

// DISABLE CHECKOUT BUTTON IF CART IS EMPTY
let getbackcart = JSON.parse(localStorage.getItem("Cart"));
try {
	if (getbackcart === null) {
		checkButton.disabled = true;
		checkButton.style.opacity = "50%";
	}

	if (getbackcart.length === 0) {
		checkButton.disabled = true;
		checkButton.style.opacity = "50%";
	}

	if (getbackcart.length > 0) {
		checkButton.disabled = false;
		checkButton.style.opacity = "100%";
	}
} catch (error) {}

// DISPLAY ITEMS IN CART IF IT IS NOT EMPTY
if (Number(Storage.numberOfItemsInCart()) !== 0) {
	displayItems.CART(Storage.getItemsInCart());
}

// DISPLAY SUM OF ONE ITEM
_item.sumTotal();
