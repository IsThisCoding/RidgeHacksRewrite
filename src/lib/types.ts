export interface Child {
	name: string;
	sex: 'M' | 'F';
	address: string;
}

export interface Driver {
	parent1Sex: string;
	parent1Cell: string;
	parent2Name: string;
	parent2Sex: string;
	parent2Cell: string;
	passengerCapacity: number;
	address: string;
}
