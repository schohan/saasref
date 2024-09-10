<script>
	/** @type {import('./$types').PageData} */
	export let data;
	let newUrls;
	let notProcessed;

	async function add() {
		const urlsAsJson = JSON.parse(newUrls);
		console.log('processing URLs ' + JSON.stringify(urlsAsJson));
		notProcessed = [];
		try {
			const res = await fetch('/api/admin/content/staged', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(urlsAsJson)
			});
			console.log('res.ok = ' + res.ok);

			const respJson = await res.json();
			const payload = respJson.payload;

			console.log(`\n\n Processed?   ` + JSON.stringify(payload.processed));
			notProcessed = payload?.notProcessed;
		} catch (error) {
			console.log('Could not process ', error);
			console.log(error);
			return {};
		}
	}
</script>

<div class="container margin-top-25">
	<h3 class="page-title text-capitalize text-primary ml-10">Add Content</h3>
	{#if notProcessed}
		<div class="alert alert-warning" role="alert">
			Not Processed:
			<p>
				{JSON.stringify(notProcessed)}
			</p>
		</div>
	{/if}
	<label>
		URLs
		<textarea name="urls" type="urls" rows="15" bind:value={newUrls} />
	</label>

	<button type="button" on:click={add} class="btn btn-primary">Add URLs</button>
</div>
