import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";
import { categoriesData } from "../../static/data";
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

const Header = ({ activeHeading }: { activeHeading?: number }) => {
  // const { isAuthenticated, user } = useSelector((state) => state.user);
  const { user, seller } = useSelector((state: any) => state?.auth);
  // const { isSeller } = useSelector((state) => state.seller);
  // const { wishlist } = useSelector((state) => state.wishlist);
  // const { cart } = useSelector((state) => state.cart);
  // const { allProducts } = useSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState<string | null>("");
  const [searchData, setSearchData] = useState<IProduct[] | null>(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [open, setOpen] = useState(false);

  const { data: cartData, isLoading } = useGetCartQuery(user?._id, {});
  const { data: wishlistData, isLoading: wishlistLoading } =
    useGetWishlistQuery(user?._id, {
      refetchOnMountOrArgChange: true,
    });
  const { data: productData, isLoading: productsLoading } =
    useGetAllProductsQuery({});

  const handleSearchChange = (e) => {
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

  console.log(cartData?.cart?.products);

  const modalRef = useRef(null);
  useClickOutside(modalRef, () => setSearchData(null));

  return (
    <>
      <div className={`${styles.section}`}>
        <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between">
          <div>
            <Link to="/">
              <img
                src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                alt=""
              />
            </Link>
          </div>
          {/* search box */}
          <div className="w-[50%] relative">
            <input
              type="text"
              placeholder="Search Product..."
              value={searchTerm}
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
                      <Link key={index} to={`/product/${i._id}`}>
                        <div
                          ref={modalRef}
                          className="w-full flex items-start-py-3"
                        >
                          <img
                            src={`${i.images[0]?.url}`}
                            alt=""
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
            {/* <h1 className="text-white flex items-center">
              <IoIosArrowForward className="ml-1" />
            </h1> */}
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
              <BiMenuAltLeft size={30} className="absolute top-4 left-2" />
              <button
                className={`h-[100%] w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-md`}
              >
                All Categories
              </button>
              <IoIosArrowDown
                size={20}
                className="absolute right-2 top-5 cursor-pointer"
                onClick={() => setDropDown(!dropDown)}
              />
              {dropDown ? (
                <DropDown
                  categoriesData={categoriesData}
                  setDropDown={setDropDown}
                />
              ) : null}
            </div>
          </div>
          {/* navitems */}
          <div className={`${styles.noramlFlex}`}>
            <Navbar active={activeHeading} />
          </div>

          <div className="flex">
            <div className={`${styles.noramlFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenWishlist(true)}
              >
                <AiOutlineHeart
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
                  size={30}
                  color="rgb(255 255 255 / 83%)"
                />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  {user ? (cartData ? cartData?.cart?.products.length : 0) : 0}
                </span>
              </div>
            </div>

            <div className={`${styles.noramlFlex}`}>
              <div className="relative cursor-pointer mr-[15px]">
                {user ? (
                  <Link to={`/profile/${user?._id}`}>
                    <img
                      src={`${
                        user.avatar?.url
                          ? user.avatar?.url
                          : "https://res.cloudinary.com/dkzfopuco/image/upload/v1704392874/avatars/fgzkqxku7re8opvf8lsz.png"
                      }`}
                      className="w-[35px] h-[35px] rounded-full"
                      alt=""
                    />
                  </Link>
                ) : (
                  <Link to="/login">
                    <CgProfile size={30} color="rgb(255 255 255 / 83%)" />
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
      w-full h-[60px] bg-[#fff] z-50 top-0 left-0 shadow-sm 800px:hidden`}
      >
        <div className="w-full flex items-center justify-between">
          <div>
            <BiMenuAltLeft
              size={40}
              className="ml-4"
              onClick={() => setOpen(true)}
            />
          </div>
          <div>
            <Link to="/">
              <img
                src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                alt=""
                className="mt-3 cursor-pointer"
              />
            </Link>
          </div>
          <div>
            <div
              className="relative mr-[20px]"
              onClick={() => setOpenCart(true)}
            >
              <AiOutlineShoppingCart size={30} />
              <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
                {user ? cartData?.cart && cartData?.cart.length : 0}
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
            <div className="fixed w-[70%] bg-[#fff] h-screen top-0 left-0 z-10 overflow-y-scroll">
              <div className="w-full justify-between flex pr-3">
                <div>
                  <div
                    className="relative mr-[15px]"
                    onClick={() => {
                      setOpenWishlist(true);
                      setOpen(false);
                    }}
                  >
                    <AiOutlineHeart size={30} className="mt-5 ml-3" />
                    <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
                      {wishlistData?.wishlist && wishlistData?.wishlist.length}
                    </span>
                  </div>
                </div>
                <RxCross1
                  size={30}
                  className="ml-4 mt-5"
                  onClick={() => setOpen(false)}
                />
              </div>

              <div className="my-8 w-[92%] m-auto h-[40px relative]">
                <input
                  type="search"
                  placeholder="Search Product..."
                  className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                {searchData && (
                  <div className="absolute bg-[#fff] z-10 shadow w-full left-0 p-3">
                    {searchData.map((i) => {
                      const d = i.name;

                      const Product_name = d.replace(/\s+/g, "-");
                      return (
                        <Link to={`/product/${Product_name}`}>
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

              <Navbar active={activeHeading} />
              <div className={`${styles.button} ml-4 !rounded-[4px]`}>
                <Link to="/shop-create">
                  <h1 className="text-[#fff] flex items-center">
                    Become Seller <IoIosArrowForward className="ml-1" />
                  </h1>
                </Link>
              </div>
              <br />
              <br />
              <br />

              <div className="flex w-full justify-center">
                {user ? (
                  <div>
                    <Link to={`/profile/${user?._id}`}>
                      <img
                        src={`${
                          user.avatar?.url
                            ? user.avatar?.url
                            : "https://res.cloudinary.com/dkzfopuco/image/upload/v1704392874/avatars/fgzkqxku7re8opvf8lsz.png"
                        }`}
                        alt=""
                        className="w-[60px] h-[60px] rounded-full border-[3px] border-[#0eae88]"
                      />
                    </Link>
                  </div>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="text-[18px] pr-[10px] text-[#000000b7]"
                    >
                      Login
                    </Link>
                    <Link
                      to="/sign-up"
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