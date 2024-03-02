import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ReactNode } from "react";

const SellerProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { seller, shopLoading } = useSelector((state: any) => state?.auth);
  console.log(seller);
  const navigate = useNavigate();

  if (shopLoading === false) {
    if (!seller || seller === null) {
      navigate("/shop-login");
    }
    return children;
  }
};

export default SellerProtectedRoute;
