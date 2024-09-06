import { isOrder } from "~/lib/is-order";

export const useOrderQuery = () => {
  const router = useRouter();
  const { query } = useRoute();

  const queriedOrder = query["order"];

  let order: "asc" | "desc" = "asc";
  if (isOrder(queriedOrder)) {
    order = queriedOrder;
  }

  const setter = async (newOrdering: "asc" | "desc") => {
    return await router.push({ query: { ...query, order: newOrdering } });
  };

  return [order, setter] as const;
};
