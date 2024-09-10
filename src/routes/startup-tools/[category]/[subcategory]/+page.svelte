<script>
	import ContentPage from '../../ContentPage.svelte';
	import { page } from '$app/stores';

	export let data;

	// const pathSegments = $page.url.pathname.split('/');
	// const pageTitle = pathSegments[pathSegments.length - 1];
</script>

<ContentPage bind:data />
