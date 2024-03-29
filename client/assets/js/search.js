"use strict";

const allProducts = () => {
	return new Promise((resolve, reject) => {
		resolve(
			fetch("../product.json", {
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

// SEARCH AND SUGGESTIONS
let hs = document.getElementById("hold");
let search = document.getElementById("search");
let go = document.getElementById("GO");
let displaybox = document.querySelector(".sug-holder");

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
// suggestionBox.style.display = "none";
suggestionBox.style.opacity = "0";
const openSearch = () => {
	suggestionBox.style.display = "flex";
	setTimeout(() => {
		suggestionBox.style.opacity = "1";
		suggestionBox.style.transition = ".3s ease-in-out";
	}, 0);
	setTimeout(search.focus(), 400);
	document.lastChild.style.overflow = "hidden";
};

const closeSearch = () => {
	suggestionBox.style.opacity = "0";
	suggestionBox.style.transition = ".3s ease-in-out";
	setTimeout(() => {
		suggestionBox.style.display = "none";
	}, 400);
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
			<img src="assets/images/thinarrow.png"/>
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
	let url = `shop?SearchQuery=${encodeURIComponent(
		query
	)}&Order=Random&Page=0`;
	window.location.href = url;
};

const makeUrl = (query, queryCategory) => {
	let url = `shop?category=${encodeURIComponent(
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
	static suggestionsResult(Query, Category) {
		let arr = [];
		let dir = JSON.parse(localStorage.getItem("StoreItems"))
			.selectedProducts[0];
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
		displayFilteredResults(arr, Query);
	}

	static searchBarResult(Query) {
		let Category = ["gaming", "cellphones", "speakers", "computers", "tv"];
		let arr = [];
		let dir = JSON.parse(localStorage.getItem("StoreItems"))
			.selectedProducts[0];
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
		displaySearchResults(arr, Query);
	}

	static async negativeResults(Query) {
		showBox.innerHTML = `<div class="noresult">
			<div class ="noresulttext"><h1 class = "cat-head" id="nores-h1"> Oops, there are no results for  "${Query}" </h1><p>Try checking your spelling or use more general terms</p></div>
			<span>Go back to</span>
			<div class="noresultbuttons"><a href="/" class='backtohome'>Homepage</a><a href="shop" class='backtoshop'>Shop</a></div>
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
		let theCurrentPage = new URL(document.URL);
		if (theCurrentPage.pathname.includes("shop")) {
			document.querySelector(".banner-container").style.display = "none";
			document.getElementById("bodyy").style.backgroundColor = "#f4f4f6";
			document.getElementById("footer").style.position = "absolute";
			document.getElementById("footer").style.bottom = "0";
			document.querySelector(
				".shop-body"
			).innerHTML = `<div class="noresult notfound">
			<div class ="noresulttext"><h1 class = "cat-head" > Page not found</h1><p>We couldn’t find the page you are looking for</p></div>
			<span>Go back to</span>
			<div class="noresultbuttons"><a href="/" class='backtohome'>Homepage</a><a href="shop" class='backtoshop'>Shop</a></div>
		</div>`;
		}
	}
}

const displaySearchResults = (directory, Query) => {
	let x = "";
	let y = "";
	let totalItems = directory.totalItems.length;
	directory = directory.page;
	if (directory.length > 0) {
		setTimeout(() => {
			showPreloader(false);
		}, 0);
		getResults.positiveResults();
		for (let k in directory) {
			if (directory[k].itemInfo.name.toLowerCase().includes(Query)) {
				y += `
			<a href="product?item=${directory[k].id}" class="sell-box sel-box" data-id=${directory[k].id} >

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
			</div>
		</div>
		</a>`;
			}
		}

		document.getElementById(
			"result-title"
		).innerHTML = `${totalItems} Results for <span id="search-entry"> ${Query}</span>`;
		showBox.innerHTML = y;
	}
	if (directory.length === 0) {
		getResults.negativeResults(Query);
	}
};

const displayFilteredResults = (results, category) => {
	let x = ``;
	let y = "";
	results = results.page;

	if (results.length > 0) {
		setTimeout(() => {
			showPreloader(false);
		}, 0);
		getResults.positiveResults();
		for (let k in results) {
			y += `
			<a href="product?item=${results[k].id}" class="sell-box sel-box" data-id=${results[k].id} >

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
			</div>
		</div>
		</a>`;
		}
		if (category === "tv") category = "televisions";
		document.getElementById("result-title").innerText = `${category}`;
		showBox.innerHTML = y;
	}
	if (results.length === 0) {
		getResults.negativeResults(Query);
	}
};

const getCatFiltersAndSearchResults = async (searchQuery, category) => {
  const selectedProducts = JSON.parse(localStorage.getItem("StoreItems"))
    ?.selectedProducts[0];
  const allProductsData = await allProducts();
  const productCatalog =
    selectedProducts || allProductsData.selectedProducts[0];

  const getCategoryItemNames = (categoryName) => [
    ...new Set(productCatalog[categoryName].map((item) => item.itemInfo.name)),
  ];

  const gamingItemNames = getCategoryItemNames("gaming");
  const cellphonesItemNames = getCategoryItemNames("cellphones");
  const tvItemNames = getCategoryItemNames("tv");
  const speakersItemNames = getCategoryItemNames("speakers");
  const computersItemNames = getCategoryItemNames("computers");

  const allItemNames = [
    gamingItemNames,
    cellphonesItemNames,
    tvItemNames,
    speakersItemNames,
    computersItemNames,
  ];
  const allItemNamesFlat = allItemNames.flat();

  const searchResults = (query) => getResults.searchBarResult(query);

  if (category) {
    return getResults.suggestionsResult(searchQuery, category);
  }

  const checkAndPerformSearch = (keywords, action) => {
    for (const keyword of keywords) {
      if (keyword.toLowerCase().trim().includes(searchQuery)) {
        action();
        return searchResults(searchQuery);
      }
    }
  };

  const categoryActions = {
    gaming: Gamings,
    cellphones: cellPhones,
    tv: TVs,
    speakers: Speakers,
    computers: Computers,
  };

  for (const [categoryName, action] of Object.entries(categoryActions)) {
    const categoryItemNames = productCatalog[categoryName].map(
      (item) => item.itemInfo.name
    );
    const result = checkAndPerformSearch(categoryItemNames, action);
    if (result) {
      return result;
    }
  }

  const negativeResult = allItemNamesFlat.some(
    (itemName) => itemName.toLowerCase() !== searchQuery
  )
    ? getResults.negativeResults(searchQuery)
    : null;

  return negativeResult;
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
	setTimeout(() => {
		if (page.length === 0) page = "0";
		document.getElementById(page).className += " active";
	}, 500);
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
			<div class="noresultbuttons"><a href="/" id="" class='backtohome'>Homepage</a><a href="shop" class='backtoshop'>Shop</a></div>
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
		let summary = {
			page: paginatedResult[pageNumber],
			totalItems: results,
		};
		return summary;
	}
}

const convertUrlParametersIntoObject = (urlWithQuery) => {
	let urlParameters = urlWithQuery
		.split("?category")
		.toString()
		.split("&")
		.filter((arr) => !arr.includes("shop"));
	let newUrlParameters = new Array();
	for (let i in urlParameters) {
		let sp = urlParameters[i].split("=");
		newUrlParameters[sp[0]] = sp[1];
	}
	return newUrlParameters;
};

// LOAD IMAGES WHEN THEY ARE IN VIEW PORT
const imageObserver = () => {
	let theCurrentPage = new URL(document.URL);
	if (theCurrentPage.pathname.includes("shop")) {
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

const onLoad = async () => {
	let dir = await allProducts();
	const handleUrlParameters = () => {
    let cpUrl = new URL(document.URL);
    if (!(typeof dir === "object")) return;

    if (cpUrl.search.length <= 0 && cpUrl.pathname === "/shop") {
      return;
    } else if (cpUrl.search.length > 0 && cpUrl.pathname === "/shop") {
      indicateLoadingWhileAwaitingResults(true);
    }

    let urlWithQuery = document.URL;

    const handleSearch = () => {
      let Query, Category;

      if (
        urlWithQuery.includes("&SearchQuery=") &&
        urlWithQuery.includes("category=")
      ) {
        Query = urlWithQuery.split("SearchQuery=")[1].split("&")[0];
        Category = urlWithQuery.split("category=")[1].split("&")[0];
        Query = removeThe20Nonsense(Query);
        getCatFiltersAndSearchResults(Query, Category);
        imageObserver();
        return;
      }

      if (
        urlWithQuery.includes("?SearchQuery=") &&
        !urlWithQuery.includes("category=")
      ) {
        Query = urlWithQuery.split("?SearchQuery=")[1].split("&")[0];
        Query = removeThe20Nonsense(Query).trim();
        getCatFiltersAndSearchResults(Query);
        imageObserver();
        return;
      }

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

      if (urlWithQuery.includes("?category")) {
        let parameterCategory = urlWithQuery
          .split("?category=")[1]
          .split("&")[0];

        let allItems = JSON.parse(localStorage.getItem("StoreItems"));

        let allItemsInCategory =
          allItems.selectedProducts[0][`${parameterCategory}`];

        let results = [];

        if (results.length === 0) {
          results = allItemsInCategory;
        }

        // Handle URL parameters
        const newUrlParameters = convertUrlParametersIntoObject(urlWithQuery);
        handlePriceFilter(newUrlParameters.Price);
        handleArrayFilter(newUrlParameters.Brand, "itemInfo.brand");
        handleArrayFilter(newUrlParameters.Filters, "itemInfo.filters");
        handleArrayFilter(newUrlParameters.Memory, "itemInfo.memory");
        handleArrayFilter(newUrlParameters.Ram, "itemInfo.ram");
        handleArrayFilter(newUrlParameters.Rom, "itemInfo.rom");
        handleArrayFilter(newUrlParameters.Screen, "itemInfo.screen");
        handleArrayFilter(newUrlParameters.Size, "itemInfo.size");
        handlePagination(newUrlParameters.Page, results);
        controlSort(results);
        displayFilteredResults(results, parameterCategory);
      }

      imageObserver();
    };

    handleSearch();
  };

  const handlePriceFilter = (price) => {
    if (!price) return;

    let pr = [];
    for (let a in results) {
      if (
        Number(results[a].itemInfo.newItemPrice) >= price[0].low &&
        Number(results[a].itemInfo.newItemPrice) <= price[0].high
      ) {
        pr.push(results[a]);
      }
    }
    if (pr.length > 0) {
      results = pr;
    }
  };

  const handleArrayFilter = (param, key) => {
    if (!param || param.length === 0) return;

    let filteredArray = [];
    for (let i in results) {
      for (let j in param) {
        if (results[i][key] === param[j]) {
          filteredArray.push(results[i]);
        }
      }
    }
    if (filteredArray.length > 0) {
      results = filteredArray;
    }
  };

  const handlePagination = (page, results) => {
    if (!page) {
      results = createPagination(results, 12, 0);
    }

    if (page) {
      results = createPagination(results, 12, Number(page));
    }
    markPagination();
  };

  // Call the main function
  handleUrlParameters();

};

// OPEN MENU
const menuDOM = document.getElementById("menu");
const menuBtn = document.getElementById("mb");
const allSecTitle = [...document.querySelectorAll(".section-title")];
const prog = document.querySelector(".progress");
menuDOM.style.display = "none";
menuDOM.style.transform = "translateX(-100%)";
menuDOM.style.boxShadow = "none";

const openMenu = () => {
	menuDOM.style.display = "block";
	setTimeout(() => {
		menuDOM.style.transform = "translateX(0)";
		menuDOM.style.boxShadow = "";
		menuDOM.style.transition = ".5s";
	}, 10);

	allSecTitle.forEach((st) => {
		st.style.zIndex = "0";
	});
	try {
		prog.style.zIndex = "0";
	} catch (error) {}
	document.lastChild.style.overflow = "hidden"; // Disables the window scrolling
};

// CLOSE MENU
const closeMenu = () => {
	menuDOM.style.transform = "translateX(-100%)";
	menuDOM.style.boxShadow = "none";
	menuDOM.style.transition = ".5s";
	setTimeout(() => {
		menuDOM.style.display = "none";
		allSecTitle.forEach((st) => {
			st.style.zIndex = "";
		});
		try {
			prog.style.zIndex = "";
		} catch (error) {}
	}, 500);
	document.lastChild.style.overflow = ""; // ReEnables the window scrolling
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

// SCROLL TO TOP BUTTON
const backToTopBtn = document.getElementById("backtotop");
const backToTop = () => {
	window.scrollTo(0, 0);
};

window.addEventListener("scroll", (e) => {
	if (window.scrollY > 200) {
		backToTopBtn.style.opacity = "1";
	} else {
		backToTopBtn.style.opacity = "0";
	}
});

window.onload = onLoad;
