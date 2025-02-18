import { Button } from "flowbite-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import NewUserInput from "./NewUserInput";
import {
  userCreateSchema,
  UserCreateValues,
} from "../../../models/userSchemas";
import NewUserRadio from "./NewUserRadio";
import { fetchPost } from "../../../hooks/fetchPost";

export default function NewUserForm({
  groupId,
  fetchGroup,
}: {
  groupId: number;
  fetchGroup: () => void;
}) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserCreateValues>({
    resolver: zodResolver(userCreateSchema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<UserCreateValues> = (data) => {
    data.groupId = groupId;
    data.username = data.username.toLowerCase();
    console.log(data);

    const register = async () => {
      try {
        const response = await fetchPost("/users/register", data);

        if (response.status == 409) {
          control._setErrors({
            username: {
              type: "manual",
              message: "Nombre de usuario ya usado",
            },
          });
          return;
        }

        if (response.ok) {
          document.getElementById("submitBtn")?.click();
          fetchGroup();
        }
      } catch (error) {
        console.error("Error during login:", error);
      }
    };

    register();
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="space-y-4">
        <h3 className="text-2xl font-medium text-gray-900 dark:text-white">
          Nuevo usuario
        </h3>

        <NewUserInput
          label="Nombre de usuario *"
          name="username"
          type="text"
          control={control}
          error={errors.username}
        />

        <NewUserInput
          label="Contraseña *"
          name="password"
          type="password"
          control={control}
          error={errors.password}
        />

        <NewUserRadio
          label="Rol de usuario *"
          name="role"
          control={control}
          error={errors.role}
        />

        <div className="text-sm text-gray-500 dark:text-gray-400">
          Todos los campos con * son obligatorios.
        </div>

        <div className="flex w-full items-center justify-end gap-4">
          <Button type="button" onClick={handleSubmit(onSubmit)}>
            Guardar datos
          </Button>
          <button hidden type="submit" id="submitBtn"></button>
        </div>
      </div>
    </form>
  );
}
