import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "flowbite-react";
import { HiArrowLeft } from "react-icons/hi";
import { Table } from "flowbite-react";

const TeenDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [teen, setTeen] = useState<any>({});

  async function fetchTeen() {
    const response = await fetch(`http://192.168.0.10:8800/teens/${id}`);
    const data = await response.json();

    setTeen(data);
  }

  useEffect(() => {
    fetchTeen();
  }, []);

  return (
    <>
      <h2 className="text-2xl font-medium text-gray-900 dark:text-white">
        Detalles de Joven
      </h2>
      <Link to="/teens">
        <Button className="mt-4">
          <HiArrowLeft className="mr-2 h-5 w-5" />
          Volver a jóvenes
        </Button>
      </Link>

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
                  : teen.parent?.firstName + " " + teen.parent?.lastName}
              </Table.Cell>
            </Table.Row>
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                Teléfono de representante
              </Table.Cell>
              <Table.Cell className="font-medium text-gray-900">
                {teen.parentId == 1
                  ? "no registrado"
                  : teen.parent?.phoneNumber
                    ? teen.parent.phoneNumber
                    : "no registrado"}
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    </>
  );
};

export default TeenDetails;
