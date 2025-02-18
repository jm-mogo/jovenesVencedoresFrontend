import { Team, Teen } from "../../../types";
import { Button } from "flowbite-react";
import { useFetch } from "../../../hooks/useFetch";
import { Loader } from "../../../Components/Loader";
import { fetchPost } from "../../../hooks/fetchPost";

export default function AddMemberForm({
  team,
  fetchTeam,
}: {
  team: Team;
  fetchTeam: () => void;
}) {
  const seasonId = team.seasonId;
  const teamId = team.id;

  const { data, loading, fetchData } = useFetch<Teen[]>(
    `/seasons/${seasonId}/teens`,
  );

  const teens = data ? data : [];

  if (loading) return <Loader />;

  const addMember = async (teenId: number) => {
    const data = {
      seasonId: seasonId,
      teamId: teamId,
      teenId: teenId,
    };
    const response = await fetchPost("/teamMemberships", data);
    if (response.ok) {
      fetchData();
      fetchTeam();
    }
  };

  if (teens.length == 0) {
    return (
      <div className="p-4">
        <h3 className="text-2xl font-medium text-gray-900 dark:text-white">
          No hay jóvenes sin equipo en esta temporada.
        </h3>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-medium text-gray-900 dark:text-white">
        Jóvenes sin equipo
      </h3>

      <ul>
        {teens.map((teen) => (
          <div>
            <li className="flex items-center justify-between py-4">
              {teen.firstName} {teen.lastName}
              <Button size={"sm"} onClick={() => addMember(teen.id)}>
                añadir
              </Button>
            </li>
            <hr />
          </div>
        ))}
      </ul>
    </div>
  );
}
