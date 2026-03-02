import API from "./api";
export const submitResponses = async (answers) => {
  const res = await API.post("/answers", { answers });
  return res.data;
};
