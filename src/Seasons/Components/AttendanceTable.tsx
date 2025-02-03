import { Table } from "flowbite-react/components/Table";
import { useEffect, useState } from "react";
import { AlertModal } from "../../Components/AlertModal";
import { useParams } from "react-router-dom";
import { Meeting, Membership } from "../../types";

type AttandanceMeeting = {
  id: number;
  teamId: number;
  teenId: number;
  teamMembership: Membership;
};

export default function AttendanceTable({
  meeting,
  fetchMeeting,
}: {
  meeting: Meeting;
  fetchMeeting: any;
}) {
  const { id } = useParams();
  console.log(id);
  const [attendancesMeeting, setAttendancesMeeting] = useState<
    AttandanceMeeting[]
  >([]);

  async function fetchTeen() {
    const response = await fetch(
      `http://127.0.0.1:8800/meetings/${id}/attendances`,
    );
    const data = await response.json();
    setAttendancesMeeting(data);
  }

  useEffect(() => {
    fetchTeen();
  }, [meeting]);

  if (attendancesMeeting == undefined) {
    return "no hay datos";
  }

  console.log(attendancesMeeting);

  const removeAttendance = async (attendanceId: number) => {
    const response = await fetch(
      "http://127.0.0.1:8800/attendances/" + attendanceId,
      {
        method: "DELETE",
      },
    );
    if (response.ok) {
      fetchMeeting();
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
          {attendancesMeeting.map((attendance) => (
            <>
              <Table.Row className=" bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {attendance.teamMembership.teen.firstName}{" "}
                  {attendance.teamMembership.teen.lastName}{" "}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-red-500">
                  <AlertModal
                    label={"Eliminar"}
                    handleYes={() => {
                      removeAttendance(attendance.id);
                    }}
                  >
                    Seguro que quiere remover a{" "}
                    <strong>
                      {attendance.teamMembership.teen.firstName}{" "}
                      {attendance.teamMembership.teen.lastName}
                    </strong>{" "}
                    de la asistencia
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
