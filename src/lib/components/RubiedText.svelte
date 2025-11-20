<script lang="ts">
    import type { RubiedTextProps } from "../types";

	const { pair, onEdit } : RubiedTextProps = $props();
	let baseWidth = $state();
	let hiddenTextWidth = $state(0);

	let boundRubyText = $state(pair.rubyText);
	let rubyLength = $derived(pair.rubyText?.length ?? 0);

	const initialFontSize = .6;
	let fontSize = $derived( Math.max(.4, initialFontSize - (rubyLength > 3 ? (rubyLength - 3) * .02 : 0 )));

</script>

<span class="flex-container">

	<span bind:clientWidth={hiddenTextWidth} id="hidden-text" style="font-size: {fontSize}em;">{pair.rubyText}</span>
	<input class="ruby-text" 
		   style="font-size: {fontSize}em; min-width: {baseWidth}px; width: {hiddenTextWidth + 10}px"
		   type="text" bind:value={boundRubyText} oninput="{() => onEdit({ baseText: pair.baseText, rubyText: boundRubyText})}">
    <span bind:clientWidth={baseWidth} class=ruby-base>{pair.baseText}</span>

</span>

<style>
    .flex-container {
      align-items: center;
      display: inline-flex;
      flex-direction: column;
	  vertical-align: bottom;
	  margin-left: .1em;
	  margin-right: .1em;
    }
    .ruby-text {
		/* color: rgba(0, 0, 0, 0.5); */
		border: none;
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
