import api from "./api.js";

export const siteContentService = {
  get: () => api.get("/site-content"),
  update: (payload) => api.put("/site-content", payload)
};
