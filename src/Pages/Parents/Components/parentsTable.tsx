import { Parent } from "../../../types";
import { Table } from "flowbite-react";

export default function ParentsTable({ parents }: { parents: Parent[] }) {
  return (
    <div className="">
      <Table hoverable className="w-full max-w-lg">
        <Table.Head>
          <Table.HeadCell>Nombre</Table.HeadCell>

          <Table.HeadCell>Teléfono</Table.HeadCell>
        </Table.Head>

        <Table.Body className="divide-y">
          {parents.map((parent: Parent) => (
            <>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {parent.firstName} {parent.lastName}
                </Table.Cell>

                <Table.Cell>{parent.phoneNumber || "no registrado"}</Table.Cell>
              </Table.Row>
            </>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
