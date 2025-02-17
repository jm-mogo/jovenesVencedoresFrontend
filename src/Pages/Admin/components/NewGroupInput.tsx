import { Controller, FieldError, Control } from "react-hook-form";
import { TextInput } from "flowbite-react";
import { GroupCreateValues } from "../../../models/groupSchemas";

interface Props {
  name: keyof GroupCreateValues;
  control: Control<GroupCreateValues>;
  label: string;
  type?: string;
  error?: FieldError;
}

const NewGroupInput = ({ name, control, label, type, error }: Props) => {
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

export default NewGroupInput;
