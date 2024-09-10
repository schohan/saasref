<script lang="ts">
	import { Button, Textarea, Modal, Label, Input, Checkbox } from 'flowbite-svelte';
	import toast from 'svelte-french-toast';
	//import { selCategory } from '$lib/stores/appstate.store';
	import ContentForm from './ContentForm.svelte';
	import { setContext } from 'svelte';
	import { stringToArray } from '$lib/utils/string-utils';

	export let size = 'xs';

	/* Weather this is new data or old */
	const newForm = {
		url: '',
		title: '',
		//category: $selCategory?.category,
		tags: '',
		description: '',
		published: false
	};

	/* export let formModal = {
		show: false,
		isNew: true
	}; */
	export let newFormModal = false;

	export let formData = {};

	let bulkLinkText = '';

	/* Handles single link post and put calls */
	async function handleSubmit() {
		let url = '/api/content';

		const resp = await fetch(url, {
			method: 'POST',
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
			newFormModal = false;
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
		let url = '/api/content/bulk';

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
			newFormModal = false;
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
<Modal bind:open={newFormModal} bind:size autoclose={false} class="w-full">
	<span>Add URLs</span>
	<p>Paste or Type URLs. One per line.</p>
	<form id="linksForm" method="POST" on:submit|preventDefault={handleBulkSubmit}>
		<Label for="links" class="mb-2">New Links</Label>
		<Textarea
			bind:value={bulkLinkText}
			id="links"
			name="links"
			rows="6"
			class="textarea h-72 w-full textarea-bordered whitespace-nowrap overflow-scroll"
			placeholder="Type or copy/paste URLs."
			autocomplete="off"
		/>

		<div class="flex justify-end gap-x-4">
			<Button outline color="red" type="reset" class="w-1/6">Clear</Button>
			<Button type="submit" class="self-center w-2/6">Save</Button>
		</div>
	</form>
</Modal>
