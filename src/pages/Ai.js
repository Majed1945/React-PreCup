import React from "react";
import Navbar from "../components/Navbar";
import cupMockup from "../Assets/cupMockup.jpeg";
import logo from "../Assets/logo.png";
import { PAPER_CUPS_PRODUCTS } from "../ProductsData";
import { Link } from "react-router-dom";
import { IoArrowForward } from "react-icons/io5";
function Ai() {
  return (
    <>
      <Navbar className="z-10" />
      <div className="bg-white z-0 relative">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h1 className=" text-center mb-8 text-3xl md:text-5xl md:mb-16 font-extrabold ">
            Let the Ai do the job.😎
          </h1>
          <div className="flex">
            <input
              type="text"
              class="bg-gray-50 border mb-8 border-r-0 rounded-tl-lg rounded-bl-lg rounded-tr-0  rounded-br-0 border-gray-300 text-gray-900 sm:text-sm focus:border-black focus:ring-0  w-full "
              placeholder="e.g. three red stripes with black dotted pattren"
              required=""
            />
            <button class="bg-black text-white border p-2 md:px-6 mb-8  rounded-tr-lg  border-l-0 rounded-br-lg  border-black sm:text-sm focus:ring-0   ">
              ✨Generate✨
            </button>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {PAPER_CUPS_PRODUCTS.map((e) => {
              return (
                <div className="w-full col-span-1  animate-pulse relative group translation hover:-translate-y-1  ease-in-out duration-150 border-gray-100 border rounded-3xl overflow-hidden  ">
                  <div>
                    <img src={e.img} />
                  </div>

                  <Link to="/productDetails">
                    <div className="bg-black  justify-center text-center text flex items-center font-thin p-3   gap-1 text-white  rounded-b-md">
                      <p>CUSTOMIZE</p>
                      <IoArrowForward className="transition group-hover:translate-x-1 " />
                    </div>
                  </Link>
                </div>
              );
            })}
            {/* {products.map((product) => (
              <div key={product.id} className="group animate-pulse relative">
                <div className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src={cupMockup}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>

                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href={product.href}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.color}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {product.price}
                  </p>
                </div>
              </div>
            ))} */}
          </div>
        </div>
      </div>
      {/* <img
        className=" z-[0] opacity-20 absolute  invert  overflow-hidden right-[-300px] top-24 scale-[300%]"
        src={logo}
      /> */}
    </>
  );
}

export default Ai;
