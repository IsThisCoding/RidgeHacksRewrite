export type Sex = 'M' | 'F' | 'Male' | 'Female';

export type Coords = [number, number];

export function isSex(value: any): value is Sex {
	return value === 'M' || value === 'F' || value === 'Male' || value === 'Female';
}

export interface FamilySheetSchema {
	'Parent 1': string;
	'Parent 1 Sex': Sex;
	'Parent 1 Cell': string;

	'Parent 2'?: string;
	'Parent 2 Sex'?: Sex;
	'Parent 2 Cell'?: string;

	'Passenger Capacity': string;

	[key: `Child ${number}`]: string | undefined;
	[key: `Child ${number} Sex`]: Sex | undefined;

	Address: string;
}

export interface Child {
	name: string;
	sex: Sex;
}

export interface Parent {
	name: string;
	sex: Sex;
	cellNumber: string;
}

export interface Driver {
	name: string;
	sex: Sex;
	cellNumber: string;
	latAndLong: Coords;
	capacity: number;
}

export interface Passenger {
	name: string;
	sex: Sex;
	latAndLong: Coords;
}

export interface Family {
	parents: [Parent, Parent?];
	children: Child[];
	passengerCapacity: number;
	address: string;
	latAndLong: Coords;
}
