import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Product({ item }) {

    const navigation = useNavigate();

    const handleClick = () => {
        navigation(`/products/${item.id}`, {state: item})
    }
  return (
      <article onClick={handleClick} className="text-lg shadow-md p-4 mt-2 transition-all hover:scale-105">
        <img className="w-full" src={item.image} alt="" />
        <div className="flex justify-between ">
          <text className="truncate">{item.title}</text>
          <text>₩{item.price}</text>
        </div>
        <text className="text-sm text-gray-600">{item.category}</text>
      </article>
  );
}
