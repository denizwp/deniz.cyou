/** json fetcher for swr that treats `{ error }` bodies as failures */
export const fetcher = (url: string) =>
	fetch(url)
		.then(res => res.json())
		.then(data => {
			if (data?.error) throw data.error;
			return data;
		});
