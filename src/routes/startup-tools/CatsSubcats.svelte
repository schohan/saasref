<script>
	// @ts-nocheck
	export let categories;
	export let baseUrl = '/startup-tools';
	export let pageTitle = 'All Tools';
	export let selectedCat = ''; // for navigation

	$: {
		categories = categories;
	}
</script>

<!-- Dashboard Container -->

<div class="dashboard-sidebar overflow-auto vh-100">
	<div class="dashboard-sidebar-inner">
		<div class="dashboard-nav-container">
			<!-- Responsive Navigation Trigger -->
			<!-- TODO Fix it for the mobile -->
			<a href="#" class="dashboard-responsive-nav-trigger">
				<span class="hamburger hamburger--collapse">
					<span class="hamburger-box">
						<span class="hamburger-inner" />
					</span>
				</span>
				<span class="trigger-title">Categories</span>
			</a>

			<!-- Navigation -->
			<div class="dashboard-nav">
				<div class="dashboard-nav-inner">
					{#each categories as cat}
						<ul>
							<li class="mt-2">
								<a
									href="{baseUrl}/{cat.uid}"
									on:click={() => {
										pageTitle = cat.title;
										selectedCat = cat.uid;
									}}
								>
									<h3 class="text-primary" class:border-bottom={cat.uid === selectedCat}>
										{cat.title}
									</h3>
								</a>
							</li>
							{#each cat?.subcategories as subcategory}
								<li>
									<a
										href="{baseUrl}/{cat.uid}/{subcategory.uid}"
										on:click={() => {
											pageTitle = subcategory.title;
											selectedCat = cat.uid + '/' + subcategory.uid;
										}}
									>
										<!-- <i class="icon-material-outline-business-center" /> -->
										<span
											class="border-2"
											class:border-bottom={cat.uid + '/' + subcategory.uid === selectedCat}
										>
											{subcategory.title}
										</span>
									</a>
								</li>
							{/each}
						</ul>
					{/each}
				</div>
			</div>
			<!-- Navigation / End -->
		</div>
	</div>
</div>
<!-- Dashboard Sidebar / End -->
