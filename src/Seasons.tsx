import { useEffect, useState } from "react";
import NewSeasonForm from "./Components/NewSeasonForm";
import NewModal from "./Components/NewModal";
import { Season } from "./types";

function Seasons() {
  const [seasons, setSeasons] = useState<Season[]>([]);

  async function fetchSeasons() {
    const response = await fetch("http://192.168.0.10:8800/seasons");
    const data = await response.json();
    setSeasons(data);
  }

  useEffect(() => {
    fetchSeasons();
  }, []);

  return (
    <>
      <h2 className="text-2xl font-medium text-gray-900 dark:text-white">
        Temporadas
      </h2>
      <NewModal
        children={<NewSeasonForm seasons={seasons} setSeasons={setSeasons} />}
        label="Nueva temporada"
      />

      {seasons.map((season: Season) => (
        <p>{season.name}</p>
      ))}
    </>
  );
}

export default Seasons;
