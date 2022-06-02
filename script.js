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

	// console.log(currentData.results);
	let resultCount = document.getElementById('number-results');
	resultCount.innerHTML = `${currentData.count} results`;
	deleteResultInTable();
	loadDataTable(category);
}

function deleteResultInTable() {}

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
	      <tr>
	        <td>${index + 1}</td>
	        <td>${element.name}</td>
	        <td>${element.height}</td>
	        <td>${element.mass}</td>
	        <td>${element.gender}</td>
	        <td>${element.created.slice(0, 10)}</td>
	        <td><img id="info-button" src="./images/info.png"/><img id="delete-button" src="./images/trash.png"/></td>
	      </tr>`;
		});
	} else if (category === 'planets') {
		let categoryObj = currentData.results.map(
			({ name, url, created, diameter, climate, population }) =>
				new Planets(name, url, created, diameter, climate, population)
		);
		categoryObj.forEach((element, index) => {
			showData += `
	      <tr>
	        <td>${index + 1}</td>
	        <td>${element.name}</td>
	        <td>${element.diameter}</td>
	        <td>${element.climate}</td>
	        <td>${element.population}</td>
	        <td>${element.created.slice(0, 10)}</td>
	       	<td><img id="info-button" src="./images/info.png"/><img id="delete-button" src="./images/trash.png"/></td>
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

	      <tr>
	        <td>${index + 1}</td>
	        <td>${element.title}</td>
	        <td>${element.producer}</td>
	        <td>${element.director}</td>
	        <td>${element.created.slice(0, 10)}</td>
	        <td><img id="info-button" src="./images/info.png"/><img id="delete-button" src="./images/trash.png"/></td>

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
	      <tr>
	        <td>${index + 1}</td>
	        <td>${element.name}</td>
	        <td>${element.designation}</td>
	        <td>${element.average_height}</td>
	        <td>${element.created.slice(0, 10)}</td>
	     	<td><img id="info-button" src="./images/info.png"/><img id="delete-button" src="./images/trash.png"/></td>
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
	      <tr>
	        <td>${index + 1}</td>
	        <td>${element.name}</td>
	        <td>${element.model}</td>
	        <td>${element.manufacter}</td>
	        <td>${element.passengers}</td>
	        <td>${element.created.slice(0, 10)}</td>
	       	<td><img id="info-button" src="./images/info.png"/><img id="delete-button" src="./images/trash.png"/></td>
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
	      <tr>
	        <td>${index + 1}</td>
	        <td>${element.name}</td>
	        <td>${element.model}</td>
	        <td>${element.consumables}</td>
	        <td>${element.crew}</td>
	        <td>${element.created.slice(0, 10)}</td>
	      	<td><img id="info-button" src="./images/info.png"/><img id="delete-button" src="./images/trash.png"/></td>
	      </tr>`;
		});
	}
	table.innerHTML = showData;
}

createButtons();
playMusic();
