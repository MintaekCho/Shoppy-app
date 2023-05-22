import React, { useEffect, useState } from "react";
import Product from "../components/Product";
import useProducts from "../hooks/useProducts";

export default function Products() {
  const [products, setProducts] = useState([]);
  const {fetchProducts: {data, isLoading, error}} = useProducts();
 

  useEffect(() => {
    data && setProducts(data);
  },[data]);

  const categoryChange = (e) => {
    if (e.target.innerHTML === "전체") return setProducts(data)
    setProducts(data.filter((item) => item.category === e.target.innerHTML));
  };

  return (
    <main className="w-full max-w-7xl mt-4">
      <nav>
        <ul className="flex gap-10 font-bold text-xl text-white bg-red-400 opacity-80 rounded-lg py-2 px-6">
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
