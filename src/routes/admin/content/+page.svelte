<script>
	// @ts-nocheck

	export let data;
	let baseImagePathLocal = data.config?.baseImagePathLocal; // assign base image path to own variable as data will be overridden
	let categories = data.categories;

	const stagedContent = data?.payload?.data;

	let editingContent;
	let toSave;

	$: {
		editingContent = stagedContent
			? stagedContent[0]
			: {
					url: '',
					title: '',
					tagline: '',
					hashtags: '',
					features: '',
					summary: ''
			  };

		//console.log('editingContent ' + JSON.stringify(editingContent));
	}

	async function publish() {
		console.log('publishing processed URLs');

		try {
			const res = await fetch('/api/admin/content/staged/process?action=publish', {
				method: 'PUT',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				}
			});
			if (res.ok) {
				console.log(`\n\n Published?   ` + res.statusText);
			} else throw Error(res.statusText);
		} catch (error) {
			console.log('Could not publish ');
			console.log(error);
			return {};
		}
	}

	async function snapshots(fetchOne = false) {
		let url = '/api/admin/content/staged/process?action=screenshot';
		console.log('Fetch ONE ' + fetchOne);
		if (fetchOne) {
			url += '&url=' + editingContent.url;
		}
		console.log('Fetching images: ' + url);
		try {
			const res = await fetch(url, {
				method: 'PUT',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				}
			});
			if (res.ok) {
				console.log(`\n\n Getting Screenshots  ` + res.statusText);
			} else throw Error(res.statusText);
		} catch (error) {
			console.log('Could not get screenshots: ' + url);
			console.log(error);
			return {};
		}
	}

	async function generate() {
		console.log('Processing added urls');
		//
		try {
			const res = await fetch('/api/admin/content/staged/process', {
				method: 'PUT',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				}
			});
			if (res.ok) {
				console.log(`\n\n Processing kicked off ` + res.statusText);
			} else throw Error(res.statusText);
		} catch (error) {
			console.log('Could not delete: ' + url);
			console.log(error);
			return {};
		}
	}

	async function del() {
		const conf = confirm('Delete: ' + editingContent.url);
		if (!conf) return;

		console.log('Deleting ' + editingContent.url);
		let url = '/api/admin/content/staged?_id=' + editingContent._id;
		try {
			const res = await fetch(url, {
				method: 'DELETE',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				}
			});
			if (res.ok) {
				console.log(`\n\n ${editingContent.url}  DELETED `);
			} else throw Error(res.statusText);
		} catch (error) {
			console.log('Could not delete: ' + url);
			console.log(error);
			return {};
		}
	}

	async function save() {
		console.log('Saving ' + editingContent?.url);
		let contentPath = '/api/admin/content/staged?_id=' + editingContent._id;

		const url = `${contentPath}`;

		toSave = {
			url: editingContent.url,
			title: editingContent.title,
			tagline: editingContent.tagline,
			hashtags: editingContent.hashtags,
			features: editingContent.features,
			summary: editingContent.summary
		};
		console.log('\n\n----->>> Saving ' + JSON.stringify(toSave));
		try {
			const res = await fetch(url, {
				method: 'PUT',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(toSave)
			});
			if (res.ok) {
				console.log(
					'\n\n--------- getStagedContent: Content Received in DataLoader.js = ' +
						JSON.stringify(toSave)
				);
			} else throw Error(res.statusText);
		} catch (error) {
			console.log('Could not fetch content: ' + url);
			console.log(error);
			return {};
		}
	}
</script>

{#if !editingContent}
	<div class="alert alert-warning" role="alert">No new content has been added.</div>
{:else}
	<div class="container-fluid mt-4">
		<div class="row">
			<div class="col-4 overflow">
				<div>
					<p>URLs Count: {stagedContent.length}</p>
				</div>
				<div class="list-group">
					{#each stagedContent as content}
						<button
							type="button"
							on:click={() => (editingContent = content)}
							class="list-group-item list-group-item-action"
						>
							{content.url} |
							<span class="ps-2">
								<a href={editingContent.url} target="_blank" rel="noopener">Open Link</a></span
							>
						</button>
					{/each}
				</div>
			</div>
			<div class="col-8">
				<div class="d-flex justify-content-end m-2 px-4">
					<button
						type="button"
						class="btn btn-secondary btn-md mx-2 px-4"
						on:click={() => snapshots(true)}>Snapshots for Selected</button
					>
					<button
						type="button"
						class="btn btn-secondary btn-md mx-2 px-4"
						on:click={() => snapshots()}>Snapshots (All Added)</button
					>
					<button type="button" class="btn btn-secondary btn-md mx-2 px-4" on:click={generate}
						>Generate Summary (All)</button
					>
					<button type="button" class="btn btn-primary btn-md mx-2 px-4" on:click={save}
						>Save Current</button
					>
					<button type="button" class="btn btn-primary btn-md mx-2 px-4" on:click={del}
						>Delete Current</button
					>
					<button type="button" class="btn btn-success btn-md mx-2 px-4" on:click={publish}
						>Publish All Processed</button
					>
				</div>
				<div class="input-group my-5">
					<div class="input-group-prepend">
						<span class="input-group-text"
							>Screenshot ( See {baseImagePathLocal}{editingContent.domain})</span
						>
						<img src="/screenshots/{editingContent.domain}.jpeg" alt="" />
					</div>
				</div>

				<label for="basic-url"
					>Title ( <a href={editingContent.url} target="_blank" rel="noopener"
						>{editingContent.url}</a
					>
					)
				</label>
				<div class="input-group mb-3">
					<input
						type="text"
						class="form-control"
						id="basic-url"
						aria-describedby="basic-addon3"
						bind:value={editingContent.url}
					/>
				</div>
				<label for="image">Image Name</label>
				<div class="input-group mb-3">
					<input
						type="text"
						class="form-control"
						id="image"
						aria-describedby="image"
						bind:value={editingContent.imageName}
					/>
				</div>
				<label for="status">Status</label>
				<div class="input-group mb-3">
					<input
						type="text"
						class="form-control"
						id="status"
						aria-describedby="status"
						bind:value={editingContent.status}
					/>
				</div>
				<label for="catPath">Category Path</label>
				<div class="input-group mb-3">
					<input
						type="text"
						class="form-control"
						id="catPath"
						aria-describedby="catPath"
						bind:value={editingContent.categoryPath}
					/>
				</div>
				<div class="input-group-prepend">
					<span class="input-group-text">Web Tool</span>
				</div>
				<div class="input-group mb-3">
					<input
						type="text"
						class="form-control"
						placeholder="URL"
						aria-label="url"
						aria-describedby="basic-addon1"
						bind:value={editingContent.url}
					/>
				</div>

				<label for="basic-url">Tagline</label>
				<div class="input-group mb-3">
					<input
						type="text"
						class="form-control"
						id="basic-url"
						aria-describedby="basic-addon3"
						bind:value={editingContent.tagline}
					/>
				</div>

				<label for="basic-url">Tags</label>
				<div class="input-group mb-3">
					<input
						type="text"
						class="form-control"
						id="basic-url"
						aria-describedby="basic-addon4"
						bind:value={editingContent.hashtags}
					/>
				</div>

				<div class="input-group-prepend">
					<span class="input-group-text">Features</span>
				</div>
				<div class="input-group">
					<textarea
						bind:value={editingContent.features}
						class="form-control"
						aria-label="With textarea"
						rows="10"
					/>
				</div>

				<div class="input-group-prepend">
					<span class="input-group-text">Summary Text</span>
				</div>
				<div class="input-group">
					<textarea
						bind:value={editingContent.summary}
						class="form-control"
						aria-label="With textarea"
						rows="10"
					/>
				</div>

				<!-- <div class="input-group mb-3">
					<div class="input-group-prepend">
						<span class="input-group-text" id="basic-addon5">Screenshot</span>
					</div>
					<img src="{baseImagePathLocal}{editingContent?.domain}.jpeg" alt="Image" />
					<img src="{baseImagePathLocal}copied/{editingContent?.domain}.jpeg" alt="Image" />
				</div> -->
				<!-- <label for="basic-url">Your vanity URL</label>
			<div class="input-group mb-3">
				<div class="input-group-prepend">
					<span class="input-group-text" id="basic-addon3">https://example.com/users/</span>
				</div>
				<input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3" />
			</div>

			<div class="input-group mb-3">
				<div class="input-group-prepend">
					<span class="input-group-text">$</span>
				</div>
				<input type="text" class="form-control" aria-label="Amount (to the nearest dollar)" />
				<div class="input-group-append">
					<span class="input-group-text">.00</span>
				</div>
			</div> -->
			</div>
		</div>
	</div>
{/if}
