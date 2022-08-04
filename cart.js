"use strict";
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


//Menu
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


/*Get Cart Items*/
let cartCounter = document.getElementById("items-in-cart")

class CartItems {
    static getCartItems() {
        return JSON.parse(localStorage.getItem("Cart"));
    }

    static displayNumberOfItemsInCart() {
        return CartItems.getCartItems().length
    }
}

cartCounter.innerText = CartItems.displayNumberOfItemsInCart();

class displayItems {
    static CART (category) {
    let itemCreated = "";
    let Holder = document.getElementById("orders-in-cart");
    for (let i in category) {
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
                <button>-</button><input type="text" value="1"><button>+</button>
            </div>
        </div>

        <div class="save-delete">
            <h2>Save for later</h2>
            <h2 class="delete">Delete</h2>
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

displayItems.CART(CartItems.getCartItems())

console.log(CartItems.getCartItems());