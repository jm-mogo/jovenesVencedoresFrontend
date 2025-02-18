import { useNavigate } from "react-router-dom";
import { Table } from "flowbite-react";
import { Season, Team } from "../../../types";
import { useFetch } from "../../../hooks/useFetch";
import { Loader } from "../../../Components/Loader";

export default function TeamsTable({ season }: { season: Season }) {
  const Navigate = useNavigate();
  const id = season.id;

  const { data, loading } = useFetch<Team[]>(`/seasons/${id}/teams`);
  const teams = data ? data : [];

  if (loading) return <Loader />;

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
              <Table.Row
                className="cursor-pointer bg-white dark:border-gray-700 dark:bg-gray-800"
                onClick={() => {
                  Navigate(`/teams/${team.id}`);
                }}
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {team.name}
                </Table.Cell>

                <Table.Cell className="whitespace-nowrap text-right font-medium text-gray-900 dark:text-white">
                  {team.teamMemberships.length}
                </Table.Cell>

                <Table.Cell className="whitespace-nowrap text-right font-medium text-gray-900 dark:text-white">
                  {team.points.reduce(
                    (accumulator, currentPoints: { points: number }) =>
                      accumulator + currentPoints.points,
                    0,
                  )}
                </Table.Cell>
              </Table.Row>
            </>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
