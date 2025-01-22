import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Table } from "flowbite-react";
import { Team } from "../../types";

export default function TeamsTable() {
  const { id } = useParams();

  const [teams, setTeams] = useState<Team[]>([]);

  const fetchTeamsBySeason = async () => {
    const response = await fetch(`http://127.0.0.1:8800/seasons/${id}/teams`);
    const data = await response.json();

    setTeams(data);
  };

  useEffect(() => {
    fetchTeamsBySeason();
  }, []);

  return (
    <div className="">
      <Table hoverable className="w-full max-w-lg">
        <Table.Head>
          <Table.HeadCell>Nombre</Table.HeadCell>

          <Table.HeadCell className="text-right">Miembros</Table.HeadCell>
          <Table.HeadCell className="text-right">Puntos</Table.HeadCell>
        </Table.Head>

        <Table.Body className="divide-y">
          {teams.map((team: Team) => (
            <>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {team.name}
                </Table.Cell>

                <Table.Cell className="whitespace-nowrap text-right font-medium text-gray-900 dark:text-white">
                  {team.teamMemberships.length}
                </Table.Cell>

                <Table.Cell className="whitespace-nowrap text-right font-medium text-gray-900 dark:text-white">
                  {team.points.length}
                </Table.Cell>
              </Table.Row>
            </>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
