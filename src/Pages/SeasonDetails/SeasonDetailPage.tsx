import { Link, useParams } from "react-router-dom";
import { Meeting, Season } from "../../types";
import TeamsTable from "./Components/TeamsTable";
import LinkBack from "../../Components/LinkBack";
import NewModal from "../../Components/NewModal";
import NewTeamForm from "./Components/NewTeamForm";
import NewMeetingForm from "./Components/NewMeetingForm";
import { Timeline, Button } from "flowbite-react";
import { HiCalendar, HiArrowNarrowRight } from "react-icons/hi";
import dateParser from "../../utils/dateParser";
import { useFetch } from "../../hooks/useFetch";
import ErrorPage from "../../ErrorPage";
import { Loader } from "../../Components/Loader";

export default function SeasonDetailPage() {
  const { id } = useParams();
  const { data, loading, error, fetchData } = useFetch<Season>(
    "/seasons/" + id,
  );
  const season = data;

  if (loading) return <Loader fullPage={true} />;

  if (!season || error) {
    return <ErrorPage />;
  }

  return (
    <>
      <LinkBack to={"/seasons"}>
        <p>Regresar a temporadas</p>
      </LinkBack>

      <h2 className="text-2xl font-medium text-gray-900 dark:text-white">
        Temporada: {season.name}
      </h2>

      <div className="max-w-lg">
        <div className="mb-4 flex items-center justify-between">
          <h4 className="p-4 text-2xl font-medium text-gray-900 dark:text-white">
            Equipos
          </h4>
          <NewModal
            children={<NewTeamForm season={season} fetchData={fetchData} />}
            label={"Nuevo equipo"}
          />
        </div>
        <TeamsTable season={season} />
      </div>

      <div className="max-w-lg">
        <div className="mb-4 flex items-center justify-between">
          <h4 className="p-4 text-2xl font-medium text-gray-900 dark:text-white">
            Reuniones
          </h4>
          <NewModal
            children={<NewMeetingForm season={season} fetchData={fetchData} />}
            label={"Registrar reunión"}
          />
        </div>

        <MeatingTimeline meetings={season.meetings} />
      </div>
    </>
  );
}

function MeatingTimeline({ meetings }: { meetings: Meeting[] }) {
  return (
    <Timeline>
      {meetings.map((meeting) => (
        <Timeline.Item>
          <Timeline.Point icon={HiCalendar} />
          <Timeline.Content>
            <Timeline.Title>{dateParser(meeting.date)}</Timeline.Title>
            <Timeline.Body>
              Asistencia: {meeting.attendances ? meeting.attendances.length : 0}
            </Timeline.Body>
            <Link to={"/meetings/" + meeting.id}>
              <Button className="flex items-center" color="gray">
                Detalles
                <HiArrowNarrowRight className="ml-2 size-3" />
              </Button>
            </Link>
          </Timeline.Content>
        </Timeline.Item>
      ))}
    </Timeline>
  );
}
