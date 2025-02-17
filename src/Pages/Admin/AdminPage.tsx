import { Button, Card, Dropdown } from "flowbite-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Group } from "../../types";
import NewModal from "../../Components/NewModal";
import NewGroupForm from "./components/NewGroupForm";
import LogoutButton from "../../Components/logoutButton";
import { useFetch } from "../../hooks/useFetch";
import { Loader } from "../../Components/Loader";
import ErrorPage from "../../ErrorPage";

export default function AdminPage() {
  const isAuthorized = useAuth("primaryOwner");

  const { data, error, loading, fetchData } = useFetch<Group[]>("/groups");
  const groups = data ? data : [];

  if (!isAuthorized) {
    return "unauthorized";
  }

  if (error) {
    return <ErrorPage />;
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
            groups.map((group: Group) => <CardGroup group={group} />)
          )}
        </div>
      </div>
    </>
  );
}

const CardGroup = ({ group }: { group: Group }) => (
  <Card href="#" className="w-96">
    <div className=" flex items-end justify-between">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {group.name}
      </h5>
      <div className="flex items-center px-4 pt-4">
        <Dropdown inline label="opciones" size="xl">
          <Dropdown.Item>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Edit
            </a>
          </Dropdown.Item>
          <Dropdown.Item>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Delete
            </a>
          </Dropdown.Item>
        </Dropdown>
      </div>
    </div>

    <p className="font-normal text-gray-700 dark:text-gray-400">
      {group.churchName}
    </p>
    <Link className="self-end" to={"/groups/" + group.id}>
      <Button>Administrar usuarios</Button>
    </Link>
  </Card>
);
