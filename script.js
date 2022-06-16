('use strict');
const BASE_URL = 'https://swapi.dev/api/';
import { Super, People, Planets, Films, Species, Vehicles, Starships } from './classes.js';

let currentData = null;
let currentCategory = null;

const nextPageButton = document.getElementById('next-page');
const prevPageButton = document.getElementById('prev-page');

const pageNumber = document.getElementById('page-number');
const searchInput = document.getElementById('search-input');
const submitSearchButton = document.getElementById('submit-search-value');
const resultsPerPage = document.querySelector('.select-page');
const introText = document.getElementById('text');
const scroll = document.querySelector('.results-container');

//-------------search for an item in current catergory---------------------
async function search() {
	const searchInputValue = document.getElementById('search-input').value;
	let endpoint = `?search=${searchInputValue}`;
	const response = await fetch(`${BASE_URL}${currentCategory}${endpoint}`);
	currentData = await response.json();

	howManyPages();
	howManyResults();
	// console.log(currentData);
	renderDataTable(currentCategory);
}
submitSearchButton.addEventListener('click', search);

//----------------next and previous buttons PAGINATION------------
function movePage() {
	nextPageButton.addEventListener('click', async function () {
		if (currentData.next) {
			await fetchAPI(currentCategory, currentData.next);
			renderDataTable(currentCategory);
		}
	});
	prevPageButton.addEventListener('click', async function () {
		if (currentData.previous) {
			await fetchAPI(currentCategory, currentData.previous);
			renderDataTable(currentCategory);
		}
	});
}

//-----------------get ID for each item----------------------
function getId(url) {
	const data = url.split('/');
	// console.log('splitted', data);
	return data[data.length - 2];
}

function getPageNumbers(url) {
	let totalPages = Math.floor(currentData.count / 10) + 1;
	if (url) {
		const data = url.split('');
		return data[data.length - 1];
	} else {
		return totalPages + 1;
	}
}

//-------------------get SWAPI data---------------------------
async function fetchAPI(category, url) {
	try {
		const fetchUrl = url ? url : `${BASE_URL}${category}`;
		const response = await fetch(fetchUrl);
		currentData = await response.json();
		// console.log(currentData);

		currentData.results = currentData.results.map((item) => {
			return {
				...item,
				id: getId(item.url),
			};
		});
	} catch (error) {
		console.log(`O Matko Bosko, co to sie stanelo?`, error);
	}
}

//-------------get data for buttons and create them----------------------
async function createButtons() {
	const response = await fetch(BASE_URL);
	const data = await response.json();
	// console.log('data', data);
	const buttons = document.getElementById('buttons');
	Object.entries(data).map((entry) => {
		const key = entry[0];
		const button = document.createElement('button');
		button.classList.add('menu-button');
		button.innerHTML = key.charAt(0).toUpperCase() + key.slice(1);
		button.dataset.id = key;
		buttons.appendChild(button);
		button.addEventListener('click', buttonClick);
	});
}

//--------------get correct endpoint data when button clicked-----------------
async function buttonClick(event) {
	// console.log(event);
	const category = event.target.dataset.id;
	await fetchAPI(category);

	currentCategory = category;

	howManyResults();
	renderDataTable(category);
}

//----------------play some decent music---------------------
function playMusic() {
	let musicButton = document.getElementById('logo');
	let isPlaying = false;

	musicButton.addEventListener('click', function () {
		if (isPlaying == false) {
			document.getElementById('music').play();
			isPlaying = true;
		} else {
			document.getElementById('music').pause();
			isPlaying = false;
		}
	});
}
// REFACTOR
// const collections = {
// 	// id, actions
//   people: ["name", "height", "mass", "gender", "created"],
// };

// function renderCollection(category) {
// 	collections[category]
//     let categoryObj = currentData.results.map(
//       ({ name, url, created, height, mass, gender }) =>
//         new People(name, url, created, height, mass, gender)
//     );
// }

//------show amount of pages available-----------
function howManyPages() {
	let currentPage = getPageNumbers(currentData.next) - 1;
	let totalPages = Math.floor(currentData.count / 10) + 1;
	pageNumber.innerHTML = `page ${currentPage} of ${totalPages}`;
}
//------show how many results---------------
function howManyResults() {
	let resultCount = document.getElementById('number-results');
	resultCount.innerHTML = `${currentData.count} results`;
}

//-----------------render endpoint data on table--------------------
function renderDataTable(currentCategory) {
	let thead = document.getElementById('thead');
	let table = document.getElementById('table');

	let showData = '';
	if (currentCategory === 'people') {
		let categoryObj = currentData.results.map(
			({ name, url, created, height, mass, gender }) =>
				new People(name, url, created, height, mass, gender)
		);
		// console.log(currentData);

		let showLabels = `<tr>
			<th>ID</th>
			<th>NAME</th>
			<th>HEIGHT</th>
			<th>MASS</th>
			<th>GENDER</th>
			<th>CREATED</th>
			<th>ACTIONS</th>
		</tr>`;
		thead.innerHTML = showLabels;
		categoryObj.forEach((element) => {
			showData += `
	      <tr id="${element.url}">
	        <td>${getId(element.url)}</td>
	        <td>${element.name}</td>
	        <td>${element.height}</td>
	        <td>${element.mass}</td>
	        <td>${element.gender}</td>
	        <td>${element.created.slice(0, 10)}</td>
	        <td><img id="info-button" src="./images/info.png"/><img class="delete-button"
			data-id="${element.url}" src="./images/trash.png"/></td>
	      </tr>`;
		});
	} else if (currentCategory === 'planets') {
		let categoryObj = currentData.results.map(
			({ name, url, created, diameter, climate, population }) =>
				new Planets(name, url, created, diameter, climate, population)
		);
		categoryObj.forEach((element) => {
			showData += `
	      <tr id="${element.url}">
	        <td>${getId(element.url)}</td>
	        <td>${element.name}</td>
	        <td>${element.diameter}</td>
	        <td>${element.climate}</td>
	        <td>${element.population}</td>
	        <td>${element.created.slice(0, 10)}</td>
	       	<td><img id="info-button" src="./images/info.png"/><img class="delete-button" data-id="${
				element.url
			}" src="./images/trash.png"/></td>
	      </tr>`;
		});
	} else if (currentCategory === 'films') {
		let categoryObj = currentData.results.map(
			({ name, url, created, title, producer, director }) =>
				new Films(name, url, created, title, producer, director)
		);
		let showLabels = `<tr>
			<th>ID</th>
			<th>TITLE</th>
			<th>PRODUCER</th>
			<th>DIRECTOR</th>
			<th>CREATED</th>
			<th>ACTIONS</th>
		</tr>`;
		thead.innerHTML = showLabels;
		categoryObj.forEach((element) => {
			showData += `
	      <tr id="${element.url}">
	        <td>${getId(element.url)}</td>
	        <td>${element.title}</td>
	        <td>${element.producer}</td>
	        <td>${element.director}</td>
	        <td>${element.created.slice(0, 10)}</td>
	        <td><img id="info-button" src="./images/info.png"/><img class="delete-button"  data-id="${
				element.url
			}" src="./images/trash.png"/></td>

	      </tr>`;
		});
	} else if (currentCategory === 'species') {
		let categoryObj = currentData.results.map(
			({ name, url, created, designation, average_height }) =>
				new Species(name, url, created, designation, average_height)
		);
		let showLabels = `<tr>
			<th>ID</th>
			<th>NAME</th>
			<th>DESIGNATION</th>
			<th>HEIGHT</th>
			<th>CREATED</th>
			<th>ACTIONS</th>
		</tr>`;
		thead.innerHTML = showLabels;

		categoryObj.forEach((element) => {
			showData += `
	      <tr id="${element.url}">
	        <td>${getId(element.url)}</td>
	        <td>${element.name}</td>
	        <td>${element.designation}</td>
	        <td>${element.average_height}</td>
	        <td>${element.created.slice(0, 10)}</td>
	     	<td><img id="info-button" src="./images/info.png"/><img class="delete-button" data-id="${
				element.url
			}"  src="./images/trash.png"/></td>
	      </tr>`;
		});
	} else if (currentCategory === 'vehicles') {
		let categoryObj = currentData.results.map(
			({ name, url, created, model, manufacter, passengers }) =>
				new Vehicles(name, url, created, model, manufacter, passengers)
		);
		let showLabels = `<tr>
			<th>ID</th>
			<th>NAME</th>
			<th>MODEL</th>
			<th>MANUFACTER</th>
			<th>PASSENGERS</th>
			<th>CREATED</th>
			<th>ACTIONS</th>
		</tr>`;
		thead.innerHTML = showLabels;

		categoryObj.forEach((element) => {
			showData += `
	      <tr id="${element.url}">
	        <td>${getId(element.url)}</td>
	        <td>${element.name}</td>
	        <td>${element.model}</td>
	        <td>${element.manufacter}</td>
	        <td>${element.passengers}</td>
	        <td>${element.created.slice(0, 10)}</td>
	       	<td><img id="info-button" src="./images/info.png"/><img class="delete-button"  data-id="${
				element.url
			}" 
           src="./images/trash.png"/></td>
	      </tr>`;
		});
	} else if (currentCategory === 'starships') {
		let categoryObj = currentData.results.map(
			({ name, url, created, model, consumables, crew }) =>
				new Starships(name, url, created, model, consumables, crew)
		);

		let showLabels = `<tr>
			<th>ID</th>
			<th>NAME</th>
			<th>MODEL</th>
			<th>CONSUMABLES</th>
			<th>CREW</th>
			<th>CREATED</th>
			<th>ACTIONS</th>
		</tr>`;
		thead.innerHTML = showLabels;

		categoryObj.forEach((element) => {
			showData += `
	      <tr id="${element.url}">
	        <td>${getId(element.url)}</td>
	        <td>${element.name}</td>
	        <td>${element.model}</td>
	        <td>${element.consumables}</td>
	        <td>${element.crew}</td>
	        <td>${element.created.slice(0, 10)}</td>
	      	<td><img id="info-button" src="./images/info.png"/><img class="delete-button"  data-id="${
				element.url
			}" src="./images/trash.png"/></td>
	      </tr>`;
		});
	}
	table.innerHTML = showData;

	const deleteButtons = document.querySelectorAll('.delete-button');
	deleteButtons.forEach((button) => {
		button.addEventListener('click', deleteElement);
	});

	howManyPages();
	getPageNumbers();
	showPageNavAndInfo();
}

//-----------delete an item by id------------------------
function deleteElement(event) {
	// console.log('delete', event.target.dataset.id);
	const { id } = event.target.dataset;
	currentData.results = currentData.results.filter((item) => item.url !== id);
	renderDataTable(currentCategory);
	// console.log(currentData.results);
	// const elementToDelete = document.getElementById(id);
	// elementToDelete.remove()
}

//----------------show next and prev buttons when available---------------------------
function showPageNavAndInfo() {
	currentData.next
		? (nextPageButton.style.display = 'block')
		: (nextPageButton.style.display = 'none');
	currentData.previous
		? (prevPageButton.style.display = 'block')
		: (prevPageButton.style.display = 'none');
	currentData ? (searchInput.style.display = 'block') : (searchInput.style.display = 'none');
	currentData
		? (submitSearchButton.style.display = 'block')
		: (submitSearchButton.style.display = 'none');
	currentData ? (resultsPerPage.style.display = 'flex') : (resultsPerPage.style.display = 'none');
	currentData ? (introText.style.display = 'none') : (introText.style.display = 'flex');
	currentData
		? ((scroll.style.overflow = 'scroll'), (scroll.style.overflowX = 'hidden'))
		: (scroll.style.overflow = 'hidden');
	getAllData(currentCategory);
}

movePage();
createButtons();
playMusic();

let allData = [];
async function getAllData(currentCategory) {
	allData = [];
	let url = `${BASE_URL}${currentCategory}`;
	while (url) {
		const response = await fetch(url);
		const data = await response.json();
		allData.push(...data.results);
		url = data.next;
		// console.log(data);
		// renderDataTable(currentCategory);
		// console.log(allData);
		// console.log(allResults);
	}
	return allData;
}
const selectHowManyResults = document.getElementById('select');
selectHowManyResults.addEventListener('change', resPerPage);

function resPerPage() {
	let tenResults = [];
	let twentysixResults = [];
	let seventeenResults = [];
	let thirtyfourResults = [];
	if (this.value === '10') {
		for (let i = 0; i < allData.length; i++) {
			tenResults.push(allData[i]);
		}
		currentData.results = tenResults.splice(0, 10);
	} else if (this.value === '17') {
		for (let i = 0; i < allData.length; i++) {
			seventeenResults.push(allData[i]);
		}
		currentData.results = seventeenResults.splice(0, 17);
	} else if (this.value === '26') {
		for (let i = 0; i < allData.length; i++) {
			twentysixResults.push(allData[i]);
		}

		currentData.results = twentysixResults.splice(0, 26);
	} else if (this.value === '34') {
		for (let i = 0; i < allData.length; i++) {
			thirtyfourResults.push(allData[i]);
		}
		currentData.results = thirtyfourResults.splice(0, 34);
	}
	renderDataTable(currentCategory);
}

// const selectHowManyResults = document.getElementById('select');
// selectHowManyResults.addEventListener('change', function () {
// 	// console.log('you selected: ', this.value);
// 	if (this.value === '10') {
// 		let tenResults = [];
// 		for (let i = 0; i < allData.length; i++) {
// 			tenResults.push(allData[i]);
// 		}
// 		console.log(tenResults.slice(0, 10));
// 	} else if (this.value === '17') {
// 		let seventeenResults = [];
// 		for (let i = 0; i < allData.length; i++) {
// 			seventeenResults.push(allData[i]);
// 			// renderDataTable(currentCategory);
// 		}
// 		console.log(seventeenResults.slice(0, 17));
// 	} else if (this.value === '26') {
// 		let twentysixResults = [];
// 		for (let i = 0; i < allData.length; i++) {
// 			twentysixResults.push(allData[i]);
// 		}
// 		console.log(twentysixResults.slice(0, 26));
// 	} else if (this.value === '34') {
// 		let thirtyfourResults = [];
// 		for (let i = 0; i < allData.length; i++) {
// 			thirtyfourResults.push(allData[i]);
// 		}
// 		console.log(thirtyfourResults.slice(0, 34));
// 	}
// });
