<script lang="ts">
    import type { PageProps } from "./$types";
	import InputError from "$lib/components/InputError.svelte";

	// note to self: data holds result of server.ts:load()
	// form holds result of server.ts actions
    let { form }: PageProps = $props();
</script>


<form method="POST">
	<label>
		your text
		<input name="baseText"
		required
		minlength="1"
		maxlength="500">
	</label>
	<button>Generate</button>
</form>

{#if form?.error?.properties?.baseText}
	{#each form?.error?.properties.baseText?.errors as error }
		<InputError errorText={error}/>
	{/each}
{/if}
