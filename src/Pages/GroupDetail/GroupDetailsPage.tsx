import { Group } from "../../types";
import { useParams } from "react-router-dom";
import LinkBack from "../../Components/LinkBack";
import { useAuth } from "../../hooks/useAuth";
import NewUserForm from "./components/NewUserForm";
import NewModal from "../../Components/NewModal";
import UsersTable from "./components/UsersTable";
import { useFetch } from "../../hooks/useFetch";
import ErrorPage from "../../ErrorPage";

export default function GroupDetailsPage() {
  const isAuthorized = useAuth("primaryOwner");
  const { id } = useParams();

  const { data, error, loading, fetchData } = useFetch<Group>(`/groups/${id}`);

  const group = data;

  if (error) {
    return <ErrorPage />;
  }

  if (!isAuthorized) {
    return "unauthorized";
  }
  if (!group) {
    return "no group";
  }

  return (
    <>
      <LinkBack to={"/admin"}>
        <p>Regresar a admin</p>
      </LinkBack>
      <h2 className="text-2xl font-medium text-gray-900 dark:text-white">
        Grupo: {group.name}
      </h2>

      <div className="max-w-lg">
        <div className="mb-4 flex items-center justify-between">
          <h4 className="p-4 text-2xl font-medium text-gray-900 dark:text-white">
            Lista de usuarios
          </h4>
          <NewModal
            children={<NewUserForm groupId={group.id} fetchGroup={fetchData} />}
            label={"Crear usuario"}
          />
        </div>
        <UsersTable group={group} loading={loading} />
      </div>
    </>
  );
}
