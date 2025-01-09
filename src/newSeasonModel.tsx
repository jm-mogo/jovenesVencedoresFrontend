import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useRef, useState } from "react";

export default function NewSeasonModal({ seasons, setSeasons }: any) {
  const [openModal, setOpenModal] = useState(false);
  const seasonNameInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const data: any = {
      name: seasonNameInputRef.current?.value,
    };

    let response = await fetch("http://192.168.0.10:8800/seasons", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      setOpenModal(false);
      const { season } = await response.json();
      const newSeasons = [...seasons, season];
      setSeasons(newSeasons);
    }
  };
  return (
    <>
      <Button onClick={() => setOpenModal(true)}>Nueva temporada</Button>
      <Modal
        show={openModal}
        size="md"
        popup
        onClose={() => setOpenModal(false)}
        initialFocus={seasonNameInputRef}
      >
        <Modal.Header />
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <h3 className="text-2xl font-medium text-gray-900 dark:text-white">
                Nueva temporada
              </h3>
              <div className="mb-2 block">
                <Label htmlFor="firstName" value="Nombre *" />
                <TextInput id="firstName" ref={seasonNameInputRef} required />
              </div>

              <div className="text-sm text-gray-500 dark:text-gray-400">
                Todos los campos con * son obligatorios.
              </div>

              <div className="flex w-full items-center justify-end gap-4">
                <Button type="submit">Guardar datos</Button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
