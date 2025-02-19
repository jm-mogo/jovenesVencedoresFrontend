import { z } from "zod";
// import { Role } from "../types";

export const userLoginSchema = z.object({
  username: z.string().nonempty("El nombre de usuario es obligatorio"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export const userCreateSchema = z
  .object({
    username: z.string().nonempty("El nombre de usuario es obligatorio"),
    password: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres"),
    confirmPassword: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .optional(),
    role: z.enum(["owner", "admin", "viewer"]),
    groupId: z.number().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export type UserCreateValues = z.infer<typeof userCreateSchema>;
export type UserLoginValues = z.infer<typeof userLoginSchema>;
