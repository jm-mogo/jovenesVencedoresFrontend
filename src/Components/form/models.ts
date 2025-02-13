import { z } from "zod";

export const userNewSchema = z
  .object({
    username: z.string().min(1, "El nombre de usuario es obligatorio"),
    password: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres"),
    confirmPassword: z
      .string()
      .min(6, "La confirmación debe tener al menos 6 caracteres"),
    role: z.enum(["owner", "admin", "viewer"]),
    groupId: z.number(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas son diferentes",
    path: ["confirmPassword"],
  });

export type FormUserValues = z.infer<typeof userNewSchema>;
