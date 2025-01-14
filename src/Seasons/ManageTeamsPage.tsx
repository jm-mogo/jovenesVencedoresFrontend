import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Team } from "../types";
import { Button, Table } from "flowbite-react";
import { HiArrowLeft } from "react-icons/hi";

export default function ManageTeamsPage() {
  const { id } = useParams();

  const [teams, setTeams] = useState<Team[]>([]);

  console.log(id);

  const fetchTeamsBySeason = async () => {
    const response = await fetch(
      `http://127.0.0.1:8800/seasons/${id}/teams`,
    );
    const data = await response.json();

    setTeams(data);
  };

  useEffect(() => {
    fetchTeamsBySeason();
  }, []);

  console.log(teams);

  return (
    <>
      <h2 className="text-2xl font-medium text-gray-900 dark:text-white">
        Administrar equipos de la temporada {id}
      </h2>
      <Link to={"/seasons/" + id}>
        <Button className="mt-4">
          <HiArrowLeft className="mr-2 h-5 w-5" />
          Volver a temporada
        </Button>
      </Link>
      <TeamsTable teams={teams} />
      <code>{JSON.stringify(teams, null, 2)}</code>
    </>
  );
}

function TeamsTable({ teams }: { teams: Team[] }) {
  return (
    <div className="overflow-x-auto">
      <Table hoverable className="w-full max-w-lg">
        <Table.Head>
          <Table.HeadCell>Nombre</Table.HeadCell>

          <Table.HeadCell>Miembros</Table.HeadCell>

          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>

        <Table.Body className="divide-y">
          {teams.map((team: Team) => (
            <>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {team.name}
                </Table.Cell>

                <Table.Cell> {team.teamMemberships.length}</Table.Cell>

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
  );
}
