import { Table } from "flowbite-react";

import NewModal from "./Components/NewModal";
import NewParentForm from "./Components/NewParentForm";
import { useFetchParents } from "./hooks/useFetchParents";

function ParentsTable() {
  const { parents, setParents } = useFetchParents();

  return (
    <>
      <h2 className="text-2xl font-medium text-gray-900 dark:text-white">
        Representantes
      </h2>
      <NewModal
        children={<NewParentForm parents={parents} setParents={setParents} />}
        label={"Nuevo representante"}
      />
      <div className="overflow-x-auto">
        <Table hoverable className="w-full max-w-lg">
          <Table.Head>
            <Table.HeadCell>Nombre</Table.HeadCell>

            <Table.HeadCell>Teléfono</Table.HeadCell>

            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>

          <Table.Body className="divide-y">
            {parents.map((teen: any) => (
              <>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {teen.firstName} {teen.lastName}
                  </Table.Cell>

                  <Table.Cell>{teen.phoneNumber || "no registrado"}</Table.Cell>

                  <Table.Cell>
                    <a
                      href="#"
                      className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                    >
                      Edit
                    </a>
                  </Table.Cell>
                </Table.Row>
              </>
            ))}
          </Table.Body>
        </Table>
      </div>
    </>
  );
}
export default ParentsTable;
