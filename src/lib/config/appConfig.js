/* All of Application Configuration should be managed here */
export let AppConfig = {
	env: process.env['NODE_ENV'] || 'dev',
	dbUrl: process.env['DB_URL'] || 'mongodb://127.0.0.1:27017/content-service',
	baseUrl: process.env['HOST'] || process.env['ORIGIN'] || 'http://localhost:3000',
	prodUrl: process.env['PROD_URL'] || 'https://localhost:3000',
	apiUrl: process.env['API_URL'] || 'http://localhost:3100',
	baseImagePath: process.env['BASE_IMAGE_PATH'] || "/static/screenshots/",
	baseImagePathLocal: '/static/screenshots/',
	cloudBucketName: 'web-content-images',
	cloudScreenshotsPath: 'images/startup-kit/screenshots',
	secrets: {
		// This is for JWT
		jwt: process.env['JWT_SECRET'] || 'some-jwt-secret',
		jwtExp: process.env['JWT_EXP'] || '60d',
		cookieMaxAge: process.env['COOKIE_MAXGE'] || 3600 * 24 * 30, // 30 days,
		encSecret: process.env['ENC_SECRET'] || 'some-enc-secret',
		serviceAccountKeyJson: process.env['SERVICE_ACCOUNT_KEY_JSON'],
		googleGenAIKey: process.env['GOOGLE_GEN_AI_KEY'] || 'some-google-gen-ai-key',
	},
	email: {
		sendInvitationMail: process.env['SEND_INVITATION_EMAIL'] || false,
		mailjetKey: process.env.MAILJET_KEY || '',
		mailjetSecret: process.env.MAILJET_SECRET || '',
		fromAddress: 'noreply@noreply.com'
	},
	authUrls: {
		resetUrl: null,
		activateUrl: null,
		inviteUrl: null,
		expAfterHours: 72
	},
	analytics: {
		refSuffix: process.env['ANALYTICS_REF_SUFFIX'] || 'ref=mydomain.com',
		googleTag: 'google-analytics-id'
	},
	pagination: {
		defaultLimit: 6
	}
};

console.log("process.env['NODE_ENV'] " + process.env['NODE_ENV']);
console.log('Database ' + AppConfig.dbUrl);
