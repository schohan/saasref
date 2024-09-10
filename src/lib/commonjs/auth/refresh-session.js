import { config } from '$config/config.js';

export async function put({ locals, body }) {
    locals.session.refresh(config.sessionExpiration);

    return {
      body: locals.session.data
    };
  }