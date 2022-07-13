"use strict"

let images = document.querySelectorAll(".imgs");
let intro = document.getElementById("intro");
let intro2 = document.getElementById("intro2");
let gradient = document.getElementById("gradient");
let intoText = document.getElementById("introtext")
let lm = document.getElementById("lm");
let counter = -1 ;
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
  } catch (error) {};
};


const increSlide = () => {
  disOther();
  counter++;
  if (counter === 4) {
    counter = 0;
  }
 placing()
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
  setTimeout(()=>{
    intoText.className += " rollin"
    intoText.className = intoText.className.replace(" rollin", " rollout")
    setTimeout(() => {
      intoText.className = intoText.className.replace(" rollout", " rollin")
    },400);
  },8500)
}

startSlide();
setInterval(startSlide, 9000);

//End of Hero

//Selected For you

let Gaming = [
  {
    "name": "1",
    "itemImg" : "/HTML:CSS/IMAGES/ipad2.png",
    "description1": "Lorem ipsum dolor sit amet.",
    "description2": "",
    "newItemPrice": "$630",
    "oldItemPrice": "$544"
  },
  {
    "name": "2",
    "itemImg" : "/HTML:CSS/IMAGES/ipad2.png",
    "description1": "Lorem ipsum dolor sit amet.",
    "description2": "",
    "newItemPrice": "$630",
    "oldItemPrice": "$984"
  },
  {
    "name": "3",
    "itemImg" : "/HTML:CSS/IMAGES/ipad2.png",
    "description1": "Lorem ipsum dolor sit amet.",
    "description2": "Lorem ipsum dolor sit amet.",
    "newItemPrice": "$1,230",
    "oldItemPrice": ""
  },
  {
    "name": "4",
    "itemImg" : "/HTML:CSS/IMAGES/ipad2.png",
    "description1": "Lorem ipsum dolor sit amet.",
    "description2": "",
    "newItemPrice": "$1,130",
    "oldItemPrice": "$1,050"
  },
  {
    "name": "5",
    "itemImg" : "/HTML:CSS/IMAGES/ipad2.png",
    "description1": "Lorem ipsum dolor sit amet.",
    "description2": "Lorem ipsum dolor",
    "newItemPrice": "$1,930.99",
    "oldItemPrice": "$2,050"
  },
  {
    "name": "6",
    "itemImg" : "/HTML:CSS/IMAGES/ipad2.png",
    "description1": "Lorem ipsum dolor sit amet.",
    "description2": "",
    "newItemPrice": "$1,130",
    "oldItemPrice": "$1,050"
  },
  {
    "name": "7",
    "itemImg" : "/HTML:CSS/IMAGES/ipad2.png",
    "description1": "Lorem ipsum dolor sit amet.",
    "description2": "Lorem ipsum dolor",
    "newItemPrice": "$1,930.99",
    "oldItemPrice": "$2,050"
  }
];


let cellPhones = [
  {
    "name": "iPhone 12 mini",
    "itemImg" : "/HTML:CSS/IMAGES/frontIpad.png",
    "description1": "Lorem ipsum dolor sit amet.",
    "description2": "Lorem as",
    "newItemPrice": "$630.59",
    "oldItemPrice": "$544"
  },
  {
    "name": "iPhone 12 Pro Max",
    "itemImg" : "/HTML:CSS/IMAGES/frontIpad.png",
    "description1": "Lorem ipsum dolor sit amet.",
    "description2": "",
    "newItemPrice": "$630",
    "oldItemPrice": "$544"
  },
  {
    "name": "iPhone 11",
    "itemImg" : "/HTML:CSS/IMAGES/frontIpad.png",
    "description1": "Lorem ipsum dolor sit amet.",
    "description2": "",
    "newItemPrice": "$850",
    "oldItemPrice": ""
  },
  {
    "name": "iPhone 11 Pro Max",
    "itemImg" : "/HTML:CSS/IMAGES/frontIpad.png",
    "description1": "Lorem ipsum dolor sit amet.",
    "description2": "",
    "newItemPrice": "$630",
    "oldItemPrice": "$544"
  },
  {
    "name": "iPad Pro",
    "itemImg" : "/HTML:CSS/IMAGES/ipad2.png",
    "description1": "Lorem ipsum dolor sit amet.",
    "description2": "Lorem ipsum dolor sit amet.",
    "newItemPrice": "$1,030",
    "oldItemPrice": "$1,200"
  }
];

let Speaker = [
  {
    "name": "JBl Flip 6",
    "itemImg" : "/HTML:CSS/IMAGES/jblflip6.png",
    "description1": "Lorem ipsum dolor sit amet.",
    "description2": "",
    "newItemPrice": "$630",
    "oldItemPrice": "$544"
  },
  {
    "name": "JBl Headphone",
    "itemImg" : "/HTML:CSS/IMAGES/headphone.png",
    "description1": "Lorem ipsum dolor sit amet.",
    "description2": "",
    "newItemPrice": "$330",
    "oldItemPrice": "$444.50"
  }
];

let Computers = [
  {
    "name": "Apple Monitor",
    "itemImg" : "/HTML:CSS/IMAGES/tv4.png",
    "description1": "Lorem ipsum dolor sit amet.",
    "description2": "",
    "newItemPrice": "$630",
    "oldItemPrice": "544"
  },
  {
    "name": "Apple Monitor",
    "itemImg" : "/HTML:CSS/IMAGES/bigmonitor.png",
    "description1": "Lorem ipsum dolor sit amet.",
    "description2": "L",
    "newItemPrice": "$630",
    "oldItemPrice": "544"
  },
  {
    "name": "Apple Monitor",
    "itemImg" : "/HTML:CSS/IMAGES/tv4.png",
    "description1": "Lorem ipsum dolor sit amet.",
    "description2": "Lorem ipsum ",
    "newItemPrice": "$630",
    "oldItemPrice": "544"
  }
];

let TV = [
  {
    "name": "LG",
    "itemImg" : "/HTML:CSS/IMAGES/tv4.png",
    "description1": "Lorem ipsum dolor sit amet.",
    "description2": "Lorem ipsum dolor sit amet.",
    "newItemPrice": "$630",
    "oldItemPrice": "544"
  },
  {
    "name": "LG",
    "itemImg" : "/HTML:CSS/IMAGES/tv5.png",
    "description1": "Lorem ipsum dolor sit amet.",
    "description2": "Lorem ipsum dolor sit amet.",
    "newItemPrice": "$630",
    "oldItemPrice": "544"
  },
  {
    "name": "LG",
    "itemImg" : "/HTML:CSS/IMAGES/tv2.jpg",
    "description1": "Lorem ipsum dolor sit amet.",
    "description2": "Lorem ipsum dolor sit amet.",
    "newItemPrice": "$630",
    "oldItemPrice": "544"
  },
  {
    "name": "LG",
    "itemImg" : "/HTML:CSS/IMAGES/tv1.jpg",
    "description1": "Lorem ipsum dolor sit amet.",
    "description2": "Lorem ipsum dolor sit amet.",
    "newItemPrice": "$630",
    "oldItemPrice": "544"
  }
];

let itemName = document.querySelectorAll("#itemName"),
    mainDesc = document.querySelectorAll("#maindesc"),
    minDesc = document.querySelectorAll("#mindesc"),
    oldPrice = document.querySelectorAll("#oldprice"),
    newPrice = document.querySelectorAll("#newprice");

let Holder = document.getElementById("sel-container")

const createItem = (category) => {
  let itemCreated = " "
  for(let i in category){
    itemCreated += `<div class="sel-box">
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
            <button class="add-to-cart">Add</button>
        </div>
    </div>
</div>`
  }
  Holder.innerHTML = itemCreated;
}

createItem(Gaming)

//Selected for You

let boxCounter = 0;
let container = document.getElementById("sel-container"),
      box = document.querySelectorAll(".sel-box");
// const moveRight = () => {
//   boxCounter--;
//   if(boxCounter < 0){boxCounter = 7}
//   for(let y in box){
//     container.style.marginLeft = (box[y].clientWidth * boxCounter)+"px"
//   }
//   console.log(boxCounter);
// }

// const moveLeft = () => {
//   boxCounter++;
//   if(boxCounter === 7){boxCounter = 0}
//   for(let y in box){
//     container.style.marginLeft = (-box[y].clientWidth * boxCounter)+"px"
//   }
//   console.log(boxCounter);
// }

// const moveRight = () => {
//   .scrollIntoView()
// }