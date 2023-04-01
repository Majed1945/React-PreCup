import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { MdKeyboardArrowRight } from "react-icons/md";
import cupImage from "../Assets/KPG-cup.png";
import { BsTrash } from "react-icons/bs";
const Cart = () => {
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
  function calculateSubotalPrice() {
    let sum = 0;
    items.forEach((item) => {
      sum += item.price * item.quantity;
    });

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
        <div className="flex flex-col lg:flex-row  my-10">
          <div className="w-full lg:w-3/4 bg-white px-10 py-5">
            <div className="flex flex-row items-center ">
              <Link to="/cart">
                <h1 className="font-base text-md text-black">Cart</h1>
              </Link>
              <MdKeyboardArrowRight className="mx-1 text-gray-400" />
              <h1 className="font-base text-md text-gray-400 ">Check Out</h1>
              <MdKeyboardArrowRight className="mx-1 text-gray-400" />
              <h1 className="font-base  text-md text-gray-400">Confirmation</h1>
            </div>
            <div className="flex justify-between border-b py-8">
              <h1 className="font-bold text-2xl">Shopping Cart</h1>
              {items.length === 1 ? (
                <h2 className="font-bold text-2xl"> 1 Item </h2>
              ) : (
                <h2 className="font-bold text-2xl"> {items.length} Items </h2>
              )}
            </div>
            <div className="flex mt-10 mb-5">
              <h3 className="font-bold text-gray-600 text-xs uppercase w-2/5">
                Product Details
              </h3>
              <h3 className="font-bold text-center text-gray-600 text-xs uppercase w-1/5">
                Quantity
              </h3>
              <h3 className="font-bold text-center text-gray-600 text-xs uppercase w-1/5 ">
                Price
              </h3>
              <h3 className="font-bold text-center text-gray-600 text-xs uppercase w-1/5 ">
                Total
              </h3>
            </div>
            {items.map((item) => {
              return (
                <div
                  key={item.id}
                  className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5"
                >
                  <div className="flex w-2/5">
                    <div className="w-20">
                      <img
                        className="h-24 object-cover"
                        src={cupImage}
                        alt=""
                      />
                    </div>
                    <div className="flex flex-col justify-between ml-4 flex-grow">
                      <span className="font-bold text-sm">{item.name}</span>
                      <span className="text-gray-400 text-xs">
                        {item.description}
                      </span>
                      <a
                        href="#"
                        className="font-bold hover:text-red-500 text-gray-500 text-xs"
                        onClick={() => removeItem(item.id)}
                      >
                        Remove
                      </a>
                    </div>
                  </div>
                  <div className="flex justify-center w-1/5 ">
                    <button onClick={() => reduceQuantity(item.id)}>
                      <svg
                        className="fill-current text-gray-600 w-3"
                        viewBox="0 0 448 512"
                      >
                        <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                      </svg>
                    </button>

                    <input
                      className="mx-2 px-2 border text-center w-8"
                      type="text"
                      value={item.quantity}
                    />

                    <button onClick={() => increaseQuantity(item.id)}>
                      <svg
                        className="fill-current text-gray-600 w-3"
                        viewBox="0 0 448 512"
                      >
                        <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                      </svg>
                    </button>
                  </div>
                  <span className="text-center w-1/5 font-bold text-sm">
                    ${item.price}
                  </span>
                  <span className="text-center w-1/5 font-bold text-sm">
                    ${item.price * item.quantity}
                  </span>
                </div>
              );
            })}
          </div>
          <div id="summary" className="w-full lg:w-1/4 px-8 py-10 lg:mt-[40px]">
            <h1 className="font-bold text-2xl border-b pb-8">Price</h1>
            <div className="flex flex-col ">
              <div className="flex flex-row justify-between items-center">
                <span className="font-medium inline-block  text-sm uppercase">
                  Subtotal
                </span>
                <span className="text-gray-600 text-sm block p-2">
                  ${calculateSubotalPrice()}
                </span>
              </div>
            </div>
            <div>
              <label className="font-medium inline-block mb-1 text-sm uppercase">
                Shipping
              </label>
              <select
                className="block p-2 text-gray-600 w-full text-sm"
                value={shippingOption}
                onChange={updateShippingOption}
              >
                <option value="free">Free shipping - $0</option>
                <option value="standard">Standard shipping - $10.00</option>
                <option value="fast">Fast shipping - $30.00</option>
              </select>
            </div>
            <div>
              <label className="font-medium inline-block mt-2 mb-1 text-sm uppercase">
                Address
              </label>
              <select
                className="block p-2 text-gray-600 w-full text-sm"
                value={shippingAddress}
                onChange={updateShippingAddress}
              >
                <option value="Address one">Address one</option>
                <option value="Address two">Address two</option>
                <option value="Address three">Address three</option>
              </select>
            </div>

            <div className="border-t mt-8">
              <div className="flex font-bold justify-between py-6 text-sm uppercase">
                <span>Total cost</span>
                <span>${calculateTotalPrice()}</span>
              </div>
              <Link to="/checkOut">
                <button className="mt-2 rounded-md bg-black py-3 px-4 text-sm font-bold text-white shadow-sm  w-full transition hover:bg-gray-900 ">
                  Check Out
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Cart;
