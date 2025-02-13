import useFetchTeens from "../../hooks/useFetchTeens";
import NewModal from "../../Components/NewModal";
import NewTeenForm from "./Components/NewTeenForm";
import TeensTable from "./Components/TeensTable";

export default function TeensPage() {
  const { teens, setTeens } = useFetchTeens();

  return (
    <>
      <h2 className="text-2xl font-medium text-gray-900 dark:text-white">
        Jóvenes
      </h2>
      <NewModal
        children={<NewTeenForm teens={teens} setTeens={setTeens} />}
        label={"Nuevo joven"}
      />
      <TeensTable teens={teens} />
    </>
  );
}
