import ShopResetPassword from "../../components/Shop/Auth/ShopResetPassword";

const ShopResetPasswordPage = () => {
  return (
    <div
      style={{
        backgroundImage: `url(bg.jpg)`,
      }}
      className="relative bg-cover bg-no-repeat bg-center h-[100vh] flex flex-col justify-center py-12 sm:px lg:px-8"
    >
      <div className="mt-8 mx-2 500px:mx-auto 500px:w-full 500px:max-w-xl">
        <div className="bg-blue-50 bg-opacity-60 backdrop-blur-lg py-8 px-4 shadow-md sm:rounded-lg sm:px-10">
          <ShopResetPassword />
        </div>
      </div>
    </div>
  );
};

export default ShopResetPasswordPage;
