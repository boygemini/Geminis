"use strict"

const storeItemsIfNotAlreadyStored = () => {
    if (localStorage.StoreItems === undefined) {
        let product_request = new XMLHttpRequest();
        product_request.open("GET", "/JSON/product.json", false);
        product_request.onload = function () {
            if (product_request.status === 200) {
                localStorage.StoreItems = this.responseText;
            }
        };
        product_request.send();
    }
}
storeItemsIfNotAlreadyStored();


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



let Item = item()
productDetails.innerHTML = `
<h1>${Item.itemInfo.name}</h1>
<h2>${Item.itemInfo.description1}</h2>
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

price.innerText = Item.itemInfo.newItemPrice
largeImage.src = Item.itemInfo.itemImg


class Products {
    /*

    LOAD ALL PRODUCTS AND SAVE THEM TO THE LOCALSTORAGE

    */
    static selectedForYou() {
        let product_request = new XMLHttpRequest();
        product_request.open("GET", "/JSON/product.json", false);
        product_request.onload = function () {
            if (product_request.status === 200) {
                localStorage.StoreItems = this.responseText;
            }
        };
        product_request.send();
    }

    /*

     RETRIEVE ALL ITEMS FROM LOCAL STORAGE

     */
    static getSelectedProducts() {
        return JSON.parse(localStorage.StoreItems);
    }
}

let cart = []
class Storage {
    /* RETRIEVE RETRIEVE ALL ITEMS TOTAL PRODUCTS */
    static getAllProducts() {
        return JSON.parse(localStorage.getItem("StoreItems"));
    }

    /*

     SAVE ITEMS TO CART

    */
    static saveSelectedItemsToCart(cart) {
        localStorage.Cart = JSON.stringify(cart);
        localStorage.setItem("Cart", localStorage.Cart);
    }

    /*

    RETRIEVE ALL ITEMS FROM CART

    */
    static getItemsInCart() {
        return JSON.parse(localStorage.getItem("Cart"));
    }

    /*

     GET THE NUMBER OF ITEMS IN CART

     */
    static numberOfItemsInCart() {
        if (Storage.getItemsInCart() === null || undefined) {
            return "0"
        } else {
            let mapCart = Storage.getItemsInCart().map(cI => cI.amount)
            let reduceCart = mapCart.reduce((x, y) => x + y, 0)
            return reduceCart;
        }
    }

    /*

    UPDATE CART

    */
    static updateCart(cartName) {
        Storage.saveSelectedItemsToCart(cartName);
        cartDom.innerText = Storage.numberOfItemsInCart();
    }

    /*

    GET AND SAVE PICKED ITEM TO CART

    */
    static getItemAndSaveToCart() {
        let getbackcart = JSON.parse(localStorage.getItem("Cart"));

        if (cart === null || cart.length === 0) {
            cart = [pickedItem];
            Storage.updateCart(cart)
        }

        if (cart !== null || cart.length !== 0) {
            let pickedItemID = Item.id;
            let check = getbackcart.find(item => item.id === pickedItemID)

            if (check) {
                check.amount += 1;
                Storage.updateCart(getbackcart)
            }

            if (!check) {
                getbackcart = [...getbackcart, pickedItem]
                Storage.updateCart(getbackcart)
            }
        };
    }
}
Products.selectedForYou();


let cartDom = document.getElementById("items-in-cart");
try {
    cartDom.innerText = Storage.numberOfItemsInCart();
} catch (error) {} // Displays number of Items in Cart

let pickedItem;
let ItemsInCart = JSON.parse(localStorage.getItem("Cart"));
const addToCart = () => {
    let pickItemFromStore = Item
    // popupNotification(pickItemFromStore.itemInfo.name)
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




/* SEARCH PRODUCT */
const sendQueryGO = (event) => {
    let query = search.value.toLowerCase();
    let url = `gemshop.html?q=${encodeURIComponent(query)}`
    window.location.href = url;
};

try {
    GO.addEventListener("click", (event) => {
        if (search.value !== "") {
            sendQueryGO()
        }
    })
} catch (error) {}


search.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && search.value !== "") {
        sendQueryGO()
    }
})