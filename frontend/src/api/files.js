import axiosInstance from "./axiosInstance";

export const getFiles = async ({ page = 1, per_page = 5, search = "", file_type = "" } = {}) => {
  const response = await axiosInstance.get("/files", {
    params: {
      page,
      per_page,
      search: search || undefined,
      file_type: file_type || undefined,
    },
  });
  return response.data;
};

export const getFile = async (fileId) => {
  const response = await axiosInstance.get(`/files/${fileId}`);
  return response.data;
};

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axiosInstance.post("/files", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const deleteFile = async (fileId) => {
  const response = await axiosInstance.delete(`/files/${fileId}`);
  return response.data;
};
