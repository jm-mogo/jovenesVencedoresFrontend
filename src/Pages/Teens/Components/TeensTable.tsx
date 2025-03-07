import { Teen } from "../../../types";
import { useNavigate } from "react-router-dom";
import { Table } from "flowbite-react";

export default function TeensTable({ teens }: { teens: Teen[] }) {
  const Navigate = useNavigate();

  return (
    <div className="">
      <Table hoverable className="w-full max-w-lg">
        <Table.Head>
          <Table.HeadCell>Nombre</Table.HeadCell>
          <Table.HeadCell>Edad</Table.HeadCell>
          <Table.HeadCell>Teléfono</Table.HeadCell>
        </Table.Head>

        <Table.Body className="divide-y">
          {teens.map((teen: Teen) => (
            <Table.Row
              className="cursor-pointer bg-white dark:border-gray-700 dark:bg-gray-800"
              onClick={() => {
                Navigate(`/teens/${teen.id}`);
              }}
              key={teen.id}
            >
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {teen.firstName} {teen.lastName}
              </Table.Cell>
              <Table.Cell>{calculateAge(teen.dateOfBirth)}</Table.Cell>
              <Table.Cell>{teen.phoneNumber || "no registrado"}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

function calculateAge(dateOfBirth: string): number {
  const dob = new Date(dateOfBirth);
  const today = new Date();

  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  const dayDiff = today.getDate() - dob.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }
  return age;
}
