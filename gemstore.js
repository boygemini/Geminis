// "use strict"

// "use strict"

// let backgroundSlide = document.getElementById("background");
//     let backPics = [
//     '/HTML:CSS/IMAGES/li-lin-P5xn4DBeA3A-unsplash.jpg',
//     '/HTML:CSS/IMAGES/71Kg9bzDE0L._AC_SL1500_.jpg',
//     '/HTML:CSS/IMAGES/thomas-kelley-JoH60FhTp50-unsplash.jpg',
//     '/HTML:CSS/IMAGES/sigmund-8zfhRkrs2xU-unsplash.jpg'
// ];
//     let counter = 0;
//     const startSlide = () => {
//     if(counter === 3){
//         counter = 0;
//     }
//     backgroundSlide.style.background = `url(${backPics[counter++]})`;
//     backgroundSlide.style.backgroundPosition = "center"
//     backgroundSlide.style.backgroundSize = "cover"
//     console.log(counter);
// }

// startSlide()
// setInterval(()=>{
//     startSlide()
// },2000)

// // let x = 0;
// // function start(){
// //     x++;
// //     console.log(x);
// // }

let images = document.querySelectorAll(".imgs")
let counter = 0;
images[0].style.display = "block"
const startSlide = () => {
    try {
        for(let i = 0; i <= images.length; i++){
            images[i].style.display = "none"
        }
    } catch (error) {
        console.log(error.message);
    }
    counter++
    if(counter === 3){
        counter = 0
    }
    images[counter].style.display = "block"
}

startSlide()
setInterval(startSlide, 10000)

