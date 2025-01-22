import { useEffect, useState } from "react";
import { Team } from "../types";
import { useParams } from "react-router-dom";
import LinkBack from "../Components/LinkBack";

export default function TeamManagementPage() {
  const { id } = useParams();
  const [team, setTeam] = useState<Team>();

  async function fetchTeam() {
    const response = await fetch(`http://127.0.0.1:8800/teams/${id}`);
    const data: Team = await response.json();
    setTeam(data);
  }

  useEffect(() => {
    fetchTeam();
  }, []);
  return (
    <>
      <LinkBack to={"/seasons/" + team?.seasonId}>
        <p>Regresar a temporada</p>
      </LinkBack>
      <pre>{JSON.stringify(team, null, 2)}</pre>
    </>
  );
}
