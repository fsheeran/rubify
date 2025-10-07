<script lang="ts">
	let { baseText, rubyText } = $props();
	let baseWidth = $state();
	let hiddenTextWidth = $state();

</script>

<span class="flex-container">

	<span bind:clientWidth={hiddenTextWidth} id="hidden-text">{rubyText}</span>
	<input class="ruby-text" style="min-width: {baseWidth}px; width: {hiddenTextWidth}px" type="text" bind:value={rubyText}>
    <span bind:clientWidth={baseWidth} class=ruby-base>{baseText}</span>

</span>

<style>
    .flex-container {
      align-items: center;
      display: inline-flex;
      flex-direction: column;
	  vertical-align: bottom;
    }
    .ruby-text {
		font-size: .8em;
		/* border: none; */
		/* color: #888; */
		min-width: 10px;
		text-align: center;
	}

	#hidden-text {
		font-size: .8em;
		position: absolute;
		height: 0;
		overflow: hidden;
		white-space: pre;
	}

</style>
