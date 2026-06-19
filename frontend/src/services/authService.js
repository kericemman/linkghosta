import api from "./api";

export const authService = {
  login: (payload) => api.post("/admin/auth/login", payload),
  currentAdmin: () => api.get("/admin/auth/me"),
  logout: () => api.post("/admin/auth/logout")
};
