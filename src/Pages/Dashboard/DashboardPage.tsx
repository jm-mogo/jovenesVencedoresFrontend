import { Alert } from "flowbite-react";
import React from "react";
import { Teen } from "../../types";
import { useFetch } from "../../hooks/useFetch";

import dateParser from "../../utils/dateParser";

const DashboardPage: React.FC = () => {
  const { data } = useFetch<Teen[]>("/teens/birthdaysThisMonth");
  const teens = data ? data : [];

  console.log("Teens with birthdays this month:", teens);
  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Dashboard</h1>
      <p className="mb-4">
        Este es tu tablero donde puedes ver datos relevantes.
      </p>

      <Alert className="max-w-md" color="warning">
        <span className="font-medium">Este página está en construcción!</span>
      </Alert>

      {teens.length > 0 && (
        <div className="mt-6">
          <h2 className="mb-2 text-lg font-semibold">Cumpleaños este mes</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 rounded bg-white shadow">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">
                    Nombre
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-500">
                    Fecha de Nacimiento
                  </th>
                </tr>
              </thead>
              <tbody>
                {teens.map((teen) => (
                  <tr key={teen.id} className="border-t">
                    <td className="px-4 py-2">
                      {teen.firstName + " " + teen.lastName}
                    </td>
                    <td className="px-4 py-2">
                      {dateParser(teen.dateOfBirth)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

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
