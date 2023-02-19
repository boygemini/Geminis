"use strict";

(() => {
	let webPage = document.querySelector("html");
	webPage.style.opacity = "1";
	webPage.style.transition = "1s ease-in-out";
})();

const shopNow = () => {
	window.location = "gemshop.html";
};

// OPEN MENU
const menuDOM = document.getElementById("menu");
const menuBtn = document.getElementById("mainBtn");
menuDOM.style.display = "none";

const openMenu = () => {
	menuDOM.style.display = "block";
	if (menuDOM.className.includes("menuout")) {
		menuDOM.className = menuDOM.className.replace("menuout", " menuin");
	} else {
		menuDOM.className += " menuin";
	}
	document.lastChild.style.overflow = "hidden"; // Disables the window scrolling
};

// CLOSE MENU
const closeMenu = () => {
	menuDOM.className = menuDOM.className.replace("menuin", " menuout");
	setTimeout(() => (menuDOM.style.display = "none"), 450);
	document.lastChild.style.overflow = "scroll"; // Enables the window scrolling
};

// CLOSES MENU IF ANY AREA OUTSIDE THE MENU BOX GETS CLICKED
window.addEventListener("click", (e) => {
	if (menuDOM.style.display === "block") {
		let parent =
			e.target.parentNode.parentNode.parentNode.parentNode === menuDOM ||
			e.target.parentNode.parentNode.parentNode === menuDOM ||
			e.target.parentNode.parentNode === menuDOM ||
			e.target.parentNode === menuDOM;

		if (!parent && e.target !== menuBtn) {
			closeMenu();
		}
	}
});

// GRIDS
const grids = [...document.querySelectorAll(".shade")];
const gridTextDOM = document.querySelectorAll(".cat-text");
let headerTextHeight;
gridTextDOM.forEach((grid) => {
	headerTextHeight = grid.childNodes[1].scrollHeight;
	grid.style.height = headerTextHeight + "px";
});

for (let i in grids) {
	grids[i].addEventListener(
		"mousemove",
		(e) => {
			gridTextDOM[i].style.height = `${gridTextDOM[i].scrollHeight}px`;
		},
		false
	);

	grids[i].addEventListener(
		"mouseout",
		(e) => {
			gridTextDOM[i].style.height =
				grids[i].childNodes[1].childNodes[1].scrollHeight + "px";
		},
		false
	);
}

// ITEMS STORAGE AND DISPLAY
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
	creatNotBox.innerHTML = `<div><img src=${itemImage} alt="" srcset="" class="noti-img"><p>You added <strong id="itemname">${itemName}</strong> to Cart</p></div> <button class="gotocart">Cart</button>`;
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
	static numainBtnerOfItemsInCart() {
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
		cartDom.innerText = this.numainBtnerOfItemsInCart();
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
		for (let i = 0; i <= 9; i++) {
			itemCreated += `<a href="product.html?item=${category[i].id}" class="sell-box sel-box" data-id=${category[i].id}>

		<div class="img-con" id="main-con">
				<div class="img-cont" style='background-image:url(${category[i].itemInfo.itemImg[0]})'>

				</div>
				</div>
		<div class="sfu">
		    <p class="itemName2"">${category[i].itemInfo.name}</p>
		    <div class="description-box">
			   <p class="item-description">${category[i].itemInfo.description1}</p>
			   <p class="item-description">${category[i].itemInfo.description2}</p>
		    </div>
		    <div class="price-order">
			   <span class="price-box">
				  <span class="price">$${category[i].itemInfo.newItemPrice}</span>
				  <span class="old-price price">${category[i].itemInfo.oldItemPrice}</span>
			   </span>
			<button id="cart-btn" class="cart-btn" data-id=${category[i].id} data-category =${sub} onclick = "addToCart(event,Storage.getAllProducts().selectedProducts[0])">
			<img id="addto-cart-img" src="IMAGES/add-cart-white.png" alt="" data-id=${category[i].id} data-category =${sub} onclick = "addToCart(event,Storage.getAllProducts().selectedProducts[0])">
			<p data-id=${category[i].id} data-category =${sub} onclick = "addToCart(event,Storage.getAllProducts().selectedProducts[0])" id="cart-text"> Add to Cart<p></button>
		    </div>
		</div>
	 </a>`;
		}

		if (Holder.className.includes("fadein")) {
			Holder.className = Holder.className.replace("fadein", "fadeout");
		} else {
			Holder.classList.add("fadeout");
		}

		setTimeout(() => {
			setTimeout(() => {
				Holder.innerHTML = itemCreated;
				let viewAll = document.querySelector(".view-all");
				try {
				} catch (error) {}
			}, 0);
			Holder.className = Holder.className.replace("fadeout", "fadein");
			Holder.parentNode.scrollLeft = 0;
		}, 400);
	}

	// DISPLAY RECENTLY ADDED ITEMS
	static displayRecentItems(category, sub) {
		let itemCreated = "";
		let Holder = document.getElementById("holder-rec");
		for (let i in category) {
			itemCreated += `<a href="product.html?item=${category[i].id}" class="sell-box sel-box" id="recbox" data-id=${category[i].id} onclick = "viewProduct(event)">
				<div class="img-con" id="rec-con">
				<div class="img-cont" style='background-image:url(${category[i].itemInfo.itemImg[0]})'>

				</div>
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
					   <button id="cart-btn" class="cart-btn" data-id= ${category[i].id} data-category= "${sub}" onclick= "addToCartt(event,Storage.getAllProducts().recentlyAdded)">
					   <img id="addto-cart-img" src="IMAGES/add-cart-white.png" alt="" data-id= ${category[i].id} data-category= "${sub}" onclick= "addToCartt(event,Storage.getAllProducts().recentlyAdded)">
					 	<p id="cart-text" data-id= ${category[i].id} data-category= "${sub}" onclick= "addToCartt(event,Storage.getAllProducts().recentlyAdded)"> Add to Cart<p></button>
					   </button>
				    </div>
				</div>
			 </a>`;

			// itemCreated += `<div class="recent">
			// 					<img src=${category[i].itemInfo.itemImg[0]} alt="" />
			// 					<div class="receInfo">
			// 						<div class="rec-det">
			// 							<h1 class="itemName">${category[i].itemInfo.name}</h1>
			// 							<p class="itemInfo">${category[i].itemInfo.description1}</p>
			// 						</div>
			// 						<div class="price-order">
			// 							<span class="recentPrice">$${category[i].itemInfo.newItemPrice}</span>
			// 							<button id="cart-btn" class="cart-btn" ><img id="addto-cart-img" src="/IMAGES/add-to-cart.png" alt="" data-id= ${category[i].id} data-category= "${sub}" onclick= "addToCartt(event,Storage.getAllProducts().recentlyAdded)"></button>
			// 						</div>
			// 					</div>
			// 				</div>`;
		}
		Holder.innerHTML = itemCreated;
	}

	// DISPLAY WEEKLY FEATURED ITEM
	static displayWeeklyFeatured(category, sub) {
		let itemCreated = "";
		let Holder = document.querySelector(".Weekly-Container");
		for (let i in category) {
			itemCreated += `<a href="product.html?item=${category[i].id}" class="sell-box sel-box" data-id=${category[i].id} onclick = "viewProduct(event)">
		<div class="img-con" id="wk-con">
				<div class="img-cont" style='background-image:url(${category[i].itemInfo.itemImg[0]})'></div>

		</div>
		<div class="sfu">
		    <p class="itemName2"">${category[i].itemInfo.name}</p>
		    <div class="description-box">
			   <p class="item-description">${category[i].itemInfo.description1}</p>
			   <p class="item-description">${category[i].itemInfo.description2}</p>
		    </div>
		    <div class="price-order">
			   <span class="price-box">
				  <span class="price">$${category[i].itemInfo.newItemPrice}</span>
				  <span class="old-price price">${category[i].itemInfo.oldItemPrice}</span>
			   </span>
			   <button id="cart-btn" class="cart-btn" data-id= ${category[i].id} data-category="${sub}" onclick= "addToCartt(event,Storage.getAllProducts().WeeklyFeatured)">
			   <img id="addto-cart-img" src="IMAGES/add-cart-white.png" alt="" data-id= ${category[i].id} data-category="${sub}" onclick= "addToCartt(event,Storage.getAllProducts().WeeklyFeatured)">
			 	<p id="cart-text" data-id= ${category[i].id} data-category="${sub}" onclick= "addToCartt(event,Storage.getAllProducts().WeeklyFeatured)"> Add to Cart<p></button>
			   </button>
		    </div>
		</div>
	 </a>`;
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

// SELECTED FOR YOU SLIDER
let holder = document.getElementById("sel-holder");
let leftArrow = document.getElementById("leftArrow");
let rightArrow = document.getElementById("rightArrow");

const slideControls = () => {
	if (holder.offsetWidth + holder.scrollLeft >= holder.scrollWidth) {
		rightArrow.style.display = "none";
	} else {
		rightArrow.style.display = "flex";
	}

	if (holder.scrollLeft <= 0) {
		leftArrow.style.display = "none";
	} else {
		leftArrow.style.display = "flex";
	}
};

slideControls();
holder.addEventListener("scroll", slideControls);

const moveRight = () => {
	holder.scrollLeft += holder.clientWidth;
};

const moveLeft = () => {
	holder.scrollLeft -= holder.clientWidth;
};

// ADD RECENT ITEMS TO CART
const addToCartt = (event, ITT) => {
	event.stopPropagation();
	event.preventDefault();

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
	cartDom.innerText = Storage.numainBtnerOfItemsInCart();
} catch (error) {} // Displays numainBtner of Items in Cart
let pickedItem;

let ItemsInCart = JSON.parse(localStorage.getItem("Cart"));
const addToCart = (event, ITT) => {
	event.stopPropagation();
	event.preventDefault();

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

	let cartButtonText = event.target.children[1] || event.target;
	let mainBtn = event.target.parentNode || event.target;
	cartButtonText.style.opacity = "0";
	cartButtonText.style.transition = ".2s";
	setTimeout(() => {
		cartButtonText.innerText = "In cart";
		cartButtonText.style.opacity = "1";
	}, 200);

	if (mainBtn.nodeName === "BUTTON") {
		mainBtn.onmouseout = function () {
			setTimeout(() => {
				cartButtonText.innerText = "Add to cart";
			}, 200);
		};
	}
};

console.log("Test : code ran successfully [OK]");
//END OF CODE
//END OF CODE
//END OF CODE
