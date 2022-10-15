"use strict"

//FILTERS

let pp = []
let newPP = []
let brandArray = ["Apple", "Samsung", "Itel"];
let ba = []
class filter {
    static price(event, low, high) {

        // EVENT TRIGGERED WHEN A BOX IS CHECKED
        if (event.target.checked === true) {
            let allItemsInCategory = productRoute.cellphones;
            let box = [],
                checkboxes = [...document.querySelectorAll(".pricecheck")];

            // if (ba.length > 0 && newPP.length === 0) {
            //     for (let i in ba) {
            //         for (let k in allItemsInCategory) {
            //             if (allItemsInCategory[k].itemInfo.brand === ba[i] && (Number(allItemsInCategory[k].itemInfo.newItemPrice) >= low && Number(allItemsInCategory[k].itemInfo.newItemPrice) <= high)) {
            //                 newPP.push(allItemsInCategory[k])
            //             }
            //         }
            //     }
            //     console.log(newPP);
            //     return (newPP);
            // }

            // if (ba.length > 0 && newPP.length > 0) {
            //     let tt = [];
            //     for (let i in ba) {
            //         for (let k in allItemsInCategory) {
            //             if (allItemsInCategory[k].itemInfo.brand === ba[i] && (Number(allItemsInCategory[k].itemInfo.newItemPrice) >= low && Number(allItemsInCategory[k].itemInfo.newItemPrice) <= high)) {
            //                 tt.push(allItemsInCategory[k])
            //             }
            //         }
            //     }
            //     newPP = tt
            //     console.log(newPP);
            //     return (newPP);
            // }

            if (ba.length === 0) {
                // Monnitor the number of boxes checked
                for (let i in checkboxes) {
                    if (checkboxes[i].checked === true) {
                        box.push(checkboxes[i])
                    }
                }

                // If there are more than one boxes checked
                if (box.length > 1) {
                    for (let i in allItemsInCategory) {
                        if (Number(allItemsInCategory[i].itemInfo.newItemPrice) >= low && Number(allItemsInCategory[i].itemInfo.newItemPrice) <= high) {
                            pp.push(allItemsInCategory[i])
                        };
                    }
                    return pp
                }

                // If no boxes checked
                if (box.length === 1 && pp.length === 0) {
                    pp = []
                    for (let i in allItemsInCategory) {
                        if (Number(allItemsInCategory[i].itemInfo.newItemPrice) >= low && Number(allItemsInCategory[i].itemInfo.newItemPrice) <= high) {
                            pp.push(allItemsInCategory[i])
                        };
                    }
                    return pp
                }

                // If no boxes checked but min-max was set
                if (box.length === 1 && pp.length > 0) {
                    let pp = []
                    for (let i in allItemsInCategory) {
                        if (Number(allItemsInCategory[i].itemInfo.newItemPrice) >= low && Number(allItemsInCategory[i].itemInfo.newItemPrice) <= high) {
                            pp.push(allItemsInCategory[i])
                        };
                    }
                    return pp
                }
            }
        }

        // EVENT TRIGGERED WHEN A BOX IS UN-CHECKED
        if (event.target.checked === false) {
            let allItemsInCategory = productRoute.cellphones;
            let box = []

            let checkboxes = [...document.querySelectorAll(".pricecheck")]
            for (let i in checkboxes) {
                if (checkboxes[i].checked === false) {
                    box.push(checkboxes[i])
                    if (box.length === 3) {
                        pp = productRoute.cellphones;
                        return pp;
                    }
                }
            }

            let restFilter = pp.filter(rest => Number(rest.itemInfo.newItemPrice) >= low && Number(rest.itemInfo.newItemPrice) <= high)
            pp = pp.filter(item => !restFilter.includes(item))
            return pp
        }
    }


    static priceMinMax(low, high) {

        // EVENT TRIGGERED WHEN A MIN-MAX IS SET
        let allItemsInCategory = productRoute.cellphones;
        let checkboxes = [...document.querySelectorAll(".pricecheck")]
        for (let i in checkboxes) {
            if (checkboxes[i].checked === true) {
                checkboxes[i].checked = false;
            }
        }
        pp = [];
        for (let i in allItemsInCategory) {
            if (Number(allItemsInCategory[i].itemInfo.newItemPrice) >= low && Number(allItemsInCategory[i].itemInfo.newItemPrice) <= high) {
                pp.push(allItemsInCategory[i])
            };
        }
        return pp
    }


    static brand(event, brand) {
        let allItemsInCategory = productRoute.cellphones;

        if (event.target.checked === true) {
            for (let i in brandArray) {
                if (brandArray[i] === brand) {
                    ba.push(brandArray[i])
                    ba = [...new Set(ba)]
                    console.log(ba);
                }
            }

            if (pp.length === 0) {
                for (let i in allItemsInCategory) {
                    if (allItemsInCategory[i].itemInfo.brand === brand) {
                        pp.push(allItemsInCategory[i])
                    }
                }
                return pp
            }

            if (pp.length > 0 && newPP.length === 0) {
                for (let i in pp) {
                    if (pp[i].itemInfo.brand === brand) {
                        newPP.push(pp[i])
                    }
                }
                return newPP
            }

            if (newPP.length > 0) {
                let mp = newPP.filter(item => item.itemInfo.brand === brand);

                if (mp.length === 0) {
                    console.log("There are no such branches");
                    for (let j in pp) {
                        if (pp[j].itemInfo.brand === brand) {
                            newPP.push(pp[j]);
                        }
                    }
                    return newPP;
                }

                if (mp.length > 0) {
                    return mp
                }
            }
        }

        if (event.target.checked === false) {
            let box = []

            let checkboxes = [...document.querySelectorAll(".brandcheck")]
            for (let i in checkboxes) {
                if (checkboxes[i].checked === false) {
                    box.push(checkboxes[i])
                }
            }

            let nba = ba.filter(b => b !== brand)
            ba = nba;
            console.log(ba);

            if (newPP.length > 0 && box.length < checkboxes.length) {
                let mm = []
                for (let i in newPP) {
                    if (newPP[i].itemInfo.brand !== brand) {
                        mm.push(newPP[i])
                    }
                }
                newPP = mm;
                return newPP
            }

            if (box.length === checkboxes.length) {
                newPP = [];
                return pp
            }
        }
    }


    static memory() {

    }


    static ram() {

    }


    static rom() {

    }


    static screen() {

    }


    static size() {

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
    showBox.innerHTML = `<h1 class="cat-head">Filtered Results</h1>` + x
}