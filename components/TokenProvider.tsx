import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "@/store/features/authSlice";

const TokenProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("auth-token");
      if (storedToken) {
        dispatch(setToken(storedToken));
      }
    }
  }, [dispatch]);

  return <>{children}</>;
};

export default TokenProvider;
