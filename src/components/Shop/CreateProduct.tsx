import { ChangeEvent, useEffect, useRef, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  CreateProductData,
  productSchema,
} from "../../validations/CreateProductValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector } from "react-redux";
import { useCreateProductMutation } from "../../redux/features/product/productApi";
import toast from "react-hot-toast";
import {
  setErrorOptions,
  setLoadingOptions,
  setSuccessOptions,
} from "../options";
import {
  MdDriveFileRenameOutline,
  MdOutlineCategory,
  MdOutlineDescription,
} from "react-icons/md";
import Input from "../shared/Input";
import { LiaMoneyBillWaveAltSolid } from "react-icons/lia";
import { SlSocialDropbox } from "react-icons/sl";
import { PiGenderNeuter } from "react-icons/pi";
import { BsTags } from "react-icons/bs";
import Select from "../shared/Select";
import { useGetAllCategoryQuery } from "../../redux/features/category/categoryApi";
import { useGetAllBrandQuery } from "../../redux/features/brand/brandApi";
import MultiSelect from "../shared/MultiSelect";
import { IoMdColorFilter } from "react-icons/io";
import { useGetAllColorQuery } from "../../redux/features/color/colorApi";
import { SiZendesk } from "react-icons/si";
import { useGetAllSizeQuery } from "../../redux/features/size/sizeApi";
import { genderData } from "../../static/data";

const CreateProduct = () => {
  const { seller } = useSelector((state: any) => state?.auth);
  const [open, setOpen] = useState(false);
  const [select, setSelect] = useState(false);

  const navigate = useNavigate();

  const [images, setImages] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CreateProductData>({
    resolver: zodResolver(productSchema),
  });

  const [create, { isSuccess, error, isLoading }] = useCreateProductMutation();
  const { data } = useGetAllCategoryQuery({});
  const { data: brandData } = useGetAllBrandQuery({});
  const { data: colorData } = useGetAllColorQuery({});
  const { data: sizeData } = useGetAllSizeQuery({});

  const [selectedColorOptions, setSelectedColorOptions] = useState<string[]>(
    []
  );
  const [selectedSizeOptions, setSelectedSizeOptions] = useState<string[]>([]);

  useEffect(() => {
    setValue("colors", selectedColorOptions);
    setValue("sizes", selectedSizeOptions);
  }, [selectedColorOptions, setValue, selectedSizeOptions]);

  const toggleColorSelect = (value: string) => {
    if (selectedColorOptions.includes(value)) {
      setSelectedColorOptions(
        selectedColorOptions.filter((option) => option !== value)
      );
    } else {
      setSelectedColorOptions([...selectedColorOptions, value]);
    }
  };

  const toggleSizeSelect = (value: string) => {
    if (selectedSizeOptions.includes(value)) {
      setSelectedSizeOptions(
        selectedSizeOptions.filter((option) => option !== value)
      );
    } else {
      setSelectedSizeOptions([...selectedSizeOptions, value]);
    }
  };

  useEffect(() => {
    if (isLoading) {
      toast.loading("Creating new Product. Please Wait....", {
        style: setLoadingOptions,
      });
    }
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
      sizes,
      gender,
    } = data;

    console.log({
      name,
      description,
      category,
      tags,
      originalPrice,
      discountPrice,
      stock,
      sizes,
      gender,
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
        <br />
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
          data={data?.getallCategory}
        />
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
        <br />
        <Select
          name="brand"
          defaultOption="Choose a Brand"
          label="Brand"
          register={register}
          errors={errors}
          Icon={MdOutlineCategory}
          required={true}
          data={brandData?.getallBrand}
        />
        <Select
          name="gender"
          defaultOption="Choose a Gender"
          label="Gender"
          register={register}
          errors={errors}
          Icon={PiGenderNeuter}
          required={true}
          data={genderData}
        />
        <br />

        {/* <Multiselect
          options={brandData?.getallBrand}
          // selectedValues={selectedValue}
          // onSelect={onSelect}
          // onRemove={onRemove}
          displayValue="title"
        /> */}

        <MultiSelect
          register={register}
          errors={errors}
          Icon={IoMdColorFilter}
          required={true}
          open={open}
          setOpen={setOpen}
          selectedOptions={selectedColorOptions}
          toggleSelect={toggleColorSelect}
          defaultValue="Select Colors"
          name="colors"
          label="Colors"
          data={colorData?.getAllColor}
        />

        <br />
        <MultiSelect
          register={register}
          errors={errors}
          Icon={SiZendesk}
          required={true}
          open={select}
          setOpen={setSelect}
          selectedOptions={selectedSizeOptions}
          toggleSelect={toggleSizeSelect}
          defaultValue="Select Sizes"
          name="sizes"
          label="Sizes"
          data={sizeData?.getAllSize}
        />

        {/* <div>
          <label className="pb-2">Colors</label>
          <div
            ref={modalRef}
            className="relative w-full border h-[35px] rounded-[5px] flex-grow text-sm lg:text-[15px] 1300px:text-[18px]"
          >
            <div
              onClick={() => setOpen(!open)}
              className="flex pl-3 h-full items-center justify-start"
            >
              <input
                type="text"
                placeholder="Select..."
                hidden
                {...register("colors")}
              />
              <div className="flex items-center gap-4">
                {selectedOptions.length === 0 ? (
                  <span className="text-gray-400">Select Colors</span>
                ) : (
                  <>
                    {selectedOptions.slice(0, 3).map((option) => (
                      <span
                        key={option}
                        className="bg-blue-200 rounded-[5px] text-black flex px-[10px] gap-2 py-[3px]"
                        onClick={() => toggleSelect(option)}
                      >
                        {option}
                        <span>&times;</span>
                      </span>
                    ))}
                    {selectedOptions.length > 3 && (
                      <span className="bg-blue-200 rounded-[5px] text-black flex px-[10px] gap-2 py-[3px]">
                        +{selectedOptions.length - 3} more
                      </span>
                    )}
                  </>
                )}
              </div>
            </div>
            {open && (
              <div className="absolute w-[100%] bg-white max-h-[225px] border border-solid border-t-0 overflow-y-auto z-1">
                {brandData?.getallBrand.map((item, index) => (
                  <div
                    className={`p-[10px] border flex gap-4 hover:bg-blue-200 cursor-pointer ${
                      selectedOptions.includes(item.title) && "bg-blue-200"
                    }`}
                    data-value={item.title}
                    onClick={() => toggleSelect(item.title)}
                  >
                    <img
                      src={item.image.url}
                      alt={item.title}
                      className={"w-[25px] h-[20px] rounded object-cover"}
                    />
                    <span>{item.title}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          {errors.colors && (
            <span className="text-red-500">
              At least one color must be selected
            </span>
          )}
        </div> */}

        {/* <div>
          <label className="pb-2">Colors</label>
          <select
            className="w-full mt-2 border h-[35px] rounded-[5px] flex-grow text-sm lg:text-[15px] 1300px:text-[18px]"
            {...register("colors", { required: true })}
          >
            <option value="red">Red</option>
            <option value="blue">Blue</option>
            <option value="green">Green</option>
            <option value="yellow">Yellow</option>
          </select>
          {errors.colors && (
            <span className="text-red-500">
              At least one color must be selected
            </span>
          )}
        </div> */}
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
                  alt={i}
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
