import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { addNewCart, getCartProduct as fetchCartProducts, removeCart } from "../api/firebase";

export default function useCarts(uid) {
    const queryClient = useQueryClient();

  const getCartProducts = useQuery(["cart"], () => fetchCartProducts(uid),{staleTime: 1000 * 60 * 5});

  const addCartProduct = useMutation(({product, uid}) => addNewCart(product, uid), {
    onSuccess: () => queryClient.invalidateQueries(["cart"])
  })

  const updateCartProduct = useMutation();

  const deleteCartProduct = useMutation(({uid, productId}) => removeCart(uid, productId))
  return { getCartProducts, addCartProduct, updateCartProduct, deleteCartProduct };
}
