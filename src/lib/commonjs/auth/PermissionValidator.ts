// import { Permissions } from '$lib/schemas/permission.model';
import { Config } from '$lib/config/appConfig';
import { User, DEFAULT_ROLE } from '$lib/models/User.model';

// http methods for accessing resources
export enum HTTP_VERB {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE',
	PATCH = 'PATCH'
}

/**
 * Permission validator manages resource access permissions in a Map format
 * By default, permissions are coarse grained and roles are limited to
 * sysadmin, orgadmin, and orguser.
 */
export class PermissionValidator {
	private static permissionMap: Map<string, Array<string>> = new Map<string, Array<string>>();

	/**
	 * Add route path and permissions to the permissions map
	 *
	 * @param httpVerb GET, POST, PUT, DELETE, PATCH
	 * @param path  string
	 * @param roles Array<string>
	 */
	static addRoutePermission(path: string, httpVerbs: Array<HTTP_VERB>, roles: Array<DEFAULT_ROLE>) {
		httpVerbs.forEach((verb: string) => {
			const key: string = verb + Config.baseApiPath + PermissionValidator.replaceDynamicPath(path);
			//console.log('adding roles ' + roles + ' to path: ' + key);
			// console.log('PermissionValidator.permissionMap ' + PermissionValidator.permissionMap);

			PermissionValidator.permissionMap.set(key, roles);

			// console.log(
			// 	'After adding, permissionMap ' + JSON.stringify(PermissionValidator.permissionMap.get(key))
			// );

			// console.log(
			// 	'2 After adding, permissionMap ' +
			// 		JSON.stringify(Array.from(PermissionValidator.permissionMap.entries()))
			// );
		});
	}

	static getPermissions(path: string, httpVerb: string): object {
		const key = httpVerb + Config.baseApiPath + PermissionValidator.replaceDynamicPath(path);

		console.log('getPermissions key ' + key);
		console.log(
			'httpVerb + Config.baseApiPath ' +
				httpVerb +
				Config.baseApiPath +
				PermissionValidator.replaceDynamicPath(path)
		);

		//const keys = PermissionValidator.permissionMap.keys();
		// for (let i = 0; i < PermissionValidator.permissionMap.size; i++) {
		// 	const key = keys.next();

		// 	console.log(
		// 		'key ' + JSON.stringify(key.value) + ' Value: ' + PermissionValidator.permissionMap.get(key)
		// 	);
		// }

		return PermissionValidator.permissionMap.get(key);
	}

	static isAuthorized(path: string, httpVerb: string, user: User): boolean {
		if (!httpVerb || !path) {
			throw Error('Invalid input. All parameters are required.');
		}
		const key = httpVerb + Config.baseApiPath + path;

		console.log('Is User ' + user?.email + ' authorized to access key:' + key);
		console.log('user role: ' + user.role);

		const userRole: string = user ? user.role?.role : DEFAULT_ROLE.ANONYMOUS;
		// if path doesn't exist, allow everyone
		if (!PermissionValidator.permissionMap.has(key)) {
			console.log('Route not found ' + key);
			return true;
		}

		const allowedRoles = PermissionValidator.permissionMap.get(key);
		console.log('Roles: ' + allowedRoles);

		if (allowedRoles && allowedRoles.includes(userRole)) {
			console.log('User: ' + user + ' is allowed to access: ' + path);
			return true;
		}
		return false;
	}

	// replace paths like /a/[:someid]/b with /a/?/b for easy matching of routes
	static replaceDynamicPath(path: string) {
		return path.replace(/\[[^\]]+\]/g, '?');
	}

	static toString(): string {
		return JSON.stringify(PermissionValidator.permissionMap);
	}
}
