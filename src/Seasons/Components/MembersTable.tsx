import { Table } from "flowbite-react/components/Table";
import { useEffect, useState } from "react";
import { Team } from "../../types";

type Membership = {
  id: number;
  teamId: number;
  teenId: number;
  teen: {
    firstName: string;
    lastName: string;
  };
};

export default function MembersTable({
  team,
  fetchTeam,
}: {
  team: Team;
  fetchTeam: any;
}) {
  const teamId = team.id;
  const [memberships, setMemberships] = useState<Membership[]>([]);

  async function fetchTeen() {
    const response = await fetch(
      `http://127.0.0.1:8800/teams/${teamId}/members`,
    );
    const data = await response.json();
    setMemberships(data);
  }

  useEffect(() => {
    fetchTeen();
  }, [team]);

  if (memberships == undefined) {
    return "no hay datos";
  }

  const removeMember = async (memberId: number) => {
    const response = await fetch(
      "http://127.0.0.1:8800/teamMemberships/" + memberId,
      {
        method: "DELETE",
      },
    );
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
                  <button onClick={() => removeMember(membership.id)}>
                    Remove
                  </button>
                </Table.Cell>
              </Table.Row>
            </>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
