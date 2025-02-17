import NewModal from "../../Components/NewModal";
import { useFetch } from "../../hooks/useFetch";
import { Teen } from "../../types";
import NewTeenForm from "./Components/NewTeenForm";
import TeensTable from "./Components/TeensTable";

export default function TeensPage() {
  const { data, loading, error, fetchData } = useFetch<Teen[]>("/teens");
  const teens = data ? data : [];

  return (
    <>
      <h2 className="text-2xl font-medium text-gray-900 dark:text-white">
        Jóvenes
      </h2>
      <NewModal
        children={<NewTeenForm teens={teens} fetchData={fetchData} />}
        label={"Nuevo joven"}
      />
      <TeensTable teens={teens} />
    </>
  );
}
