<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<style>
	:global(body) {
		font-family: "EB Garamond", "Zen Old Mincho";
		font-size: 1.5rem;
		background-image: url("$lib/assets/background.png"); 
		background-repeat: repeat;
	}

	:global(button) {
		font-family: "EB Garamond";
	}
	
	:global(.visually-hidden) {
		clip: rect(0 0 0 0);
		clip-path: inset(50%);
		height: 1px;
		overflow: hidden;
		position: absolute;
		white-space: nowrap;
		width: 1px;
	}
</style>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children?.()}
