"use strict";
let Holder = document.getElementById("orders-in-cart");

/*Button links*/
const toShop = () => {
  window.location.href = "/HTML/gemshop.html";
};


const toCheckOut = () => {
  window.location.href = "/HTML/checkout.html";
};


const goHome = () => {
  window.location.href = "/HTML/gemstore.html";
};


//MENU
let menu = document.getElementById("menu"), mb = document.getElementById("mb");
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


/* ITEM COUNTER*/
let cartCounter = document.getElementById("items-in-cart")


class Storage {
  /* RETRIEVE ITEMS IN CART */
  static getItemsInCart() {
        return JSON.parse(localStorage.getItem("Cart"));
    }

  /* GET THE NUMBER OF ITEMS IN CART */
  static numberOfItemsInCart() {
    if(Storage.getItemsInCart() === null || undefined) {
      return "0"
    }

    else {
      let mapCart = Storage.getItemsInCart().map(cI => cI.amount)
      let reduceCart = mapCart.reduce((x,y) => x+y, 0)
      return reduceCart;
    }
  }

  /* EMPTY CART INDICATOR */
  static indicateEmptyCart () {
    if(Number(Storage.numberOfItemsInCart()) === 0){
      Holder.innerHTML = `<div class = "empty-cart"><p>Opps, your cart is empty 😒</p></div>`
      Holder.style.justifyContent = "center" 
      Holder.style.alignItems = "center" 
    }
  }
}

class CartItems {
  static increaseItem (altheredItemID) {
    let getbackcart = JSON.parse(localStorage.getItem("Cart"));
    let amt = document.querySelectorAll("#amount");
    let itemID = Number(altheredItemID);
    for(let i in getbackcart){
      if(itemID === Number(getbackcart[i].id)){
        getbackcart[i].amount += 1
        amt[i].value = getbackcart[i].amount
        localStorage.Cart = JSON.stringify(getbackcart)
        cartCounter.innerText = Storage.numberOfItemsInCart()
      }
    }
  }

  static decreaseItem (altheredItemID) {
    let getbackcart = JSON.parse(localStorage.getItem("Cart"));
    let amt = document.querySelectorAll("#amount");
    let itemID = Number(altheredItemID);
    for(let i in getbackcart){
      if(itemID === Number(getbackcart[i].id)){
        getbackcart[i].amount -= 1
        if(getbackcart[i].amount < 1){
          let ask = confirm("Do you want to remove this item from Cart?")
          if (ask) {
            return CartItems.removeItem(altheredItemID)
          }
          else {
            getbackcart[i].amount = 1
          }
        }

        amt[i].value = getbackcart[i].amount
        localStorage.Cart = JSON.stringify(getbackcart)
        cartCounter.innerText = Storage.numberOfItemsInCart()
      }
    }
  }

  static removeItem (altheredItemID) {
    let getbackcart = JSON.parse(localStorage.getItem("Cart"));
    let itemID = altheredItemID;
    let filteredCart = getbackcart.filter((items) => items.id !== itemID.toString())
    localStorage.Cart = JSON.stringify(filteredCart)
    cartCounter.innerText = Storage.numberOfItemsInCart()
    displayItems.CART(Storage.getItemsInCart())
    Storage.indicateEmptyCart()
  }

  static updateQuantity (altheredItemID) {
    let getbackcart = JSON.parse(localStorage.getItem("Cart"));
    let inputedAmount = Number(event.target.value)
    let itemID = Number(altheredItemID);
    for(let i in getbackcart){
      if(itemID === Number(getbackcart[i].id)){

        if(inputedAmount === 0){
          alert("Sorry, please enter a number > 0")
          localStorage.Cart = JSON.stringify(getbackcart)
          event.target.value = getbackcart[i].amount
        }

        if(inputedAmount > 0) {
          getbackcart[i].amount = inputedAmount
          localStorage.Cart = JSON.stringify(getbackcart)
          cartCounter.innerText = Storage.numberOfItemsInCart()
        }
      }
    }
  }
}

class displayItems {
    static CART (category) {
    let itemCreated = "";
    for (let i in category) {

    const getCount = () => {
        return category[i].amount
    }

    itemCreated += `<div class="order">
    <img src=${category[i].itemInfo.itemImg} alt="">
    <div class="order-info">
        <div class="info">
            <h1 class="item-name">${category[i].itemInfo.name}</h1>
            <h2 class="item-title">${category[i].itemInfo.description1}</h2>
            <h2>Color : <span> Space Grey</span></h2>
        </div>

        <div class="qty">
            <h2>Quantity</h2>
            <div class="quantity">
                <button onclick = "CartItems.decreaseItem(${category[i].id})">-</button><input type="text" value="${getCount()}" id = "amount" onblur = "CartItems.updateQuantity(${category[i].id})"><button onclick = "CartItems.increaseItem(${category[i].id})">+</button>
            </div>
        </div>

        <div class="save-delete">
            <h2>Save for later</h2>
            <h2 class="delete" onclick = "CartItems.removeItem(${category[i].id})">Delete</h2>
        </div>
    </div>
    <div class="item-price">
        <span class="currency">$ </span><span class="price">${category[i].itemInfo.newItemPrice}</span>
    </div>
    </div>`
    }
    Holder.innerHTML = itemCreated;
  }
}

/* DISPLAY NUMBER OF ITEMS IN CART */
cartCounter.innerText = Storage.numberOfItemsInCart();

/* INDICATE IF CART IS EMPTY */
Storage.indicateEmptyCart();

/* DISPLAY ITEMS IN CART IF IT IS NOT EMPTY */
if(Number(Storage.numberOfItemsInCart()) !== 0){
  displayItems.CART(Storage.getItemsInCart())
}