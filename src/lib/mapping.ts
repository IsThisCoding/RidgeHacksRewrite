export function getLatAndLong(address: string, apikey: string) {
	const baseUrl = 'https://us1.locationiq.com/v1/search?';
	const params = {
		key: apikey,
		q: address, //query
		format: 'json'
	};
	const fullUrl = baseUrl + new URLSearchParams(params);
	console.log(fullUrl);
}
