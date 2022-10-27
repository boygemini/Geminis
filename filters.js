"use strict"


//FILTERS

let pp = []
let newPP = []
let brandArray = ["Apple", "Samsung", "Itel", "Infinix", "LG"];
let ba = []
let sortedprice = []
let myBox = []

class filter {
    static price(event, low, high) {

        // EVENT TRIGGERED WHEN A BOX IS CHECKED
        if (event.target.checked === true) {

            let allItemsInCategory = productRoute.cellphones;
            let box = [],
                checkboxes = [...document.querySelectorAll(".pricecheck")];


            // Monnitor the number of boxes checked
            for (let i in checkboxes) {
                if (checkboxes[i].checked === true) {
                    box.push(checkboxes[i])
                }
            }


            let clickedBox = {
                "high": high,
                "low": low
            }
            myBox.push(clickedBox)

            let newSet = new Set();
            myBox = myBox.filter(item => {
                if (!newSet.has(item.high)) {
                    newSet.add(item.high)
                    return true
                }
            })






            // If more than one brand is already selected
            if (ba.length > 0) {
                let getpriceditems = allItemsInCategory.filter(gp => gp.itemInfo.newItemPrice >= low && gp.itemInfo.newItemPrice <= high);
                for (let i in ba) {
                    for (let k in getpriceditems) {
                        if (ba[i] === getpriceditems[k].itemInfo.brand) {
                            newPP.push(getpriceditems[k])
                        }
                    }
                }
                newPP = [...new Set(newPP)]
                return newPP
            }


            // If only one brand is already selected
            if (ba.length === 0) {

                // If there are more than one price boxes checked
                if (box.length > 1) {
                    for (let i in allItemsInCategory) {
                        if (Number(allItemsInCategory[i].itemInfo.newItemPrice) >= low && Number(allItemsInCategory[i].itemInfo.newItemPrice) <= high) {
                            pp.push(allItemsInCategory[i])
                        };
                    }
                    return pp
                }

                // If no price boxes checked
                if (box.length === 1 && pp.length === 0) {
                    pp = []
                    for (let i in allItemsInCategory) {
                        if (Number(allItemsInCategory[i].itemInfo.newItemPrice) >= low && Number(allItemsInCategory[i].itemInfo.newItemPrice) <= high) {
                            pp.push(allItemsInCategory[i])
                        };
                    }
                    return pp
                }

                // If no price boxes checked but min-max was set
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
            let checkboxes = [...document.querySelectorAll(".pricecheck")]
            let box = []


            for (let i in checkboxes) {
                if (checkboxes[i].checked === false) {
                    box.push(checkboxes[i])
                }
            }

            // If all price boxes are unchecked and no brand boxes is checked
            if (box.length === 3 && ba.length === 0) {
                pp = productRoute.cellphones;
                return pp;
            }

            // If all price boxes are unchecked while brand boxes are jus being checked
            if (box.length === 3 && ba.length > 0) {
                let getthemfirst = []
                for (let a in allItemsInCategory) {
                    for (let c in ba) {
                        if (allItemsInCategory[a].itemInfo.brand === ba[c]) {
                            getthemfirst.push(allItemsInCategory[a])
                        }
                    }
                }
                getthemfirst = [...new Set(getthemfirst)]
                pp = getthemfirst
                return pp
            }

            // HERE NOW......
            if (box.length < 3 && ba.length > 0) {
                let restFilter = pp.filter(rest => Number(rest.itemInfo.newItemPrice) >= low && Number(rest.itemInfo.newItemPrice) <= high)
                pp = pp.filter(item => !restFilter.includes(item))
                let tp = []
                for (let i in pp) {
                    for (let k in ba) {
                        if (pp[i].itemInfo.brand === ba[k]) {
                            tp.push(pp[i])
                        }
                    }
                }
                console.log(pp);
                pp = tp
                return pp
            }


            if (box.length < 3 && ba.length === 0) {
                let restFilter = pp.filter(rest => Number(rest.itemInfo.newItemPrice) >= low && Number(rest.itemInfo.newItemPrice) <= high)
                pp = pp.filter(item => !restFilter.includes(item))
                console.log(pp)
                return pp
            }


            // let restFilter = pp.filter(rest => Number(rest.itemInfo.newItemPrice) >= low && Number(rest.itemInfo.newItemPrice) <= high)
            // pp = pp.filter(item => !restFilter.includes(item))
            // return pp
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
        let pricebox = []

        let pboxes = [...document.querySelectorAll(".pricecheck")]
        for (let i in pboxes) {
            if (pboxes[i].checked === true) {
                pricebox.push(pboxes[i])
            }
        }

        if (event.target.checked === true) {

            // Monitor the number of brand boxes selected
            for (let i in brandArray) {
                if (brandArray[i] === brand) {
                    ba.push(brandArray[i])
                    ba = [...new Set(ba)]
                }
            }

            // If No price box or brand has been selected
            if (pp.length === 0) {
                for (let i in allItemsInCategory) {
                    if (allItemsInCategory[i].itemInfo.brand === brand) {
                        pp.push(allItemsInCategory[i])
                    }
                }
                return pp
            }

            // If only brand boxes have been selected
            if (pp.length > 0 & pricebox.length === 0) {
                for (let i in allItemsInCategory) {
                    if (allItemsInCategory[i].itemInfo.brand === brand) {
                        pp.push(allItemsInCategory[i])
                    }
                }
                pp = [...new Set(pp)]
                return pp
            }

            // If More than one price boxes are already selcted
            if (pp.length > 0 && pricebox.length <= 1) {
                if (newPP.length === 0) {
                    for (let i in pp) {
                        if (pp[i].itemInfo.brand === brand) {
                            newPP.push(pp[i])
                        }
                    }
                    return newPP;
                }

                if (newPP.length > 0) {
                    for (let i in pp) {
                        if (pp[i].itemInfo.brand === brand) {
                            newPP.push(pp[i])
                        }
                    }
                    newPP = [...new Set(newPP)]
                    return newPP;
                }
            }

            // If More than one price boxes are already selcted and brand are selected after
            if (pp.length > 0 && pricebox.length > 1) {
                let minPrice = myBox[0].low,
                    maxPrice = myBox[myBox.length - 1].high;

                let getP = allItemsInCategory.filter(item => Number(item.itemInfo.newItemPrice) >= minPrice && Number(item.itemInfo.newItemPrice) <= maxPrice);
                let gp = []

                for (let k in getP) {
                    for (let m in ba) {
                        if (getP[k].itemInfo.brand === ba[m]) {
                            gp.push(getP[k])
                        }
                    }
                }
                newPP = gp
                return newPP
            }

            // if (pp.length > 0 && newPP.length === 0) {
            //     for (let i in pp) {
            //         if (pp[i].itemInfo.brand === brand) {
            //             newPP.push(pp[i])
            //         }
            //     }
            //     return newPP
            // }

            // if (newPP.length > 0) {
            //     let mp = newPP.filter(item => item.itemInfo.brand === brand);

            //     if (mp.length === 0) {
            //         console.log("There are no such branches");
            //         for (let j in pp) {
            //             if (pp[j].itemInfo.brand === brand) {
            //                 newPP.push(pp[j]);
            //             }
            //         }
            //         return newPP;
            //     }

            //     if (mp.length > 0) {
            //         return mp
            //     }
            // }
        }

        // if (event.target.checked === false) {
        //     let box = []

        //     let checkboxes = [...document.querySelectorAll(".brandcheck")]
        //     for (let i in checkboxes) {
        //         if (checkboxes[i].checked === false) {
        //             box.push(checkboxes[i])
        //         }
        //     }

        //     ba = ba.filter(b => b !== brand)

        //     if (pp.length > 0 && box.length < checkboxes.length) {
        //         pp = pp.filter(p => p.itemInfo.brand !== brand)
        //         return pp
        //     }

        //     if (box.length === checkboxes.length) {
        //         return pp
        //     }
        // }
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