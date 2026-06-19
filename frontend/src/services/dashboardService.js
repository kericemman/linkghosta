import api from "./api.js";

export const dashboardService = {
  getOverview: () => api.get("/admin/dashboard")
};
