import axiosInstance from "./axiosInstance";

export const loginRequest = async (username, password) => {
  const response = await axiosInstance.post("/login", { username, password });
  return response.data;
};

export const registerRequest = async (username, password) => {
  const response = await axiosInstance.post("/register", { username, password });
  return response.data;
};

export const getProfileRequest = async () => {
  const response = await axiosInstance.get("/profile");
  return response.data;
};
