import { Meeting } from "../../types";
import { useParams } from "react-router-dom";
import LinkBack from "../../Components/LinkBack";
import dateParser from "../../utils/dateParser";
import AttendanceTable from "./Components/AttendanceTable";
import AddAttendanceForm from "./Components/AddAttendanceForm";
import NewModal from "../../Components/NewModal";
import PointsTable from "./Components/PointsTable";
import { useFetch } from "../../hooks/useFetch";
import ErrorPage from "../../ErrorPage";
import { Loader } from "../../Components/Loader";

export default function MeetingManagementPage() {
  const { id } = useParams();

  const { data, loading, error, fetchData } = useFetch<Meeting>(
    `/meetings/${id}`,
  );
  const meeting = data;

  if (loading) return <Loader />;

  if (!meeting || error) return <ErrorPage />;

  return (
    <>
      <LinkBack to={"/seasons/" + meeting.seasonId}>
        <p>Regresar a temporada</p>
      </LinkBack>
      <h2 className="text-2xl font-medium text-gray-900 dark:text-white">
        Reunión: {dateParser(meeting.date)}
      </h2>
      <div className="max-w-lg">
        <div className="mb-4 flex items-center justify-between">
          <h4 className="p-4 text-2xl font-medium text-gray-900 dark:text-white">
            Puntos
          </h4>
        </div>
        <PointsTable meeting={meeting} />
      </div>

      <div className="max-w-lg">
        <div className="mb-4 flex items-center justify-between">
          <h4 className="p-4 text-2xl font-medium text-gray-900 dark:text-white">
            Lista de asistencia
          </h4>
          <NewModal
            children={
              <AddAttendanceForm meeting={meeting} fetchMeeting={fetchData} />
            }
            label={"Añadir asistencias"}
          />
        </div>
        <AttendanceTable />
      </div>
    </>
  );
}
