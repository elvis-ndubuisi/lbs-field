import http from "./http";

const fetcher = async (url: string) => {
  const response = await http.get(url);
  return response.data;
};

export default fetcher;
