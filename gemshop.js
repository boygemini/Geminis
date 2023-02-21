"use strict";

let webPage = document.querySelector("html");
webPage.style.opacity = "1";
webPage.style.transition = "1s ease-in-out";

let filterBox = document.querySelectorAll("#filters");
let filterUIObjects = {
	gaming() {
		return ` <div class="fil-box">
        <h1>Shipping</h1><br>
        <label class="option container">
            <input type="checkbox" name="" id="">
            <p>Free</p>
            <span class="checkmark"></span>
        </label>
    </div>
    <div class="fil-box">
        <div class="wrapper">
            <h1>Price</h1><br>
            <div class="box">
                <input type="radio" name="select" id="firstlevelprice">
                <input type="radio" name="select" id="secondlevelprice">
                <input type="radio" name="select" id="thirdlevelprice">
                <label for="firstlevelprice" class="option-1">
                    <div class="dot"></div>
                    <div class="text">$300 to $799</div>
                </label>
                <label for="secondlevelprice" class="option-2">
                    <div class="dot"></div>
                    <div class="text">$800 to $1,199</div>
                </label>
                <label for="thirdlevelprice" class="option-3">
                    <div class="dot"></div>
                    <div class="text">$1,300 to 2,000</div>
                </label>
            </div>
        </div>
        <div class="option minn">
			<p class="applymm" id="applyminmax">APPLY</p>
            <div class="mmdiv">
			<div class="inputContainer">
				<span class="label">Min</span>
				<input type="text" class="minmax" name="" id="min" value="300" placeholder="Min">
			</div>
			<div class="inputContainer">
				<span class="label">Max</span>
				<input type="text" name="" class="minmax" id="max" value="5000" placeholder="Max">
			</div>
            </div>
        </div>
    </div>
    <div class="fil-box">
        <h1>Brand</h1><br>
        <label class="option container">
            <input type="checkbox" class="brandcheck" name="" id="xbox">
            <p>XBOX</p>
            <span class="checkmark"></span>
        </label>
        <label class="option container">
            <input type="checkbox" class="brandcheck" name="" id="ps">
            <p>Play Station</p>
            <span class="checkmark"></span>
        </label>
    </div>`;
	},

	cellphones() {
		return `<div class="fil-box">
        <h1>Shipping</h1><br>
        <label class="option container">
            <input type="checkbox" name="" id="">
            <p>Free</p>
            <span class="checkmark"></span>
        </label>
    </div>
    <div class="fil-box">
       <div class="wrapper">
           <h1>Price</h1><br>
           <div class="box">
               <input type="radio" name="select" id="firstlevelprice">
               <input type="radio" name="select" id="secondlevelprice">
               <input type="radio" name="select" id="thirdlevelprice">
               <label for="firstlevelprice" class="option-1">
                   <div class="dot"></div>
                   <div class="text">$300 to $800</div>
               </label>
               <label for="secondlevelprice" class="option-2">
                   <div class="dot"></div>
                   <div class="text">$900 to $1,500</div>
               </label>
               <label for="thirdlevelprice" class="option-3">
                   <div class="dot"></div>
                   <div class="text">$1,600 to $2,000</div>
               </label>
           </div>
       </div>
       <div class="option minn">
			<p class="applymm" id="applyminmax">APPLY</p>
           <div class="mmdiv">
               <input type="text" class="minmax" name="" id="min" value="300" placeholder="Min">
               <input type="text" name="" class="minmax" id="max" value="5000" placeholder="Max">
           </div>
       </div>
    </div>
    <div class="fil-box">
        <h1>Brand</h1><br>
        <label class="option container">
            <input type="checkbox" class="brandcheck" name="" id="apple">
             <p>Apple</p>
            <span class="checkmark"></span>
        </label>
        <label class="option container">
            <input type="checkbox" class="brandcheck" name="" id="itel">
            <p>Itel</p>
            <span class="checkmark"></span>
        </label>
        <label class="option container">
            <input type="checkbox" class="brandcheck" name="" id="samsung">
            <p>Samsung</p>
            <span class="checkmark"></span>
        </label>
        <label class="option container">
            <input type="checkbox" class="brandcheck" name="" id="infinix">
            <p>Infinix</p>
            <span class="checkmark"></span>
        </label>
        <label class="option container">
            <input type="checkbox" class="brandcheck" name="" id="lg">
            <p>LG</p>
            <span class="checkmark"></span>
        </label>
    </div>
    <div class="fil-box">
        <h1>Memory</h1><br>
        <label class="option container">
            <input type="checkbox" class="memorycheck" name="" id="m16">
            <p>16 GB</p><span class="checkmark"></span>
        </label>
        <label class="option container">
            <input type="checkbox" class="memorycheck" name="" id="m32">
            <p>32 GB</p><span class="checkmark"></span>
        </label>
        <label class="option container">
            <input type="checkbox" class="memorycheck" name="" id="m64">
            <p>64 GB</p><span class="checkmark"></span>
        </label>
        <label class="option container">
            <input type="checkbox" class="memorycheck" name="" id="m128">
            <p>128 GB</p><span class="checkmark"></span>
        </label>
        <label class="option container">
            <input type="checkbox" class="memorycheck" name="" id="m256">
            <p>256 GB</p><span class="checkmark"></span>
        </label>
    </div>`;
	},

	computers() {
		return `<div class="fil-box">
        <h1>Shipping</h1><br>
        <label class="option container">
            <input type="checkbox" name="" id="">
            <p>Free</p>
            <span class="checkmark"></span>
        </label>
    </div>
    <div class="fil-box">
        <div class="wrapper">
            <h1>Price</h1><br>
            <div class="box">
                <input type="radio" name="select" id="firstlevelprice">
                <input type="radio" name="select" id="secondlevelprice">
                <input type="radio" name="select" id="thirdlevelprice">
                <label for="firstlevelprice" class="option-1">
                    <div class="dot"></div>
                    <div class="text">$900 to $1,199</div>
                </label>
                <label for="secondlevelprice" class="option-2">
                    <div class="dot"></div>
                    <div class="text">$1,200 to $1,399</div>
                </label>
                <label for="thirdlevelprice" class="option-3">
                    <div class="dot"></div>
                    <div class="text">$1,400 to $2,000</div>
                </label>
            </div>
        </div>
        <div class="option minn">
			<p class="applymm" id="applyminmax">APPLY</p>
            <div class="mmdiv">
                <input type="text" class="minmax" name="" id="min" value="300" placeholder="Min">
                <input type="text" name="" class="minmax" id="max" value="5000" placeholder="Max">
            </div>
        </div>
    </div>
    <div class="fil-box">
        <h1>Brand</h1><br>
        <label class="option container">
            <input type="checkbox" class="brandcheck" name="" id="mac">
            <p>Mac</p>
            <span class="checkmark"></span>
        </label>
        <label class="option container">
            <input type="checkbox" class="brandcheck" name="" id="hp">
            <p>HP</p>
            <span class="checkmark"></span>
        </label>
        <label class="option container">
            <input type="checkbox" class="brandcheck" name="" id="asus">
            <p>ASUS</p>
            <span class="checkmark"></span>
        </label>
        <label class="option container">
            <input type="checkbox" class="brandcheck" name="" id="toshiba">
            <p>Toshiba</p>
            <span class="checkmark"></span>
        </label>
    </div>
    <div class="fil-box">
        <h1>RAM</h1><br>
        <label class="option container">
            <input type="checkbox" class="memorycheck" name="" id="ram4">
            <p>4 GB</p><span class="checkmark"></span>
        </label>
        <label class="option container">
            <input type="checkbox" class="memorycheck" name="" id="ram8">
            <p>8 GB</p><span class="checkmark"></span>
        </label>
        <label class="option container">
            <input type="checkbox" class="memorycheck" name="" id="ram16">
            <p>16 GB</p><span class="checkmark"></span>
        </label>
        <label class="option container">
            <input type="checkbox" class="memorycheck" name="" id="ram32">
            <p>32 GB</p><span class="checkmark"></span>
        </label>
    </div>
    <div class="fil-box">
        <h1>ROM/STORAGE</h1><br>
        <label class="option container">
            <input type="checkbox" class="memorycheck" name="" id="st256">
            <p>256 GB</p><span class="checkmark"></span>
        </label>
        <label class="option container">
            <input type="checkbox" class="memorycheck" name="" id="st512">
            <p>512 GB</p><span class="checkmark"></span>
        </label>
        <label class="option container">
            <input type="checkbox" class="memorycheck" name="" id="st1tb">
            <p>1 TB</p><span class="checkmark"></span>
        </label>
        <label class="option container">
            <input type="checkbox" class="memorycheck" name="" id="st2tb">
            <p>2 TB</p><span class="checkmark"></span>
        </label>
    </div>
    <div class="fil-box">
        <h1>SCREEN</h1><br>
        <label class="option container">
            <input type="checkbox" class="memorycheck" name="" id="inch9">
            <p>9 INCH</p><span class="checkmark"></span>
        </label>
        <label class="option container">
            <input type="checkbox" class="memorycheck" name="" id="inch13">
            <p>13 INCHES</p><span class="checkmark"></span>
        </label>
        <label class="option container">
            <input type="checkbox" class="memorycheck" name="" id="inch16">
            <p>16 INCHES</p><span class="checkmark"></span>
        </label>
    </div>`;
	},

	speakers() {
		return `<div class="fil-box">
        <h1>Shipping</h1><br>
        <label class="option container">
            <input type="checkbox" name="" id="">
            <p>Free</p>
            <span class="checkmark"></span>
        </label>
    </div>
    <div class="fil-box">
        <div class="wrapper">
            <h1>Price</h1><br>
            <div class="box">
                <input type="radio" name="select" id="firstlevelprice">
                <input type="radio" name="select" id="secondlevelprice">
                <input type="radio" name="select" id="thirdlevelprice">
                <label for="firstlevelprice" class="option-1">
                    <div class="dot"></div>
                    <div class="text">$300 to $799</div>
                </label>
                <label for="secondlevelprice" class="option-2">
                    <div class="dot"></div>
                    <div class="text">$800 to $1,199</div>
                </label>
                <label for="thirdlevelprice" class="option-3">
                    <div class="dot"></div>
                    <div class="text">$1,200 to $2,000</div>
                </label>
            </div>
        </div>
        <div class="option minn">
			<p class="applymm" id="applyminmax">APPLY</p>
            <div class="mmdiv">
                <input type="text" class="minmax" name="" id="min" value="300" placeholder="Min">
                <input type="text" name="" class="minmax" id="max" value="5000" placeholder="Max">
            </div>
        </div>
    </div>
    <div class="fil-box">
        <h1>Brand</h1><br>
        <label class="option container">
            <input type="checkbox" class="brandcheck" name="" id="jbl">
            <p>JBL</p>
            <span class="checkmark"></span>
        </label>
        <label class="option container">
            <input type="checkbox" class="brandcheck" name="" id="oraimo">
            <p>ORAIMO</p>
            <span class="checkmark"></span>
        </label>
        <label class="option container">
            <input type="checkbox" class="brandcheck" name="" id="beatz">
            <p>BEATZ</p>
            <span class="checkmark"></span>
        </label>
    </div>`;
	},

	tv() {
		return `<div class="fil-box">
        <h1>Shipping</h1><br>
        <label class="option container">
            <input type="checkbox" name="" id="">
            <p>Free</p>
            <span class="checkmark"></span>
        </label>
    </div>
    <div class="fil-box">
        <div class="wrapper">
            <h1>Price</h1><br>
            <div class="box">
                <input type="radio" name="select" id="firstlevelprice">
                <input type="radio" name="select" id="secondlevelprice">
                <input type="radio" name="select" id="thirdlevelprice">
                <label for="firstlevelprice" class="option-1">
                    <div class="dot"></div>
                    <div class="text">$300 to $799</div>
                </label>
                <label for="secondlevelprice" class="option-2">
                    <div class="dot"></div>
                    <div class="text">$800 to $1,199</div>
                </label>
                <label for="thirdlevelprice" class="option-3">
                    <div class="dot"></div>
                    <div class="text">$1,200 to $2,000</div>
                </label>
            </div>
        </div>
        <div class="option minn">
			<p class="applymm" id="applyminmax">APPLY</p>
            <div class="mmdiv">
                <input type="text" class="minmax" name="" id="min" value="300" placeholder="Min">
                <input type="text" name="" class="minmax" id="max" value="5000" placeholder="Max">
            </div>
        </div>
    </div>
    <div class="fil-box">
        <h1>Brand</h1><br>
        <label class="option container">
            <input type="checkbox" class="memorycheck" name="" id="hisense">
            <p>HISENSE</p><span class="checkmark"></span>
        </label>
        <label class="option container">
            <input type="checkbox" class="memorycheck" name="" id="samsung">
            <p>SAMSUNG</p><span class="checkmark"></span>
        </label>
        <label class="option container">
            <input type="checkbox" class="memorycheck" name="" id="lg">
            <p>LG</p><span class="checkmark"></span>
        </label>
        <label class="option container">
            <input type="checkbox" class="memorycheck" name="" id="midea">
            <p>MIDEA</p><span class="checkmark"></span>
        </label>
         <label class="option container">
             <input type="checkbox" class="memorycheck" name="" id="toshiba">
             <p>TOSHIBA</p><span class="checkmark"></span>
         </label>
    </div>
    <div class="fil-box">
        <h1>Screen Size(inches)</h1><br>
        <label class="option container">
            <input type="checkbox" class="memorycheck" name="" id="sz32">
            <p>32 ''</p><span class="checkmark"></span>
        </label>
        <label class="option container">
            <input type="checkbox" class="memorycheck" name="" id="sz43">
            <p>43 ''</p><span class="checkmark"></span>
        </label>
        <label class="option container">
            <input type="checkbox" class="memorycheck" name="" id="sz55">
            <p>55 ''</p><span class="checkmark"></span>
        </label>
    </div>`;
	},
};

let showBox = document.getElementById("showbox");
let gamingBox = document.getElementById("gaming"),
	cellPhoneBox = document.getElementById("cellphones"),
	computerBox = document.getElementById("computer"),
	speakersBox = document.getElementById("speakers"),
	tvsBox = document.getElementById("TV");
let currentItemsOnDisplay;

class Products {
	//LOAD ALL PRODUCTS AND SAVE THEM TO THE LOCALSTORAGE
	static saveItems() {
		let req = new XMLHttpRequest();
		req.open("GET", "product.json", false);
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

const placeFilterUI = (filterNode1, filterNode2, filterUI) => {
	if (
		document.lastChild.offsetWidth > 768 &&
		document.lastChild.offsetWidth <= 1200
	) {
		filterNode2.innerHTML = filterUI;
	}
	if (
		document.lastChild.offsetWidth > 1200 ||
		document.lastChild.offsetWidth <= 768
	) {
		filterNode1.innerHTML = filterUI;
	}
};

class getFilter {
	static allCellPhones() {
		placeFilterUI(filterBox[0], filterBox[1], filterUIObjects.cellphones());
	}

	static allGaming() {
		placeFilterUI(filterBox[0], filterBox[1], filterUIObjects.gaming());
	}

	static allComputer() {
		placeFilterUI(filterBox[0], filterBox[1], filterUIObjects.computers());
	}

	static allSpeaker() {
		placeFilterUI(filterBox[0], filterBox[1], filterUIObjects.speakers());
	}

	static allTv() {
		placeFilterUI(filterBox[0], filterBox[1], filterUIObjects.tv());
	}
}

class display {
	static allUI(directory, category, boxID) {
		let y = "";
		if (directory.length > 0) {
			for (let k = 0; k < 10; k++) {
				y += `
			<a href="product.html?item=${directory[k].id}" class="sell-box sel-box" data-id=${directory[k].id}>

		<div class="img-con" id="main-con">
				<div class="img-cont" style='background-image:url(${directory[k].itemInfo.itemImg[0]})'>

				</div>
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
						<span class = "price" > $${directory[k].itemInfo.newItemPrice} </span>
						<span class = "old-price price" > ${directory[k].itemInfo.oldItemPrice}</span>
					</span>
					<button id="cart-btn" class="cart-btn"  data-id= ${directory[k].id} onclick = "addToCart(event)">
			<img id="addto-cart-img" src="IMAGES/add-cart-white.png" alt=""  data-id= ${directory[k].id} class="cart-btn" onclick = "addToCart(event)">
			<p data-id= ${directory[k].id} class="cart-btn" id="cart-text" onclick = "addToCart(event)"> Add to Cart<p></button>


				</div>
			</div>
		</a>`;
			}

			// <div id="item-props">
			// 			<div class="prop" id="add-to-cart" data-id= ${directory[k].id} onclick = "addToCart(event)">
			// 				<img src="IMAGES/add-cart.png" data-id= ${directory[k].id} onclick = "addToCart(event)">
			// 				<p data-id= ${directory[k].id} onclick = "addToCart(event)" class="cart-tool-tip" id="tooltip">Add to Cart</p>
			// 			</div>
			// 			<div class="prop" id="love">
			// 				<img src="IMAGES/heart.png"/>
			// 				<p class="love-tool-tip" id="tooltip">Love</p>
			// 			</div>
			// 			<div class="prop" id="wishlist">
			// 				<img src="IMAGES/bookmark.png"/>
			// 				<p class="wish-tool-tip" id="tooltip">Add to Wishlist</p>
			// 			</div>
			// 		</div>

			document.getElementById(category).innerText = boxID;
			document.getElementById(boxID).innerHTML = y;
		}
	}

	static displayAll() {
		let sortDOM = document.getElementById("res-sort");
		let dir2 = JSON.parse(localStorage.getItem("StoreItems"));
		let dir = dir2.selectedProducts[0];
		this.allUI(dir.cellphones, "sec-name-cellphones", "cellphones");
		this.allUI(dir.gaming, "sec-name-gaming", "gamings");
		this.allUI(dir.speakers, "sec-name-speakers", "speakers");
		this.allUI(dir.computers, "sec-name-computer", "computers");
		this.allUI(dir.tv, "sec-name-tv", "TV");
		sortDOM.style.display = "none";
	}
}
// display.displayAll()

const emptyParameters = () => {
	let Parameters = {
		Price: [],
		Range: [
			{
				high: 5000,
				low: 300,
			},
		],
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
		Order: "Random",
	};
	let stringifyParameters = JSON.stringify(Parameters);
	localStorage.setItem("Parameters", stringifyParameters);
};

// OPEN FILTER
const filterContainer1 = document.querySelector(".filters1");
const filterContainer2 = document.querySelector(".filters2");
let filterBoxHeight = 400;

if (
	document.lastChild.offsetWidth > 768 &&
	document.lastChild.offsetWidth <= 1200
) {
	filterContainer2.style.display = "flex";
	filterContainer2.style.height = "0px";
	filterContainer2.style.opacity = "0";
	filterBox[0].style.display = "none";
}

if (document.lastChild.offsetWidth <= 768) {
	filterContainer2.style.display = "none";
}

// window.addEventListener("resize", (e) => {
// 	if (
// 		document.lastChild.offsetWidth > 600 &&
// 		document.lastChild.offsetWidth <= 1024
// 	) {
// 		filterContainer2.style.display = "flex";
// 		filterContainer2.style.height = "0px";
// 		filterContainer2.style.opacity = "0";
// 		filterContainer1.style.display = "none";

// 		//GET THE CURRENT CATEGORY TO MAKE THE FILTER MORE RESPONSE
// 		let currentCategory = document.URL.split("category=")[1].split("&")[0];

// 		if (currentCategory === "tv") {
// 			getFilter.allTv();
// 		}
// 		if (currentCategory === "gaming") {
// 			getFilter.allGaming();
// 		}
// 		if (currentCategory === "cellphones") {
// 			getFilter.allCellPhones();
// 		}
// 		if (currentCategory === "computers") {
// 			getFilter.allComputer();
// 		}
// 		if (currentCategory === "speakers") {
// 			getFilter.allSpeaker();
// 		}

// 		// As thr window is being resized we keep filter checked boxes intact
// 		returnCheckedBoxes();
// 	}

// 	if (document.lastChild.offsetWidth <= 600) {
// 		filterContainer1.style.display = "none";
// 		filterContainer2.style.height = "0px";
// 		filterContainer2.style.opacity = "0";
// 		filterContainer2.style.visibility = "hidden";
// 	}

// 	if (document.lastChild.offsetWidth >= 1024) {
// 		filterContainer1.style.display = "block";
// 		filterContainer2.style.height = "0px";
// 		filterContainer2.style.opacity = "0";
// 		if (filterBox[0].style.display === "none") {
// 			filterBox[0].style.display = "block";
// 		}
// 	}
// });

const openFilter = () => {
	// Ipads
	if (
		document.lastChild.offsetWidth > 768 &&
		document.lastChild.offsetWidth <= 1200 &&
		filterContainer2.style.height === "0px"
	) {
		filterContainer2.style.height = filterBoxHeight + "px";
		filterContainer2.style.transition = ".5s";
		setTimeout(() => {
			filterContainer2.style.opacity = "1";
		}, 300);
		return;
	}

	if (filterContainer2.style.height === `${filterBoxHeight}px`) {
		filterContainer2.style.opacity = "0";
		filterContainer2.style.height = "0px";
		return;
	}

	// Desktop anf Cellphone
	if (
		document.lastChild.offsetWidth <= 768 ||
		document.lastChild.offsetWidth > 1200
	) {
		filterBox[0].style.display = "block";
		filterContainer1.style.display = "flex";
	}

	if (document.lastChild.offsetWidth <= 768) {
		document.lastChild.style.overflow = "hidden";
	}
};

const closeFilter = () => {
	filterContainer1.style.display = "none";
	document.lastChild.style.overflow = "scroll";
};

const applyFilter = document.querySelectorAll("#apply");
applyFilter.forEach((applyBtn) => {
	applyBtn.onclick = function () {
		let queryUrlFromLocalStorage = localStorage.getItem("Url");
		window.location.href = queryUrlFromLocalStorage;
		if (document.lastChild.offsetWidth <= 768) {
			filterContainer1.style.display = "none";
		}
	};
});

// const phonesBrandCheck = (apple, brand) => {
// 	apple.addEventListener("click", (event) => {
// 		displayFilteredResults(filter.brand(event, "cellphones", brand));
// 	});
// };

const debounce = (fn, delay) => {
	let timer;
	return function () {
		clearTimeout(timer);
		timer = setTimeout(fn, delay);
	};
};

if (document.lastChild.offsetWidth >= 1024) {
	window.onresize = debounce(function () {
		window.location.reload();
	}, 50);
}

const phoneFilters = () => {
	// Price filter
	firstlevelprice.addEventListener("click", (event) => {
		console.log("CLicke");
		displayFilteredResults(filter.price(event, "cellphones", 300, 799));
	});

	secondlevelprice.addEventListener("click", (event) => {
		displayFilteredResults(filter.price(event, "cellphones", 800, 1199));
	});

	thirdlevelprice.addEventListener("click", (event) => {
		displayFilteredResults(filter.price(event, "cellphones", 1200, 2000));
	});

	min.addEventListener("change", (event) => {
		displayFilteredResults(
			filter.priceMin(event, "cellphones", Number(min.value), Number(max.value))
		);
	});

	max.addEventListener("change", (event) => {
		displayFilteredResults(
			filter.priceMax(event, "cellphones", Number(min.value), Number(max.value))
		);
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
};

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

	min.addEventListener("change", (event) => {
		displayFilteredResults(
			filter.priceMin(event, "gaming", Number(min.value), Number(max.value))
		);
	});

	max.addEventListener("change", (event) => {
		displayFilteredResults(
			filter.priceMax(event, "gaming", Number(min.value), Number(max.value))
		);
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
	min.addEventListener("change", (event) => {
		displayFilteredResults(
			filter.priceMin(event, "computers", Number(min.value), Number(max.value))
		);
	});

	max.addEventListener("change", (event) => {
		displayFilteredResults(
			filter.priceMax(event, "computers", Number(min.value), Number(max.value))
		);
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

	min.addEventListener("change", (event) => {
		displayFilteredResults(
			filter.priceMin(event, "speakers", Number(min.value), Number(max.value))
		);
	});

	max.addEventListener("change", (event) => {
		displayFilteredResults(
			filter.priceMax(event, "speakers", Number(min.value), Number(max.value))
		);
	});

	applyminmax.addEventListener("click", (event) => {
		displayFilteredResults(
			filter.priceMinMax(
				event,
				"speakers",
				Number(min.value),
				Number(max.value)
			)
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

	min.addEventListener("tv", (event) => {
		displayFilteredResults(
			filter.priceMin(event, "tv", Number(min.value), Number(max.value))
		);
	});

	max.addEventListener("tv", (event) => {
		displayFilteredResults(
			filter.priceMax(event, "tv", Number(min.value), Number(max.value))
		);
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
	sz32.addEventListener("click", (event) => {
		displayFilteredResults(filter.size(event, "tv", 32));
	});
	sz43.addEventListener("click", (event) => {
		displayFilteredResults(filter.size(event, "tv", 43));
	});
	sz55.addEventListener("click", (event) => {
		displayFilteredResults(filter.size(event, "tv", 55));
	});
};

// PRODUCT DISPLAY (TAB CLICK)
const cellPhones = () => {
	// Dislay Cellphones
	getFilter.allCellPhones();

	// Phone Filters
	phoneFilters();
};

const Gamings = () => {
	getFilter.allGaming();

	// Gaming Filters
	gamingFilters();
};

const Computers = () => {
	getFilter.allComputer();

	// Computers Filters
	comFilters();
};

const Speakers = () => {
	getFilter.allSpeaker();

	// Computers Filters
	speakerFilters();
};

const TVs = () => {
	getFilter.allTv();

	// Computers Filters
	tvFilters();
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

let allDefaultCategories = document.querySelectorAll(".full-cat");
const indicateLoadingWhileAwaitingResults = (awaiting) => {
	if (awaiting) {
		allDefaultCategories.forEach((category) => {
			category.style.display = "none";
		});
	} else {
		allDefaultCategories.forEach((category) => {
			category.style.display = "flex";
		});
	}
};

let newUrl = new URL(document.URL);
console.log(newUrl.search.length);
if (newUrl.search.length === 0) {
	indicateLoadingWhileAwaitingResults(false);
	display.displayAll();
	document.querySelector(".filters").style.display = "none";
	document.querySelector(".sort-hol").style.display = "none";
	document.querySelector(".pgd").style.display = "none";
	document.querySelector("#showbox").classList = "showboxflex";
}

if (newUrl.search.length > 0) {
	indicateLoadingWhileAwaitingResults(true);
}

if (newUrl.search.length > 0) {
	document.querySelector("#showbox").classList = "showboxgrid";
}

[...document.querySelectorAll("#games")].forEach((btn) =>
	btn.addEventListener("click", (e) => {
		Gamings();
		emptyParameters();
		window.location = "gemshop.html?category=gaming&Order=Random&Page=0";
	})
);

[...document.querySelectorAll("#phones")].forEach((btn) =>
	btn.addEventListener("click", (e) => {
		cellPhones();
		emptyParameters();
		window.location = "gemshop.html?category=cellphones&Order=Random&Page=0";
	})
);

[...document.querySelectorAll("#coms")].forEach((btn) =>
	btn.addEventListener("click", (e) => {
		Computers();
		emptyParameters();
		window.location = "gemshop.html?category=computers&Order=Random&Page=0";
	})
);

[...document.querySelectorAll("#spks")].forEach((btn) =>
	btn.addEventListener("click", (e) => {
		Speakers();
		emptyParameters();
		window.location = "gemshop.html?category=speakers&Order=Random&Page=0";
	})
);

[...document.querySelectorAll("#tele")].forEach((btn) =>
	btn.addEventListener("click", (e) => {
		TVs();
		emptyParameters();
		window.location = "gemshop.html?category=tv&Order=Random&Page=0";
	})
);

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
	static getItemAndSaveToCart(event) {
		let getbackcart = JSON.parse(localStorage.getItem("Cart"));

		if (cart === null || cart.length === 0) {
			cart = [pickedItem];
			Storage.updateCart(cart);
		}

		if (cart !== null || cart.length !== 0) {
			let pickedItemID = event.target.dataset.id;
			let check = getbackcart.find(
				(item) => Number(item.id) === Number(pickedItemID)
			);
			console.log(pickedItemID);

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
} catch (error) {}

// ADD ITEM TO CART
let ItemsInCart = JSON.parse(localStorage.getItem("Cart")),
	pickedItem;
const addToCart = (event) => {
	event.stopPropagation();
	event.preventDefault();
	let ItemID = event.target.dataset.id;
	let pickItemFromStore = item(ItemID);
	popupNotification(
		pickItemFromStore.itemInfo.name,
		pickItemFromStore.itemInfo.itemImg[0]
	);
	pickedItem = {
		...pickItemFromStore,
		amount: 1,
	};

	if (pickItemFromStore) {
		try {
			Storage.getItemAndSaveToCart(event);
		} catch (error) {}
	}
	animateCartButtonText(event.target);
};

// OPEN MENU
const menuDOM = document.getElementById("menu");
const menuBtn = document.getElementById("mb");
menuDOM.style.display = "none";

const openMenu = () => {
	menuDOM.style.display = "block";

	if (menuDOM.className.includes("menuout")) {
		menuDOM.className = menuDOM.className.replace("menuout", " menuin");
	} else {
		menuDOM.className += " menuin";
	}
	document.lastChild.style.overflow = "hidden"; // Disables the window scrolling
};

// CLOSE MENU
const closeMenu = () => {
	menuDOM.className = menuDOM.className.replace("menuin", " menuout");
	setTimeout(() => (menuDOM.style.display = "none"), 450);
	document.lastChild.style.overflow = "scroll"; // Enables the window scrolling
};

// CLOSES MENU IF ANY AREA OUTSIDE THE MENU BOX GETS CLICKED
window.addEventListener("click", (e) => {
	if (menuDOM.style.display === "block") {
		let parent =
			e.target.parentNode.parentNode.parentNode.parentNode === menuDOM ||
			e.target.parentNode.parentNode.parentNode === menuDOM ||
			e.target.parentNode.parentNode === menuDOM ||
			e.target.parentNode === menuDOM;

		if (!parent && e.target !== menuBtn) {
			closeMenu();
		}
	}
});
