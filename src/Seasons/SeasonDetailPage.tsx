import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Season } from "../types";
import TeamsTable from "./Components/TeamsTable";
import LinkBack from "../Components/LinkBack";
import NewModal from "../Components/NewModal";
import NewTeamForm from "./Components/NewTeamForm";

export default function SeasonDetailPage() {
  const { id } = useParams();
  const [season, setSeason] = useState<Season>();

  async function featchSeason() {
    const response = await fetch(`http://127.0.0.1:8800/seasons/${id}`);
    const data: Season = await response.json();
    setSeason(data);
  }

  useEffect(() => {
    featchSeason();
  }, []);

  if (season === undefined) {
    return <h1>No se encontró</h1>;
  }

  console.log(season);

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
            children={<NewTeamForm season={season} setSeason={setSeason} />}
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
          <a
            href="#"
            className="text-sm font-medium text-cyan-600 hover:underline dark:text-cyan-500"
          >
            Registrar nueva reunion
          </a>
        </div>

        {/* <MeatingTimeline meetings={season.meetings} /> */}
      </div>
    </>
  );
}

// function MeatingTimeline({ meetings }: { meetings: Meeting[] }) {
//   return (
//     <Timeline>
//       {meetings.map((meeting) => (
//         <Timeline.Item>
//           <Timeline.Point icon={HiCalendar} />
//           <Timeline.Content>
//             <Timeline.Title>
//               {new Date(meeting.date).toDateString()}
//             </Timeline.Title>
//             <Timeline.Body>
//               Get access to over 20+ pages including a dashboard layout, charts,
//               kanban board, calendar, and pre-order E-commerce & Marketing
//               pages.
//             </Timeline.Body>
//             <Button color="gray">
//               Learn More
//               <HiArrowNarrowRight className="ml-2 h-3 w-3" />
//             </Button>
//           </Timeline.Content>
//         </Timeline.Item>
//       ))}
//     </Timeline>
//   );
// }
