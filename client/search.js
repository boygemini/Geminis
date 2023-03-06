"use strict";

const allProducts = () => {
	return new Promise((resolve, reject) => {
		resolve(
			fetch("product.json", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then((response) => {
					return response.json();
				})
				.then((products) => {
					localStorage.setItem("StoreItems", JSON.stringify(products));
					return products;
				})
		);
	});
};

let hs = document.getElementById("hold");
let search = document.getElementById("search");
let go = document.getElementById("GO");
let displaybox = document.querySelector(".sug-holder");

//Function

const showSuggesttions = async (event) => {
	let dir = await allProducts();
	dir = dir.selectedProducts[0];
	let searchValue = event.target.value.toLowerCase();
	let finalSug = [];
	let sugResult = [];
	let sugCategory = ["Gaming", "Cellphones", "Speakers", "Computers", "TV"];
	let sugDirectory = [
		dir.gaming,
		dir.cellphones,
		dir.speakers,
		dir.computers,
		dir.tv,
	];

	sugDirectory.forEach((subDirectory) =>
		subDirectory.forEach((item) => sugResult.push(item.itemInfo.name))
	);

	sugResult.forEach((itemName) => {
		if (itemName.toLowerCase().includes(searchValue)) {
			finalSug.push(itemName);
		}
	});

	finalSug = [...new Set(finalSug)];
	let mm = [];

	sugCategory.forEach((category) => {
		finalSug.forEach((suggestedItemNames) => {
			dir[`${category.toLowerCase()}`].forEach((itsc) => {
				if (itsc.itemInfo.name === suggestedItemNames) {
					mm.push([itsc.itemInfo.name, category]);
				}
			});
		});
	});

	mm = [...new Set(mm)];
	let uniqueArray = Array.from(new Set(mm.map(JSON.stringify))).map(JSON.parse);
	return uniqueArray;
};

// SEARCH & SUGGESTION
let suggestionBox = document.querySelector(".searchcontainer");
let allMenu = [...document.querySelectorAll("li")];

const openSearch = () => {
	suggestionBox.classList.add("searchfadein");
	suggestionBox.style.display = "flex";
	setTimeout(() => {
		suggestionBox.classList.remove("searchfadein");
		document.lastChild.style.overflow = "hidden";
	}, 500);
};

const closeSearch = () => {
	suggestionBox.classList.add("searchfadeout");
	setTimeout(() => {
		suggestionBox.style.display = "none";
		suggestionBox.classList.remove("searchfadeout");
	}, 300);
	document.lastChild.style.overflow = "";
};

// DISPLAY SUGGESTIONS
search.addEventListener("input", async (event) => {
	let suggestArray = await showSuggesttions(event);
	let x = "";
	suggestArray.forEach((suggestion) => {
		x += `
		<div class="sug" onclick="sendQuery(event)">
			<h1 id="sug-h1" onclick="sugClicked(event)">${suggestion[0]}</h1>
			<img src="IMAGES/thinarrow.png"/>
			<h1 class="category" id="sug-cat" disabled>${suggestion[1]}</h1>
		</div>
		`;
	});

	displaybox.innerHTML = x;
});

search.addEventListener("keydown", (e) => {
	if (e.key === "Enter") {
		sendQueryGO();
	}
});

const sendQueryGO = (event) => {
	let query = search.value.toLowerCase();
	let url = `gemshop.html?SearchQuery=${encodeURIComponent(
		query
	)}&Order=Random&Page=0`;
	window.location.href = url;
};

const makeUrl = (query, queryCategory) => {
	let url = `gemshop.html?category=${encodeURIComponent(
		queryCategory
	)}&SearchQuery=${encodeURIComponent(query)}&Order=Random&Page=0`;
	return (window.location.href = url);
};

const sugClicked = (event) => {
	let query = event.target.innerText.toLowerCase();
	let queryCategory =
		event.target.parentNode.children[2].innerText.toLowerCase();
	makeUrl(query, queryCategory);
};

const sendQuery = (event) => {
	let query = event.target.firstElementChild.innerText.toLowerCase();
	let queryCategory = event.target.children[2].innerText.toLowerCase();
	makeUrl(query, queryCategory);
};

try {
	go.addEventListener("click", (event) => {
		if (search.value !== "") {
			sendQueryGO();
		}
	});
} catch (error) {}

// search.addEventListener("keydown", (event) => {
// 	if (event.key === "Enter" && search.value !== "") {
// 		sendQueryGO();
// 	}
// });

const markAndCreatePagination = (results) => {
	let pageNumber = document.URL.split("Page=")[1];
	if (pageNumber) results = createPagination(results, 12, Number(pageNumber));
	markPagination();
};

const sorting = (event) => {
	let sort = event.target.value;
	let pageUrl = document.URL.split("Order=")[0];
	let remainingUrlParaArray = document.URL.split("&Page=")[1].split("&");
	remainingUrlParaArray.shift();

	let remainingUrlParaString = "";
	for (let i in remainingUrlParaArray) {
		remainingUrlParaString += `&${remainingUrlParaArray[i]}`;
	}

	let changeSorting = `${pageUrl}Order=${sort}&Page=${Parameters.Page}${remainingUrlParaString}`;
	window.location = changeSorting;
};

const controlSort = (arr) => {
	let orderFromUrl = document.URL.split("Order=")[1].split("&")[0];
	filter.sort(orderFromUrl, arr);
	document.getElementById("select").value =
		document.URL.split("Order=")[1].split("&")[0];

	// Save last Sort set
	let getSavedOrder = JSON.parse(localStorage.getItem("Parameters"));
	getSavedOrder.Order = orderFromUrl;
	localStorage.setItem("Parameters", JSON.stringify(getSavedOrder));
};

class getResults {
	static async suggestionsResult(Query, Category) {
		let dir = await allProducts();
		dir = dir.selectedProducts[0];
		let arr = [];
		let searchDirectory = dir[`${Category}`];

		for (let j in searchDirectory) {
			if (searchDirectory[j].itemInfo.name.toLowerCase().includes(Query)) {
				arr.push(searchDirectory[j]);
			}
		}
		let pageNumber = document.URL.split("Page=")[1];
		if (pageNumber) arr = createPagination(arr, 12, Number(pageNumber));

		controlSort(arr);
		markPagination();
		displayFiltereddResults(arr, Query);
	}

	static async searchBarResult(Query) {
		let dir = await allProducts();
		dir = dir.selectedProducts[0];
		let Category = ["gaming", "cellphones", "speakers", "computers", "tv"];
		let arr = [];
		for (let i in Category) {
			let searchDirectory = dir[`${Category[i]}`];
			for (let j in searchDirectory) {
				if (
					searchDirectory[j].itemInfo.name.toLowerCase().includes(Query.trim())
				) {
					arr.push(searchDirectory[j]);
				}
			}
		}
		let pageNumber = document.URL.split("Page=")[1];
		if (pageNumber) arr = createPagination(arr, 12, Number(pageNumber));

		markPagination();
		controlSort(arr);
		displayResults(arr, Query);
	}

	static async negativeResults(Query) {
		showBox.innerHTML = `<div class="noresult">
			<div class ="noresulttext"><h1 class = "cat-head" id="nores-h1"> Oops, there are no results for  "${Query}" </h1><p>Try checking your spelling or use more general terms</p></div>
			<span>Go back to</span>
			<div class="noresultbuttons"><a href="index.html" class='backtohome'>Homepage</a><a href="gemshop.html" class='backtoshop'>Shop</a></div>
			</div>`;
		document.getElementById("filter").style.display = "none";
		document.querySelector(".sort-hol").style.display = "none";
		document.querySelector(".res-sort").style.display = "none";
		document.querySelector(".pgd").style.display = "none";
		document.querySelector(".littlebans").style.display = "none";
		document.querySelector(".banner-container").style.display = "none";
		document.getElementById("bodyy").style.backgroundColor = "#f4f4f6";
		document.getElementById("footer").style.position = "absolute";
		document.getElementById("footer").style.bottom = "0";
		showBox.classList.remove("showboxgrid");
	}

	static async positiveResults() {
		document.getElementById("filter").style.display = "";
		document.querySelector(".res-sort").style.display = "";
		document.getElementById("filter").style.display = "";
		document.querySelector(".sort-hol").style.display = "";
		document.querySelector(".pgd").style.display = "";
		document.querySelector(".littlebans").style.display = "";
		document.getElementById("footer").style.position = "";
		document.getElementById("bodyy").style.backgroundColor = "";
		document.getElementById("footer").style.bottom = "0";
		showBox.classList += " showboxgrid";
	}

	static async pageNotFound() {
		document.querySelector(".banner-container").style.display = "none";
		document.getElementById("bodyy").style.backgroundColor = "#f4f4f6";
		document.getElementById("footer").style.position = "absolute";
		document.getElementById("footer").style.bottom = "0";
		document.querySelector(
			".shop-body"
		).innerHTML = `<div class="noresult notfound">
			<div class ="noresulttext"><h1 class = "cat-head" > Page not found</h1><p>We couldn’t find the page you are looking for</p></div>
			<span>Go back to</span>
			<div class="noresultbuttons"><a href="index.html" class='backtohome'>Homepage</a><a href="gemshop.html" class='backtoshop'>Shop</a></div>
		</div>`;
	}
}

const displayResults = (directory, Query) => {
	let x = "";
	let y = "";
	if (directory.length > 0) {
		setTimeout(() => {
			showPreloader(false);
		}, 1000);
		getResults.positiveResults();
		for (let k in directory) {
			if (directory[k].itemInfo.name.toLowerCase().includes(Query)) {
				y += `
			<a href="product.html?item=${directory[k].id}" class="sell-box sel-box" data-id=${directory[k].id} >

		<div class="img-con" id="main-con">
				<div class="img-cont" data-src=${directory[k].itemInfo.itemImg[0]}>

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
					<span class = "price" > $ ${directory[k].itemInfo.newItemPrice} </span>
					<span class = "old-price price" > ${directory[k].itemInfo.oldItemPrice}</span>
				</span>
				<button id="cart-btn" class="cart-btn"  data-id= ${directory[k].id} onclick = "addToCart(event)">
			<img id="addto-cart-img" src="IMAGES/add-cart-white.png" alt=""  data-id= ${directory[k].id} class="cart-btn" onclick = "addToCart(event)">
			<p data-id= ${directory[k].id} class="cart-btn" id="cart-text" onclick = "addToCart(event)"> Add to Cart<p></button>
			</div>
		</div>
		</a>`;
			}
		}

		document.getElementById(
			"result-title"
		).innerHTML = `Results for <span id="search-entry"> ${Query}</span>`;
		showBox.innerHTML = y;
	}
	if (directory.length === 0) {
		getResults.negativeResults(Query);
	}
};

const displayFiltereddResults = (results, category) => {
	let x = ``;
	let y = "";

	if (results.length > 0) {
		setTimeout(() => {
			showPreloader(false);
		}, 0);
		getResults.positiveResults();
		for (let k in results) {
			y += `
			<a href="product.html?item=${results[k].id}" class="sell-box sel-box" data-id=${results[k].id} >

		<div class="img-con" id="main-con">
				<div class="img-cont" data-src=${results[k].itemInfo.itemImg[0]}>

				</div>
				</div>
				<div class="sfu">
					<div class="text-hold">
						<p class="itemName2">${results[k].itemInfo.name}</p>
						<div div class = "description-box"
						data-id=${results[k].id} onclick = "viewProduct(event)">
			<p class = "item-description" > ${results[k].itemInfo.description1}
			</p>
		</div>
			</div>
			<div class="price-order">
				<span class="price-box">
					<span class = "price" > $${results[k].itemInfo.newItemPrice} </span>
					<span class = "old-price price" > ${results[k].itemInfo.oldItemPrice}</span>
				</span>
				<button id="cart-btn" class="cart-btn"  data-id= ${results[k].id} onclick = "addToCart(event)">
			<img id="addto-cart-img" src="IMAGES/add-cart-white.png" alt=""  data-id= ${results[k].id} class="cart-btn" onclick = "addToCart(event)">
			<p data-id= ${results[k].id} class="cart-btn" id="cart-text" onclick = "addToCart(event)"> Add to Cart<p></button>
			</div>
		</div>
		</a>`;
		}
		document.getElementById("result-title").innerText = `${category}`;
		showBox.innerHTML = y;
	}
	if (results.length === 0) {
		getResults.negativeResults(Query);
	}
};

const getCatFiltersAndSearchResults = async (Query, Category) => {
	let dir = await allProducts();
	dir = dir.selectedProducts[0];
	let gamekey = [
		...new Set(dir["gaming"].map((itemName) => itemName.itemInfo.name)),
	];

	let phonekey = [
		...new Set(dir["cellphones"].map((itemName) => itemName.itemInfo.name)),
	];

	let tvkey = [...new Set(dir["tv"].map((itemName) => itemName.itemInfo.name))];

	let speakerkey = [
		...new Set(dir["speakers"].map((itemName) => itemName.itemInfo.name)),
	];

	let comkey = [
		...new Set(dir["computers"].map((itemName) => itemName.itemInfo.name)),
	];

	let general = [gamekey, phonekey, tvkey, speakerkey, comkey];
	let generalKeyWords = new Array();

	for (let i in general) {
		for (let j in general[i]) {
			generalKeyWords.push(general[i][j]);
		}
	}

	function Call(Query, Category) {
		if (Category) {
			return getResults.suggestionsResult(Query, Category);
		}
		if (!Category) {
			return getResults.searchBarResult(Query);
		}
	}

	for (let i in gamekey) {
		if (gamekey[i].toLowerCase().trim().includes(Query)) {
			Gamings();
			return Call(Query, Category);
		}
	}

	for (let i in phonekey) {
		if (phonekey[i].toLowerCase().trim().includes(Query)) {
			cellPhones();
			return Call(Query, Category);
		}
	}

	for (let i in tvkey) {
		if (tvkey[i].toLowerCase().trim().includes(Query)) {
			TVs();
			return Call(Query, Category);
		}
	}

	for (let i in speakerkey) {
		if (speakerkey[i].toLowerCase().trim().includes(Query)) {
			Speakers();
			return Call(Query, Category);
		}
	}

	for (let i in comkey) {
		if (comkey[i].toLowerCase().trim().includes(Query)) {
			Computers();
			return Call(Query, Category);
		}
	}

	for (let i in generalKeyWords) {
		if (generalKeyWords[i].toLowerCase() !== Query) {
			return getResults.negativeResults(Query);
		}
	}
};

const removeThe20Nonsense = (Query) => {
	if (Query.lastIndexOf("%20") > -1) {
		Query = Query.replace(/%20/g, " ");
		return Query;
	}
	return Query;
};

let page, pageCount;
try {
	page = document.URL.split("Page=")[1].split("&")[0];
} catch (error) {}

function Next(event, paginatedResult) {
	pageCount = Number(page) + 1;
	if (pageCount !== Number(paginatedResult.length)) {
		event.target.disabled = false;
		filter.page(event, pageCount.toString());
	}
}

function Prev(event) {
	pageCount = Number(page) - 1;
	if (pageCount <= 0) {
		pageCount = 0;
	}
	filter.page(event, pageCount.toString());
}

const markPagination = () => {
	let page = document.URL.split("Page=")[1].split("&")[0];
	if (page.length === 0) page = "0";
	document.getElementById(page).className += " active";
};

function createPagination(results, numberOnEachPage, pageNumber) {
	let arrayGroupTotal = results.length / numberOnEachPage;
	let arrayRemainder = results.length % numberOnEachPage;
	let itemsLeftInArray = results.slice(
		results.length - arrayRemainder,
		results.length
	);
	let paginatedResult = new Array();
	let lastSet;
	for (let i = 0; i <= Math.floor(arrayGroupTotal); i++) {
		if (i === 0) {
			lastSet = 0;
			i = 1;
		}
		paginatedResult.push(results.slice(lastSet, numberOnEachPage * i));
		lastSet = numberOnEachPage * i;
	}

	if (
		paginatedResult[paginatedResult.length - 1].length > itemsLeftInArray.length
	) {
		paginatedResult.push(itemsLeftInArray);
	}

	// Just in case someone altered the page number from the url
	if (!paginatedResult[pageNumber]) {
		document.querySelector(".banner-container").style.display = "none";
		document.getElementById("bodyy").style.backgroundColor = "whitesmoke";
		document.getElementById("footer").style.position = "absolute";
		document.getElementById("footer").style.bottom = "0";
		document.querySelector(".shop-body").innerHTML = `<div class="noresult">
			<div class ="noresulttext"><h1 class = "cat-head" id="nores-h1"> This Page is Empty </h1><p>Try checking your spelling or use more general terms</p></div>
			<span>Go back to</span>
			<div class="noresultbuttons"><a href="index.html" id="" class='backtohome'>Homepage</a><a href="gemshop.html" class='backtoshop'>Shop</a></div>
		</div>`;
		document.querySelector(".pagindiv").style.display = "none";
	}

	// Pagination UI
	if (paginatedResult[pageNumber]) {
		let n = "";
		if (paginatedResult[paginatedResult.length - 1].length === 0) {
			paginatedResult.pop();
		}

		for (let i in paginatedResult) {
			n += `<button class="pagin" onclick="filter.page(event)" id='${Number(
				i
			)}'>${Number(i) + 1}</button>`;
		}

		if (paginatedResult.length === 1) {
			prevPage.disabled = true;
			prevPage.style.opacity = "0.5";
			nextPage.disabled = true;
			nextPage.style.opacity = "0.5";
		}

		if (pageNumber === 0) {
			prevPage.disabled = true;
			prevPage.style.opacity = "0.5";
		}

		if (pageNumber + 1 === paginatedResult.length) {
			nextPage.disabled = true;
			nextPage.style.opacity = "0.5";
		}

		nextPage.addEventListener("click", (event) => {
			Next(event, paginatedResult);
		});

		prevPage.addEventListener("click", (event) => {
			Prev(event);
		});

		document.getElementById("pagindiv").innerHTML = n;
		return paginatedResult[pageNumber];
	}
}

const convertUrlParametersIntoObject = (urlWithQuery) => {
	let urlParameters = urlWithQuery
		.split("?category")
		.toString()
		.split("&")
		.filter((arr) => !arr.includes("gemshop.html"));
	let newUrlParameters = new Array();
	for (let i in urlParameters) {
		let sp = urlParameters[i].split("=");
		newUrlParameters[sp[0]] = sp[1];
	}
	return newUrlParameters;
};

const onLoad = () => {
	let cpUrl = new URL(document.URL);
	if (cpUrl.search.length <= 0 && cpUrl.pathname === "/gemshop.html") {
	} else if (cpUrl.search.length > 0 && cpUrl.pathname === "/gemshop.html") {
		indicateLoadingWhileAwaitingResults(true);
	}

	let urlWithQuery = document.URL;

	// LOAD RESULTS IF SEARCH WAS FROM SEARCH BAR SUGGESTION
	if (
		urlWithQuery.split("&SearchQuery=").length > 1 &&
		urlWithQuery.split("category=").length > 1
	) {
		let Query = urlWithQuery.split("SearchQuery=")[1].split("&")[0];
		let Category = urlWithQuery.split("category=")[1].toString().split("&")[0];
		Query = removeThe20Nonsense(Query);
		getCatFiltersAndSearchResults(Query, Category);
		return getResults.suggestionsResult(Query, Category);
	}

	// LOAD RESULTS IF SEARCH WAS FROM SEARCH BAR
	if (
		urlWithQuery.split("?SearchQuery=").length > 1 &&
		urlWithQuery.split("category=").length === 1
	) {
		let Query = urlWithQuery.split("?SearchQuery=")[1].split("&")[0];
		Query = removeThe20Nonsense(Query).trim();
		return getCatFiltersAndSearchResults(Query);
	}

	// IF THE URL IS BADLY ALTERED IT SHOULD RETURN A NOT FOUND PAGE
	let QueryName;
	try {
		QueryName = urlWithQuery.split("?")[1].split("=")[0];
	} catch (error) {}

	if (
		QueryName !== "SearchQuery" &&
		QueryName !== "category" &&
		QueryName !== undefined
	) {
		getResults.pageNotFound();
	}

	// LOAD FILTER RESULTS FROM URL
	if (urlWithQuery.split("?category").length > 1) {
		let parameterCategory = urlWithQuery
			.split("?category=")[1]
			.toString()
			.split("&")[0];

		let allItems = JSON.parse(localStorage.getItem("StoreItems"));

		let allItemsInCategory =
			allItems.selectedProducts[0][`${parameterCategory}`];

		let results = [];

		if (results.length === 0) {
			results = allItemsInCategory;
		}

		/*
		 * USE PROPER ERROR HANDLING HERE
		 */
		// PARAMETERS FROM THE URL
		let newUrlParameters = convertUrlParametersIntoObject(urlWithQuery);
		try {
			newUrlParameters.Price = newUrlParameters.Price.replace(/%20/g, "").split(
				"-"
			);
			priceFromUrl = [
				{
					high: Number(newUrlParameters.Price[1]),
					low: Number(newUrlParameters.Price[0]),
				},
			];
		} catch (error) {}
		try {
			brandFromUrl = newUrlParameters.Brand.split(",");
		} catch (error) {}
		try {
			filterFromUrl = newUrlParameters.Filters.split(",");
		} catch (error) {}
		try {
			memoryFromUrl = newUrlParameters.Memory.toString().split(",");
		} catch (error) {}
		try {
			ramFromUrl = newUrlParameters.Ram.toString().split(",");
		} catch (error) {}
		try {
			romFromUrl = newUrlParameters.Rom.split(",");
		} catch (error) {}
		try {
			screenFromUrl = newUrlParameters.Screen.split(",");
		} catch (error) {}
		try {
			sizeFromUrl = newUrlParameters.Size.split(",");
		} catch (error) {}
		try {
			pageFromUrl = newUrlParameters.Page;
		} catch (error) {}

		try {
			orderFromUrl = newUrlParameters.Order;
		} catch (error) {}

		// Filtering / Price
		if (priceFromUrl && priceFromUrl.length > 0) {
			let pr = [];
			for (let a in results) {
				if (
					Number(results[a].itemInfo.newItemPrice) >= priceFromUrl[0].low &&
					Number(results[a].itemInfo.newItemPrice) <= priceFromUrl[0].high
				) {
					pr.push(results[a]);
				}
			}
			if (pr.length > 0) {
				results = pr;
			}
		}

		// Brand
		if (brandFromUrl && brandFromUrl.length > 0) {
			let ba = [];
			for (let b in results) {
				for (let c in brandFromUrl) {
					if (results[b].itemInfo.brand === brandFromUrl[c]) {
						ba.push(results[b]);
					}
				}
			}
			if (ba.length > 0) {
				results = ba;
			}
		}

		// Memory
		if (memoryFromUrl && memoryFromUrl.length > 0) {
			let ma = [];
			for (let m in results) {
				for (let mi in memoryFromUrl) {
					if (
						Number(results[m].itemInfo.memory) === Number(memoryFromUrl[mi])
					) {
						ma.push(results[m]);
					}
				}
			}
			if (ma.length > 0) {
				results = ma;
			}
		}

		// Ram
		if (ramFromUrl && ramFromUrl.length > 0) {
			let ra = [];
			for (let r in results) {
				for (let re in ramFromUrl) {
					if (Number(results[r].itemInfo.ram) === Number(ramFromUrl[re])) {
						ra.push(results[r]);
					}
				}
			}

			if (ra.length > 0) {
				results = ra;
			}
		}

		// Rom
		if (romFromUrl && romFromUrl.length > 0) {
			let ro = [];
			for (let ri in results) {
				for (let rc in romFromUrl) {
					if (Number(results[ri].itemInfo.rom) === Number(romFromUrl[rc])) {
						ro.push(results[ri]);
					}
				}
			}

			if (ro.length > 0) {
				results = ro;
			}
		}

		// Screen
		if (screenFromUrl && screenFromUrl.length > 0) {
			let sc = [];
			for (let s in results) {
				for (let sv in screenFromUrl) {
					if (
						Number(results[s].itemInfo.screen) === Number(screenFromUrl[sv])
					) {
						sc.push(results[s]);
					}
				}
			}
			if (sc.length > 0) {
				results = sc;
			}
		}

		// Size
		if (sizeFromUrl && sizeFromUrl.length > 0) {
			let sz = [];
			for (let si in results) {
				for (let sy in sizeFromUrl) {
					if (Number(results[si].itemInfo.size) === Number(sizeFromUrl[sy])) {
						sz.push(results[si]);
					}
				}
			}
			if (sz.length > 0) {
				results = sz;
			}
		}

		// Page & Pagination
		if (!pageFromUrl) {
			results = createPagination(results, 12, 0);
		}

		if (pageFromUrl) {
			results = createPagination(results, 12, Number(pageFromUrl));
		}
		markPagination();

		// Result Sorting
		controlSort(results);

		// PASSING RESULTS TO UI FUNCTION
		displayFiltereddResults(results, parameterCategory);
	}

	// LOAD IMAGES WHEN THEY ARE IN VIEW PORT
	let theCurrentPage = new URL(document.URL);
	if (theCurrentPage.pathname.includes("gemshop")) {
		(async () => {
			let dir = await allProducts();
			dir = dir.selectedProducts[0];
			if (typeof dir === "object") {
				let images = document.querySelectorAll(".img-cont");
				let observer = new IntersectionObserver((entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							let image = entry.target;
							image.style.backgroundImage = `url(${image.dataset.src})`;
							observer.unobserve(image);
						}
					});
				});

				images.forEach((image) => {
					observer.observe(image);
				});
			}
		})();
	}
};

// PRODUCT DISPLAY (SEARCH)
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

// This controls/animate the add to cart button. It changes the button text to "IN CART"
// when the button is click and item is being added to the cart after which the button text
// returns to "ADD TO CART" after a second of being out of focus.
// It was push here because all the website page runs this search script
let timer;
let allCartBtn = [...document.querySelectorAll("#cart-btn")];
let allCartText = [...document.querySelectorAll("#cart-text")];
const animateCartButtonText = (target) => {
	clearTimeout(timer);
	if (target.nodeName === "BUTTON") {
		target.children[1].style.opacity = "0";
		target.children[1].style.transition = ".2s";
		setTimeout(() => {
			target.children[1].style.opacity = "1";
			target.children[1].innerText = "In cart";
		}, 200);
	}

	if (target.nodeName === "P") {
		target.style.opacity = "0";
		target.style.transition = ".2s";
		setTimeout(() => {
			target.style.opacity = "1";
			target.innerText = "In cart";
		}, 200);
	}
};

allCartBtn.forEach((btn) => {
	btn.addEventListener("mouseover", (e) => {
		clearTimeout(timer);
	});

	btn.addEventListener("mouseout", (e) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			btn.children[1].style.opacity = "0";
			btn.children[1].style.transition = ".2s";
			setTimeout(() => {
				btn.children[1].innerText = "add to cart";
				btn.children[1].style.opacity = "1";
			}, 200);
		}, 1000);
	});
});

allCartText.forEach((txt) => {
	txt.addEventListener("mouseover", (e) => {
		clearTimeout(timer);
	});

	txt.addEventListener("mouseout", (e) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			txt.style.opacity = "0";
			txt.style.transition = ".2s";
			setTimeout(() => {
				txt.innerHTML = `<img src="IMAGES/add-cart-white.png" alt=""  data-id= ${results[k].id} class="cart-btn" onclick = "addToCart(event)">Add to cart`;
				txt.style.opacity = "1";
			}, 800);
		}, 1000);
	});
});

// OPEN MENU
const menuDOM = document.getElementById("menu");
const menuBtn = document.getElementById("mb");
const allSecTitle = [...document.querySelectorAll(".section-title")];
const prog = document.querySelector(".progress");
menuDOM.style.display = "none";

const openMenu = () => {
	menuDOM.style.display = "block";
	document.lastChild.style.overflow = "hidden"; // Disables the window scrolling
	if (menuDOM.className.includes("menuout")) {
		menuDOM.className = menuDOM.className.replace("menuout", " menuin");
	} else {
		menuDOM.className += " menuin";
	}

	setTimeout(() => {
		menuDOM.classList.remove("menuin");
	}, 450);

	allSecTitle.forEach((st) => {
		st.style.zIndex = "0";
	});
	try {
		prog.style.zIndex = "0";
	} catch (error) {}
};

// CLOSE MENU
const closeMenu = () => {
	menuDOM.classList.add("menuout");
	setTimeout(() => {
		menuDOM.style.display = "none";
		allSecTitle.forEach((st) => {
			st.style.zIndex = "";
		});
		try {
			prog.style.zIndex = "";
		} catch (error) {}
	}, 400);
	document.lastChild.style.overflow = ""; // Enables the window scrolling
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

window.onload = onLoad;

//EOC
//EOC
//EOC
