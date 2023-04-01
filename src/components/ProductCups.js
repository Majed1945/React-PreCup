import React from "react";
import { Link } from "react-router-dom";
import { IoArrowForward, IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import { useState } from "react";
function ProductCups(props) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  return (
    <div className="w-full col-span-1  relative group translation hover:-translate-y-1  ease-in-out duration-150 border-gray-100 border rounded-3xl overflow-hidden  ">
      <span
        className=" absolute top-4 cursor-pointer left-4"
        onClick={() => {
          setIsBookmarked(!isBookmarked);
        }}
      >
        {isBookmarked ? (
          <IoBookmark className={"w-[1.3rem] h-[1.3rem]"} />
        ) : (
          <IoBookmarkOutline className={"w-[1.3rem] h-[1.3rem]"} />
        )}
      </span>
      <div>
        <img src={props.img} />
      </div>
      <div className="p-4 flex bg-gray-50 justify-between ">
        <div>
          <h1 className="font-bold text-lg">{props.name}</h1>
          <p className="items-center gap-1 flex ">
            {props.price + "SAR"}
            <span className=" text-[0.8rem]  font-extralight">
              (per 1000pcs)
            </span>
          </p>
        </div>
        <div>
          <p>{props.size}oz</p>
        </div>
      </div>
      <Link to="/productDetails">
        <div className="bg-black  justify-center text-center text flex items-center font-thin p-3   gap-1 text-white  rounded-b-md">
          <p>CUSTOMIZE</p>
          <IoArrowForward className="transition group-hover:translate-x-1 " />
        </div>
      </Link>
    </div>
  );
}

export default ProductCups;
