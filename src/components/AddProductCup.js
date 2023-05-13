import React from "react";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoAdd } from "react-icons/io5";
import { IoAddCircle } from "react-icons/io5";
import { db } from "../firebase-config.js";
import { collection, addDoc } from "firebase/firestore";
import showToast from "./Toast";
function AddProductCup(props) {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("");
  const [imageURL, setImageURL] = useState("");
  async function addProduct() {
    try {
      await addDoc(collection(db, "products"), {
        name: name,
        description: description,
        type: type,
        price: price,
        size: size,
        img: imageURL,
      });
      showToast("Successfully added new product, ", "success");
    } catch (error) {
      showToast("error, " + error.code, "error");
    }
    setOpen(false);
  }
  return (
    <div
      onClick={() => {
        setOpen(true);
        setType(props.checked);
      }}
      className="w-full  col-span-1 hover:border-blue-500 cursor-pointer   relative group translation hover:-translate-y-1  ease-in-out duration-150 border-gray-200  border-dashed border-4 rounded-3xl overflow-hidden  "
    >
      <div className="justify-center h-full scale-[700%] text-gray-200 hover:text-blue-500 items-center flex ">
        <IoAddCircle />
      </div>

      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4  text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative w-full transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="flex-row sm:flex ">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                        <IoAdd
                          className="h-6 w-6  text-blue-400"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-4 w-full text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Add new product
                        </Dialog.Title>
                        <div className="mt-2 flex flex-col">
                          <div className="mt-2 ">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                              Name
                            </label>
                            <div className="flex  rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-400 sm:max-w-md">
                              <input
                                type="text"
                                onChange={(e) => setName(e.target.value)}
                                className="block  flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                placeholder="e.g. Double walled paper cup"
                              />
                            </div>
                          </div>
                          <div className="mt-2 ">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                              Description
                            </label>
                            <div className="flex  rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-400 sm:max-w-md">
                              <textarea
                                type="text"
                                onChange={(e) => setDescription(e.target.value)}
                                className="block  flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                placeholder="e.g. High quality double walled paper cup with strong feel"
                              />
                            </div>
                          </div>
                          <fieldset className="mt-3">
                            <legend className="text-sm font-semibold leading-6 text-gray-900">
                              Type
                            </legend>
                            <div className="flex gap-4">
                              <div className="flex items-center gap-x-3">
                                <input
                                  type="radio"
                                  name="type"
                                  readOnly
                                  checked={props.checked === "paper"}
                                  className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-600"
                                />
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                  Paper
                                </label>
                              </div>
                              <div className="flex items-center gap-x-3">
                                <input
                                  type="radio"
                                  name="type"
                                  readOnly
                                  value={"plastic"}
                                  checked={props.checked === "plastic"}
                                  className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-600"
                                />
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                  Plastic
                                </label>
                              </div>
                              <div className="flex items-center gap-x-3">
                                <input
                                  type="radio"
                                  name="type"
                                  value={"foam"}
                                  readOnly
                                  checked={props.checked === "foam"}
                                  disabled={props.checked !== "foam"}
                                  className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-600"
                                />
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                  Foam
                                </label>
                              </div>
                            </div>
                          </fieldset>

                          <div className="mt-2 ">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                              Price
                            </label>
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-400 sm:max-w-md">
                              <input
                                type="number"
                                onChange={(e) => setPrice(e.target.value)}
                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                placeholder="e.g. $3.2"
                              />
                            </div>
                          </div>
                          <div className="mt-2 ">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                              Size
                            </label>
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-400 sm:max-w-md">
                              <input
                                type="number"
                                onChange={(e) => setSize(e.target.value)}
                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                placeholder="e.g. 3.2 oz"
                              />
                            </div>
                          </div>
                          <div className="mt-2 ">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                              Image Link
                            </label>
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-400 sm:max-w-md">
                              <input
                                type="text"
                                onChange={(e) => setImageURL(e.target.value)}
                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                placeholder="e.g. https://i.imgur.com/OZcmwCub.jpg"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                      onClick={() => addProduct()}
                    >
                      Submit
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <div className="none">
        <div className="w-[300px] h-[300px] flex m-auto">
          <img className={"m-auto w-[250px]"} />
        </div>
        <div className="p-4 flex bg-gray-50 justify-between ">
          <div>
            <h1 className="font-bold text-lg">{"ssss"}</h1>
            <p className="items-center gap-1 flex ">
              SAR
              <span className=" text-[0.8rem]  font-extralight">
                (per 1000pcs)
              </span>
            </p>
          </div>
          <div>
            <p>oz</p>
          </div>
        </div>
        <div>
          <div className="bg-black  justify-center text-center text flex items-center font-thin p-3   gap-1 text-white  rounded-b-md">
            <p>CUSTOMIZE</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProductCup;
