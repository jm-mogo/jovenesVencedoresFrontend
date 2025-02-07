import { useEffect, useState } from "react";
import { Group } from "../types";
import { useParams } from "react-router-dom";
import LinkBack from "../Components/LinkBack";
import { useAuth } from "../hooks/useAuth";
import NewUserForm from "./NewUserForm";
import NewModal from "../Components/NewModal";
import UsersTable from "./UsersTable";

export default function GroupDetailsPage() {
  const isAuthorized = useAuth("primaryOwner");
  const { id } = useParams();
  const [group, setGroup] = useState<Group>();

  const token = localStorage.getItem("jwtToken");

  async function fetchGroup() {
    const response = await fetch(`http://127.0.0.1:8800/groups/${id}`, {
      headers: {
        Authorization: token ? token : "",
      },
    });
    const data: Group = await response.json();
    setGroup(data);
  }

  useEffect(() => {
    fetchGroup();
  }, []);

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
            children={
              <NewUserForm groupId={group.id} fetchGroup={fetchGroup} />
            }
            label={"Añadir asistencias"}
          />
        </div>
        <UsersTable group={group} />
      </div>
    </>
  );
}
