// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}

	/*
	 * Link interface
	 * Note: Manual description if present will be used for display.
	 */

	interface Link {
		url: string;
		tags: [string];
		linkStatus: string;
		title: string;
		domain: string;
		description: string;
		createdAt: Date;
		updatedAt: Date;
	}
}

export {};
