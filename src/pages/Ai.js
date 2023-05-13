import React from "react";
import Navbar from "../components/Navbar";
import { useState } from "react";
import showToast from "../components/Toast";
import axios from "axios";
import { motion } from "framer-motion";
import ProductCups from "../components/ProductCups";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase-config";

const { Configuration, OpenAIApi } = require("openai");
const deepai = require("deepai");

function Ai() {
  const [AIProducts, setAIProducts] = useState([]);
  const [prompt, setPrompt] = useState("");

  deepai.setApiKey("d11f386a-bbab-4040-9775-f91c44c23675");
  const configuration = new Configuration({
    apiKey: "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",
  });
  const openai = new OpenAIApi(configuration);

  async function produceDell2AIOutput() {
    showToast(
      "Please wait about 4 seconds for the first AI model, and more 2 secods for the second!",
      "success"
    );
    try {
      const response = await openai.createImage({
        prompt: `3D cup mockup for a paper cup with a white background. The cup should have ${prompt} printed on its cover.`,
        n: 4,
        size: "1024x1024",
      });
      const dell2Products = [];
      for (let index = 0; index < response.data.data.length; index++) {
        const docRef = await addDoc(collection(db, "products"), {
          description: prompt,
          img: response.data.data[index].url,
          name: "AI Generated Cup!",
          price: 20,
          size: "M",
          type: "AI Cup! - Dell-2 Model",
        });
        const docId = docRef.id; // Retrieve the ID of the added document
        const data = {
          description: `3D cup mockup for a paper cup with a white background. The cup has ${prompt} printed on its cover.`,
          img: response.data.data[index].url,
          name: "AI Generated Cup!",
          price: 20,
          size: "M",
          type: "AI Cup! - Dell-2 Model",
          id: docId, // Include the ID in the object
        };
        dell2Products.push(data);
      }
      setAIProducts(dell2Products);
      produceDeepAIOutput();
    } catch (error) {
      showToast("error, " + error, "error");
    }
  }
  async function produceDeepAIOutput() {
    const response = await axios({
      method: "post",
      url: "https://api.deepai.org/api/text2img",
      headers: {
        "api-key": "d11f386a-bbab-4040-9775-f91c44c23675",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: `text="3D cup mockup for a paper cup with a white background. The cup has ${prompt} printed on its cover."&size=1024x1024&background=white&invert=false&brightness=0&grid_size=1`,
    });

    const docRef = await addDoc(collection(db, "products"), {
      description: prompt,
      img: response.data.output_url,
      name: "AI Generated Cup!",
      price: 20,
      size: "M",
      type: "AI Cup! - Deep AI Model",
    });
    const docId = docRef.id; // Retrieve the ID of the added document
    const data = {
      description: `3D cup mockup for a paper cup with a white background. The cup has ${prompt} printed on its cover.`,
      img: response.data.output_url,
      name: "AI Generated Cup!",
      price: 20,
      size: "M",
      type: "AI Cup! - Deep AI Model",
      id: docId, // Include the ID in the object
    };
    setAIProducts((prev) => [...prev, data]);
  }
  function generateOutput() {
    if (prompt === "") {
      showToast("Please type something", "warning");
    } else {
      produceDell2AIOutput();
    }
  }
  return (
    <>
      <Navbar className="z-10" />
      <div className="bg-white z-0 relative">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h1 className=" text-center mb-8 text-3xl md:text-5xl md:mb-16 font-extrabold ">
            Let the Ai do the job.😎
          </h1>
          <div className="flex">
            <input
              onChange={(e) => {
                setPrompt(e.target.value);
              }}
              type="text"
              class="bg-gray-50 border mb-8 border-r-0 rounded-tl-lg rounded-bl-lg rounded-tr-0  rounded-br-0 border-gray-300 text-gray-900 sm:text-sm focus:border-black focus:ring-0  w-full "
              placeholder="e.g. three red stripes with black dotted pattren"
              required=""
            />
            <button
              onClick={generateOutput}
              class="bg-black text-white border p-2 md:px-6 mb-8  rounded-tr-lg  border-l-0 rounded-br-lg  border-black sm:text-sm focus:ring-0   "
            >
              ✨Generate✨
            </button>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {AIProducts.map((product) => {
              return (
                <motion.div key={product.id}>
                  <ProductCups
                    isAiPage={true}
                    id={product.id}
                    img={product.img}
                    name={product.name}
                    price={product.price}
                    size={product.size}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Ai;
