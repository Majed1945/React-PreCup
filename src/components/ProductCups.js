import React from "react";
import { Link } from "react-router-dom";
import { IoArrowForward, IoCloseOutline } from "react-icons/io5";
import { auth, db } from "../firebase-config";
import { doc, deleteDoc, collection, getDocs } from "firebase/firestore";
import showToast from "./Toast";
import EditProductCup from "./EditProductCup";
function ProductCups(props) {
  const admin =
    auth.currentUser !== null
      ? auth.currentUser.email === "admin@gmail.com"
      : false;

  async function deleteProduct() {
    try {
      await deleteDoc(doc(db, "products", props.id));
      const cupsCollectionRef = collection(db, "products");
      const getProducts = async () => {
        const data = await getDocs(cupsCollectionRef);
        props.setCups(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };
      getProducts();
      showToast("Successfully deleted, ", "success");
    } catch (error) {
      showToast("error, " + error.code, "error");
    }
  }
  return (
    <div className="w-full col-span-1  relative group translation hover:-translate-y-1  ease-in-out duration-150 border-gray-100 border rounded-3xl overflow-hidden  ">
      <div className="w-[300px] h-[300px] flex m-auto">
        <img src={props.img} className={"m-auto w-[250px]"} />
      </div>
      <div className="p-4 flex bg-gray-50 justify-between ">
        <div>
          <h1 className="font-bold text-lg">{props.name}</h1>
          <p className="items-center gap-1 flex ">
            {props.price + "SAR"}
            <span className=" text-[0.8rem]  font-extralight">
              (per 1000pcs)
            </span>
          </p>
        </div>
        <div>
          <p>{props.size}oz</p>
        </div>
      </div>
      {admin && !props.isAiPage ? (
        <div className="flex">
          <div className=" bg-black w-full justify-center text-center text flex items-center font-thin p-3   gap-1 text-white ">
            <EditProductCup setCups={props.setCups} id={props.id} />
          </div>
          <button
            onClick={() => {
              deleteProduct();
            }}
            className=" bg-red-500 w-full justify-center text-center text flex items-center font-thin p-3   gap-1 text-white  rounded-br-md"
          >
            <IoCloseOutline />
          </button>
        </div>
      ) : props.isAiPage && admin ? (
        <div className="bg-black  justify-center text-center text flex items-center font-thin p-3   gap-1 text-white  rounded-b-md">
          <p>View Only</p>
        </div>
      ) : (
        <Link to={`/productDetails/${props.id}`}>
          <div className="bg-black  justify-center text-center text flex items-center font-thin p-3   gap-1 text-white  rounded-b-md">
            <p>CUSTOMIZE</p>
            <IoArrowForward className="transition group-hover:translate-x-1 " />
          </div>
        </Link>
      )}
    </div>
  );
}

export default ProductCups;
