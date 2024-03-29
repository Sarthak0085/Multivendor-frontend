import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import DropDown from "./DropDown";
import Navbar from "./Navbar";
import { RxCross1 } from "react-icons/rx";
import { useSelector } from "react-redux";
import Cart from "../Cart/Cart";
import { useGetAllProductsQuery } from "../../redux/features/product/productApi";
import { useGetWishlistQuery } from "../../redux/features/wishlist/wishlistApi";
import { IProduct } from "../../types/product";
import { useGetCartQuery } from "../../redux/features/cart/cartApi";
import Wishlist from "../Wishlist/Wishlist";
import useClickOutside from "../../hooks/useClickOutside";
import { useGetAllCategoryQuery } from "../../redux/features/category/categoryApi";

const Header = ({ activeHeading }: { activeHeading?: number }) => {
  const { user, seller } = useSelector((state: any) => state?.auth);
  const [searchTerm, setSearchTerm] = useState<string | null>("");
  const [searchData, setSearchData] = useState<IProduct[] | null>(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [open, setOpen] = useState(false);

  const { data } = useGetAllCategoryQuery({});

  const { data: cartData } = useGetCartQuery(user?._id, {});
  const { data: wishlistData } = useGetWishlistQuery(user?._id, {
    refetchOnMountOrArgChange: true,
  });
  const { data: productData } = useGetAllProductsQuery({});

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    console.log(term);
    setSearchTerm(term);

    if (term.trim() === null) {
      setSearchData(null);
    } else {
      const filteredProducts =
        productData?.products &&
        productData?.products.filter((product: IProduct) =>
          product.name.toLowerCase().includes(term.toLowerCase())
        );
      console.log(filteredProducts);
      setSearchData(filteredProducts);
    }
  };

  useEffect(() => {
    const handleClickOutside = () => {
      setSearchTerm(null);
    };

    window.addEventListener("onClick", handleClickOutside);

    return () => window.removeEventListener("onClick", handleClickOutside);
  }, []);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  // console.log(cartData?.cart?.products);

  const modalRef = useRef(null);
  useClickOutside(modalRef, () => setSearchData(null));

  const anotherModalRef = useRef(null);
  useClickOutside(anotherModalRef, () => setOpen(false));

  return (
    <>
      <div className={`${styles.section}`}>
        <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between">
          <div>
            <Link to="/" title="Home" aria-label="Home">
              <img
                src="https://res.cloudinary.com/dkzfopuco/image/upload/v1709903777/Trend_Flex__1_-removebg-preview_era9ij.svg"
                alt="logo"
                width={110}
                height={100}
              />
            </Link>
          </div>
          {/* search box */}
          <div className="w-[50%] relative">
            <input
              type="text"
              placeholder="Search Product..."
              id="Search"
              name="Search"
              value={searchTerm as any}
              onChange={handleSearchChange}
              className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
            />
            <AiOutlineSearch
              size={30}
              className="absolute right-2 top-1.5 cursor-pointer"
            />
            {searchData && searchData.length !== 0 ? (
              <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
                {searchData &&
                  searchData.map((i, index) => {
                    return (
                      <Link
                        key={index}
                        to={`/product/${i._id}`}
                        title="Product Details Page"
                      >
                        <div
                          ref={modalRef}
                          className="w-full flex items-start-py-3"
                        >
                          <img
                            src={`${i.images[0]?.url}`}
                            alt={i.name}
                            className="w-[40px] h-[40px] mr-[10px]"
                          />
                          <h1>{i.name}</h1>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            ) : null}
          </div>

          <div className={`${styles.button}`}>
            <Link to={`${seller ? "/dashboard" : "/shop-create"}`}>
              <h1 className="text-[#fff] flex items-center">
                {seller ? "Go Dashboard" : "Become Seller"}{" "}
                <IoIosArrowForward className="ml-1" />
              </h1>
            </Link>
          </div>
        </div>
      </div>
      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        } transition hidden 800px:flex items-center justify-between w-full bg-slate-700 h-[70px]`}
      >
        <div
          className={`${styles.section} relative ${styles.noramlFlex} justify-between`}
        >
          {/* categories */}
          <div onClick={() => setDropDown(!dropDown)}>
            <div className="relative h-[66px] w-[270px] hidden 1000px:block">
              <BiMenuAltLeft
                title="Category"
                size={30}
                className="absolute top-4 left-2"
              />
              <button
                className={`h-[100%] w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-md`}
              >
                All Categories
              </button>
              <IoIosArrowDown
                title="DropDown"
                size={20}
                className="absolute right-2 top-5 cursor-pointer"
                onClick={() => setDropDown(!dropDown)}
              />
              {dropDown ? (
                <DropDown
                  categoriesData={data?.getallCategory}
                  setDropDown={setDropDown}
                />
              ) : null}
            </div>
          </div>
          {/* navitems */}
          <div className={`${styles.noramlFlex}`}>
            <Navbar
              active={
                activeHeading !== undefined && typeof activeHeading === "number"
                  ? activeHeading
                  : 0
              }
            />
          </div>

          <div className="flex">
            <div className={`${styles.noramlFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenWishlist(true)}
              >
                <AiOutlineHeart
                  aria-label="Wishlist"
                  title="Wishlist"
                  size={30}
                  color="rgb(255 255 255 / 83%)"
                />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  {user
                    ? wishlistData?.wishlist
                      ? wishlistData?.wishlist.products.length
                      : 0
                    : 0}
                </span>
              </div>
            </div>

            <div className={`${styles.noramlFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenCart(true)}
              >
                <AiOutlineShoppingCart
                  aria-label="cart"
                  title="Cart"
                  size={30}
                  color="rgb(255 255 255 / 83%)"
                />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  {user ? (cartData ? cartData?.cart?.products?.length : 0) : 0}
                </span>
              </div>
            </div>

            <div className={`${styles.noramlFlex}`}>
              <div className="relative cursor-pointer mr-[15px]">
                {user ? (
                  <Link
                    to={`/profile/${user?._id}`}
                    title={`${user?.fullName}'s Profile`}
                  >
                    <img
                      src={`${
                        user?.avatar?.url
                          ? user?.avatar?.url
                          : "https://res.cloudinary.com/dkzfopuco/image/upload/v1704392874/avatars/fgzkqxku7re8opvf8lsz.png"
                      }`}
                      className="w-[35px] h-[35px] rounded-full"
                      alt={`${user?.fullName}'s Profile`}
                    />
                  </Link>
                ) : (
                  <Link to="/login" title="Login Page">
                    <CgProfile
                      title="login"
                      aria-label="login"
                      size={30}
                      color="rgb(255 255 255 / 83%)"
                    />
                  </Link>
                )}
              </div>
            </div>

            {/* cart popup  */}
            {openCart ? (
              <Cart userId={user?._id} setOpenCart={setOpenCart} />
            ) : null}

            {/* wishlist popup */}
            {openWishlist ? (
              <Wishlist user={user} setOpenWishlist={setOpenWishlist} />
            ) : null}
          </div>
        </div>
      </div>

      {/* mobile header */}
      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        }
      w-full h-[80px] bg-[#fff] z-50 top-0 left-0 shadow-sm 800px:hidden`}
      >
        <div className="w-full flex items-center justify-between">
          <div>
            <BiMenuAltLeft
              aria-label="Categories"
              title="Categories"
              size={40}
              className="ml-4"
              onClick={() => setOpen(true)}
            />
          </div>
          <div>
            <Link to="/" title="Home" aria-label="Home">
              <img
                src="https://res.cloudinary.com/dkzfopuco/image/upload/v1709903777/Trend_Flex__1_-removebg-preview_era9ij.svg"
                alt="logo"
                width={110}
                height={100}
                className="cursor-pointer"
              />
            </Link>
          </div>
          <div>
            <div
              className="relative mr-[20px]"
              onClick={() => setOpenCart(true)}
            >
              <AiOutlineShoppingCart title="Cart" size={30} />
              <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
                {user ? (cartData ? cartData?.cart?.products.length : 0) : 0}
              </span>
            </div>
          </div>
          {/* cart popup */}
          {openCart ? (
            <Cart userId={user?._id} setOpenCart={setOpenCart} />
          ) : null}

          {/* wishlist popup */}
          {openWishlist ? (
            <Wishlist user={user} setOpenWishlist={setOpenWishlist} />
          ) : null}
        </div>

        {/* header sidebar */}
        {open && (
          <div
            className={`fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0`}
          >
            <div
              ref={anotherModalRef}
              className="fixed w-[70%] bg-[#fff] h-screen top-0 left-0 z-10 overflow-y-scroll"
            >
              <div className="w-full justify-between flex pr-3">
                <div>
                  <div
                    className="relative mr-[15px]"
                    onClick={() => {
                      setOpenWishlist(true);
                      setOpen(false);
                    }}
                  >
                    <AiOutlineHeart
                      title="Wishlist"
                      size={30}
                      className="mt-5 ml-3"
                    />
                    <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
                      {wishlistData?.wishlist
                        ? wishlistData?.wishlist?.products?.length
                        : 0}
                    </span>
                  </div>
                </div>
                <RxCross1
                  title="Close"
                  size={30}
                  className="ml-4 mt-5"
                  onClick={() => setOpen(false)}
                />
              </div>

              <div className="my-8 w-[92%] m-auto h-[40px relative]">
                <input
                  type="search"
                  id="Search"
                  name="Search"
                  placeholder="Search Product..."
                  className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
                  value={searchTerm as any}
                  onChange={handleSearchChange}
                />
                {searchData && (
                  <div className="absolute bg-[#fff] z-10 shadow w-full left-0 p-3">
                    {searchData.map((i) => {
                      const d = i.name;
                      return (
                        <Link
                          to={`/product/${i?._id}`}
                          title="Product Details Page"
                          aria-label="Product Details Page"
                        >
                          <div className="flex items-center justify-between py-2 border-b border-gray-200">
                            <img
                              src={i.images[0]?.url}
                              alt={d}
                              className="w-[30px] h-[30px] mr-2"
                            />
                            <h5 className="text-[12px]">{d}</h5>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              <Navbar
                active={
                  activeHeading !== undefined &&
                  typeof activeHeading === "number"
                    ? activeHeading
                    : 0
                }
              />
              <div className={`${styles.button} ml-4 !rounded-[4px]`}>
                <Link
                  to="/shop-create"
                  title={seller ? "Go Dashboard" : "Become Seller"}
                  aria-label={seller ? "Go Dashboard" : "Become Seller"}
                >
                  <h1 className="text-[#fff] flex items-center">
                    {seller ? "Go Dashboard" : "Become Seller"}{" "}
                    <IoIosArrowForward
                      title="Shop Create Page"
                      aria-label="Shop Create Page"
                      className="ml-1"
                    />
                  </h1>
                </Link>
              </div>
              <br />
              <br />
              <br />

              <div className="flex w-full justify-center">
                {user ? (
                  <div>
                    <Link
                      to={`/profile/${user?._id}`}
                      title={`${user.fullName}'s Profile`}
                      aria-label={`${user.fullName}'s Profile`}
                    >
                      <img
                        src={`${
                          user.avatar?.url
                            ? user.avatar?.url
                            : "https://res.cloudinary.com/dkzfopuco/image/upload/v1704392874/avatars/fgzkqxku7re8opvf8lsz.png"
                        }`}
                        alt={user?.fullName}
                        className="w-[60px] h-[60px] rounded-full border-[3px] border-[#0eae88]"
                      />
                    </Link>
                  </div>
                ) : (
                  <>
                    <Link
                      to="/login"
                      title="login"
                      aria-label="login"
                      className="text-[18px] pr-[10px] text-[#000000b7]"
                    >
                      Login /
                    </Link>
                    <Link
                      to="/sign-up"
                      aria-label="sign Up or register"
                      title="Sign Up or Register"
                      className="text-[18px] text-[#000000b7]"
                    >
                      Sign up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
