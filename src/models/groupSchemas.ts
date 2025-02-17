import { z } from "zod";

export const groupCreateSchema = z.object({
  name: z.string().nonempty("El nombre es obligatorio"),
  churchName: z.string().nonempty("La iglesia es obligatorio"),
});

export type GroupCreateValues = z.infer<typeof groupCreateSchema>;
