import API from "./api";
export const fetchQuestions = async () => {
  const res = await API.get("/questions");
  return res.data;
};
