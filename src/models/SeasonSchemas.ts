import { z } from "zod";

export const seasonCreateSchema = z.object({
  name: z.string().nonempty("El nombre es obligatorio"),
  description: z.string().optional(),
});

export const seasonUpdateSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
});

export type SeasonCreateValues = z.infer<typeof seasonCreateSchema>;
export type SeasonUpdateValues = z.infer<typeof seasonUpdateSchema>;
