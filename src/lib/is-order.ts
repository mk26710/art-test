export const isOrder = (v: unknown): v is "asc" | "desc" => {
  return v === "asc" || v === "desc";
};
