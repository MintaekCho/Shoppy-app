import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addNewProduct, getProducts } from "../api/firebase";

export default function useProducts() {

    const queryClient = useQueryClient();

  const fetchProducts = useQuery(["products"], getProducts, {
    staleTime: 1000 * 60 * 3,
  });

  const addProduct = useMutation(
    ({ product, url }) => addNewProduct(product, url),
    {
      onSuccess: () => queryClient.invalidateQueries(["products"]),
    }
  );

  return { fetchProducts, addProduct };
}
