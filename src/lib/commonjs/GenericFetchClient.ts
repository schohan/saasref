import { paramsToQueryString } from '$lib/utils/query-params.js';

/* Fetches data from remote.
 * @path:string Path to resource. eg. /api/content
 * @params:any  Object containing filter,sort, and pagination parameters
 **/
export async function fetchData(request: API.Request): API.Response {
	const { path, filters, limit, skip } = request;
	const queryString: string = paramsToQueryString({ ...filters, skip, limit });

	const url = `${path}?${queryString}`;
	try {
		const res = await fetch(url);
		if (res.ok) {
			const resp: API.Response = await res.json();
			return resp;
		} else throw Error(res.statusText);
	} catch (error) {
		console.log(`Could not fetch data from ${path}. Error = ${error.message}`);
		return {
			error: error.message
		};
	}
}
