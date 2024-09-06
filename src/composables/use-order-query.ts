import { isOrder } from "~/lib/is-order";

export const useOrderQuery = (): "asc" | "desc" => {
  const { query } = useRoute();
  const order = query["order"];

  if (isOrder(order)) {
    return order;
  } else {
    return "asc";
  }
};
