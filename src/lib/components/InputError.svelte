<script lang="ts">
    const { errorText } = $props();
</script>

<span class="error-message">{errorText}</span>

<style>
	.error-message {
		color: red;
	}
</style>