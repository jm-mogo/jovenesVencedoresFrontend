import { Table } from "flowbite-react/components/Table";

import { Group, User } from "../../../types";
import { Loader } from "../../../Components/Loader";
import { AlertModal } from "../../../Components/AlertModal";
import { fetchDelete } from "../../../hooks/fetchDelete";

export default function UsersTable({
  group,
  loading,
  fetchData,
}: {
  group: Group;
  loading: boolean;
  fetchData: () => void;
}) {
  if (loading) {
    <Loader />;
  }

  const removeUser = async (userId: number) => {
    try {
      const response = await fetchDelete("/users/" + userId);

      if (response.ok) {
        fetchData();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="">
      <Table hoverable className="w-full max-w-lg">
        <Table.Head>
          <Table.HeadCell>username</Table.HeadCell>
          <Table.HeadCell>role</Table.HeadCell>
        </Table.Head>

        <Table.Body className="divide-y">
          {group.users.map((user: User) => (
            <>
              <Table.Row className=" bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {user.username}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {user.role}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-red-500">
                  <AlertModal
                    label={"Eliminar"}
                    handleYes={() => {
                      removeUser(user.id);
                    }}
                  >
                    Seguro que quiere remover a <strong>{user.username}</strong>{" "}
                    del grupo <strong>{group.name} </strong>
                  </AlertModal>
                </Table.Cell>
              </Table.Row>
            </>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
