import { Dialog, Transition } from "@headlessui/react";
import { IoAdd } from "react-icons/io5";
import { IoCreateOutline } from "react-icons/io5";
import {
  collection,
  setDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { IoPersonOutline } from "react-icons/io5";
import { auth, db } from "../firebase-config";
import { updateProfile, updateEmail } from "firebase/auth";
import { toast } from "react-toastify";
import showToast from "./Toast";
import { Fragment, useState, useRef } from "react";
import { Navigate } from "react-router-dom";
function EditUser(props) {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [fName, setFname] = useState("");
  const [lName, setLname] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

  async function getUserById() {
    const user = await (await getDoc(doc(db, "users", props.id))).data();
    console.log(user);
    setEmail(user.email);
    setPhone(user.phone);
    setAddress(user.address);
    setCity(user.city);
    setFname(user.name);
    setState(user.state);
    setZip(user.zip);
  }

  function handleUpdateProfile(e) {
    e.preventDefault();
    if (
      email === "" ||
      phone === "" ||
      fName === "" ||
      lName === "" ||
      address === "" ||
      city === "" ||
      state === "" ||
      zip === ""
    ) {
      showToast("Please add all fields", "error");
    } else {
      updateEmail(auth.currentUser, email)
        .then(() => {
          return updateProfile(auth.currentUser, {
            displayName: fName + " " + lName,
          });
        })
        .then(() => {
          const userRef = doc(db, "users", auth.currentUser.uid);
          return updateDoc(userRef, {
            name: fName + " " + lName,
            email,
            phone,
            address,
            city,
            zip,
            state,
          });
        })
        .then(() => {
          showToast("User Successfully updated!", "success");
        })
        .catch((error) => {
          toast(`error, ${error.code}`, "error");
        });
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
        onClick={() => getUserById()}
        className="bg-black w-full justify-center text-center text flex items-center font-thin p-2 rounded-lg text-white "
      >
        <IoCreateOutline />
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
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 sm:mx-0 sm:h-10 sm:w-10">
                        <IoCreateOutline
                          className="h-6 w-6  text-gray-400"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-4 w-full text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <form className="flex flex-col">
                          <div className="space-y-12">
                            <div className="">
                              <h2 className="text-2xl pb-6 border-b font-bold  leading-7 text-gray-900 mb-6 flex items-center gap-1">
                                <IoPersonOutline className="inline" />{" "}
                                {"Edit " + fName}
                              </h2>
                              <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-3 ">
                                  <label
                                    htmlFor="first-name"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    First name
                                  </label>
                                  <div className="mt-2">
                                    <input
                                      onChange={(e) => {
                                        setFname(e.target.value);
                                      }}
                                      type="text"
                                      name="first-name"
                                      id="first-name"
                                      value={fName}
                                      autoComplete="given-name"
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                                    />
                                  </div>
                                </div>

                                <div className="sm:col-span-3">
                                  <label
                                    htmlFor="last-name"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    Last name
                                  </label>
                                  <div className="mt-2">
                                    <input
                                      onChange={(e) => {
                                        setLname(e.target.value);
                                      }}
                                      type="text"
                                      value={lName}
                                      name="last-name"
                                      id="last-name"
                                      autoComplete="family-name"
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                                    />
                                  </div>
                                </div>

                                <div className="sm:col-span-3">
                                  <label
                                    htmlFor="email"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    Email address
                                  </label>
                                  <div className="mt-2">
                                    <input
                                      onChange={(e) => {
                                        setEmail(e.target.value);
                                      }}
                                      id="email"
                                      name="email"
                                      value={email}
                                      type="email"
                                      autoComplete="email"
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                                    />
                                  </div>
                                </div>

                                <div className="sm:col-span-3">
                                  <label
                                    htmlFor="email"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    Phone Number
                                  </label>
                                  <div className="mt-2">
                                    <input
                                      onChange={(e) => {
                                        setPhone(e.target.value);
                                      }}
                                      id="email"
                                      value={phone}
                                      name="email"
                                      type="email"
                                      autoComplete="email"
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                                    />
                                  </div>
                                </div>

                                <div className="col-span-full">
                                  <label
                                    htmlFor="street-address"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    Street address
                                  </label>
                                  <div className="mt-2">
                                    <input
                                      onChange={(e) => {
                                        setAddress(e.target.value);
                                      }}
                                      type="text"
                                      value={address}
                                      name="street-address"
                                      id="street-address"
                                      autoComplete="street-address"
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                                    />
                                  </div>
                                </div>

                                <div className="sm:col-span-2 sm:col-start-1">
                                  <label
                                    htmlFor="city"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    City
                                  </label>
                                  <div className="mt-2">
                                    <input
                                      onChange={(e) => {
                                        setCity(e.target.value);
                                      }}
                                      type="text"
                                      name="city"
                                      value={city}
                                      id="city"
                                      autoComplete="address-level2"
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                                    />
                                  </div>
                                </div>

                                <div className="sm:col-span-2">
                                  <label
                                    htmlFor="region"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    State / Province
                                  </label>
                                  <div className="mt-2">
                                    <input
                                      onChange={(e) => {
                                        setState(e.target.value);
                                      }}
                                      type="text"
                                      value={state}
                                      name="region"
                                      id="region"
                                      autoComplete="address-level1"
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                                    />
                                  </div>
                                </div>

                                <div className="sm:col-span-2">
                                  <label
                                    htmlFor="postal-code"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    ZIP / Postal code
                                  </label>
                                  <div className="mt-2">
                                    <input
                                      onChange={(e) => {
                                        setZip(e.target.value);
                                      }}
                                      type="text"
                                      value={zip}
                                      name="postal-code"
                                      id="postal-code"
                                      autoComplete="postal-code"
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      onClick={handleUpdateProfile}
                      className="inline-flex w-full justify-center rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 sm:ml-3 sm:w-auto"
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

export default EditUser;
