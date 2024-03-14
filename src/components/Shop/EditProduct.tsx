import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetAllShopProductsQuery,
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "../../redux/features/product/productApi";
import { categoriesData } from "../../static/data";
import {
  CreateProductData,
  productSchema,
} from "../../validations/CreateProductValidation";
import Loader from "../Layout/Loader";
import {
  setErrorOptions,
  setLoadingOptions,
  setSuccessOptions,
} from "../options";

const EditProduct = () => {
  const { seller } = useSelector((state: any) => state?.auth);

  const { productId } = useParams();
  console.log(productId);

  const navigate = useNavigate();

  const [images, setImages] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateProductData>({
    resolver: zodResolver(productSchema),
  });

  const { refetch } = useGetAllShopProductsQuery(seller?._id, {
    refetchOnMountOrArgChange: true,
  });

  const {
    data,
    isLoading,
    refetch: productRefetch,
  } = useGetProductByIdQuery(productId, { refetchOnMountOrArgChange: true });

  console.log("data: ", data);

  useEffect(() => {
    if (productId !== null || productId !== "") {
      setValue("brand", data?.product?.brand);
      setValue("category", data?.product?.category);
      setValue("colors", data?.product?.colors[0]);
      setValue("description", data?.product?.description);
      setValue("discountPrice", data?.product?.discountPrice);
      setValue("name", data?.product?.name);
      setValue("originalPrice", data?.product?.originalPrice);
      setValue("stock", data?.product?.stock);
      setValue("tags", data?.product?.tags);
      setImages(data?.product?.images.map((image: any) => image?.url));
    }
  }, [productId, data?.product, setValue]);

  const [update, { isSuccess, error, isLoading: updateLoading }] =
    useUpdateProductMutation();

  useEffect(() => {
    if (isLoading) {
      toast.loading("Updating Product. Please Wait....", {
        style: setLoadingOptions,
      });
    }
    if (isSuccess) {
      toast.success("Product Updated Successfully", {
        style: setSuccessOptions,
      });
      refetch();
      productRefetch();
      navigate("/dashboard-products");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error;
        toast.error((errorData?.data as Error)?.message, {
          style: setErrorOptions,
        });
      } else {
        toast.error("An error occured", {
          style: setErrorOptions,
        });
      }
    }
  }, [isSuccess, error, navigate, isLoading]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files as FileList);

    setImages([]);

    files.forEach((file: File) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2 && reader.result) {
          setImages((oldImages) => [...oldImages, reader.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const updateProductHandler: SubmitHandler<CreateProductData> = async (
    data
  ) => {
    const {
      name,
      description,
      category,
      tags,
      stock,
      originalPrice,
      discountPrice,
      colors,
      brand,
    } = data;

    console.log({
      name,
      description,
      category,
      tags,
      originalPrice,
      discountPrice,
      stock,
      shopId: seller._id,
      images: images,
      colors,
      brand,
    });

    try {
      const response = await update({
        productId,
        name,
        description,
        category,
        tags,
        originalPrice,
        discountPrice,
        stock,
        shopId: seller._id,
        images: images,
        colors,
        brand,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className="w-[90%] 800px:w-[50%] bg-white border border-blue-200 shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
      <h5 className="text-[30px] font-Poppins text-center">Update Product</h5>
      {/* create product form */}
      <form onSubmit={handleSubmit(updateProductHandler)}>
        <br />
        <div>
          <label className="pb-2">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register("name")}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter your product name..."
          />
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}
        </div>
        <br />
        <div>
          <label className="pb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            cols={30}
            rows={8}
            {...register("description")}
            className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter your product description..."
          ></textarea>
          {errors.description && (
            <span className="text-red-500">{errors.description.message}</span>
          )}
        </div>
        <br />
        <div>
          <label className="pb-2">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full mt-2 border h-[35px] rounded-[5px]"
            {...register("category")}
          >
            <option value="Choose a category">Choose a category</option>
            {categoriesData &&
              categoriesData.map((i) => (
                <option value={i.title} key={i.title}>
                  {i.title}
                </option>
              ))}
          </select>
          {errors.category && (
            <span className="text-red-500">{errors.category.message}</span>
          )}
        </div>
        <br />
        <div>
          <label className="pb-2">Tags</label>
          <input
            type="text"
            {...register("tags")}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter your product tags..."
          />
          {errors.tags && (
            <span className="text-red-500">{errors.tags.message}</span>
          )}
        </div>
        <br />
        <div>
          <label className="pb-2">Original Price</label>
          <input
            type="number"
            {...register("originalPrice", { valueAsNumber: true })}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter your product price..."
          />
          {errors.originalPrice && (
            <span className="text-red-500">{errors.originalPrice.message}</span>
          )}
        </div>
        <br />
        <div>
          <label className="pb-2">
            Price (With Discount) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            {...register("discountPrice", { valueAsNumber: true })}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter your product price with discount..."
          />
          {errors.discountPrice && (
            <span className="text-red-500">{errors.discountPrice.message}</span>
          )}
        </div>
        <br />
        <div>
          <label className="pb-2">
            Product Stock <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            {...register("stock", { valueAsNumber: true })}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter your product stock..."
          />
          {errors.stock && (
            <span className="text-red-500">{errors.stock.message}</span>
          )}
        </div>
        <br />
        <div>
          <label className="pb-2">Brand</label>
          <select
            className="w-full mt-2 border h-[35px] rounded-[5px] "
            {...register("brand", { required: true })}
          >
            <option value="">Select a brand</option>
            <option value="brand1">Brand 1</option>
            <option value="brand2">Brand 2</option>
            <option value="brand3">Brand 3</option>
          </select>
          {errors.brand && (
            <span className="text-red-500">{errors.brand.message}</span>
          )}
        </div>
        <br />
        <div>
          <label className="pb-2">Colors</label>
          <select
            className="w-full mt-2 border h-[35px] rounded-[5px] flex-grow"
            {...register("colors", { required: true })}
          >
            <option value="red">Red</option>
            <option value="blue">Blue</option>
            <option value="green">Green</option>
            <option value="yellow">Yellow</option>
          </select>
          {errors.colors && (
            <span className="text-red-500">{errors.colors.message}</span>
          )}
        </div>
        <br />
        <div>
          <label className="pb-2">
            Upload Images <span className="text-red-500">*</span> (Select upto 6
            images)
          </label>
          <input
            type="file"
            id="upload"
            className="hidden"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
          <div className="w-full flex items-center flex-wrap">
            <label htmlFor="upload">
              <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
            </label>
            {images &&
              images.map((i) => (
                <img
                  src={i}
                  key={i}
                  alt=""
                  className="h-[120px] w-[120px] object-cover m-2"
                />
              ))}
          </div>
        </div>
        <br />
        <div className="text-[18px]">
          <button
            type="submit"
            disabled={updateLoading}
            className={`mt-2 text-[18px] border text-center text-blue-500 rounded-sm font-medium 
            hover:bg-blue-400 hover:text-white border-blue-400 w-full ${
              updateLoading && "cursor-not-allowed"
            }`}
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
