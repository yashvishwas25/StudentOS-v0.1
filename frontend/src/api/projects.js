import axiosInstance from "./axiosInstance";

export const getProjects = async ({ page = 1, per_page = 5, search = "" } = {}) => {
  const response = await axiosInstance.get("/projects", {
    params: { page, per_page, search: search || undefined },
  });
  return response.data;
};

export const getProject = async (projectId) => {
  const response = await axiosInstance.get(`/projects/${projectId}`);
  return response.data;
};

export const createProject = async (name) => {
  const response = await axiosInstance.post("/projects", { name });
  return response.data;
};

export const updateProject = async (projectId, name) => {
  const response = await axiosInstance.put(`/projects/${projectId}`, { name });
  return response.data;
};

export const deleteProject = async (projectId) => {
  const response = await axiosInstance.delete(`/projects/${projectId}`);
  return response.data;
};
