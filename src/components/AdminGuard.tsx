import { Navigate, useLocation } from "react-router-dom";
import { ReactNode } from "react";

interface AdminGuardProps {
  children: ReactNode;
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const location = useLocation();
  const token = localStorage.getItem("adminToken");

  // ❌ No token → redirect to admin login
  if (!token) {
    return (
      <Navigate
        to="/__kuyavan_admin"
        replace
        state={{ from: location }}
      />
    );
  }

  // ✅ Token exists → allow access
  return <>{children}</>;
}
