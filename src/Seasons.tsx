import { useEffect, useState } from "react";
import NewSeasonModal from "./newSeasonModel";

function Seasons() {
  const [seasons, setSeasons] = useState([]);

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
      <NewSeasonModal seasons={seasons} setSeasons={setSeasons} />
      {seasons.map((season: any) => (
        <p>{season.name}</p>
      ))}
    </>
  );
}

export default Seasons;
