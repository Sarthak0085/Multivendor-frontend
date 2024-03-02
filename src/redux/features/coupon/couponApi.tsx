import { apiSlice } from "../api/apiSlice";

export const couponApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCoupon: builder.mutation({
      query: (data) => ({
        url: "/coupon/create-coupon",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),
    updateCoupon: builder.mutation({
      query: (data) => ({
        url: "/coupon/update-coupon",
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
    }),
    getAllShopCoupon: builder.query({
      query: (ShopId) => ({
        url: `/coupon/get-shop-coupon/${ShopId}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getCouponById: builder.query({
      query: (couponId) => ({
        url: `/coupon/get-coupon/${couponId}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getCouponValue: builder.query({
      query: (name) => ({
        url: `/coupon/get-coupon-value/${name}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    deleteShopCoupon: builder.mutation({
      query: (couponId) => ({
        url: `/coupon/delete-coupon/${couponId}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
    adminGetAllCoupons: builder.query({
      query: () => ({
        url: "/coupon/admin-all-coupons",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    adminDeleteCoupon: builder.mutation({
      query: (couponId) => ({
        url: `/coupon/admin-delete-coupon/${couponId}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useCreateCouponMutation,
  useGetAllShopCouponQuery,
  useGetCouponValueQuery,
  useAdminDeleteCouponMutation,
  useAdminGetAllCouponsQuery,
  useGetCouponByIdQuery,
  useDeleteShopCouponMutation,
  useUpdateCouponMutation,
} = couponApi;
