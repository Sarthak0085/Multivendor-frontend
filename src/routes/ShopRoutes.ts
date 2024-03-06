import { lazy } from "react";

const ShopAllOrders = lazy(() => import("../pages/shop/ShopAllOrders"));
const ShopAllCoupons = lazy(() => import("../pages/shop/ShopAllCoupons"));
const ShopAllEvents = lazy(() => import("../pages/shop/ShopAllEvents"));
const ShopAllProducts = lazy(() => import("../pages/shop/ShopAllProducts"));
const ShopAllRefunds = lazy(() => import("../pages/shop/ShopAllRefundsPage"));
const ShopCreateEvent = lazy(() => import("../pages/shop/ShopCreateEvent"));
const ShopCreateProduct = lazy(() => import("../pages/shop/ShopCreateProduct"));
const ShopDashboardPage = lazy(() => import("../pages/shop/ShopDashboardPage"));
const ShopEditProductPage = lazy(() => import("../pages/shop/ShopEditProductPage"));
const ShopHomePage = lazy(() => import("../pages/shop/ShopHomePage"));
const ShopOrderDetails = lazy(() => import("../pages/shop/ShopOrderDetails"));
const ShopPreviewPage = lazy(() => import("../pages/shop/ShopPreviewPage"));
const ShopSettingsPage = lazy(() => import("../pages/shop/ShopSettingsPage"));
const ShopWithDrawMoneyPage = lazy(() => import("../pages/shop/ShopWithDrawMoneyPage"));
const ShopActivationPage = lazy(() => import("../pages/shop/ShopActivationPage"));

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
