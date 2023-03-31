import { useState } from "react";
import { motion, useIsPresent } from "framer-motion";
import {
  FOAM_CUPS_PRODUCTS,
  PAPER_CUPS_PRODUCTS,
  PLASTIC_CUPS_PRODUCTS,
} from "../ProductsData.js";
import ProductCups from "../components/ProductCups";
import Navbar from "../components/Navbar";

export default function Products() {
  return (
    <>
      <Navbar />
      <div className="bg-white">
        <div>
          <main className="mx-auto max-w-7xl px-8 md:px-16  ">
            <div>
              <div className="sticky top-0  z-[1] backdrop-blur-md md:bg-white items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                  Paper Cups
                </h1>
                <div>{/* <IoCashOutline className={" w-6 h-6 "} /> */}</div>
              </div>

              <section
                aria-labelledby="products-heading"
                className="pb-24 pt-6"
              >
                <h2 id="products-heading" className="sr-only">
                  Products
                </h2>

                <div className="grid grid-cols-1  gap-x-8 gap-y-10 sm:grid-cols-2 md:grid-cols-3 ">
                  {PAPER_CUPS_PRODUCTS.map((e) => {
                    return (
                      <ProductCups
                        img={e.img}
                        name={e.name}
                        price={e.price}
                        size={e.size}
                      />
                    );
                  })}
                </div>
              </section>
            </div>

            <div>
              <div className="sticky top-0  z-[1] backdrop-blur-md md:bg-white items-baseline justify-between border-b border-gray-200 pb-6 pt-20">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                  Plastic Cups
                </h1>
                <div>{/* <IoCashOutline className={" w-6 h-6 "} /> */}</div>
              </div>

              <section
                aria-labelledby="products-heading"
                className="pb-24 pt-6"
              >
                <div className="grid grid-cols-1  gap-x-8 gap-y-10 sm:grid-cols-2 md:grid-cols-3 ">
                  {PLASTIC_CUPS_PRODUCTS.map((e) => {
                    return (
                      <ProductCups
                        img={e.img}
                        name={e.name}
                        price={e.price}
                        size={e.size}
                      />
                    );
                  })}
                </div>
              </section>
            </div>
            <div>
              <div className="sticky top-0  z-[1] backdrop-blur-md md:bg-white items-baseline justify-between border-b border-gray-200 pb-6 pt-20">
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
                  {FOAM_CUPS_PRODUCTS.map((e) => {
                    return (
                      <ProductCups
                        img={e.img}
                        name={e.name}
                        price={e.price}
                        size={e.size}
                      />
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
