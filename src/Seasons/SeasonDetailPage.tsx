import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Season, Team } from "../types";
import { HiArrowLeft } from "react-icons/hi";
import { Card, Button } from "flowbite-react";
import { Timeline } from "flowbite-react";
import { HiArrowNarrowRight, HiCalendar } from "react-icons/hi";

export default function SeasonDetailPage() {
  const { id } = useParams();
  const [season, setSeason] = useState<Season>();

  async function featchSeason() {
    const response = await fetch(`http://192.168.0.10:8800/seasons/${id}`);
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
        <h2 className="p-4 text-2xl font-medium text-gray-900 dark:text-white">
          Reuniones
        </h2>
        <MeatingTimeline />
      </div>
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
        <a
          href="#"
          className="text-sm font-medium text-cyan-600 hover:underline dark:text-cyan-500"
        >
          crear equipo
        </a>
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

function MeatingTimeline() {
  return (
    <Timeline>
      <Timeline.Item>
        <Timeline.Point icon={HiCalendar} />
        <Timeline.Content>
          <Timeline.Time>Application UI code in Tailwind CSS</Timeline.Time>
          <Timeline.Title>20 de Nov 2022</Timeline.Title>
          <Timeline.Body>
            Get access to over 20+ pages including a dashboard layout, charts,
            kanban board, calendar, and pre-order E-commerce & Marketing pages.
          </Timeline.Body>
          <Button color="gray">
            Learn More
            <HiArrowNarrowRight className="ml-2 h-3 w-3" />
          </Button>
        </Timeline.Content>
      </Timeline.Item>
      <Timeline.Item>
        <Timeline.Point icon={HiCalendar} />
        <Timeline.Content>
          <Timeline.Time>March 2022</Timeline.Time>
          <Timeline.Title>Marketing UI design in Figma</Timeline.Title>
          <Timeline.Body>
            All of the pages and TeamsCards are first designed in Figma and we
            keep a parity between the two versions even as we update the
            project.
          </Timeline.Body>
        </Timeline.Content>
      </Timeline.Item>
      <Timeline.Item>
        <Timeline.Point icon={HiCalendar} />
        <Timeline.Content>
          <Timeline.Time>April 2022</Timeline.Time>
          <Timeline.Title>E-Commerce UI code in Tailwind CSS</Timeline.Title>
          <Timeline.Body>
            Get started with dozens of web TeamsCards and interactive elements
            built on top of Tailwind CSS.
          </Timeline.Body>
        </Timeline.Content>
      </Timeline.Item>
    </Timeline>
  );
}
