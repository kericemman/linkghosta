import api from "./api";

export const caseStudyService = {
  listPublic: () => api.get("/public/case-studies"),
  getPublicBySlug: (slug) => api.get(`/public/case-studies/${slug}`),
  getCaseStudies: () => api.get("/admin/case-studies"),
  getCaseStudy: (id) => api.get(`/admin/case-studies/${id}`),
  createCaseStudy: (payload) => api.post("/admin/case-studies", payload),
  updateCaseStudy: (id, payload) => api.put(`/admin/case-studies/${id}`, payload),
  deleteCaseStudy: (id) => api.delete(`/admin/case-studies/${id}`),
  publishCaseStudy: (id) => api.patch(`/admin/case-studies/${id}/status`, { status: "published" }),
  unpublishCaseStudy: (id) => api.patch(`/admin/case-studies/${id}/status`, { status: "draft" })
};
