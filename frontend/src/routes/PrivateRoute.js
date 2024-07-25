import React, { useEffect } from 'react';
import { Navigate } from "react-router-dom";
import useFindUser from "../hooks/useFindUser";
import { useState } from "react";

const PrivateRoute = ({ element }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useFindUser(setLoading, user, setUser);

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
