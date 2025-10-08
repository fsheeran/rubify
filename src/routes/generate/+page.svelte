<script lang="ts">

	import Run from "$lib/components/Run.svelte";
	import type { PageProps } from "./$types";
	import type { BaseRubyPair } from "$lib/types";

    let { data }: PageProps = $props();

	const annotatedText = data.annotatedText;
	const baseRubyPairs: BaseRubyPair[] = []

	if (annotatedText) {
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
		if (prevSegEnd < annotatedText.baseText.length) {
			baseRubyPairs.push([annotatedText.baseText.slice(prevSegEnd), null]);
		}
	}

</script>

<Run baseRubyPairs={baseRubyPairs}/>