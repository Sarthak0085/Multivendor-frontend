import { lazy } from "react";

const ShopAllOrders = lazy(() => import("../pages/Shop/ShopAllOrders"));
const ShopAllCoupons = lazy(() => import("../pages/Shop/ShopAllCoupons"));
const ShopAllEvents = lazy(() => import("../pages/Shop/ShopAllEvents"));
const ShopAllProducts = lazy(() => import("../pages/Shop/ShopAllProducts"));
const ShopAllRefunds = lazy(() => import("../pages/Shop/ShopAllRefundsPage"));
const ShopCreateEvent = lazy(() => import("../pages/Shop/ShopCreateEvent"));
const ShopCreateProduct = lazy(() => import("../pages/Shop/ShopCreateProduct"));
const ShopDashboardPage = lazy(() => import("../pages/Shop/ShopDashboardPage"));
const ShopEditProductPage = lazy(() => import("../pages/Shop/ShopEditProductPage"));
const ShopHomePage = lazy(() => import("../pages/Shop/ShopHomePage"));
const ShopOrderDetails = lazy(() => import("../pages/Shop/ShopOrderDetails"));
const ShopPreviewPage = lazy(() => import("../pages/Shop/ShopPreviewPage"));
const ShopSettingsPage = lazy(() => import("../pages/Shop/ShopSettingsPage"));
const ShopWithDrawMoneyPage = lazy(() => import("../pages/Shop/ShopWithDrawMoneyPage"));
const ShopActivationPage = lazy(() => import("../pages/auth/ShopActivationPage"));

export {
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
    ShopPreviewPage,
    ShopSettingsPage,
    ShopWithDrawMoneyPage,
    ShopActivationPage,
};
