import { json } from '@sveltejs/kit';
import { Payload } from '$lib/commonjs/helpers/Payload';

/**
 * Logout user
 */
export const POST = async ({ request, locals }) => {
	console.log('Logout- User:' + locals.user?.email + ', username:' + locals.user?.name);
	const userName = locals.user?.name;
	let message = 'You are not logged in';

	// handle logged in user
	if (userName) {
		message = userName + ' successfully logged out!';
		if (locals.session) {
			locals.session = null;
		}
		const cookie = ['token=deleted; Path=/; HttpOnly; Max-Age=0'];
		return json(new Payload({ message }), { status: 200, headers: { 'Set-Cookie': cookie } });
	}
	// handle not logged in user
	return json(new Payload({ message }), { status: 400 });
};
