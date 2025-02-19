import { Controller, FieldError, Control } from "react-hook-form";
import { Label } from "flowbite-react";
import { UserCreateValues } from "../../../models/userSchemas";
import { useUser } from "../../../hooks/useUser";
import ErrorPage from "../../../ErrorPage";

interface Props {
  name: keyof UserCreateValues;
  control: Control<UserCreateValues>;
  label: string;
  error?: FieldError;
}

const NewUserRadio = ({ name, control, label, error }: Props) => {
  const user = useUser();

  if (!user) return <ErrorPage />;

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="flex gap-4 pt-1">
            {user.role == "primaryOwner" && (
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="owner"
                  {...field}
                  value="owner"
                  required
                />
                <Label htmlFor="owner">Owner</Label>
              </div>
            )}

            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="admin"
                {...field}
                value="admin"
                required
              />
              <Label htmlFor="admin">Admin</Label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="viewer"
                {...field}
                value="viewer"
                required
              />
              <Label htmlFor="viewer">Viewer </Label>
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

export default NewUserRadio;
