<script lang="ts">

	import Button from "$lib/components/Button.svelte";
	import type { PageProps } from "./$types";
	import type { BaseRubyPair } from "$lib/types";
    import EditableRun from "$lib/components/EditableRun.svelte";
    import FinalizedRun from "$lib/components/FinalizedRun.svelte";
	import generateDocx from "$lib/generateDocx";
	import { saveFile } from "$lib/fileUtils";

    let { data }: PageProps = $props();

	const annotatedText = data.annotatedText;
	const baseRubyPairs: BaseRubyPair[] = $state([]);

	// let isFinalized = $state(false);

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


<style>
	.text-container {
		margin: auto;
		max-width: 66vw;
		width: 100%;
		font-size: calc(24px + 8 * (100vw - 1000px) / 3000 );
	}
</style>



<!-- {#if isFinalized} -->
<!-- <div class="text-container">
	<FinalizedRun baseRubyPairs={baseRubyPairs}/>
</div>
	<Button buttonText="Keep editing" onClick={() => isFinalized = false}/>
{:else} -->
<div class="text-container">
	<EditableRun baseRubyPairs={baseRubyPairs}/>
</div>
<Button buttonText="Download as docx" onClick={async() => saveFile(await generateDocx(baseRubyPairs), 'rubify.docx')}/>
<!-- {/if} -->