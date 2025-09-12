<script lang="ts">
    import type { PageProps } from "./$types";

	// note to self: data holds result of server.ts:load()
	// form holds result of server.ts actions
    let { data, form }: PageProps = $props();
</script>


<form method="POST">
	<label>
		your text
		<input name="baseText"
		required
		minlength="1"
		maxlength="500">
	</label>
	<button>Generate</button>
</form>
<!-- 
data {JSON.stringify(data)}
form {JSON.stringify(form)} -->