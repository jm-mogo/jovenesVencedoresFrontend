import { Button, TextInput } from "flowbite-react";
import { PointRecord } from "../../../types";
import {
  pointRecordUpdateSchema,
  PointRecordUpdateValues,
} from "../../../models/pointRecord";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { fetchPut } from "../../../hooks/fetchPut";

export default function UpdatePointsForm({
  pointRecords,
  teamId,
  fetchPointRecords,
}: {
  pointRecords: PointRecord[];
  teamId: number;
  fetchPointRecords: () => void;
}) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PointRecordUpdateValues>({
    resolver: zodResolver(pointRecordUpdateSchema),
    mode: "onBlur",
  });

  const pointRecord = pointRecords.filter(
    (pointRecords) => pointRecords.teamId == teamId,
  )[0];

  const onSubmit: SubmitHandler<PointRecordUpdateValues> = async (data) => {
    console.log(data);
    const response = await fetchPut("/points/" + pointRecord.id, data);
    if (response.ok) {
      fetchPointRecords();
    }
  };
  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-4">
          <h3 className="text-2xl font-medium text-gray-900 dark:text-white">
            Puntos de {pointRecord.team.name}
          </h3>
          <div>
            <label htmlFor="points">Puntos *</label>
            <Controller
              name="points"
              control={control}
              render={({ field }) => (
                <TextInput
                  id="points"
                  type="number"
                  defaultValue={pointRecord.points}
                  {...field}
                  className={`${errors.points ? "text-red-900" : ""}`}
                />
              )}
            />
            <div className="h-4">
              {errors.points && (
                <p className="text-red-900">{errors.points.message}</p>
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
