import ShopRegister from "../../components/Shop/Auth/ShopRegister";

const ShopRegisterPage = () => {
  return (
    <div
      style={{
        backgroundImage: `url(bg.jpg)`,
      }}
      className="relative bg-cover bg-no-repeat bg-center min-h-screen flex flex-col justify-center py-12 sm:px lg:px-8"
    >
      <div className="mt-8 mx-2 500px:mx-auto 500px:w-full 500px:max-w-md">
        <ShopRegister />
      </div>
    </div>
  );
};

export default ShopRegisterPage;
