<script lang="ts">
    import RubiedText from "./RubiedText.svelte";
    import UnrubiedText from "./UnrubiedText.svelte";
    import type { RubiedTextProps } from "../types";

    const { baseRubyPairs }: RubiedTextProps = $props();

    const selectedTextId = $state({selected: null})

</script>

<style>
    .container {
		display: flex;
		flex-flow: row wrap;
        justify-content: center;
        align-items: baseline;
	}
</style>

<div class="container">
{#each baseRubyPairs as [baseText, rubyText]}
    {#if rubyText === null}
        <UnrubiedText text={baseText}/>
    {:else}
        <RubiedText baseText={baseText} rubyText={rubyText} selectedTextId={selectedTextId}></RubiedText>
    {/if}
{/each}
</div>