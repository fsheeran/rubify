<script lang="ts">
	import InputError from "$lib/components/InputError.svelte";

	import RubifyRequestForm from "$lib/components/RubifyRequestForm.svelte";
	import RubifyRequestResult from "$lib/components/RubifyRequestResult.svelte";

	import type { PageProps } from "./$types";

	let { form, data }: PageProps = $props();

</script>

<h1>
	<ruby>ru<rt>/ruː</rt></ruby><ruby>bi<rt>bɪ</rt></ruby><ruby>fy<rt>faɪ/</rt></ruby>
</h1>

{#if form?.success}
	<RubifyRequestResult annotatedText={data.annotatedText}/>
{:else}
	<RubifyRequestForm/>

	{#if form?.error?.properties?.baseText}
	{#each form?.error?.properties.baseText?.errors as error}
		<InputError errorText={error} />
	{/each}
	{/if}
{/if}




<style>
	ruby {
		display: inline-flex;
		flex-direction: column-reverse;
	}

	rt {
		display: inline;
		line-height: 0.5;
		font-size: 0.4em;
	}

	h1 {
		font-variation-settings: "wght" 400;
		text-align: center;
		font-size: 6rem;
		color: #313131;
	}
</style>
