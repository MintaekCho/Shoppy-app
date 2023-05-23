import React from "react";
import { useState } from "react";
import { updateCartProduct } from "../api/firebase";
import { BsTrashFill } from "react-icons/bs";
import useCarts from "../hooks/useCarts";

export default function CartProduct({
  item,
  item: { id, image, price, title, quantity: q },
  totalPrice,
  setTotalPrice,
  uid,
}) {
  const [quantity, setQuantity] = useState(q);
  const { deleteCartProduct } = useCarts();

  return (
    item && (
      <article className="w-full h-40 mt-4 flex items-center justify-between text-lg font-semibold relative">
        <div>
          <BsTrashFill
            onClick={() => deleteCartProduct.mutate({ uid, productId: id })}
            className="absolute top-2 right-0 cursor-pointer"
          />
        </div>
        <div className="w-40 h-full">
          <img className="w-40 h-40 rounded-full" src={image} alt="productImage" />
        </div>
        <div className="w-[30%]">
          <p>{title}</p>
        </div>
        <div className="flex">
          <button
            onClick={() => {
              if (quantity < 2) return setQuantity(1);
              setQuantity(quantity - 1);
              setTotalPrice((totalPrice -= price));
              updateCartProduct(uid, { ...item, quantity: quantity - 1 });
            }}
          >
            -
          </button>
          <input className="w-5 text-center" disabled={true} value={quantity} />
          <button
            onClick={() => {
              setQuantity(quantity + 1);
              setTotalPrice((totalPrice += price));
              updateCartProduct(uid, { ...item, quantity: quantity + 1 });
            }}
          >
            +
          </button>
        </div>
        <p>{price}원</p>
        <p>3000원</p>
        <p>{quantity * price}원</p>
      </article>
    )
  );
}
