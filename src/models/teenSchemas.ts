import { z } from "zod";

export const teenCreateSchema = z.object({
  firstName: z.string().nonempty("El nombre es obligatorio"),
  lastName: z.string().nonempty("El apellido es obligatorio"),
  dateOfBirth: z.string().date(),
  gender: z.enum(["M", "F"]),
  phoneNumber: z
    .string()
    .regex(/^\d+$/, "Solo números")
    .length(11, "El número de teléfono debe tener 11 dígitos")
    .optional(),
  address: z.string().optional(),
  parentId: z.string().optional().default("1"),
});

export type TeenCreateValues = z.infer<typeof teenCreateSchema>;
