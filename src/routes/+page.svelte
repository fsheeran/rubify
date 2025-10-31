<script lang="ts">
	import type { PageProps } from "./$types";
	import InputError from "$lib/components/InputError.svelte";

	let { form }: PageProps = $props();

	let inputHeight = $state(0);
	let textValue = $state("");
</script>

<h1>
	<ruby>ru<rt>/ruː</rt></ruby><ruby>bi<rt>bɪ</rt></ruby><ruby
		>fy<rt>faɪ/</rt></ruby
	>
</h1>

<form method="POST">
	<div class="input-area-box">
		<p
			class="text-input"
			bind:clientHeight={inputHeight}
			aria-hidden="true"
			id="hidden-text">{textValue}</p
		>
		<!-- svelte-ignore a11y_autofocus -->
		<textarea
			class="text-input shadow-box"
			bind:value={textValue}
			name="baseText"
			required
			autofocus
			style="height:{inputHeight}px"
			minlength="1"
			maxlength="2000"
		></textarea>
		<button>GO</button>
	</div>
</form>

{#if form?.error?.properties?.baseText}
	{#each form?.error?.properties.baseText?.errors as error}
		<InputError errorText={error} />
	{/each}
{/if}

<style>
	form {
		display: flex;
		align-items: center;
		flex-direction: column;
	}

	#hidden-text {
		visibility: hidden;
		position: absolute;
  		overflow-wrap: break-word;
		white-space: pre-line;
	}

	.text-input {
		resize: none;
		border: none;
		outline: none;
		padding: 0.5rem;
		min-height: 4rem;
		width: 60vw;
		font-size: 2rem;
		font-family: "EB Garamond", "Zen Old Mincho";
		text-align: justify;
	}

	.input-area-box {
		display: flex;
		background-color: #ffffff;
		filter: drop-shadow(0 0 0.05rem rgba(49, 49, 49, 0.7));
		align-items: flex-end;
	}

	button {
		background-color: #ea4841;
		color: #f4f2ef;
		aspect-ratio: 1 / 1;
		max-height: 100px;
	}

	ruby {
		display: inline-flex;
		flex-direction: column-reverse;
	}

	rt {
		display: inline;
		line-height: 0.5;
		font-size: 0.4em;
	}

	h1 {
		font-variation-settings: "wght" 400;
		text-align: center;
		font-size: 6rem;
		color: #313131;
	}
</style>
