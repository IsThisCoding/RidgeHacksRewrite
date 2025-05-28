import fs from 'fs';
import Papa from 'papaparse';
import type { Child, Driver } from '$lib/types';

export const readCsv = (filepath: string) => {
	const children: Child[] = [];
	const drivers: Driver[] = [];

	fs.promises.readFile(filepath, 'utf-8').then((csvData) => {
		Papa.parse(csvData, {
			header: true,
			skipEmptyLines: 'greedy',
			complete: (results) => console.log(results)
		});
	});
};

readCsv('/home/michael/Projects/RidgeHacksRewrite/src/lib/test.csv');
