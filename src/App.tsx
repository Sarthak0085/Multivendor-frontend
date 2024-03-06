import { Route, Routes } from "react-router-dom";
import Register from "./components/Auth/Register";
import ActivationPage from "./pages/ActivationPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import ProductsPage from "./pages/ProductsPage";
import ShopLoginPage from "./pages/auth/ShopLoginPage";
import ShopRegisterPage from "./pages/auth/ShopRegisterPage";
import ShopForgotPasswordPage from "./pages/auth/ShopForgotPasswordPage";
import ShopResetPasswordPage from "./pages/auth/ShopResetPasswordPage";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Suspense, lazy, useEffect, useState } from "react";
const BestSellingPage = lazy(() => import("./pages/BestSellingPage"));
const EventsPage = lazy(() => import("./pages/EventsPage"));
const FAQPage = lazy(() => import("./pages/FaqPage"));
const ProductDetailsPage = lazy(() => import("./pages/ProductDetailsPage"));
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
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
  AdminDashboardOrders,
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
import ProtectedRoute from "./routes/ProtectedRoute";
import SellerProtectedRoute from "./routes/SellerProtectedRoute";
import Loader from "./components/Layout/Loader";
import {
  ShopAllCoupons,
  ShopAllEvents,
  ShopAllOrders,
  ShopAllProducts,
  ShopAllRefunds,
  ShopCreateEvent,
  ShopCreateProduct,
  ShopDashboardPage,
  ShopEditProductPage,
  ShopHomePage,
  ShopOrderDetails,
  ShopActivationPage,
  ShopPreviewPage,
  ShopSettingsPage,
  ShopWithDrawMoneyPage,
} from "./routes/ShopRoutes";
import {
  AddressPage,
  AllOrdersPage,
  AllRefundOrdersPage,
  ChangePasswordPage,
  CheckoutPage,
  OrderDetailsPage,
  OrderSuccessPage,
  PaymentPage,
  ProfilePage,
  TrackOrderPage,
} from "./routes/AuthProtectedRoutes";

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
          <Route
            path="/shop-reset-password"
            element={<ShopResetPasswordPage />}
          />
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
                <ShopCreateEvent />
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
          <Route
            path="/admin-orders"
            element={
              <ProtectedAdminRoute>
                <AdminDashboardOrders />
              </ProtectedAdminRoute>
            }
          />
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
