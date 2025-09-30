<script lang="ts">
    import RubiedText from "./RubiedText.svelte";
    import UnrubiedText from "./UnrubiedText.svelte";
    import type { RubiedTextProps } from "../types";

    const { baseRubyPairs }: RubiedTextProps = $props();

    console.log(baseRubyPairs)


</script>

{#each baseRubyPairs as [baseText, rubyText]}
    {#if rubyText === null}
        <UnrubiedText text={baseText}/>
    {:else}
        <RubiedText baseText={baseText} rubyText={rubyText}></RubiedText>
    {/if}
{/each}