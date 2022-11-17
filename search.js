"use strict";



/*

SEARCH AND SEARCH SUGGESTIONS

*/

//Variables
let dir2 = JSON.parse(localStorage.getItem("StoreItems"));
let hs = document.getElementById("hold");
let search = document.getElementById("search");
let go = document.getElementById("GO")
let dir = dir2.selectedProducts[0];
let displaybox = document.getElementById("suggestions");




//Function
const showSuggesttions = (dirname, name) => {
  let x = "";
  let arr = dirname;

  let mapp = arr.map((x) => {
    return x.itemInfo.name;
  });

  let removeDuplicates = [...new Set(mapp)];
  for (let i in removeDuplicates) {
    let list = removeDuplicates[i].toLowerCase();
    let searchInput = search.value.toLowerCase();

    //Show Suggestions
    if (list.includes(searchInput)) {
      x += `<div class="sug">
			<h1 class="main">${list}</h1>
			<span class="dot"></span>
			<h1 class="in">${name}</h1>
			</div>`;
      hs.style.opacity = "1";
      hs.style.transition = ".2s ease-in-out";
      displaybox.innerHTML = x;

      //Add function to suggestions
      let suggestions = [...document.querySelectorAll(".sug")];
      for (let s in suggestions) {
        suggestions[s].addEventListener("click", sendQuery);
      }
    }

    if (searchInput == "") {
      hs.style.opacity = "0";
      hs.style.transition = ".2s ease-in-out";
    }
  }
};


//DISPLAY SUGGESTIONS
search.addEventListener("input", () => {
  showSuggesttions(dir.gaming, "Gaming");
  showSuggesttions(dir.cellphones, "Cellphones");
  showSuggesttions(dir.speakers, "Speakers");
  showSuggesttions(dir.computers, "Computers");
  showSuggesttions(dir.tv, "TV");
});




const sendQueryGO = (event) => {
  let query = search.value.toLowerCase();
  let url = `gemshop.html?SearchQuery=${encodeURIComponent(query)}&Page=0`
  window.location.href = url;
};


const sendQuery = (event) => {
  let query = event.target.firstElementChild.innerText;
  let queryCategory = event.target.children[2].innerText.toLowerCase();
  let url = `gemshop.html?category=${encodeURIComponent(queryCategory)}&SearchQuery=${encodeURIComponent(query)}&Page=0`;
  window.location.href = url;
};


try {
  go.addEventListener("click", (event) => {
    if (search.value !== "") {
      sendQueryGO();
    }
  })
} catch (error) {

}


search.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && search.value !== "") {
    sendQueryGO();
  }
})


const markAndCreatePagination = (results) => {
  let pageNumber = document.URL.split("Page=")[1]
  if (pageNumber) results = createPagination(results, 10, Number(pageNumber))

  markPagination()
}

class getResults {
  static suggestionsResult(Query, Category) {
    let arr = []
    let searchDirectory = dir[`${Category}`];

    for (let j in searchDirectory) {
      if (searchDirectory[j].itemInfo.name.toLowerCase().includes(Query)) {
        arr.push(searchDirectory[j])
      }
    }
    let pageNumber = document.URL.split("Page=")[1]
    if (pageNumber) arr = createPagination(arr, 10, Number(pageNumber))

    markPagination()
    displayFiltereddResults(arr, Query)
  }

  static searchBarResult(Query) {
    let Category = ["gaming", "cellphones", "speakers", "computers", "tv"]
    let arr = []
    for (let i in Category) {
      let searchDirectory = dir[`${Category[i]}`];
      for (let j in searchDirectory) {
        if (searchDirectory[j].itemInfo.name.toLowerCase().includes(Query)) {
          arr.push(searchDirectory[j])
        }
      }
    }
    let pageNumber = document.URL.split("Page=")[1]
    if (pageNumber) arr = createPagination(arr, 10, Number(pageNumber))

    markPagination()
    displayResults(arr, Query)
  }
}



const displayResults = (directory, Query) => {
  let x = ""
  let y = ""
  if (directory.length === 0) {
    showBox.innerHTML = `<div class="noresult">
			<h1 class = "cat-head" > Oops, there are no results
			for "${Query}" </h1>  <p>Try checking your spelling or use more general terms</p >
		</div>`
  }

  if (directory.length > 0) {
    for (let k in directory) {
      if (directory[k].itemInfo.name.toLowerCase().includes(Query)) {
        // 		x += `<div class="item-box" data-id=${directory[k].id} onclick = "viewProduct(event)">
        // 		<img src=${directory[k].itemInfo.itemImg} alt="">
        // 		<div class="item-details">
        // 				<h1>${directory[k].itemInfo.name}</h1>
        // 				<h2>${directory[k].itemInfo.description1}</h2>
        // 				<div class="specifications">
        // 						<strong>Refurbished</strong>
        // 						<p><strong>Model : </strong>MKLV3LL/A</p>
        // 						<p><strong>SKU : </strong>87294820</p>
        // 						<p><strong>Color : </strong>Sierra Blue</p>
        // 				</div>
        // 		</div>
        // 		<div class="buy">
        // 				<div class="price-tag">
        // 						<span class="currency">$ </span><span class="price">${directory[k].itemInfo.newItemPrice}</span>
        // 				</div>
        // 				<button onclick = "addToCart(event)">Add to Cart</button>
        // 		</div>
        // </div>`
        y += `
			<div div class = "sel-box" data-id = ${directory[k].id}>
				<div class="img-con">
					<img src=${directory[k].itemInfo.itemImg} alt="" data-id=${directory[k].id} onclick = "viewProduct(event)">
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
					<span class = "old-price price" > ${
							directory[k].itemInfo.oldItemPrice
			}</span>
				</span>
				<button id="cart-btn" data-id = ${directory[k].id} class="cart-btn"><img id="addto-cart-img" src="/IMAGES/add-to-cart.png"
						alt="" onclick = "addToCart(event)">
				</button>
			</div>
		</div>
		</div>`
      }
    }
    document.getElementById("result-title").innerText = `Results for "${Query}"`
    showBox.innerHTML = y
  }
}


const displayFiltereddResults = (results, category) => {
  let x = ``;
  let y = ""
  results = results.sort((a, b) => Number(b.itemInfo.newItemPrice) - Number(a.itemInfo.newItemPrice))
  console.log(results);
  if (results.length === 0) {
    showBox.innerHTML = `<div class="noresult">
			<h1 class = "cat-head" > Oops, there are no results
			for "${Query}" </h1>  <p>Try checking your spelling or use more general terms</p >
		</div>`
  }

  if (results.length > 0) {
    for (let k in results) {
      // 	x += `<div class="item-box" data-id=${results[k].id} onclick = "viewProduct(event)">
      // 		<img src=${results[k].itemInfo.itemImg} alt="">
      // 		<div class="item-details">
      // 				<h1>${results[k].itemInfo.name}</h1>
      // 				<h2>${results[k].itemInfo.description1} ${results[k].itemInfo.rom}GB</h2>
      // 				<div class="specifications">
      // 						<strong>Refurbished</strong>
      // 						<p><strong>Model : </strong>MKLV3LL/A</p>
      // 						<p><strong>SKU : </strong>87294820</p>
      // 						<p><strong>Color : </strong>Sierra Blue</p>
      // 				</div>
      // 		</div>
      // 		<div class="buy">
      // 				<div class="price-tag">
      // 						<span class="currency">$ </span><span class="price">${results[k].itemInfo.newItemPrice}</span>
      // 				</div>
      // 				<button onclick = "addToCart(event)">Add to Cart</button>
      // 		</div>
      // </div>`
      y += `
			<div div class = "sel-box" data-id = ${results[k].id}>
				<div class="img-con">
					<img src=${results[k].itemInfo.itemImg} alt="" data-id=${results[k].id} onclick = "viewProduct(event)">
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
					<span class = "price" > <span class = "currency"
					id = "currency" > $ </span> ${results[k].itemInfo.newItemPrice} </span>
					<span class = "old-price price" > ${
							results[k].itemInfo.oldItemPrice
			}</span>
				</span>
				<button id="cart-btn" data-id = ${results[k].id} class="cart-btn"><img id="addto-cart-img" src="/IMAGES/add-to-cart.png"
						alt="" onclick = "addToCart(event)">
				</button>
			</div>
		</div>
		</div>`
    }
    document.getElementById("result-title").innerText = `${category}`
    showBox.innerHTML = y
  }
}




const getCatFilters = (Query, Category) => {
  let gamekey = ["xbox", "box", "play", "station"]
  let phonekey = ["iph", "iphone", "iphones", "13", "samsung", "itel", "infinix", "lg"]
  let tvkey = ["samsung", "midea", "lg"]
  let speakerkey = ["jbl", "flip", "ora", "beat"]
  let comkey = ["mac", "hp", "asus", "toshiba"]

  function Call(Query, Category) {
    if (Category) {
      return getResults.suggestionsResult(Query, Category)
    }
    if (!Category) {
      return getResults.searchBarResult(Query)
    }
  }

  for (let i in gamekey) {
    if (gamekey[i].includes(Query)) {
      Gamings()
      Call(Query, Category)
    }
  }

  for (let i in phonekey) {
    if (phonekey[i].includes(Query)) {
      cellPhones()
      Call(Query, Category)
    }
  }

  for (let i in tvkey) {
    if (tvkey[i].includes(Query)) {
      TVs()
      Call(Query, Category)
    }
  }

  for (let i in speakerkey) {
    if (speakerkey[i].includes(Query)) {
      Speakers()
      Call(Query, Category)
    }
  }

  for (let i in comkey) {
    if (comkey[i].includes(Query)) {
      Computers()
      Call(Query, Category)
    }
  }
}



const removeThe20Nonsense = (Query) => {
  if (Query.lastIndexOf("%20") > -1) {
    Query = Query.replace(/%20/g, " ");
    return Query
  }
  return Query
}



let page = document.URL.split("Page=")[1].split("&")[0]
let pageCount;

function Next(event, paginatedResult) {
  pageCount = (Number(page)) + 1
  if (pageCount !== Number(paginatedResult.length)) {
    event.target.disabled = false
    filter.page(event, pageCount.toString())
  }
}


function Prev(event) {
  pageCount = (Number(page)) - 1
  if (pageCount <= 0) {
    pageCount = 0
  }
  filter.page(event, pageCount.toString())
}


const markPagination = () => {
  let page = document.URL.split("Page=")[1].split("&")[0]
  if (page.length === 0) page = "0"
  document.getElementById(page).className += " active"
}


function createPagination(results, numberOnEachPage, pageNumber) {
  let arrayGroupTotal = results.length / numberOnEachPage;
  let arrayRemainder = results.length % numberOnEachPage;
  let itemsLeftInArray = results.slice(results.length - arrayRemainder, results.length)
  let paginatedResult = new Array()
  let lastSet;
  for (let i = 0; i <= Math.floor(arrayGroupTotal); i++) {
    if (i === 0) {
      lastSet = 0;
      i = 1
    }
    paginatedResult.push(results.slice(lastSet, numberOnEachPage * i));
    lastSet = numberOnEachPage * i
  }


  if (paginatedResult[paginatedResult.length - 1].length > itemsLeftInArray.length) {
    paginatedResult.push(itemsLeftInArray)
  }


  // Just in case someone altered the page number from the url
  if (!paginatedResult[pageNumber]) {
    document.getElementById("showbox").innerHTML = `<div class="noresult">
					<h1 class = "cat-head" > This page is empty </h1>  <p>Try checking your spelling or use more general terms</p >
					</div>`
  }


  // Pagination UI
  if (paginatedResult[pageNumber]) {
    let n = ""
    if (paginatedResult[paginatedResult.length - 1].length === 0) {
      paginatedResult.pop()
    }

    for (let i in paginatedResult) {
      n += `<button class="pagin" onclick="filter.page(event)" id='${Number(i)}'>${Number(i) + 1}</button>`
    }

    if (paginatedResult.length === 1) {
      prevPage.disabled = true;
      prevPage.style.opacity = "0.5"
      nextPage.disabled = true;
      nextPage.style.opacity = "0.5"
    }

    if (pageNumber === 0) {
      prevPage.disabled = true;
      prevPage.style.opacity = "0.5"
    }

    if ((pageNumber + 1) === paginatedResult.length) {
      nextPage.disabled = true;
      nextPage.style.opacity = "0.5"
    }

    nextPage.addEventListener("click", (event) => {
      Next(event, paginatedResult)
    })

    prevPage.addEventListener("click", (event) => {
      Prev(event)
      console.log("Hh");
    })

    document.getElementById("pagindiv").innerHTML = n
    return paginatedResult[pageNumber]
  }
}




const convertUrlParametersIntoObject = (urlWithQuery) => {
  let urlParameters = urlWithQuery.split("?category").toString().split("&").filter(arr => !arr.includes("gemshop.html"));
  let newUrlParameters = new Array()
  for (let i in urlParameters) {
    let sp = urlParameters[i].split("=")
    newUrlParameters[sp[0]] = sp[1]
  }
  return newUrlParameters
}




const onLoad = () => {
  let urlWithQuery = document.URL

  // LOAD RESULTS IF SEARCH WAS FROM SEARCH BAR SUGGESTION
  if (urlWithQuery.split("&SearchQuery=").length > 1 && urlWithQuery.split("category=").length > 1) {
    let Query = urlWithQuery.split("SearchQuery=")[1].split("&")[0];
    let Category = urlWithQuery.split("category=")[1].toString().split("&")[0]
    Query = removeThe20Nonsense(Query)
    getCatFilters(Query, Category)
    return getResults.suggestionsResult(Query, Category)
  }


  // LOAD RESULTS IF SEARCH WAS FROM SEARCH BAR
  if (urlWithQuery.split("?SearchQuery=").length > 1 && urlWithQuery.split("category=").length === 1) {
    let Query = urlWithQuery.split("?SearchQuery=")[1].split("&")[0]
    Query = removeThe20Nonsense(Query)
    return getCatFilters(Query)
  }


  // LOAD FILTER RESULTS FROM URL
  if (urlWithQuery.split("?category").length > 1) {
    let parameterCategory = urlWithQuery.split("?category=")[1].toString().split("&")[0]
    let allItems = JSON.parse(localStorage.getItem("StoreItems"))
    let allItemsInCategory = allItems.selectedProducts[0][`${parameterCategory}`]
    let results = [];

    if (results.length === 0) {
      results = allItemsInCategory
    }


    // PARAMETERS FROM THE URL
    let newUrlParameters = convertUrlParametersIntoObject(urlWithQuery)
    try {
      newUrlParameters.Price = newUrlParameters.Price.replace(/%20/g, "").split("-")
      priceFromUrl = [{
        high: Number(newUrlParameters.Price[1]),
        low: Number(newUrlParameters.Price[0])
      }]
    } catch (error) {

    }
    try {
      brandFromUrl = newUrlParameters.Brand.split(",")
    } catch (error) {

    }
    try {
      filterFromUrl = newUrlParameters.Filters.split(",")
    } catch (error) {

    }
    try {
      memoryFromUrl = newUrlParameters.Memory.toString().split(",")
      console.log(memoryFromUrl);
    } catch (error) {

    }
    try {
      ramFromUrl = newUrlParameters.Ram.toString().split(",")
      console.log(ramFromUrl);
    } catch (error) {

    }
    try {
      romFromUrl = newUrlParameters.Rom.split(",")
      console.log(romFromUrl);
    } catch (error) {

    }
    try {
      screenFromUrl = newUrlParameters.Screen.split(",")

    } catch (error) {

    }
    try {
      sizeFromUrl = newUrlParameters.Size.split(",").replace(/%20/g, "").split("-")

    } catch (error) {

    }
    try {
      pageFromUrl = newUrlParameters.Page

    } catch (error) {

    }


    // FILTERING / Price

    if (priceFromUrl && priceFromUrl.length > 0) {
      let pr = []
      for (let a in results) {
        if (Number(results[a].itemInfo.newItemPrice) >= priceFromUrl[0].low && Number(results[a].itemInfo.newItemPrice) <= priceFromUrl[0].high) {
          pr.push(results[a])
        }
      }
      if (pr.length === 0) {
        results = results
      }
      if (pr.length > 0) {
        results = pr
      }
    }


    // Brand
    if (brandFromUrl && brandFromUrl.length > 0) {
      let ba = []
      for (let b in results) {
        for (let c in brandFromUrl) {
          if (results[b].itemInfo.brand === brandFromUrl[c]) {
            ba.push(results[b])
          }
        }
      }
      if (ba.length === 0) {
        results = results
      }
      if (ba.length > 0) {
        results = ba
      }
    }


    // Memory
    if (memoryFromUrl && memoryFromUrl.length > 0) {
      console.log(memoryFromUrl);
      let ma = [];
      for (let m in results) {
        for (let mi in memoryFromUrl) {
          if (Number(results[m].itemInfo.memory) === Number(memoryFromUrl[mi])) {
            ma.push(results[m])
          }
        }
      }
      if (ma.length === 0) {
        results = results
      }
      if (ma.length > 0) {
        results = ma
      }
    }


    // Ram
    if (ramFromUrl && ramFromUrl.length > 0) {
      let ra = [];
      for (let r in results) {
        for (let re in ramFromUrl) {
          if (Number(results[r].itemInfo.ram) === Number(ramFromUrl[re])) {
            ra.push(results[r])
          }
        }
      }
      if (ra.length === 0) {
        results = results
      }
      if (ra.length > 0) {
        results = ra
      }
    }


    // Rom
    if (romFromUrl && romFromUrl.length > 0) {
      let ro = [];
      for (let ri in results) {
        for (let rc in romFromUrl) {
          if (Number(results[ri].itemInfo.rom) === Number(romFromUrl[rc])) {
            ro.push(results[ri])
          }
        }
      }
      if (ro.length === 0) {
        results = results
      }
      if (ro.length > 0) {
        results = ro
      }
    }


    // Screen
    if (screenFromUrl && screenFromUrl.length > 0) {
      let sc = [];
      for (let s in results) {
        for (let sv in screenFromUrl) {
          if (Number(results[s].itemInfo.screen) === Number(screenFromUrl[sv])) {
            sc.push(results[s])
          }
        }
      }
      if (sc.length === 0) {
        results = results
      }
      if (sc.length > 0) {
        results = sc
      }
    }


    // Size
    if (sizeFromUrl && sizeFromUrl.length > 0) {
      let sz = [];
      for (let si in results) {
        for (let sy in sizeFromUrl) {
          if (Number(results[si].itemInfo.size) === Number(sizeFromUrl[sy])) {
            sz.push(results[si])
          }
        }
      }
      if (sz.length === 0) {
        results = results
      }
      if (sz.length > 0) {
        results = sz
      }
    }


    // Page
    if (!pageFromUrl) {
      results = createPagination(results, 10, 0)
    }

    if (pageFromUrl) {
      results = createPagination(results, 10, Number(pageFromUrl))
    }

    markPagination()


    displayFiltereddResults(results, parameterCategory)
  }
};


window.onload = onLoad;
console.log("OK : code ran successfully!");
//EOC
//EOC
//EOC