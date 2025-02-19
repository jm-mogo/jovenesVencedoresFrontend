import { Table } from "flowbite-react/components/Table";
import { AlertModal } from "../../../Components/AlertModal";
import { useParams } from "react-router-dom";
import { Membership } from "../../../types";
import { useFetch } from "../../../hooks/useFetch";
import ErrorPage from "../../../ErrorPage";
import { Loader } from "../../../Components/Loader";
import { fetchDelete } from "../../../hooks/fetchDelete";

type AttandanceMeeting = {
  id: number;
  teamId: number;
  teenId: number;
  teamMembership: Membership;
};

export default function AttendanceTable() {
  const { id } = useParams();

  const { data, loading, error, fetchData } = useFetch<AttandanceMeeting[]>(
    `/meetings/${id}/attendances`,
  );
  const attendancesMeeting = data ? data : [];

  if (loading) return <Loader />;

  if (error) return <ErrorPage />;

  const removeAttendance = async (attendanceId: number) => {
    const response = await fetchDelete("/attendances/" + attendanceId);
    if (response.ok) {
      fetchData();
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
