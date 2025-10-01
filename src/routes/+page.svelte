<script lang="ts">
	import Run from "$lib/components/Run.svelte";
	import type { PageProps } from "./$types";
	import type { BaseRubyPair } from "$lib/types";
	import InputError from "$lib/components/InputError.svelte";

    let { form, data }: PageProps = $props();

	const annotatedText = data.annotatedText;
	const baseRubyPairs: BaseRubyPair[] = []
	let isInitialLoad = $state(true);
	if (!data.isInitialLoad && annotatedText) {
		let prevSegEnd = 0
		for (const segment of annotatedText.segments) {
			let preceedingUnannotatedSeg = annotatedText.baseText.slice(prevSegEnd, segment.indices[0]);
			if (preceedingUnannotatedSeg) {
				baseRubyPairs.push([preceedingUnannotatedSeg, null]);
			}

			if (segment.annotations) {
				for (const annotation of segment.annotations) {
					baseRubyPairs.push(
						[
							annotatedText.baseText.slice(segment.indices[0] + annotation.indices[0], segment.indices[0] + annotation.indices[1]),
							annotation.annotationText
						]
					)
				}
			} else {
				baseRubyPairs.push([annotatedText.baseText.slice(segment.indices[0], segment.indices[1]), ''])
			}

			prevSegEnd = segment.indices[1]
		}
		isInitialLoad = false;
	}

</script>

{#if isInitialLoad}
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
{:else if form?.error?.properties?.baseText}
	{#each form?.error?.properties.baseText?.errors as error }
		<InputError errorText={error}/>
	{/each}
{:else}
	<Run baseRubyPairs={baseRubyPairs}/>
	<button onclick={() => isInitialLoad = true}>new request</button>
{/if}
