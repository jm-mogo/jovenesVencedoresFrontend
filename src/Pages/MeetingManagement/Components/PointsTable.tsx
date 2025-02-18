import { Table } from "flowbite-react";
import { PointRecord, Meeting } from "../../../types";
import EditModal from "../../../Components/EditModal";
import UpdatePointsForm from "./UpdatePointsForm";
import { useFetch } from "../../../hooks/useFetch";
import { Loader } from "../../../Components/Loader";
import ErrorPage from "../../../ErrorPage";

export default function PointsTable({ meeting }: { meeting: Meeting }) {
  const id = meeting.id;

  const { data, loading, error, fetchData } = useFetch<PointRecord[]>(
    `/meetings/${id}/points`,
  );

  if (loading) return <Loader />;

  if (error) return <ErrorPage />;

  const pointRecords = data ? data : [];

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
                      fetchPointRecords={fetchData}
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
