import api from "./api";

export const serviceRequestService = {
  submitServiceRequest: (payload) => api.post("/public/service-requests", payload),
  getServiceRequests: () => api.get("/admin/service-requests"),
  getServiceRequest: (id) => api.get(`/admin/service-requests/${id}`),
  updateServiceRequestStatus: (id, status) => api.patch(`/admin/service-requests/${id}/status`, { status }),
  addServiceRequestNote: (id, note) => api.patch(`/admin/service-requests/${id}/notes`, { note }),
  deleteServiceRequest: (id) => api.delete(`/admin/service-requests/${id}`)
};
