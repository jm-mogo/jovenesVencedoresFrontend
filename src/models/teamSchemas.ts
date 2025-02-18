import { z } from "zod";

export const teamCreateSchema = z.object({
  name: z.string().nonempty("El nombre es obligatorio"),
  seasonId: z.number().optional(),
});

export type TeamCreateValues = z.infer<typeof teamCreateSchema>;
