import api from "./api";

export const contactService = {
  submit: (payload) => api.post("/public/contact", payload)
};
