import { lazy } from "react";

const AddressPage = lazy(() => import("../pages/user/AddressPage"));
const AllOrdersPage = lazy(() => import("../pages/user/AllOrderPage"));
const AllRefundOrdersPage = lazy(() => import("../pages/user/AllRefundOrdersPage"));
const ChangePasswordPage = lazy(() => import("../pages/user/ChangePasswordPage"));
const ProfilePage = lazy(() => import("../pages/user/ProfilePage"));
const CheckoutPage = lazy(() => import("../pages/CheckoutPage"));
const OrderSuccessPage = lazy(() => import("../pages/OrderSuccessPage"));
const PaymentPage = lazy(() => import("../pages/PaymentPage"));
const OrderDetailsPage = lazy(() => import("../pages/user/OrderDetailsPage"));
const TrackOrderPage = lazy(() => import("../pages/user/TrackOrderPage"));

export {
    AddressPage,
    AllOrdersPage,
    AllRefundOrdersPage,
    ChangePasswordPage,
    ProfilePage,
    CheckoutPage,
    OrderDetailsPage,
    OrderSuccessPage,
    PaymentPage,
    TrackOrderPage,
};
