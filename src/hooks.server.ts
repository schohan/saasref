import { AppConfig } from '$lib/config/appConfig';
import '$lib/config/db.js';
import cookie from 'cookie';
import { SessionTokenizer } from '$lib/utils/security.js';

export async function handle({ event, resolve }) {
	const cookies = cookie.parse(event.request.headers.get('cookie') || '');
	// Set session data in locals
	event.locals.cookies = cookies ? cookies : null;
	event.locals.ip = event.clientAddress;
	let userData = null;

	try {
		if (cookies.token) {
			userData = await SessionTokenizer.extractPayload(cookies.token);

			// Set session data in locals
			event.locals.user = userData; // add userData + other cookiesata;
		}
	} catch (err) {
		console.error('Cannot create session:' + err);
	}

	// if (event.url.pathname.startsWith('/custom')) {
	// 	return new Response('custom response');
	// }

	const response = await resolve(event);
	return response;
}
