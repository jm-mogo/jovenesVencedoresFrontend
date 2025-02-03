import { Table } from "flowbite-react/components/Table";
import { useEffect, useState } from "react";
import { AlertModal } from "../../Components/AlertModal";
import { useParams } from "react-router-dom";
import { Membership } from "../../types";

type AttandanceMeeting = {
  id: number;
  teamId: number;
  teenId: number;
  teamMembership: Membership;
};

export default function AttendanceTable() {
  const { id } = useParams();
  console.log(id);
  const [attandancesMeeting, setAttandancesMeeting] = useState<
    AttandanceMeeting[]
  >([]);

  async function fetchTeen() {
    const response = await fetch(
      `http://127.0.0.1:8800/meetings/${id}/attendances`,
    );
    const data = await response.json();
    setAttandancesMeeting(data);
  }

  useEffect(() => {
    fetchTeen();
  }, []);

  if (attandancesMeeting == undefined) {
    return "no hay datos";
  }

  console.log(attandancesMeeting);

  // const removeMember = async (memberId: number) => {
  //   const response = await fetch(
  //     "http://127.0.0.1:8800/teamMemberships/" + memberId,
  //     {
  //       method: "DELETE",
  //     },
  //   );
  //   if (response.ok) {
  //     fetchTeam();
  //   }
  // };

  return (
    <div className="">
      <Table hoverable className="w-full max-w-lg">
        <Table.Head>
          <Table.HeadCell>Nombre</Table.HeadCell>
          <Table.HeadCell>Controls</Table.HeadCell>
        </Table.Head>

        <Table.Body className="divide-y">
          {attandancesMeeting.map((Attendance) => (
            <>
              <Table.Row className=" bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {Attendance.teamMembership.teen.firstName}{" "}
                  {Attendance.teamMembership.teen.lastName}{" "}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-red-500">
                  <AlertModal
                    label={"Eliminar"}
                    handleYes={() => {
                      // removeMember(membership.id);
                    }}
                  >
                    Seguro que quiere remover a{" "}
                    <strong>
                      {/* {membership.teen.firstName} {membership.teen.lastName} */}
                    </strong>{" "}
                    {/* del equipo <strong>{team.name} </strong> */}
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
