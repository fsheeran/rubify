<script lang="ts">
	import type { PageProps } from "./$types";
	import InputError from "$lib/components/InputError.svelte";

    let { form }: PageProps = $props();

</script>

<style>
	.vert-container {
		display: flex;
		align-items: center;
		flex-direction: column;
	}
	.button-container {
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>

<form class="vert-container" method="POST">
		<textarea name="baseText"
		required
		minlength="1"
		maxlength="500"></textarea>
	<button>Generate</button>
</form>

{#if form?.error?.properties?.baseText}
	{#each form?.error?.properties.baseText?.errors as error }
		<InputError errorText={error}/>
	{/each}
{/if}