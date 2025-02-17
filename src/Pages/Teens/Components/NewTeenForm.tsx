import { Label, Select, Button } from "flowbite-react";
import { TextInput } from "flowbite-react/components/TextInput";
import { useRef, useState } from "react";
import { Parent, Teen } from "../../../types";
import { useFetchParents } from "../../../hooks/useFetchParents";
import { fetchPost } from "../../../hooks/fetchPost";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  teenCreateSchema,
  TeenCreateValues,
} from "../../../models/teenSchemas";
import NewTeenInput from "./NewTeenInput";
import NewTeenRadio from "./NewTeenRadio";
import NewTeenSelect from "./NewTeenSelect";

export default function NewTeenForm({
  fetchData,
}: {
  teens: Teen[];
  fetchData: () => void;
}) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TeenCreateValues>({
    resolver: zodResolver(teenCreateSchema),
    mode: "onBlur",
  });
  // const firstNameInputRef = useRef<HTMLInputElement>(null);
  // const lastNameInputRef = useRef<HTMLInputElement>(null);
  // const [genderInput, setGenderInput] = useState(undefined);
  // const dateOfBirthInputRef = useRef<HTMLInputElement>(null);
  // const phoneNumberInputRef = useRef<HTMLInputElement>(null);
  // const addressInputRef = useRef<HTMLInputElement>(null);
  // const [parentIdSelected, setParentIdSelected] = useState(1);

  const onSubmit: SubmitHandler<TeenCreateValues> = (data) => {
    console.log(data);

    // try {
    //   const response = await fetchPost("/teens", data);
    //   // const {response} = await fetch("http://127.0.0.1:8800/teens", {
    //   //   method: "POST",
    //   //   headers: {
    //   //     "Content-Type": "application/json",
    //   //     Authorization: token ? token : "",
    //   //   },
    //   //   body: JSON.stringify(data),
    //   // });
    //   // console.log(response);
    //   // console.log(await response.json());

    //   if (response.ok) {
    //     fetchData();
    //     // document.getElementById("submitBtn")?.click();
    //   }
    // } catch (error) {
    //   console.error("Error during login:", error);
    // }
  };

  return (
    <form onSubmit={(e) => e.preventDefault}>
      <div className="space-y-4">
        <h3 className="text-2xl font-medium text-gray-900 dark:text-white">
          Nuevo joven
        </h3>
        <div className="flex gap-2">
          <NewTeenInput
            label="Nombre *"
            name="firstName"
            type="text"
            control={control}
            error={errors.firstName}
          />

          <NewTeenInput
            label="Apellido *"
            name="lastName"
            type="text"
            control={control}
            error={errors.lastName}
          />
        </div>
        <NewTeenRadio
          label="Género *"
          name="gender"
          control={control}
          error={errors.gender}
        />
        <NewTeenInput
          label="Fecha de nacimiento *"
          name="dateOfBirth"
          type="date"
          control={control}
          error={errors.dateOfBirth}
        />

        <NewTeenInput
          label="Telefono *"
          name="phoneNumber"
          type="tell"
          control={control}
          error={errors.phoneNumber}
        />
        <NewTeenInput
          label="Dirección *"
          name="address"
          type="text"
          control={control}
          error={errors.address}
        />

        <NewTeenSelect
          label="Representante"
          name="parentId"
          control={control}
          error={errors.parentId}
        />

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
  );
}
