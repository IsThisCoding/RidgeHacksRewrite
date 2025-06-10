import type { RequestHandler } from '@sveltejs/kit';
import { makeFamilies } from '$lib/csv-parser';
import { getLatAndLong } from '$lib/mapping';
import { createDrivers } from '$lib/group-maker';
import { SECRET_LOCATIONIQ_API_KEY } from '$env/static/private';

export const POST: RequestHandler = async ({ request }) => {
	const { driversAndPassengers } = await request.json();

	// console.log(driversAndPassengers);
	// console.log(SECRET_LOCATIONIQ_API_KEY);
	// getLatAndLong('544 Stony Brook Drive, Bridgewater, NJ', SECRET_LOCATIONIQ_API_KEY);
	const families = makeFamilies(driversAndPassengers);
	const drivers = createDrivers(families);
	console.log(drivers);
	return new Response(JSON.stringify({ success: true, count: driversAndPassengers.length }), {
		headers: { 'Content-Type': 'application/json' }
	});
};
