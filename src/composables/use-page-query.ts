export const usePageQuery = () => {
  const route = useRoute();
  const page = route.query["page"];

  let num: number | null = null;
  if (typeof page === "string") {
    num = Number(page);
  }

  return num;
};
