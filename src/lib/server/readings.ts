// interface RubiedText {
//   base: string;
//   ruby: string;
// }

const jpnReadings = new Map([
  ['我', 'わ'],
]);


// this will be something more complex later
export function getJpnReading(baseText: string): string[][] {
    const baseTextAndRuby = [];
    for (const base of baseText) {
        baseTextAndRuby.push([base, jpnReadings.get(base) ?? '']);
        // baseTextAndRuby.push({base, ruby: jpnReadings.get(base) ?? ''});
    }
    return baseTextAndRuby;
}
