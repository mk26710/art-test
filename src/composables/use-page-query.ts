export const usePageQuery = () => {
  const router = useRouter();
  const { query } = useRoute();

  const queriedNum = query["page"];

  let num: number | null = null;
  if (typeof queriedNum === "string") {
    num = Number(queriedNum);
  }

  const setter = async (newPage: number) => {
    return await router.push({ query: { ...query, page: newPage } });
  };

  return [num, setter] as const;
};
