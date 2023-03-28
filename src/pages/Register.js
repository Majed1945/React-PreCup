import registerLogo from "../Assets/Register_Logo.png";
import { Link } from "react-router-dom";
const Register = () => {
  return (
    <div className="grid grid-rows-3 grid-cols-6 w-screen h-screen border-8 border-white lg:overflow-hidden">
      <div className="mx-[10%] my-[2vh] row-span-1 col-span-6 lg:row-span-3 lg:col-span-3 lg:ml-[2vh] ">
        <img className="h-full w-full" src={registerLogo} alt="" />{" "}
      </div>
      <div className="mx-[10%] row-span-2 col-span-6 lg:row-span-3 lg:col-span-3 flex flex-col lg:mx-[20%] lg:mt-[10%] lg:w-full lg:h-full">
        <h2 className="font-medium text-2xl">Wellcome to PreCup,</h2>
        <h2 className="font-medium text-2xl">Please register to continue.</h2>
        <p className="font-lgiht mt-2">
          Already have an account?{" "}
          <span>
            <Link to="/login" className="underline">
              Login
            </Link>
          </span>
        </p>
        <form className="mt-12" action="#">
          <div>
            <label
              for="email"
              class="block mb-2 text-sm font-medium text-gray-900 "
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full lg:w-4/6 p-2.5 mb-4"
              placeholder="name@company.com"
              required=""
            />
            <label
              for="password"
              class="block mb-2 text-sm font-medium text-gray-900 "
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full lg:w-4/6 p-2.5 mb-4"
              placeholder="***********************"
              required=""
            />
            <label
              for="confirmPassword"
              class="block mb-2 text-sm font-medium text-gray-900 "
            >
              Confirm Password
            </label>
            <input
              type="confirmPassword"
              name="confirmPassword"
              id="confirmPassword"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full lg:w-4/6 p-2.5 mb-4"
              placeholder="***********************"
              required=""
            />
          </div>

          <button
            type="submit"
            class="w-full lg:w-4/6 text-white bg-black font-medium text-sm px-5 py-2.5 text-center mt-2 mb-2"
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};
export default Register;
