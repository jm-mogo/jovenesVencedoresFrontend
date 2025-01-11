import { Table } from "flowbite-react/components/Table";
import { useParams } from "react-router-dom";
import useFetchTeen from "../../hooks/useFetchTeen";

export default function TeenDetailsTable() {
  const { id } = useParams<{ id: string }>();
  const { teen } = useFetchTeen(id);

  if (teen == undefined) {
    return <h2>Not found</h2>;
  }

  return (
    <div>
      <Table className="w-ful max-w-lg ">
        <Table.Head>
          <Table.HeadCell>Descripción</Table.HeadCell>
          <Table.HeadCell>Dato</Table.HeadCell>

          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              Nombre
            </Table.Cell>
            <Table.Cell className="font-medium text-gray-900">
              {teen.firstName}
            </Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              Apellido
            </Table.Cell>
            <Table.Cell className="font-medium text-gray-900">
              {teen.lastName}
            </Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              Género
            </Table.Cell>
            <Table.Cell className="font-medium text-gray-900">
              {teen.gender == "M" ? "Masculino" : "Fenemino"}
            </Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              Fecha de nacimiento
            </Table.Cell>
            <Table.Cell className="font-medium text-gray-900">
              {teen.dateOfBirth && new Date(teen.dateOfBirth).toDateString()}
            </Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              Número de teléfono
            </Table.Cell>
            <Table.Cell className="font-medium text-gray-900">
              {teen.phoneNumber ? teen.phoneNumber : "no registrado"}
            </Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              Dirección
            </Table.Cell>
            <Table.Cell className="font-medium text-gray-900">
              {teen.address ? teen.address : "no registrado"}
            </Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              Representante
            </Table.Cell>
            <Table.Cell className="font-medium text-gray-900">
              {teen.parentId == 1
                ? "no registrado"
                : teen.parent.firstName + " " + teen.parent.lastName}
            </Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              Teléfono de representante
            </Table.Cell>
            <Table.Cell className="font-medium text-gray-900">
              {teen.parentId == 1
                ? "no registrado"
                : teen.parent.phoneNumber
                  ? teen.parent.phoneNumber
                  : "no registrado"}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
}
