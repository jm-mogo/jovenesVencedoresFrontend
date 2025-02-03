import { Button, Label, TextInput } from "flowbite-react";
import { Dispatch, useRef } from "react";
import { PointRecord, Season } from "../../types";

export default function UpdatePointsForm({
  pointRecords,
  teamId,
  fetchPointRecords,
}: {
  pointRecords: PointRecord[];
  teamId: number;
  fetchPointRecords: any;
}) {
  const pointsInputRef = useRef<HTMLInputElement>(null);
  const pointRecord = pointRecords.filter(
    (pointRecords) => pointRecords.teamId == teamId,
  )[0];
  console.log(pointRecord);
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const data: { points: number } = {
      points: Number(pointsInputRef.current?.value),
    };

    const response = await fetch(
      "http://127.0.0.1:8800/points/" + pointRecord.id,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );
    if (response.ok) {
      fetchPointRecords();
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <h3 className="text-2xl font-medium text-gray-900 dark:text-white">
            Puntos de {pointRecord.team.name}
          </h3>
          <div className="mb-2 block">
            <Label htmlFor="points" value="Puntos *" />
            <TextInput
              type="number"
              id="points"
              ref={pointsInputRef}
              required
              defaultValue={pointRecord.points}
            />
          </div>

          <div className="text-sm text-gray-500 dark:text-gray-400">
            Todos los campos con * son obligatorios.
          </div>

          <div className="flex w-full items-center justify-end gap-4">
            <Button type="submit">Guardar datos</Button>
          </div>
        </div>
      </form>
    </>
  );
}
