import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { MdKeyboardArrowRight } from "react-icons/md";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import cupImage from "../Assets/KPG-cup.png";

const Confirmation = () => {
  const item = {
    id: 1,
    name: "Paper Cup",
    image: "",
    description: "Double walled",
    quantity: 3,
    price: 400,
  };
  const item2 = {
    id: 2,
    name: "Paper Cup",
    image: "",
    description: "Single Walled",
    quantity: 5,
    price: 600,
  };
  const item3 = {
    id: 3,
    name: "Glass Cup",
    image: "",
    description: "Premium",
    quantity: 2,
    price: 300,
  };
  const item4 = {
    id: 4,
    name: "Plastic Cup",
    image: "",
    description: "For Kids",
    quantity: 2,
    price: 300,
  };

  const [items, setItems] = useState([item, item2, item3, item4]);
  const [shippingOption, setShippingOption] = useState("standard");
  const [shippingAddress, setShippingAddress] = useState("Address one");

  function removeItem(id) {
    setItems(items.filter((item) => item.id != id));
  }
  function calculateTotalPrice() {
    let sum = 0;
    items.forEach((item) => {
      sum += item.price * item.quantity;
    });
    if (shippingOption === "standard") {
      sum += 10;
    } else if (shippingOption === "fast") {
      sum += 30;
    }

    return sum;
  }
  function reduceQuantity(id) {
    setItems(
      items.filter((item) => {
        if (item.id != id) {
          return item;
        } else {
          item.quantity === 0
            ? (item.quantity = 0)
            : (item.quantity = item.quantity - 1);
          return item;
        }
      })
    );
  }
  function increaseQuantity(id) {
    setItems(
      items.filter((item) => {
        if (item.id != id) {
          return item;
        } else {
          item.quantity = item.quantity + 1;
          return item;
        }
      })
    );
  }
  function updateShippingOption(e) {
    setShippingOption(e.target.value);
  }
  function updateShippingAddress(e) {
    setShippingAddress(e.target.value);
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-10">
        <div className="flex flex-col lg:flex-row  my-10 ">
          <div className="w-full bg-white px-10 py-5">
            <div className="flex flex-row items-center ">
              <Link to="/cart">
                <h1 className="font-base text-md text-gray-400">Cart</h1>
              </Link>
              <MdKeyboardArrowRight className="mx-1 text-gray-400" />
              <h1 className="font-base text-md text-gray-400">Check Out</h1>
              <MdKeyboardArrowRight className="mx-1 text-gray-400" />
              <h1 className="font-base  text-md text-black">Confirmation</h1>
            </div>

            <div className="flex flex-col border-2 my-[5%] lg:mx-[20%] rounded-md ">
              <div className="flex flex-col items-center text-center text mx-auto gap-3 p-4">
                <IoCheckmarkCircleOutline className=" block w-16 h-16" />
                <h1 className="font-bold text-2xl block">
                  Thanks for your order{" "}
                </h1>{" "}
                <h3 className="font-base text-md text-gray-400">
                  The confirmation will be sent to your email
                </h3>
              </div>
              <hr />
              <div className="py-2 px-3 flex flex-col m-atuo">
                <h1 className="font-semibold text-lg text-black">
                  Transaction Date
                </h1>
                <h2 className="font-base text-md text-gray-400">
                  {new Date().toLocaleString() + ""}
                </h2>
              </div>
              <hr />
              <div className="py-2 px-3 flex flex-col m-atuo">
                <h1 className="font-semibold text-lg text-black">
                  Payment Method
                </h1>
                <h2 className="font-base text-md text-gray-400">Visa</h2>
              </div>
              <hr />
              <div className="py-2 px-3 flex flex-col m-atuo">
                <h1 className="font-semibold text-lg text-black">
                  Shippment Method
                </h1>
                <h2 className="font-base text-md text-gray-400">
                  Standard shipping - $10.00
                </h2>
              </div>
              <hr />
              <div className="py-2 px-3 flex flex-col m-atuo">
                <h1 className="font-semibold text-lg text-black">
                  Order Summary
                </h1>
                <div className="flex flex-col mt-4 ">
                  {items.map((item) => {
                    return (
                      <div
                        key={item.id}
                        className="flex hover:bg-gray-100 -mx-8 px-6 py-3"
                      >
                        <div className="flex w-4/5">
                          <div className="w-20">
                            <img
                              className="h-24 object-cover"
                              src={cupImage}
                              alt=""
                            />
                          </div>
                          <div className="flex flex-col justify-between ml-4 flex-grow">
                            <span className="font-bold text-sm">
                              {item.name}
                            </span>
                            <span className="text-gray-400  text-xs">
                              ${item.price}
                            </span>
                            <span className="text-gray-400 text-xs">
                              x{item.quantity}
                            </span>
                          </div>
                        </div>

                        <span className="text-center w-1/5 font-bold text-sm">
                          ${item.price * item.quantity}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <hr />

              <div className="py-2 px-3 flex flex-col m-atuo ">
                <h1 className="font-semibold text-lg text-black">
                  Grand Total
                </h1>
                <h2 className="font-base text-md text-gray-400">
                  ${calculateTotalPrice()}
                </h2>
              </div>
              <div>
                <Link to="/" className="w-full flex">
                  <button
                    type="submit"
                    className="rounded-md bg-black mx-auto my-2 px-3 py-2 text-sm font-semibold text-white shadow-sm  w-[98%] transition hover:bg-gray-900 "
                  >
                    Continue Shopping
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Confirmation;
