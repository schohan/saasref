import { Tenant } from '$lib/models/Tenant.model';
import { GenericDataService } from '$lib/commonjs/GenericDataService';
import type { AqpQuery } from 'api-query-params';

export const TenantService = {
	async getTenants(filter: AqpQuery): Array<Tenant> {
		console.log('in Tenant: ' + filter);

		const data: Array<Category> = await GenericDataService.fetchData(filter, Tenant);
		return data;
	},

	/* Add tenants */
	async addTenants(tenantArr: Array<Tenant>): Array<Tenant> {
		// console.log('Adding categories ' + cats);

		const savedTenants = await Tenant.insertMany(tenantArr);
		if (!savedTenants) {
			throw Error(404, 'Could not save data');
		}
		return savedTenants;
	}
};
