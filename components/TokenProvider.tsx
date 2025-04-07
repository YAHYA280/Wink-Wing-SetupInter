"use client";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setToken, getMe } from "@/store/features/authSlice";
import { useAppDispatch } from "@/store/hooks/hooks";

const TokenProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const [isTokenLoaded, setIsTokenLoaded] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      if (typeof window !== "undefined") {
        // Get token from localStorage
        const storedToken = localStorage.getItem("auth-token");

        if (storedToken) {
          // Set token in Redux state
          dispatch(setToken(storedToken));

          try {
            // Fetch user data with token
            await dispatch(getMe({ token: storedToken }));
          } catch (error) {
            console.error("Error fetching user data:", error);
            // If token is invalid, remove it
            localStorage.removeItem("auth-token");
            dispatch(setToken(null));
          }
        }

        // Mark token loading as complete
        setIsTokenLoaded(true);
      }
    };

    initializeAuth();
  }, [dispatch]);

  // You could add a loading indicator here if needed while token is loading
  if (!isTokenLoaded && typeof window !== "undefined") {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-main"></div>
      </div>
    );
  }

  return <>{children}</>;
};

export default TokenProvider;
