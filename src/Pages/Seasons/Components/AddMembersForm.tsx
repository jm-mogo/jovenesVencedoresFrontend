import { useEffect, useState } from "react";
import { Team, Teen } from "../../../types";
import { Button } from "flowbite-react";

export default function AddMemberForm({
  team,
  fetchTeam,
}: {
  team: Team;
  fetchTeam: any;
}) {
  const [teens, setTeens] = useState<Teen[]>([]);

  const seasonId = team.seasonId;
  const teamId = team.id;

  async function fetchTeens() {
    const response = await fetch(
      `http://127.0.0.1:8800/seasons/${seasonId}/teens`,
    );
    const data = await response.json();

    setTeens(data);
  }

  useEffect(() => {
    fetchTeens();
  }, []);

  const addMember = async (teenId: number) => {
    const response = await fetch("http://127.0.0.1:8800/teamMemberships", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        seasonId: seasonId,
        teamId: teamId,
        teenId: teenId,
      }),
    });
    if (response.ok) {
      fetchTeens();
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
