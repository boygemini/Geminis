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
      x += `<div class="sug"><h1 class="main">${list}</h1><span class="dot"></span><h1 class="in">${name}</h1>
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




const sendQueryGO = (event) => {
  let query = search.value.toLowerCase();
  let url = "http://127.0.0.1:5500/HTML/gemshop.html?q=" + encodeURIComponent(query)
  window.location.href = url;
};
try {
  go.addEventListener("click", sendQueryGO)
} catch (error) {}



//DISPLAY SUGGESTIONS
search.addEventListener("input", () => {
  showSuggesttions(dir.gaming, "Gaming");
  showSuggesttions(dir.cellphones, "Cellphones");
  showSuggesttions(dir.speaker, "Speakers");
  showSuggesttions(dir.computers, "Computers");
  showSuggesttions(dir.tv, "TV");
});




const sendQuery = (event) => {
  let query = event.target.firstChild.innerText;
  let queryCategory = event.target.children[2].innerText;
  let url =
    "http://127.0.0.1:5500/HTML/gemshop.html?q=" +
    encodeURIComponent(query) +
    "&category=" +
    encodeURIComponent(queryCategory);
  window.location.href = url;
};



class showResult {
  static suggestionsResult(newArr, directory, Query, Category) {
    Category = newArr.category.toLowerCase()
    directory = dir[`${Category}`]
    displayResults(directory, Query)
  }

  static searchBarResult(Query, Category) {
    Category = ["gaming", "cellphones", "speaker", "computers", "tv"]
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



const onLoad = () => {
  let url = document.URL;
  let splitUrl = url.split("?")[1];
  let s2 = splitUrl.split("&");
  let newArr = new Array();
  let Query, Category, directory;

  for (let i in s2) {
    let n = s2[i].split("=");
    newArr[n[0]] = n[1];
  }

  Query = newArr.q
  if (Query.lastIndexOf("%20") > -1) {
    Query = Query.replace(/%20/g, " ");
  }

  if (s2.length > 1) {
    showResult.suggestionsResult(newArr, directory, Query, Category)
  }

  if (s2.length === 1) {
    showResult.searchBarResult(Query, Category)
  }

};
window.onload = onLoad;


const displayResults = (directory, Query) => {
  let x = ""
  for (let k in directory) {
    if (directory[k].itemInfo.name.toLowerCase().includes(Query)) {
      x += `<div class="item-box" onclick="toProduct()">
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
            <button>Add to Cart</button>
        </div>
    </div>`
    }
  }
  showBox.innerHTML = `<h1 class="cat-head">Results for "${Query}"</h1>` + x
}
