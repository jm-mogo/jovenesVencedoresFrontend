import { ReactNode } from "react";
import { userLoginSchema, UserLoginValues } from "../../models/userSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";

import { Button, Label } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import InputForm from "./LoginInputs";
import { fetchPost } from "../../hooks/fetchPost";

const LoginForm = (): ReactNode => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLoginValues>({
    resolver: zodResolver(userLoginSchema),
    mode: "onBlur",
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<UserLoginValues> = (data) => {
    // Handle login logic here
    const login = async () => {
      try {
        const response = await fetchPost("/users/login", data);
        console.log("Response:", response);
        if (response.status == 404) {
          control._setErrors({
            username: {
              type: "manual",
              message: "Usuario no encontrado",
            },
          });
          return;
        }

        if (response.status == 401) {
          control._setErrors({
            password: {
              type: "manual",
              message: "Contraseña incorrecta",
            },
          });
          return;
        }

        const result = await response.json();

        // Handle successful login
        localStorage.setItem("jwtToken", result.token);
        if (result.user.role === "primaryOwner") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Error during login:", error);
      }
    };

    login();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <InputForm
          name="username"
          control={control}
          label="Nombre de usuario"
          type="text"
          error={errors.username}
        />
      </div>
      <div>
        <InputForm
          name="password"
          control={control}
          label="Contraseña"
          type="password"
          error={errors.password}
        />
      </div>
      <div className="flex items-center justify-end">
        <input
          id="show-password"
          type="checkbox"
          className="mr-2"
          onChange={(e) => {
            const passwordInput = document.getElementById(
              "password",
            ) as HTMLInputElement;
            if (passwordInput) {
              passwordInput.type = e.target.checked ? "text" : "password";
            }
          }}
        />
        <Label htmlFor="show-password" value="Show Password" />
      </div>
      <Button type="submit" className="w-full">
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
