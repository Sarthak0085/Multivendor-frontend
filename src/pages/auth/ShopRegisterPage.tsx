import ShopRegister from "../../components/Shop/Auth/ShopRegister";

const ShopRegisterPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <ShopRegister />
      </div>
    </div>
  );
};

export default ShopRegisterPage;
