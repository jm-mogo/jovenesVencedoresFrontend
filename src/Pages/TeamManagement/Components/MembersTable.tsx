import { Table } from "flowbite-react/components/Table";
import { Membership, Team } from "../../../types";
import { AlertModal } from "../../../Components/AlertModal";
import { useFetch } from "../../../hooks/useFetch";
import { fetchDelete } from "../../../hooks/fetchDelete";

export default function MembersTable({
  team,
  fetchTeam,
}: {
  team: Team;
  fetchTeam: () => void;
}) {
  const teamId = team.id;

  const { data } = useFetch<Membership[]>(`/teams/${teamId}/members`);
  const memberships = data ? data : [];

  if (memberships == undefined) {
    return "no hay datos";
  }

  const removeMember = async (memberId: number) => {
    const response = await fetchDelete("/teamMemberships/" + memberId);
    if (response.ok) {
      fetchTeam();
    }
  };

  return (
    <div className="">
      <Table hoverable className="w-full max-w-lg">
        <Table.Head>
          <Table.HeadCell>Nombre</Table.HeadCell>
          <Table.HeadCell>Controls</Table.HeadCell>
        </Table.Head>

        <Table.Body className="divide-y">
          {memberships.map((membership) => (
            <>
              <Table.Row className=" bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {membership.teen.firstName} {membership.teen.lastName}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-red-500">
                  <AlertModal
                    label={"Eliminar"}
                    handleYes={() => {
                      removeMember(membership.id);
                    }}
                  >
                    Seguro que quiere remover a{" "}
                    <strong>
                      {membership.teen.firstName} {membership.teen.lastName}
                    </strong>{" "}
                    del equipo <strong>{team.name} </strong>
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
