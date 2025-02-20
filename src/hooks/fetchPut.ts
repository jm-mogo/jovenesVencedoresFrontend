const apiURl: string = import.meta.env.VITE_API_URL;

export const fetchPut = async (
  url: string,
  dataBody: object,
): Promise<Response> => {
  const token = localStorage.getItem("jwtToken");

  const response = await fetch(apiURl + url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? token : "",
    },
    body: JSON.stringify(dataBody),
  });

  return response;
};
