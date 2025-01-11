import { Link } from "react-router-dom";
import { Button } from "flowbite-react";
import { HiArrowLeft } from "react-icons/hi";
import TeenDetailsTable from "./Components/TeenDetailsTable";

export default function TeenDetails() {
  return (
    <>
      <h2 className="text-2xl font-medium text-gray-900 dark:text-white">
        Detalles de Joven
      </h2>
      <Link to="/teens">
        <Button className="mt-4">
          <HiArrowLeft className="mr-2 h-5 w-5" />
          Volver a jóvenes
        </Button>
      </Link>

      <TeenDetailsTable />
    </>
  );
}
