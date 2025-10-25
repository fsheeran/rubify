import * as fs from "fs";
import { Document, Packer, Paragraph, Tab, TextRun } from "docx";
import type { BaseRubyPair } from "./types";



export default function generateDocx(baseRubyPairs: BaseRubyPair[]): Promise<Blob> {

    //     {#if 'rubyText' in baseRubyPair}
    //     <ruby>{baseRubyPair.baseText}<rt>{baseRubyPair.rubyText}</rt></ruby>
    // {:else}
    //     {baseRubyPair.baseText}
    // {/if}

    const doc = new Document({
        sections: [
            {
                properties: {},
                children: [
                    new Paragraph({
                        children: [
                            new TextRun(`<w:ruby><w:rt><w:r w:rsidR="51393E12" w:rsidRPr="51393E12"><w:rPr><w:rFonts w:ascii="Noto Serif TC" w:eastAsia="Noto Serif TC" w:hAnsi="Noto Serif TC" /><w:sz w:val="16" /><w:szCs w:val="32" /><w:lang w:eastAsia="zh-CN" /></w:rPr><w:t>sì</w:t></w:r></w:rt><w:rubyBase><w:r w:rsidR="51393E12"><w:rPr><w:rFonts w:ascii="Noto Serif TC" w:eastAsia="Noto Serif TC" w:hAnsi="Noto Serif TC" /><w:sz w:val="32" /><w:szCs w:val="32" /><w:lang w:eastAsia="zh-CN" /></w:rPr><w:t>四</w:t></w:r></w:rubyBase></w:ruby>`),
                        ],
                    }),
                ],
            },
        ],
    });

    return Packer.toBlob(doc);
}