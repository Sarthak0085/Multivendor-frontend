import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { AiOutlineCamera } from "react-icons/ai";
import styles from "../../../styles/styles";
import {
  useEditLayoutMutation,
  useGetHeroLayoutQuery,
} from "../../../redux/features/layout/layoutApi";
import { setLoadingOptions } from "../../options";
import Loader from "../../Layout/Loader";

const EditHero = () => {
  const { data, isLoading, refetch } = useGetHeroLayoutQuery("Banner", {
    refetchOnMountOrArgChange: true,
  });
  // console.log(data);

  const [editLayout, { isSuccess, error, isLoading: updateLoading }] =
    useEditLayoutMutation();
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [image, setImage] = useState<string>();

  useEffect(() => {
    if (data) {
      setTitle(data?.layout?.banner?.title);
      setSubTitle(data?.layout?.banner?.subTitle);
      setImage(data?.layout?.banner?.image?.url);
    }

    if (updateLoading) {
      toast.loading("Updating Hero Section. Hold on a moment...", {
        style: setLoadingOptions,
      });
    }
    if (isSuccess) {
      toast.success("Hero Section updated succesfully");
      refetch();
    }

    if (error) {
      if ("data" in error) {
        const errorData = error?.data as Error;
        toast.error(errorData.message);
      }
    }
  }, [data, isSuccess, error, refetch, updateLoading]);

  const handleUpdate = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImage(reader.result as string);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async () => {
    await editLayout({
      type: "Banner",
      image,
      title,
      subTitle,
    });
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full lg:flex items-center">
          <div className="top-[10px] flex flex-col items-center  lg:top-[50px] xl:h-[700px] lg:h-[600px]  h-[50vh] w-full rounded-full">
            <div className="md:w-[90%] flex items-center justify-center pt-[70px] md:pt-0 z-10">
              <div className="relative flex items-center justify-end">
                <img
                  src={image ? image : ""}
                  alt="Banner Image"
                  className="object-contain dark:bg-transparent lg:max-w-[90%] w-[90%] rounded-full xl:max-w-[85%] z-10"
                />
                <input
                  type="file"
                  id="banner"
                  // value="image/*"
                  onChange={handleUpdate}
                  className="hidden"
                />
                <label
                  htmlFor="banner"
                  className="absolute bottom-0 right-0 z-20"
                >
                  <AiOutlineCamera className="text-black dark:text-white text-[18px] cursor-pointer" />
                </label>
              </div>
            </div>
            <div className="w-[100%] flex flex-col 800px:flex-row mx-3 !text-center lg:!text-left mt-[150px] md:mt-[20px]">
              <textarea
                className="dark:text-white text-black resize-none text-[30px] px-3 w-full lg:text-[60px] xl:text-[70px] font-[600]"
                placeholder="Improve Your Online Learning Experience Better Instantly"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                rows={4}
              />
              <br />
              <textarea
                className="dark:text-[#ffffffe1] text-[#000000ac] font-Josefin font-[600] text-[18px] 1500px:!w-[55%] 1100px:w-[78%] bg-transparent"
                placeholder="Improve Your Online Learning Experience Better Instantly"
                value={subTitle}
                onChange={(e) => setSubTitle(e.target.value)}
              />
              <br />
              <br />
              <div
                className={`${
                  styles.button
                } !w-[100px] !h-[40px] !min-h-[40px] text-black !bg-[#cccccc34
                                ${
                                  data?.layout?.banner?.title !== title ||
                                  data?.layout?.banner?.subTitle !== subTitle ||
                                  data?.layout?.banner?.image.url !== image
                                    ? "cursor-pointer !bg-[#42d383]"
                                    : "cursor-not-allowed"
                                } rounded absolute bottom-12 right-12`}
                onClick={
                  data?.layout?.banner?.title !== title ||
                  data?.layout?.banner?.subTitle !== subTitle ||
                  data?.layout?.banner?.image.url !== image
                    ? handleEdit
                    : () => null
                }
              >
                Save
              </div>
            </div>
          </div>
        </div>
      )}
    </>
    // <div className="w-full flex 400px:flex-col 800px:flex-row items-center justify-center">
    //   <div className="absolute mt-[30px] top-[60px] lg:h-[600px] lg:w-[600px] h-[50vh] w-[50vh] rounded-full">
    //     <div className="md:w-[90%] flex items-center justify-end pt-[70px] md:pt-0 z-10">
    //       <div className="relative flex items-center justify-end">
    //         <input
    //           type="file"
    //           id="banner"
    //           onChange={handleUpdate}
    //           className="hidden"
    //         />
    //         <label htmlFor="banner" className="absolute bottom-0 right-0 z-20">
    //           <AiOutlineCamera className="text-black dark:text-white text-[18px] cursor-pointer" />
    //         </label>
    //         <img
    //           src={image ? image : ""}
    //           alt="Banner Image"
    //           className="object-contain dark:bg-transparent lg:max-w-[90%] w-[90%] rounded-full xl:max-w-[85%] z-10"
    //         />
    //       </div>
    //     </div>
    //     <div className="w-[100%] flex flex-col mx-3 !text-center lg:!text-left mt-[20px]">
    //       <textarea
    //         className="dark:text-white text-black resize-none mb-[10px] text-[30px] px-3 w-full lg:text-[60px] xl:text-[70px] font-[600]"
    //         placeholder="Improve Your Online Learning Experience Better Instantly"
    //         value={title}
    //         onChange={(e) => setTitle(e.target.value)}
    //         rows={3}
    //       />
    //       <textarea
    //         className="dark:text-[#ffffffe1] text-[#000000ac]  p-[5px] mb-[20px] font-Josefin font-[600] text-[18px] bg-transparent"
    //         placeholder="Improve Your Online Learning Experience Better Instantly"
    //         value={subTitle}
    //         rows={5}
    //         onChange={(e) => setSubTitle(e.target.value)}
    //       />
    //       <div
    //         className={`${
    //           styles.button
    //         } !w-[100px] !text-right !h-[40px] !min-h-[40px] dark:text-white text-black !bg-[#cccccc34]
    //                         ${
    //                           data?.layout?.banner?.title !== title ||
    //                           data?.layout?.banner?.subTitle !== subTitle ||
    //                           data?.layout?.banner?.image.url !== image
    //                             ? "cursor-pointer !bg-[#42d383]"
    //                             : "cursor-not-allowed"
    //                         } rounded bottom-0 right-0 self-end`}
    //         onClick={
    //           data?.layout?.banner?.title !== title ||
    //           data?.layout?.banner?.subTitle !== subTitle ||
    //           data?.layout?.banner?.image.url !== image
    //             ? handleEdit
    //             : () => null
    //         }
    //       >
    //         Save
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default EditHero;
