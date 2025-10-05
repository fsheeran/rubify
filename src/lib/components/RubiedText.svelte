<script lang="ts">
	let { baseText, rubyText, selectedTextId } = $props();

	const uid = $props.id();

	const setSelected = () => selectedTextId.selected = uid;
</script>

<span>
    <ruby>
        <span class="ruby-base">{baseText}</span>
        <rt><div class="ruby-text" contenteditable="true">{rubyText}</div></rt>
    </ruby>
</span>

<style>
	.ruby-base {
		color: maroon;
		/* ruby-overhang: none */
	}

	.ruby-text {
		background-color: lightpink;
		flex: 1 1 auto;
	}


</style>
