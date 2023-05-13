import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { db } from "../firebase-config.js";
import { collection, getDocs } from "firebase/firestore";

function AdminDashboard() {
  const [cups, setCups] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const cupsCollectionRef = collection(db, "products");
  const usersCollectionRef = collection(db, "users");
  const ordersCollectionRef = collection(db, "order");
  useEffect(() => {
    const getAllProducts = async () => {
      const data = await getDocs(cupsCollectionRef);
      setCups(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    const getAllUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    const getAllOrders = async () => {
      const data = await getDocs(ordersCollectionRef);
      setOrders(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getAllUsers();
    getAllProducts();
    getAllOrders();
  }, []);
  return (
    <>
      <main className="mx-auto max-w-7xl px-8 md:px-16  ">
        <div>
          <motion.div
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: -50, opacity: 1 }}
            transition={{ duration: 0.9 }}
            className="sticky top-0  z-[1] backdrop-blur-md md:bg-white items-baseline justify-between border-b border-gray-200 pb-6 pt-36"
          >
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Users
            </h1>
          </motion.div>

          <section aria-labelledby="products-heading" className="pb-6 ">
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table class="w-full text-sm text-left text-gray-500 ">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
                  <tr>
                    <th scope="col" class="px-6 py-3">
                      Name
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Email
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                {users.map((eachUser) => (
                  <tbody>
                    <tr class="bg-white border-b ">
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium first-letter:uppercase text-gray-900 whitespace-nowrap "
                      >
                        {eachUser.name}
                      </th>
                      <td class="px-6 py-4  first-letter:uppercase">
                        {eachUser.email}
                      </td>
                      <td class="px-6 py-4">
                        <button class="font-medium text-blue-600  hover:underline">
                          Edit
                        </button>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          </section>
        </div>

        <div>
          <div className="sticky top-0  z-[1] backdrop-blur-md md:bg-white items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Products
            </h1>
            <div>{/* <IoCashOutline className={" w-6 h-6 "} /> */}</div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table class="w-full text-sm text-left text-gray-500 ">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
                  <tr>
                    <th scope="col" class="px-6 py-3">
                      Name
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Type
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Size
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Price
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                {cups.map((eachUser) => (
                  <tbody>
                    <tr class="bg-white border-b ">
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium first-letter:uppercase text-gray-900 whitespace-nowrap "
                      >
                        {eachUser.name}
                      </th>
                      <td class="px-6 py-4  first-letter:uppercase">
                        {eachUser.type}
                      </td>
                      <td class="px-6 py-4 uppercase">{eachUser.size}</td>
                      <td class="px-6 py-4">{"$" + eachUser.price}</td>
                      <td class="px-6 py-4">
                        <button class="font-medium text-blue-600  hover:underline">
                          Edit
                        </button>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          </section>
        </div>
        <div>
          <div className="sticky top-0  z-[1] backdrop-blur-md md:bg-white items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Orders
            </h1>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table class="w-full text-sm text-left text-gray-500 ">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
                  <tr>
                    <th scope="col" class="px-6 py-3">
                      User
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Shipped to
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Price
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Payment
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Date
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                {orders.map((eachOrder) => (
                  <tbody>
                    <tr class="bg-white border-b ">
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium first-letter:uppercase text-gray-900 whitespace-nowrap "
                      >
                        {eachOrder.userName}
                      </th>
                      <td class="px-6 py-4  first-letter:uppercase">
                        {eachOrder.shippedTo}
                      </td>
                      <td class="px-6 py-4">{"$" + eachOrder.price}</td>
                      <td class="px-6 py-4 uppercase">
                        {eachOrder.paymentMethod}
                      </td>
                      <td class="px-6 py-4 uppercase">{eachOrder.date}</td>
                      <td class="px-6 py-4">
                        <button class="font-medium text-blue-600  hover:underline">
                          Edit
                        </button>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default AdminDashboard;