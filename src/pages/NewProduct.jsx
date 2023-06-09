import React, { useState } from "react";
import { imageUpload } from "../api/upload";
import useProducts from "../hooks/useProducts";

export default function NewProduct() {
  const [file, setFile] = useState();
  const [product, setProduct] = useState({});
  const [isLoding, setIsLoding] = useState(false);
  const [success, setSuccess] = useState(null);
  const { addProduct } = useProducts();

  const handleChange = (e) => {
    if (e.target.name === "file") {
      setFile(e.target.files[0]);
      return;
    }
    setProduct({ ...product, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoding(true);
    imageUpload(file)
      .then((url) => {
        addProduct.mutate(
          { product, url },
          {
            onSuccess: () => {
              setSuccess("✅새로운 제품을 등록하였습니다");
              setTimeout(() => {
                setSuccess(null);
              }, 4000);
            },
          }
        );
      })
      .finally(() => setIsLoding(false));
    // navigation("/");
  };

  return (
    <form className="w-full min-w-[330px] max-w-7xl flex flex-col items-center justify-center">
      <h2 className="text-xl font-bold my-4">새로운 제품 등록</h2>
      {success && <p className="mb-1">{success}</p>}
      {file && (
        <img
          className="w-60 h-60"
          src={URL.createObjectURL(file)}
          alt="파일 이미지"
        />
      )}
      <input
        className="w-full border p-2 mt-2"
        name="file"
        type="file"
        accept="image/*"
        onChange={handleChange}
        required
      />
      <input
        className="w-full border p-2 mt-2"
        name="title"
        onChange={handleChange}
        value={product.title}
        type="text"
        placeholder="제품명"
        required
      />
      <input
        className="w-full border p-2 mt-2"
        name="price"
        onChange={handleChange}
        value={product.price}
        type="number"
        placeholder="가격"
        required
      />
      <input
        className="w-full border p-2 mt-2"
        name="category"
        onChange={handleChange}
        value={product.category}
        type="text"
        placeholder="카테고리"
        required
      />
      <input
        className="w-full border p-2 mt-2"
        name="description"
        onChange={handleChange}
        value={product.description}
        type="text"
        placeholder="제품 설명"
        required
      />
      <input
        className="w-full border p-2 mt-2"
        name="options"
        onChange={handleChange}
        value={product.options}
        type="text"
        placeholder="옵션들(콤마(,)로 구분)"
      />
      <input
        className="w-full bg-red-400 mt-2 text-white p-2 font-bold cursor-pointer"
        type="button"
        value={isLoding ? "제품 등록중..." : "제품 등록하기"}
        onClick={handleSubmit}
        disabled={isLoding}
      />
    </form>
  );
}
