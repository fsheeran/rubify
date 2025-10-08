<script lang="ts">
    import RubiedText from "./RubiedText.svelte";
    import UnrubiedText from "./UnrubiedText.svelte";
    import type { RunProps } from "../types";

    let { baseRubyPairs }: RunProps = $props();

</script>

<p>
{#each baseRubyPairs as baseRubyPair}
    {#if 'rubyText' in baseRubyPair}
        <RubiedText pair={baseRubyPair} ></RubiedText>
    {:else}
        <UnrubiedText text={baseRubyPair.baseText}/>
    {/if}
{/each}
</p>