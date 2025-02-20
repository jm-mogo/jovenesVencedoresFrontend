import { Button } from "flowbite-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

export default function ChangePasswordForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserChangePasswordValues>({
    resolver: zodResolver(userChangePasswordSchema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<UserChangePasswordValues> = (data) => {
    delete data.confirmPassword;

    console.log(data);

    const changePassword = async () => {
      try {
        const response = await fetchPut("/myaccount/password", data);

        if (response.status == 401) {
          control._setErrors({
            oldPassword: {
              type: "manual",
              message: "Contraseña incorrecta",
            },
          });
          return;
        }

        if (response.ok) {
          document.getElementById("submitBtn")?.click();
          alert("Contraseña cambiada exitosamente");
        }
      } catch (error) {
        console.error("Error during login:", error);
      }
    };

    changePassword();
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="space-y-4">
        <h3 className="text-2xl font-medium text-gray-900 dark:text-white">
          Cambiar contraseña
        </h3>

        <ChangePasswordInput
          label="Contraseña actual *"
          name="oldPassword"
          type="password"
          control={control}
          error={errors.oldPassword}
        />

        <ChangePasswordInput
          label="Contraseña nueva *"
          name="newPassword"
          type="password"
          control={control}
          error={errors.newPassword}
        />
        <ChangePasswordInput
          label="Confirmar contraseña *"
          name="confirmPassword"
          type="password"
          control={control}
          error={errors.confirmPassword}
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

import { Controller, FieldError, Control } from "react-hook-form";
import { TextInput } from "flowbite-react";
import {
  userChangePasswordSchema,
  UserChangePasswordValues,
} from "../../models/userSchemas";
import { fetchPut } from "../../hooks/fetchPut";

interface Props {
  name: keyof UserChangePasswordValues;
  control: Control<UserChangePasswordValues>;
  label: string;
  type?: string;
  error?: FieldError;
}

const ChangePasswordInput = ({ name, control, label, type, error }: Props) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextInput
            id={name}
            type={type}
            {...field}
            className={`${error ? "text-red-900" : ""}`}
          />
        )}
      />
      <div className="h-4">
        {error && <p className="text-red-900">{error.message}</p>}
      </div>
    </div>
  );
};
