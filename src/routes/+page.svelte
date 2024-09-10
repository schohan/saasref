<script>
	import { goto } from '$app/navigation';
	import { ImageUtils } from '$lib/utils/ImageUtils.js';

	export let data;
	export let baseImagePath = data?.config?.baseImagePath; // TODO get this value from client configuration
	const featuredCategories = data?.featuredCats;
	const featuredTools = data.featuredTools;
	// console.log('-->>featuredCategories in page ' + JSON.stringify(featuredCategories));
	// console.log('==>> featuredTools ' + JSON.stringify(featuredTools));
</script>

<svelte:head>
	<title>Startup Sparks - Tools and Services to help you ideate, build and run your Startup</title>
</svelte:head>

<!-- Intro Banner
================================================== -->
<!-- add class "disable-gradient" to enable consistent background overlay -->
<div class="intro-banner" data-background-image="/images/home-background.jpg">
	<div class="container">
		<!-- Intro Headline -->
		<div class="row">
			<div class="col-md-12">
				<div class="banner-headline">
					<h3>
						<strong> Fueling success for Solopreneurs and Founders!</strong>
						<br />
						<span>
							Discover curated tools and services that can <strong class="color">
								propel your venture forward.</strong
							>
						</span>
					</h3>
				</div>
			</div>
		</div>

		<!-- Search Bar -->
		<div class="row">
			<div class="col-md-12">
				<!-- <div class="intro-search-button mt-4">
					<button on:click={() => goto('/admin/content')} class="button ripple-effect">Admin</button
					>
				</div> -->
				<!--
				<div class="intro-banner-search-form margin-top-95">										
					 <div class="intro-search-field with-autocomplete">
						<label for="autocomplete-input" class="field-title ripple-effect"
							>What business area you need help with?</label
						>
						<div class="input-with-icon">
							<input id="autocomplete-input" type="text" placeholder="Market Research" />
							<i class="icon-material-outline-business" />
						</div>
					</div>
					
					<div class="intro-search-button">
						<button class="button ripple-effect">Search</button>
					</div> 
				</div>
				-->
				<div class="intro-search-button mt-4">
					<button on:click={() => goto('/startup-tools')} class="button ripple-effect"
						>Browse Tools & Services</button
					>
				</div>
			</div>
		</div>

		<!-- Stats -->
		<!-- <div class="row">
			<div class="col-md-12">
				<ul class="intro-stats margin-top-45 hide-under-992px">
					<li>
						<strong class="counter">{categorySummary.totalDocs}</strong>
						<span>Categories</span>
					</li>
					<li>
						<strong class="counter">{categorySummary.totalDocs}</strong>
						<span>Tools & Services</span>
					</li>
					 <li>
						<strong class="counter">1,232</strong>
						<span>Freelancers</span>
					</li> 
				</ul>
			</div>
		</div> -->
	</div>
</div>

<!-- Content
================================================== -->
<!-- Category Boxes -->
<div class="section margin-top-65">
	<div class="container">
		<div class="row">
			<div class="col-xl-12">
				<div class="section-headline centered margin-bottom-15">
					<h3>Popular Categories</h3>
				</div>

				<!-- Category Boxes Container -->
				<div class="categories-container">
					{#each featuredCategories as cat}
						<!-- Category Box -->
						<a href="#" on:click={() => goto(`/startup-tools/${cat.uid}`)} class="category-box">
							<div class="category-box-icon">
								<i class="icon-line-awesome-file-code-o" />
							</div>
							<!-- <div class="category-box-counter">#{cat.uid}</div> -->
							<div class="category-box-content">
								<h2>{cat.title}</h2>

								{#each cat?.subcategories as subcat, i}
									{#if i < 5}
										<p>
											{subcat.title}
										</p>
									{/if}
								{/each}
							</div>
						</a>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>
<!-- Category Boxes / End -->

<!-- Features Jobs -->
<div class="section gray margin-top-45 padding-top-65 padding-bottom-75">
	<div class="container">
		<div class="row">
			<div class="col-xl-12">
				<!-- Section Headline -->
				<div class="section-headline margin-top-0 margin-bottom-35">
					<h3>Featured Tools</h3>
					<a href="/startup-tools" class="headline-link">Browse All</a>
				</div>

				<!-- Jobs Container -->
				<div class="listings-container compact-list-layout margin-top-35">
					{#each featuredTools as tool}
						<a
							href="/startup-tools/{tool.categoryPath}/{tool.domain}"
							class="job-listing with-apply-button"
						>
							<!-- Job Listing Details -->
							<div class="job-listing-details">
								<!-- Logo -->
								<div class="job-listing-company-logo">
									<!-- <img
										src={(() =>
											ImageUtils.getImage(baseImagePath, tool.domain + '.jpeg', tool.title))()}
										alt=""
									/> -->
									<img src="{baseImagePath}{tool.domain}.jpeg" alt={tool.title} />
								</div>

								<!-- Details -->
								<div class="job-listing-description">
									<h3 class="job-listing-title">{tool.title}</h3>

									<!-- Job Listing Footer -->
									<div class="job-listing-footer">
										<ul>
											<li>
												<i class="icon-material-outline-business" />
												{tool.domain}
												<div
													class="verified-badge"
													title="Verified Employer"
													data-tippy-placement="top"
												/>
											</li>
											<li><i class="icon-material-outline-location-on" /> {tool.tagline}</li>
											<!-- <li><i class="icon-material-outline-business-center" /> #{tool.tags[0]}</li> -->
											<!-- <li>
												<i class="icon-material-outline-access-time" />
												{tool.viewCount} views
											</li> -->
										</ul>
									</div>
								</div>

								<!-- Apply Button -->
								<span class="list-apply-button ripple-effect">View</span>
							</div>
						</a>
					{/each}
				</div>
				<!-- Jobs Container / End -->
			</div>
		</div>
	</div>
</div>
<!-- Featured Jobs / End -->

<!-- Features Tools -->
<!-- <div class="section margin-top-65 margin-bottom-65">
	<div class="container">
		<div class="row">			
			<div class="col-xl-12">
				<div class="section-headline centered margin-top-0 margin-bottom-45">
					<h3>Featured Tools</h3>
				</div>
			</div>

			<div class="col-xl-3 col-md-6">
			
				<a href="#" class="photo-box">
					<div class="photo-box-content">
						<h3>San Francisco</h3>
						<span>376 Jobs</span>
					</div>
				</a>
			</div>

			<div class="col-xl-3 col-md-6">
				
				<a href="#" class="photo-box">
					<div class="photo-box-content">
						<h3>New York</h3>
						<span>645 Jobs</span>
					</div>
				</a>
			</div>

			<div class="col-xl-3 col-md-6">
				<a href="#" class="photo-box">
					<div class="photo-box-content">
						<h3>Los Angeles</h3>
						<span>832 Jobs</span>
					</div>
				</a>
			</div>

			<div class="col-xl-3 col-md-6">
				<a href="#" class="photo-box">
					<div class="photo-box-content">
						<h3>Miami</h3>
						<span>513 Jobs</span>
					</div>
				</a>
			</div>
		</div>
	</div>
</div> -->
<!-- Features Cities / End -->
