<script lang="ts">

	import Button from "$lib/components/Button.svelte";
	import type { PageProps } from "./$types";
	import type { BaseRubyPair } from "$lib/types";
    import EditableRun from "$lib/components/EditableRun.svelte";
    import FinalizedRun from "$lib/components/FinalizedRun.svelte";

    let { data }: PageProps = $props();

	const annotatedText = data.annotatedText;
	const baseRubyPairs: BaseRubyPair[] = $state([]);

	let isFinalized = $state(false);

	if (annotatedText) {
		let prevSegEnd = 0
		for (const segment of annotatedText.segments) {
			let preceedingUnannotatedSeg = annotatedText.baseText.slice(prevSegEnd, segment.indices[0]);
			if (preceedingUnannotatedSeg) {
				baseRubyPairs.push({baseText: preceedingUnannotatedSeg});
			}

			if (segment.annotations) {
				for (const annotation of segment.annotations) {
					baseRubyPairs.push(
						{
							baseText: annotatedText.baseText.slice(
								segment.indices[0] + annotation.indices[0], segment.indices[0] + annotation.indices[1]
							),
							rubyText: annotation.annotationText
						}
					)
				}
			} else {
				baseRubyPairs.push(
					{
						baseText: annotatedText.baseText.slice(segment.indices[0],segment.indices[1]),
						rubyText: ''
					})
			}

			prevSegEnd = segment.indices[1]
		}
		if (prevSegEnd < annotatedText.baseText.length) {
			baseRubyPairs.push({baseText: annotatedText.baseText.slice(prevSegEnd)});
		}
	}

</script>


<!-- <style>
	.button-container {
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style> -->

{#if isFinalized}
	<FinalizedRun baseRubyPairs={baseRubyPairs}/>
	<Button buttonText="Keep editing" onClick={() => isFinalized = false}/>
{:else}
	<EditableRun baseRubyPairs={baseRubyPairs}/>
	<Button buttonText="Finalize" onClick={() => isFinalized = true}/>
{/if}