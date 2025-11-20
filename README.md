# rubify
Rubify is a web application designed to make adding pronunciation guides to Chinese, Japanese, and Korean (CJK) text as simple and quick as possible.

This is very much a work-in-progress. Although additional languages, file formats, and more advanced AI-based annotation/segmentation is planned, only Japanese documents and DOCX downloads are currently supported.

## Usage

1. **Paste or type your CJK text** into the main input area.
2. **Submit** to process the text. The app will analyze the input and generate segments with optional ruby (pronunciation) annotations.
3. **Edit** any part of the output if necessary to ensure accurate readings.
4. **Download** your annotated text in the format you prefer.

## Supported Export Formats

- DOCX (Microsoft Word)
- More formats coming soon!

## Technical Details

- Built with [SvelteKit](https://kit.svelte.dev/)
- backend text segmentation and annotation built with FastAPI (see [rubify-backend](https://github.com/fsheeran/rubify-backend))
- DOCX generation is performed server-side using templates and the JSZip and fast-xml-parser libraries.

## Development

To run locally:

```sh
npm install
npm run dev
```

To build for production:

```sh
npm run build
```

Docker support:

A basic Dockerfile is included. Build with:

```sh
docker build -t rubify .
```

## License

Apache License Version 2.0 (see LICENSE)
