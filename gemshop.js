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

//End of Hero

//Selected For you

let itemName = document.querySelectorAll("#itemName"),
  mainDesc = document.querySelectorAll("#maindesc"),
  minDesc = document.querySelectorAll("#mindesc"),
  oldPrice = document.querySelectorAll("#oldprice"),
  newPrice = document.querySelectorAll("#newprice");
let Holder = document.getElementById("sel-container");
// let products;

let product_request = new XMLHttpRequest();
product_request.open("GET", "/JSON/product.json", false);
product_request.onload = function () {
  if (product_request.status === 200) {
    // products = JSON.parse(this.responseText);
    localStorage.setItem("StoreItems", this.responseText)
  }
};
product_request.send();

let itemsInStore = localStorage.getItem("StoreItems")
let getItems = JSON.parse(itemsInStore)

const createItem = (category, sub) => {
  let itemCreated = " ";
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
                <img id="addto-cart-img" data-id = "${category[i].id}" data-category = "${sub}" src="/IMAGES/add-to-cart.png" alt="" onclick = "addToCart()">
            </div>
        </div>
    </div>`;
  }
  Holder.innerHTML = itemCreated;
};
createItem(getItems.gaming, "gaming");

let cart = [];

const addToCart = () => {
  let cat = event.target.dataset.category
  let check = Trr[`${cat}`].find(item => item.id === 2)
  console.log(check); 
}

const grab = () => {
  return "1"
}

//Add Item To Cart

let Trr = {
  "gaming" : [
    {
      "id" : 1,
        "itemInfo" :
        {
          "name": "XBOX 1",
          "itemImg": "/IMAGES/frontIpad.png",
          "description1": "Lorem ipsum dolor sit amet.",
          "description2": "",
          "newItemPrice": "$630",
          "oldItemPrice": "$544"
        }
    },
    {
      "id" : 2,
        "itemInfo" :
        {
          "name": "XBOX 1",
          "itemImg": "/IMAGES/frontIpad.png",
          "description1": "Lorem ipsum dolor sit amet.",
          "description2": "",
          "newItemPrice": "$630",
          "oldItemPrice": "$544"
        }
    }
  ],
  "speaker" : [
    {
      "id" : 3,
        "itemInfo" :
        {
          "name": "XBOX 1",
          "itemImg": "/IMAGES/jblflip6.png",
          "description1": "Lorem ipsum dolor sit amet.",
          "description2": "",
          "newItemPrice": "$630",
          "oldItemPrice": "$544"
        }
    },
    {
      "id" : 4,
        "itemInfo" :
        {
          "name": "XBOX 1",
          "itemImg": "/IMAGES/jblflip6.png",
          "description1": "Lorem ipsum dolor sit amet.",
          "description2": "",
          "newItemPrice": "$630",
          "oldItemPrice": "$544"
        }
    }
  ]
}













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
//end

//Selected for You

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
//end

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
