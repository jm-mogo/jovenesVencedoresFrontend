import { Card } from "flowbite-react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Group } from "../types";
import { useEffect, useState } from "react";
import NewModal from "../Components/NewModal";
import NewGroupForm from "./newGroupForm";
import LogoutButton from "../Components/logoutButton";

export default function AdminPage() {
  const isAuthorized = useAuth("primaryOwner");
  const [groups, setGroups] = useState([]);

  const token = localStorage.getItem("jwtToken");

  async function fetchGroups() {
    const response = await fetch("http://127.0.0.1:8800/groups", {
      headers: {
        Authorization: token ? token : "",
      },
    });
    const data = await response.json();

    setGroups(data);
  }

  useEffect(() => {
    fetchGroups();
  }, []);

  if (!isAuthorized) {
    return "unauthorized";
  } else {
    return (
      <>
        <div className="w-full space-y-4 p-4">
          <LogoutButton />
          <h2 className="text-2xl font-medium text-gray-900 dark:text-white">
            Admin page
          </h2>
          <NewModal
            children={<NewGroupForm groups={groups} setGroups={setGroups} />}
            label={"Nuevo grupo"}
          />
          <div className="flex flex-wrap gap-6">
            {groups.map((group: Group) => (
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
            ))}
          </div>
        </div>
      </>
    );
  }
}
