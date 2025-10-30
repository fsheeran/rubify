import * as z from "zod/v4";
import { hanRegExp } from "$lib/cjkUtils";

let noSpecialCharactersRegexp = new RegExp(/^[a-zA-Z0-9\s]*$/);
export const baseText = z.coerce
                    .string()
                    .trim()
                    .normalize()
                    .max(2000)
                    .min(1)
                    .regex(
                        hanRegExp,
                        "Input does not contain any Hanzi/Hanja/Kanji"
                    );

export default z.object({ baseText });
