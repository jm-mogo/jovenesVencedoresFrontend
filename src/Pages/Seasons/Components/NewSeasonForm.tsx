import { Button, TextInput } from "flowbite-react";
import { fetchPost } from "../../../hooks/fetchPost";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import {
  seasonCreateSchema,
  SeasonCreateValues,
} from "../../../models/SeasonSchemas";

export default function NewSeasonForm({
  fetchData,
}: {
  fetchData: () => void;
}) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SeasonCreateValues>({
    resolver: zodResolver(seasonCreateSchema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<SeasonCreateValues> = async (data) => {
    console.log(data);
    const response = await fetchPost("/seasons", data);
    if (response.ok) {
      fetchData();
      document.getElementById("submitBtn")?.click();
    }
  };
  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-4">
          <h3 className="text-2xl font-medium text-gray-900 dark:text-white">
            Nueva temporada
          </h3>

          <div>
            <label htmlFor="name">Nombre *</label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextInput
                  id="name"
                  type="text"
                  {...field}
                  className={`${errors.name ? "text-red-900" : ""}`}
                />
              )}
            />
            <div className="h-4">
              {errors.name && (
                <p className="text-red-900">{errors.name.message}</p>
              )}
            </div>
          </div>
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
