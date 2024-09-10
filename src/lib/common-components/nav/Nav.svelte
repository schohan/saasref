<script lang="ts">
	export let navData: any;
</script>

<!-- Common items -->
{#each navData?.guest as navItem, i}
	<a href={navItem.href} class="btn variant-filled">{navItem.text}</a>
{/each}
