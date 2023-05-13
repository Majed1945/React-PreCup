import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { auth, db } from "../firebase-config.js";
import { collection, getDocs } from "firebase/firestore";
import ProductCups from "../components/ProductCups";
import Navbar from "../components/Navbar";
import AddProductCup from "../components/AddProductCup";

export default function Products() {
  const [cups, setCups] = useState([]);
  const admin =
    auth.currentUser !== null
      ? auth.currentUser.email === "admin@gmail.com"
      : false;
  const cupsCollectionRef = collection(db, "products");

  useEffect(() => {
    const getProducts = async () => {
      const data = await getDocs(cupsCollectionRef);
      setCups(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getProducts();
  }, []);
  return (
    <>
      <Navbar />
      <div className="bg-white">
        <div>
          <main className="mx-auto max-w-7xl px-8 md:px-16  ">
            <div>
              <motion.div
                initial={{ y: 0, opacity: 0 }}
                animate={{ y: -50, opacity: 1 }}
                transition={{ duration: 0.9 }}
                className="sticky top-0  z-[1] backdrop-blur-md md:bg-white items-baseline justify-between border-b border-gray-200 pb-6 pt-36"
              >
                <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                  Paper Cups
                </h1>
                <div>{/* <IoCashOutline className={" w-6 h-6 "} /> */}</div>
              </motion.div>

              <section
                aria-labelledby="products-heading"
                className="pb-24 pt-6"
              >
                <h2 id="products-heading" className="sr-only">
                  Products
                </h2>

                <motion.div className="grid grid-cols-1  gap-x-8 gap-y-10 sm:grid-cols-2 md:grid-cols-3 ">
                  {cups
                    .filter((e) => e.type === "paper")
                    .map((e) => {
                      return (
                        <motion.div whileHover={{ y: -6 }}>
                          <ProductCups
                            setCups={setCups}
                            id={e.id}
                            img={e.img}
                            name={e.name}
                            price={e.price}
                            size={e.size}
                          />
                        </motion.div>
                      );
                    })}
                  {admin ? (
                    <AddProductCup setCups={setCups} checked={"paper"} />
                  ) : null}
                </motion.div>
              </section>
            </div>

            <div>
              <div className="sticky top-0  z-[1] backdrop-blur-md md:bg-white items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                  Plastic Cups
                </h1>
              </div>

              <section
                aria-labelledby="products-heading"
                className="pb-24 pt-6"
              >

                <motion.div className="grid grid-cols-1  gap-x-8 gap-y-10 sm:grid-cols-2 md:grid-cols-3 ">
                  {cups
                    .filter((e) => e.type === "plastic")
                    .map((e) => {
                      return (
                        <motion.div
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <ProductCups
                            setCups={setCups}
                            id={e.id}
                            img={e.img}
                            name={e.name}
                            price={e.price}
                            size={e.size}
                          />
                        </motion.div>
                      );
                    })}
                  {admin ? (
                    <AddProductCup setCups={setCups} checked="plastic" />
                  ) : null}
                </motion.div>
              </section>
            </div>
            <div>
              <div className="sticky top-0  z-[1] backdrop-blur-md md:bg-white items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                  Foam Cups
                </h1>
                <div>{/* <IoCashOutline className={" w-6 h-6 "} /> */}</div>
              </div>

              <section
                aria-labelledby="products-heading"
                className="pb-24 pt-6"
              >
                <div className="grid grid-cols-1  gap-x-8 gap-y-10 sm:grid-cols-2 md:grid-cols-3 ">
                  {cups
                    .filter((e) => e.type === "foam")
                    .map((e) => {
                      return (
                        <motion.div
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <ProductCups
                            setCups={setCups}
                            id={e.id}
                            img={e.img}
                            name={e.name}
                            price={e.price}
                            size={e.size}
                          />
                        </motion.div>
                      );
                    })}
                  {admin ? (
                    <AddProductCup setCups={setCups} checked="foam" />
                  ) : null}
                </div>
              </section>
            </div>
            <div>
              <div className="sticky top-0  z-[1] backdrop-blur-md md:bg-white items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                  AI Generated By Dell2 AI Model!
                </h1>
                <div>{/* <IoCashOutline className={" w-6 h-6 "} /> */}</div>
              </div>

              <section
                aria-labelledby="products-heading"
                className="pb-24 pt-6"
              >
                <div className="grid grid-cols-1  gap-x-8 gap-y-10 sm:grid-cols-2 md:grid-cols-3 ">
                  {cups
                    .filter((e) => e.type === "AI Cup! - Dell-2 Model")
                    .map((e) => {
                      return (
                        <motion.div
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <ProductCups
                            id={e.id}
                            img={e.img}
                            name={e.name}
                            price={e.price}
                            size={e.size}
                          />
                        </motion.div>
                      );
                    })}
                </div>
              </section>
            </div>
            <div>
              <div className="sticky top-0  z-[1] backdrop-blur-md md:bg-white items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                  AI Generated By DeepAI Model!
                </h1>
                <div>{/* <IoCashOutline className={" w-6 h-6 "} /> */}</div>
              </div>

              <section
                aria-labelledby="products-heading"
                className="pb-24 pt-6"
              >
                <div className="grid grid-cols-1  gap-x-8 gap-y-10 sm:grid-cols-2 md:grid-cols-3 ">
                  {cups
                    .filter((e) => e.type === "AI Cup! - Deep AI Model")
                    .map((e) => {
                      return (
                        <motion.div
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <ProductCups
                            id={e.id}
                            img={e.img}
                            name={e.name}
                            price={e.price}
                            size={e.size}
                          />
                        </motion.div>
                      );
                    })}
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
