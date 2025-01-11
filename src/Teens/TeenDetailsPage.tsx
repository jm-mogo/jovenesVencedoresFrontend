import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "flowbite-react";
import { HiArrowLeft } from "react-icons/hi";
import TeenDetailsTable from "./Components/TeenDetailsTable";

const TeenDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [teen, setTeen] = useState<any>({});

  async function fetchTeen() {
    const response = await fetch(`http://192.168.0.10:8800/teens/${id}`);
    const data = await response.json();

    setTeen(data);
  }

  useEffect(() => {
    fetchTeen();
  }, []);

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

      <TeenDetailsTable teen={teen} />
    </>
  );
};

export default TeenDetails;
