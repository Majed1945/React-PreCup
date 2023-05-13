import noonCup from "../Assets/noonCup.png";
import logo from "../Assets/logo.png";
import { Link } from "react-router-dom";
import { IoArrowForwardOutline } from "react-icons/io5";
import { useState } from "react";
import showToast from "../components/Toast";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase-config";
import { setDoc, doc } from "firebase/firestore";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const handleRegisterUser = async (e) => {
    e.preventDefault();
    if (email === "" || password === "" || name === "" || address === "") {
      showToast("Please fill all fields", "error");
    } else {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        updateProfile(auth.currentUser, {
          displayName: name,
        })
          .then(() => {})
          .catch((error) => {
            // An error occurred
            // ...
          });
        const userRef = doc(db, "users", auth.currentUser.uid);
        await setDoc(userRef, {
          name: name,
          email: email,
          id: auth.currentUser.uid,
          address,
        });
        showToast("User registered successfully!", "success");

        navigate("/", {
          state: {
            message: "User registered successfully!",
            status: "success",
          },
        });
      } catch (error) {
        showToast(`${error.code}, please try again`, "error");
      }
    }
  };

  return (
    <div className="flex flex-col relative md:flex-row ">
      <Link to="/">
        <img className=" absolute top-0 right-0 w-16  h-16" src={logo} alt="A nice logo!" />
      </Link>
      <div className="w-full  md:w-[50%] flex items-center overflow-hidden md:h-screen bg-gray-100">
        <div>
          <img src={noonCup} className="md:scale-150 z-[-999]  " alt="A nice cup!"/>
        </div>
      </div>
      <div className=" w-full  md:w-[50%] z-[2] p-6 md:p-16 my-auto">
        <div className=" my-4  mt-8 text-6xl font-serif">
          <h1>Register</h1>
        </div>
        <div>
          <p className="font-extralight tracking-widest ">
            Find your perfect papercup today - Register now!
          </p>
          <p className="font-extralight tracking-widest ">
            Already an account?{" "}
            <Link to="/login" className="underline">
              Login
            </Link>
          </p>
        </div>
        <form className="flex flex-col gap-4 mt-10">
          <div className="flex  border-b-[1px] pb-2 border-black justify-between items-center ">
            <h2>Name</h2>
            <input
              name="name"
              className="w-full ml-[58px]"
              type={"text"}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="flex  border-b-[1px] pb-2 border-black justify-between items-center ">
            <h2>Email</h2>
            <input
              name="email"
              className="w-full ml-[63px]"
              type={"text"}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="flex  border-b-[1px] pb-2 border-black justify-between items-center ">
            <h2>Password</h2>
            <input
              name="password"
              className="w-full ml-8"
              type={"password"}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="flex  border-b-[1px] pb-2 border-black justify-between items-center ">
            <h2>Address</h2>
            <input
              name="address"
              className="w-full ml-8"
              type={"text"}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
          </div>
          <div className=" flex flex-col md:flex-row gap-4 font-serif justify-between items-center ">
            <div className="rounded-full  md:text-2xl w-full px-[3px] bg-black text-white">
              <button
                onClick={handleRegisterUser}
                className="flex row m-0 p-2 center w-full items-center justify-between"
              >
                <h1>Register</h1>
                <IoArrowForwardOutline className="bg-black text-white rounded-[50%] border-[1px] h-10 w-10 float-right" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Register;
