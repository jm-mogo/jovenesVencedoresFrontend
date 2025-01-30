import { useEffect, useState } from "react";
import { Team } from "../types";
import { useParams } from "react-router-dom";
import LinkBack from "../Components/LinkBack";
import MembersTable from "./Components/MembersTable";
import AddMemberForm from "./Components/AddMembersForm";
import NewModal from "../Components/NewModal";

export default function TeamManagementPage() {
  const { id } = useParams();
  const [team, setTeam] = useState<Team>();
  if (id == undefined) {
    return "No";
  }

  async function fetchTeam() {
    const response = await fetch(`http://127.0.0.1:8800/teams/${id}`);
    const data: Team = await response.json();
    setTeam(data);
  }

  useEffect(() => {
    fetchTeam();
  }, []);

  if (team == undefined) {
    return "No hay datos de equipo";
  }

  return (
    <>
      <LinkBack to={"/seasons/" + team?.seasonId}>
        <p>Regresar a temporada</p>
      </LinkBack>
      <h2 className="text-2xl font-medium text-gray-900 dark:text-white">
        Equipo: {team.name}
      </h2>

      <div className="max-w-lg">
        <div className="mb-4 flex items-center justify-between">
          <h4 className="p-4 text-2xl font-medium text-gray-900 dark:text-white">
            Miembros
          </h4>
          <NewModal
            children={<AddMemberForm team={team} fetchTeam={fetchTeam} />}
            label={"Añadir miembros"}
          />
        </div>
        <MembersTable team={team} fetchTeam={fetchTeam} />
      </div>
    </>
  );
}
