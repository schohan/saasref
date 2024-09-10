<script>
	import { Card } from 'flowbite-svelte';
	export let title;
	export let desc;
	export let url;
	export let size = 'md';
</script>

<Card {size} href="/cards">
	<a href={url} class="" target="_blank">
		<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
			{title}
		</h5>
		<p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">
			{desc}
		</p>

		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="w-5 h-5 ml-2"
			><path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
			/></svg
		>
	</a>
</Card>
