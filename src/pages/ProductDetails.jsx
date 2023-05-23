import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Button from "../components/ui/Button";
import { useAuthContext } from "../context/AuthContextProvider";
import useCarts from "../hooks/useCarts";

export default function ProductDetails() {
  const { uid } = useAuthContext();
  const {
    state: { id, title, image, price, description, options },
  } = useLocation();
  const [isLoding, setIsLoding] = useState(false);
  const [cartMessage, setCartMessage] = useState(null);
  const [selected, setSelected] = useState(options[0]);
  const handleChange = (e) => {
    setSelected(e.target.value);
  };
  const { addCartProduct } = useCarts();

  const addCart = (e) => {
    e.preventDefault();
    setIsLoding(true);
    setCartMessage("✅ 장바구니에 추가되었습니다.");
    const product = {
      id,
      title,
      image,
      price,
      quantity: 1,
      option: selected,
    };
    addCartProduct.mutate(
      { product, uid },
      {
        onSuccess: () => {
          setIsLoding(false);
          setTimeout(() => setCartMessage(null), 3000);
        },
      }
    );
  };

  return (
    <section className="min-w-[430px] max-w-7xl flex flex-col md:flex-row gap-4 p-4">
      <img className="basis-7/12" src={image} alt={title} />
      <div className=" basis-5/12 flex flex-col p-4 gap-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="border-b font-bold">{`₩${price}`}</p>
        <p>{description}</p>
        {cartMessage && <p className="text-md font-bold">{cartMessage}</p>}
        <div className="flex items-center">
          <label className="w-10 text-red-400 mr-2" htmlFor="option">
            옵션:
          </label>
          <select
            id="option"
            className="w-full h-10 border-gray-400 border-2"
            value={selected}
            onChange={handleChange}
          >
            {options.map((option, index) => {
              return <option key={index}>{option}</option>;
            })}
          </select>
        </div>

        <div className="w-full flex flex-col gap-2">
          <Button
            onClick={addCart}
            text={isLoding ? "추가 중..." : "장바구니에 추가"}
            isLoding={isLoding}
          />
        </div>
      </div>
    </section>
  );
}
