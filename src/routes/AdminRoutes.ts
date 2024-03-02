import React from "react";

const AdminDashboardPage = React.lazy(() => import("../pages/admin/AdminDashboardPage"));
const AdminDashboardUsers = React.lazy(() => import("../pages/admin/AdminDashboardUsers"));
const AdminDashboardSellers = React.lazy(() => import("../pages/admin/AdminDashboardSellers"));
// const AdminDashboardOrders = React.lazy(() => import("../pages/admin/AdminDashboardOrders"));
const AdminDashboardProducts = React.lazy(() => import("../pages/admin/AdminDashboardProducts"));
const AdminDashboardEvents = React.lazy(() => import("../pages/admin/AdminDashboardEvents"));
const AdminDashboardWithdraw = React.lazy(() => import("../pages/admin/AdminDashboardWithdraw"));
const AdminDashboardCategories = React.lazy(() => import("../pages/admin/AdminDashboardCategory"));
const AdminDashboardBrands = React.lazy(() => import("../pages/admin/AdminDashboardBrands"));
const AdminDashboardProductsAnalytics = React.lazy(() => import("../pages/admin/analytics/AdminDashboardProductsAnalytics"));
const AdminDashboardEventsAnalytics = React.lazy(() => import("../pages/admin/analytics/AdminDashboardEventsAnalytics"));
const AdminDashboardCouponsAnalytics = React.lazy(() => import("../pages/admin/analytics/AdminDashboardCouponsAnalytics"));
const AdminDashboardOrdersAnalytics = React.lazy(() => import("../pages/admin/analytics/AdminDashboardOrdersAnalytics"));
const AdminDashboardSellersAnalytics = React.lazy(() => import("../pages/admin/analytics/AdminDashboardSellersAnalytics"));
const AdminDashboardWithdrawAnalytics = React.lazy(() => import("../pages/admin/analytics/AdminDashboardWithdrawAnalytics"));
const AdminDashboardUsersAnalytics = React.lazy(() => import("../pages/admin/analytics/AdminDashboardUsersAnalytics"));
const AdminDashboardEditFaq = React.lazy(() => import("../pages/admin/customization/AdminEditFAQ"));
const AdminDashboardEditHero = React.lazy(() => import("../pages/admin/customization/AdminDashboardEditHero"));
const AdminDashboardCoupons = React.lazy(() => import("../pages/admin/AdminDashboardCoupons"));

export {
    AdminDashboardPage,
    AdminDashboardUsers,
    AdminDashboardSellers,
    // AdminDashboardOrders,
    AdminDashboardProducts,
    AdminDashboardEvents,
    AdminDashboardWithdraw,
    AdminDashboardBrands,
    AdminDashboardCategories,
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

