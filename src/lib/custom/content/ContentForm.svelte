<script lang="ts">
	import { Button, Textarea, Modal, Label, Input, Checkbox } from 'flowbite-svelte';
	import { getContext } from 'svelte';

	export let formData: Link;
	export let isEdit = false;

	const submitHandler: any = getContext('submitHandler');

	function submit() {
		submitHandler.handleSubmit();
	}
</script>

<div class="m-1 text-left">
	<h3 class="mb-4 text-xl font-medium text-green-800 dark:text-white text-center">Add Content</h3>

	<form method="POST" on:submit|preventDefault={submit} class="flex flex-col space-y-2">
		{#if isEdit}
			<Label for="input-uid" class="space-y-2">
				<span>Tenant</span>
				<Input
					id="input-tenant"
					type="text"
					name="tenant"
					placeholder="tenant"
					required
					bind:value={formData.tenant}
				/>
			</Label>
			<Label for="input-cat" class="space-y-2">
				<span>Category</span>
				<Input
					id="input-cat"
					type="text"
					name="category"
					placeholder="category"
					required
					bind:value={formData.category}
				/>
			</Label>
			<Label for="input-subcat" class="space-y-2">
				<span>Sub Category</span>
				<Input
					id="input-sub"
					type="text"
					name="subcategory"
					placeholder="subcat"
					required
					bind:value={formData.subcategory}
				/>
			</Label>
		{/if}

		<Label for="input-url" class="space-y-2">
			<span>URL</span>
			<Input
				id="input-url"
				type="url"
				name="url"
				placeholder="https://someurl.com"
				required
				bind:value={formData.url}
			/>
		</Label>

		<Label for="input-title" class="mb-2">Title</Label>
		<Input
			id="input-title"
			type="text"
			placeholder="Title"
			name="title"
			bind:value={formData.title}
		/>

		<Label for="input-site" class="mb-2">Site Name</Label>
		<Input
			id="input-site"
			type="text"
			placeholder="Site name"
			name="siteName"
			bind:value={formData.siteName}
		/>

		<Label for="input-tags" class="mb-2">Tags</Label>
		<Input
			id="input-tags"
			type="text"
			placeholder="tag1, tag2, etc."
			name="tags"
			bind:value={formData.tags}
		/>

		<Label for="desc-id" class="mb-2">Description</Label>
		<Textarea
			id="desc-id"
			placeholder="Description"
			rows="4"
			name="description"
			bind:value={formData.description}
		/>

		<div class="flex justify-end pb-8">
			<Checkbox bind:checked={formData.published}>Publish</Checkbox>
			<a href="/" class="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
				>Preview Site</a
			>
		</div>
		<div class="flex justify-end gap-4">
			<Button outline color="red" type="reset" class="w-1/6">Reset</Button>
			<Button type="submit" class="w-2/6">Save</Button>
		</div>
	</form>
</div>
