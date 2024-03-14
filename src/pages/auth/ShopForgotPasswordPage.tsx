import ShopForgotPassword from "../../components/Shop/Auth/ShopForgotPassword";

const ShopForgotPasswordPage = () => {
  return (
    <div
      style={{
        backgroundImage: `url(bg.jpg)`,
      }}
      className="relative bg-cover bg-no-repeat bg-center h-screen flex flex-col justify-center py-12 sm:px lg:px-8"
    >
      <div className="mt-8 mx-2 500px:mx-auto 500px:w-full 500px:max-w-md">
        <ShopForgotPassword />
      </div>
    </div>
  );
};

export default ShopForgotPasswordPage;
