import TeenDetailsTable from "./Components/TeenDetailsTable";
import LinkBack from "../../Components/LinkBack";

export default function TeenDetails() {
  return (
    <>
      <LinkBack to={"/teens"}>
        <p>Regresar a jóvenes</p>
      </LinkBack>
      <h2 className="text-2xl font-medium text-gray-900 dark:text-white">
        Detalles de Joven
      </h2>

      <TeenDetailsTable />
    </>
  );
}
