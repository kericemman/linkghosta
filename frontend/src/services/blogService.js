import api from "./api";

export const blogService = {
  listPublic: () => api.get("/public/blogs"),
  getPublicBySlug: (slug) => api.get(`/public/blogs/${slug}`),
  getBlogs: () => api.get("/admin/blogs"),
  getBlog: (id) => api.get(`/admin/blogs/${id}`),
  createBlog: (payload) => api.post("/admin/blogs", payload),
  updateBlog: (id, payload) => api.put(`/admin/blogs/${id}`, payload),
  deleteBlog: (id) => api.delete(`/admin/blogs/${id}`),
  publishBlog: (id) => api.patch(`/admin/blogs/${id}/status`, { status: "published" }),
  unpublishBlog: (id) => api.patch(`/admin/blogs/${id}/status`, { status: "draft" })
};
