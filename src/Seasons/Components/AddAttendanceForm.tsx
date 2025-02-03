import { useEffect, useState } from "react";
import { Meeting, Membership, Team, Teen } from "../../types";
import { Button } from "flowbite-react";

export default function AddAttendanceForm({
  meeting,
  fetchMeeting,
}: {
  meeting: Meeting;
  fetchMeeting: any;
}) {
  const [teamMemberships, setTeamMemberships] = useState<Membership[]>([]);

  const meetingId = meeting.id;
  console.log(meetingId);

  async function fetchTeens() {
    const response = await fetch(
      `http://127.0.0.1:8800/meetings/${meetingId}/teens`,
    );
    const data = await response.json();

    setTeamMemberships(data);
  }

  useEffect(() => {
    fetchTeens();
  }, []);

  const addAttendance = async (teamMembershipId: number) => {
    const response = await fetch("http://127.0.0.1:8800/attendances", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        meetingId: meetingId,
        teamMembershipId: teamMembershipId,
      }),
    });
    if (response.ok) {
      fetchTeens();
      fetchMeeting();
    }
  };

  if (teamMemberships.length == 0) {
    return (
      <div className="p-4">
        <h3 className="text-2xl font-medium text-gray-900 dark:text-white">
          No hay jóvenes sin asistencia en esta reunión.
        </h3>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-medium text-gray-900 dark:text-white">
        Jóvenes sin asistencia
      </h3>

      <ul>
        {teamMemberships.map((teamMembership) => (
          <div>
            <li className="flex items-center justify-between py-4">
              {teamMembership.teen.firstName} {teamMembership.teen.lastName}
              <Button
                size={"sm"}
                onClick={() => addAttendance(teamMembership.id)}
              >
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
