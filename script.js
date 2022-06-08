('use strict');
const BASE_URL = 'https://swapi.dev/api/';
import { Super, People, Planets, Films, Species, Vehicles, Starships } from './classes.js';

let currentData = {};
let currentCategory = null;

const nextPageButton = document.getElementById('next-page');

nextPageButton.addEventListener('click', async function () {
	if (currentData.next) {
		await fetchAPI(currentCategory, currentData.next);
		loadDataTable(currentCategory);
	}
});

function getId(url) {
	const data = url.split('/');
	// console.log('splitted', data);
	return data[data.length - 2];
}
//get SWAPI data
async function fetchAPI(category, url) {
	try {
		const fetchUrl = url ? url : `${BASE_URL}${category}`;

		const response = await fetch(fetchUrl);
		currentData = await response.json();
		currentData.results = currentData.results.map((item) => {
			return {
				...item,
				id: getId(item.url),
			};
		});
		// console.log(currentData.results);
	} catch (error) {
		console.log(`O Matko Bosko, co to sie stanelo?`, error);
	}
}

//get data for buttons and create them
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

function nextPage() {}

//get correct endpoint data when button clicked
async function buttonClick(event) {
	console.log(event);
	const category = event.target.dataset.id;
	await fetchAPI(category);
	currentCategory = category;
	// console.log(currentData.results);
	let resultCount = document.getElementById('number-results');
	resultCount.innerHTML = `${currentData.count} results`;
	loadDataTable(category);
}

//play some decent music
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

// load endpoint data on table
function loadDataTable(category) {
	let thead = document.getElementById('thead');
	let table = document.getElementById('table');
	let showData = '';

	if (category === 'people') {
		let categoryObj = currentData.results.map(
			({ name, url, created, height, mass, gender }) =>
				new People(name, url, created, height, mass, gender)
		);
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
		categoryObj.forEach((element, index) => {
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
	} else if (category === 'planets') {
		let categoryObj = currentData.results.map(
			({ name, url, created, diameter, climate, population }) =>
				new Planets(name, url, created, diameter, climate, population)
		);
		categoryObj.forEach((element, index) => {
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
	} else if (category === 'films') {
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
		categoryObj.forEach((element, index) => {
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
	} else if (category === 'species') {
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

		categoryObj.forEach((element, index) => {
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
	} else if (category === 'vehicles') {
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

		categoryObj.forEach((element, index) => {
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
	} else if (category === 'starships') {
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

		categoryObj.forEach((element, index) => {
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
}

function deleteElement(event) {
	console.log('delete', event.target.dataset.id);
	const { id } = event.target.dataset;
	currentData.results = currentData.results.filter((item) => item.url !== id);
	loadDataTable(currentCategory);
	console.log(currentData.results);
	// const elementToDelete = document.getElementById(id);
	// elementToDelete.remove()
}

createButtons();
playMusic();
