<!-- 
This compoment can be used work with variety of styles. Just updated the havascript filterOptions and selectedFilters var
to match the form elements. Filter component is used by other pages/components like this:

<FilterDrawer bind:filterOptions bind:selectedFilters onSubmitFn={loadData}/>
-->
<script lang="ts">
	export let filterOptions = {
		keywords: '',
		cats: ['one', 'two', 'three'],
		categories: ['Accounting and Finance', 'Counseling'],
		tags: ['tags1', 'tags2', 'tags3']
	};
	export let selectedFilters = { keywords: '', cats: '', categories: [], tags: [] };
	export let onSubmitFn: () => void;
</script>

<div class="col-xl-3 col-lg-4">
	<div>
		Filters
		<form action="#" class="mb-6" on:submit|preventDefault={onSubmitFn}>
			<div class="sidebar-container">
				<!-- Keywords -->
				<div class="sidebar-widget">
					<h3>Keywords</h3>
					<div class="keywords-container">
						<div class="keyword-input-container">
							<input
								type="text"
								class="keyword-input"
								placeholder="e.g. job title"
								bind:value={selectedFilters.keywords}
							/>
							<button type="button" class="keyword-input-button ripple-effect"
								><i class="icon-material-outline-add" /></button
							>
						</div>
						<div class="keywords-list"><!-- keywords go here --></div>
						<div class="clearfix" />
					</div>
				</div>

				<div class="sidebar-widget">
					<div class="sidebar-widget">
						<h3>Categories</h3>
						<select
							class="select select-bordered select-sm w-full"
							bind:value={selectedFilters.cats}
						>
							<option value="">Any</option>
							{#each filterOptions.cats as cat}
								<option value={cat}>{cat}</option>
							{/each}
						</select>
					</div>
				</div>

				<div class="sidebar-widget">
					<h3>Job Type</h3>

					<div class="switches-list">
						{#each filterOptions.categories as cat}
							<div class="switch-container">
								<label class="switch"
									><input
										type="checkbox"
										bind:group={selectedFilters.categories}
										value={cat}
									/><span class="switch-button" />
									{cat}</label
								>
							</div>
						{/each}
					</div>
				</div>

				<!-- Tags -->
				<div class="sidebar-widget">
					<h3>Tags</h3>

					<div class="tags-container">
						{#each filterOptions.tags as tag}
							<div class="tag">
								<input type="checkbox" id={tag} bind:group={selectedFilters.tags} value={tag} />
								<label for={tag}>{tag}</label>
							</div>
						{/each}
						<div class="tag">
							<input type="checkbox" id="tag1" />
							<label for="tag1">front-end dev</label>
						</div>
						<div class="tag">
							<input type="checkbox" id="tag2" />
							<label for="tag2" />
						</div>
						<div class="tag">
							<input type="checkbox" id="tag3" />
							<label for="tag3">react</label>
						</div>
						<div class="tag">
							<input type="checkbox" id="tag4" />
							<label for="tag4">vue js</label>
						</div>
						<div class="tag">
							<input type="checkbox" id="tag5" />
							<label for="tag5">web apps</label>
						</div>
						<div class="tag">
							<input type="checkbox" id="tag6" />
							<label for="tag6">design</label>
						</div>
						<div class="tag">
							<input type="checkbox" id="tag7" />
							<label for="tag7">wordpress</label>
						</div>
					</div>
					<div class="clearfix" />
				</div>

				<div class="sidebar-widget">
					<button type="button" class="button ripple-effect">Apply</button>
				</div>
			</div>
		</form>
		<!-- <div class="text-right">
		<Button on:click={() => (hidden = false)}>Filter</Button>
	</div>
	<Drawer
		activateClickOutside={false}
		backdrop={true}
		placement="right"
		transitionType="fly"
		{transitionParams}
		bind:hidden
		id="filterDrawer"
	>
		<div class="flex items-center">
			<h5
				id="drawer-label"
				class="inline-flex items-center mb-6 text-base font-semibold text-gray-500 uppercase dark:text-gray-400"
			>
				<svg
					class="w-5 h-5 mr-2"
					aria-hidden="true"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
					><path
						fill-rule="evenodd"
						d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
						clip-rule="evenodd"
					/></svg
				>Filter
			</h5>
			<CloseButton on:click={() => (hidden = true)} class="mb-4 dark:text-white" />
		</div>
		<form action="#" class="mb-6" on:submit|preventDefault={handleClick}>
			<Label for="description" class="mb-2"
				>Select Tenant
				<Select
					class="mt-2"
					items={tenantCatMap.getTenantSelect()}
					bind:value={filterForm.tenant}
					on:change={loadCategories}
				/>
			</Label>
			<Label for="description" class="mb-2"
				>Select Category
				<Select
					class="mt-2"
					items={tenantCatMap.getCategoriesSelect(filterForm.tenant)}
					bind:value={filterForm.category}
				/>
			</Label>

			<Button type="submit" class="w-full"
				><svg
					class="w-5 h-5 mr-2"
					aria-hidden="true"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
					><path
						fill-rule="evenodd"
						d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
						clip-rule="evenodd"
					/></svg
				> Apply</Button
			>
		</form>
	</Drawer> -->
	</div>
</div>
