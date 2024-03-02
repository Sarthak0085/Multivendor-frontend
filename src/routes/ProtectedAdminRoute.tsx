import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedAdminRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useSelector((state: any) => state.auth);
  console.log(user);
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
  } else if (user?.role === "ADMIN") {
    return children;
  } else {
    navigate("/");
  }
};

export default ProtectedAdminRoute;
