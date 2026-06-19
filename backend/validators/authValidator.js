export function validateLoginPayload(payload) {
  return Boolean(payload?.email && payload?.password);
}
