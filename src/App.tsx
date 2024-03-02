import { Route, Routes } from "react-router-dom";
// import './App.css';
import Register from "./components/Auth/Register";
import ActivationPage from "./pages/ActivationPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProductsPage from "./pages/ProductsPage";
import ShopActivationPage from "./pages/Shop/ShopActivationPage";
import ShopAllCoupons from "./pages/Shop/ShopAllCoupons";
import ShopAllEvents from "./pages/Shop/ShopAllEvents";
import ShopAllProducts from "./pages/Shop/ShopAllProducts";
import ShopCreateEvents from "./pages/Shop/ShopCreateEvent";
import ShopCreateProduct from "./pages/Shop/ShopCreateProduct";
import ShopDashboardPage from "./pages/Shop/ShopDashboardPage";
import ShopLoginPage from "./pages/ShopLoginPage";
import ShopRegisterPage from "./pages/ShopRegisterPage";
import AddressPage from "./pages/user/AddressPage";
import AllOrdersPage from "./pages/user/AllOrderPage";
import AllRefundOrdersPage from "./pages/user/AllRefundOrdersPage";
import ChangePasswordPage from "./pages/user/ChangePasswordPage";
import ProfilePage from "./pages/user/ProfilePage";
import ProtectedRoute from "./routes/ProtectedRoute";
import SellerProtectedRoute from "./routes/SellerProtectedRoute";
// import ProductDetailsPage from './pages/ProductDetailsPage';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Suspense, useEffect, useState } from "react";
import BestSellingPage from "./pages/BestSellingPage";
import CheckoutPage from "./pages/CheckoutPage";
import EventsPage from "./pages/EventsPage";
import FAQPage from "./pages/FaqPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import PaymentPage from "./pages/PaymentPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ShopAllOrders from "./pages/Shop/ShopAllOrders";
import ShopAllRefunds from "./pages/Shop/ShopAllRefundsPage";
import ShopEditProductPage from "./pages/Shop/ShopEditProductPage";
import ShopHomePage from "./pages/Shop/ShopHomePage";
import ShopOrderDetails from "./pages/Shop/ShopOrderDetails";
import ShopPreviewPage from "./pages/Shop/ShopPreviewPage";
import ShopSettingsPage from "./pages/Shop/ShopSettingsPage";
import ShopWithDrawMoneyPage from "./pages/Shop/ShopWithDrawMoneyPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import OrderDetailsPage from "./pages/user/OrderDetailsPage";
import TrackOrderPage from "./pages/user/TrackOrderPage";
import { useGetStripeApiKeyQuery } from "./redux/features/payment/paymentApi";
import {
  AdminDashboardBrands,
  AdminDashboardCategories,
  AdminDashboardCoupons,
  AdminDashboardCouponsAnalytics,
  AdminDashboardEditFaq,
  AdminDashboardEditHero,
  AdminDashboardEvents,
  AdminDashboardEventsAnalytics,
  AdminDashboardOrdersAnalytics,
  AdminDashboardPage,
  AdminDashboardProducts,
  AdminDashboardProductsAnalytics,
  AdminDashboardSellers,
  AdminDashboardSellersAnalytics,
  AdminDashboardUsers,
  AdminDashboardUsersAnalytics,
  AdminDashboardWithdraw,
  AdminDashboardWithdrawAnalytics,
} from "./routes/AdminRoutes";
import ProtectedAdminRoute from "./routes/ProtectedAdminRoute";
import Loader from "./components/Layout/Loader";
import ShopForgotPasswordPage from "./pages/Shop/ShopForgotPasswordPage";
import ShopResetPasswordPage from "./pages/Shop/ShopResetPasswordPage";

function App() {
  const [stripeApikey, setStripeApiKey] = useState("");

  const { data, isLoading } = useGetStripeApiKeyQuery({});
  console.log("Stripe: ", data);

  function getStripeApikey() {
    setStripeApiKey(data?.stripeApikey);
  }
  useEffect(() => {
    getStripeApikey();
  }, [data]);
  return (
    <>
      <Suspense fallback={<Loader />}>
        {isLoading === false && stripeApikey && (
          <Elements stripe={loadStripe(stripeApikey)}>
            <Routes>
              <Route
                path="/payment"
                element={
                  <ProtectedRoute>
                    <PaymentPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Elements>
        )}
        <Routes>
          <Route path="/sign-up" element={<Register />} />
          <Route path="/verification" element={<ActivationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/shop-create" element={<ShopRegisterPage />} />
          <Route path="/verification-shop" element={<ShopActivationPage />} />
          <Route path="/shop-login" element={<ShopLoginPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/best-selling" element={<BestSellingPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route
            path="/shop-forgot-password"
            element={<ShopForgotPasswordPage />}
          />
          <Route path="/shop-reset-password" element={<ShopResetPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/shop/preview/:id" element={<ShopPreviewPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/order/success" element={<OrderSuccessPage />} />
          <Route
            path="/profile/:userId"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="profile/:userId/all-orders"
            element={
              <ProtectedRoute>
                <AllOrdersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="profile/:userId/refund-orders"
            element={
              <ProtectedRoute>
                <AllRefundOrdersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="profile/:userId/password"
            element={
              <ProtectedRoute>
                <ChangePasswordPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="profile/:userId/address"
            element={
              <ProtectedRoute>
                <AddressPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/:userId/order/:id"
            element={
              <ProtectedRoute>
                <OrderDetailsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/:userId/track/order/:id"
            element={
              <ProtectedRoute>
                <TrackOrderPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <SellerProtectedRoute>
                <ShopDashboardPage />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/shop/:id"
            element={
              <SellerProtectedRoute>
                <ShopHomePage />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <SellerProtectedRoute>
                <ShopSettingsPage />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-refunds"
            element={
              <SellerProtectedRoute>
                <ShopAllRefunds />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-create-product"
            element={
              <SellerProtectedRoute>
                <ShopCreateProduct />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-update-product/:productId"
            element={
              <SellerProtectedRoute>
                <ShopEditProductPage />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-products"
            element={
              <SellerProtectedRoute>
                <ShopAllProducts />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/order/:id"
            element={
              <SellerProtectedRoute>
                <ShopOrderDetails />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-coupons"
            element={
              <SellerProtectedRoute>
                <ShopAllCoupons />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-events"
            element={
              <SellerProtectedRoute>
                <ShopAllEvents />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-create-event"
            element={
              <SellerProtectedRoute>
                <ShopCreateEvents />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-orders"
            element={
              <SellerProtectedRoute>
                <ShopAllOrders />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-withdraw-money"
            element={
              <SellerProtectedRoute>
                <ShopWithDrawMoneyPage />
              </SellerProtectedRoute>
            }
          />
          {/* Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedAdminRoute>
                <AdminDashboardPage />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin-users"
            element={
              <ProtectedAdminRoute>
                <AdminDashboardUsers />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin-sellers"
            element={
              <ProtectedAdminRoute>
                <AdminDashboardSellers />
              </ProtectedAdminRoute>
            }
          />
          {/* <Route
          path="/admin-orders"
          element={
            <ProtectedAdminRoute>
            <AdminDashboardOrders />
            </ProtectedAdminRoute>
          }
        /> */}
          <Route
            path="/admin-products"
            element={
              <ProtectedAdminRoute>
                <AdminDashboardProducts />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin-events"
            element={
              <ProtectedAdminRoute>
                <AdminDashboardEvents />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin-categories"
            element={
              <ProtectedAdminRoute>
                <AdminDashboardCategories />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin-brands"
            element={
              <ProtectedAdminRoute>
                <AdminDashboardBrands />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin-coupons"
            element={
              <ProtectedAdminRoute>
                <AdminDashboardCoupons />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin-products-analytics"
            element={
              <ProtectedAdminRoute>
                <AdminDashboardProductsAnalytics />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin-events-analytics"
            element={
              <ProtectedAdminRoute>
                <AdminDashboardEventsAnalytics />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin-users-analytics"
            element={
              <ProtectedAdminRoute>
                <AdminDashboardUsersAnalytics />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin-sellers-analytics"
            element={
              <ProtectedAdminRoute>
                <AdminDashboardSellersAnalytics />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin-orders-analytics"
            element={
              <ProtectedAdminRoute>
                <AdminDashboardOrdersAnalytics />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin-coupons-analytics"
            element={
              <ProtectedAdminRoute>
                <AdminDashboardCouponsAnalytics />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin-withdraw-analytics"
            element={
              <ProtectedAdminRoute>
                <AdminDashboardWithdrawAnalytics />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin-edit-faq"
            element={
              <ProtectedAdminRoute>
                <AdminDashboardEditFaq />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin-edit-hero"
            element={
              <ProtectedAdminRoute>
                <AdminDashboardEditHero />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin-withdraw-request"
            element={
              <ProtectedAdminRoute>
                <AdminDashboardWithdraw />
              </ProtectedAdminRoute>
            }
          />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
