import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user, isLoading } = useSelector((state: any) => state?.auth);
  console.log("user", user);
  console.log("Loading", isLoading);
  const navigate = useNavigate();

  if (isLoading === false) {
    if (!user) {
      navigate("/login");
    }
    return children;
  }
};

export default ProtectedRoute;
