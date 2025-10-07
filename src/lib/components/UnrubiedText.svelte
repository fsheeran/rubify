<script lang="ts">
    const { text } = $props()
</script>

<style>
	span {
		color: burlywood;
		font-size: var(--base-font-size);
		/* line-height: var(--ruby-font-size); */
	}
</style>

<span>{text}</span>