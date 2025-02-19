const apiURl: string = import.meta.env.VITE_API_URL;

export const fetchDelete = async (url: string): Promise<Response> => {
  const token = localStorage.getItem("jwtToken");

  const response = await fetch(apiURl + url, {
    method: "DELETE",
    headers: {
      Authorization: token ? token : "",
    },
  });

  if (!response.ok) {
    throw new Error("Error en la petición");
  }

  return response;
};
