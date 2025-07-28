import { Link } from "react-router-dom";
import { FcLock } from "react-icons/fc";

const Home = () => {
  return (
    <section className="min-h-screen flex justify-between md:items-center md:justify-center bg-yellow-500 md:bg-gradient-to-r md:from-yellow-500 md:to-white">
      <div className="flex flex-col md:flex-row md:max-w-4xl md:bg-white md:rounded-3xl md:shadow-2xl md:overflow-hidden w-full">
        {/* Left Section (Icon) */}
        <div className="md:w-1/2 md:bg-yellow-500 md:p-10 md:flex md:items-center md:justify-center h-1/2 md:h-auto">
          <div className="p-8 md:p-0 flex items-center justify-center h-full">
            <FcLock className="text-9xl md:text-[12rem] lg:text-[14rem]" />
          </div>
        </div>
        {/* Right Section (Content) */}
        <div className="flex-1 bg-white p-8 rounded-t-4xl md:rounded-t-none md:p-10 md:w-1/2 ">
          <div className="space-y-5 md:space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-bold">Welcome</h1>
              <p className="text-sm md:text-base text-gray-800">
                Discover a seamless and secure way to access your account with our custom authentication system. Designed for simplicity and reliability, our platform ensures your data stays safe while providing a smooth sign-in and sign-up experience tailored to your needs. Join us today and take control of your digital journey with confidence!
              </p>
            </div>
            <div className="flex justify-between space-x-3 md:space-x-4">
              <button className="bg-black text-white px-8 md:px-10 py-4 md:py-4 rounded-full md:rounded-lg shadow-sm md:hover:bg-gray-800 transition-colors">
                <Link to="/login">Sign In</Link>
              </button>
              <button className="bg-white text-black px-8 md:px-10 py-4 md:py-4 rounded-full md:rounded-lg shadow-sm md:hover:bg-gray-100 transition-colors border border-gray-200">
                <Link to="/register">Sign Up</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;