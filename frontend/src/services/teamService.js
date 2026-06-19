import api from "./api";

export const teamService = {
  listPublic: () => api.get("/public/team"),
  getTeamMembers: () => api.get("/admin/team"),
  getTeamMember: (id) => api.get(`/admin/team/${id}`),
  createTeamMember: (payload) => api.post("/admin/team", payload),
  updateTeamMember: (id, payload) => api.put(`/admin/team/${id}`, payload),
  deleteTeamMember: (id) => api.delete(`/admin/team/${id}`)
};
