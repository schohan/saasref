import { json, error } from '@sveltejs/kit';
import { queryStringToMongo } from '$lib/utils/query-params';

/* Accepts links as lines of text + links. Clean up the line before inserting the links */
export const GET = (async ({ url }) => {
	try {
		const mongoQuery = queryStringToMongo(url.search);

		const tenants = await TenantService.getTenants(mongoQuery);

		if (!tenants) {
			throw Error(404, 'Could not fetch data');
		}

		return json(tenants, { status: 200 });
	} catch (e) {
		console.error(e + 'Error == ' + JSON.stringify(e));
		return json(e, { status: 400 });
	}
}) satisfies RequestHandler;

// addTenants

/* Save tenants */
export const POST = (async ({ request }) => {
	try {
		// This code runs in the main thread
		const formData: Array<Tenant> = await request.json();
		console.log('Received new tenants= ' + JSON.stringify(formData));

		if (formData.length === 0) {
			throw Error(404, 'No tenants found. Post at least one tenant object in an array');
		}

		const savedTenants = await TenantService.addTenants(formData);
		console.log('Saved Tenants' + JSON.stringify(savedTenants));

		return json(savedTenants, { status: 201 });
	} catch (e) {
		console.log('Error == ' + e);
		return json(e, { status: 400 });
	}
}) satisfies RequestHandler;

/* Delete tenants */
export const DELETE = (async ({ url }) => {
	try {
		console.log('***** Query ==== ' + JSON.stringify(url.search));

		const { filter } = queryStringToMongo(url.search);

		// This code runs in the main thread
		//const catIds = await request.json();
		console.log('Deleting tenants= ' + JSON.stringify(filter));

		if (filter.length === 0) {
			throw Error(404, 'No tenants found for deletion. Post at least one tenant Id.');
		}

		const deletedTenants = await Tenant.deleteMany(filter);
		if (!deletedTenants) {
			throw Error(404, 'Could not delete tenants');
		}
		console.log('Deleted Cats ' + JSON.stringify(deletedTenants));

		return json(deletedTenants, { status: 201 });
	} catch (e) {
		console.log('Error == ' + e);
		return json(e, { status: 400 });
	}
}) satisfies RequestHandler;
