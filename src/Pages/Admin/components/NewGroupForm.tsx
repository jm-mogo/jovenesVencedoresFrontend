import { Button } from "flowbite-react";
import NewGroupInput from "./NewGroupInput";
import {
  groupCreateSchema,
  GroupCreateValues,
} from "../../../models/groupSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { fetchPost } from "../../../hooks/fetchPost";

export default function NewGroupForm({ fetchData }: { fetchData: () => void }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<GroupCreateValues>({
    resolver: zodResolver(groupCreateSchema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<GroupCreateValues> = (data) => {
    const submitData = async () => {
      const response = await fetchPost("/groups", data);
      if (response.ok) {
        document.getElementById("submitBtn")?.click();
        fetchData();
      }
    };

    submitData();
  };

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-4">
          <h3 className="text-2xl font-medium text-gray-900 dark:text-white">
            Nuevo grupo
          </h3>

          <NewGroupInput
            name="name"
            control={control}
            label="Nombre de grupo *"
            type="text"
            error={errors.name}
          />
          <NewGroupInput
            name="churchName"
            control={control}
            label="Nombre de iglesia *"
            type="text"
            error={errors.churchName}
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
    </>
  );
}
