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

// const decreSlide = () => {
//     disOther();
//     counter--;
//     if (counter <= -1) {
//       counter = 4;
//     }
//     console.log(counter);
//     placing()
//   };

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

/*End of Hero*/

/*Selected For you*/
let itemName = document.querySelectorAll("#itemName"),
  mainDesc = document.querySelectorAll("#maindesc"),
  minDesc = document.querySelectorAll("#mindesc"),
  oldPrice = document.querySelectorAll("#oldprice"),
  newPrice = document.querySelectorAll("#newprice");

/*Creating Storage Groups for Items*/
localStorage.setItem("StoreItems", "");
let cart = [];

class Products {
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

  static getSelectedProducts() {
    return JSON.parse(localStorage.StoreItems);
  }
}



class Storage {
  static getAllProducts() {
    return JSON.parse(localStorage.getItem(ItemsInStore()));

    function ItemsInStore() {
      return "StoreItems";
    }
  }

  static getRecentItems () {
    return Storage.getAllProducts().recentlyAdded
  }

  static saveSelectedItemsToCart(cart) {
    localStorage.Cart = JSON.stringify(cart);
    localStorage.setItem("Cart", localStorage.Cart);
  }

  static getItemsInCart() {
    return JSON.parse(localStorage.getItem("Cart"));
  }

  static numberOfItemsInCart() {
    return JSON.parse(localStorage.getItem("Cart")).length;
  }
}



class displayProduct {
  static createItem(category, sub) {
    let itemCreated = " ";
    let Holder = document.getElementById("sel-container");
    for (let i in category) {
      itemCreated += `<div class="sell-box sel-box">
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
                      <span class="price">${category[i].itemInfo.newItemPrice}</span>
                      <span class="old-price price">${category[i].itemInfo.oldItemPrice}</span>
                  </span>
                  <button data-id = "${category[i].id}" data-category = "${sub}" id="cart-btn" class="cart-btn" onclick = "addToCart(event)"></button>
              </div>
          </div>
      </div>`;
    }
    Holder.innerHTML = itemCreated;
  }


  static displayRecentItems(category, sub) {
    let itemCreated = "";
    let Holder = document.getElementById("holder-rec");
    for (let i in category) {
      itemCreated += `<div class="recent">
      <img src=${category[i].itemInfo.itemImg} alt="">
      <div class="receInfo">
          <h1 class="itemName">${category[i].itemInfo.category}</h1>
          <p class="itemName2">${category[i].itemInfo.name}</p>
          <p class="itemInfo">${category[i].itemInfo.description1}</p>
          <div class="price-order">
              <span class="itemPricing">${category[i].itemInfo.newItemPrice}</span>
              <button data-id = "${category[i].id}" data-category = "${sub}" id="cart-btn" class="cart-btn" onclick = "addToCart()"></button>
          </div>
      </div> 
  </div>`;
    }
    Holder.innerHTML = itemCreated;
  }
}



/*Display Selected Products*/
Products.selectedForYou(); // Loads and Store Selected Items
console.log(Storage.getRecentItems());

displayProduct.createItem(
  Products.getSelectedProducts().selectedProducts[0].gaming,
  "gaming"
); //Displays Gaming Items


displayProduct.displayRecentItems(Storage.getRecentItems())


/*Change Tabs Based On Item's Category*/
let tab = [...document.querySelectorAll(".tab")];
tab[0].className += " active-li";
for (let x in tab) {
  tab[x].addEventListener("click", (e) => {
    tab[0].className = tab[0].className.replace(" active-li", "");
    for (let y in tab) {
      tab[y].classList.remove("active-li");
    }
    event.target.className += " active-li";
  });
}

/*Selected for You Scroller*/
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

/*Add Selected Items To Cart*/
let cartDom = document.getElementById("items-in-cart");
try {
  cartDom.innerText = Storage.numberOfItemsInCart();
} catch (error) {} // Displays number of Items in Cart
let pickedItem;

let ItemsInCart = JSON.parse(localStorage.getItem("Cart"));
const addToCart = (event) => {
  let ItemCategory = event.target.dataset.category;
  let pickItemFromStore = Storage.getAllProducts().selectedProducts[0][
    `${ItemCategory}`
  ].find((item) => item.id === event.target.dataset.id);
  pickedItem = { ...pickItemFromStore, amount: 1 };

  if (pickItemFromStore) {
    let Instore;
    try {
      Instore = ItemsInCart.find((items) => items.id === pickItemFromStore.id);
    } catch (error) {}
    if (Instore) {
      alert("Item is already in cart you fucker!");
    } else {
      let getbackcart = JSON.parse(localStorage.getItem("Cart"));
      if (cart !== null || cart.length !== 0) {
        try {
          cart = [...getbackcart, pickedItem];
        } catch (error) {}
        Storage.saveSelectedItemsToCart(cart); // Save Items To Cart
        cartDom.innerText = Storage.numberOfItemsInCart(); // Displays number of Items in Cart
      } else {
        console.log(pickedItem);
        cart = [...cart, pickedItem];
        Storage.saveSelectedItemsToCart(cart);
        cartDom.innerText = Storage.numberOfItemsInCart();
      }
    }
  }
};

const showCart = () => {};

//Menu

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
//end
