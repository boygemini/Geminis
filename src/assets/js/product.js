"use strict";
(() => {
	let webPage = document.querySelector("html");
	webPage.style.opacity = "1";
	webPage.style.transition = "1s ease-in-out";
})();

function storeItemsIfNotAlreadyStored() {
	if (localStorage.StoreItems === undefined) {
		let product_request = new XMLHttpRequest();
		product_request.open("GET", "../product.json", false);
		product_request.onload = function () {
			if (product_request.status === 200) {
				localStorage.StoreItems = this.responseText;
			}
		};
		product_request.send();
	}
}
storeItemsIfNotAlreadyStored();

// SORTING ITEMS
const getItemID = () => {
	let url = new URL(document.URL);
	return url.search.split("=")[1];
};

const getAllItems = () => {
	let allItems = JSON.parse(localStorage.getItem("StoreItems"));
	return allItems;
};

const item = () => {
	let recentlyAdded = getAllItems().recentlyAdded;
	let WeeklyFeatured = getAllItems().WeeklyFeatured;

	for (let i in recentlyAdded) {
		if (recentlyAdded[i].id === getItemID()) {
			return recentlyAdded[i];
		}
	}

	for (let i in WeeklyFeatured) {
		if (WeeklyFeatured[i].id === getItemID()) {
			return WeeklyFeatured[i];
		}
	}

	let category = ["gaming", "cellphones", "speakers", "computers", "tv"];
	let allItems = getAllItems().selectedProducts[0];
	for (let i in category) {
		let all = allItems[`${category[i]}`];
		for (let j in all) {
			if (all[j].id === getItemID()) {
				return all[j];
			}
		}
	}
};

// ITEM DISPLAY
let Item = item();
Item.amount = 1;
let itemCategory = Item.itemInfo.category;
let firstBigImgContainer = document.getElementById("lImg");
let firstBigImg = document.getElementById("largeImage2");
let secondBigImg = document.getElementById("largeImage");
const loadThumbnails = () => {
	let thumbnails = Item.itemInfo.itemImg;
	price.innerText = Item.itemInfo.newItemPrice;
	firstBigImg.style.backgroundImage = `url(${Item.itemInfo.itemImg[0]})`;
	secondBigImg.src = Item.itemInfo.itemImg[0];

	for (let i in thumbnails) {
		document.getElementById(
			"thumbnailPanel"
		).innerHTML += `<div class="tbcon" onmouseover='changeMainThumbNail(event)' data-id="${i}" data-name=${thumbnails[i]}>
		<div class="tbcon-in" onmouseover='changeMainThumbNail(event)' data-id="${i}" data-name=${thumbnails[i]} style='background-image:url(${thumbnails[i]})'></div>
		</div>`;
	}
};
if (itemCategory === "Cellphones") {
	productDetails.innerHTML = `
	<h1>${Item.itemInfo.name}</h1>
	<h2>${Item.itemInfo.description1}</h2>
	<div class="specifications">
	<strong>Brand New</strong>
	<p><strong>Model Name  </strong><span>${Item.itemInfo.name}<span></p>
	<p><strong>Brand  </strong><span>${Item.itemInfo.brand}</span></p>
	<p><strong>Memory Storage Capacity  </strong><span>${Item.itemInfo.memory} GB</span></p>
	<p><strong>Color  </strong><span id="chosenColor">${Item.itemInfo.color}</span></p>
	<p><strong>Operating System  </strong><span>${Item.itemInfo.OS}</span></p>
	<p><strong>Wireless Carrier </strong><span id="chosenColor">Unlocked for All Carriers</span></p>
	</div>
	<div class="other-colors">
	<h1>Other available colors</h1>
	<div class="circles">
	<div class="circle" id="circle1" onclick="changeColor('Graphite')"></div>
	<div class="circle" id="circle2" onclick="changeColor('Space Gray')"></div>
	<div class="circle" id="circle3" onclick="changeColor('Silver')"></div>
	<div class="circle" id="circle4" onclick="changeColor('Gold')"></div>
	<div class="circle" id="circle4" onclick="changeColor('Sierra Blue')"></div>
	</div>
	<div class="color-picked">
	<h2>Picked : </h2><span id="chosenColor">Graphite</span>
	</div>
	</div>
	<div class="qty">
	<h2>Quantity</h2>
	<div class="quantity">
	<button onclick="cartItems.decrease()">-</button><input type="text" id="amount" aria-label="input" aria-labelledby="input" value="1"><button onclick="cartItems.increase()">+</button>
	</div>
	</div>
	<div class="shipping-pickup">
	<div class="Pickup">
		<h1 id="abt">About this item</h1>
		<ul>
			<li><span></span>Unlocked</li>
			<li><span></span>Tested for battery health and guaranteed to come with a battery that exceeds 90% of original capacity.</li>
			<li><span></span>Inspected and guaranteed to have minimal cosmetic damage, which is not noticeable when the device is held at arm’s length. Successfully passed a full diagnostic test which ensures like-new functionality and removal of any prior-user personal information.</li>
			<li><span></span>Includes a brand new, generic charging cable that is certified Mfi (Made for iPhone) and a brand new, generic wall plug that is UL certified for performance and safety. Also includes a SIM tray removal tool but does not come with headphones or a SIM card.</li>
			<li><span></span>Backed by the same one-year satisfaction guarantee as brand new Apple products.</li>
		</ul>
	</div> `;

	loadThumbnails();
}

if (itemCategory === "Computers") {
	productDetails.innerHTML = `
	<h1>${Item.itemInfo.name}</h1>
	<h2>${Item.itemInfo.description1}</h2>
	<div class="specifications">
	<strong>Brand New</strong>
	<p><strong>Model Name  </strong><span>${Item.itemInfo.name}<span></p>
	<p><strong>Brand  </strong><span>${Item.itemInfo.brand}</span></p>
	<p><strong>Hard Disk Size </strong><span>${Item.itemInfo.rom} GB</span></p>
	<p><strong>Ram Memory Installed  </strong><span>${Item.itemInfo.ram} GB</span></p>
	<p><strong>Color  </strong><span id="chosenColor">${Item.itemInfo.color}</span></p>
	<p><strong>Operating System  </strong><span>${Item.itemInfo.OS}</span></p>
	<p><strong>CPU Model </strong><span id="chosenColor">${Item.itemInfo.CPU}</span></p>
	</div>
	<div class="other-colors">
	<h1>Other available colors</h1>
	<div class="circles">
	<div class="circle" id="circle1" onclick="changeColor('Graphite')"></div>
	<div class="circle" id="circle2" onclick="changeColor('Space Gray')"></div>
	<div class="circle" id="circle3" onclick="changeColor('Silver')"></div>
	<div class="circle" id="circle4" onclick="changeColor('Gold')"></div>
	<div class="circle" id="circle4" onclick="changeColor('Sierra Blue')"></div>
	</div>
	<div class="color-picked">
	<h2>Picked : </h2><span id="chosenColor">Graphite</span>
	</div>
	</div>
	<div class="qty">
	<h2>Quantity</h2>
	<div class="quantity">
	<button onclick="cartItems.decrease()">-</button><input type="text" id="amount" aria-label="input" aria-labelledby="input" value="1"><button onclick="cartItems.increase()">+</button>
	</div>
	</div>
	<div class="shipping-pickup">
	<div class="Pickup">
		<h1 id="abt">About this item</h1>
		<ul>
			<li><span></span>Unlocked</li>
			<li><span></span>All-Day Battery Life – Go longer than ever with up to 18 hours of battery life.</li>
			<li><span></span>Powerful Performance – Take on everything from professional-quality editing to action-packed gaming with ease. The Apple M1 chip with an 8-core CPU delivers up to 3.5x faster performance than the previous generation while using way less power.</li>
			<li><span></span>Superfast Memory– 8 GB of unified memory makes your entire system speedy and responsive.That way it can support tasks like memory - hogging multitab browsing and opening a huge graphic file quickly and easily.</li>
			<li><span></span>Stunning Display – With a 13.3” Retina display, IMAGES come alive with new levels of realism. Text is sharp and clear, and colors are more vibrant.</li>
		</ul>
	</div> `;

	loadThumbnails();
}

if (itemCategory === "Speakers") {
	productDetails.innerHTML = `
	<h1>${Item.itemInfo.name}</h1>
	<h2>${Item.itemInfo.description1}</h2>
	<div class="specifications">
	<strong>Brand New</strong>
	<p><strong>Model Name  </strong><span>${Item.itemInfo.name}<span></p>
	<p><strong>Brand  </strong><span>${Item.itemInfo.brand}</span></p>
	<p><strong>Speaker Maximum Output Power </strong><span>${Item.itemInfo.smop}</span></p>
	<p><strong>Connectivity Technology  </strong><span>${Item.itemInfo.ct}</span></p>
	<p><strong>Color  </strong><span id="chosenColor">${Item.itemInfo.color}</span></p>
	<p><strong>Audio Output Mode </strong><span>${Item.itemInfo.aom}</span></p>
	</div>
	<div class="qty">
	<h2>Quantity</h2>
	<div class="quantity">
	<button onclick="cartItems.decrease()">-</button><input type="text" id="amount" aria-label="input" aria-labelledby="input" value="1"><button onclick="cartItems.increase()">+</button>
	</div>
	</div>
	<div class="shipping-pickup">
	<div class="Pickup">
		<h1 id="abt">About this item</h1>
		<ul>
			<li><span></span>Unlocked</li>
			<li><span></span>All-Day Battery Life – Go longer than ever with up to 18 hours of battery life.</li>
			<li><span></span>Powerful Performance – Take on everything from professional-quality editing to action-packed gaming with ease. The Apple M1 chip with an 8-core CPU delivers up to 3.5x faster performance than the previous generation while using way less power.</li>
			<li><span></span>Superfast Memory– 8 GB of unified memory makes your entire system speedy and responsive.That way it can support tasks like memory - hogging multitab browsing and opening a huge graphic file quickly and easily.</li>
			<li><span></span>Stunning Display – With a 13.3” Retina display, IMAGES come alive with new levels of realism. Text is sharp and clear, and colors are more vibrant.</li>
		</ul>
	</div> `;

	loadThumbnails();
}

if (itemCategory === "Gaming") {
	productDetails.innerHTML = `
	<h1>${Item.itemInfo.name}</h1>
	<h2>${Item.itemInfo.description1}</h2>
	<div class="qty">
	<h2>Quantity</h2>
	<div class="quantity">
	<button onclick="cartItems.decrease()">-</button><input type="text" id="amount" aria-label="input" aria-labelledby="input" value="1"><button onclick="cartItems.increase()">+</button>
	</div>
	</div>
	<div class="shipping-pickup">
	<div class="Pickup">
		<h1 id="abt">About this item</h1>
		<ul>
			<li><span></span>Next wave of invites will be sent on 11 / 18 / 2022 to qualifying customers.While supplies last</li>
			<li><span></span>Model Number CFI - 1215 A01X</li>
			<li><span></span>Stunning Games - Marvel at incredible graphics and experience new PS5 features.</li>
			<li><span></span>Breathtaking Immersion - Discover a deeper gaming experience with support for haptic feedback, adaptive triggers, and 3D Audio technology.</li>
			<li><span></span>Lightning Speed - Harness the power of a custom CPU, GPU, and SSD with Integrated I/O that rewrite the rules of what a PlayStation console can do.</li>
		</ul>
	</div> `;

	loadThumbnails();
}

if (itemCategory === "TV") {
	productDetails.innerHTML = `
	<h1>${Item.itemInfo.name}</h1>
	<h2>${Item.itemInfo.description1}</h2>
	<div class="qty">
	<h2>Quantity</h2>
	<div class="quantity">
	<button onclick="cartItems.decrease()">-</button><input type="text" id="amount" aria-label="input" aria-labelledby="input" value="1"><button onclick="cartItems.increase()">+</button>
	</div>
	</div>
	<div class="specifications">
	<p><strong>Size  </strong><span>${Item.itemInfo.size} inches<span></p>
	</div>
	<div class="shipping-pickup">
	<div class="Pickup">
		<h1 id="abt">About this item</h1>
		<ul>
			<li><span></span>Next wave of invites will be sent on 11 / 18 / 2022 to qualifying customers.While supplies last</li>
			<li><span></span>Model Number CFI - 1215 A01X</li>
			<li><span></span>Stunning Games - Marvel at incredible graphics and experience new PS5 features.</li>
			<li><span></span>Breathtaking Immersion - Discover a deeper gaming experience with support for haptic feedback, adaptive triggers, and 3D Audio technology.</li>
			<li><span></span>Lightning Speed - Harness the power of a custom CPU, GPU, and SSD with Integrated I/O that rewrite the rules of what a PlayStation console can do.</li>
		</ul>
	</div> `;

	loadThumbnails();
}

try {
	circle1.className += " active2";
} catch (error) {}
let amountDOM = document.getElementById("amount");
const changeColor = (color) => {
	let colors = document.querySelectorAll(".circle");
	colors.forEach((cl) => cl.classList.remove("active2"));
	event.target.classList += " active2";
};

let counter = 0;
let thumbNails = document.querySelectorAll(".tbcon");
thumbNails[0].className += " tbnactive";

const indicateActiveThumbNail = (event) => {
	let clickedThumbnailId = event.target.dataset.id;
	thumbNails.forEach((tb) => tb.classList.remove("tbnactive"));
	if (event.target.className === "tbcon") {
		event.target.classList.add("tbnactive");
		counter = clickedThumbnailId;
	} else if (event.target.parentNode.className === "tbcon") {
		event.target.parentNode.classList.add("tbnactive");
		counter = clickedThumbnailId;
	} else {
		thumbNails[counter].classList.add("tbnactive");
	}
};

const changeMainThumbNail = (event) => {
	largeImage.src = event.target.dataset.name;
	firstBigImg.style.backgroundImage = `url(${event.target.dataset.name})`;
	indicateActiveThumbNail(event);
};

const fwd = () => {
	let imageArray = Item.itemInfo.itemImg;

	if (counter >= imageArray.length - 1) {
		counter = -1;
	}

	counter++;
	largeImage.src = imageArray[counter];
	firstBigImg.style.backgroundImage = `url(${imageArray[counter]})`;
	thumbnailPanel.scrollLeft = thumbNails[0].clientWidth * counter;
	indicateActiveThumbNail(event);
};

const bwd = () => {
	let imageArray = Item.itemInfo.itemImg;

	if (counter <= 0) {
		counter = imageArray.length;
	}

	counter--;
	largeImage.src = imageArray[counter];
	firstBigImg.style.backgroundImage = `url(${imageArray[counter]})`;
	thumbnailPanel.scrollLeft = thumbNails[0].clientWidth * counter;
	indicateActiveThumbNail(event);
};

class Products {
	// LOAD ALL PRODUCTS AND SAVE THEM TO THE LOCALSTORAGE
	static selectedForYou() {
		let product_request = new XMLHttpRequest();
		product_request.open("GET", "../product.json", false);
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

let cart = [];
class Storage {
	// RETRIEVE RETRIEVE ALL ITEMS TOTAL PRODUCTS
	static getAllProducts() {
		return JSON.parse(localStorage.getItem("StoreItems"));
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
		if (Storage.getItemsInCart() === null || undefined) {
			return "0";
		} else {
			let mapCart = Storage.getItemsInCart().map((cI) => cI.amount);
			let reduceCart = mapCart.reduce((x, y) => x + y, 0);
			return reduceCart;
		}
	}

	// UPDATE CART
	static updateCart(cartName) {
		Storage.saveSelectedItemsToCart(cartName);
		cartDom.innerText = Storage.numberOfItemsInCart();
	}

	// GET AND SAVE PICKED ITEM TO CART
	static getItemAndSaveToCart() {
		let getbackcart = JSON.parse(localStorage.getItem("Cart"));

		if (cart === null || cart.length === 0) {
			cart = [pickedItem];
			Storage.updateCart(cart);
		}

		if (cart !== null || cart.length !== 0) {
			let pickedItemID = Item.id;
			let check = getbackcart.find((item) => item.id === pickedItemID);

			if (check) {
				check.amount = parseInt(amountDOM.value);
				Storage.updateCart(getbackcart);
			}

			if (!check) {
				getbackcart = [...getbackcart, pickedItem];
				Storage.updateCart(getbackcart);
			}
		}
	}
}
Products.selectedForYou();

let itemCount = 1;
let findItem;
let getbackcart = JSON.parse(localStorage.getItem("Cart"));

try {
	findItem = getbackcart.find((item) => item.id === Item.id);
} catch (error) {}

amountDOM.addEventListener("input", (event) => {
	if (parseInt(event.target.value) <= 1) {
		event.target.value = 1;
	}

	itemCount = event.target.value;

	try {
		findItem.amount = parseInt(event.target.value);
	} catch (error) {}

	if (!findItem) {
		Item.amount = parseInt(event.target.value);
	}
});

if (findItem) {
	amountDOM.value = findItem.amount;
	itemCount = parseInt(amountDOM.value);
}

class cartItems {
	static increase() {
		itemCount++;

		let pkdItem = {
			...Item,
			amount: itemCount,
		};
		amountDOM.value = itemCount;

		Item = pkdItem;
		return Item;
	}

	static decrease() {
		itemCount--;

		if (itemCount <= 1) itemCount = 1;

		amountDOM.value = itemCount;
		let pkdItem = {
			...Item,
			amount: itemCount,
		};
		Item = pkdItem;
		return Item;
	}
}

// POP-UP NOTIFICATION
const popupNotification = (itemName, itemImage) => {
	let notification = document.getElementById("notify-box"),
		creatNotBox = document.createElement("div");
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

// DISPLAY NUMBER OF ITEM IN CART
let cartDom = document.getElementById("items-in-cart");
try {
	cartDom.innerText = Storage.numberOfItemsInCart();
} catch (error) {}

// ADD VIEWED ITEM TO CART
let ItemsInCart = JSON.parse(localStorage.getItem("Cart")),
	pickedItem;
const addToCart = () => {
	let pickItemFromStore = Item;
	pickedItem = Item;
	if (pickItemFromStore) {
		try {
			Storage.getItemAndSaveToCart();
		} catch (error) {}
	}
	popupNotification(
		pickItemFromStore.itemInfo.name,
		pickItemFromStore.itemInfo.itemImg[0]
	);
};

const buyItem = () => {
	Item.amount = Number(amountDOM.value);
	let cartSummary = {
		subtotal: Item.amount * Number(Item.itemInfo.newItemPrice),
		deliveryfee: 3,
		tax: 3.45,
		total: (
			Item.amount * Number(Item.itemInfo.newItemPrice) +
			3 +
			3.45 -
			(Item.amount * Number(Item.itemInfo.newItemPrice) + 3 + 3.45) * (10 / 100)
		).toFixed(2),
	};
	localStorage.setItem("cartSummary", JSON.stringify(cartSummary));
	localStorage.setItem("buy", JSON.stringify(Item));
	window.location.href = "checkout.html";
};

const toCart = () => {
	window.location.href = "cart.html";
};

const goHome = () => {
	window.location.href = "index.html";
};

//Accordions
let accordions = document.querySelectorAll(".table");
let accorHeader = document.querySelectorAll(".group-head");

try {
	for (let i in accordions) {
		accordions[i].style.height = "0px";
		accorHeader[i].style.zIndex = i + 1;
	}
} catch (error) {}

const openAccordion = (accor) => {
	let Accordions = document.querySelectorAll(".table");
	let accordion = document.getElementById(accor);
	let clickedAccordion = document.querySelector(`[data-id=${accor}]`);

	accorHeader.forEach((a) => {
		a.className = a.className.replace("activegrouphead", "");
		a.children[1].style.transform = "rotate(0deg)";
	});

	clickedAccordion.className += " activegrouphead";
	clickedAccordion.children[1].style.transform = "rotate(0deg)";

	if (accordion.style.height === `${accordion.scrollHeight}px`) {
		accordion.style.height = "0px";
		clickedAccordion.className = clickedAccordion.className.replace(
			"activegrouphead",
			""
		);
		setTimeout(() => {
			accordion.style.opacity = "0";
		}, 100);
	} else {
		Accordions.forEach((acc) => {
			if (acc.style.height === `${acc.scrollHeight}px`) {
				acc.style.height = "0px";
				setTimeout(() => {
					acc.style.opacity = "0";
				}, 100);
			}
			accordion.style.height = `${accordion.scrollHeight}px`;
			clickedAccordion.children[1].style.transform = "rotate(180deg)";
			setTimeout(() => {
				accordion.style.opacity = "1";
			}, 300);
		});
	}
};
openAccordion("description");
