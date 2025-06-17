import { json, type RequestHandler } from '@sveltejs/kit';
import { makeFamilies } from '$lib/server/csv-parser';
import { createRoutes, getLatAndLong } from '$lib/server/mapping';
import { createDrivers, createPassengers } from '$lib/server/group-maker';
import { SECRET_LOCATIONIQ_API_KEY } from '$env/static/private';

export const POST: RequestHandler = async ({ request }) => {
	const { driversAndPassengers } = await request.json();
	const families = await makeFamilies(driversAndPassengers);
	const drivers = createDrivers(families);
	const passengers = createPassengers(families);
	const groups = await createRoutes(drivers, passengers);
	console.log('Groups:', groups);
	return new json(groups);
};
