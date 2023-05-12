import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { MdKeyboardArrowRight } from "react-icons/md";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { auth, db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import showToast from "../components/Toast";
import { useLocation, useNavigate } from "react-router-dom";
const Confirmation = () => {
  const location = useLocation();
  const receivedData = location.state.currentOrderId;
  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState({});

  useEffect(() => {
    const getOrders = async () => {
      const data = await getDocs(collection(db, "order"));
      setOrders(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getOrders();
  }, []);
  useEffect(() => {
    const filteredOrder = orders.filter((order) => order.id === receivedData);
    setOrder(filteredOrder);
  }, [orders, receivedData]);
  console.log(order[0]);
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
                  Never hesitate coming again!{" "}
                </h3>
              </div>
              <hr />
              <div className="py-2 px-3 flex flex-col m-atuo">
                <h1 className="font-semibold text-lg text-black">
                  Transaction Date
                </h1>
                <h2 className="font-base text-md text-gray-400">
                  {order.length > 0 && order[0].date}
                </h2>
              </div>
              <hr />
              <div className="py-2 px-3 flex flex-col m-atuo">
                <h1 className="font-semibold text-lg text-black">
                  Payment Method
                </h1>
                <h2 className="font-base text-md text-gray-400">
                  {order.length > 0 && order[0].paymentMethod}
                </h2>
              </div>
              <hr />
              <div className="py-2 px-3 flex flex-col m-atuo">
                <h1 className="font-semibold text-lg text-black">
                  Shippment Method
                </h1>
                <h2 className="font-base text-md text-gray-400">
                  {order.length > 0 && order[0].orderDetail[0].shipping}
                </h2>
              </div>
              <hr />
              <div className="py-2 px-3 flex flex-col m-atuo">
                <h1 className="font-semibold text-lg text-black">
                  Order Summary
                </h1>
                <div className="flex flex-col mt-4 "></div>
              </div>
              {order.length > 0 &&
                order[0].orderDetail.map((order) => {
                  return (
                    <div
                      key={order.id}
                      className="flex hover:bg-gray-100 mx-[2%] pb-3"
                    >
                      <div className="flex w-4/5">
                        <div className="w-[20%]">
                          <img
                            className="h-24 object-cover"
                            src={order.img}
                            alt=""
                          />
                        </div>
                        <div className="flex flex-col justify-between ml-4 flex-grow">
                          <span className="font-bold text-sm">
                            {order.name}
                          </span>
                          <span className="text-gray-400  text-xs">
                            ${order.price}
                          </span>
                          <span className="text-gray-400 text-xs">
                            x{order.quantity}
                          </span>
                        </div>
                      </div>

                      <span className="text-center w-1/5 font-bold text-sm">
                        ${order.price * order.quantity}
                      </span>
                    </div>
                  );
                })}
              <hr />

              <div className="py-2 px-3 flex flex-col m-atuo ">
                <h1 className="font-semibold text-lg text-black">
                  Grand Total
                </h1>
                <h2 className="font-base text-md text-gray-400">
                  ${order.length > 0 && order[0].price}
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
