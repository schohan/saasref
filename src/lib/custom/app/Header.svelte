<script>
	import Favorites from './Favorites.svelte';
	import { onMount } from 'svelte';

	import { goto } from '$app/navigation';

	export let navs;

	function go(href) {
		goto(href);
	}

	onMount(async () => {});
</script>

<!-- Header Container
	================================================== -->
<header id="header-container" class="fullwidth">
	<!-- Header -->
	<div id="header">
		<div class="container">
			<!-- Left Side Content -->
			<div class="left-side">
				<!-- Logo -->
				<div id="logo">
					<a href="/">
						<!-- <p class="text-red-400">{navs.logo.text}</p> -->
						<img src={navs.logo.img} alt="Startup Sparks" />
					</a>
				</div>

				<!-- Main Navigation -->
				<nav id="navigation">
					<ul id="responsive">
						{#each navs.items?.common as navItem}
							<li>
								<a
									href={navItem.href}
									on:click|preventDefault={() => go(navItem.href)}
									class="mt-1 current text-white"
									>{navItem.text}
								</a>
							</li>
						{/each}
					</ul>
				</nav>
				<div class="clearfix" />
				<!-- Main Navigation / End -->
			</div>
			<!-- Left Side Content / End -->

			<!-- Right Side Content / End -->
			<div class="right-side">
				<span class="black">
					<div class="header-widget">
						<Favorites />
					</div>
				</span>

				<span class="mmenu-trigger">
					<button class="hamburger hamburger--collapse" type="button">
						<span class="hamburger-box">
							<span class="hamburger-inner" />
						</span>
					</button>
				</span>
			</div>

			<!-- Right Side Content / End -->
		</div>
	</div>
	<!-- Header / End -->
</header>
<div class="clearfix" />

<!-- Header Container / End -->

<style>
	a {
		@apply mt-1;
	}
</style>
