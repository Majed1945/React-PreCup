import noonCup from "../Assets/noonCup.png";
import logo from "../Assets/logo.png";
import { Link } from "react-router-dom";
import { IoArrowForwardOutline } from "react-icons/io5";
const Login = () => {
  return (
    <div className="flex flex-col relative md:flex-row ">
      <Link to="/">
        <img className=" absolute top-0 right-0 w-16  h-16" src={logo} />
      </Link>
      <div className="w-full  md:w-[50%] flex items-center overflow-hidden md:h-screen bg-gray-100">
        <div>
          <img src={noonCup} className="md:scale-150 z-[-999]  " />
        </div>
      </div>
      <div className=" w-full  md:w-[50%] z-[2] p-6 md:p-16 my-auto">
        <div className=" my-4  mt-8 text-6xl font-serif">
          <h1>Log in</h1>
        </div>
        <div>
          <p className="font-extralight tracking-widest ">
            Find your perfect papercup today - log in now!
          </p>
          <p className="font-extralight tracking-widest ">
            Don"t have an account?{" "}
            <Link to="/register" className="underline">
              Register
            </Link>
          </p>
        </div>
        <div className="flex flex-col gap-4 mt-10">
          <div className="flex  border-b-[1px] pb-2 border-black justify-between items-center ">
            <h2>Name</h2>
            <input className="w-full ml-[58px]" type={"text"} />
          </div>
          <div className="flex  border-b-[1px] pb-2 border-black justify-between items-center ">
            <h2>Password</h2>
            <input className="w-full ml-8" type={"password"} />
          </div>

          <div className="flex  border-b-[1px] pb-2 border-black justify-between items-center ">
            <h2>Remember me</h2>
            <input
              className=" checked:bg-black hover:checked:bg-black default:right-0  indeterminate:bg-black "
              type={"checkbox"}
            />
          </div>

          <div className="flex gap-4 font-serif justify-between items-center ">
            <div className="rounded-full md:text-2xl w-full px-[3px] border-[1px] border-black">
              <Link className="flex m-0 p-2 items-center justify-between">
                <h1>Log in</h1>
                <IoArrowForwardOutline className="bg-black text-white rounded-[50%] border-[1px] h-10 w-10" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
