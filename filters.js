"use strict"



//FILTERS


let Parameters;
let currentFilterUrl = document.URL,
    priceFromUrl, brandFromUrl, filterFromUrl, radioFromUrl, ramFromUrl, romFromUrl, memoryFromUrl, screenFromUrl, sizeFromUrl, newUrlParameters;


// PREPARING PARAMETERS FROM THE URL IF IT IS A COMPLETELY NEW SEARCH FROM A NEW BROWSER
if (currentFilterUrl.split("?category").length > 1 && localStorage.getItem("Parameters") === null) {
    let urlParameters = currentFilterUrl.split("?category").toString().split("&").filter(arr => !arr.includes("gemshop.html"));
    newUrlParameters = new Array()
    for (let i in urlParameters) {
        let sp = urlParameters[i].split("=")
        newUrlParameters[sp[0]] = sp[1]
    }
}


if (currentFilterUrl.split("?category").length === 1 && localStorage.getItem("Parameters")) {
    localStorage.removeItem("Parameters")
}


// PARRAMTERS FROM THE URL
try {
    newUrlParameters.Price = newUrlParameters.Price.replace(/%20/g, "").split("-")
    priceFromUrl = [{
        high: newUrlParameters.Price[1],
        low: newUrlParameters.Price[0]
    }]
    brandFromUrl = newUrlParameters.Brand.split(",")
    filterFromUrl = newUrlParameters.Filters.split(",")
    radioFromUrl = newUrlParameters.Radio.split(",")
    ramFromUrl = newUrlParameters.Ram.split(",")
    romFromUrl = newUrlParameters.Rom.split(",")
    memoryFromUrl = newUrlParameters.Memory.split(",")
    screenFromUrl = newUrlParameters.Screen.split(",")
    sizeFromUrl = newUrlParameters.Size.split(",")
} catch (error) {}
console.log(memoryFromUrl);

// SETTING PARAMETERS IF NO PRIOR PARAMETERS HAS BEEN SAVED
if (localStorage.getItem("Parameters") === null) {
    console.log("Yes, its null : You can now set it.");

    Parameters = {
        Price: priceFromUrl || [],
        Range: priceFromUrl || [],
        Brand: brandFromUrl || [],
        Memory: memoryFromUrl || [],
        Ram: ramFromUrl || [],
        Rom: romFromUrl || [],
        Screen: screenFromUrl || [],
        Size: sizeFromUrl || [],
        Filters: filterFromUrl || [],
        Radio: radioFromUrl || []
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

const registerRadio = (boxChosen) => {
    Parameters.Radio = boxChosen
}


// DISPLAY CHECKED BOXES
const returnCheckedBoxes = () => {
    let currentUrl = document.URL;
    try {
        let getBoxesCheck = currentUrl.split("Filters=")[1].split("&")[0].split(",")
        getBoxesCheck.forEach(box => document.getElementById(box).checked = true);
    } catch (error) {}

    try {
        let getBoxesCheck2 = currentUrl.split("Radio=")[1]
        console.log(getBoxesCheck2);
        document.getElementById(getBoxesCheck2).checked = true
    } catch (error) {

    }
}
returnCheckedBoxes()


// DISPLAY UNCHECKED BOXESS
const returnUncheckedBoxes = (targetBox) => {
    let currentUrl = document.URL;
    try {
        let getBoxesCheck = currentUrl.split("Filters=")[1].split("&")[0].split(",")
        getBoxesCheck = getBoxesCheck.filter(box => box !== targetBox)
        Parameters.Filters = getBoxesCheck
    } catch (error) {

    }

}


try {
    max.value = Parameters.Range[0].high
    min.value = Parameters.Range[0].low
} catch (error) {

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
        size = "",
        radio = "";
    let currentUrl = "gemshop.html";
    let url = `${currentUrl}?category=${category}`


    if (Parameters.Price.length > 0) {
        // let getMins = Parameters.Price.map(min => min.low).sort((a, b) => a - b);
        // let getMaxs = Parameters.Price.map(max => max.high).sort((a, b) => b - a);
        let maximumPrice = Parameters.Price[0].high
        let minimumPrice = Parameters.Price[0].low
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
        memory = Parameters.Memory.toString()
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

    if (Parameters.Radio.length > 0) {
        url += `&Radio=${Parameters.Radio.toString()}`
    }

    let stringifyNewParameters = JSON.stringify(Parameters)
    localStorage.setItem("Parameters", stringifyNewParameters)
    localStorage.setItem("Url", url)

    console.log(url);
    window.location = url;
}


// FILTER CLASS

class filter {

    // EVENT TRIGGERED IF PRICE WAS SET
    static price(event, category, low, high) {

        // EVENT TRIGGERED WHEN A BOX IS CHECKED
        if (event.target.checked === true) {
            let chosenPrice = [{
                high: high,
                low: low
            }]

            Parameters.Price = chosenPrice

            Parameters.Range = {}
            registerRadio(event.target.id)
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
            Parameters.Radio = []
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
            Parameters.Brand = Parameters.Brand.filter(bb => bb !== brand)
            localStorage.setItem("Parameters", Parameters)
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
            Parameters.Memory = Parameters.Memory.filter(m => m !== space)
            localStorage.setItem("Parameters", Parameters)
            returnUncheckedBoxes(event.target.id)
            createUrl(category)
        }
    }

    // EVENT TRIGGERED IS RAM WAS SET
    static ram(event, category, space) {
        if (event.target.checked === true) {
            Parameters.Ram.push(space)
            Parameters.Ram = [...new Set(Parameters.Ram)]
            registerBox(event.target.id)
            createUrl(category)
        }
        if (event.target.checked === false) {
            Parameters.Ram = Parameters.Ram.filter(rr => rr !== space)
            localStorage.setItem("Parameters", Parameters)
            returnUncheckedBoxes(event.target.id)
            createUrl(category)
        }
    }

    // EVENT TRIGGERED IF ROM WAS SET
    static rom(event, category, space) {
        if (event.target.checked == true) {
            Parameters.Rom.push(space)
            Parameters.Rom = [...new Set(Parameters.Rom)]
            registerBox(event.target.id)
            createUrl(category)
        }
        if (event.target.checked === false) {
            Parameters.Rom = Parameters.Rom.filter(ro => ro !== space)
            localStorage.setItem("Parameters", Parameters)
            returnUncheckedBoxes(event.target.id)
            createUrl(category)
        }
    }

    // EVENT TRIGGERED IS SCREEN WAS SET
    static screen(event, category, screen) {
        if (event.target.checked == true) {
            Parameters.Screen.push(screen)
            Parameters.Screen = [...new Set(Parameters.Screen)]
            registerBox(event.target.id)
            createUrl(category)
        }
        if (event.target.checked === false) {
            Parameters.Screen = Parameters.Screen.filter(sc => sc !== screen)
            localStorage.setItem("Parameters", Parameters)
            returnUncheckedBoxes(event.target.id)
            createUrl(category)
        }
    }

    // EVENT TRIGGERED IF SIZE WAS SET
    static size(event, category, size) {
        if (event.target.checked == true) {
            Parameters.Size.push(size)
            Parameters.Size = [...new Set(Parameters.Size)]
            registerBox(event.target.id)
            createUrl(category)
        }
        if (event.target.checked === false) {
            Parameters.Size = Parameters.Size.filter(sz => sz !== size)
            localStorage.setItem("Parameters", Parameters)
            returnUncheckedBoxes(event.target.id)
            createUrl(category)
        }
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