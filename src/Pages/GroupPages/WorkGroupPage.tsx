import { Loader } from "../../Components/Loader";
import NewModal from "../../Components/NewModal";
import ErrorPage from "../../ErrorPage";
import { useFetch } from "../../hooks/useFetch";
import { useUser } from "../../hooks/useUser";
import { Group } from "../../types";
import NewUserForm from "./components/NewUserForm";
import UsersTable from "./components/UsersTable";

export default function WorkGroupPage() {
  const user = useUser();

  const { data, error, loading, fetchData } = useFetch<Group>(
    `/groups/${user?.groupId}`,
  );

  const group = data;

  if (loading) return <Loader fullPage={true} />;

  if (!user || error) {
    return <ErrorPage />;
  }

  if (!group) {
    return "no group";
  }

  return (
    <>
      <div className="w-full space-y-4 p-4">
        <h2 className="text-2xl font-medium text-gray-900 dark:text-white">
          Grupo: {group.name}
        </h2>

        <div className="max-w-lg">
          <div className="mb-4 flex items-center justify-between">
            <h4 className="p-4 text-2xl font-medium text-gray-900 dark:text-white">
              Lista de usuarios
            </h4>
            <NewModal
              children={
                <NewUserForm groupId={group.id} fetchGroup={fetchData} />
              }
              label={"Crear usuario"}
            />
          </div>
          <UsersTable group={group} loading={loading} fetchData={fetchData} />
        </div>
      </div>
    </>
  );
}
