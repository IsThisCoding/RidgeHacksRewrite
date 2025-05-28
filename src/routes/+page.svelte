<script lang="ts">
	import Papa from 'papaparse';

	type Sex = 'Male' | 'Female' | 'M' | 'F';

	let sheetUrl = '';

	const getSheetId = (url: string) => {
		const match = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9_-]{44})/);
		if (!match) throw new Error('Invalid Google Sheets URL: Sheet ID not found!');
		return match[1];
	};

	const fetchData = (url: string) => {
		try {
			const id = getSheetId(url);
			console.log('Sheet ID:', id);
			Papa.parse<Record<string, any>>(
				`https://docs.google.com/spreadsheets/d/${id}/export?format=csv`,
				{
					download: true,
					header: true,
					skipEmptyLines: true,
					complete: (result) => {
						const cleanedData = result.data.map((row: Record<string, any>) =>
							Object.fromEntries(Object.entries(row).filter(([_, value]) => value !== ''))
						);

						console.log(cleanedData);
					}
				}
			);
		} catch (err: any) {
			console.error(err.message, 'error');
		}
	};
</script>

<style>
</style>
