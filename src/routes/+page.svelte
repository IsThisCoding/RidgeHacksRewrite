<script lang="ts">
	import Papa from 'papaparse';

	let sheetUrl = '';

	const getSheetId = (url: string) => {
		const match = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9_-]{44})/);
		console.log(match);
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
						const cleanedData = result.data.map((row: Record<string, string>) =>
							Object.fromEntries(Object.entries(row).filter(([_, value]) => value !== ''))
						);

						console.log(JSON.stringify(cleanedData));
						sendData(cleanedData);
					}
				}
			);
		} catch (err: any) {
			console.error(err.message, 'error');
		}
	};

	async function sendData(driversAndPassengers) {
		console.log(driversAndPassengers);
		const res = await fetch('/api/process', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ driversAndPassengers })
		});

		const data = await res.json();
		console.log(data);
	}
</script>

<div>
	<label for="url-input"
		>Enter a valid google sheets url or sheet id here. make sure it is shared!</label
	>
	<input type="text" bind:value={sheetUrl} />
	<button aria-label="submit" onclick={() => fetchData(sheetUrl)}>submit</button>
</div>

<style lang="scss">
</style>
