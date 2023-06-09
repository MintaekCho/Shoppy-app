import React from "react";

export default function Banner() {
  return (
    <section className="h-96 bg-yellow-900 relative opacity-80">
        <div className="w-full h-full bg-banner bg-cover" />
        <div className="w-full text-white absolute text-center top-16">
          <p className=" text-3xl md:text-5xl lg:text-6xl font-bold">RoughlyShop</p>
          <p className=" text-lg md:text-xl lg:text-2xl font-bold">
            원하는 스타일로 맞춰드립니다.
          </p>
        </div>
    </section>
  );
}
