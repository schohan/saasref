<script>
	import Header from '$lib/custom/app/Header.svelte';
	import Footer from '$lib/custom/app/Footer.svelte';
	import { page } from '$app/stores';
	import { MetaTags } from 'svelte-meta-tags';
	import _ from 'lodash';

	export let data;
	let metaTags;

	$: {
		metaTags = _.merge(data.baseMetaTags, $page.data.pageMetaTags);
	}
	// console.log(' Navs == ' + JSON.stringify(data));
</script>

<svelte:head>
	{#if data.config.env === 'prod' || data.config.env === 'production'}
		<script async src="https://www.googletagmanager.com/gtag/js?id=G-0G237VMLKY"></script>
		<script>
			window.dataLayer = window.dataLayer || [];
			function gtag() {
				dataLayer.push(arguments);
			}
			gtag('js', new Date());
			gtag('config', 'G-0G237VMLKY');
		</script>
		<meta name="google-adsense-account" content="ca-pub-1096034639157049" />
		<script
			async
			src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1096034639157049"
			crossorigin="anonymous"
		></script>
	{/if}
</svelte:head>

<MetaTags {...metaTags} />
<Header navs={data.navs} />

<slot />
<Footer />

<!-- https://forms.gle/VZcJ3aKd82jwP1k1A -->
