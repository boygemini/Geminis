"use strict";

const heroImageDOM = document.getElementById("hero-img");
const heroTextDOM = document.getElementById("hero-text");
const dot = document.querySelectorAll(".slide-circle");
const forwardSlideButton = document.getElementById("sl-fwd");
const backwardSlideButton = document.getElementById("sl-bwd");
let fadeInTime = 5000;
let fadeOutTime = fadeInTime - 300;
const heroText = [
	"THE WORLD OF GADGETS",
	"CHECK OUT THE LATEST iPHONE 14",
	"SAMSUNG 72 INCH SMART TV AT LOVELY PRICE",
	"CHECK OUT THE NEW SAMSUNG S9",
	"SAMSUNG 72 INCH SMART TV AT LOVELY PRICE",
	"SAMSUNG 72 INCH SMART TV AT LOVELY PRICE",
];

const heroImg = [
	"images/ntv.png",
	"images/ngame.png",
	"images/sa-tv.png",
	"images/asus-sys.png",
	"images/s9.png",
	"images/headset.png",
];

let counter = 0;
heroImageDOM.src = heroImg[0];
dot[0].className += " active-dot";
const changeSlide = (chosenSlide) => {
	fadeInTime = 5000;

	if (chosenSlide) {
		counter = chosenSlide - 1;
	} else {
		counter >= heroImg.length - 1 ? (counter = 0) : counter++;
	}
	heroImageDOM.src = heroImg[counter];
	heroTextDOM.innerText = heroText[counter];
	heroImageDOM.className += " fadein";
	heroTextDOM.className += " fadein";
	dot.forEach((d) => (d.className = d.className.replace("active-dot", "")));
	dot[counter].className += " active-dot";

	setTimeout(() => {
		heroImageDOM.className = heroImageDOM.className.replace(
			"fadein",
			" fadeout"
		);
		heroTextDOM.className = heroTextDOM.className.replace("fadein", " fadeout");
	}, fadeOutTime);
};

setInterval(() => {
	changeSlide();
}, fadeInTime);

// forwardSlideButton.addEventListener("click", (e) => {
// 	counter++
// 	changeSlide(counter)
// });

const shopNow = () => {
	window.location = "gemshop.html";
};

// SELECTED FOR YOU
let itemName = document.querySelectorAll("#itemName"),
	mainDesc = document.querySelectorAll("#maindesc"),
	minDesc = document.querySelectorAll("#mindesc"),
	oldPrice = document.querySelectorAll("#oldprice"),
	newPrice = document.querySelectorAll("#newprice");

/* CREATING STORAGE GROUPS FOR ITEMS */
localStorage.setItem("StoreItems", "");
let cart = [];

// POPUP NOTIFICATION
const popupNotification = (itemName, itemImage) => {
	let notification = document.getElementById("notify-box");
	let creatNotBox = document.createElement("div");
	creatNotBox.classList = " notification on";
	creatNotBox.innerHTML = `<img src=${itemImage} alt="" srcset="" class="noti-img"><p>You added <strong id="itemname">${itemName}</strong> to cart</p>`;
	notification.appendChild(creatNotBox);
	setTimeout(() => {
		creatNotBox.classList = " notification off";
	}, 2500);
	setTimeout(() => {
		creatNotBox.classList = "complete-off";
	}, 3200);
	setTimeout(() => {
		creatNotBox.classList = "die";
	}, 3200);
};

class Products {
	// LOAD ALL PRODUCTS AND SAVE THEM TO THE LOCALSTORAGE
	static selectedForYou() {
		let product_request = new XMLHttpRequest();
		product_request.open("GET", "product.json", false);
		product_request.onload = function () {
			if (product_request.status === 200) {
				localStorage.StoreItems = this.responseText;
			}
		};
		product_request.send();
	}

	// RETRIEVE ALL ITEMS FROM LOCAL STORAGE
	static getSelectedProducts() {
		return JSON.parse(localStorage.StoreItems);
	}
}

class Storage {
	// RETRIEVE RETRIEVE ALL ITEMS TOTAL PRODUCTS
	static getAllProducts() {
		return JSON.parse(localStorage.getItem("StoreItems"));
	}

	// RETRIEVE RECENTLY ADDED ITEMS FROM TOTAL PRODUCTS
	static getRecentItems() {
		return this.getAllProducts().recentlyAdded;
	}

	// RETRIEVE WEEKLY FEATURE ITEMS FROM TOAL PRODUCTS
	static weeklyFeaturedItems() {
		return this.getAllProducts().WeeklyFeatured;
	}

	// SAVE ITEMS TO CART
	static saveSelectedItemsToCart(cart) {
		localStorage.Cart = JSON.stringify(cart);
		localStorage.setItem("Cart", localStorage.Cart);
	}

	// RETRIEVE ALL ITEMS FROM CART
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

	// UPDATE CART
	static updateCart(cartName) {
		this.saveSelectedItemsToCart(cartName);
		cartDom.innerText = this.numberOfItemsInCart();
	}

	// GET AND SAVE PICKED ITEM TO CART
	static getItemAndSaveToCart() {
		let getbackcart = JSON.parse(localStorage.getItem("Cart"));

		if (cart === null || cart.length === 0) {
			cart = [pickedItem];
			this.updateCart(cart);
		}

		if (cart !== null || cart.length !== 0) {
			let pickedItemID = event.target.dataset.id;
			let check = getbackcart.find((item) => item.id === pickedItemID);

			if (check) {
				check.amount += 1;
				this.updateCart(getbackcart);
			}

			if (!check) {
				getbackcart = [...getbackcart, pickedItem];
				this.updateCart(getbackcart);
			}
		}
	}
}

class displayProduct {
	// DISPLAY SELECTED FOR YOU ITEMS
	static createItem(event, holderClass, category, sub) {
		let itemCreated = " ";
		let Holder = document.querySelector(holderClass);
		for (let i in category) {
			itemCreated += `<div class="sell-box sel-box" data-id=${category[i].id} onclick = "viewProduct(event)">
		<div class="img-con">
		    <img src=${category[i].itemInfo.itemImg[0]} alt="">
		</div>
		<div class="sfu">
		    <p class="itemName2"">${category[i].itemInfo.name}</p>
		    <div class="description-box">
			   <p class="item-description">${category[i].itemInfo.description1}</p>
			   <p class="item-description">${category[i].itemInfo.description2}</p>
		    </div>
		    <div class="price-order">
			   <span class="price-box">
				  <span class="price"><span class="currency" id="currency">$</span>${category[i].itemInfo.newItemPrice}</span>
				  <span class="old-price price">${category[i].itemInfo.oldItemPrice}</span>
			   </span>
			   <button id="cart-btn" class="cart-btn" ><img id="addto-cart-img" src="/IMAGES/add-to-cart.png" alt="" data-id=${category[i].id} data-category =${sub} onclick = "addToCart(event,Storage.getAllProducts().selectedProducts[0])"></button>
		    </div>
		</div>
	 </div>`;
		}
		Holder.innerHTML = itemCreated;
		let viewAll = document.querySelector(".view-all");
		try {
			viewAll.id = event.target.id;
			viewAll.innerText = `View All ${sub}`;
		} catch (error) {}
	}

	// DISPLAY RECENTLY ADDED ITEMS
	static displayRecentItems(category, sub) {
		let itemCreated = "";
		let Holder = document.getElementById("holder-rec");
		for (let i in category) {
			itemCreated += `<div class="sell-box sel-box" id="recbox" data-id=${category[i].id} onclick = "viewProduct(event)">
		<div class="img-con">
		    <img src=${category[i].itemInfo.itemImg[0]} alt="">
		</div>
		<div class="sfu">
		    <p class="itemName2"">${category[i].itemInfo.name}</p>
		    <div class="description-box">
			   <p class="item-description">${category[i].itemInfo.description1}</p>
			   <p class="item-description">${category[i].itemInfo.description2}</p>
		    </div>
		    <div class="price-order">
			   <span class="price-box">
				  <span class="price"><span class="currency" id="currency">$</span>${category[i].itemInfo.newItemPrice}</span>
				  <span class="old-price price">${category[i].itemInfo.oldItemPrice}</span>
			   </span>
			   <button id="cart-btn" class="cart-btn" ><img id="addto-cart-img" src="/IMAGES/add-to-cart.png" alt="" data-id= ${category[i].id} data-category= "${sub}" onclick= "addToCartt(event,Storage.getAllProducts().recentlyAdded)"></button>
		    </div>
		</div>
	 </div>`;
		}
		Holder.innerHTML = itemCreated;
	}

	// DISPLAY WEEKLY FEATURED ITEM
	static displayWeeklyFeatured(category, sub) {
		let itemCreated = "";
		let Holder = document.querySelector(".Weekly-Container");
		for (let i in category) {
			itemCreated += `<div class="sell-box sel-box" data-id=${category[i].id} onclick = "viewProduct(event)">
		<div class="img-con">
		    <img src=${category[i].itemInfo.itemImg[0]} alt="">
		</div>
		<div class="sfu">
		    <p class="itemName2"">${category[i].itemInfo.name}</p>
		    <div class="description-box">
			   <p class="item-description">${category[i].itemInfo.description1}</p>
			   <p class="item-description">${category[i].itemInfo.description2}</p>
		    </div>
		    <div class="price-order">
			   <span class="price-box">
				  <span class="price"><span class="currency" id="currency">$</span>${category[i].itemInfo.newItemPrice}</span>
				  <span class="old-price price">${category[i].itemInfo.oldItemPrice}</span>
			   </span>
			   <button id="cart-btn" class="cart-btn" ><img id="addto-cart-img" src="/IMAGES/add-to-cart.png" alt="" data-id= ${category[i].id} data-category="${sub}" onclick= "addToCartt(event,Storage.getAllProducts().WeeklyFeatured)"></button>
		    </div>
		</div>
	 </div>`;
		}
		Holder.innerHTML = itemCreated;
	}
}

// DISPLAY SELECTED PRODUCTS
Products.selectedForYou();

// DISPLAY RECENT PRODUCTS
displayProduct.displayRecentItems(Storage.getRecentItems());

// DISPLAYS GAMING ITEMS BY DEFAULT
displayProduct.createItem(
	event,
	"#sel-container",
	Products.getSelectedProducts().selectedProducts[0].gaming,
	"gaming"
);

// DISPLAY WEEKLY PRODUCTS
displayProduct.displayWeeklyFeatured(Storage.weeklyFeaturedItems());

// VIEW CLICKED PRODUCT
const viewProduct = (event) => {
	let itemID =
		event.target.dataset.id ||
		event.target.parentNode.dataset.id ||
		event.target.parentNode.parentNode.dataset.id ||
		event.target.parentNode.parentNode.parentNode.dataset.id;
	if (itemID) {
		let url = `product.html?item=${encodeURIComponent(itemID)}`;
		window.location = url;
	}
};

// ADD RECENT ITEMS TO CART
const addToCartt = (event, ITT) => {
	event.stopPropagation();

	function Me() {
		let pickItemFromStore = ITT.find(
			(item) => item.id === event.target.dataset.id
		);
		popupNotification(
			pickItemFromStore.itemInfo.name,
			pickItemFromStore.itemInfo.itemImg[0]
		);
		pickedItem = {
			...pickItemFromStore,
			amount: 1,
		};
		if (pickItemFromStore) {
			try {
				Storage.getItemAndSaveToCart();
			} catch (error) {}
		}
	}
	Me();
};

// CHANGE TABS BASED ON ITEM'S CATEGORY
let tab = [...document.querySelectorAll(".tab")];
tab[0].className += " active-li";
for (let x in tab) {
	tab[x].addEventListener("click", (event) => {
		tab[0].className = tab[0].className.replace(" active-li", "");
		for (let y in tab) {
			tab[y].classList.remove("active-li");
		}
		event.target.className += " active-li";
	});
}

// ADD SELECTED ITEMS TO CART
let cartDom = document.getElementById("items-in-cart");
try {
	cartDom.innerText = Storage.numberOfItemsInCart();
} catch (error) {} // Displays number of Items in Cart
let pickedItem;

let ItemsInCart = JSON.parse(localStorage.getItem("Cart"));
const addToCart = (event, ITT) => {
	event.stopPropagation();
	let ItemCategory = event.target.dataset.category;
	let pickItemFromStore = ITT[`${ItemCategory}`].find(
		(item) => item.id === event.target.dataset.id
	);
	popupNotification(
		pickItemFromStore.itemInfo.name,
		pickItemFromStore.itemInfo.itemImg[0]
	);
	pickedItem = {
		...pickItemFromStore,
		amount: 1,
	};
	if (pickItemFromStore) {
		try {
			Storage.getItemAndSaveToCart();
		} catch (error) {
			console.log(error);
		}
	}
};

// SELECTED FOR YOU SLIDER
let boxCounter = 0;
let container = document.getElementById("sel-container");
let holder = document.getElementById("sel-holder");
let box = [...document.querySelectorAll(".sell-box")];

const moveRight = () => {
	holder.scrollLeft += holder.clientWidth;
};

const moveLeft = () => {
	holder.scrollLeft -= holder.clientWidth;
};

// MENU
let menu = document.getElementById("menu"),
	mb = document.getElementById("mb");
let close = document.querySelectorAll("#close");
menu.style.display = "none";

const removePadding = () => {
	menu.style.height = "0px";
	menu.style.padding = "0px";
};

// OPEN MENU
const openMenu = (e) => {
	menu.style.display = "flex";
	removePadding();
	setTimeout(() => {
		menu.style.paddingTop = "20px";
		menu.style.height = "400px";
	}, 20);
};

// CLOSE MENU
const closeMenu = () => {
	removePadding();
	setTimeout(() => {
		menu.style.display = "none";
	}, 520);
};

document.addEventListener("click", (e) => {
	if (e.target !== menu && menu.clientHeight > 0) {
		removePadding();
	}
});

console.log("Test : code ran successfully [OK]");
//END OF CODE
//END OF CODE
//END OF CODE
