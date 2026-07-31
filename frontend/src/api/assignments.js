import axiosInstance from "./axiosInstance";

export const getAssignments = async ({ page = 1, per_page = 5, search = "", status = "" } = {}) => {
  const response = await axiosInstance.get("/assignments", {
    params: {
      page,
      per_page,
      search: search || undefined,
      status: status || undefined,
    },
  });
  return response.data;
};

export const getAssignment = async (assignmentId) => {
  const response = await axiosInstance.get(`/assignments/${assignmentId}`);
  return response.data;
};

export const createAssignment = async ({ title, description, due_date, status }) => {
  const response = await axiosInstance.post("/assignments", {
    title,
    description,
    due_date,
    status,
  });
  return response.data;
};

export const updateAssignment = async (assignmentId, { title, description, due_date, status }) => {
  const response = await axiosInstance.put(`/assignments/${assignmentId}`, {
    title,
    description,
    due_date,
    status,
  });
  return response.data;
};

export const deleteAssignment = async (assignmentId) => {
  const response = await axiosInstance.delete(`/assignments/${assignmentId}`);
  return response.data;
};
