import ShopResetPassword from "../../components/Shop/Auth/ShopResetPassword";

const ShopResetPasswordPage = () => {
  return (
    <div className="w-full relative">
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 mx-2">
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
          <div className="bg-blue-50 py-8 px-4 shadow-md sm:rounded-lg sm:px-10">
            <ShopResetPassword />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopResetPasswordPage;
