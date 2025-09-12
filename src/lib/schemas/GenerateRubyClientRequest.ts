import * as z from "zod/v4";


// .transform((s) => s.normalize());

const unicode_blocks = [
    'CJK_Compatibility',
    'CJK_Symbols_And_Punctuation',
    'Vertical_Forms',
    'CJK_Compatibility_Forms',
    'Small_Form_Variants',
    'Halfwidth_And_Fullwidth_Forms',
    'Ideographic_Description_Characters',
    'Kanbun',
    'CJK_Strokes',
    'Enclosed_CJK_Letters_And_Months',
    'Katakana'
];

const schema = z.union([
  z.string().regex(/^abc\d+$/), // Matches "abc" followed by one or more digits
  z.string().regex(/^[A-Z]{3}$/), // Matches exactly three uppercase letters
]);

const validStrings = [];
for (let block in unicode_blocks) {
    validStrings.push(z.coerce.string().normalize().regex(new RegExp(`\p{${block}}`, "gu")));
}

const baseText = z.union(validStrings);

export default z.object({ baseText });