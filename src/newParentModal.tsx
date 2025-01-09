import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useRef, useState } from "react";

export default function NewParentModal({ parents, setParents }: any) {
  const [openModal, setOpenModal] = useState(false);
  const firstNameInputRef = useRef<HTMLInputElement>(null);
  const lastNameInputRef = useRef<HTMLInputElement>(null);
  const phoneNumberInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const data: any = {
      firstName: firstNameInputRef.current?.value,
      lastName: lastNameInputRef.current?.value,
    };

    if (phoneNumberInputRef.current?.value) {
      data.phoneNumber = phoneNumberInputRef.current.value;
    }

    let response = await fetch("http://localhost:8800/parents", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      setOpenModal(false);
      const { parent } = await response.json();
      const newParents = [...parents, parent];
      setParents(newParents);
    }
  };
  return (
    <>
      <Button onClick={() => setOpenModal(true)}>Nuevo representante</Button>
      <Modal
        show={openModal}
        size="md"
        popup
        onClose={() => setOpenModal(false)}
        initialFocus={firstNameInputRef}
      >
        <Modal.Header />
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <h3 className="text-2xl font-medium text-gray-900 dark:text-white">
                Nuevo representante
              </h3>
              <div className="flex gap-2">
                <div className="mb-2 block">
                  <Label htmlFor="firstName" value="Nombre *" />
                  <TextInput id="firstName" ref={firstNameInputRef} required />
                </div>
                <div className="mb-2 block"></div>
                <div className="mb-2 block">
                  <Label htmlFor="lastName" value="Apellido *" />

                  <TextInput id="lastName" ref={lastNameInputRef} required />
                </div>
              </div>

              <div className="mb-2 block">
                <Label htmlFor="phoneNumber" value="Teléfono" />

                <TextInput
                  type="tel"
                  minLength={11}
                  maxLength={11}
                  id="phoneNumber"
                  pattern="[0-9]{11}"
                  ref={phoneNumberInputRef}
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
        </Modal.Body>
      </Modal>
    </>
  );
}