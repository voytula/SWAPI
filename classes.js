export class Super {
	constructor(name, url, created) {
		this.name = name;
		this.url = url;
		this.created = created;
	}
}

export class People extends Super {
	constructor(name, url, created, height, mass, gender) {
		super(name, url, created);
		this.height = height;
		this.mass = mass;
		this.gender = gender;
	}
}

export class Planets extends Super {
	constructor(name, url, created, diameter, climate, population) {
		super(name, url, created);
		this.diameter = diameter;
		this.climate = climate;
		this.population = population;
	}
}

export class Films extends Super {
	constructor(name, url, created, title, producer, director) {
		super(name, url, created);
		this.title = title;
		this.producer = producer;
		this.director = director;
	}
}

export class Species extends Super {
	constructor(name, url, created, designation, homeworld, language) {
		super(name, url, created);
		this.designation = designation;
		this.homeworld = homeworld;
		this.language = language;
	}
}

export class Vehicles extends Super {
	constructor(name, url, created, model, manufacter, passengers) {
		super(name, url, created);
		this.model = model;
		this.manufacter = manufacter;
		this.passengers = passengers;
	}
}

export class Starships extends Super {
	constructor(name, url, created, mglt, consumables, crew) {
		super(name, url, created);
		this.mglt = mglt;
		this.consumables = consumables;
		this.crew = crew;
	}
}
