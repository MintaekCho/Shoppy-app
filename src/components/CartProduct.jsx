import React from "react";
import { useState } from "react";

export default function CartProduct({
  item,
  item: { image, price, title, quantity: q },
  totalPrice,
  setTotalPrice,
}) {
  const [quantity, setQuantity] = useState(q);

  return (
    item && (
      <article className="w-full h-40 mt-4 flex items-center justify-between text-lg font-semibold">
        <div className="w-40 h-full">
          <img className="w-40 h-40 rounded-full" src={image} alt="image" />
        </div>
        <div className="w-[30%]">
          <p>{title}</p>
        </div>
        <div className="flex">
          <button
            onClick={() => {
              if (quantity < 1) return setQuantity(0);
              setQuantity(quantity - 1);
              setTotalPrice((totalPrice -= price));
            }}
          >
            -
          </button>
          <input className="w-5 text-center" disabled={true} value={quantity} />
          <button
            onClick={() => {
              setQuantity(quantity + 1);
              setTotalPrice((totalPrice += price));
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
