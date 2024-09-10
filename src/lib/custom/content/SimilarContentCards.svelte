<script>
	import { getSimilarContent } from '$lib/custom/dataloader';
	import { onMount } from 'svelte';

	export let data;
	export let similarTo;
	let similarContent;

	export let baseImagePath;

	onMount(async () => {
		const payloadWrapper = await getSimilarContent(fetch, similarTo, 2);
		similarContent = payloadWrapper.payload?.payload?.data;
	});

	$: similarTo = similarTo;

	// load similar content here
</script>

{#if similarContent}
	<div class="margin-top-25 p-5 mb-2 bg-light text-dark">
		<h3>Similar Tools</h3>
		<!-- Similar Container -->
		<div class="listings-container grid-layout mt-4">
			{#each similarContent as similarContent}
				<a
					href="/startup-tools/{similarContent.categoryPath}/{similarContent.domain}"
					class="job-listing"
				>
					<div class="job-listing-details">
						<div class="job-listing-company-logo">
							<img src={baseImagePath + similarContent.domain + '.jpeg'} alt="" />
						</div>

						<div class="job-listing-description">
							<!-- <h4 class="job-listing-company">{similarContent.title}</h4> -->
							<h3 class="job-listing-title text-capitalize">{similarContent.domain}</h3>
						</div>
					</div>

					<div class="job-listing-footer">
						<p class="mb-4">
							{similarContent.title}
						</p>
						<ul>
							{#each similarContent.hashtags as tag}
								<li>{tag}</li>
								<!-- 							
							<li><i class="icon-material-outline-location-on" /> San Francisco</li>
							<li><i class="icon-material-outline-business-center" /> Full Time</li>
							<li><i class="icon-material-outline-account-balance-wallet" /> $35000-$38000</li>
							<li><i class="icon-material-outline-access-time" /> 2 days ago</li> -->
							{/each}
						</ul>
					</div>
				</a>
			{/each}
			<!-- <a href="#" class="job-listing">
			<div class="job-listing-details">
				<div class="job-listing-company-logo">
					<img src="images/company-logo-03.png" alt="" />
				</div>

				<div class="job-listing-description">
					<h4 class="job-listing-company">
						King <span
							class="verified-badge"
							title="Verified Employer"
							data-tippy-placement="top"
						/>
					</h4>
					<h3 class="job-listing-title">Restaurant Manager</h3>
				</div>
			</div>

			<div class="job-listing-footer">
				<ul>
					<li><i class="icon-material-outline-location-on" /> San Francisco</li>
					<li><i class="icon-material-outline-business-center" /> Full Time</li>
					<li><i class="icon-material-outline-account-balance-wallet" /> $35000-$38000</li>
					<li><i class="icon-material-outline-access-time" /> 2 days ago</li>
				</ul>
			</div>
		</a> -->
		</div>
	</div>
{/if}
<!-- Similar Container / End -->
