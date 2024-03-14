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
import { useCreateEventMutation } from "../../redux/features/events/eventApi";
import {
  setErrorOptions,
  setLoadingOptions,
  setSuccessOptions,
} from "../options";
import toast from "react-hot-toast";
import {
  MdDriveFileRenameOutline,
  MdOutlineCategory,
  MdOutlineDescription,
} from "react-icons/md";
import Select from "../shared/Select";
import Input from "../shared/Input";
import { BsTags } from "react-icons/bs";
import { LiaMoneyBillWaveAltSolid } from "react-icons/lia";
import { SlSocialDropbox } from "react-icons/sl";

const CreateEvent = () => {
  const { seller } = useSelector((state: any) => state.auth);
  console.log(seller);

  const [images, setImages] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProductData>({
    resolver: zodResolver(productSchema),
  });

  const navigate = useNavigate();

  const [create, { isSuccess, error, isLoading }] = useCreateEventMutation();

  useEffect(() => {
    if (isLoading) {
      toast.loading("Creating new Event. Please Wait....", {
        style: setLoadingOptions,
      });
    }
    if (isSuccess) {
      toast.success("Event Created Successfully", {
        style: setSuccessOptions,
      });
      navigate("/dashboard-events");
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

  const handleStartDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const startDate = new Date(e.target.value);
    const minEndDate = new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000);
    setStartDate(startDate);
    setEndDate(null);
    const endDateInput = document.getElementById(
      "end-date"
    ) as HTMLInputElement;

    if (endDateInput) {
      endDateInput.min = minEndDate.toISOString().slice(0, 10);
    }
  };

  const handleEndDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const endDate = new Date(e.target.value);
    setEndDate(endDate);
  };

  const today = new Date().toISOString().slice(0, 10);

  const minEndDate = startDate
    ? new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10)
    : "";

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

  const onSubmit: SubmitHandler<CreateProductData> = async (data) => {
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
      shopId: seller?._id,
      images,
      colors,
      brand,
      startDate,
      endDate,
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
        shopId: seller?._id,
        images: images,
        colors,
        start_Date: startDate,
        finish_Date: endDate,
        brand,
      });
      // Handle successful registration response
      console.log(response);
    } catch (error) {
      console.log(error);
    }

    //   const newForm = new FormData();

    // images.forEach((image) => {
    //   newForm.set("images", image);
    // });
    // newForm.append("name", data.name);
    // newForm.append("description", description);
    // newForm.append("category", category);
    // newForm.append("tags", tags);
    // newForm.append("originalPrice", originalPrice);
    // newForm.append("discountPrice", discountPrice);
    // newForm.append("stock", stock);
    // newForm.append("shopId", seller._id);

    // const newForm = new FormData();

    // images.forEach((image) => {
    //   newForm.set("images", image);
    // });
    // newForm.append("name", name);
    // newForm.append("description", description);
    // newForm.append("category", category);
    // newForm.append("tags", tags);
    // newForm.append("originalPrice", originalPrice);
    // newForm.append("discountPrice", discountPrice);
    // newForm.append("stock", stock);
    // newForm.append("shopId", seller._id);
    // dispatch(
    //   createProduct({
    //     name,
    //     description,
    //     category,
    //     tags,
    //     originalPrice,
    //     discountPrice,
    //     stock,
    //     shopId: seller._id,
    //     images,
    //   })
    // );
  };

  return (
    <div className="w-[90%] 800px:w-[50%] bg-slate-50 border border-blue-200 shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
      <h5 className="text-[30px] font-Poppins text-center">Create Event</h5>
      {/* create product form */}
      <form onSubmit={handleSubmit(onSubmit)}>
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
            required
            rows={8}
            {...register("description")}
            className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter your product description..."
          ></textarea>
          {errors.description && (
            <span className="text-red-500">{errors.description.message}</span>
          )}
        </div>

        <div>
          <label className="block text-sm sm:text-[16px] lg:text-[18px] font-medium text-gray-700">
            Product Description <span className="text-red-500">*</span>
          </label>
          <div className="mt-1 relative">
            <textarea
              placeholder="Enter your product description..."
              {...register("description")}
              rows={8}
              cols={10}
              className="appearance-none block w-full px-10 py-2 border border-gray-300 rounded-md shadow-sm 
              placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-[16px] lg:text-[18px] text-sm"
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

        <Input
          label="Tags"
          type="text"
          placeholder="Enter your product Tags..."
          register={register}
          errors={errors}
          Icon={BsTags}
          required={true}
          name="tags"
        />

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

        <div>
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
        </div>
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
            className="w-full mt-2 border h-[35px] rounded-[5px] flex-grow"
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
        <div>
          <label className="pb-2">
            Event Start Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="price"
            id="start-date"
            value={startDate ? startDate.toISOString().slice(0, 10) : ""}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={handleStartDateChange}
            min={today}
            placeholder="Enter your event product stock..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Event End Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="price"
            id="start-date"
            value={endDate ? endDate.toISOString().slice(0, 10) : ""}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={handleEndDateChange}
            min={minEndDate}
            placeholder="Enter your event product stock..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Upload Images <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            name=""
            id="upload"
            className="hidden"
            multiple
            onChange={handleImageChange}
          />
          {/* {errors.images && <span className="text-red-500">{errors.images.message}</span>} */}
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
          <br />
          <div>
            <button
              type="submit"
              disabled={isLoading}
              aria-disabled={isLoading}
              className={`group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent
               sm:text-[16px] text-sm lg:text-[18px] font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 ${
                 isLoading && "cursor-not-allowed"
               }`}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;
