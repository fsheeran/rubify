<script lang="ts">
    import type { AnnotatedText, BaseRubyPair } from "$lib/types";
    import EditableRun from "$lib/components/EditableRun.svelte";
    import { saveFile } from "$lib/fileUtils";
    import { getTransformers } from "$lib/fileFormatTransformers";
    import InputError from "$lib/components/InputError.svelte";

    interface RubyRequestResult {
        annotatedText: AnnotatedText | undefined;
    }

    let { annotatedText }: RubyRequestResult = $props();

    let baseRubyPairs: BaseRubyPair[] = $state([]);

    let dropdownExpanded = $state(false);

    let exportError = $state(undefined);

    if (annotatedText?.segments) {
        for (const segment of annotatedText.segments) {
            if (segment.annotations) {
                if (segment.annotations.length > 0) {
                    for (const annotation of segment.annotations) {
                        baseRubyPairs.push({
                            baseText: annotatedText.baseText.slice(annotation.indices[0], annotation.indices[1]),
                            rubyText: annotation.annotationText,
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
        // console.log(`making body: ${JSON.stringify({fileExtension, baseRubyPairs})}`);
        const request = new Request("/export", {
            method: "POST",
            body: JSON.stringify({ fileExtension, baseRubyPairs }),
        });

        // console.log(`submitting ${request.body}`)

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
            baseRubyPairs ??= [];
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
            {#each getTransformers() as { fileExtension, transformerFunction }}
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
