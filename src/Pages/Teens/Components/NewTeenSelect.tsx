import { Controller, FieldError, Control } from "react-hook-form";
import { Select } from "flowbite-react";
import { TeenCreateValues } from "../../../models/teenSchemas";
import { Parent } from "../../../types";
import { useFetchParents } from "../../../hooks/useFetchParents";

interface Props {
  name: keyof TeenCreateValues;
  control: Control<TeenCreateValues>;
  label: string;
  type?: string;
  error?: FieldError;
}

const NewTeenSelect = ({ name, control, label, error }: Props) => {
  const { parents } = useFetchParents();
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          //   <TextInput
          //     id={name}
          //     type={type}
          //     {...field}
          //     className={`${error ? "text-red-900" : ""}`}
          //   />
          <Select id={name} {...field}>
            {parents.map((parent: Parent) => (
              <option value={parent.id}>
                {parent.firstName} {parent.lastName}
              </option>
            ))}
          </Select>
        )}
      />
      <div className="h-4">
        {error && <p className="text-red-900">{error.message}</p>}
      </div>
    </div>
  );
};

export default NewTeenSelect;
