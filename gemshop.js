"use strict"

let filterBox = document.getElementById("filters")
let showBox = document.getElementById("showbox")

/*

START CODING HERE....

*/

// const sendProductRequest = (url) => {
//   let req = new XMLHttpRequest()
//   req.open("GET", url , false)
//   req.onload = function () {
//     if(req.status === 200){
//       return (this.responseText);
//     }
//   }
//   req.send()
//   return (req.onload());
// }


class Products {
  /*

  LOAD ALL PRODUCTS AND SAVE THEM TO THE LOCALSTORAGE

  */
  static saveItems() {
    let req = new XMLHttpRequest();
    req.open("GET", "/JSON/product.json", false);
    req.onload = function () {
      if (req.status === 200) {
        if(localStorage.StoreItems){
          localStorage.setItem("StoreItems", this.responseText)
        }
        else{
          localStorage.StoreItems = this.responseText;
        }
      }
    };
    req.send();
  }

  /*

   RETRIEVE ALL ITEMS FROM LOCAL STORAGE

   */
  static getAllItems() {
    return JSON.parse(localStorage.StoreItems);
  }
}


Products.saveItems() //Fetch All Items and store them


class loadupItem {
  static allCellPhones () {
    let sendRequest = new XMLHttpRequest();
    sendRequest.open("GET", "/HTML/all-phones.html" , false)
    sendRequest.onreadystatechange = function () {
      if(sendRequest.status === 200){
        filterBox.innerHTML = this.response
      }
    }
    sendRequest.send();
  }

  static allGaming () {
    let sendRequest = new XMLHttpRequest();
    sendRequest.open("GET", "/HTML/all-games.html" , false)
    sendRequest.onreadystatechange = function () {
      if(sendRequest.status === 200){
        filterBox.innerHTML = this.response
      }
    }
    sendRequest.send();
  }

  static allComputer () {
    let sendRequest = new XMLHttpRequest();
    sendRequest.open("GET", "/HTML/all-computers.html" , false)
    sendRequest.onreadystatechange = function () {
      if(sendRequest.status === 200){
        filterBox.innerHTML = this.response
      }
    }
    sendRequest.send();
  }

  static allIpad () {
    let sendRequest = new XMLHttpRequest();
    sendRequest.open("GET", "/HTML/all-ipads.html" , false)
    sendRequest.onreadystatechange = function () {
      if(sendRequest.status === 200){
        filterBox.innerHTML = this.response
      }
    }
    sendRequest.send();
  }

  static allSpeaker () {
    let sendRequest = new XMLHttpRequest();
    sendRequest.open("GET", "/HTML/all-speakers.html" , false)
    sendRequest.onreadystatechange = function () {
      if(sendRequest.status === 200){
        filterBox.innerHTML = this.response
      }
    }
    sendRequest.send();
  }

  static allTv () {
    let sendRequest = new XMLHttpRequest();
    sendRequest.open("GET", "/HTML/all-tvs.html" , false)
    sendRequest.onreadystatechange = function () {
      if(sendRequest.status === 200){
        filterBox.innerHTML = this.response
      }
    }
    sendRequest.send();
  }
}

// let m = "gaming"
// console.log(Products.getAllItems().selectedProducts[0][`${m}`]);

class display {
  static items (mRoute, target) {
    let x = ``;
    for(let i in mRoute[`${target}`]){
      x += `<div class="item-box" onclick="toProduct()">
      <img src=${mRoute[`${target}`][i].itemInfo.itemImg} alt="">
      <div class="item-details">
          <h1>${mRoute[`${target}`][i].itemInfo.name}</h1>
          <h2>${mRoute[`${target}`][i].itemInfo.description1}</h2>
          <div class="specifications">
              <strong>Refurbished</strong>
              <p><strong>Model : </strong>MKLV3LL/A</p>
              <p><strong>SKU : </strong>87294820</p>
              <p><strong>Color : </strong>Sierra Blue</p>
          </div>
      </div>
      <div class="buy">
          <div class="price-tag">
              <span class="currency">$ </span><span class="price">${mRoute[`${target}`][i].itemInfo.newItemPrice}</span>
          </div>
          <button>Add to Cart</button>
      </div>
  </div>`
    }
    showBox.innerHTML = x
  }
}

const cellPhones = () => {
  loadupItem.allCellPhones()
  display.items(Products.getAllItems().selectedProducts[0], "cellphones")
}

const Gamings = () => {
  loadupItem.allGaming()
  display.items(Products.getAllItems().selectedProducts[0], "gaming")
}

const Computers = () => {
  loadupItem.allComputer()
  display.items(Products.getAllItems().selectedProducts[0], "computers")
}

const Speakers = () => {
  loadupItem.allSpeaker()
  display.items(Products.getAllItems().selectedProducts[0], "speaker")
}

const TVs = () => {
  loadupItem.allTv()
  display.items(Products.getAllItems().selectedProducts[0], "tv")
}