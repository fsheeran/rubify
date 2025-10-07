<script lang="ts">
    import RubiedText from "./RubiedText.svelte";
    import UnrubiedText from "./UnrubiedText.svelte";
    import type { RubiedTextProps } from "../types";

    const { baseRubyPairs }: RubiedTextProps = $props();

    const selectedTextId = $state({selected: null})

    const rubyFontSize = 16;
    const baseFontSize = 24;


</script>

<style>
    .container {
		display: flex;
		flex-flow: row wrap;
        justify-content: center;
        align-items: flex-end;
	}
</style>

<div class="container">
{#each baseRubyPairs as [baseText, rubyText]}
    {#if rubyText === null}
        <UnrubiedText --base-font-size="{baseFontSize}px" --ruby-font-size="{rubyFontSize}px" text={baseText}/>
    {:else}
        <RubiedText --base-font-size="{baseFontSize}px" --ruby-font-size="{rubyFontSize}px" baseText={baseText} rubyText={rubyText} selectedTextId={selectedTextId}></RubiedText>
    {/if}
{/each}
</div>