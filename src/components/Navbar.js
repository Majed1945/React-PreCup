import React, { useState, Fragment, useEffect } from "react";
import { IoCartOutline, IoClose, IoMenuOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
function Navbar() {
  //   const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [open, setOpen] = useState(false);

  //   const handleScroll = () => {
  //     const currentScrollPos = window.scrollY;

  //     if (currentScrollPos > prevScrollPos) {
  //       setVisible(false);
  //     } else {
  //       setVisible(true);
  //     }

  //     setPrevScrollPos(currentScrollPos);
  //   };

  //   useEffect(() => {
  //     window.addEventListener("scroll", handleScroll);

  //     return () => window.removeEventListener("scroll", handleScroll);
  //   });
  return (
    <>
      <nav
        className={`sticky z-[2] backdrop-blur-sm md:flex hidden ${
          visible ? "top-0" : "0"
        } flex align-center w-[100%] p-4 pt-8 px-16  justify-between `}
      >
        <div>
          <Link className=" font-bold">PreCup</Link>
        </div>
        <ul className="flex gap-8">
          <li>
            <Link>Home </Link>
          </li>
          <li>
            <Link>Products </Link>
          </li>
          <li>
            <Link>Services </Link>
          </li>
          <li>
            <Link>About us </Link>
          </li>
        </ul>
        <Link className="pt-1">
          <IoCartOutline className=" text-center  block m-auto" />
        </Link>
      </nav>
      <nav
        className={`sticky z-[2]  backdrop-blur-sm md:hidden  ${
          visible ? "top-0" : "0"
        } flex align-center w-[100%] p-4 pt-8 px-8  justify-between `}
      >
        <div>
          <Link className=" font-bold">PreCup</Link>
        </div>

        <div className="flex gap-8">
          <Link className="pt-1">
            <IoCartOutline className=" text-center  block m-auto" />
          </Link>
          <button
            onClick={() => {
              setOpen(!open);
            }}
          >
            <IoMenuOutline />
          </button>
        </div>
      </nav>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none  fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto  relative w-screen max-w-md">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-in-out duration-500"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in-out duration-500"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="absolute left-0 top-0  flex pr-2 pt-4 ml-6 sm:pr-4">
                        <button
                          type="button"
                          className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                          onClick={() => setOpen(false)}
                        >
                          <IoClose className=" text-black" />
                        </button>
                      </div>
                    </Transition.Child>
                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                      <div className="relative flex text-[5rem]  flex-col mt-6 flex-1 px-4 sm:px-6">
                        <Link className=" hover:scale-110  ease-in-out duration-300">
                          Home
                        </Link>
                        <Link className=" hover:scale-110  ease-in-out duration-300">
                          Products
                        </Link>
                        <Link className=" hover:scale-110  ease-in-out duration-300">
                          Services
                        </Link>
                        <Link className=" hover:scale-110  ease-in-out duration-300">
                          About us
                        </Link>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

export default Navbar;
