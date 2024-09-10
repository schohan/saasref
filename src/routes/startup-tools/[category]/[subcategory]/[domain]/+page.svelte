<script>
	import { ImageUtils } from '$lib/utils/ImageUtils';
	import SimilarContentCards from '$lib/custom/content/SimilarContentCards.svelte';
	import { goto } from '$app/navigation';

	export let data;
	let content = data.payload.data;
	// export let pageTitle = content.categoryPath + ' ' + content.title;
	//let pageMetaTags;
	export let baseImagePath = data?.config.baseImagePath ? data?.config.baseImagePath : '/images/';

	$: {
		content = data.payload.data;
		//pageMetaTags = data.pageMetaTags;
	}
</script>

<!-- 
<svelte:head>
	<title>{pageMetaTags.title}</title>
</svelte:head> -->

<div class="single-page-header">
	<div class="container">
		<div class="row">
			<div class="col-md-12">
				<div class="single-page-header-inner">
					<div class="left-side">
						<div class="header-image">
							<a href={content.url + '?' + data?.config?.refSuffix} target="_blank" rel="noopener"
								><img src={baseImagePath + content.domain + '.jpeg'} alt={content.domain} /></a
							>
						</div>
						<div class="header-details text-wrap">
							<h3>
								<a href={content.url + '?' + data?.config?.refSuffix} target="_blank" rel="noopener"
									>{content.title}</a
								>
							</h3>
							<h5>{content.tagline}</h5>
							<div class="mt-4">
								<ul>
									{#each content.hashtags as tag}
										<li>
											<!-- <a href="/search?q={tag}" class=""> -->
											<span class="badge badge-success text-success border border-success"
												>{tag}</span
											>
											<!-- </a> -->
										</li>
									{/each}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- content -->
<div class="container">
	<div class="mb-5">
		<button
			type="button"
			class="btn btn-secondary"
			on:click={() => goto('/startup-tools/' + content.categoryPath)}
			><i class="icon-material-outline-keyboard-arrow-left" />Go back</button
		>
	</div>
	<div class="row">
		<!-- Content -->
		<div class="col-xl-8 col-lg-8 content-right-offset">
			<div class="single-page-section">
				<h3 class="margin-bottom-25">About {content.domain}</h3>
				<div>
					{#each content.summary as summaryPara}
						<p>{@html summaryPara}</p>
					{/each}
				</div>
				<br />
				<h3>Key Features</h3>
				<div>
					<ul>
						{#each content.features as feature}
							<li>{@html feature}</li>
						{/each}
					</ul>
				</div>
			</div>

			<div class="single-page-section">
				<!-- <h3 class="margin-bottom-25">(Ads down here)</h3> -->
				<hr />
				<a href={content.url + '?' + data?.config?.refSuffix} target="_blank" rel="noopener">
					<h2>{content.domain}</h2>
					<img src={baseImagePath + content.domain + '.jpeg'} alt={content.domain} />
				</a>

				<SimilarContentCards bind:baseImagePath bind:similarTo={content} />
			</div>
		</div>

		<!-- Sidebar -->
		<div class="col-xl-4 col-lg-4">
			<div class="sidebar-container">
				<a
					href={content.url + '?' + data?.config?.refSuffix}
					target="_blank"
					rel="noopener"
					class="apply-now-button popup-with-zoom-anim"
					>Visit Now <i class="icon-material-outline-arrow-right-alt" /></a
				>
				<!-- <div>(ad)</div> -->
				<!-- Sidebar Widget -->
				<!-- <div class="sidebar-widget">
					<div class="job-overview">
						<div class="job-overview-headline">Summary</div>
						<div class="job-overview-inner">
							<ul>
								<li>
									<i class="icon-material-outline-location-on" />
									<span></span>
									<h5>London, United Kingdom</h5>
								</li>
								<li>
									<i class="icon-material-outline-business-center" />
									<span>Job Type</span>
									<h5>Full Time</h5>
								</li>
								<li>
									<i class="icon-material-outline-local-atm" />
									<span>Salary</span>
									<h5>$35k - $38k</h5>
								</li>
								<li>
									<i class="icon-material-outline-access-time" />
									<span>Date Posted</span>
									<h5>2 days ago</h5>
								</li>
							</ul>
						</div>
					</div>
				</div> -->

				<!-- Sidebar Widget -->
				<div class="sidebar-widget">
					<!-- <h3>Bookmark or Share</h3> -->

					<!-- Bookmark Button -->
					<!-- <button class="bookmark-button margin-bottom-25">
						<span class="bookmark-icon" />
						<span class="bookmark-text">Bookmark</span>
						<span class="bookmarked-text">Bookmarked</span>
					</button> -->

					<!-- Copy URL -->
					<!-- <div class="copy-url">
						<input id="copy-url" type="text" value="" class="with-border" />
						<button
							class="copy-url-button ripple-effect"
							data-clipboard-target="#copy-url"
							title="Copy to Clipboard"
							data-tippy-placement="top"><i class="icon-material-outline-file-copy" /></button
						>
					</div> -->

					<!-- Share Buttons -->
					<!-- <div class="share-buttons margin-top-25">
						<div class="share-buttons-trigger"><i class="icon-feather-share-2" /></div>
						<div class="share-buttons-content">
							<span>Interesting? <strong>Share It!</strong></span>
							<ul class="share-buttons-icons">
								<li>
									<a
										href="#"
										data-button-color="#3b5998"
										title="Share on Facebook"
										data-tippy-placement="top"><i class="icon-brand-facebook-f" /></a
									>
								</li>
								<li>
									<a
										href="#"
										data-button-color="#1da1f2"
										title="Share on Twitter"
										data-tippy-placement="top"><i class="icon-brand-twitter" /></a
									>
								</li>
								<li>
									<a
										href="#"
										data-button-color="#dd4b39"
										title="Share on Google Plus"
										data-tippy-placement="top"><i class="icon-brand-google-plus-g" /></a
									>
								</li>
								<li>
									<a
										href="#"
										data-button-color="#0077b5"
										title="Share on LinkedIn"
										data-tippy-placement="top"><i class="icon-brand-linkedin-in" /></a
									>
								</li>
							</ul>
						</div>
					</div> -->
				</div>
			</div>
		</div>
	</div>
</div>
