import { useEffect, useState } from "react";
import { Teen } from "../../types";
import { Button } from "flowbite-react";

export default function AddMemberForm({
  seasonId,
  teamId,
}: {
  seasonId: number;
  teamId: number;
}) {
  const [teens, setTeens] = useState<Teen[]>([]);

  async function fetchTeens() {
    console.log(seasonId);
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
    }
  };

  return (
    <>
      <h2>Jóvenes sin equipo</h2>
      <ul>
        {teens.map((teen) => (
          <div>
            <li className="flex items-center justify-between">
              {teen.firstName} {teen.lastName}
              <Button onClick={() => addMember(teen.id)}>añadir</Button>
            </li>
            <hr />
          </div>
        ))}
      </ul>
    </>
  );
}
