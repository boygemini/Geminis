"use strict"

const getItemID = () => {
    let url = document.URL.split("?")[1]
    let splitUrl = url.split("=")
    return splitUrl[1]
}

const getAllItems = () => {
    let allItems = JSON.parse(localStorage.getItem("StoreItems"))
    return allItems
}

const item = () => {
    let recentlyAdded = getAllItems().recentlyAdded
    let WeeklyFeatured = getAllItems().WeeklyFeatured

    for (let i in recentlyAdded) {
        if (recentlyAdded[i].id === getItemID()) {
            return recentlyAdded[i]
        }
    }

    for (let i in WeeklyFeatured) {
        if (WeeklyFeatured[i].id === getItemID()) {
            return WeeklyFeatured[i]
        }
    }

    let category = ["gaming", "cellphones", "speaker", "computers", "tv"]
    let allItems = getAllItems().selectedProducts[0]
    for (let i in category) {
        let all = allItems[`${category[i]}`]
        for (let j in all) {
            if (all[j].id === getItemID()) {
                return all[j]
            }
        }
    }
}



let Item = item().itemInfo
productDetails.innerHTML = `
<h1>${Item.name}</h1>
<h2>${Item.description1}</h2>
<div class="specifications">
<div class="sep">
    <strong>Refurbished</strong>
    <p><strong>Model : </strong>MKLV3LL/A</p>
</div>
<div class="sep">
    <p><strong>SKU : </strong>87294820</p>
    <p><strong>Color : </strong>Sierra Blue</p>
</div>
</div>
<div class="other-colors">
<h1>Other available colors</h1>
<div class="circles">
    <div class="circle" id="circle1"></div>
    <div class="circle" id="circle2"></div>
    <div class="circle" id="circle3"></div>
    <div class="circle" id="circle4"></div>
</div>
<div class="color-picked">
    <h2>Picked : </h2><span>Space gray</span>
</div>
</div>
<div class="qty">
<h2>Quantity</h2>
<div class="quantity">
    <button>-</button><input type="text" value="1"><button>+</button>
</div>
</div>
<div class="shipping-pickup">
<div class="Pickup">
    <h1>Pickup</h1><span>Unavailable within 250 miles of Hato Rey</span>
</div>
<div class="Shipping">
    <h1>Shipping</h1><span>Unavailable in your area This item is only available in certain
        markets.</span>
</div>
</div>`

price.innerText = Item.newItemPrice
largeImage.src = Item.itemImg