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
  let url = `gemshop.html?SearchQuery=${encodeURIComponent(query)}`
  window.location.href = url;
};


const sendQuery = (event) => {
  let query = event.target.firstChild.innerText;
  let queryCategory = event.target.children[2].innerText.toLowerCase();
  let url = `gemshop.html?category=${encodeURIComponent(queryCategory)}&SearchQuery=${encodeURIComponent(query)}`;
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




class getResults {
  static suggestionsResult(Query, Category) {
    let arr = []
    let searchDirectory = dir[`${Category}`];
    for (let j in searchDirectory) {
      if (searchDirectory[j].itemInfo.name.toLowerCase().includes(Query)) {
        arr.push(searchDirectory[j])
      }
    }
    displayResults(arr, Query)
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
    displayResults(arr, Query)
  }
}



const displayResults = (directory, Query) => {
  let x = ""

  if (directory.length === 0) {
    showBox.innerHTML = `<div class="noresult">
			<h1 class = "cat-head" > Oops, there are no results
			for "${Query}" </h1>  <p>Try checking your spelling or use more general terms</p >
		</div>`
  }

  if (directory.length > 0) {
    for (let k in directory) {
      if (directory[k].itemInfo.name.toLowerCase().includes(Query)) {
        x += `<div class="item-box" data-id=${directory[k].id} onclick = "viewProduct(event)">
				<img src=${directory[k].itemInfo.itemImg} alt="">
				<div class="item-details">
						<h1>${directory[k].itemInfo.name}</h1>
						<h2>${directory[k].itemInfo.description1}</h2>
						<div class="specifications">
								<strong>Refurbished</strong>
								<p><strong>Model : </strong>MKLV3LL/A</p>
								<p><strong>SKU : </strong>87294820</p>
								<p><strong>Color : </strong>Sierra Blue</p>
						</div>
				</div>
				<div class="buy">
						<div class="price-tag">
								<span class="currency">$ </span><span class="price">${directory[k].itemInfo.newItemPrice}</span>
						</div>
						<button onclick = "addToCart(event)">Add to Cart</button>
				</div>
		</div>`
      }
    }
    showBox.innerHTML = `<h1 class="cat-head">Results for "${Query}"</h1>` + x
  }
}


const displayFiltereddResults = (results, category) => {
  let x = ``;
  if (results.length === 0) {
    showBox.innerHTML = `<div class="noresult">
			<h1 class = "cat-head" > Oops, there are no results
			for "${Query}" </h1>  <p>Try checking your spelling or use more general terms</p >
		</div>`
  }

  if (results.length > 0) {
    for (let k in results) {
      x += `<div class="item-box" data-id=${results[k].id} onclick = "viewProduct(event)">
				<img src=${results[k].itemInfo.itemImg} alt="">
				<div class="item-details">
						<h1>${results[k].itemInfo.name}</h1>
						<h2>${results[k].itemInfo.description1} ${results[k].itemInfo.rom}GB</h2>
						<div class="specifications">
								<strong>Refurbished</strong>
								<p><strong>Model : </strong>MKLV3LL/A</p>
								<p><strong>SKU : </strong>87294820</p>
								<p><strong>Color : </strong>Sierra Blue</p>
						</div>
				</div>
				<div class="buy">
						<div class="price-tag">
								<span class="currency">$ </span><span class="price">${results[k].itemInfo.newItemPrice}</span>
						</div>
						<button onclick = "addToCart(event)">Add to Cart</button>
				</div>
		</div>`
    }
    showBox.innerHTML = `<h1 class="cat-head">Results for "${category}"</h1>` + x
  }
}




const getCatFilters = (Query, Category) => {
  let gamekey = ["xbox", "box", "play", "station"]
  let phonekey = ["iph", "iphone", "13", "samsung", "itel", "infinix", "lg"]
  let tvkey = ["samsung", "midea", "lg"]
  let speakerkey = ["jbl", "flip", "ora", "beat"]
  let comkey = ["mac", "hp", "asus", "toshiba"]
  for (let i in gamekey) {
    if (gamekey[i].includes(Query)) {
      Gamings()
      if (Category) {
        return getResults.suggestionsResult(Query, Category)
      }
      if (!Category) {
        return getResults.searchBarResult(Query)
      }
    }
  }
  for (let i in phonekey) {
    if (phonekey[i].includes(Query)) {
      cellPhones()
      if (Category) {
        return getResults.suggestionsResult(Query, Category)
      }
      if (!Category) {
        return getResults.searchBarResult(Query)
      }
    }
  }

  for (let i in tvkey) {
    if (tvkey[i].includes(Query)) {
      TVs()
      if (Category) {
        return getResults.suggestionsResult(Query, Category)
      }
      if (!Category) {
        return getResults.searchBarResult(Query)
      }
    }
  }

  for (let i in speakerkey) {
    if (speakerkey[i].includes(Query)) {
      Speakers()
      if (Category) {
        return getResults.suggestionsResult(Query, Category)
      }
      if (!Category) {
        return getResults.searchBarResult(Query)
      }
    }
  }

  for (let i in comkey) {
    if (comkey[i].includes(Query)) {
      Computers()
      if (Category) {
        return getResults.suggestionsResult(Query, Category)
      }
      if (!Category) {
        return getResults.searchBarResult(Query)
      }
    }
  }
}



const removeThe20Nonsense = (Query) => {
  if (Query.lastIndexOf("%20") > -1) {
    Query = Query.replace(/%20/g, " ");
  }
}



const onLoad = () => {
  let urlWithQuery = document.URL


  if (urlWithQuery.split("&SearchQuery=").length > 1 && urlWithQuery.split("category=").length > 1) {
    let Query = urlWithQuery.split("SearchQuery=")[1];
    let Category = urlWithQuery.split("category=")[1].toString().split("&")[0]
    removeThe20Nonsense(Query)
    getCatFilters(Query, Category)
  }


  if (urlWithQuery.split("?SearchQuery=").length > 1 && urlWithQuery.split("category=").length === 1) {
    let Query = urlWithQuery.split("?SearchQuery=")[1]
    removeThe20Nonsense(Query)
    getCatFilters(Query)
  }



  if (urlWithQuery.split("?category").length > 1) {
    let urlParameters = urlWithQuery.split("?category").toString().split("&").filter(arr => !arr.includes("gemshop.html"));
    let parameterCategory = urlWithQuery.split("?category=")[1].toString().split("&")[0]
    let allItems = JSON.parse(localStorage.getItem("StoreItems"))
    let allItemsInCategory = allItems.selectedProducts[0][`${parameterCategory}`]
    let results = [];

    if (results.length === 0) {
      results = allItemsInCategory
    }

    let newUrlParameters = new Array()
    for (let i in urlParameters) {
      let sp = urlParameters[i].split("=")
      newUrlParameters[sp[0]] = sp[1]
    }


    // PARRAMTERS FROM THE URL
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
    displayFiltereddResults(results, parameterCategory)
  }
};


window.onload = onLoad;
console.log("OK : code ran successfully!");
//EOC
//EOC
//EOC