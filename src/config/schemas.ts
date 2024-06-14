import z from "zod";

export const translationSchema = z.object({
  original: z.string(),
  translation: z.string(),
});
