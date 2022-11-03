"use strict"



//FILTERS


let Parameters;
let currentFilterUrl = document.URL,
    priceFromUrl, brandFromUrl, filterFromUrl, ramFromUrl, romFromUrl, memoryFromUrl, screenFromUrl, sizeFromUrl, newUrlParamters;


// PREPARING PARAMETERS FROM THE URL IF IT IS A COMPLETELY NEW SEARCH FROM A NEW BROWSER
if (currentFilterUrl.split("?category").length > 1 && localStorage.getItem("Parameters") === null) {
    let urlParameters = currentFilterUrl.split("?category").toString().split("&").filter(arr => !arr.includes("gemshop.html"));
    newUrlParamters = new Array()
    for (let i in urlParameters) {
        let sp = urlParameters[i].split("=")
        newUrlParamters[sp[0]] = sp[1]
    }
}


// SETTING PARAMETERS IF NO PRIOR PARAMETERS HAS BEEN SAVED
if (localStorage.getItem("Parameters") === null) {
    console.log("Yes, its null : You can now set it.");
    try {
        newUrlParamters.Price = newUrlParamters.Price.replace(/%20/g, "").split("-")
        priceFromUrl = [{
            high: newUrlParamters.Price[1],
            low: newUrlParamters.Price[0]
        }]
        brandFromUrl = newUrlParamters.Brand.split(",")
        filterFromUrl = newUrlParamters.Filters.split(",")
        ramFromUrl = newUrlParamters.Ram.split(",")
        romFromUrl = newUrlParamters.Rom.split(",")
        memoryFromUrl = newUrlParamters.Memory.split(",")
        screenFromUrl = newUrlParamters.Screen.split(",")
        sizeFromUrl = newUrlParamters.Size.split(",")
    } catch (error) {}

    Parameters = {
        Price: priceFromUrl || [],
        Range: priceFromUrl || [],
        Brand: brandFromUrl || [],
        Memory: memoryFromUrl || [],
        Ram: ramFromUrl || [],
        Rom: romFromUrl || [],
        Screen: screenFromUrl || [],
        Size: sizeFromUrl || [],
        Filters: filterFromUrl || []
    }
    let stringifyParameters = JSON.stringify(Parameters)
    localStorage.setItem("Parameters", stringifyParameters)
}


// SETTING PARAMETERS IF THE WAS A PREVIOUSLY SAVED ONE
if (localStorage.getItem("Parameters") !== null) {
    console.log("No, it is not null : Now update it");
    let parseParameters = JSON.parse(localStorage.getItem("Parameters"))
    Parameters = parseParameters;
}


// KEEP RECORD OF THE CHECKED FILTER BOXES
const registerBox = (boxChosen) => {
    Parameters.Filters.push(boxChosen)
    Parameters.Filters = [...new Set(Parameters.Filters)]
}


// DISPLAY CHECKED BOXES
const returnCheckedBoxes = () => {
    let currentUrl = document.URL;
    try {
        let getBoxesCheck = currentUrl.split("Filters=")[1].split(",")
        getBoxesCheck.forEach(box => document.getElementById(box).checked = true);
    } catch (error) {}
}
returnCheckedBoxes()


// DISPLAY UNCHECKED BOXESS
const returnUncheckedBoxes = (targetBox) => {
    let currentUrl = document.URL;
    let getBoxesCheck = currentUrl.split("Filters=")[1].split(",")
    getBoxesCheck = getBoxesCheck.filter(box => box !== targetBox)
    Parameters.Filters = getBoxesCheck
    console.log(Parameters.Filters);
}



// CREATING THE FILTER URL
const createUrl = (category) => {
    let price = "",
        Range = "",
        brand = "",
        memory = "",
        ram = "",
        rom = "",
        screen = "",
        size = "";
    let currentUrl = "gemshop.html";
    let url = `${currentUrl}?category=${category}`


    if (Parameters.Price.length > 0) {
        let getMins = Parameters.Price.map(min => min.low).sort((a, b) => a - b);
        let getMaxs = Parameters.Price.map(max => max.high).sort((a, b) => b - a);
        let maximumPrice = getMaxs[0]
        let minimumPrice = getMins[0]
        price = `${minimumPrice} - ${maximumPrice}`
        url += `&Price=${price}`
    }

    if (Parameters.Range.length > 0) {
        let maxiPrice = Parameters.Range[0].high
        let miniPrice = Parameters.Range[0].low
        Range = `${miniPrice} - ${maxiPrice}`
        url += `&Price=${Range}`
    }

    if (Parameters.Brand.length > 0) {
        brand = Parameters.Brand.toString()
        url += `&Brand=${brand}`
    }

    if (Parameters.Memory.length > 0) {
        let max = Parameters.Memory[Parameters.Memory.length - 1]
        let min = Parameters.Memory[0]
        memory = `${min} - ${max}`
        url += `&Memory=${memory}`
    }

    if (Parameters.Ram.length > 0) {
        let max = Parameters.Ram[Parameters.Ram.length - 1]
        let min = Parameters.Ram[0]
        ram = `${min} - ${max}`
        url += `&Ram=${ram}`
    }

    if (Parameters.Rom.length > 0) {
        let max = Parameters.Rom[Parameters.Rom.length - 1]
        let min = Parameters.Rom[0]
        rom = `${min} - ${max}`
        url += `&Rom=${rom}`
    }

    if (Parameters.Screen.length > 0) {
        let max = Parameters.Screen[Parameters.Screen.length - 1]
        let min = Parameters.Screen[0]
        screen = `${min} - ${max}`
        url += `&Screen=${screen}`
    }

    if (Parameters.Size.length > 0) {
        let max = Parameters.Size[Parameters.Size.length - 1]
        let min = Parameters.Size[0]
        size = `${min} - ${max}`
        url += `&Size=${size}`
    }

    if (Parameters.Filters.length > 0) {
        url += `&Filters=${Parameters.Filters.toString()}`
    }

    let stringifyNewParameters = JSON.stringify(Parameters)
    localStorage.setItem("Parameters", stringifyNewParameters)
    localStorage.setItem("Url", url)

    window.location = url;
}


// FILTER CLASS
class filter {

    // EVENT TRIGGERED IF PRICE WAS SET
    static price(event, category, low, high) {
        // EVENT TRIGGERED WHEN A BOX IS CHECKED
        if (event.target.checked === true) {
            let chosenPrice = {
                high: high,
                low: low
            }

            Parameters.Price.push(chosenPrice)

            let newPriceSet = new Set()
            Parameters.Price = Parameters.Price.filter(pr => {
                if (!newPriceSet.has(pr.high)) {
                    newPriceSet.add(pr.high);
                    return true
                }
            })
            Parameters.Range = {}
            registerBox(event.target.id)
            createUrl(category)
        }

        // EVENT TRIGGERED WHEN A BOX IS UN-CHECKED
        if (event.target.checked === false) {
            returnUncheckedBoxes(event.target.id)
            createUrl(category)
        }
    }

    // EVENT TRIGGERED IF RANGE WAS SET
    static priceMinMax(event, category, low, high) {

        // EVENT TRIGGERED WHEN A MIN-MAX IS SET
        if (high < low) {
            alert("Please check your input")
        } else {
            Parameters.Range = [{
                high: high,
                low: low
            }]
            Parameters.Price = []
            registerBox(event.target.id)
            createUrl(category)
        }
    }

    // EVENT TRIGGERED IF BRAND WAS SET
    static brand(event, category, brand) {

        if (event.target.checked === true) {
            Parameters.Brand.push(brand)
            Parameters.Brand = [...new Set(Parameters.Brand)]
            registerBox(event.target.id)
            createUrl(category)
        }

        if (event.target.checked === false) {
            returnUncheckedBoxes(event.target.id)
            createUrl(category)
        }
    }

    // EVENT TRIGGERED IF MEMORY WAS SET
    static memory(event, category, space) {
        if (event.target.checked === true) {
            Parameters.Memory.push(space)
            Parameters.Memory = [...new Set(Parameters.Memory)]
            registerBox(event.target.id)
            createUrl(category)
        }
        if (event.target.checked === false) {
            returnUncheckedBoxes(event.target.id)
            createUrl(category)
        }
    }

    // EVENT TRIGGERED IS RAM WAS SET
    static ram(event, category, space) {
        Parameters.Ram.push(space)
        Parameters.Ram = [...new Set(Parameters.Ram)]
        registerBox(event.target.id)
        createUrl(category)
    }

    // EVENT TRIGGERED IF ROM WAS SET
    static rom(event, category, space) {
        Parameters.Rom.push(space)
        Parameters.Rom = [...new Set(Parameters.Rom)]
        registerBox(event.target.id)
        createUrl(category)
    }

    // EVENT TRIGGERED IS SCREEN WAS SET
    static screen(event, category, screen) {
        Parameters.Screen.push(screen)
        Parameters.Screen = [...new Set(Parameters.Screen)]
        registerBox(event.target.id)
        createUrl(category)
    }

    // EVENT TRIGGERED IF SIZE WAS SET
    static size(event, category, size) {
        Parameters.Size.push(size)
        Parameters.Size = [...new Set(Parameters.Size)]
        registerBox(event.target.id)
        createUrl(category)
    }
}






// DISPLAY FILTERED RESULTS
const displayFilteredResults = (directory) => {
    let x = ""
    for (let k in directory) {
        x += `<div class="item-box" data-id=${directory[k].id} onclick = "viewProduct(event)">
            <img src=${directory[k].itemInfo.itemImg} alt="">
            <div class="item-details">
                <h1>${directory[k].itemInfo.name}</h1>
                <h2>${directory[k].itemInfo.description1} ${directory[k].itemInfo.memory}GB</h2>
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
    showBox.innerHTML = `<h1 class="cat-head">Filtered Results</h1>` + x
}