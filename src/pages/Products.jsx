import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { getProducts } from "../api/firebase";
import Product from "../components/Product";

export default function Products() {
  const {
    data: products,
    error,
    isLoading,
  } = useQuery(["products"], getProducts);

  const categoryChange = (e) => {
    
  };

  return (
    <main className="w-full max-w-7xl mt-4">
      <nav>
        <ul>
          <li className="cursor-pointer" onClick={categoryChange}>
            전체
          </li>
          <li className="cursor-pointer" onClick={categoryChange}>
            여성
          </li>
          <li className="cursor-pointer" onClick={categoryChange}>
            남성
          </li>
        </ul>
      </nav>
      <section className="w-full grid lg:grid-cols-5 md:grid-cols-3 gap-4 mt-2">
        {isLoading && <p>Loading...</p>}
        {error && <p>error!!!!!!!!</p>}
        {products &&
          products.map((item) => {
            return <Product key={item.id} item={item} />;
          })}
      </section>
    </main>
  );
}
