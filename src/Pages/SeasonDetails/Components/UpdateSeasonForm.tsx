import { Button, TextInput } from "flowbite-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import {
  seasonUpdateSchema,
  SeasonUpdateValues,
} from "../../../models/SeasonSchemas";
import { Season } from "../../../types";
import { fetchPut } from "../../../hooks/fetchPut";

export default function UpdateSeasonForm({
  season,
  fetchData,
}: {
  season: Season;
  fetchData: () => void;
}) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SeasonUpdateValues>({
    resolver: zodResolver(seasonUpdateSchema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<SeasonUpdateValues> = async (data) => {
    const response = await fetchPut("/seasons/" + season.id, data);
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
            Editar temporada
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
                  defaultValue={season.name}
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
          <div>
            <label htmlFor="description">Descripción </label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextInput
                  id="description"
                  type="text"
                  defaultValue={season.description}
                  {...field}
                  className={`${errors.description ? "text-red-900" : ""}`}
                />
              )}
            />
            <div className="h-4">
              {errors.description && (
                <p className="text-red-900">{errors.description.message}</p>
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
