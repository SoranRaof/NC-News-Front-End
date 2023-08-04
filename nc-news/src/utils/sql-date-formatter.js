export const sqlDateFormatter = (created_at) => {
  return new Date(created_at).toLocaleString();
};
