import api from "./api";

export const subscriberService = {
  subscribe: (payload) => api.post("/public/subscribers", payload),
  unsubscribe: (token) => api.post(`/public/subscribers/unsubscribe/${token}`),
  getSubscribers: () => api.get("/admin/subscribers"),
  updateStatus: (id, status) => api.patch(`/admin/subscribers/${id}/status`, { status }),
  deleteSubscriber: (id) => api.delete(`/admin/subscribers/${id}`)
};
