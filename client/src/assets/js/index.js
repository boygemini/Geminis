"use strict";

// PAGE FADE-IN ON LOAD
(() => {
	let webPage = document.querySelector("html");
	webPage.style.opacity = "1";
	webPage.style.transition = "1s ease-in-out";
})();

// GO TO SHOP BUTTON
const shopNow = () => {
	window.location = "shop.html";
};

// GRIDS
const grids = [...document.querySelectorAll(".shade")];
const gridBtn = document.querySelectorAll(".gridbtn");
const gridTextDOM = document.querySelectorAll(".cat-text");
if (document.lastChild.offsetWidth > 768) {
	grids[2].parentElement.style.width = "100%";
	grids.forEach((grid) => {
		grid.addEventListener("mouseover", (e) => {
			for (let i in grids) {
				grids[i].parentElement.style.width = "10%";
				grids[i].children[1].style.display = "none";
			}
			grid.children[1].style.display = "flex";
			grid.parentElement.style.width = "100%";
		});
	});
}

// ITEMS STORAGE AND DISPLAY
let itemName = document.querySelectorAll("#itemName"),
	mainDesc = document.querySelectorAll("#maindesc"),
	minDesc = document.querySelectorAll("#mindesc"),
	oldPrice = document.querySelectorAll("#oldprice"),
	newPrice = document.querySelectorAll("#newprice");

/* CREATING STORAGE GROUPS FOR ITEMS */
localStorage.setItem("StoreItems", "");

class Products {
	// LOAD ALL PRODUCTS AND SAVE THEM TO THE LOCALSTORAGE
	static selectedForYou() {
		return new Promise((resolve, reject) => {
			resolve(
				fetch("../product.json", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				})
					.then((response) => {
						return response.json();
					})
					.then((products) => {
						localStorage.setItem("StoreItems", JSON.stringify(products));
						return products;
					})
			);
		});
	}

	// RETRIEVE ALL ITEMS FROM LOCAL STORAGE
	static async getSelectedProducts() {
		let products = await Products.selectedForYou();
		return products;
	}
}

// RETRUN AND SAVE ALL PRODUCTS IN BROWSER'S LOCAL STORAGE
Products.getSelectedProducts();

class Storage {
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
		    </div>
		    <div class="price-order">
			   <span class="price-box">
				  <span class="price">$${category[i].itemInfo.newItemPrice}</span>
				  <span class="old-price price">${category[i].itemInfo.oldItemPrice}</span>
			   </span>
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
			itemCreated += `<a href="product.html?item=${category[i].id}" class="sell-box sel-box" id=${i} data-id=${category[i].id} onclick = "viewProduct(event)">
				<div class="img-con" id="rec-con">
				<div class="img-cont" style='background-image:url(${category[i].itemInfo.itemImg[0]})'>

				</div>
				</div>
				<div class="sfu">
				    <p class="itemName2"">${category[i].itemInfo.name}</p>
				    <div class="description-box">
					   <p class="item-description">${category[i].itemInfo.description1}</p>
				    </div>
				    <div class="price-order">
					   <span class="price-box">
						  <span class="price"><span class="currency" id="currency">$</span>${category[i].itemInfo.newItemPrice}</span>
						  <span class="old-price price">${category[i].itemInfo.oldItemPrice}</span>
					   </span>
				    </div>
				</div>
			 </a>`;
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
		    </div>
		    <div class="price-order">
			   <span class="price-box">
				  <span class="price">$${category[i].itemInfo.newItemPrice}</span>
				  <span class="old-price price">${category[i].itemInfo.oldItemPrice}</span>
			   </span>
		    </div>
		</div>
	 </a>`;
		}
		Holder.innerHTML = itemCreated;
	}
}

// DISPLAY SELECTED PRODUCTS
let allStoreProducts;
Products.selectedForYou();
(async () => {
	// WAIT FOR PRODUCTS FROM THE SERVER
	allStoreProducts = await Products.selectedForYou();

	// DISPLAY RECENT PRODUCTS
	displayProduct.displayRecentItems(allStoreProducts.recentlyAdded);

	// DISPLAYS CELLPHONE ITEMS BY DEFAULT
	displayProduct.createItem(
		event,
		"#sel-container",
		allStoreProducts.selectedProducts[0].cellphones,
		"cellphones"
	);

	// DISPLAY WEEKLY PRODUCTS
	displayProduct.displayWeeklyFeatured(allStoreProducts.WeeklyFeatured);
})();

let cellPhoneTab = document.getElementById("cellphones");
cellPhoneTab.addEventListener("click", async (e) => {
	displayProduct.createItem(
		event,
		"#sel-container",
		allStoreProducts.selectedProducts[0].cellphones,
		"cellphones"
	);
});

let gamingTab = document.getElementById("gaming");
gamingTab.addEventListener("click", async (e) => {
	displayProduct.createItem(
		event,
		"#sel-container",
		allStoreProducts.selectedProducts[0].gaming,
		"gaming"
	);
});

let speakersTab = document.getElementById("speakers");
speakersTab.addEventListener("click", async (e) => {
	displayProduct.createItem(
		event,
		"#sel-container",
		allStoreProducts.selectedProducts[0].speakers,
		"speakers"
	);
});

let computersTab = document.getElementById("computers");
computersTab.addEventListener("click", async (e) => {
	displayProduct.createItem(
		event,
		"#sel-container",
		allStoreProducts.selectedProducts[0].computers,
		"computers"
	);
});

let tvTab = document.getElementById("tv");
tvTab.addEventListener("click", async (e) => {
	displayProduct.createItem(
		event,
		"#sel-container",
		allStoreProducts.selectedProducts[0].tv,
		"tv"
	);
});

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

// CHANGE TABS BASED ON ITEM'S CATEGORY
let tab = [...document.querySelectorAll(".tab")];
tab[0].className += " active-li";
for (let x in tab) {
	tab[x].addEventListener("click", (event) => {
		tab.forEach((t) => {
			t.classList.remove("active-li");
			t.classList.add("inactive-li");
		});
		if (event.target.className.includes("inactive-li")) {
			event.target.className = event.target.className.replace(
				"inactive-li",
				" active-li"
			);
		}
	});
}

// DISPLAY NUMBER IF ITEMS IN CART
let cartDom = document.getElementById("items-in-cart");
cartDom.innerText = Storage.numainBtnerOfItemsInCart();
