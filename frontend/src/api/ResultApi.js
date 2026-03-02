import API from "./api";
export const getResultById = async (id) => {
  const response = await API.get(`/results/${id}`);
  return response.data;
};
