"use strict";

let filterBox = document.getElementById("filters");
let showBox = document.getElementById("showbox");
let gamingBox = document.getElementById("gaming"),
  cellPhoneBox = document.getElementById("cellphones"),
  computerBox = document.getElementById("computer"),
  speakersBox = document.getElementById("speakers"),
  tvsBox = document.getElementById("TV");

/*

START CODING HERE....

*/

let currentItemsOnDisplay;

class Products {
  //LOAD ALL PRODUCTS AND SAVE THEM TO THE LOCALSTORAGE
  static saveItems() {
    let req = new XMLHttpRequest();
    req.open("GET", "/JSON/product.json", false);
    req.onload = function () {
      if (req.status === 200) {
        if (localStorage.StoreItems) {
          localStorage.setItem("StoreItems", this.responseText);
        } else {
          localStorage.StoreItems = this.responseText;
        }
      }
    };
    req.send();
  }

  //RETRIEVE ALL ITEMS FROM LOCAL STORAGE
  static getAllItems() {
    return JSON.parse(localStorage.StoreItems);
  }
}




//Fetch All Items and store them
Products.saveItems();
let productRoute = Products.getAllItems().selectedProducts[0];




const getItemsByCategory = (url) => {
  let sendRequest = new XMLHttpRequest();
  sendRequest.open("GET", url, false);
  sendRequest.onreadystatechange = function () {
    if (sendRequest.status === 200) {
      filterBox.innerHTML = this.response;
    }
  };
  sendRequest.send();
};




class getFilter {
  static allCellPhones() {
    getItemsByCategory("/HTML/all-phones.html");
  }

  static allGaming() {
    getItemsByCategory("/HTML/all-games.html");
  }

  static allComputer() {
    getItemsByCategory("/HTML/all-computers.html");
  }

  static allSpeaker() {
    getItemsByCategory("/HTML/all-speakers.html");
  }

  static allTv() {
    getItemsByCategory("/HTML/all-tvs.html");
  }
}




class display {
  static items(boxID, mRoute, target) {
    let x = ``;
    for (let i in mRoute[`${target}`]) {
      x += `<div class="item-box" data-id=${
	   mRoute[`${target}`][i].id
	 } onclick="viewProduct(event)">
			   <img src=${mRoute[`${target}`][i].itemInfo.itemImg} alt="">
			   <div class="item-details">
					   <h1>${mRoute[`${target}`][i].itemInfo.name}</h1>
					   <h2>${
						mRoute[`${target}`][i].itemInfo.description1
					   } ${mRoute[`${target}`][i].itemInfo.memory}GB</h2>
					   <div class="specifications">
							   <strong>Refurbished</strong>
							   <p><strong>Model : </strong>MKLV3LL/A</p>
							   <p><strong>SKU : </strong>87294820</p>
							   <p><strong>Color : </strong>Sierra Blue</p>
					   </div>
			   </div>
			   <div class="buy">
					   <div class="price-tag">
							   <span class="currency">$ </span><span class="price">${
								mRoute[`${target}`][i].itemInfo
								  .newItemPrice
							   }</span>
					   </div>
					   <button onclick = "addToCart(event)"> Add to Cart </button>
			   </div>
			   </div>`;
    }
    boxID.innerHTML = `<h1 class="cat-head">${target}</h1>` + x;
  }

  static displayAll() {
    display.items(cellPhoneBox, productRoute, "cellphones");
    display.items(gamingBox, productRoute, "gaming");
    display.items(computerBox, productRoute, "computers");
    display.items(speakersBox, productRoute, "speakers");
    display.items(tvsBox, productRoute, "tv");
  }
}
// display.displayAll()



const emptyParameters = () => {
  let Parameters = {
    Price: [],
    Range: [],
    Brand: [],
    Memory: [],
    Ram: [],
    Rom: [],
    Screen: [],
    Size: [],
    Filters: [],
    Radio: [],
    SearchQuery: ""
  };
  let stringifyParameters = JSON.stringify(Parameters);
  localStorage.setItem("Parameters", stringifyParameters);
};




const phonesBrandCheck = (apple, brand) => {
  apple.addEventListener("click", (event) => {
    displayFilteredResults(filter.brand(event, "cellphones", brand));
  });
}




const phoneFilters = () => {
  // Price filter
  firstlevelprice.addEventListener("click", (event) => {
    displayFilteredResults(filter.price(event, "cellphones", 300, 799));
  });

  secondlevelprice.addEventListener("click", (event) => {
    displayFilteredResults(filter.price(event, "cellphones", 800, 1199));
  });

  thirdlevelprice.addEventListener("click", (event) => {
    displayFilteredResults(filter.price(event, "cellphones", 1200, 2000));
  });

  applyminmax.addEventListener("click", (event) => {
    displayFilteredResults(
      filter.priceMinMax(
        event,
        "cellphones",
        Number(min.value),
        Number(max.value)
      )
    );
  });

  // Brand filter
  apple.addEventListener("click", (event) => {
    displayFilteredResults(filter.brand(event, "cellphones", "Apple"));
  });

  samsung.addEventListener("click", (event) => {
    displayFilteredResults(filter.brand(event, "cellphones", "Samsung"));
  });

  itel.addEventListener("click", (event) => {
    displayFilteredResults(filter.brand(event, "cellphones", "Itel"));
  });

  infinix.addEventListener("click", (event) => {
    displayFilteredResults(filter.brand(event, "cellphones", "Infinix"));
  });

  lg.addEventListener("click", (event) => {
    displayFilteredResults(filter.brand(event, "cellphones", "LG"));
  });

  // Memory filter
  m16.addEventListener("click", (event) => {
    displayFilteredResults(filter.memory(event, "cellphones", 16));
  });

  m32.addEventListener("click", (event) => {
    displayFilteredResults(filter.memory(event, "cellphones", 32));
  });

  m64.addEventListener("click", (event) => {
    displayFilteredResults(filter.memory(event, "cellphones", 64));
  });

  m128.addEventListener("click", (event) => {
    displayFilteredResults(filter.memory(event, "cellphones", 128));
  });

  m256.addEventListener("click", (event) => {
    displayFilteredResults(filter.memory(event, "cellphones", 256));
  });
}













// PRODUCT DISPLAY (TAB CLICK)
const cellPhones = () => {
  // Dislay Cellphones
  getFilter.allCellPhones();
  display.items(showBox, productRoute, "cellphones");

  // Phone Filters
  phoneFilters()
};




const Gamings = () => {
  getFilter.allGaming();
  display.items(showBox, productRoute, "gaming");

  // Price filter
  firstlevelprice.addEventListener("click", (event) => {
    displayFilteredResults(filter.price(event, "gaming", 300, 799));
  });

  secondlevelprice.addEventListener("click", (event) => {
    displayFilteredResults(filter.price(event, "gaming", 800, 1199));
  });

  thirdlevelprice.addEventListener("click", (event) => {
    displayFilteredResults(filter.price(event, "gaming", 1200, 2000));
  });

  applyminmax.addEventListener("click", (event) => {
    displayFilteredResults(
      filter.priceMinMax(event, "gaming", Number(min.value), Number(max.value))
    );
  });

  // Brand Filter
  xbox.addEventListener("click", (event) => {
    displayFilteredResults(filter.brand(event, "gaming", "Xbox"));
  });
  ps.addEventListener("click", (event) => {
    displayFilteredResults(filter.brand(event, "gaming", "Ps"));
  });
};




const Computers = () => {
  getFilter.allComputer();
  display.items(showBox, productRoute, "computers");

  // Price
  firstlevelprice.addEventListener("click", (event) => {
    displayFilteredResults(filter.price(event, "computers", 900, 1199));
  });
  secondlevelprice.addEventListener("click", (event) => {
    displayFilteredResults(filter.price(event, "computers", 1200, 1399));
  });
  thirdlevelprice.addEventListener("click", (event) => {
    displayFilteredResults(filter.price(event, "computers", 1400, 2000));
  });
  applyminmax.addEventListener("click", (event) => {
    displayFilteredResults(
      filter.priceMinMax(
        event,
        "computers",
        Number(min.value),
        Number(max.value)
      )
    );
  });

  // Brand
  mac.addEventListener("click", (event) => {
    displayFilteredResults(filter.brand(event, "computers", "Mac"));
  });
  hp.addEventListener("click", (event) => {
    displayFilteredResults(filter.brand(event, "computers", "HP"));
  });
  asus.addEventListener("click", (event) => {
    displayFilteredResults(filter.brand(event, "computers", "ASUS"));
  });
  toshiba.addEventListener("click", (event) => {
    displayFilteredResults(filter.brand(event, "computers", "Toshiba"));
  });

  // RAM
  ram4.addEventListener("click", (event) => {
    displayFilteredResults(filter.ram(event, "computers", 4));
  });
  ram8.addEventListener("click", (event) => {
    displayFilteredResults(filter.ram(event, "computers", 8));
  });
  ram16.addEventListener("click", (event) => {
    displayFilteredResults(filter.ram(event, "computers", 16));
  });
  ram32.addEventListener("click", (event) => {
    displayFilteredResults(filter.ram(event, "computers", 32));
  });

  // ROM/STORAGE
  st256.addEventListener("click", (event) => {
    displayFilteredResults(filter.rom(event, "computers", 256));
  });
  st512.addEventListener("click", (event) => {
    displayFilteredResults(filter.rom(event, "computers", 512));
  });
  st1tb.addEventListener("click", (event) => {
    displayFilteredResults(filter.rom(event, "computers", 1000));
  });
  st2tb.addEventListener("click", (event) => {
    displayFilteredResults(filter.rom(event, "computers", 2000));
  });

  // SCREEN
  inch9.addEventListener("click", (event) => {
    displayFilteredResults(filter.screen(event, "computers", 9));
  });
  inch13.addEventListener("click", (event) => {
    displayFilteredResults(filter.screen(event, "computers", 13));
  });
  inch16.addEventListener("click", (event) => {
    displayFilteredResults(filter.screen(event, "computers", 16));
  });
};




const Speakers = () => {
  getFilter.allSpeaker();
  display.items(showBox, productRoute, "speakers");

  // Price filter
  firstlevelprice.addEventListener("click", (event) => {
    displayFilteredResults(filter.price(event, "speakers", 300, 799));
  });

  secondlevelprice.addEventListener("click", (event) => {
    displayFilteredResults(filter.price(event, "speakers", 800, 1199));
  });

  thirdlevelprice.addEventListener("click", (event) => {
    displayFilteredResults(filter.price(event, "speakers", 1200, 2000));
  });

  applyminmax.addEventListener("click", (event) => {
    displayFilteredResults(
      filter.priceMinMax(event, "speakers", Number(min.value), Number(max.value))
    );
  });

  // Brand Filter
  oraimo.addEventListener("click", (event) => {
    displayFilteredResults(filter.brand(event, "speakers", "oraimo"));
  });
  beatz.addEventListener("click", (event) => {
    displayFilteredResults(filter.brand(event, "speakers", "beatz"));
  });
  jbl.addEventListener("click", (event) => {
    displayFilteredResults(filter.brand(event, "speakers", "jbl"));
  });
};




const TVs = () => {
  getFilter.allTv();
  display.items(showBox, productRoute, "tv");

  // Price filter
  firstlevelprice.addEventListener("click", (event) => {
    displayFilteredResults(filter.price(event, "tv", 300, 799));
  });

  secondlevelprice.addEventListener("click", (event) => {
    displayFilteredResults(filter.price(event, "tv", 800, 1199));
  });

  thirdlevelprice.addEventListener("click", (event) => {
    displayFilteredResults(filter.price(event, "tv", 1200, 2000));
  });

  applyminmax.addEventListener("click", (event) => {
    displayFilteredResults(
      filter.priceMinMax(event, "tv", Number(min.value), Number(max.value))
    );
  });

  // Brand Filter
  hisense.addEventListener("click", (event) => {
    displayFilteredResults(filter.brand(event, "tv", "hisense"));
  });
  samsung.addEventListener("click", (event) => {
    displayFilteredResults(filter.brand(event, "tv", "samsung"));
  });
  lg.addEventListener("click", (event) => {
    displayFilteredResults(filter.brand(event, "tv", "lg"));
  });
  midea.addEventListener("click", (event) => {
    displayFilteredResults(filter.brand(event, "tv", "midea"));
  });
  toshiba.addEventListener("click", (event) => {
    displayFilteredResults(filter.brand(event, "tv", "toshiba"));
  });

  // Size Filter
};



// WORKING WITH ITEM SEARCH CATEGORY
let urlCategory = document.URL;
try {
  urlCategory = urlCategory.split("?")[1].split("=")[1].split("&")[0];
} catch (error) {}

if (urlCategory === "cellphones") {
  cellPhones();
}

if (urlCategory === "computers") {
  Computers();
}

if (urlCategory === "speakers") {
  Speakers();
}

if (urlCategory === "tv") {
  TVs();
}

if (urlCategory === "gaming") {
  Gamings();
}

games.addEventListener("click", (e) => {
  Gamings();
  emptyParameters();
  window.location = "http://127.0.0.1:5500/HTML/gemshop.html?category=gaming";
});

phones.addEventListener("click", (e) => {
  cellPhones();
  emptyParameters();
  window.location =
    "http://127.0.0.1:5500/HTML/gemshop.html?category=cellphones";
});

coms.addEventListener("click", (e) => {
  Computers();
  emptyParameters();
  window.location =
    "http://127.0.0.1:5500/HTML/gemshop.html?category=computers";
});

spks.addEventListener("click", (e) => {
  Speakers();
  emptyParameters();
  window.location = "http://127.0.0.1:5500/HTML/gemshop.html?category=speakers";
});

tele.addEventListener("click", (e) => {
  TVs();
  emptyParameters();
  window.location = "http://127.0.0.1:5500/HTML/gemshop.html?category=tv";
});



//PRODUCT DISPLAY (SEARCH)
const viewProduct = (event) => {
  let itemID =
    event.target.dataset.id ||
    event.target.parentNode.dataset.id ||
    event.target.parentNode.parentNode.dataset.id ||
    event.target.parentNode.parentNode.parentNode.dataset.id;
  if (itemID) {
    let url = `product.html?item=${encodeURIComponent(itemID)}`;
    window.location = url;
  }
};




// ADD ITEMS TO CART
let cart = [];
class Storage {
  // RETRIEVE RETRIEVE ALL ITEMS TOTAL PRODUCTS
  static getAllProducts() {
    return JSON.parse(localStorage.getItem("StoreItems"));
  }

  // RETRIEVE RECENTLY ADDED ITEMS FROM TOTAL PRODUCTS
  static getRecentItems() {
    return Storage.getAllProducts().recentlyAdded;
  }

  // RETRIEVE WEEKLY FEATURE ITEMS FROM TOAL PRODUCTS
  static weeklyFeaturedItems() {
    return Storage.getAllProducts().WeeklyFeatured;
  }

  // SAVE ITEMS TO CART
  static saveSelectedItemsToCart(cart) {
    localStorage.Cart = JSON.stringify(cart);
    localStorage.setItem("Cart", localStorage.Cart);
  }

  // RETRIEVE ALL ITEMS FROM CART
  static getItemsInCart() {
    return JSON.parse(localStorage.getItem("Cart"));
  }

  // GET THE NUMBER OF ITEMS IN CART
  static numberOfItemsInCart() {
    if (Storage.getItemsInCart() === null || undefined) {
      return "0";
    } else {
      let mapCart = Storage.getItemsInCart().map((cI) => cI.amount);
      let reduceCart = mapCart.reduce((x, y) => x + y, 0);
      return reduceCart;
    }
  }

  // UPDATE CART
  static updateCart(cartName) {
    Storage.saveSelectedItemsToCart(cartName);
    cartDom.innerText = Storage.numberOfItemsInCart();
  }

  // GET AND SAVE PICKED ITEM TO CART
  static getItemAndSaveToCart() {
    let getbackcart = JSON.parse(localStorage.getItem("Cart"));

    if (cart === null || cart.length === 0) {
      cart = [pickedItem];
      Storage.updateCart(cart);
    }

    if (cart !== null || cart.length !== 0) {
      let pickedItemID = event.target.parentNode.parentNode.dataset.id;
      let check = getbackcart.find((item) => item.id === pickedItemID);

      if (check) {
        check.amount += 1;
        Storage.updateCart(getbackcart);
      }

      if (!check) {
        getbackcart = [...getbackcart, pickedItem];
        Storage.updateCart(getbackcart);
      }
    }
  }
}



// GET ITEMS AND SORT
const getAllItems = () => {
  let allItems = JSON.parse(localStorage.getItem("StoreItems"));
  return allItems;
};



const item = (ItemID) => {
  let recentlyAdded = getAllItems().recentlyAdded;
  let WeeklyFeatured = getAllItems().WeeklyFeatured;

  for (let i in recentlyAdded) {
    if (recentlyAdded[i].id === ItemID) {
      return recentlyAdded[i];
    }
  }

  for (let i in WeeklyFeatured) {
    if (WeeklyFeatured[i].id === ItemID) {
      return WeeklyFeatured[i];
    }
  }

  let category = ["gaming", "cellphones", "speakers", "computers", "tv"];
  let allItems = getAllItems().selectedProducts[0];
  for (let i in category) {
    let all = allItems[`${category[i]}`];
    for (let j in all) {
      if (all[j].id === ItemID) {
        return all[j];
      }
    }
  }
};



// POP-UP NOTIFICATION
const popupNotification = (itemName, itemImage) => {
  let notification = document.getElementById("notify-box");
  let creatNotBox = document.createElement("div");
  creatNotBox.classList = " notification on";
  creatNotBox.innerHTML = `<img src=${itemImage} alt="" srcset="" class="noti-img"><p>You added <strong id="itemname">${itemName}</strong> to cart</p>`;
  notification.appendChild(creatNotBox);
  setTimeout(() => {
    creatNotBox.classList = " notification off";
  }, 2500);
  setTimeout(() => {
    creatNotBox.classList = "complete-off";
  }, 3200);
  setTimeout(() => {
    creatNotBox.classList = "die";
  }, 3200);
};




// DISPLAY NUMBER OF ITEMS IN CART
let cartDom = document.getElementById("items-in-cart");
try {
  cartDom.innerText = Storage.numberOfItemsInCart();
} catch (error) {
  console.log(error.message);
}



// ADD ITEM TO CART
let ItemsInCart = JSON.parse(localStorage.getItem("Cart")),
  pickedItem;
const addToCart = (event) => {
  event.stopPropagation();

  let ItemID = event.target.parentNode.parentNode.dataset.id;
  let pickItemFromStore = item(ItemID);

  popupNotification(
    pickItemFromStore.itemInfo.name,
    pickItemFromStore.itemInfo.itemImg
  );
  pickedItem = {
    ...pickItemFromStore,
    amount: 1,
  };

  if (pickItemFromStore) {
    try {
      Storage.getItemAndSaveToCart();
    } catch (error) {
      console.log(error);
    }
  }
};