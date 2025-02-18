import { z } from "zod";

export const seasonCreateSchema = z.object({
  name: z.string().nonempty("El nombre es obligatorio"),
});

export type SeasonCreateValues = z.infer<typeof seasonCreateSchema>;
