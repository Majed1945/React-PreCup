import React from "react";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoAdd } from "react-icons/io5";
import { IoCreateOutline } from "react-icons/io5";
import { db } from "../firebase-config.js";
import { collection, setDoc, getDocs, doc, getDoc } from "firebase/firestore";
import showToast from "./Toast";
function EditProductCup(props) {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("");
  const [imageURL, setImageURL] = useState("");

  async function getProductById() {
    const product = await (await getDoc(doc(db, "products", props.id))).data();
    setName(product.name);
    setDescription(product.description);
    setType(product.type);
    setPrice(product.price);
    setSize(product.size);
    setImageURL(product.img);
  }

  const handleChange = (event) => {
    setType(event.target.value);
  };
  async function editProduct() {
    try {
      if (
        name === "" ||
        description === "" ||
        type === "" ||
        price === "" ||
        size === "" ||
        imageURL === ""
      ) {
        showToast("Please fill all fields ", "error");
      } else {
        await setDoc(
          doc(db, "products", props.id),
          {
            name: name,
            description: description,
            type: type,
            price: price,
            size: size,
            img: imageURL,
          },
          { merge: true }
        );
        const cupsCollectionRef = collection(db, "products");
        const getProducts = async () => {
          const data = await getDocs(cupsCollectionRef);
          props.setCups(
            data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          );
        };
        getProducts();
        showToast("Successfully added edited product, ", "success");
        setOpen(false);
      }
    } catch (error) {
      showToast("error, " + error.code, "error");
    }
  }
  return (
    <div
      onClick={() => {
        setOpen(true);
      }}
      className="w-full  col-span-1  cursor-pointer  relative group  ease-in-out duration-150  overflow-hidden  "
    >
      <button
        onClick={() => getProductById()}
        className="bg-black w-full justify-center text-center text flex items-center font-thin p-3   gap-1 text-white  rounded-bl-md"
      >
        <p className="transition group-hover:translate-x-1 ">EDIT</p>
        <IoCreateOutline className="transition group-hover:translate-x-1 " />
      </button>

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
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 sm:mx-0 sm:h-10 sm:w-10">
                        <IoCreateOutline
                          className="h-6 w-6  text-gray-400"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-4 w-full text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          {"Edit " + name}
                        </Dialog.Title>
                        <div className="mt-2 flex flex-col">
                          <div className="mt-2 ">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                              Name
                            </label>
                            <div className="flex  rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-400 sm:max-w-md">
                              <input
                                type="text"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                className="block  flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                placeholder="e.g. Double walled paper cup"
                              />
                            </div>
                          </div>
                          <div className="mt-2 ">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                              Description
                            </label>
                            <div className="flex  rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-400 sm:max-w-md">
                              <textarea
                                type="text"
                                value={description}
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
                                  value={"paper"}
                                  checked={type === "paper"}
                                  onChange={handleChange}
                                  className="h-4 w-4 border-gray-300 text-gray-600 focus:ring-gray-600"
                                />
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                  Paper
                                </label>
                              </div>
                              <div className="flex items-center gap-x-3">
                                <input
                                  type="radio"
                                  name="type"
                                  value={"plastic"}
                                  checked={type === "plastic"}
                                  onChange={handleChange}
                                  className="h-4 w-4 border-gray-300 text-gray-600 focus:ring-gray-600"
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
                                  checked={type === "foam"}
                                  onChange={handleChange}
                                  className="h-4 w-4 border-gray-300 text-gray-600 focus:ring-gray-600"
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
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-400 sm:max-w-md">
                              <input
                                type="number"
                                value={price}
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
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-400 sm:max-w-md">
                              <input
                                type="number"
                                value={size}
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
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-400 sm:max-w-md">
                              <input
                                type="text"
                                value={imageURL}
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
                      className="inline-flex w-full justify-center rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 sm:ml-3 sm:w-auto"
                      onClick={() => editProduct()}
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
    </div>
  );
}

export default EditProductCup;
