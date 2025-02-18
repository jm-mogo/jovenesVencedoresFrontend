import { Meeting, Membership } from "../../../types";
import { Button } from "flowbite-react";
import { useFetch } from "../../../hooks/useFetch";
import { Loader } from "../../../Components/Loader";
import { fetchPost } from "../../../hooks/fetchPost";

export default function AddAttendanceForm({
  meeting,
  fetchMeeting,
}: {
  meeting: Meeting;
  fetchMeeting: () => void;
}) {
  const { data, loading, error, fetchData } = useFetch<Membership[]>(
    `/meetings/${meeting.id}/teens`,
  );

  const teamMemberships = data ? data : [];

  if (loading) return <Loader />;
  if (error) return "ERROR";

  const addAttendance = async (teamMembershipId: number) => {
    const data = {
      meetingId: meeting.id,
      teamMembershipId: teamMembershipId,
    };
    const response = await fetchPost("/attendances", data);
    if (response.ok) {
      fetchData();
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
