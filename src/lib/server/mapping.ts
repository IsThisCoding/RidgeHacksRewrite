import type { Coords, Driver, Passenger } from '$lib/family';

export async function getLatAndLong(address: string, apikey: string): Promise<Coords> {
	let lat,
		long = 0;
	const baseUrl = 'https://us1.locationiq.com/v1/search?';
	const params = {
		key: apikey,
		q: address, //query
		format: 'json'
	};
	const fullUrl = baseUrl + new URLSearchParams(params);
	console.log(fullUrl);
	try {
		const response = await fetch(fullUrl);
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}

		const json = await response.json();
		lat = parseFloat(json[0].lat);
		long = parseFloat(json[0].lon);
	} catch (error: unknown) {
		console.error(error instanceof Error ? `Error: ${error.message}` : `Uknown error: ${error}`);
	}
	return [lat, long];
}

export async function createRoutes(drivers: Driver[], passengers: Passenger[]) {
	const baseUrl = `http://localhost:3000`;
	const data = encodeDriversAndPassengers(drivers, passengers);
	console.log(data);
	console.log(data.vehicles[0].start);
	const options = {
		method: 'Post',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	};
	let routes = [];
	try {
		const response = await fetch(baseUrl, options);
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}
		const jsonData = await response.json();
		routes = routes.concat(jsonData.routes);
	} catch (error: unknown) {
		console.error(error instanceof Error ? `Error: ${error.message}` : `Uknown error: ${error}`);
	}
	const groups = [];
	for (const route of routes) {
		// console.log('route', route);
		const driverName = route.description;
		const destinations = route.steps.slice(1, -1);
		const passengers = destinations.map((destination) => destination.description);
		groups.push({ driverName, passengers });
	}

	return groups;
}

interface Vehicle {
	id: number;
	start: Coords;
	max_tasks: number;
	description: string;
	profile: 'driving-car';
}

interface Job {
	id: number;
	location: Coords;
	description: string;
}

const encodeDriversAndPassengers = (drivers: Driver[], passengers: Passenger[]) => {
	let driverIdNumber = 0;
	let passengerIdNumber = 0;
	const vehicles: Vehicle[] = [];
	const jobs: Job[] = [];
	for (const driver of drivers) {
		const id = driverIdNumber;
		const start = driver.latAndLong.toReversed() as Coords;
		console.log(start);
		const max_tasks = driver.capacity;
		const description = driver.name;
		vehicles.push({ id, start, max_tasks, description, profile: 'driving-car' });
		driverIdNumber++;
	}

	for (const passenger of passengers) {
		const id = passengerIdNumber;
		const location = passenger.latAndLong.toReversed() as Coords;
		const description = passenger.name;
		jobs.push({ id, location, description });
		passengerIdNumber++;
	}

	return { vehicles: vehicles, jobs: jobs };
};
