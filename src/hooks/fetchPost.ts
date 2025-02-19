const apiURl: string = import.meta.env.VITE_API_URL;

export const fetchPost = async (
  url: string,
  dataBody: object,
): Promise<Response> => {
  const token = localStorage.getItem("jwtToken");

  const response = await fetch(apiURl + url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? token : "",
    },
    body: JSON.stringify(dataBody),
  });

  if (!response.ok) {
    throw new Error("Error en la petición");
  }

  return response;
};
