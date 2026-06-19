import api from "./api";

export const profileService = {
  getAdminProfile: () => api.get("/admin/profile"),
  updateAdminProfile: (payload) => api.put("/admin/profile", payload),
  changeAdminPassword: (payload) => api.patch("/admin/profile/password", payload)
};
