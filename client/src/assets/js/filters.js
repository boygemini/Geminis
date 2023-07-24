"use strict";

//FILTERS

let Parameters;
let currentFilterUrl = document.URL,
	priceFromUrl,
	brandFromUrl,
	filterFromUrl,
	radioFromUrl,
	ramFromUrl,
	romFromUrl,
	memoryFromUrl,
	screenFromUrl,
	sizeFromUrl,
	pageFromUrl,
	orderFromUrl,
	searchQueryFromUrl,
	newUrlParameters;

// PREPARING PARAMETERS FROM THE URL IF IT IS A COMPLETELY NEW SEARCH FROM A NEW BROWSER
if (
	currentFilterUrl.split("?category").length > 1 &&
	localStorage.getItem("Parameters") === null
) {
	newUrlParameters = convertUrlParametersIntoObject(currentFilterUrl);
}

if (
	currentFilterUrl.split("?category").length === 1 &&
	localStorage.getItem("Parameters")
) {
	localStorage.removeItem("Parameters");
}

// PARAMETERS FROM THE URL INTO ARRAYS
try {
	newUrlParameters.Price = newUrlParameters.Price.replace(/%20/g, "").split(
		"-"
	);
	priceFromUrl = [
		{
			high: newUrlParameters.Price[1],
			low: newUrlParameters.Price[0],
		},
	];
	brandFromUrl = newUrlParameters.Brand.split(",");
	filterFromUrl = newUrlParameters.Filters.split(",");
	radioFromUrl = newUrlParameters.Radio.split(",");
	ramFromUrl = newUrlParameters.Ram.split(",");
	romFromUrl = newUrlParameters.Rom.split(",");
	memoryFromUrl = newUrlParameters.Memory.split(",");
	screenFromUrl = newUrlParameters.Screen.split(",");
	sizeFromUrl = newUrlParameters.Size.split(",");
	searchQueryFromUrl = newUrlParameters.SearchQuery;
	pageFromUrl = newUrlParameters.Page;
	orderFromUrl = newUrlParameters.Order;
} catch (error) {}

// SETTING PARAMETERS IF NO PRIOR PARAMETERS HAS BEEN SAVED
if (localStorage.getItem("Parameters") === null) {
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
		Radio: radioFromUrl || [],
		SearchQuery: "",
		Page: pageFromUrl || "0",
		Order: orderFromUrl || "Random",
	};
	let stringifyParameters = JSON.stringify(Parameters);
	localStorage.setItem("Parameters", stringifyParameters);
}

// SETTING PARAMETERS IF THE WAS A PREVIOUSLY SAVED ONE
if (localStorage.getItem("Parameters") !== null) {
	let parseParameters = JSON.parse(localStorage.getItem("Parameters"));
	Parameters = parseParameters;
}

// KEEP RECORD OF THE CHECKED FILTER BOXES
const registerBox = (boxChosen) => {
	Parameters.Filters.push(boxChosen);
	Parameters.Filters = [...new Set(Parameters.Filters)];
	Parameters.Page = "0";
};

const registerRadio = (boxChosen) => {
	Parameters.Radio = boxChosen;
};

// DISPLAY CHECKED BOXES
const returnCheckedBoxes = () => {
	let currentUrl = document.URL;
	try {
		let getBoxesCheck = currentUrl
			.split("Filters=")[1]
			.split("&")[0]
			.split(",");
		getBoxesCheck.forEach(
			(box) => (document.getElementById(box).checked = true)
		);
	} catch (error) {}

	try {
		let getBoxesCheck2 = currentUrl.split("Radio=")[1];
		document.getElementById(getBoxesCheck2).checked = true;
	} catch (error) {}
};
returnCheckedBoxes();

// DISPLAY UNCHECKED BOXESS
const returnUncheckedBoxes = (targetBox) => {
	let currentUrl = localStorage.getItem("Url");
	try {
		let getBoxesCheck = currentUrl
			.split("Filters=")[1]
			.split("&")[0]
			.split(",");
		getBoxesCheck = getBoxesCheck.filter((box) => box !== targetBox);
		Parameters.Filters = getBoxesCheck;
	} catch (error) {}
};

try {
	max.value = Parameters.Range[0].high;
	min.value = Parameters.Range[0].low;
} catch (error) {}

try {
	if (orderFromUrl === undefined) {
		Parameters.Order = document.URL.split("Order=")[1].split("&")[0];
	}
} catch (error) {}

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
		radio = "",
		searchQuery = "",
		page = "";
	let currentUrl = "shop.html";
	let url = `${currentUrl}?category=${category}&Order=${
		Parameters.Order
	}&Page=${Parameters.Page.toString()}`;

	if (Parameters.Price.length > 0) {
		let maximumPrice = Parameters.Price[0].high;
		let minimumPrice = Parameters.Price[0].low;
		price = `${minimumPrice} - ${maximumPrice}`;
		url += `&Price=${price}`;
	}

	if (Parameters.Range.length > 0) {
		let maxiPrice = Parameters.Range[0].high;
		let miniPrice = Parameters.Range[0].low;
		Range = `${miniPrice} - ${maxiPrice}`;
		url += `&Price=${Range}`;
	}

	if (Parameters.Brand.length > 0) {
		brand = Parameters.Brand.toString();
		url += `&Brand=${brand}`;
	}

	if (Parameters.Memory.length > 0) {
		memory = Parameters.Memory.toString();
		url += `&Memory=${memory}`;
	}

	if (Parameters.Ram.length > 0) {
		ram = Parameters.Ram.toString();
		url += `&Ram=${ram}`;
	}

	if (Parameters.Rom.length > 0) {
		rom = Parameters.Rom.toString();
		url += `&Rom=${rom}`;
	}

	if (Parameters.Screen.length > 0) {
		screen = Parameters.Screen.toString();
		url += `&Screen=${screen}`;
	}

	if (Parameters.Size.length > 0) {
		size = Parameters.Size.toString();
		url += `&Size=${size}`;
	}

	if (Parameters.SearchQuery.length > 0) {
		searchQuery = Parameters.SearchQuery;
		url += `&SearchQuery=${searchQuery}`;
	}

	if (Parameters.Filters.length > 0) {
		url += `&Filters=${Parameters.Filters.toString()}`;
	}

	if (Parameters.Radio.length > 0) {
		url += `&Radio=${Parameters.Radio.toString()}`;
	}

	let stringifyNewParameters = JSON.stringify(Parameters);
	localStorage.setItem("Parameters", stringifyNewParameters);
	localStorage.setItem("Url", url);
	if (document.lastChild.offsetWidth > 1200) {
		window.location = url;
	}
};

// FILTER CLASS
class filter {
	// EVENT TRIGGERED IF PRICE WAS SET
	static price(event, category, low, high) {
		// EVENT TRIGGERED WHEN A BOX IS CHECKED
		if (event.target.checked === true) {
			let chosenPrice = [
				{
					high: high,
					low: low,
				},
			];

			Parameters.Price = chosenPrice;
			Parameters.Range = {};
			registerRadio(event.target.id);
			createUrl(category);
		}
	}

	// EVENT TRIGGERED IF RANGE WAS SET
	static priceMinMax(event, category, low, high) {
		// EVENT TRIGGERED WHEN A MIN-MAX IS SET
		if (high < low) {
			alert("Please check your input");
		} else {
			Parameters.Range = [
				{
					high: high,
					low: low,
				},
			];
			Parameters.Price = [];
			Parameters.Radio = [];
			registerBox(event.target.id);
			createUrl(category);
		}
	}

	static priceMin(event, category, low, high) {
		if (low < 0 || low >= high) {
			alert("Please check your input");
		} else {
			Parameters.Range = [
				{
					low: low,
					high: high,
				},
			];
			Parameters.Price = [];
			Parameters.Radio = [];
			registerBox(event.target.id);
			createUrl(category);
		}
	}

	static priceMax(event, category, low, high) {
		if (high <= low || high <= 0)
			return alert(
				"Please check your input.\nMaximum Price has to be greater than Minimum Price"
			);
		Parameters.Range = [
			{
				low: low,
				high: high,
			},
		];
		Parameters.Price = [];
		Parameters.Radio = [];
		registerBox(event.target.id);
		createUrl(category);
	}

	// EVENT TRIGGERED IF BRAND WAS SET
	static brand(event, category, brand) {
		if (event.target.checked === true) {
			Parameters.Brand.push(brand);
			Parameters.Brand = [...new Set(Parameters.Brand)];
			registerBox(event.target.id);
			createUrl(category);
		}

		if (event.target.checked === false) {
			Parameters.Brand = Parameters.Brand.filter((bb) => bb !== brand);
			localStorage.setItem("Parameters", Parameters);
			returnUncheckedBoxes(event.target.id);
			createUrl(category);
		}
	}

	// EVENT TRIGGERED IF MEMORY WAS SET
	static memory(event, category, space) {
		if (event.target.checked === true) {
			Parameters.Memory.push(space);
			Parameters.Memory = [...new Set(Parameters.Memory)];
			registerBox(event.target.id);
			createUrl(category);
		}
		if (event.target.checked === false) {
			Parameters.Memory = Parameters.Memory.filter((m) => m !== space);
			localStorage.setItem("Parameters", Parameters);
			returnUncheckedBoxes(event.target.id);
			createUrl(category);
		}
	}

	// EVENT TRIGGERED IS RAM WAS SET
	static ram(event, category, space) {
		if (event.target.checked === true) {
			Parameters.Ram.push(space);
			Parameters.Ram = [...new Set(Parameters.Ram)];
			registerBox(event.target.id);
			createUrl(category);
		}
		if (event.target.checked === false) {
			Parameters.Ram = Parameters.Ram.filter((rr) => rr !== space);
			localStorage.setItem("Parameters", Parameters);
			returnUncheckedBoxes(event.target.id);
			createUrl(category);
		}
	}

	// EVENT TRIGGERED IF ROM WAS SET
	static rom(event, category, space) {
		if (event.target.checked == true) {
			Parameters.Rom.push(space);
			Parameters.Rom = [...new Set(Parameters.Rom)];
			registerBox(event.target.id);
			createUrl(category);
		}
		if (event.target.checked === false) {
			Parameters.Rom = Parameters.Rom.filter((ro) => ro !== space);
			localStorage.setItem("Parameters", Parameters);
			returnUncheckedBoxes(event.target.id);
			createUrl(category);
		}
	}

	// EVENT TRIGGERED IS SCREEN WAS SET
	static screen(event, category, screen) {
		if (event.target.checked == true) {
			Parameters.Screen.push(screen);
			Parameters.Screen = [...new Set(Parameters.Screen)];
			registerBox(event.target.id);
			createUrl(category);
		}
		if (event.target.checked === false) {
			Parameters.Screen = Parameters.Screen.filter((sc) => sc !== screen);
			localStorage.setItem("Parameters", Parameters);
			returnUncheckedBoxes(event.target.id);
			createUrl(category);
		}
	}

	// EVENT TRIGGERED IF SIZE WAS SET
	static size(event, category, size) {
		if (event.target.checked == true) {
			Parameters.Size.push(size);
			Parameters.Size = [...new Set(Parameters.Size)];
			registerBox(event.target.id);
			createUrl(category);
		}
		if (event.target.checked === false) {
			Parameters.Size = Parameters.Size.filter((sz) => sz !== size);
			localStorage.setItem("Parameters", Parameters);
			returnUncheckedBoxes(event.target.id);
			createUrl(category);
		}
	}

	// EVENT TRIGGERED WHEN PAGE NUMBER IS SELECTED(PAGINATION)
	static page(event, counter) {
		let itemCategory;
		let pgNum = event.target.id;
		try {
			itemCategory = document.URL.split("category=")[1]
				.split("=")[0]
				.split("&")[0];
		} catch (error) {}

		Parameters.Page = counter || pgNum;
		if (document.URL.split("SearchQuery").length > 1) {
			let pageUrl = document.URL.split("Page=")[0];
			let changePageNumber = `${pageUrl}Page=${Parameters.Page}`;
			return (window.location.href = changePageNumber);
		} else {
			createUrl(itemCategory);
			window.location.href = localStorage.getItem("Url");
		}
	}

	static sort(currentSort, results) {
		currentSort = currentSort.toLowerCase();
		results = results.page;
		switch (currentSort) {
			case "random":
				results = results.sort((a, b) => Number(a.id) < Number(b.id));
				break;
			case "ascending":
				results = results.sort(
					(a, b) =>
						Number(a.itemInfo.newItemPrice) - Number(b.itemInfo.newItemPrice)
				);
				break;
			case "descending":
				results = results.sort(
					(a, b) =>
						Number(b.itemInfo.newItemPrice) - Number(a.itemInfo.newItemPrice)
				);
				break;
		}
		return results;
	}
}
