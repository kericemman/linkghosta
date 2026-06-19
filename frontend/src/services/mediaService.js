import api from "./api";

export const mediaService = {
  getMediaAssets: () => api.get("/admin/media"),
  getMediaAsset: (id) => api.get(`/admin/media/${id}`),
  uploadMedia: (payload) => api.post("/admin/media", payload, { headers: { "Content-Type": "multipart/form-data" } }),
  updateMediaMetadata: (id, payload) => api.put(`/admin/media/${id}`, payload),
  deleteMedia: (id) => api.delete(`/admin/media/${id}`)
};
