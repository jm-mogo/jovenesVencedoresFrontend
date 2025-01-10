import useTeens from "./hooks/useTeens";
import { Table } from "flowbite-react";
import NewModal from "./NewModal";
import { Link, useNavigate } from "react-router-dom";
import NewTeemForm from "./NewTeemForm";

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
  const Navigate = useNavigate();
  const { teens } = useTeens();
  return (
    <>
      <h2 className="text-2xl font-medium text-gray-900 dark:text-white">
        Jóvenes
      </h2>
      <NewModal children={<NewTeemForm />} label={"Nuevo joven"} />

      <div className="overflow-x-auto">
        <Table hoverable className="w-full max-w-lg">
          <Table.Head>
            <Table.HeadCell>Nombre</Table.HeadCell>
            <Table.HeadCell>Edad</Table.HeadCell>
            <Table.HeadCell>Teléfono</Table.HeadCell>
            <Table.HeadCell>Dirección</Table.HeadCell>
          </Table.Head>

          <Table.Body className="divide-y">
            {teens.map((teen: any) => (
              <>
                <Link
                  to={`/teens/${teen.id}`}
                  className="text-blue-500 hover:text-blue-700"
                ></Link>
                <Table.Row
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  onClick={() => {
                    Navigate(`/teens/${teen.id}`);
                  }}
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {teen.firstName} {teen.lastName}
                  </Table.Cell>
                  <Table.Cell>{calculateAge(teen.dateOfBirth)}</Table.Cell>
                  <Table.Cell>{teen.phoneNumber || "no registrado"}</Table.Cell>
                  <Table.Cell>{teen.address || "no registrado"}</Table.Cell>
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
