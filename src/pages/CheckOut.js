import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { MdKeyboardArrowRight } from "react-icons/md";
import cupImage from "../Assets/KPG-cup.png";

const CheckOut = () => {
  const [month, setMonth] = useState("01");
  const [year, setYear] = useState("2023");
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

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-10">
        <div className="flex flex-col lg:flex-row  my-10">
          <div className="w-full lg:w-4/6 bg-white px-10 py-5">
            <div className="flex flex-row items-center ">
              <Link to="/cart">
                <h1 className="font-base text-md text-gray-400">Cart</h1>
              </Link>
              <MdKeyboardArrowRight className="mx-1 text-gray-400" />
              <h1 className="font-base text-md text-black">Check Out</h1>
              <MdKeyboardArrowRight className="mx-1 text-gray-400" />
              <h1 className="font-base  text-md text-gray-400">Confirmation</h1>
            </div>
            <div className="flex border-b py-8">
              <h1 className="font-bold text-2xl">Check Out</h1>
            </div>
            <form action="" class="mt-10 flex flex-col space-y-4 ">
              <div>
                <label for="card-name" class="text-xs font-bold text-gray-500">
                  Card Name
                </label>
                <input
                  type="text"
                  id="card-name"
                  name="card-name"
                  placeholder="Card Name"
                  class="mt-1 w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-black"
                />
              </div>
              <div>
                <label for="card-name" class="text-xs font-bold text-gray-500">
                  Card Holder
                </label>
                <input
                  type="text"
                  id="card-name"
                  name="card-name"
                  placeholder="Name on Card"
                  class="mt-1 w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-black"
                />
              </div>
              <div>
                <label
                  for="card-number"
                  class="text-xs font-bold text-gray-500"
                >
                  Card Number
                </label>
                <input
                  type="text"
                  id="card-number"
                  name="card-number"
                  placeholder="1234-5678-XXXX-XXXX"
                  class="w-full rounded border-gray-300 bg-gray-50 py-3 px-4 pr-10 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-black"
                />
                <img
                  src="/images/uQUFIfCYVYcLK0qVJF5Yw.png"
                  alt=""
                  class="absolute bottom-3 right-3 max-h-4"
                />
              </div>
              <div className="flex flex-col">
                <p class="text-xs font-bold text-gray-500 w-full">
                  Expiration date
                </p>
                <div class="grid grid-cols-3 gap-1 py-1">
                  <div class="w-full grid-span-1">
                    <label for="month" class="sr-only">
                      Select expiration month
                    </label>
                    <select
                      name="month"
                      id="month"
                      value={month}
                      class="w-full cursor-pointer rounded border-gray-300 py-3 px-4 bg-gray-50  text-sm shadow-sm outline-none transition focus:ring-2 focus:ring-black"
                    >
                      <option value="01">01</option>
                      <option value="02">02</option>
                      <option value="03">03</option>
                      <option value="04">04</option>
                      <option value="05">05</option>
                      <option value="06">06</option>
                      <option value="07">07</option>
                      <option value="08">08</option>
                      <option value="09">09</option>
                      <option value="10">10</option>
                      <option value="11">11</option>
                      <option value="12">12</option>
                    </select>
                  </div>

                  <div class="w-full grid-span-1">
                    <label for="year" class="sr-only">
                      Select expiration year
                    </label>
                    <select
                      name="year"
                      id="year"
                      value={year}
                      class="w-full cursor-pointer rounded border-gray-300 py-3 px-4 bg-gray-50  text-sm shadow-sm outline-none transition focus:ring-2 focus:ring-black"
                    >
                      <option value="2023">2023</option>
                      <option value="2024">2024</option>
                      <option value="2025">2025</option>
                      <option value="2026">2026</option>
                      <option value="2027">2027</option>
                      <option value="2028">2028</option>
                      <option value="2029">2029</option>
                      <option value="2030">2030</option>
                    </select>
                  </div>
                  <div class="w-full grid-span-1">
                    <label for="security-code" class="sr-only">
                      Security code
                    </label>
                    <input
                      type="text"
                      id="security-code"
                      name="security-code"
                      placeholder="Security code"
                      class="w-full  rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-black"
                    />
                  </div>
                </div>
                <div className="w-full ">
                  <button className="mt-2 rounded-md bg-black py-3 px-4 text-sm font-bold text-white shadow-sm  w-full transition hover:bg-gray-900 ">
                    Add
                  </button>
                </div>
              </div>
            </form>
            <div className="flex border-b pb-8 mt-6 mb-6">
              <h1 className="font-bold text-2xl">My Cards</h1>
            </div>
            <div className="flex flex-col gap-2">
              <div class="flex items-center pl-4 border border-gray-200 rounded ">
                <input
                  checked
                  id="bordered-radio-1"
                  type="radio"
                  value=""
                  name="bordered-radio"
                  class="w-4 h-4 text-black bg-gray-100 border-gray-300 focus:ring-black "
                />
                <label
                  for="bordered-radio-1"
                  class="w-full py-4 ml-2 text-sm font-medium text-gray-900 "
                >
                  My Visa
                </label>
              </div>
              <div class="flex items-center pl-4 border border-gray-200 rounded ">
                <input
                  id="bordered-radio-2"
                  type="radio"
                  value=""
                  name="bordered-radio"
                  class="w-4 h-4 text-black bg-gray-100 border-gray-300 focus:ring-black "
                />
                <label
                  for="bordered-radio-2"
                  class="w-full py-4 ml-2 text-sm font-medium text-gray-900 "
                >
                  My Mada
                </label>
              </div>
            </div>
          </div>
          <div id="summary" className="w-full lg:w-2/6 px-8 py-10 lg:mt-[40px]">
            <h1 className="font-bold text-2xl border-b pb-8">Order Summary</h1>
            <div className="flex flex-col mt-5">
              <span className="font-bold text-sm uppercase">Your Order</span>
              {items.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="flex hover:bg-gray-100 -mx-8 px-6 py-5"
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
                        <span className="font-bold text-sm">{item.name}</span>
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

            <div className="border-t mt-8">
              <div className="flex font-bold justify-between py-6 text-sm uppercase">
                <span>Grand Total</span>
                <span>${calculateTotalPrice()}</span>
              </div>
              <Link to="/confirmation">
                <button className="mt-2 rounded-md bg-black py-3 px-4 text-sm font-bold text-white shadow-sm  w-full transition hover:bg-gray-900 ">
                  Order
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CheckOut;
