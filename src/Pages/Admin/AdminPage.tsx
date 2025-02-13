import { Card } from "flowbite-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Group } from "../../types";
import NewModal from "../../Components/NewModal";
import NewGroupForm from "./components/NewGroupForm";
import LogoutButton from "../../Components/logoutButton";
import { useFetch } from "../../hooks/useFetch";
import { Loader } from "../../Components/Loader";

export default function AdminPage() {
  const isAuthorized = useAuth("primaryOwner");

  const { data, error, loading, fetchData } = useFetch<Group[]>("/groups");
  const groups = data ? data : [];

  if (!isAuthorized) {
    return "unauthorized";
  }

  if (error) {
    return "Ups...";
  }

  return (
    <>
      <div className="w-full space-y-4 p-4">
        <LogoutButton />
        <h2 className="text-2xl font-medium text-gray-900 dark:text-white">
          Admin page
        </h2>
        <NewModal
          children={<NewGroupForm fetchData={fetchData} />}
          label={"Nuevo grupo"}
        />
        <div className="flex flex-wrap gap-6">
          {loading ? (
            <Loader />
          ) : (
            groups.map((group: Group) => (
              <Link to={"/groups/" + group.id}>
                <Card href="#" className="max-w-xl">
                  <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {group.name}
                  </h5>
                  <p className="font-normal text-gray-700 dark:text-gray-400">
                    {group.churchName}
                  </p>
                </Card>
              </Link>
            ))
          )}
        </div>
      </div>
    </>
  );
}
