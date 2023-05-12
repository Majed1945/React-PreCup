import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { MdKeyboardArrowRight } from "react-icons/md";
import { BsCart4 } from "react-icons/bs";
import {
  IoAddOutline,
  IoCashOutline,
  IoRemoveOutline,
  IoTrashOutline,
} from "react-icons/io5";
import { auth, db } from "../firebase-config";
import logo from "../Assets/logo.png";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import showToast from "../components/Toast";
const Cart = () => {
  const [items, setItems] = useState([]);
  const [shippingOption, setShippingOption] = useState("standard");
  const [shippingAddress, setShippingAddress] = useState("Address one");
  useEffect(() => {
    const getCartContent = async () => {
      const cartCollectionRef = collection(db, "cart");
      const data = await getDocs(cartCollectionRef);
      const filteredData = data.docs
        .map((doc) => ({
          ...doc.data(),
          productId: doc.id,
        }))
        .filter((doc) => auth.currentUser.uid === doc.id);
      setItems(filteredData);
    };
    getCartContent();
  }, []);

  async function removeItem(id) {
    setItems(items.filter((item) => item.productId !== id));
    console.log(id);
    try {
      await deleteDoc(doc(db, "cart", id));
      showToast("Successfully deleted", "success");
    } catch (error) {
      showToast(error.code, "error");
    }
  }

  function calculateTotalPrice() {
    let sum = 0;
    items
      .filter((item) => item.id === auth.currentUser.uid)
      .forEach((item) => {
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
    items
      .filter((item) => item.id === auth.currentUser.uid)
      .forEach((item) => {
        sum += item.price * item.quantity;
      });

    return sum;
  }
  async function reduceQuantity(id) {
    setItems(
      items.filter((item) => {
        if (item.productId !== id) {
          return item;
        } else {
          item.quantity === 1
            ? (item.quantity = 1)
            : (item.quantity = item.quantity - 1);
          return item;
        }
      })
    );
    await setDoc(
      doc(db, "cart", id),
      {
        quantity: items.filter((item) => item.productId === id)[0].quantity,
      },
      { merge: true }
    );
  }
  async function increaseQuantity(id) {
    setItems(
      items.filter((item) => {
        if (item.productId !== id) {
          return item;
        } else {
          item.quantity = item.quantity + 1;
          return item;
        }
      })
    );
    await setDoc(
      doc(db, "cart", id),
      {
        quantity: items.filter((item) => item.productId === id)[0].quantity,
      },
      { merge: true }
    );
  }
  function updateShippingOption(e) {
    setShippingOption(e.target.value);
  }
  function updateShippingAddress(e) {
    setShippingAddress(e.target.value);
  }
  const navigate = useNavigate();

  function handleCheckout() {
    if (items.length === 0) {
      showToast("Please add items to your cart", "warning");
    } else {
      navigate("/checkout");
    }
  }
  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-10">
        <div className="flex flex-col lg:flex-row  my-10">
          <div className="w-full lg:w-3/4 bg-white px-10 py-5">
            <div className="flex flex-row items-center ">
              <Link to="/cart">
                <motion.h1
                  layout
                  initial={{ x: -80, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1.3 }}
                  className="font-base text-md text-black"
                >
                  Cart
                </motion.h1>
              </Link>
              <motion.div
                initial={{ x: -40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1.4, delay: 0.2 }}
              >
                <MdKeyboardArrowRight className="mx-1 text-gray-400" />
              </motion.div>
              <motion.h1
                initial={{ x: -40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1.6, delay: 0.3 }}
                className="font-base text-md text-gray-400 "
              >
                Check Out
              </motion.h1>
              <motion.div
                initial={{ x: -40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1.8, delay: 0.4 }}
              >
                <MdKeyboardArrowRight className="mx-1 text-gray-400" />
              </motion.div>
              <motion.h1
                initial={{ x: -40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.6 }}
                className="font-base  text-md text-gray-400"
              >
                Confirmation
              </motion.h1>
            </div>
            <div className="flex justify-between border-b py-8">
              <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="flex items-center gap-2"
              >
                <BsCart4 className="w-8 h-8" />

                <h1 className="font-bold text-2xl">Shopping Cart</h1>
              </motion.div>
              {items.length === 1 ? (
                <h2 className="font-bold text-2xl"> 1 Item </h2>
              ) : (
                <h2 className="font-bold text-2xl"> {items.length} Items </h2>
              )}
            </div>
            <div className="flex mt-10 mb-5">
              <h3 className="font-bold text-gray-600 text-xs uppercase w-2/4">
                Product
              </h3>
              <h3 className="font-bold text-center text-gray-600 text-xs uppercase w-1/4">
                Quantity
              </h3>
              <h3 className="font-bold text-center text-gray-600 text-xs uppercase w-1/4 ">
                Price
              </h3>
            </div>
            <LayoutGroup>
              {items.map((item) => {
                return (
                  <motion.div
                    layout="position"
                    key={item.productId}
                    className="flex items-center  hover:bg-gray-100 rounded-lg -mx-8 px-6 py-5"
                  >
                    <div className="flex w-2/4">
                      <div className=" w-20">
                        <div className="flex flex-row-reverse">
                          <img
                            className="h-24 object-cover"
                            src={item.img}
                            alt=""
                          />
                          <span className="text-center md:hidden font-bold text-sm">
                            <div
                              onClick={() => {
                                removeItem(item.productId);
                              }}
                              className="m-auto md:w-fit h-full flex  items-center cursor-pointer bg-red-500 p-[0.1rem]  rounded-tl-lg rounded-bl-lg text-white md:rounded-lg "
                            >
                              <IoTrashOutline className="md:w-5 md:h-5" />
                            </div>
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col  my-auto md:ml-4 flex-grow">
                        <span className="font-bold text-sm">{item.name}</span>
                        <span className="text-gray-400 text-xs">
                          {item.description}
                        </span>
                      </div>
                    </div>

                    <div className="flex  justify-center w-1/4 ">
                      <div className="flex justify-end rounded-xl px-[3px] border-[1px] border-black items-center">
                        <motion.div
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <button
                            className="  border-black rounded-[50%] border-[1px] items-center flex justify-center w-5 h-5"
                            onClick={() => {
                              increaseQuantity(item.productId);
                            }}
                          >
                            <IoAddOutline className="w-full h-full" />
                          </button>
                        </motion.div>
                        <div>
                          <input
                            className=" text-center bg-transparent p-0 border-0 w-5"
                            type="text"
                            value={item.quantity}
                          />
                        </div>
                        <motion.div
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <button
                            className="  bg-black text-white rounded-[50%] border-[1px] items-center flex justify-center w-5 h-5"
                            onClick={() => {
                              reduceQuantity(item.productId);
                            }}
                          >
                            <IoRemoveOutline className="w-full h-full" />
                          </button>
                        </motion.div>
                      </div>
                    </div>
                    <span className="text-center w-1/4 font-bold text-sm">
                      ${item.price * item.quantity}
                    </span>
                    <span className="text-center hidden  md:block font-bold text-sm">
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                          removeItem(item.productId);
                        }}
                        className="m-auto w-fit cursor-pointer bg-red-500 p-[0.1rem] text-white rounded-lg "
                      >
                        <IoTrashOutline className="w-5 h-5" />
                      </motion.div>
                    </span>
                  </motion.div>
                );
              })}
            </LayoutGroup>
          </div>
          <div
            id="summary"
            className="w-full relative overflow-hidden z-[3] bg-gray-50 rounded-2xl lg:w-1/4 px-8 py-10 lg:mt-[40px]"
          >
            <img
              src={logo}
              className="absolute opacity-10 bottom-0   md:scale-150 z-[-99]  left-32"
            />
            <div className="flex items-center gap-2 border-b pb-8">
              <IoCashOutline className="w-8 h-8" />
              <h1 className="font-bold text-2xl ">Price</h1>
            </div>
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
                className="block p-2 text-gray-600 rounded-lg w-full text-sm"
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
                className="block p-2 text-gray-600  rounded-lg w-full text-sm"
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
              <button onClick={handleCheckout}>
                <button className="mt-2 rounded-md bg-black py-3 px-4 text-sm font-bold text-white shadow-sm  w-full transition hover:bg-gray-900 ">
                  Check Out
                </button>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Cart;
