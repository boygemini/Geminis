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
console.log(lmContent);

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
let products;

let product_request = new XMLHttpRequest();
product_request.open("GET", "/JSON/product.json", false);
product_request.onload = function () {
  if (product_request.status === 200) {
    products = JSON.parse(this.responseText);
    console.log(typeof products);
  }
};
product_request.send();

const createItem = (category) => {
  let itemCreated = " ";
  for (let i in category) {
    itemCreated += `<div class="sell-box sel-box">
        <div class="img-con">
            <img src=${category[i].itemImg} alt="">
        </div>
        <div class="sfu">
            <p class="itemName2"">${category[i].name}</p>
            <div class="description-box">
                <p class="item-description">${category[i].description1}</p>
                <p class="item-description">${category[i].description2}</p>
            </div>
            <div class="price-order">
                <span class="price-box">
                    <span class="price">${category[i].newItemPrice}</span>
                    <span class="old-price price">${category[i].oldItemPrice}</span>
                </span>
                <img id="add-to-cart-img" src="/IMAGES/add-to-cart.png" alt="" onclick ="addToCart(this)">
            </div>
        </div>
    </div>`;
  }
  Holder.innerHTML = itemCreated;
};
createItem(products.gaming);

//Add Item To Cart

const addToCart = (cat) => {
  console.log(cat.indexOf);
};

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
