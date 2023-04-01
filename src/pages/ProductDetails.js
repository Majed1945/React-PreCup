import React from "react";
import {
  IoAddOutline,
  IoArrowBackOutline,
  IoArrowForwardOutline,
  IoRemoveOutline,
} from "react-icons/io5";
import { Link } from "react-router-dom";
import kpjCup from "../Assets/KPG-cup.png";

function ProductDetails() {
  return (
    <div className="flex flex-col md:flex-row ">
      <div className="w-full md:w-[50%] flex items-center overflow-hidden md:h-screen bg-gray-100">
        <div>
          <img src={kpjCup} className="md:scale-150 z-[-999]  " />
        </div>
      </div>
      <div className=" w-full md:w-[50%] z-[2] p-6 md:p-16 my-auto">
        <Link to="/products" className="flex items-center gap-2">
          <div className=" border-[1px] rounded-[50%] border-black p-2">
            <IoArrowBackOutline />
          </div>
          <h3>Back</h3>
        </Link>
        <div className=" my-4 mt-8 text-5xl font-serif">
          <h1>
            Fancy <span className=" font-metal ">Pineapple</span>
          </h1>
        </div>
        <div>
          <p className="font-extralight tracking-widest ">
            Reprehenderit sunt commodo Lorem ut reprehenderit Lorem magna magna
            laboris officia occaecat ipsum. Pariatur esse sit elit enim
            excepteur consectetur cupidatat labore. Lorem excepteur id elit ad
            est commo.
          </p>
        </div>
        <div className="flex flex-col gap-4 mt-10">
          <div className="flex  border-b-[1px] pb-2 border-black justify-between items-center ">
            <h2>Delivery Time</h2>
            <select className="border-0  focus:ring-0">
              <option>5 hours</option>
            </select>
          </div>
          <div className="flex  border-b-[1px] pb-2 border-black justify-between items-center ">
            <h2>Amount</h2>
            <div className="flex justify-end rounded-xl px-[3px] border-[1px] border-black items-center">
              <div>
                <button
                  className="  border-black rounded-[50%] border-[1px] items-center flex justify-center w-5 h-5"
                  onClick={() => {}}
                >
                  <IoAddOutline className="w-full h-full" />
                </button>
              </div>
              <div>
                <input
                  className=" text-center p-0 border-0 w-5"
                  type="text"
                  value={1}
                />
              </div>
              <div>
                <button
                  className="  bg-black text-white rounded-[50%] border-[1px] items-center flex justify-center w-5 h-5"
                  onClick={() => {}}
                >
                  <IoRemoveOutline className="w-full h-full" />
                </button>
              </div>
            </div>
          </div>
          <div className="flex  border-b-[1px] pb-2 border-black justify-between items-center ">
            <h2>Sold</h2>
            <h2>1.200 Pcs</h2>
          </div>
          <div className="flex  border-b-[1px] pb-2 border-black justify-between items-center ">
            <h2>Price</h2>
            <h2>0.71 SAR</h2>
          </div>
          <div className="flex gap-4 justify-between items-center ">
            <div className="rounded-full  md:text-2xl w-full px-[3px] border-[1px] border-black">
              <Link className="flex m-0 p-2 items-center justify-between">
                <h1>Check Out</h1>
                <IoArrowForwardOutline className="bg-black text-white rounded-[50%] border-[1px] h-10 w-10" />
              </Link>
            </div>
            <div className="rounded-full md:text-2xl w-full px-[3px] border-[1px] border-black">
              <Link className="flex m-0 p-2 items-center justify-between">
                <h1>Add to Cart</h1>
                <IoArrowForwardOutline className="bg-black text-white rounded-[50%] border-[1px] h-10 w-10" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
