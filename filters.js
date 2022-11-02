"use strict"


//FILTERS

let pp = []
let newPP = []
let brandArray = ["Apple", "Samsung", "Itel", "Infinix", "LG"];
let ba = []
let sortedprice = []
let myBox = []
let mem = []
let memB = []
let items = []

const filterMemory = (pp) => {
    let n = []
    for (let i in pp) {
        for (let k in mem) {
            if (pp[i].itemInfo.memory === mem[k]) {
                n.push(pp[i])
            }
        }
    }
    pp = n;
    return pp
}

const disMem = () => {
    console.log(myBox.length);
    let memoryBoxes = [...document.querySelectorAll(".memorycheck")]
    if (myBox.length === 0) {
        memoryBoxes.filter(box => {
            box.disabled = true
        })
    }

    if (myBox.length > 0) {
        memoryBoxes.filter(box => {
            box.disabled = false
        })
    }

    if (ba.length > 0) {
        memoryBoxes.filter(box => {
            box.disabled = false
        })
    }
}

class filter {
    static price(event, low, high) {

        // EVENT TRIGGERED WHEN A BOX IS CHECKED
        if (event.target.checked === true) {
            let allItemsInCategory = productRoute.cellphones;

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

            disMem()
            // If more than one brand is already selected
            if (ba.length > 0) {
                let getpriceditems = allItemsInCategory.filter(gp => Number(gp.itemInfo.newItemPrice) >= low && Number(gp.itemInfo.newItemPrice) <= high);
                if (pp.length > 0 && myBox.length === 3) {
                    let n = [];
                    for (let i in allItemsInCategory) {
                        for (let k in ba) {
                            if (allItemsInCategory[i].itemInfo.brand === ba[k]) {
                                n.push(allItemsInCategory[i])
                            }
                        }
                    }
                    pp = n;
                    if (mem.length > 0) {
                        return filterMemory(pp)
                    }
                    return pp
                }

                for (let i in ba) {
                    for (let k in getpriceditems) {
                        if (ba[i] === getpriceditems[k].itemInfo.brand) {
                            newPP.push(getpriceditems[k])
                        }
                    }
                }
                newPP = [...new Set(newPP)]
                if (mem.length > 0) {
                    return filterMemory(newPP)
                }
                return newPP
            }


            // If only one brand is already selected
            if (ba.length === 0) {

                // If there are more than one price boxes checked
                if (myBox.length > 1) {
                    for (let i in allItemsInCategory) {
                        if (Number(allItemsInCategory[i].itemInfo.newItemPrice) >= low && Number(allItemsInCategory[i].itemInfo.newItemPrice) <= high) {
                            pp.push(allItemsInCategory[i])
                        };
                    }
                    if (mem.length > 0) {
                        return filterMemory(pp)
                    }
                    return pp
                }

                // If no price boxes checked
                if (myBox.length === 1 && pp.length === 0) {
                    pp = []
                    for (let i in allItemsInCategory) {
                        if (Number(allItemsInCategory[i].itemInfo.newItemPrice) >= low && Number(allItemsInCategory[i].itemInfo.newItemPrice) <= high) {
                            pp.push(allItemsInCategory[i])
                        };
                    }
                    if (mem.length > 0) {
                        return filterMemory(pp)
                    }
                    return pp
                }

                // If no price boxes checked but min-max was set
                if (myBox.length === 1 && pp.length > 0) {
                    let pp = []
                    for (let i in allItemsInCategory) {
                        if (Number(allItemsInCategory[i].itemInfo.newItemPrice) >= low && Number(allItemsInCategory[i].itemInfo.newItemPrice) <= high) {
                            pp.push(allItemsInCategory[i])
                        };
                    }
                    if (mem.length > 0) {
                        return filterMemory(pp)
                    }
                    return pp
                }
            }
        }

        // EVENT TRIGGERED WHEN A BOX IS UN-CHECKED
        if (event.target.checked === false) {
            let allItemsInCategory = productRoute.cellphones;
            myBox = myBox.filter(mb => mb.low !== low && mb.high !== high)
            console.log(myBox);
            disMem()
            // If all price boxes are unchecked and no brand boxes is checked
            if (myBox.length === 0 && ba.length === 0) {
                pp = productRoute.cellphones;
                if (mem.length > 0) {
                    return filterMemory(pp)
                }
                return pp
            }



            // If all price boxes are unchecked while brand boxes are jus being checked
            if (myBox.length === 3 && ba.length > 0) {
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
                if (mem.length > 0) {
                    return filterMemory(pp)
                }
                return pp
            }

            // HERE NOW......
            if (myBox.length < 3 && ba.length > 0) {
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
                pp = tp
                if (mem.length > 0) {
                    return filterMemory(pp)
                }
                return pp
            }


            if (myBox.length > 0 && ba.length === 0) {
                let restFilter = pp.filter(rest => Number(rest.itemInfo.newItemPrice) >= low && Number(rest.itemInfo.newItemPrice) <= high)
                pp = pp.filter(item => !restFilter.includes(item))
                if (mem.length > 0) {
                    return filterMemory(pp)
                }
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
            disMem()
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
                if (mem.length > 0) {
                    return filterMemory(pp)
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
                if (mem.length > 0) {
                    return filterMemory(pp)
                }
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
                    if (mem.length > 0) {
                        return filterMemory(newPP)
                    }
                    return newPP
                }

                if (newPP.length > 0) {
                    for (let i in pp) {
                        if (pp[i].itemInfo.brand === brand) {
                            newPP.push(pp[i])
                        }
                    }
                    newPP = [...new Set(newPP)]
                    if (mem.length > 0) {
                        return filterMemory(newPP)
                    }
                    return newPP
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
                if (mem.length > 0) {
                    return filterMemory(newPP)
                }
                return newPP
            }
        }

        if (event.target.checked === false) {
            let uncheckedBox = ba.filter(box => box !== brand)
            let checkboxes = [...document.querySelectorAll(".brandcheck")]


            if (uncheckedBox.length === 0 && myBox.length > 0 && myBox.length < 3) {
                let itemsInPrice = allItemsInCategory.filter(item => Number(item.itemInfo.newItemPrice) >= myBox[0].low && Number(item.itemInfo.newItemPrice) <= myBox[myBox.length - 1].high);
                pp = itemsInPrice;
                if (mem.length > 0) {
                    return filterMemory(pp)
                }
                return pp
            }


            // If more than one price boxes is checked and brand box is unchecked afresh
            if (myBox.length > 0 && myBox.length < 3 && ba.length > 0) {
                let itemsInPrice = allItemsInCategory.filter(item => Number(item.itemInfo.newItemPrice) >= myBox[0].low && Number(item.itemInfo.newItemPrice) <= myBox[myBox.length - 1].high);
                ba = ba.filter(b => b !== brand)
                let n = []
                for (let i in itemsInPrice) {
                    for (let k in ba) {
                        if (itemsInPrice[i].itemInfo.brand === ba[k]) {
                            n.push(itemsInPrice[i])
                        }
                    }
                }
                pp = n;

                if (mem.length > 0) {
                    return filterMemory(pp)
                }
                return pp
            }



            if (myBox.length === 3) {
                let n = []
                ba = ba.filter(b => b !== brand)
                for (let i in allItemsInCategory) {
                    for (let k in ba) {
                        if (allItemsInCategory[i].itemInfo.brand === ba[k]) {
                            n.push(allItemsInCategory[i])
                        }
                    }
                }
                pp = n;
                if (mem.length > 0) {
                    return filterMemory(pp)
                }
                return pp
            }

            // If a box is already checked but rest are unchecked
            if (pp.length > 0 && uncheckedBox.length < checkboxes.length) {
                pp = pp.filter(p => p.itemInfo.brand !== brand)
                if (mem.length > 0) {
                    return filterMemory(pp)
                }
                return pp
            }

            // If all boxes are unchecked
            if (box.length === checkboxes.length) {
                if (mem.length > 0) {
                    return filterMemory(pp)
                }
                return pp
            }
        }
    }


    static memory(event, space) {
        let allItemsInCategory = productRoute.cellphones;
        if (event.target.checked === true) {
            mem.push(space)
            let newSet = new Set()
            mem = mem.filter(mm => {
                if (!newSet.has(mm)) {
                    newSet.add(mm)
                    return true
                }
            })



            if (ba.length > 0) {
                let n = []
                let t = []
                for (let i in allItemsInCategory) {
                    for (let k in ba) {
                        if (allItemsInCategory[i].itemInfo.brand === ba[k]) {
                            n.push(allItemsInCategory[i])
                        }
                    }
                }
                for (let k in n) {
                    for (let y in mem) {
                        if (n[k].itemInfo.memory === mem[y]) {
                            t.push(n[k])
                        }
                    }
                }
                pp = t;
                return pp
            }


            if (myBox.length > 0) {
                let getpriceditems = allItemsInCategory.filter(gp => Number(gp.itemInfo.newItemPrice) >= myBox[0].low && Number(gp.itemInfo.newItemPrice) <= myBox[myBox.length - 1].high);
                let n = [];
                for (let i in getpriceditems) {
                    for (let k in mem) {
                        if (getpriceditems[i].itemInfo.memory === mem[k]) {
                            n.push(getpriceditems[i])
                        }
                    }
                }
                pp = n;
                return pp
            }
        }

        if (event.target.checked === false) {
            mem = mem.filter(box => box !== space)
            let n = []
            for (let i in pp) {
                for (let j in mem) {
                    if (pp[i].itemInfo.memory === mem[j]) {
                        n.push(pp[i])
                    }
                }
            }
            pp = n
            return pp
        }
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