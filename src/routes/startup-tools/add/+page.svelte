<script>
	import { page } from '$app/stores';
	import _ from 'lodash';
	import { superForm } from 'sveltekit-superforms/client';
	import ErrorToast from '$lib/common-components/toasts/ErrorToast.svelte';
	import SuccessToast from '$lib/common-components/toasts/SuccessToast.svelte';
	import InfoToast from '$lib/common-components/toasts/InfoToast.svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	// const form = data.form;
	const { enhance, form, message, errors, allErrors, valid, posted } = superForm(data.form);

	const addTag = (event) => {
		//console.log('Key pressed ' + document.getElementsByClassName('keyword').text);
		if (event.key === 'Enter') {
			console.log('Enter key pressed ' + event.detail);
			const keywordElements = document.getElementsByClassName('keyword-text');
			// Extract values from the elements
			const values = Array.from(keywordElements).map((element) => element.textContent);

			// Log the extracted values
			console.log(values);
		}
	};
</script>

<div>
	Data == {JSON.stringify(data)}
</div>

{#if $message}
	{#if $page.status >= 400}
		<ErrorToast text={$message} />
	{:else}
		<SuccessToast text={$message} />
	{/if}
{/if}

<div class="dashboard-content-container">
	<div class="dashboard-content-inner">
		<!-- Dashboard Headline -->
		<div class="dashboard-headline">
			<h3>Add a Startup Tool or Service</h3>

			<!-- Breadcrumbs -->
			<nav id="breadcrumbs" class="dark">
				<!-- <ul>
					<li><a href="#">Home</a></li>
					<li>Add a Tool</li>
				</ul> -->
			</nav>
		</div>

		<!-- Row -->
		<form method="POST" class="mb-6" use:enhance>
			<div class="row">
				<!-- Dashboard Box -->
				<div class="col-xl-12">
					<div class="dashboard-box margin-top-0">
						<!-- Headline -->
						<div class="headline">
							<h3>
								<i class="icon-material-outline-arrow-right-alt" /> Your submission will be live after
								review by our editorial staff.
							</h3>
						</div>

						<div class="content with-padding padding-bottom-10">
							<div class="row">
								<div class="col-xl-4">
									<div class="submit-field">
										<h5>URL</h5>
										<input type="text" name="url" class="with-border" bind:value={$form.url} />
										{#if $errors.url}<span class="invalid">{$errors.url}</span>{/if}
									</div>
								</div>

								<!-- <div class="col-xl-4">
									<div class="submit-field">
										<h5>Content Type</h5>
										<input type="text" name="contentType" class="with-border" />
									</div>
								</div> -->

								<!-- <div class="col-xl-4">
									<div class="submit-field">
										<h5>Status</h5>
										<input type="text" name="status" class="with-border" />
									</div>
								</div> -->

								<!-- <div class="col-xl-12">
									<div class="submit-field">
										<h5>Description ( 500 characters max )</h5>
										<textarea cols="30" rows="5" class="with-border" maxlength="500" />
									</div>
								</div> -->

								<div class="col-xl-4">
									<div class="submit-field">
										<h5>
											Tags <span>(optional)</span>
											<i
												class="help-icon"
												data-tippy-placement="right"
												title="Maximum of 10 tags"
											/>
										</h5>
										<div class="keywords-container">
											<div class="keyword-input-container">
												<input
													on:keydown={addTag}
													bind:value={$form.tags}
													type="text"
													name="tags"
													class="keyword-input with-border"
													placeholder="e.g. job title, responsibilites"
												/>
												<button
													type="button"
													on:click:preventDefault={addTag}
													class="keyword-input-button ripple-effect"
													><i class="icon-material-outline-add" /></button
												>
											</div>
											<!-- <input type="hidden" name="tags" /> -->
											<div class="keywords-list"><!-- keywords go here --></div>
											<div class="clearfix" />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="col-xl-12">
					<button type="submit" class="button ripple-effect big margin-top-30"
						><i class="icon-feather-plus" /> Submit</button
					>
				</div>
			</div>
		</form>
		<!-- Row / End -->

		<!-- Footer -->
		<div class="dashboard-footer-spacer" />
		<div class="small-footer margin-top-15">
			<div class="small-footer-copyrights">
				© 2019 <strong>Hireo</strong>. All Rights Reserved.
			</div>
			<ul class="footer-social-links">
				<li>
					<a href="#" title="Facebook" data-tippy-placement="top">
						<i class="icon-brand-facebook-f" />
					</a>
				</li>
				<li>
					<a href="#" title="Twitter" data-tippy-placement="top">
						<i class="icon-brand-twitter" />
					</a>
				</li>
				<li>
					<a href="#" title="Google Plus" data-tippy-placement="top">
						<i class="icon-brand-google-plus-g" />
					</a>
				</li>
				<li>
					<a href="#" title="LinkedIn" data-tippy-placement="top">
						<i class="icon-brand-linkedin-in" />
					</a>
				</li>
			</ul>
			<div class="clearfix" />
		</div>
		<!-- Footer / End -->
	</div>
</div>

<style>
	.invalid {
		color: red;
		font-size: small;
	}
</style>
