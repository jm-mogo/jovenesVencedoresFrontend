import { useState, useEffect } from "react";
import { Table } from "flowbite-react";
import NewTeenModal from "./newTeenModal";

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

function TeensTable() {
  const [teens, setTeens] = useState<[]>([]);

  async function fetchTeens() {
    const response = await fetch("http://localhost:8800/teens");
    const data = await response.json();

    setTeens(data);
  }

  useEffect(() => {
    fetchTeens();
  }, []);

  return (
    <>
      <NewTeenModal teens={teens} setTeens={setTeens} />

      <div className="overflow-x-auto">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Nombre</Table.HeadCell>
            <Table.HeadCell>Edad</Table.HeadCell>
            <Table.HeadCell>Teléfono</Table.HeadCell>
            <Table.HeadCell>Dirección</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>

          <Table.Body className="divide-y">
            {teens.map((teen: any) => (
              <>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {teen.firstName} {teen.lastName}
                  </Table.Cell>
                  <Table.Cell>{calculateAge(teen.dateOfBirth)}</Table.Cell>
                  <Table.Cell>{teen.phoneNumber || "no registrado"}</Table.Cell>
                  <Table.Cell>{teen.address || "no registrado"}</Table.Cell>
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
export default TeensTable;
