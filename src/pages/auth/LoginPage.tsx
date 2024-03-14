import Login from "../../components/Auth/Login";

const LoginPage = () => {
  return (
    <div
      style={{
        backgroundImage: `url(bg.jpg)`,
      }}
      className="relative bg-cover bg-no-repeat bg-center h-screen flex flex-col justify-center py-12 sm:px lg:px-8"
    >
      <div className="mt-8 mx-2 500px:mx-auto 500px:w-full 500px:max-w-md">
        <Login />
      </div>
    </div>
  );
};

export default LoginPage;
