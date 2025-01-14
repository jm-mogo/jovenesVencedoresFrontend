import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Meeting, Season, Team } from "../types";
import { HiArrowLeft } from "react-icons/hi";
import { Card, Button } from "flowbite-react";
import { Timeline } from "flowbite-react";
import { HiArrowNarrowRight, HiCalendar } from "react-icons/hi";

export default function SeasonDetailPage() {
  const { id } = useParams();
  const [season, setSeason] = useState<Season>();

  async function featchSeason() {
    const response = await fetch(`127.0.0.1:8800/seasons/${id}`);
    const data: Season = await response.json();
    setSeason(data);
  }

  useEffect(() => {
    featchSeason();
  }, []);

  if (season == undefined) {
    return <h1>No se encontró</h1>;
  }

  return (
    <>
      <h2 className="text-2xl font-medium text-gray-900 dark:text-white">
        Temporada: {season.name}
      </h2>
      <Link to="/seasons">
        <Button className="mt-4">
          <HiArrowLeft className="mr-2 h-5 w-5" />
          Volver a temporadas
        </Button>
      </Link>

      <TeamsCard teams={season.teams} />

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

        <MeatingTimeline meetings={season.meetings} />
      </div>
      <pre className="mt-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
        <code>{JSON.stringify(season, null, 2)}</code>
      </pre>
    </>
  );
}

("use client");

function TeamsCard({ teams }: { teams: Team[] }) {
  return (
    <Card className="max-w-sm">
      <div className="mb-4 flex items-center justify-between">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
          Equipos
        </h5>
        <Link
          to={`/seasons/${teams[0].seasonId}/teams`}
          className="text-sm font-medium text-cyan-600 hover:underline dark:text-cyan-500"
        >
          administrar equipos
        </Link>
      </div>
      <div className="flow-root">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {teams.map((team) => (
            <li className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                <div className="min-w-0 flex-1">
                  <p className="text-md truncate font-medium text-gray-900 dark:text-white">
                    {team.name}
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  300 pts
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}

("use client");

function MeatingTimeline({ meetings }: { meetings: Meeting[] }) {
  return (
    <Timeline>
      {meetings.map((meeting) => (
        <Timeline.Item>
          <Timeline.Point icon={HiCalendar} />
          <Timeline.Content>
            <Timeline.Title>
              {new Date(meeting.date).toDateString()}
            </Timeline.Title>
            <Timeline.Body>
              Get access to over 20+ pages including a dashboard layout, charts,
              kanban board, calendar, and pre-order E-commerce & Marketing
              pages.
            </Timeline.Body>
            <Button color="gray">
              Learn More
              <HiArrowNarrowRight className="ml-2 h-3 w-3" />
            </Button>
          </Timeline.Content>
        </Timeline.Item>
      ))}
    </Timeline>
  );
}
