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
  // static items(boxID, mRoute, target) {
  // 	let x = ``;
  // 	let y = ``
  // 	for (let i in mRoute[`${target}`]) {
  // 		// 		x += `<div class="item-box" data-id=${
  // 		//    mRoute[`${target}`][i].id
  // 		//  } onclick="viewProduct(event)">
  // 		// 		   <img src=${mRoute[`${target}`][i].itemInfo.itemImg} alt="">
  // 		// 		   <div class="item-details">
  // 		// 				   <h1>${mRoute[`${target}`][i].itemInfo.name}</h1>
  // 		// 				   <h2>${
  // 		// 					mRoute[`${target}`][i].itemInfo.description1
  // 		// 				   } ${mRoute[`${target}`][i].itemInfo.memory}GB</h2>
  // 		// 				   <div class="specifications">
  // 		// 						   <strong>Refurbished</strong>
  // 		// 						   <p><strong>Model : </strong>MKLV3LL/A</p>
  // 		// 						   <p><strong>SKU : </strong>87294820</p>
  // 		// 						   <p><strong>Color : </strong>Sierra Blue</p>
  // 		// 				   </div>
  // 		// 		   </div>
  // 		// 		   <div class="buy">
  // 		// 				   <div class="price-tag">
  // 		// 						   <span class="currency">$ </span><span class="price">${
  // 		// 							mRoute[`${target}`][i].itemInfo
  // 		// 							  .newItemPrice
  // 		// 						   }</span>
  // 		// 				   </div>
  // 		// 				   <button onclick = "addToCart(event)"> Add to Cart </button>
  // 		// 		   </div>
  // 		// 		   </div>`;
  // 		y += `
  // 		<div class = "sel-box">
  // 						<div class="img-con">
  // 							<img src="/IMAGES/frontIpad.png" src=${mRoute[`${target}`][i].itemInfo.itemImg} alt="">
  // 						</div>
  // 						<div class="sfu">
  // 							<div class="text-hold">
  // 								<p class="itemName2">${mRoute[`${target}`][i].itemInfo.name}</p>
  // 								<div div class = "description-box"
  // 								data-id = ${
  // 			mRoute[`${target}`][i].id
  // 		}
  // 		onclick = "viewProduct(event)">
  // 		<p class = "item-description" > ${
  // 			mRoute[`${target}`][i].itemInfo.description1
  // 		}
  // 		${
  // 			mRoute[`${target}`][i].itemInfo.memory
  // 		}
  // 		GB
  // 		</p>
  // 	</div>
  // 		</div>
  // 		<div class="price-order">
  // 			<span class="price-box">
  // 				<span class = "price" > <span class = "currency"
  // 				id = "currency" > $ </span> ${
  // 				mRoute[`${target}`][i].itemInfo
  // 					.newItemPrice
  // 				} </span>
  // 				<span class="old-price price">${
  // 		mRoute[`${target}`][i].itemInfo
  // 			.oldItemPrice
  // 		}</span>
  // 			</span>
  // 			<button id="cart-btn" class="cart-btn"><img id="addto-cart-img" src="/IMAGES/add-to-cart.png"
  // 					alt="" onclick = "addToCart(event)">
  // 			</button>
  // 		</div>
  // 	</div>
  // 	</div>`
  // 	}
  // 	boxID.innerHTML = `<h1 class="cat-head">${target}</h1>` + y;
  // }

  static allUI(directory, category, boxID) {
    let y = ""

    if (directory.length === 0) {
      showBox.innerHTML = `<div class="noresult">
			<h1 class = "cat-head" > Oops, there are no results
			for "${Query}" </h1>  <p>Try checking your spelling or use more general terms</p >
		</div>`
    }

    if (directory.length > 0) {
      for (let k = 0; k < 10; k++) {
        y += `
			<div div class = "sel-box" data-id = ${directory[k].id}>
				<div class = "img-con"
				data-id = ${
					directory[k].id
				}
				onclick = "viewProduct(event)" >
					<img src=${directory[k].itemInfo.itemImg} alt="">
				</div>
				<div class="sfu">
					<div class="text-hold">
						<p class="itemName2">${directory[k].itemInfo.name}</p>
						<div div class = "description-box"
						data-id=${directory[k].id} onclick = "viewProduct(event)">
						<p class = "item-description" > ${directory[k].itemInfo.description1}
						</p>
					</div>
				</div>
				<div class="price-order">
					<span class="price-box">
						<span class = "price" > <span class = "currency"
						id = "currency" > $ </span> ${directory[k].itemInfo.newItemPrice} </span>
						<span class = "old-price price" > ${directory[k].itemInfo.oldItemPrice }</span>
					</span>
					<button id="cart-btn" data-id = ${directory[k].id} class="cart-btn">
						<img id="addto-cart-img" src="/IMAGES/add-to-cart.png"
							alt="" onclick = "addToCart(event)">
					</button>
				</div>
			</div>
		</div>`
      }
      document.getElementById(category).innerText = boxID
      document.getElementById(boxID).innerHTML = y
    }
  }

  static displayAll() {
    let dir2 = JSON.parse(localStorage.getItem("StoreItems"));
    let dir = dir2.selectedProducts[0];
    this.allUI(dir.cellphones, "sec-name-cellphones", "cellphones")
    this.allUI(dir.gaming, "sec-name-gaming", "gamings")
    this.allUI(dir.speakers, "sec-name-speakers", "speakers")
    this.allUI(dir.computers, "sec-name-computer", "computers")
    this.allUI(dir.tv, "sec-name-tv", "TV")
  }
}
display.displayAll()



const emptyParameters = () => {
  let Parameters = {
    Price: [],
    Range: [{
      high: 5000,
      low: 300
    }],
    Brand: [],
    Memory: [],
    Ram: [],
    Rom: [],
    Screen: [],
    Size: [],
    Filters: [],
    Radio: [],
    SearchQuery: "",
    Page: "0",
    Order: "Random"
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
    displayFilteredResults(filter.brand(
      event,
      "cellphones",
      "Apple"
    ));
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



const gamingFilters = () => {
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
}


const comFilters = () => {
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
}



const speakerFilters = () => {
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
}


const tvFilters = () => {
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
}



// PRODUCT DISPLAY (TAB CLICK)
const cellPhones = () => {
  // Dislay Cellphones
  getFilter.allCellPhones();
  // display.items(showBox, productRoute, "cellphones");

  // Phone Filters
  phoneFilters()
};




const Gamings = () => {
  getFilter.allGaming();
  // display.items(showBox, productRoute, "gaming");

  // Gaming Filters
  gamingFilters()
};




const Computers = () => {
  getFilter.allComputer();
  // display.items(showBox, productRoute, "computers");

  // Computers Filters
  comFilters()
};




const Speakers = () => {
  getFilter.allSpeaker();
  // display.items(showBox, productRoute, "speakers");

  // Computers Filters
  speakerFilters()
};




const TVs = () => {
  getFilter.allTv();
  // display.items(showBox, productRoute, "tv");

  // Computers Filters
  tvFilters()
};



// WORKING WITH ITEM SEARCH CATEGORY
let urlCategory = document.URL;
try {
  urlCategory = urlCategory.split("?")[1].split("=")[1].split("&")[0];
} catch (error) {}

switch (urlCategory) {
  case "cellphones":
    cellPhones();
    break;
  case "computers":
    Computers();
    break;
  case "speakers":
    Speakers();
    break;
  case "tv":
    TVs();
    break;
  case "gaming":
    Gamings();
    break;
}


if (document.URL.split("?").length === 1) {
  display.displayAll();
  document.querySelector(".filters").style.display = "none"
}


[...document.querySelectorAll("#games")].forEach(btn => btn.addEventListener("click", (e) => {
  Gamings();
  emptyParameters();
  window.location = "http://127.0.0.1:5500/HTML/gemshop.html?category=gaming&Order=Random&Page=0";
}));


[...document.querySelectorAll("#phones")].forEach(btn => btn.addEventListener("click", (e) => {
  cellPhones();
  emptyParameters();
  window.location =
    "http://127.0.0.1:5500/HTML/gemshop.html?category=cellphones&Order=Random&Page=0";
}));


[...document.querySelectorAll("#coms")].forEach(btn => btn.addEventListener("click", (e) => {
  Computers();
  emptyParameters();
  window.location =
    "http://127.0.0.1:5500/HTML/gemshop.html?category=computers&Order=Random&Page=0";
}));


[...document.querySelectorAll("#spks")].forEach(btn => btn.addEventListener("click", (e) => {
  Speakers();
  emptyParameters();
  window.location = "http://127.0.0.1:5500/HTML/gemshop.html?category=speakers&Order=Random&Page=0";
}));


[...document.querySelectorAll("#tele")].forEach(btn => btn.addEventListener("click", (e) => {
  TVs();
  emptyParameters();
  window.location = "http://127.0.0.1:5500/HTML/gemshop.html?category=tv&Order=Random&Page=0";
}));



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
  let ItemID = event.target.parentNode.dataset.id;
  let pickItemFromStore = item(ItemID);
  console.log(ItemID);
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