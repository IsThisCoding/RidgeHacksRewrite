<script lang="ts">
	import type { FamilySheetSchema } from '$lib/family';
	import Papa from 'papaparse';

	let sheetUrl = '';
	let groups = $state();

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

	async function sendData(driversAndPassengers: FamilySheetSchema) {
		console.log(driversAndPassengers);
		const res = await fetch('/api/process', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ driversAndPassengers })
		});

		if (res.ok) {
			groups = await res.json();
		} else {
			console.error('Failed to process data.');
		}
	}
</script>

<div>
	<label for="url-input"
		>Enter a valid google sheets url or sheet id here. make sure it is shared!</label
	>
	<input type="text" bind:value={sheetUrl} />
	<button aria-label="submit" onclick={() => fetchData(sheetUrl)}>submit</button>
</div>

{#if groups}
	{#each groups as group}
		<ol>
			<li>
				{group.driverName}
				<ol>
					{#each group.passengers as passenger}
						<li>{passenger}</li>
					{/each}
				</ol>
			</li>
		</ol>
	{/each}
{/if}

<style lang="scss">
	div {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.75rem;
		padding: 2rem;
		max-width: 600px;
		margin: 0 auto;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	}

	label {
		font-weight: 600;
		font-size: 1rem;
	}

	input[type='text'] {
		width: 100%;
		padding: 0.5rem 0.75rem;
		font-size: 1rem;
		border: 1px solid #ccc;
		border-radius: 8px;
		outline: none;
		transition: border-color 0.3s;

		&:focus {
			border-color: #0077ff;
		}
	}

	button {
		background-color: #0077ff;
		color: white;
		border: none;
		padding: 0.6rem 1rem;
		font-size: 1rem;
		border-radius: 8px;
		cursor: pointer;
		transition: background-color 0.3s;

		&:hover {
			background-color: #005fcc;
		}
	}

	ol {
		list-style-type: decimal;
		padding-left: 1.5rem;

		> li {
			margin: 1rem 0;

			ol {
				list-style-type: disc;
				margin-top: 0.5rem;
				padding-left: 1.5rem;
			}
		}
	}
</style>
