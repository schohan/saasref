<script>
	import SimpleCard from '$lib/common-components/cards/SimpleCard.svelte';

	// PageData coming from page.ts
	export let data;
	export const links = data.links;
</script>

<div>
	
	<!-- {JSON.stringify(links)} -->
	<div class="grid grid-cols-1 md:grid-cols-2 justify-center gap-2">
		{#each links as link}
			<div class="min-w-fit">
				<SimpleCard size="xl" title={link.title} desc={link.description} url={link.url} />
			</div>
		{/each}
	</div>
</div>
