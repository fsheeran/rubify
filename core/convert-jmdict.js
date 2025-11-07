import fs from "fs";

// Configuration
const INPUT_FILE = "src/lib/assets/ProcessedJmdictFurigana.json";
const OUTPUT_FILE = "src/lib/assets/JmdictFurigana.json";

async function transformJSON(inputFile, outputFile) {
    // try {
    console.log(`Reading from ${inputFile}...`);

    // Check if input file exists
    if (!fs.existsSync(inputFile)) {
        throw new Error(`Input file not found: ${inputFile}`);
    }

    // Read the JSON file
    const fileContent = fs.readFileSync(inputFile, "utf8");

    console.log("Parsing JSON...");
    const dataArray = JSON.parse(fileContent);

    if (!Array.isArray(dataArray)) {
        throw new Error("JSON content is not an array");
    }

    console.log(`Found ${dataArray.length} items`);
    console.log("Transforming to key-value mapping...");

    // Transform array to key-value mapping
    const mapping = {};

    for (const item of dataArray) {
        const text = item.text;

        if (!text) {
            console.warn("Found item without text property, skipping");
            continue;
        }

        if (!mapping[text]) {
            mapping[text] = [];
        }

        mapping[text].push(item);
    }

    console.log(`Created mapping with ${Object.keys(mapping).length} unique text`);
    console.log(`Writing to ${outputFile}...`);

    // Write output file
    fs.writeFileSync(outputFile, JSON.stringify(mapping, null, 2));

    console.log("Done!");

    return mapping;

    // } catch (error) {
    //   throw new Error(`Failed to process JSON: ${error.message}`);
    // }
}

transformJSON(INPUT_FILE, OUTPUT_FILE);

try {
    fs.unlinkSync(INPUT_FILE);
    console.log("File deleted successfully:", INPUT_FILE);
} catch (err) {
    console.error("Error deleting file:", err);
}
