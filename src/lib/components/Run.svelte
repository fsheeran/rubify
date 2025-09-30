<script lang="ts">
    import RubiedText from "./RubiedText.svelte";

    const { baseAndRubyPairs } = $props();
</script>

{#each baseAndRubyPairs as [base, ruby]}
    {#if ruby}
        <RubiedText baseText={base} rubyText={ruby}></RubiedText>
    {:else}
        {base}
    {/if}
{/each}