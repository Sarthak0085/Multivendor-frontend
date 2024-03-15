import { apiSlice } from "../api/apiSlice";

export const productApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createProduct: builder.mutation({
            query: (data) => ({
                url: "/product/create",
                method: "POST",
                body: data,
                credentials: "include" as const,
            })
        }),
        getAllShopProducts: builder.query({
            query: (id) => ({
                url: `/product/get-all-products-shop/${id}`,
                method: "GET",
                credentials: "include" as const,
            })
        }),
        getProductById: builder.query({
            query: (productId) => ({
                url: `/product/get-product/${productId}`,
                method: "GET",
                credentials: "include" as const,
            })
        }),
        getAllProducts: builder.query({
            query: (queryParams) => {
                return {
                    url: `/product/get-all?${new URLSearchParams(queryParams).toString()}`,
                    method: "GET",
                    credentials: "include" as const,
                }
            }
        }),
        createNewReview: builder.mutation({
            query: () => ({
                url: `/product/create-new-review`,
                method: "PUT",
                credentials: "include" as const,
            })
        }),
        updateProduct: builder.mutation({
            query: (data) => ({
                url: `/product/update`,
                method: "PUT",
                body: data,
                credentials: "include" as const,
            })
        }),
        deleteShopProduct: builder.mutation({
            query: (id) => ({
                url: `/ product/delete-shop-product/${id}`,
                method: "DELETE",
                credentials: "include" as const,
            })
        }),
        adminGetAllProducts: builder.query({
            query: () => ({
                url: "/product/admin-get-all",
                method: "GET",
                credentials: "include" as const,
            })
        }),
        adminDeleteProductById: builder.mutation({
            query: (id) => ({
                url: `/ product/admin-delete/${id}`,
                method: "DELETE",
                credentials: "include" as const,
            })
        }),
    })
});

export const { useCreateProductMutation, useGetProductByIdQuery, useAdminDeleteProductByIdMutation, useAdminGetAllProductsQuery, useCreateNewReviewMutation, useDeleteShopProductMutation, useGetAllProductsQuery, useGetAllShopProductsQuery, useUpdateProductMutation } = productApi;