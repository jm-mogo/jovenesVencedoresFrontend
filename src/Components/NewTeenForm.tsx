import { Label, Select, Button } from "flowbite-react";
import { TextInput } from "flowbite-react/components/TextInput";
import { useRef, useState } from "react";
import { Teen } from "../types";
import { useFetchParents } from "../hooks/useFetchParents";

export default function NewTeenForm({
  teens,
  setTeens,
}: {
  teens: Teen[];
  setTeens: Function;
}) {
  const firstNameInputRef = useRef<HTMLInputElement>(null);
  const lastNameInputRef = useRef<HTMLInputElement>(null);
  const [genderInput, setGenderInput] = useState(undefined);
  const dateOfBirthInputRef = useRef<HTMLInputElement>(null);
  const phoneNumberInputRef = useRef<HTMLInputElement>(null);
  const addressInputRef = useRef<HTMLInputElement>(null);
  const [parentIdSelected, setParentIdSelected] = useState(1);
  const { parents } = useFetchParents();

  const handleChangeParentId = (e: any) => {
    setParentIdSelected(Number(e.target.value));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const data: any = {
      firstName: firstNameInputRef.current?.value,
      lastName: lastNameInputRef.current?.value,
      gender: genderInput,
      dateOfBirth: dateOfBirthInputRef.current?.value,
      parentId: parentIdSelected,
    };

    console.log(parentIdSelected);

    if (phoneNumberInputRef.current?.value) {
      data.phoneNumber = phoneNumberInputRef.current.value;
    }
    if (addressInputRef.current?.value) {
      data.address = addressInputRef.current.value;
    }

    let response = await fetch("http://192.168.0.10:8800/teens", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const { teen } = await response.json();
      console.log(teen);
      const newTeens = [...teens, teen];
      setTeens(newTeens);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <h3 className="text-2xl font-medium text-gray-900 dark:text-white">
          Nuevo joven
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
        <div>
          <div className="mb-2 block">
            <Label htmlFor="gender" value="Género *" />
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="male"
                name="gender"
                value="M"
                onClick={(event: any) => setGenderInput(event.target.value)}
                required
              />
              <Label htmlFor="male">Masculino</Label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="female"
                name="gender"
                value="F"
                onClick={(event: any) => setGenderInput(event.target.value)}
                required
              />
              <Label htmlFor="female">Femenino</Label>
            </div>
          </div>
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="dateOfBirth" value="Fecha de nacimiento *" />
          </div>
          <TextInput
            id="dateOfBirth"
            type="date"
            required
            ref={dateOfBirthInputRef}
          />
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
        <div className="mb-2 block">
          <Label htmlFor="address" value="Dirección" />
          <TextInput id="address" ref={addressInputRef} />
        </div>

        <div className="mb-2 block">
          <Label htmlFor="parentId" value="Representante" />
          <Select id="parentId" required onChange={handleChangeParentId}>
            {parents.map((parent: any) => (
              <option value={parent.id}>
                {parent.firstName} {parent.lastName}
              </option>
            ))}
          </Select>
        </div>

        <div className="text-sm text-gray-500 dark:text-gray-400">
          Todos los campos con * son obligatorios.
        </div>

        <div className="flex w-full items-center justify-end gap-4">
          <Button type="submit">Guardar datos</Button>
        </div>
      </div>
    </form>
  );
}
