import { Label, Select, Button } from "flowbite-react";
import { TextInput } from "flowbite-react/components/TextInput";
import { useEffect, useRef, useState } from "react";
import { User } from "../../types";
import { useFetchParents } from "../../hooks/useFetchParents";
import { Group } from "../types";

export default function NewUserForm({
  groupId,
  fetchGroup,
}: {
  groupId: number;
  fetchGroup: Function;
}) {
  const [role, setRole] = useState("owner");

  const usernameInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const token = localStorage.getItem("jwtToken");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const data: User = {
      username: usernameInputRef.current?.value,
      password: passwordInputRef.current?.value,
      role: role,
      groupId: groupId,
    };

    const response = await fetch("http://127.0.0.1:8800/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? token : "",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      console.log("user created");
      fetchGroup();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <h3 className="text-2xl font-medium text-gray-900 dark:text-white">
          Nuevo usuario
        </h3>

        <div className="mb-2 block">
          <Label htmlFor="username" value="Nombre de usuario *" />
          <TextInput id="username" ref={usernameInputRef} required />
        </div>
        <div className="mb-2 block"></div>
        <div className="mb-2 block">
          <Label htmlFor="lastName" value="Contraseña *" />

          <TextInput
            type="password"
            id="lastName"
            ref={passwordInputRef}
            required
          />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="role" value="Rol de usuario *" />
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="owner"
                name="role"
                value="owner"
                onClick={(event: any) => setRole(event.target.value)}
                required
              />
              <Label htmlFor="owner">Owner</Label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="admin"
                name="role"
                value="admin"
                onClick={(event: any) => setRole(event.target.value)}
                required
              />
              <Label htmlFor="admin">Admin</Label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="viewer"
                name="role"
                value="viewer"
                onClick={(event: any) => setRole(event.target.value)}
                required
              />
              <Label htmlFor="viewer">Viewer </Label>
            </div>
          </div>
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
