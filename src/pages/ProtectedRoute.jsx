import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContextProvider";

export default function ProtectedRoute({ children, requireAdmin }) {
  const { user, loading } = useAuthContext();


  if (!user || (requireAdmin && !user.isAdmin)) {
    if(loading) return
    return <Navigate to={"/"} replace />;
  }

  return children;
}
