<script>
	import { WebUtils } from '$lib/utils/WebUtils';
	import { ImageUtils } from '$lib/utils/ImageUtils';
	import { page } from '$app/stores';

	export let contentTitle;
	export let baseImagePath = '/images/';

	// Code to ensure UI is refreshed when data changes
	export let data;
	export let selectedCat;

	let contentItems;

	// console.log('in cardsgrid ***** ' + contentItems?.length); // console.log('contentItems ***** ' + JSON.stringify(contentItems));
	let payloadWrapper;
	$: {
		// data = data;
		payloadWrapper = data.payload;
		contentItems = payloadWrapper?.payload.data;
		// selectedCat = contentItems?.length > 0 ? contentItems[0].categoryPath : selectedCat;
		contentTitle = $page.data.pageMetaTags?.title;
		// console.log(
		// 	'CardsGrid.Reactive: $page.data.pageMetaTags? = ' + JSON.stringify($page.data.pageMetaTags)
		// );
	}
</script>

<div>
	<!-- 
	<h3 class="page-title text-capitalize text-primary ml-10">{contentTitle}</h3>
	-->
	<div class="freelancers-container freelancers-grid-layout margin-top-20">
		{#if !contentItems || contentItems?.length == 0}
			<div class="alert alert-warning" role="alert">No content found for {contentTitle}</div>
		{:else}
			{#each contentItems || [] as content}
				<!--Freelancer -->
				<div class="freelancer pb-3">
					<a href="/startup-tools/{content.categoryPath}/{content.domain}">
						<!-- Overview -->
						<div class="m-2">
							<div class="text-success text-end">{content.domain}</div>
							<div class="freelancer-overview-inner">
								<img
									src="{baseImagePath}{content.domain}.jpeg"
									alt=""
									height="100%"
									width="100%"
									class="rounded"
								/>

								<!-- <a href="#" on:click={() => bookmark(content.url)}>
									<span class="bookmark-icon" /></a
								> -->
							</div>
						</div>
						<div class="row">
							<div class="freelancer-name ms-4 freelancer-overview-inner">
								<h4>
									{content.title}
								</h4>
								<span>{content.tagline}</span>
								<div class="freelancer-details-list pt-2">
									<ul class="m-0">
										{#each content.hashtags as tag, i}
											<li class="text-success m-0 px-1">{tag}</li>
										{/each}
									</ul>
								</div>
							</div>
						</div>
						<!-- Details -->
						<!-- <div class="freelancer-details py-2">
							<div class="freelancer-details-list bg">
								<ul>
									<li>Views: {content.viewCount}</li>
									<li />
									<li />
									<li />
									<li>Saved: {content.favCount}</li>
								</ul>
							</div>
						</div> -->
					</a>
				</div>
				<!-- Freelancer / End -->
			{/each}
		{/if}
	</div>
</div>
