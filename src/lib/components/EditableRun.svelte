<script lang="ts">
    import RubiedText from "./RubiedText.svelte";
    import UnrubiedText from "./UnrubiedText.svelte";
    import type { EditableRunProps } from "../types";

    let { baseRubyPairs, onEdit }: EditableRunProps = $props();

</script>

<p>
{#each baseRubyPairs as baseRubyPair, i}
    {#if 'rubyText' in baseRubyPair}
        <RubiedText pair={baseRubyPair} onEdit={(pair) => onEdit(i, pair)} ></RubiedText>
    {:else}
        <UnrubiedText text={baseRubyPair.baseText}/>
    {/if}
{/each}
</p>