import { type ReactNode } from "react";
import { Navigate } from "react-router-dom";

type ProtectedProps = {
  children: ReactNode;
};

export default function Protected({ children }: ProtectedProps) {
  const token = localStorage.getItem("token");

  return token ? children : <Navigate to="/login" />;
}
