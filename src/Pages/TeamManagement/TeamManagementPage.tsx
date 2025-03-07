import { Team } from "../../types";
import { useParams } from "react-router-dom";
import LinkBack from "../../Components/LinkBack";
import MembersTable from "./Components/MembersTable";
import AddMemberForm from "./Components/AddMembersForm";
import NewModal from "../../Components/NewModal";
import { useFetch } from "../../hooks/useFetch";
import { Loader } from "../../Components/Loader";
import EditModal from "../../Components/EditModal";
import UpdateTeamForm from "./Components/UpdateTeamForm";

export default function TeamManagementPage() {
  const { id } = useParams();

  const { data, loading, error, fetchData } = useFetch<Team>("/teams/" + id);
  const team = data;

  if (loading) return <Loader fullPage={true} />;

  if (!team || error) {
    return "No hay datos de equipo";
  }

  return (
    <>
      <LinkBack to={"/seasons/" + team?.seasonId}>
        <p>Regresar a temporada</p>
      </LinkBack>
      <div className=" flex max-w-lg items-center justify-between">
        <h2 className="text-2xl font-medium text-gray-900 dark:text-white">
          Equipo: {team.name}
        </h2>
        <EditModal
          children={<UpdateTeamForm team={team} fetchData={fetchData} />}
          label={"Editar"}
        />
      </div>

      <div className="max-w-lg">
        <div className="mb-4 flex items-center justify-between">
          <h4 className="p-4 text-2xl font-medium text-gray-900 dark:text-white">
            Miembros
          </h4>
          <NewModal
            children={<AddMemberForm team={team} fetchTeam={fetchData} />}
            label={"Añadir miembros"}
          />
        </div>
        <MembersTable team={team} fetchTeam={fetchData} />
      </div>
    </>
  );
}
