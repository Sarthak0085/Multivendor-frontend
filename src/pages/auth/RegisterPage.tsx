import Register from "../../components/Auth/Register";

const RegisterPage = () => {
  return (
    <div
      style={{
        backgroundImage: `url(bg.jpg)`,
      }}
      className="relative bg-cover bg-no-repeat bg-center h-[100vh] flex flex-col justify-center py-12 sm:px lg:px-8"
    >
      <div className="mt-8 mx-2 500px:mx-auto 500px:w-full 500px:max-w-md">
        <Register />
      </div>
    </div>
  );
};

export default RegisterPage;
