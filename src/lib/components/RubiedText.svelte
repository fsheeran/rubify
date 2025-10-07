<script lang="ts">
	import { allCjkRegExp } from "$lib/cjkUtils";
	let { baseText, rubyText, selectedTextId } = $props();
	let baseWidth = $state();
	let hiddenTextWidth = $state();

	const uid = $props.id();

	// const setSelected = () => selectedTextId.selected = uid;

</script>

<div class="flex-container">

<!-- {#if selectedTextId.selected == uid} -->
	<span bind:clientWidth={hiddenTextWidth} id="hidden-text">{rubyText}</span>
	<input class="ruby-text" style="min-width: {baseWidth}px; width: {hiddenTextWidth}px" type="text" bind:value={rubyText}>
    <span bind:clientWidth={baseWidth} class=ruby-base>{baseText}</span>

<!-- {:else}
	<ruby><span class=ruby-base>{baseText}</span><rt class="ruby-text">{rubyText}</rt></ruby>
{/if}-->
</div>

<style>
    .flex-container {
      align-items: center;
      display: flex;
      flex-direction: column;
    }
	.ruby-base {
		font-size: var(--base-font-size);
	}
    .ruby-text {
		font-size: var(--ruby-font-size);
		/* border: none; */
		/* color: #888; */
		min-width: 10px;
		text-align: center;
	}

	#hidden-text {
		position: absolute;
		height: 0;
		overflow: hidden;
		white-space: pre;
	}

</style>
