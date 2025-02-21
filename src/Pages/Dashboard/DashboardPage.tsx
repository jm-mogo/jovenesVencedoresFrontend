import { Alert } from "flowbite-react";
import React from "react";

const DashboardPage: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Dashboard</h1>
      <p className="mb-4">
        Este es tu tablero donde puedes ver datos relevantes.
      </p>

      <Alert className="max-w-md" color="warning">
        <span className="font-medium">Este página está en construcción!</span>
      </Alert>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded bg-white p-4 shadow">
          <h2 className="text-xl font-semibold">Tasa de Asistencia</h2>
          <p className="text-gray-600">
            Aqui se mostrará el tasa de asistencia
          </p>
        </div>
        <div className="rounded bg-white p-4 shadow">
          <h2 className="text-xl font-semibold">Miembros</h2>
          <p className="text-gray-600">00000</p>
        </div>
        <div className="rounded bg-white p-4 shadow">
          <h2 className="text-xl font-semibold">Actividades Recientes</h2>
          <p className="text-gray-600">No hay actividades recientes</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
