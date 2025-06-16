import type { Child, Parent, Family, Driver, Coords, Passenger } from '$lib/family';
import { getLatAndLong } from '$lib/server/mapping';

export function createDrivers(families: Family[]): Driver[] {
	const driverArr: Driver[] = [];
	for (const family of families) {
		const capacity = family.passengerCapacity;

		if (capacity == 0 || !capacity) {
			continue;
		}

		const name = family.parents[0].name;
		const sex = family.parents[0].sex;
		const cellNumber = family.parents[0].cellNumber;
		const latAndLong = family.latAndLong;

		driverArr.push({ name, sex, cellNumber, latAndLong, capacity });
	}

	return driverArr;
}

export function createPassengers(families: Family[]): Passenger[] {
	const passengers: Passenger[] = [];
	for (const family of families) {
		for (const child of family.children) {
			const name = child.name;
			const sex = child.sex;
			const latAndLong = family.latAndLong;
			passengers.push({ name, sex, latAndLong });
		}
	}
	return passengers;
}
