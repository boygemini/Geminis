"use strict";

let images = document.querySelectorAll(".imgs");
let intro = document.getElementById("intro");
let intro2 = document.getElementById("intro2");
let gradient = document.getElementById("gradient");
let intoText = document.getElementById("introtext");
let lm = document.getElementById("lm");
let counter = -1;
let introContent = [
  "Welcome to the world of ",
  "Check out the new ",
  "Check out the latest ",
  "Check out the latest ",
  "Check out the new ",
];

let intro2Content = [
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, quibusdam.",
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, sequi!",
  "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repudiandae!",
  "Lorem ipsum, sit amet consectetur adipisicing elit. Repudiandae!",
];

let lmContent = ["New!", "New!", "New!", "New!", "New!"];

let gradientContent = [
  "Electronics",
  "iPhone 13 Pro Max",
  "JBL Flip 6",
  "Mackbook Pro Core M2",
  "Oraimo Airpod",
];



images[0].style.display = "block";
const startSlide = () => {
  disOther();
  increSlide();
};



const disOther = () => {
  try {
    for (let i = 0; i <= images.length; i++) {
      images[i].style.display = "none";
    }
  } catch (error) {}
};



const increSlide = () => {
  disOther();
  counter++;
  if (counter === 5) {
    counter = 0;
  }
  placing();
};



const placing = () => {
  images[counter].style.display = "block";
  images[counter].style.opacity = "0";
  intro.innerHTML = introContent[counter];
  intro2.innerHTML = intro2Content[counter];
  lm.innerText = lmContent[counter];
  gradient.innerHTML = gradientContent[counter];
  setTimeout(() => {
    intoText.className += " rollin";
    intoText.className = intoText.className.replace(" rollin", " rollout");
    setTimeout(() => {
      intoText.className = intoText.className.replace(" rollout", " rollin");
    }, 400);
  }, 8500);
};



startSlide();
setInterval(startSlide, 9000);



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
  let creatNotBox = document.createElement("div")
  creatNotBox.classList = " notification on"
  creatNotBox.innerHTML = `<img src=${itemImage} alt="" srcset="" class="noti-img"><p>You added <strong id="itemname">${itemName}</strong> to cart</p>`
  notification.appendChild(creatNotBox)
  setTimeout(() => {
    creatNotBox.classList = " notification off"
  }, 2500)
  setTimeout(() => {
    creatNotBox.classList = "complete-off"
  }, 3200)
  setTimeout(() => {
    creatNotBox.classList = "die"
  }, 3200)
}



class Products {
  // LOAD ALL PRODUCTS AND SAVE THEM TO THE LOCALSTORAGE
  static selectedForYou() {
    let product_request = new XMLHttpRequest();
    product_request.open("GET", "/JSON/product.json", false);
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
      return "0"
    } else {
      let mapCart = this.getItemsInCart().map(cI => cI.amount)
      let reduceCart = mapCart.reduce((x, y) => x + y, 0)
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
      this.updateCart(cart)
    }

    if (cart !== null || cart.length !== 0) {
      let pickedItemID = event.target.dataset.id;
      let check = getbackcart.find(item => item.id === pickedItemID)

      if (check) {
        check.amount += 1;
        this.updateCart(getbackcart)
      }

      if (!check) {
        getbackcart = [...getbackcart, pickedItem]
        this.updateCart(getbackcart)
      }
    };
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
		    <img src=${category[i].itemInfo.itemImg} alt="">
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
			   <button id="cart-btn" class="cart-btn" ><img id="addto-cart-img" src="/IMAGES/add-to-cart.png" alt="" data-id = "${category[i].id}" data-category = "${sub}" onclick = "addToCart(event,Storage.getAllProducts().selectedProducts[0])"></button>
		    </div>
		</div>
	 </div>`;
    }
    Holder.innerHTML = itemCreated;
    let viewAll = document.querySelector(".view-all")
    try {
      viewAll.id = event.target.id
    } catch (error) {}
  }


  // DISPLAY RECENTLY ADDED ITEMS
  static displayRecentItems(category, sub) {
    let itemCreated = "";
    let Holder = document.getElementById("holder-rec");
    for (let i in category) {
      itemCreated += `<div class="sell-box sel-box" data-id=${category[i].id} onclick = "viewProduct(event)">
		<div class="img-con">
		    <img src=${category[i].itemInfo.itemImg} alt="">
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
			   <button id="cart-btn" class="cart-btn" ><img id="addto-cart-img" src="/IMAGES/add-to-cart.png" alt="" data-id = "${category[i].id}" data-category = "${sub}" onclick = "addToCart(event,Storage.getAllProducts().selectedProducts[0])"></button>
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
		    <img src=${category[i].itemInfo.itemImg} alt="">
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
			   <button id="cart-btn" class="cart-btn" ><img id="addto-cart-img" src="/IMAGES/add-to-cart.png" alt="" data-id = "${category[i].id}" data-category = "${sub}" onclick = "addToCartt(event,Storage.getAllProducts().WeeklyFeatured)"></button>
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
displayProduct.createItem(event, "#sel-container",
  Products.getSelectedProducts().selectedProducts[0].gaming,
  "gaming"
);



// DISPLAY WEEKLY PRODUCTS
displayProduct.displayWeeklyFeatured(Storage.weeklyFeaturedItems());



// VIEW CLICKED PRODUCT
const viewProduct = (event) => {
  let itemID = event.target.dataset.id || event.target.parentNode.dataset.id || event.target.parentNode.parentNode.dataset.id || event.target.parentNode.parentNode.parentNode.dataset.id;
  if (itemID) {
    let url = `product.html?item=${encodeURIComponent(itemID)}`
    window.location = url
  }
}



// ADD RECENT ITEMS TO CART
const addToCartt = (event, ITT) => {
  event.stopPropagation()

  function Me() {
    let pickItemFromStore = ITT.find(
      (item) => item.id === event.target.dataset.id
    );
    popupNotification(pickItemFromStore.itemInfo.name, pickItemFromStore.itemInfo.itemImg)
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
  event.stopPropagation()
  let ItemCategory = event.target.dataset.category;
  let pickItemFromStore = ITT[`${ItemCategory}`].find(
    (item) => item.id === event.target.dataset.id
  );
  popupNotification(pickItemFromStore.itemInfo.name, pickItemFromStore.itemInfo.itemImg)
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


const openMenu = (e) => {
  menu.style.display = "flex";
  removePadding();
  setTimeout(() => {
    menu.style.paddingTop = "20px";
    menu.style.height = "400px";
  }, 20);
};


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