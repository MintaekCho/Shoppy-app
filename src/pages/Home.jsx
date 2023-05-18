import React, { useState } from "react";
import { useEffect } from "react";
import { getProducts } from "../api/firebase";
import Product from "../components/Product";
import Banner from "../components/ui/Banner";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts()
      .then((res) => {
        const data = [];
        for (const key in res) {
          data.push(res[key]);
        }
        return data;
      })
      .then((data) => setProducts(data));
  }, []);

  return (
    <main className="w-full max-w-7xl mt-4">
      <Banner />
      <section className="w-full grid lg:grid-cols-5 md:grid-cols-3 gap-4 mt-2">
        {products &&
          products.map((item) => {
            return <Product key={item.id} item={item} />;
          })}
      </section>
    </main>
  );
}
