import { Button, Label, TextInput } from "flowbite-react";
import { useRef } from "react";

export default function NewTeamForm({ seasonId }: { seasonId: number }) {
  const teamNameInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const data: { name: string | undefined; seasonId: number } = {
      name: teamNameInputRef.current?.value,
      seasonId: seasonId,
    };

    const response = await fetch("http://127.0.0.1:8800/teams", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      window.location.reload();
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <h3 className="text-2xl font-medium text-gray-900 dark:text-white">
            Nuevo equipo
          </h3>
          <div className="mb-2 block">
            <Label htmlFor="firstName" value="Nombre *" />
            <TextInput id="firstName" ref={teamNameInputRef} required />
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
