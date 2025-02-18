import NewModal from "../../Components/NewModal";
import NewParentForm from "./Components/NewParentForm";
import ParentsTable from "./Components/parentsTable";
import { useFetch } from "../../hooks/useFetch";
import { Loader } from "../../Components/Loader";
import { Parent } from "../../types";

export default function Parentspage() {
  const { data, loading, fetchData } = useFetch<Parent[]>("/parents");
  const parents = data ? data : [];

  return (
    <>
      <h2 className="text-2xl font-medium text-gray-900 dark:text-white">
        Representantes
      </h2>
      <NewModal
        children={<NewParentForm fetchData={fetchData} />}
        label={"Nuevo representante"}
      />
      {loading ? <Loader /> : <ParentsTable parents={parents} />}
    </>
  );
}
