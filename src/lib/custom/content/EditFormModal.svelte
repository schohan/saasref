<script lang="ts">
	import { Modal } from 'flowbite-svelte';
	import toast from 'svelte-french-toast';
	import ContentForm from './ContentForm.svelte';
	import { setContext } from 'svelte';
	import { stringToArray } from '$lib/utils/string-utils';

	export let size = 'xs';

	/* Weather this is new data or old */
	const newForm = {
		tenant: '',
		category: '',
		subcategory: '',
		url: '',
		title: '',
		siteName: '',
		tags: '',
		description: '',
		published: false
	};

	export let editFormModal = false;
	export let formData = {};

	let bulkLinkText = '';

	/* Handles single link post and put calls */
	async function handleSubmit() {
		let url = '/api/content/' + formData._id;

		const resp = await fetch(url, {
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(formData)
		});
		const respJson = await resp.json();
		//console.log(resp.ok + '  -- RESPONSE === ' + JSON.stringify(respJson));

		if (resp.ok) {
			console.log('Saved Form' + JSON.stringify(respJson));
			editFormModal = false;
			formData = { ...respJson };
			toast.success('Form saved! ');
			// formData = newForm;
		} else {
			console.log('Could not save posted form ' + respJson.message);
			toast.error(`${respJson.message}`);
			/* $toastText = 'Could not save form. Error. ' + respJson.message;
			$showToast = true; */

			// $toast = { timeout: 5, message: 'Error ' + respJson.message };
		}
	}

	/* Handles bulk inserts */
	async function handleBulkSubmit() {
		let url = '/api/content';

		const urls = bulkLinkText.split(/\r?\n/);

		let bulkUrls = stringToArray(urls).map((url) => {
			return { url };
		});
		console.log(' === PostData ==  ' + JSON.stringify(bulkUrls));

		const resp = await fetch(url, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(bulkUrls)
		});
		const respJson = await resp.json();

		console.log(resp.ok + '  -- RESPONSE === ' + JSON.stringify(respJson));

		if (resp.ok) {
			console.log('Saved Data ' + JSON.stringify(respJson));
			editFormModal = false;
			formData = { ...respJson };
			toast.success('Form saved! ');
			// formData = newForm;
		} else {
			console.log('Could not save posted form ' + respJson.message);
			toast.error(`${respJson.message}`);
		}
	}

	setContext('submitHandler', {
		handleSubmit
	});
</script>

<!-- on:submit|preventDefault={handleSubmit} action="/api/content"-->
<Modal bind:open={editFormModal} bind:size autoclose={false} class="w-full">
	<ContentForm bind:formData isEdit={true} />
</Modal>
