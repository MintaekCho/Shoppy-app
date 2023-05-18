import React from "react";
import { useLocation } from "react-router-dom";
import Button from "../components/ui/Button";

export default function ProductDetails() {
  const addCart = () => {};
  const buy = () => {};

  const {
    state: { product: title, image, price, description, options },
  } = useLocation();

  return (
    <section className="min-w-[430px] max-w-7xl flex flex-col md:flex-row gap-4 p-4">
      <img className="w-full basis-7/12" src={image} alt={title} />
      <div className="w-full basis-5/12 flex flex-col p-4 gap-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="border-b font-bold">{`₩${price}`}</p>
        <p>{description}</p>
        <div className="flex items-center">
          <label className="w-10 text-red-400 mr-2" htmlFor="option">
            옵션:
          </label>
          <select
            name="option"
            id="option"
            className="w-full h-10 border-gray-400 border-2"
          >
            {options.map((option) => {
              return <option value={option}>{option}</option>;
            })}
          </select>
        </div>

        <div className="w-full flex flex-col gap-2">
          <Button onClick={addCart} text={"장바구니에 추가"} />
          <Button onClick={buy} text={"구매하기"} />
        </div>
      </div>
    </section>
  );
}
