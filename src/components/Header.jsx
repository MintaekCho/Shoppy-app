import React from "react";
import { AiTwotoneShop } from "react-icons/ai";
import { BsPencilFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useAuthContext } from "./context/AuthContextProvider";
import Button from "./ui/Button";
import User from "./User";

export default function Header() {
  const { user, login, logout } = useAuthContext();

  return (
    <header className="w-full max-w-7xl h-20 flex justify-between items-center relative after:content-[''] after:bg-gray-200 after:w-full after:h-[2px] after:absolute after:bottom-0">
      <Link to={"/"} className="flex items-center text-4xl text-red-400">
        <AiTwotoneShop />
        Shoppy
      </Link>
      <nav className="flex gap-4 font-semibold items-center">
        <Link to={"/products"}>Products</Link>
        {user && <Link to={"/cart"}>Carts</Link>}

        {user && user.isAdmin && (
          <Link className="flex items-center" to={"/new"}>
            <BsPencilFill />
          </Link>
        )}

        {user && <User user={user} />}
        {user && <Button onClick={logout} text={"Logout"} />}
        {!user && <Button onClick={login} text={"Login"} />}
      </nav>
    </header>
  );
}
