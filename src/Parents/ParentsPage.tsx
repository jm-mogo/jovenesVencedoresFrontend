import NewModal from "../Components/NewModal";
import NewParentForm from "./Components/NewParentForm";
import { useFetchParents } from "../hooks/useFetchParents";
import ParentsTable from "./Components/parentsTable";

export default function Parentspage() {
  const { parents, setParents } = useFetchParents();

  return (
    <>
      <h2 className="text-2xl font-medium text-gray-900 dark:text-white">
        Representantes
      </h2>
      <NewModal
        children={<NewParentForm parents={parents} setParents={setParents} />}
        label={"Nuevo representante"}
      />
      <ParentsTable parents={parents} />
    </>
  );
}
