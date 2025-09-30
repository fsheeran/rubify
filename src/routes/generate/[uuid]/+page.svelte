<script lang="ts">
	import Run from "$lib/components/Run.svelte";
	import type { PageProps } from "./$types";
	import type { BaseRubyPair } from "$lib/types";

    let { data: annotatedText }: PageProps = $props();

	console.log(`annotatedText: ${JSON.stringify(annotatedText)}}`)

	const baseRubyPairs: BaseRubyPair[] = []
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

</script>


<Run baseRubyPairs={baseRubyPairs}/>
