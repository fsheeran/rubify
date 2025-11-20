import type { BaseRubyPair } from "$lib/types";

import JSZip from 'jszip';
import * as fs from "fs";
import { XMLParser, XMLBuilder } from "fast-xml-parser";

const transform = async function (baseRubyPairs: BaseRubyPair[]): Promise<Blob> {
    const templatePath = new URL('../../../lib/server/assets/template.docx', import.meta.url);
    const template = fs.readFileSync(templatePath);
    let zip = await JSZip.loadAsync(template);
    let text = await zip.file('word/document.xml')?.async("string");
    if (!text) {
        return new Blob();
    }

    let options = {
        ignoreAttributes: false,
        removeNSPrefix: false,
        preserveOrder: true
    };

    const parser = new XMLParser(options);
    let parsedXml = parser.parse(text);

    let docPara = parsedXml[1]['w:document'][0]['w:body'][0]['w:p'];
    let rubyTextElement = JSON.stringify(docPara[0]);
    let unrubiedTextElement = JSON.stringify(docPara[1]);

    parsedXml[1]['w:document'][0]['w:body'][0]['w:p'] = baseRubyPairs.map((pair) => {
       if (pair.rubyText) {
            return JSON.parse(rubyTextElement.replace('{rubyText}', pair.rubyText).replace('{baseText}', pair.baseText));
       } else {
            return JSON.parse(unrubiedTextElement.replace('{unrubiedText}', pair.baseText));
       }
    });

    let builtXml = new XMLBuilder(options).build(parsedXml);
    zip.file('word/document.xml', builtXml);

    return zip.generateAsync({
        type: "blob",
        mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        compression: "DEFLATE"
    });
}

export const transformer = {
    fileExtension: "docx",
    transformerFunction: transform
}
