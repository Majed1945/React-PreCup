import React, { useEffect, useState } from "react";
import {
  IoAddOutline,
  IoArrowBackOutline,
  IoArrowForwardOutline,
  IoRemoveOutline,
} from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { db, auth } from "../firebase-config.js";
import { doc, getDoc, addDoc, collection } from "firebase/firestore";
import showToast from "../components/Toast";

function ProductDetails() {
 const navigate = useNavigate();
  const [productInfo, setProductInfo] = useState({});
  const { id } = useParams();
  const getProductById = async (productId) => {
    const productRef = doc(db, "products", productId);
    const productDoc = await getDoc(productRef);
    return productDoc.data();
  };

  useEffect(() => {
    getProductById(id).then((info) => {
      setProductInfo(info);
    });
  }, []);
  const [count, setCount] = useState(1);
  async function handleAddToCart(e) {
    e.preventDefault();
    if (auth.currentUser === null) {
      navigate("/login");
    } else {
      // Add a new document in collection "cities"
      try {
        await addDoc(collection(db, "cart"), {
          name: productInfo.name,
          id: auth.currentUser.uid,
          price: productInfo.price,
          descritpion: productInfo.description,
          img: productInfo.img,
          size: productInfo.size,
          type: productInfo.type,
          quantity: count,
        });
        showToast("Successfully added!", "success");
        navigate("/products");
      } catch (error) {
        showToast(`error,${error}`, "error");
      }
      // navigate("/cart");
    }
  }
  return (
    <div className="flex flex-col md:flex-row ">
      <div className="w-full md:w-[50%] flex items-center bg-black justify-center overflow-hidden md:h-screen ">
        <div>
          <img
            src={productInfo.img}
            className="md:scale-150 z-[-999]  w-[300px] h-[300px] object-cover"
          />
        </div>
      </div>
      <div className=" w-full md:w-[50%] z-[2] p-6 md:p-16 my-auto">
        <Link
          onClick={() => {
            navigate(-1);
          }}
          className="flex items-center gap-2"
        >
          <div className=" border-[1px] rounded-[50%] border-black p-2">
            <IoArrowBackOutline />
          </div>
          <h3>Back</h3>
        </Link>
        <div className=" my-4 mt-8 text-5xl font-serif">
          <h1>{productInfo.name}</h1>
        </div>
        <div>
          <p className="font-extralight tracking-widest ">
            {productInfo.description}
          </p>
        </div>
        <div className="flex flex-col gap-4 mt-10">
          <div className="flex  border-b-[1px] pb-2 border-black justify-between items-center ">
            <h2>Size</h2>
            <select className="border-0  focus:ring-0">
              <option>Large</option>
              <option>Medium</option>
              <option>Small</option>
            </select>
          </div>
          <div className="flex  border-b-[1px] pb-2 border-black justify-between items-center ">
            <h2>Amount</h2>
            <div className="flex justify-end rounded-xl px-[3px] border-[1px] border-black items-center">
              <div>
                <button
                  className="  border-black rounded-[50%] border-[1px] items-center flex justify-center w-5 h-5"
                  onClick={() => {
                    setCount((previous) => {
                      return previous + 1;
                    });
                  }}
                >
                  <IoAddOutline className="w-full h-full" />
                </button>
              </div>
              <div>
                <input
                  className=" text-center p-0 border-0 w-5"
                  type="text"
                  value={count}
                />
              </div>
              <div>
                <button
                  className="  bg-black text-white rounded-[50%] border-[1px] items-center flex justify-center w-5 h-5"
                  onClick={() => {
                    setCount((previous) => {
                      if (previous === 1) {
                        return 1;
                      } else {
                        return previous - 1;
                      }
                    });
                  }}
                >
                  <IoRemoveOutline className="w-full h-full" />
                </button>
              </div>
            </div>
          </div>
          <div className="flex  border-b-[1px] pb-2 border-black justify-between items-center ">
            <h2>Quntity</h2>
            <h2>{productInfo.price} Sar / 1.200 Pcs</h2>
          </div>
          <div className="flex  border-b-[1px] pb-2 border-black justify-between items-center ">
            <h2>Price</h2>
            <h2>{productInfo.price * count} SAR</h2>
          </div>
          <div className="flex gap-4 justify-between items-center ">
            <div className="rounded-full  md:text-2xl w-full px-[3px] border-[1px] border-black">
              <Link
                to="/checkOut"
                className="flex m-0 p-2 items-center justify-between"
              >
                <h1>Check Out</h1>
                <IoArrowForwardOutline className="bg-black text-white rounded-[50%] border-[1px] h-10 w-10" />
              </Link>
            </div>
            <div className="rounded-full md:text-2xl w-full px-[3px] border-[1px] border-black">
              <button
                onClick={handleAddToCart}
                className="flex row m-0 p-2 center w-full items-center justify-between"
              >
                <h1>Add to Cart</h1>
                <IoArrowForwardOutline className="bg-black text-white rounded-[50%] border-[1px] h-10 w-10 float-right" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
