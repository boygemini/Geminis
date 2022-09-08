"use strict"

let filterBox = document.getElementById("filters")
let showBox = document.getElementById("showbox")
let gamingBox = document.getElementById("gaming"),
cellPhoneBox = document.getElementById("cellphones"),
computerBox = document.getElementById("computer"),
speakersBox = document.getElementById("speakers"),
tvsBox = document.getElementById("TV")


/*

START CODING HERE....

*/


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


const getItemsByCategory = (url) => {
let sendRequest = new XMLHttpRequest();
  sendRequest.open("GET", url , false)
  sendRequest.onreadystatechange = function () {
    if(sendRequest.status === 200){
      filterBox.innerHTML = this.response
    }
  }
  sendRequest.send();
}


class loadupItem {
  static allCellPhones () {
    getItemsByCategory("/HTML/all-phones.html")
  }

  static allGaming () {
    getItemsByCategory("/HTML/all-games.html")
  }

  static allComputer () {
    getItemsByCategory("/HTML/all-computers.html")
  }

  static allSpeaker () {
    getItemsByCategory("/HTML/all-speakers.html")
  }

  static allTv () {
    getItemsByCategory("/HTML/all-tvs.html")
  }
}


class display {
  static items (boxID ,mRoute, target) {
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
    boxID.innerHTML =`<h1 class="cat-head">${target}</h1>` + x
  }


  static displayAll () {
    loadupItem.allCellPhones()
    display.items(cellPhoneBox, Products.getAllItems().selectedProducts[0], "cellphones")

    loadupItem.allGaming()
    display.items(gamingBox, Products.getAllItems().selectedProducts[0], "gaming")

    loadupItem.allComputer()
    display.items(computerBox, Products.getAllItems().selectedProducts[0], "computers")

    loadupItem.allSpeaker()
    display.items(speakersBox, Products.getAllItems().selectedProducts[0], "speaker")

    loadupItem.allTv()
    display.items(tvsBox, Products.getAllItems().selectedProducts[0], "tv")
  }
}


display.displayAll()


const cellPhones = () => {
  loadupItem.allCellPhones()
  display.items(showBox, Products.getAllItems().selectedProducts[0], "cellphones")
}


const Gamings = () => {
  loadupItem.allGaming()
  display.items(showBox, Products.getAllItems().selectedProducts[0], "gaming")
}


const Computers = () => {
  loadupItem.allComputer()
  display.items(showBox, Products.getAllItems().selectedProducts[0], "computers")
}


const Speakers = () => {
  loadupItem.allSpeaker()
  display.items(showBox, Products.getAllItems().selectedProducts[0], "speaker")
}


const TVs = () => {
  loadupItem.allTv()
  display.items(showBox, Products.getAllItems().selectedProducts[0], "tv")
}

/*

PRODUCT DISPLAY

*/

