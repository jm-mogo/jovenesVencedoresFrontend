import { z } from "zod";

export const parentCreateSchema = z.object({
  firstName: z.string().nonempty("El nombre es obligatorio"),
  lastName: z.string().nonempty("El apellido es obligatorio"),
  phoneNumber: z
    .string()
    .regex(/^\d+$/, "Solo números")
    .length(11, "El número de teléfono debe tener 11 dígitos")
    .optional(),
});

export type ParentCreateValues = z.infer<typeof parentCreateSchema>;
