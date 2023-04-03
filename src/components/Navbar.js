import React, { useState, Fragment, useEffect } from "react";
import {
  IoCartOutline,
  IoClose,
  IoLogOutOutline,
  IoMenuOutline,
} from "react-icons/io5";
import { Link } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import logo from "../Assets/logo.png";
function Navbar() {
  const [open, setOpen] = useState(false);
  const [isAiVisible, setIsAiVisible] = useState(true);
  return (
    <>
      <div
        className={` ${
          !isAiVisible && "hidden"
        } relative isolate flex items-center gap-x-6 overflow-hidden bg-gray-50 px-6 py-2.5 sm:px-3.5 sm:before:flex-1`}
      >
        <div
          className="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
          aria-hidden="true"
        >
          <div
            className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
            style={{
              clipPath:
                "polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)",
            }}
          />
        </div>
        <div
          className="absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
          aria-hidden="true"
        >
          <div
            className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
            style={{
              clipPath:
                "polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)",
            }}
          />
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <p className="text-sm leading-6  text-gray-900 ">
            <strong className="font-semibold">PreCup Ai</strong>
            <svg
              viewBox="0 0 2 2"
              className="mx-2 inline h-0.5 w-0.5 fill-current"
              aria-hidden="true"
            >
              <circle cx={1} cy={1} r={1} />
            </svg>
            Lost in inspiration? Generate variety paper cup desings for your
            business
          </p>
          <Link
            to="/ai"
            className="flex-none rounded-full bg-gray-900 px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
          >
            Try now <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
        <div className="flex flex-1 justify-end">
          <button
            type="button"
            onClick={() => {
              setIsAiVisible(!isAiVisible);
            }}
            className="-m-3 p-3 focus-visible:outline-offset-[-4px]"
          >
            <span className="sr-only">Dismiss</span>
            <XMarkIcon className="h-5 w-5 text-gray-900" aria-hidden="true" />
          </button>
        </div>
      </div>
      <nav
        className={`sticky z-[2] backdrop-blur-sm md:flex hidden top-0 flex items-center w-[100%] p-4 pt-8 px-16  justify-between `}
      >
        <div>
          <Link to="/" className="flex items-center text-xl font-bold">
            <img src={logo} className=" w-12 h-12" />
            PreCup
          </Link>
        </div>
        <ul className="flex  gap-8">
          <li>
            <Link to="/">Home </Link>
          </li>
          <li>
            <Link to="/products">Products </Link>
          </li>
          <li>
            <Link to="/profile">Profile </Link>
          </li>
          <li>
            <Link className to="/ai">
              Our Ai{" "}
            </Link>
          </li>
        </ul>
        <div className="flex items-center gap-4">
          <Link to="/cart">
            <IoCartOutline className=" w-6 h-6 text-center  block m-auto" />
          </Link>
          <Link
            to="/login"
            className={
              "bg-black text-white rounded-lg p-1  flex items-center gap-2"
            }
          >
            <IoLogOutOutline className=" w-6 h-6 text-center  block m-auto" />
          </Link>
        </div>
      </nav>

      {/* For mobile version */}
      <nav
        className={`sticky z-[2]  backdrop-blur-sm md:hidden top-0 flex items-center w-[100%] p-4 pt-8 px-8  justify-between `}
      >
        <div>
          <Link to="/" className=" text-xl flex items-center font-bold">
            <img src={logo} className=" w-12 h-12" />
            PreCup
          </Link>
        </div>

        <div className="flex items-center gap-8">
          <Link to="/cart">
            <IoCartOutline className="w-6 h-6 text-center  block m-auto" />
          </Link>
          <button
            onClick={() => {
              setOpen(!open);
            }}
          >
            <IoMenuOutline className="w-6 h-6" />
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
                        <Link
                          to="/"
                          className=" hover:scale-110  ease-in-out duration-300"
                        >
                          Home
                        </Link>
                        <Link
                          to="/products"
                          className=" hover:scale-110  ease-in-out duration-300"
                        >
                          Products
                        </Link>
                        <Link
                          to="/profile"
                          className=" hover:scale-110  ease-in-out duration-300"
                        >
                          Profile
                        </Link>
                        <Link
                          to="/ai"
                          className=" hover:scale-110  ease-in-out duration-300"
                        >
                          AI
                        </Link>
                        <Link
                          to="/login"
                          className={
                            "bg-black text-white text-xl rounded-lg p-1  flex items-center gap-2"
                          }
                        >
                          <IoLogOutOutline className=" w-10 h-10 text-center m-auto  block" />
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
