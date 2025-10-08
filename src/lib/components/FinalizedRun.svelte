<script lang="ts">
    import type { RunProps } from "../types";

    const { baseRubyPairs }: RunProps = $props();

</script>

<p>
{#each baseRubyPairs as baseRubyPair}
    {#if 'rubyText' in baseRubyPair}
        <ruby>{baseRubyPair.baseText}<rt>{baseRubyPair.rubyText}</rt></ruby>
    {:else}
        {baseRubyPair.baseText}
    {/if}
{/each}
</p>