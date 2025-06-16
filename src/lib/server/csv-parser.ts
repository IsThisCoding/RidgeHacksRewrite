import {
	type Child,
	type Parent,
	type FamilySheetSchema,
	type Family,
	isSex,
	type Coords
} from '$lib/family';
import { getLatAndLong } from '$lib/server/mapping';
import PQueue from 'p-queue';
import { SECRET_LOCATIONIQ_API_KEY } from '$env/static/private';

// LocationIQ free tier allows 2 requests per second
const queue = new PQueue({ interval: 1500, intervalCap: 2 });
const nominatimQueue = new PQueue({ interval: 1000, intervalCap: 1 });

export async function makeFamilies(data: FamilySheetSchema[]): Promise<Family[]> {
	const familyArr: Family[] = [];

	for (const family of data) {
		const parents: [Parent, Parent?] = [
			{
				name: family['Parent 1'],
				sex: family['Parent 1 Sex'],
				cellNumber: family['Parent 1 Cell']
			},
			family['Parent 2'] && family['Parent 2 Sex'] && family['Parent 2 Cell']
				? {
						name: family['Parent 2'],
						sex: family['Parent 2 Sex'],
						cellNumber: family['Parent 2 Cell']
					}
				: undefined
		];

		const children: Child[] = [];
		for (let i = 1; i <= 20; i++) {
			const childName = family[`Child ${i}`];
			const childSex = family[`Child ${i} Sex`];
			if (childName && isSex(childSex)) {
				children.push({ name: childName, sex: childSex });
			}
		}

		const passengerCapacity = parseInt(family['Passenger Capacity'], 10);
		const address = family['Address'];

		const latAndLong = (await queue.add(() =>
			getLatAndLong(address, SECRET_LOCATIONIQ_API_KEY)
		)) as Coords;

		familyArr.push({ parents, children, passengerCapacity, address, latAndLong });
	}

	return familyArr;
}
