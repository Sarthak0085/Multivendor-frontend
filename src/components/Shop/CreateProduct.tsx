import { ChangeEvent, useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { categoriesData } from "../../static/data";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  CreateProductData,
  productSchema,
} from "../../validations/CreateProductValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector } from "react-redux";
import { useCreateProductMutation } from "../../redux/features/product/productApi";
import toast from "react-hot-toast";
import { setErrorOptions, setSuccessOptions } from "../options";
import {
  MdDriveFileRenameOutline,
  MdOutlineCategory,
  MdOutlineDescription,
} from "react-icons/md";
import Input from "../shared/Input";
import { LiaMoneyBillWaveAltSolid } from "react-icons/lia";
import { SlSocialDropbox } from "react-icons/sl";
import { BsTags } from "react-icons/bs";
import Select from "../shared/Select";

const CreateProduct = () => {
  const { seller } = useSelector((state: any) => state?.auth);

  const navigate = useNavigate();

  const [images, setImages] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProductData>({
    resolver: zodResolver(productSchema),
  });

  const [create, { isSuccess, error, isLoading }] = useCreateProductMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Product Created Successfully", {
        style: setSuccessOptions,
      });
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
  }, [isSuccess, error, navigate]);

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

  const createProduct: SubmitHandler<CreateProductData> = async (data) => {
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
      const response = await create({
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

  return (
    <div className="w-[90%] 800px:w-[50%] bg-slate-50 border border-blue-200 shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
      <h5 className="text-[30px] font-Poppins text-center">Create Product</h5>
      {/* create product form */}
      <form onSubmit={handleSubmit(createProduct)}>
        <br />

        <Input
          label="Name"
          type="text"
          placeholder="Shop O'Neil"
          register={register}
          errors={errors}
          Icon={MdDriveFileRenameOutline}
          required={true}
          name="name"
        />

        {/* <div>
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
        </div> */}

        <br />

        {/* <div>
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
        <br /> */}

        {/* <div>
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
        </div> */}

        {/* <br /> */}

        {/* <div>
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
        </div> */}

        {/* <br /> */}

        {/* <div>
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
        </div> */}

        <div>
          <label className="block text-sm lg:text-[15px] 1300px:text-[18px] font-medium text-gray-700">
            Product Description <span className="text-red-500">*</span>
          </label>
          <div className="mt-1 relative">
            <textarea
              placeholder="Enter your product description..."
              {...register("description")}
              rows={8}
              cols={10}
              className="appearance-none block w-full px-10 py-2 border border-gray-300 rounded-md shadow-sm 
              placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm lg:text-[15px] 1300px:text-[18px]"
            />
            <MdOutlineDescription
              className="absolute left-2 top-2 cursor-pointer"
              size={20}
            />
          </div>
          {errors.description && (
            <span className="mt-2 text-red-500">
              {errors.description.message}
            </span>
          )}
        </div>

        <br />

        <Select
          name="category"
          defaultOption="Choose a Category"
          label="Category"
          register={register}
          errors={errors}
          Icon={MdOutlineCategory}
          required={true}
          data={categoriesData}
        />

        {/* <div>
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
        </div> */}
        <br />

        <Input
          label="Tags"
          type="text"
          placeholder="Enter your product Tags..."
          register={register}
          errors={errors}
          Icon={BsTags}
          required={false}
          name="tags"
        />

        {/* <div>
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
        </div> */}
        <br />

        <Input
          label="Original Price"
          type="number"
          placeholder="6999"
          register={register}
          errors={errors}
          Icon={LiaMoneyBillWaveAltSolid}
          required={true}
          name="originalPrice"
          valueAsNumber={true}
        />

        {/* <div>
          <label className="pb-2">Original Price</label>
          <input
            type="number"
            {...register("originalPrice", { valueAsNumber: true })}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="5999"
          />
          {errors.originalPrice && (
            <span className="text-red-500">{errors.originalPrice.message}</span>
          )}
        </div> */}

        <br />

        <Input
          label="Price (With Discount)"
          type="number"
          placeholder="1499"
          register={register}
          errors={errors}
          Icon={LiaMoneyBillWaveAltSolid}
          required={true}
          name="discountPrice"
          valueAsNumber={true}
        />

        {/* <div>
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
        </div> */}

        <br />

        <Input
          label="Product Stock"
          type="number"
          placeholder="67"
          register={register}
          errors={errors}
          Icon={SlSocialDropbox}
          required={true}
          name="stock"
          valueAsNumber={true}
        />

        {/* <div>
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
        </div> */}

        <br />

        <div>
          <label className="pb-2">Brand</label>
          <select
            className="w-full mt-2 border h-[35px] rounded-[5px] text-sm lg:text-[15px] 1300px:text-[18px]"
            {...register("brand", { required: true })}
          >
            <option value="">Select a brand</option>
            <option value="brand1">Brand 1</option>
            <option value="brand2">Brand 2</option>
            <option value="brand3">Brand 3</option>
            {/* Add more brand options as needed */}
          </select>
          {errors.brand && (
            <span className="text-red-500">{errors.brand.message}</span>
          )}
        </div>
        <br />
        <div>
          <label className="pb-2">Colors</label>
          <select
            className="w-full mt-2 border h-[35px] rounded-[5px] flex-grow text-sm lg:text-[15px] 1300px:text-[18px]"
            {...register("colors", { required: true })}
          >
            <option value="red">Red</option>
            <option value="blue">Blue</option>
            <option value="green">Green</option>
            <option value="yellow">Yellow</option>
            {/* Add more color options as needed */}
          </select>
          {errors.colors && (
            <span className="text-red-500">
              At least one color must be selected
            </span>
          )}
        </div>

        <br />
        {/* <div>
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
        </div> */}
        {/* <br /> */}
        {/* <div>
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
        <br /> */}
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
        {/* <div className="text-[18px]">
          <button
            type="submit"
            disabled={isLoading}
            className={`mt-2 text-[18px] border text-center text-blue-500 rounded-sm font-medium 
            hover:bg-blue-400 hover:text-white border-blue-400 w-full ${
              isLoading && "cursor-not-allowed"
            }`}
          >
            Create
          </button>
        </div> */}
        <div className="text-[18px]">
          <button
            className={`mt-2 text-[18px] border text-center text-[#3a24db] font-medium 
             hover:text-white border-[#3a24db] w-full p-1 rounded hover:bg-[#3a24db] ${
               isLoading && "cursor-not-allowed"
             }`}
            aria-disabled={isLoading ? true : false}
            disabled={isLoading}
            type="submit"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
