import { Button } from "flowbite-react";
import { fetchPost } from "../../../hooks/fetchPost";
import {
  parentCreateSchema,
  ParentCreateValues,
} from "../../../models/parentSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import NewParentInput from "./NewParentInput";

export default function NewParentForm({
  fetchData,
}: {
  fetchData: () => void;
}) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ParentCreateValues>({
    resolver: zodResolver(parentCreateSchema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<ParentCreateValues> = async (data) => {
    const response = await fetchPost("/parents", data);
    if (response.ok) {
      document.getElementById("submitBtn")?.click();
      fetchData();
    }
  };
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="space-y-4">
        <h3 className="text-2xl font-medium text-gray-900 dark:text-white">
          Nuevo representante
        </h3>
        <div className="flex gap-2">
          <NewParentInput
            label="Nombre *"
            name="firstName"
            control={control}
            error={errors.firstName}
          />

          <NewParentInput
            label="Apellido *"
            name="lastName"
            control={control}
            error={errors.lastName}
          />
        </div>

        <NewParentInput
          label="Teléfono *"
          name="phoneNumber"
          type="tell"
          control={control}
          error={errors.phoneNumber}
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
