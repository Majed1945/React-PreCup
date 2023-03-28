import { useState } from "react";
import { Link } from "react-router-dom";
const ShoppingCart = () => {
  const item = {
    id: 1,
    name: "Iphone 6S",
    image: "",
    description: "Apple",
    quantity: 3,
    price: 400,
  };
  const item2 = {
    id: 2,
    name: "Samsung S10",
    image: "",
    description: "Samsung",
    quantity: 5,
    price: 600,
  };
  const item3 = {
    id: 3,
    name: "Hawawi s20",
    image: "",
    description: "Hawawi",
    quantity: 2,
    price: 300,
  };
  const item4 = {
    id: 4,
    name: "Hawawi s20",
    image: "",
    description: "Hawawi",
    quantity: 2,
    price: 300,
  };

  const [items, setItems] = useState([item, item2, item3, item4]);
  const [shippingOption, setShippingOption] = useState("standard");
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

  return (
    <div className="container mx-auto mt-10">
      <div className="flex flex-col lg:flex-row shadow-lg my-10">
        <div className="w-full lg:w-3/4 bg-white px-10 py-10">
          <div className="flex justify-between border-b pb-8">
            <h1 className="font-semibold text-2xl">Shopping Cart</h1>
            {items.length === 1 ? (
              <h2 className="font-semibold text-2xl"> 1 Item </h2>
            ) : (
              <h2 className="font-semibold text-2xl"> {items.length} Items </h2>
            )}
          </div>
          <div className="flex mt-10 mb-5">
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
              Product Details
            </h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
              Quantity
            </h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">
              Price
            </h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">
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
                      className="h-24"
                      src="https://drive.google.com/uc?id=18KkAVkGFvaGNqPy2DIvTqmUH_nk39o3z"
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col justify-between ml-4 flex-grow">
                    <span className="font-bold text-sm">{item.name}</span>
                    <span className="text-red-500 text-xs">
                      {item.description}
                    </span>
                    <a
                      href="#"
                      className="font-semibold hover:text-red-500 text-gray-500 text-xs"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </a>
                  </div>
                </div>
                <div className="flex justify-center w-1/5">
                  <button onClick={() => reduceQuantity(item.id)}>
                    <svg
                      className="fill-current text-gray-600 w-3"
                      viewBox="0 0 448 512"
                    >
                      <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                    </svg>
                  </button>

                  <input
                    className="mx-2 border text-center w-8"
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
                <span className="text-center w-1/5 font-semibold text-sm">
                  ${item.price}
                </span>
                <span className="text-center w-1/5 font-semibold text-sm">
                  ${item.price * item.quantity}
                </span>
              </div>
            );
          })}

          <Link
            to="/"
            className="flex font-semibold text-indigo-600 text-sm mt-10"
          >
            <svg
              className="fill-current mr-2 text-indigo-600 w-4"
              viewBox="0 0 448 512"
            >
              <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
            </svg>
            Continue Shopping
          </Link>
        </div>
        <div id="summary" className="w-full lg:w-1/4 px-8 py-10">
          <h1 className="font-semibold text-2xl border-b pb-8">
            Order Summary
          </h1>
          <div className="flex flex-col mt-5">
            <span className="font-semibold text-sm uppercase ">Items</span>
            {items.map((item) => {
              return (
                <span className="text-gray-600 text-sm block p-2">
                  {item.name}, {item.quantity}, {item.price * item.quantity}$
                </span>
              );
            })}
          </div>
          <div>
            <label className="font-medium inline-block  text-sm uppercase">
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
            <label
              htmlFor="promo"
              className="font-semibold inline-block text-sm uppercase"
            >
              Promo Code
            </label>
            <input
              type="text"
              id="promo"
              placeholder="Enter your code"
              className="p-2 text-sm w-full my-1 border-2"
            />
          </div>
          <button className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">
            Apply
          </button>
          <div className="border-t mt-8">
            <div className="flex font-semibold justify-between py-6 text-sm uppercase">
              <span>Total cost</span>
              <span>${calculateTotalPrice()}</span>
            </div>
            <button className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">
              Checkout
            </button>
            <button className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">
              Test btn
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ShoppingCart;
