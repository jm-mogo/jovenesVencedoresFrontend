import React, { useState } from "react";
import { Button, TextInput, Label, Card } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  console.log(localStorage.getItem("jwtToken"));
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    fetch("http://127.0.0.1:8800/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          // Handle successful login

          const { token } = data;
          localStorage.setItem("jwtToken", token);
          if (data.user.role === "primaryOwner") {
            navigate("/admin");
          } else {
            navigate("/");
          }
        } else {
          console.error("Login failed:", data);
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
      });
    console.log("Email:", username);
    console.log("Password:", password);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md p-6">
        <h2 className="text-center text-2xl font-bold">Iniciar sesión</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <Label htmlFor="username" value="Nombre de usuario" />
            <TextInput
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="password" value="Contraseña" />
            <TextInput
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center">
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
      </Card>
    </div>
  );
};

export default LoginPage;
