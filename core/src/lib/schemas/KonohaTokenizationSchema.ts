import * as z from "zod/v4";

export default z.object({
    tokens: z.array(z.object({
        surface: z.string(),
        yomi: z.string(),
        base_form: z.string(),
        normalized_form: z.string()
    }))
});
