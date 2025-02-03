import { useEffect, useState } from "react";
import { Meeting, Team } from "../types";
import { useParams } from "react-router-dom";
import LinkBack from "../Components/LinkBack";
import dateParser from "../dateParser";
import AttendanceTable from "./Components/AttendanceTable";
import AddAttendanceForm from "./Components/AddAttendanceForm";
import NewModal from "../Components/NewModal";

export default function MeetingManagementPage() {
  const { id } = useParams();
  const [meeting, setMeeting] = useState<Meeting>();

  async function fetchMeeting() {
    const response = await fetch(`http://127.0.0.1:8800/meetings/${id}`);
    const data: Meeting = await response.json();
    setMeeting(data);
  }

  useEffect(() => {
    fetchMeeting();
  }, []);

  if (meeting == undefined) {
    return "no meeting";
  }

  return (
    <>
      <LinkBack to={"/seasons/" + meeting?.seasonId}>
        <p>Regresar a temporada</p>
      </LinkBack>
      <h2 className="text-2xl font-medium text-gray-900 dark:text-white">
        Reunión: {dateParser(meeting.date)}
      </h2>
      <div className="max-w-lg">
        <div className="mb-4 flex items-center justify-between">
          <h4 className="p-4 text-2xl font-medium text-gray-900 dark:text-white">
            Lista de asistencia
          </h4>
          <NewModal
            children={<AddAttendanceForm meeting={meeting} />}
            label={"Añadir asistencias"}
          />
        </div>
        <AttendanceTable />
      </div>
    </>
  );
}
