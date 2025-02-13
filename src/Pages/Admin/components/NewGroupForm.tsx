import { Button, Label, TextInput } from "flowbite-react";
import { useRef } from "react";

export default function NewGroupForm({ fetchData }: { fetchData: () => void }) {
  const groupNameInputRef = useRef<HTMLInputElement>(null);
  const churchNameInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const data: { name: string | undefined; churchName: string | undefined } = {
      name: groupNameInputRef.current?.value,
      churchName: churchNameInputRef.current?.value,
    };

    const token = localStorage.getItem("jwtToken");

    const response = await fetch("http://127.0.0.1:8800/groups", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? token : "",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      console.log("succesful");
      fetchData();
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <h3 className="text-2xl font-medium text-gray-900 dark:text-white">
            Nuevo grupo
          </h3>
          <div className="mb-2 block">
            <Label htmlFor="name" value="Nombre *" />
            <TextInput id="name" ref={groupNameInputRef} required />
          </div>
          <div className="mb-2 block">
            <Label htmlFor="churchName" value="Iglesia *" />
            <TextInput id="churchName" ref={churchNameInputRef} required />
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
