import { lazy } from "react";

const AdminDashboardPage = lazy(() => import("../pages/admin/AdminDashboardPage"));
const AdminDashboardUsers = lazy(() => import("../pages/admin/AdminDashboardUsers"));
const AdminDashboardSellers = lazy(() => import("../pages/admin/AdminDashboardSellers"));
const AdminDashboardOrders = lazy(() => import("../pages/admin/AdminDashboardOrders"));
const AdminDashboardProducts = lazy(() => import("../pages/admin/AdminDashboardProducts"));
const AdminDashboardEvents = lazy(() => import("../pages/admin/AdminDashboardEvents"));
const AdminDashboardWithdraw = lazy(() => import("../pages/admin/AdminDashboardWithdraw"));
const AdminDashboardCategories = lazy(() => import("../pages/admin/AdminDashboardCategory"));
const AdminDashboardColors = lazy(() => import("../pages/admin/AdminDashboardColors"));
const AdminDashboardSizes = lazy(() => import("../pages/admin/AdminDashboardSizes"));
const AdminDashboardBrands = lazy(() => import("../pages/admin/AdminDashboardBrands"));
const AdminDashboardProductsAnalytics = lazy(() => import("../pages/admin/analytics/AdminDashboardProductsAnalytics"));
const AdminDashboardEventsAnalytics = lazy(() => import("../pages/admin/analytics/AdminDashboardEventsAnalytics"));
const AdminDashboardCouponsAnalytics = lazy(() => import("../pages/admin/analytics/AdminDashboardCouponsAnalytics"));
const AdminDashboardOrdersAnalytics = lazy(() => import("../pages/admin/analytics/AdminDashboardOrdersAnalytics"));
const AdminDashboardSellersAnalytics = lazy(() => import("../pages/admin/analytics/AdminDashboardSellersAnalytics"));
const AdminDashboardWithdrawAnalytics = lazy(() => import("../pages/admin/analytics/AdminDashboardWithdrawAnalytics"));
const AdminDashboardUsersAnalytics = lazy(() => import("../pages/admin/analytics/AdminDashboardUsersAnalytics"));
const AdminDashboardEditFaq = lazy(() => import("../pages/admin/customization/AdminEditFAQ"));
const AdminDashboardEditHero = lazy(() => import("../pages/admin/customization/AdminDashboardEditHero"));
const AdminDashboardCoupons = lazy(() => import("../pages/admin/AdminDashboardCoupons"));

export {
    AdminDashboardPage,
    AdminDashboardUsers,
    AdminDashboardSellers,
    AdminDashboardOrders,
    AdminDashboardProducts,
    AdminDashboardEvents,
    AdminDashboardWithdraw,
    AdminDashboardBrands,
    AdminDashboardCategories,
    AdminDashboardColors,
    AdminDashboardSizes,
    AdminDashboardProductsAnalytics,
    AdminDashboardEventsAnalytics,
    AdminDashboardCouponsAnalytics,
    AdminDashboardOrdersAnalytics,
    AdminDashboardSellersAnalytics,
    AdminDashboardUsersAnalytics,
    AdminDashboardWithdrawAnalytics,
    AdminDashboardCoupons,
    AdminDashboardEditFaq,
    AdminDashboardEditHero
};

