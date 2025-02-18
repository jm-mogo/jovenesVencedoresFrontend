import { Controller, FieldError, Control } from "react-hook-form";
import { TextInput } from "flowbite-react";
import { ParentCreateValues } from "../../../models/parentSchemas";

interface Props {
  name: keyof ParentCreateValues;
  control: Control<ParentCreateValues>;
  label: string;
  type?: string;
  error?: FieldError;
}

const NewParentInput = ({ name, control, label, type, error }: Props) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextInput
            id={name}
            type={type}
            {...field}
            className={`${error ? "text-red-900" : ""}`}
          />
        )}
      />
      <div className="h-4">
        {error && <p className="text-red-900">{error.message}</p>}
      </div>
    </div>
  );
};

export default NewParentInput;
