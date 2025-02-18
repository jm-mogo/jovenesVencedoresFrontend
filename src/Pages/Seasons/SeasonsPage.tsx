import NewSeasonForm from "./Components/NewSeasonForm";
import NewModal from "../../Components/NewModal";
import { Season } from "../../types";
import { Card } from "flowbite-react";
import { Link } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { Loader } from "../../Components/Loader";
import ErrorPage from "../../ErrorPage";

export default function SeasonsPage() {
  const { data, loading, error, fetchData } = useFetch<Season[]>("/seasons");
  const seasons = data ? data : [];

  if (error) return <ErrorPage />;

  return (
    <>
      <h2 className="text-2xl font-medium text-gray-900 dark:text-white">
        Temporadas
      </h2>
      <NewModal
        children={<NewSeasonForm fetchData={fetchData} />}
        label="Nueva temporada"
      />
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-wrap gap-6">
          {seasons.map((season: Season) => (
            <Link to={"/seasons/" + season.id}>
              <Card href="#" className=" max-w-sm">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {season.name}
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  Here are the biggest enterprise technology acquisitions of
                  2021 so far, in reverse chronological order.
                </p>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
