import { Controller, FieldError, Control } from "react-hook-form";
import { Label } from "flowbite-react";
import { TeenCreateValues } from "../../../models/teenSchemas";

interface Props {
  name: keyof TeenCreateValues;
  control: Control<TeenCreateValues>;
  label: string;
  error?: FieldError;
}

const NewTeenRadio = ({ name, control, label, error }: Props) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div>
            <div className="flex gap-4 pt-2">
              <div className="flex items-center gap-2">
                <input type="radio" id="male" {...field} value="M" />
                <Label htmlFor="male">Masculino</Label>
              </div>
              <div className="flex items-center gap-2">
                <input type="radio" id="female" {...field} value="F" />
                <Label htmlFor="female">Femenino</Label>
              </div>
            </div>
          </div>
        )}
      />
      <div className="h-4">
        {error && <p className="text-red-900">{error.message}</p>}
      </div>
    </div>
  );
};

export default NewTeenRadio;
