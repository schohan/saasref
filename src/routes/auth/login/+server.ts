import { json } from '@sveltejs/kit';
import { Payload } from '$lib/commonjs/helpers/Payload';
import { AuthUtils } from '$lib/commonjs/auth/auth-utils';

/**
 * Login user
 */
export const POST = (async ({ request, locals }) => {
	const { email, password } = await request.json();
	console.log('Login- User:' + email + ', IP:' + locals.ip);

	const { pubJson, cookie } = await AuthUtils.login(email, password);
	const payload = new Payload(pubJson);
	console.log('payload:' + JSON.stringify(payload));
	console.log('cookie:' + JSON.stringify(cookie));

	return json(payload, { status: 201, headers: { 'Set-Cookie': cookie } });
}) satisfies RequestHandler;
