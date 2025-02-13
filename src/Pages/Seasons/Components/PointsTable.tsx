import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Table } from "flowbite-react";
import { PointRecord, Meeting, Season, Team } from "../../../types";
import EditModal from "../../../Components/EditModal";
import UpdatePointsForm from "./UpdatePointsForm";

export default function PointsTable({ meeting }: { meeting: Meeting }) {
  //   const Navigate = useNavigate();
  const id = meeting.id;

  const [pointRecords, setPointRecords] = useState<[]>([]);

  const fetchPointRecords = async () => {
    const response = await fetch(`http://127.0.0.1:8800/meetings/${id}/points`);
    const data = await response.json();

    setPointRecords(data);
  };

  useEffect(() => {
    fetchPointRecords();
  }, []);

  return (
    <div className="">
      <Table hoverable className="w-full max-w-lg">
        <Table.Head>
          <Table.HeadCell>Equipo</Table.HeadCell>

          <Table.HeadCell className="text-right">puntos</Table.HeadCell>
          <Table.HeadCell className="text-right">constrols</Table.HeadCell>
        </Table.Head>

        <Table.Body className="divide-y">
          {pointRecords.map((pointRecord: PointRecord) => (
            <>
              <Table.Row className=" bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {pointRecord.team.name}
                </Table.Cell>

                <Table.Cell className="whitespace-nowrap text-right font-medium text-gray-900 dark:text-white">
                  {pointRecord.points}
                </Table.Cell>

                <Table.Cell className="whitespace-nowrap text-right font-semibold  text-blue-600 dark:text-white">
                  <EditModal label="edit">
                    <UpdatePointsForm
                      pointRecords={pointRecords}
                      teamId={pointRecord.teamId}
                      fetchPointRecords={fetchPointRecords}
                    />
                  </EditModal>
                </Table.Cell>
              </Table.Row>
            </>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
