import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import CartProduct from "../components/CartProduct";
import Button from "../components/ui/Button";
import { useAuthContext } from "../context/AuthContextProvider";
import useCarts from "../hooks/useCarts";

export default function MyCart() {
  const { uid } = useAuthContext();
  const {
    getCartProducts: { data: cartProduct, isLoading, error },
  } = useCarts(uid);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setTotalPrice(
     cartProduct && cartProduct.reduce(
        (current, prev) => current + prev.price * prev.quantity,
        0
      )
    );
  }, [cartProduct]);

  return (
    <>
      {error && <p>에러가 발생했습니다!!!</p>}
      {isLoading && <p>Loading...</p>}
      <section className="w-full max-w-7xl min-w-min flex flex-col">
        {cartProduct ? (
          cartProduct.map((cartProduct) => {
            return (
              <CartProduct
                key={cartProduct.id}
                item={cartProduct}
                totalPrice={totalPrice}
                setTotalPrice={setTotalPrice}
                uid={uid}
              />
            );
          })
        ) : (
          <p className="text-lg font-bold">
            🤣 장바구니가 비었습니다. 열심히 쇼핑해주세요!!
          </p>
        )}
      </section>
      <section className="w-full max-w-7xl h-35 mt-4 bg-slate-200 rounded-3xl text-right flex flex-col p-4 gap-4">
        <p className="text-lg font-bold mr-4 mt-4  text-gray-700 bg-gray-200">{`총 ${
          cartProduct ? cartProduct.length : 0
        }개의 상품금액 ${ cartProduct ? totalPrice : 0}원 + 배송비 3000원 = 합계 ${
          totalPrice + 3000
        }원`}</p>
        <Button text={"구매하기"} />
      </section>
    </>
  );
}
