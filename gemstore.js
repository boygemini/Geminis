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
  } catch (error) {
    console.log(error.message);
  }
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