import {
	type Child,
	type Parent,
	type FamilySheetSchema,
	type Sex,
	type Family,
	isSex
} from '$lib/family';

export function makeFamilies(data: FamilySheetSchema[]) {
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
			const childSex = isSex(family[`Child ${i} Sex`]) ? family[`Child ${i} Sex`] : undefined;

			if (childName && childSex) {
				children.push({ name: childName, sex: childSex });
			}
		}

		const passengerCapacity = parseInt(family['Passenger Capacity']);
		const address = family['Address'];
		familyArr.push({ parents, children, passengerCapacity, address });
	}
	return familyArr;
}
