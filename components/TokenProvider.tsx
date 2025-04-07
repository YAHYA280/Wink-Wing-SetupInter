"use client";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "@/store/features/authSlice";

const TokenProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const [isTokenLoaded, setIsTokenLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Get token from localStorage
      const storedToken = localStorage.getItem("auth-token");

      if (storedToken) {
        // Set token in Redux state
        dispatch(setToken(storedToken));
      }

      // Mark token loading as complete
      setIsTokenLoaded(true);
    }
  }, [dispatch]);

  // You could add a loading indicator here if needed while token is loading
  // This ensures that components that depend on the token don't render prematurely
  if (!isTokenLoaded && typeof window !== "undefined") {
    return null; // Or a minimal loading indicator
  }

  return <>{children}</>;
};

export default TokenProvider;
