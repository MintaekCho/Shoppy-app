import React from "react";
import { BsCart } from "react-icons/bs";
import { useAuthContext } from "../../context/AuthContextProvider";
import useCarts from "../../hooks/useCarts";

export default function CartInfo() {
  const { uid } = useAuthContext();
  const {
    getCartProducts: { data },
  } = useCarts(uid);
  return (
    <div className="text-2xl relative">
      <BsCart />
      {data && (
        <p className="w-4 h-4 bg-red-400 rounded-full text-sm text-center text-white font-bold absolute -top-1 -right-1 line leading-[16px]">
          {data && data.length}
        </p>
      )}
    </div>
  );
}
