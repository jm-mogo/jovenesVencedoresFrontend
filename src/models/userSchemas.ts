import { z } from "zod";

export const userLoginSchema = z.object({
  username: z.string().nonempty("El nombre de usuario es obligatorio"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export const userCreateSchema = z.object({
  username: z.string().nonempty("El nombre de usuario es obligatorio"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export type UserLoginValues = z.infer<typeof userLoginSchema>;
