"use strict"

let menu = document.getElementById("menu"), mb = document.getElementById("mb")
let close = document.querySelectorAll("#close");
menu.style.display = "none"

const removePadding = () => {
    menu.style.height = "0px"
    menu.style.padding = "0px";
}

const openMenu = (e) => {
  menu.style.display = "flex"
  removePadding()
  setTimeout(()=>{
    menu.style.paddingTop = "20px";
      menu.style.height = "400px";
    },20)
}

const closeMenu = () => {
  removePadding()
  setTimeout(() => {
    menu.style.display = "none"
  }, 520);
}

document.addEventListener("click", (e)=>{
    if(e.target !== menu && menu.clientHeight > 0){
      removePadding()
    }
})