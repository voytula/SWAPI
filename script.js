('use strict');
const BASE_URL = 'https://swapi.dev/api/';
import { Super, People, Planets, Films, Species, Vehicles, Starships } from './classes.js';

let currentData = {};

//get SWAPI data
async function fetchAPI(endpoint) {
	try {
		const response = await fetch(`${BASE_URL}${endpoint}`);
		currentData = await response.json();
		// console.log(currentData.results);
	} catch (error) {
		console.log(`O Matko Bosko, co to sie stanelo?`, error);
	}
}

//get data for buttons and create them
async function createButtons() {
	const response = await fetch(BASE_URL);
	const data = await response.json();
	const buttons = document.getElementById('buttons');
	Object.entries(data).map(([key, _]) => {
		// console.log(key, value);
		const button = document.createElement('button');
		button.classList.add('menu-button');
		button.innerHTML = key.charAt(0).toUpperCase() + key.slice(1);
		buttons.appendChild(button);
		button.addEventListener('click', buttonClick);
	});
}

//get correct endpoint data when button clicked
async function buttonClick(event) {
	const category = event.target.innerHTML.toLowerCase();
	await fetchAPI(category);

	let resultCount = document.getElementById('number-results');
	resultCount.innerHTML = `${currentData.count} results`;

	if (category === 'people') {
		peopleData();
	} else if (category === 'planets') {
		planetsData();
	} else if (category === 'films') {
		filmsData();
	} else if (category === 'species') {
		speciesData();
	} else if (category === 'vehicles') {
		vehiclesData();
	} else if (category === 'starships') {
		starshipsData();
	}
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

createButtons();
playMusic();

function peopleData() {
	let peopleObj = currentData.results.map(
		({ name, url, created, height, mass, gender }) =>
			new People(name, url, created, height, mass, gender)
	);
	let thead = document.getElementById('thead');
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
	let table = document.getElementById('table');
	let showData = '';
	peopleObj.forEach((person, index) => {
		showData += `
		
	      <tr>
	        <td>${index + 1}</td>
	        <td>${person.name}</td>
	        <td>${person.height}</td>
	        <td>${person.mass}</td>
	        <td>${person.gender}</td>
	        <td>${person.created.slice(0, 10)}</td>
	        <td><img id="info-button" src="./images/info.png"/><img id="delete-button" src="./images/trash.png"/></td>
	      </tr>`;
	});
	table.innerHTML = showData;
}

function planetsData() {
	let planetsObj = currentData.results.map(
		({ name, url, created, diameter, climate, population }) =>
			new Planets(name, url, created, diameter, climate, population)
	);

	let thead = document.getElementById('thead');
	let showLabels = `<tr>
			<th>ID</th>
			<th>NAME</th>
			<th>DIAMETER</th>
			<th>CLIMATE</th>
			<th>POPULATION</th>
			<th>CREATED</th>
			<th>ACTIONS</th>
		</tr>`;
	thead.innerHTML = showLabels;
	let table = document.getElementById('table');
	let showData = '';
	planetsObj.forEach((planet, index) => {
		showData += `

	      <tr>
	        <td>${index + 1}</td>
	        <td>${planet.name}</td>
	        <td>${planet.diameter}</td>
	        <td>${planet.climate}</td>
	        <td>${planet.population}</td>
	        <td>${planet.created.slice(0, 10)}</td>
	       	<td><img id="info-button" src="./images/info.png"/><img id="delete-button" src="./images/trash.png"/></td>

	      </tr>`;
	});
	table.innerHTML = showData;
}

function filmsData() {
	let filmsObj = currentData.results.map(
		({ name, url, created, title, producer, director }) =>
			new Films(name, url, created, title, producer, director)
	);

	let thead = document.getElementById('thead');
	let showLabels = `<tr>
			<th>ID</th>
			<th>TITLE</th>
			<th>PRODUCER</th>
			<th>DIRECTOR</th>
			<th>CREATED</th>
			<th>ACTIONS</th>
		</tr>`;
	thead.innerHTML = showLabels;
	let table = document.getElementById('table');
	let showData = '';
	filmsObj.forEach((film, index) => {
		showData += `

	      <tr>
	        <td>${index + 1}</td>
	        <td>${film.title}</td>
	        <td>${film.producer}</td>
	        <td>${film.director}</td>
	        <td>${film.created.slice(0, 10)}</td>
	        <td><img id="info-button" src="./images/info.png"/><img id="delete-button" src="./images/trash.png"/></td>

	      </tr>`;
	});
	table.innerHTML = showData;
}

function speciesData() {
	let speciesObj = currentData.results.map(
		({ name, url, created, designation, language }) =>
			new Species(name, url, created, designation, language)
	);

	let thead = document.getElementById('thead');
	let showLabels = `<tr>
			<th>ID</th>
			<th>NAME</th>
			<th>DESIGNATION</th>
			<th>LANGUAGE</th>
			<th>CREATED</th>
			<th>ACTIONS</th>
		</tr>`;
	thead.innerHTML = showLabels;
	let table = document.getElementById('table');
	let showData = '';
	speciesObj.forEach((spec, index) => {
		showData += `

	      <tr>
	        <td>${index + 1}</td>
	        <td>${spec.name}</td>
	        <td>${spec.designation}</td>
	        <td>${spec.language}</td>
	        <td>${spec.created.slice(0, 10)}</td>
	     	<td><img id="info-button" src="./images/info.png"/><img id="delete-button" src="./images/trash.png"/></td>

	      </tr>`;
	});
	table.innerHTML = showData;
}

function vehiclesData() {
	let vehiclesObj = currentData.results.map(
		({ name, url, created, model, manufacter, passengers }) =>
			new Vehicles(name, url, created, model, manufacter, passengers)
	);

	let thead = document.getElementById('thead');
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
	let table = document.getElementById('table');
	let showData = '';
	vehiclesObj.forEach((vehicle, index) => {
		showData += `

	      <tr>
	        <td>${index + 1}</td>
	        <td>${vehicle.name}</td>
	        <td>${vehicle.model}</td>
	        <td>${vehicle.manufacter}</td>
	        <td>${vehicle.passengers}</td>
	        <td>${vehicle.created.slice(0, 10)}</td>
	       	<td><img id="info-button" src="./images/info.png"/><img id="delete-button" src="./images/trash.png"/></td>

	      </tr>`;
	});
	table.innerHTML = showData;
}

function starshipsData() {
	let starshipsObj = currentData.results.map(
		({ name, url, created, mglt, consumables, crew }) =>
			new Starships(name, url, created, mglt, consumables, crew)
	);

	let thead = document.getElementById('thead');
	let showLabels = `<tr>
			<th>ID</th>
			<th>NAME</th>
			<th>MGLT</th>
			<th>CONSUMABLES</th>
			<th>CREW</th>
			<th>CREATED</th>
			<th>ACTIONS</th>
		</tr>`;
	thead.innerHTML = showLabels;
	let table = document.getElementById('table');
	let showData = '';
	starshipsObj.forEach((starship, index) => {
		showData += `

	      <tr>
	        <td>${index + 1}</td>
	        <td>${starship.name}</td>
	        <td>${starship.mglt}</td>
	        <td>${starship.consumables}</td>
	        <td>${starship.crew}</td>
	        <td>${starship.created.slice(0, 10)}</td>
	      	<td><img id="info-button" src="./images/info.png"/><img id="delete-button" src="./images/trash.png"/></td>

	      </tr>`;
	});
	table.innerHTML = showData;
}
