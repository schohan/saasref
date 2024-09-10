import type { PlaywrightTestConfig } from '@playwright/test';


const config: PlaywrightTestConfig = {
	use: {
		// All requests we send go to this API endpoint.
		baseURL: 'http://localhost:5173',
		extraHTTPHeaders: {
		  // We set this header per GitHub guidelines.
		  'Accept': 'application/vnd.github.v3+json',
		  'Authorization': `token [dummyapitoken]`,
		},
		webServer: {
			command: 'npm run build && npm run preview',
			port: 4173
		}
	},
	testDir: 'tests',
	testMatch: /(.+\.)?(test|spec)\.[jt]s/
};

export default config;
