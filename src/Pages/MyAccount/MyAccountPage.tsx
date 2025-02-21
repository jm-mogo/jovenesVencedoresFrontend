import { Table } from "flowbite-react/components/Table";
import { useUser } from "../../hooks/useUser";
import { User } from "../../types";
import EditModal from "../../Components/EditModal";
import ChangePasswordForm from "./ChangePasswordForm";
import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";

export default function MyAccountPage() {
  const user = useUser();
  return (
    <>
      <div className="w-full space-y-4 p-4">
        <h2 className="text-2xl font-medium text-gray-900 dark:text-white">
          Información de tu cuenta
        </h2>
        <UserTable user={user} />
        <h4 className="text-2xl font-medium text-gray-900 dark:text-white">
          Acciones
        </h4>
        {user?.groupName !== "demo" ? (
          <EditModal label="Cambiar contraseña">
            {" "}
            <ChangePasswordForm />
          </EditModal>
        ) : (
          <Alert
            className="max-w-md"
            color="failure"
            icon={HiInformationCircle}
          >
            <span className=" font-medium">Advertencia!</span> No puedes cambiar
            clave de cuenta demo
          </Alert>
        )}
      </div>
    </>
  );
}

const UserTable = ({ user }: { user: Partial<User> | undefined }) => {
  return (
    <Table hoverable className="w-full max-w-lg">
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
            Nombre de usuario
          </Table.Cell>
          <Table.Cell className="font-medium text-gray-900">
            {user?.username}
          </Table.Cell>
        </Table.Row>
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            Grupo
          </Table.Cell>
          <Table.Cell className="font-medium text-gray-900">
            {user?.groupName}
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};
