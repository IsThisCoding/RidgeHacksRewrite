import type { Child, Parent, Family, Driver, Coords } from '$lib/family';
import { getLatAndLong } from '$lib/mapping';

export function createDrivers(families: Family[]): Driver[] {
	const addressAndCoordinateDict: Record<string, Coords> = {};
	const driverArr: Driver[] = [];
	for (const family of families) {
		const capacity = family.passengerCapacity;

		if (capacity == 0 || !capacity) {
			continue;
		}

		const name = family.parents[0].name;
		const sex = family.parents[0].sex;
		const cellNumber = family.parents[0].cellNumber;
		const address = family.address;

		driverArr.push({ name, sex, cellNumber, address, capacity });
	}

	return driverArr;
}
