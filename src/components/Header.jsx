import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { AiTwotoneShop } from "react-icons/ai";
import { BsPencilFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { login, logout, onUserStateChange } from "../api/firebase";

export default function Header() {
    const [user, setUser] = useState();
    const handleLogin = () => {
        login().then(setUser)
    }
    const handleLogout = () => {
        logout().then(setUser)
    }

    useEffect(() => {
        onUserStateChange((user) => {
            console.log(user);
            setUser(user);
        })
    },[])

  return (
    <header className="w-full h-20 flex justify-between items-center relative after:content-[''] after:bg-gray-200 after:w-full after:h-[2px] after:absolute after:bottom-0">
      <Link to={"/"} className="flex items-center text-4xl text-red-400">
        <AiTwotoneShop />
        Shoppy
      </Link>
      <nav className="flex gap-4 font-semibold">
        <Link to={"/products"}>Products</Link>
        <Link to={"/cart"}>Carts</Link>
        <Link className="flex items-center" to={"/new"}>
          <BsPencilFill />
        </Link>
        {user && <button onClick={handleLogout}>Logout</button>}
        {!user && <button onClick={handleLogin}>Login</button>}
      </nav>
    </header>
  );
}
