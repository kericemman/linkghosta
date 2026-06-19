import api from "./api";

export const inquiryService = {
  submitInquiry: (payload) => api.post("/public/contact", payload),
  getInquiries: () => api.get("/admin/inquiries"),
  getInquiry: (id) => api.get(`/admin/inquiries/${id}`),
  updateInquiryStatus: (id, status) => api.patch(`/admin/inquiries/${id}/status`, { status }),
  addInquiryNote: (id, note) => api.patch(`/admin/inquiries/${id}/notes`, { note }),
  deleteInquiry: (id) => api.delete(`/admin/inquiries/${id}`)
};
