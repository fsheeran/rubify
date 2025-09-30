<script lang="ts">
	import Run from "$lib/components/Run.svelte";
	import type { PageProps } from "./$types";

    let { data }: PageProps = $props();
</script>


<!-- {uuid} -->

<h1>{data.baseText}</h1>

<!-- 
data {JSON.stringify(data)}
form {JSON.stringify(form)} -->