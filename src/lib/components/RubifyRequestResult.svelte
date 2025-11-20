<script lang="ts">
    import type { AnnotatedText, BaseRubyPair } from "$lib/types";
    import EditableRun from "$lib/components/EditableRun.svelte";
    import { saveFile } from "$lib/fileUtils";
    import InputError from "$lib/components/InputError.svelte";

    interface RubyRequestResult {
        annotatedText: AnnotatedText | undefined;
        availableFileExtensions: string[];
    }

    let { annotatedText, availableFileExtensions }: RubyRequestResult = $props();

    let baseRubyPairs: BaseRubyPair[] = $state([]);

    let dropdownExpanded = $state(false);

    let exportError = $state(undefined);

    if (annotatedText?.segments) {
        for (const segment of annotatedText.segments) {
            if (segment.annotations) {
                if (segment.annotations.length > 0) {
                    if (segment.annotations[0].indices[0] > segment.indices[0]) {
                        baseRubyPairs.push({
                            baseText: annotatedText.baseText.slice(
                                segment.indices[0],
                                segment.annotations[0].indices[0],
                            ),
                        });
                    }
                    for (let i = 0; i < segment.annotations.length; i++) {
                        let annotation = segment.annotations[i];
                        if (i > 0 && segment.annotations[i - 1].indices[1] < annotation.indices[0]) {
                            baseRubyPairs.push({
                                baseText: annotatedText.baseText.slice(
                                    segment.annotations[i - 1].indices[1],
                                    annotation.indices[0],
                                ),
                            });
                        }
                        baseRubyPairs.push({
                            baseText: annotatedText.baseText.slice(annotation.indices[0], annotation.indices[1]),
                            rubyText: annotation.annotationText,
                        });
                    }
                    if (segment.annotations[segment.annotations.length - 1].indices[1] < segment.indices[1]) {
                        baseRubyPairs.push({
                            baseText: annotatedText.baseText.slice(
                                segment.annotations[segment.annotations.length - 1].indices[1],
                                segment.indices[1],
                            ),
                        });
                    }
                } else {
                    baseRubyPairs.push({
                        baseText: annotatedText.baseText.slice(segment.indices[0], segment.indices[1]),
                        rubyText: "",
                    });
                }
            } else {
                baseRubyPairs.push({ baseText: annotatedText.baseText.slice(segment.indices[0], segment.indices[1]) });
            }
        }
    }

    const exportRuby = (fileExtension: string) => async () => {
        const request = new Request("/export", {
            method: "POST",
            body: JSON.stringify({ fileExtension, baseRubyPairs }),
        });


        const response = await fetch(request);
        if (!response.ok) {
            exportError = await response.json();
        }

        saveFile(await response.blob(), `ruby.${fileExtension}`);
    };
</script>

<!-- {#if isFinalized} -->
<!-- <div class="text-container">
	<FinalizedRun baseRubyPairs={baseRubyPairs}/>
</div>
	<Button buttonText="Keep editing" onClick={() => isFinalized = false}/>
{:else} -->
<div class="text-container">
    <EditableRun
        {baseRubyPairs}
        onEdit={(pairIndex, pair) => {
            baseRubyPairs[pairIndex] = pair;
        }}
    />
    <!-- <Button buttonText="Copy to clipboard as HTML" onClick={}/> -->
    <!-- <Button buttonText="Download as docx" onClick={async() => saveFile(await generateDocx(baseRubyPairs), 'rubify.docx')}/> -->

    <div class="dropdown">
        <button
            class="dropdown-toggle"
            aria-expanded={dropdownExpanded}
            onclick={() => (dropdownExpanded = !dropdownExpanded)}
        >
            Download as...
        </button>
        <ul class="dropdown-menu {dropdownExpanded ? '' : 'visually-hidden'}">
            {#each availableFileExtensions as fileExtension }
                <li>
                    <button aria-hidden={!dropdownExpanded} onclick={exportRuby(fileExtension)}>
                        {`.${fileExtension}`}
                    </button>
                </li>
            {/each}
        </ul>
    </div>

    {#if exportError}
        <InputError errorText={JSON.stringify(exportError)} />
    {/if}
</div>

<!-- {/if} -->

<style>
    .text-container {
        margin: auto;
        max-width: 66vw;
        width: 100%;
        font-size: calc(24px + 8 * (100vw - 1000px) / 3000);
    }

    ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    ul li {
        position: relative;
        display: inline-block;
    }

    button {
        display: block;
        padding: 10px 20px;
        text-decoration: none;
        color: #fff;
        background-color: #333;
        border-radius: 4px;
    }
</style>
