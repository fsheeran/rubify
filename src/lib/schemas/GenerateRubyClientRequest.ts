import * as z from "zod/v4";

const baseText = z.coerce
                    .string()
                    .normalize()
                    .regex(
                        new RegExp(/\p{sc=Han}/gu),
                        "Input does not contain any Hanzi/Hanja/Kanji"
                    );

export default z.object({ baseText });
