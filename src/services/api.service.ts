import axios, { AxiosRequestConfig } from "axios";

const token = import.meta.env.VITE_API_TOKEN_KEY as string;
const baseUrl = import.meta.env.VITE_API_BASE_URL as string;

export const fetchMovies = async (
  url: string,
  genreId?: number,
  searchQuery?: string,
) => {
  const options: AxiosRequestConfig = {
    method: "GET",
    url: `${baseUrl}${url}`,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    params: {
      with_genres: genreId,
      query: searchQuery,
    },
  };
  try {
    return await axios.request(options);
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
};
