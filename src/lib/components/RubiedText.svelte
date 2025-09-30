<script lang="ts">
    const { baseText, rubyText } = $props()
</script>

<style>
	ruby {
		color: maroon;
	}
</style>

<span><ruby>{baseText}<rp>(</rp><rt>{rubyText}</rt><rp>)</rp></ruby></span>