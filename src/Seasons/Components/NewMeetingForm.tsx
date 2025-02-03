import { Button, Label, TextInput } from "flowbite-react";
import { Dispatch, useRef } from "react";
import { Season } from "../../types";

export default function NewMeetingForm({
  season,
  setSeason,
}: {
  season: Season;
  setSeason: Dispatch<Season>;
}) {
  const dateInputRef = useRef<HTMLInputElement>(null);

  const seasonId = season.id;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const data: { date: string | undefined; seasonId: number } = {
      date: dateInputRef.current?.value,
      seasonId: seasonId,
    };

    const response = await fetch("http://127.0.0.1:8800/meetings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const newSeason = { ...season };
      newSeason.meetings.unshift(await response.json());
      setSeason(newSeason);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <h3 className="text-2xl font-medium text-gray-900 dark:text-white">
            Registrar reunión
          </h3>

          <div className="mb-2 block">
            <Label htmlFor="date" value="Fecha *" />
            <TextInput id="date" type="date" required ref={dateInputRef} />
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
