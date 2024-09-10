<script lang="ts">
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let header: Array<string> = [];
	export let rows = [];

	function editRow(rindex) {
		dispatch('edit', rindex);
	}
</script>

<Table striped={true} hoverable={true}>
	<TableHead>
		{#each header as h}
			<TableHeadCell>{h}</TableHeadCell>
		{/each}
		<TableHeadCell>
			<span class="sr-only"> Edit </span>
		</TableHeadCell>
	</TableHead>
	<TableBody class="divide-y">
		{#each rows as row, ri}
			<TableBodyRow>
				{#each header as hcol, i}
					<TableBodyCell tdClass="w-48">{row[hcol]}</TableBodyCell>
					<!-- <div>
						{JSON.stringify(row)}
					</div> -->
				{/each}

				<TableBodyCell>
					<a
						href="#"
						on:click={() => dispatch('edit', ri)}
						class="font-medium text-blue-600 hover:underline dark:text-blue-500"
					>
						Edit
					</a>
				</TableBodyCell>
				<TableBodyCell>
					<a
						href="#"
						on:click={() => dispatch('preview', ri)}
						class="font-medium text-blue-600 hover:underline dark:text-blue-500"
					>
						Preview
					</a>
				</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>
