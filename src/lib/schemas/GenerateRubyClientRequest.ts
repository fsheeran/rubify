import * as z from "zod/v4";
import { hanRegExp } from "$lib/cjkUtils";

const baseText = z.coerce
                    .string()
                    .normalize()
                    .regex(
                        hanRegExp,
                        "Input does not contain any Hanzi/Hanja/Kanji"
                    );

export default z.object({ baseText });
