import { Card } from "flowbite-react";
import LoginForm from "./LoginForm";

const LoginPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md p-6 ">
        <h2 className="text-center text-2xl font-bold">Iniciar sesión</h2>
        <LoginForm />
      </Card>
    </div>
  );
};

export default LoginPage;
