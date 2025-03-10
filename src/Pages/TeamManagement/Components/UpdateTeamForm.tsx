import { Button, TextInput } from "flowbite-react";
import { Team } from "../../../types";
import {
  teamCreateSchema,
  TeamCreateValues,
} from "../../../models/teamSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { fetchPut } from "../../../hooks/fetchPut";

export default function UpdateTeamForm({
  team,
  fetchData,
}: {
  team: Team;
  fetchData: () => void;
}) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TeamCreateValues>({
    resolver: zodResolver(teamCreateSchema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<TeamCreateValues> = async (data) => {
    const response = await fetchPut("/teams/" + team.seasonId, data);
    if (response.ok) {
      fetchData();
    }
  };
  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-4">
          <h3 className="text-2xl font-medium text-gray-900 dark:text-white">
            Editar equipo
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
                  defaultValue={team.name}
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
          </div>
        </div>
      </form>
    </>
  );
}
