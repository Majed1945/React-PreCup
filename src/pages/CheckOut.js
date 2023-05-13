import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { MdKeyboardArrowRight } from "react-icons/md";
import cupImage from "../Assets/KPG-cup.png";
import { auth, db } from "../firebase-config";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  setDoc,
  addDoc,
} from "firebase/firestore";
import showToast from "../components/Toast";
import { toast } from "react-toastify";

const CheckOut = () => {
  const [cards, setCards] = useState([]);
  const [month, setMonth] = useState("01");
  const [year, setYear] = useState("2023");
  const [items, setItems] = useState([]);
  const [shippingOption, setShippingOption] = useState("standard");
  const [cardName, setCardName] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardSecurityCode, setCardSecurityCode] = useState("");
  const [selectedCard, setSelectedCard] = useState("");
  const [user, setUser] = useState({});

  const navigate = useNavigate();
  useEffect(() => {
    const getUser = async () => {
      const data = await getDocs(collection(db, "users"));
      setUser(
        data.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }))
          .filter((doc) => doc.id === auth.currentUser.uid)
      );
    };
    getUser();
  }, []);
  useEffect(() => {
    const getCartContent = async () => {
      const cartCollectionRef = collection(db, "cart");
      const data = await getDocs(cartCollectionRef);
      const filteredData = data.docs
        .map((doc) => ({
          ...doc.data(),
          productId: doc.id,
        }))
        .filter((doc) => auth.currentUser.uid === doc.id);
      setItems(filteredData);
    };
    getCartContent();
  }, []);
  useEffect(() => {
    const getCards = async () => {
      const cardCollectionRef = collection(db, "card");
      const data = await getDocs(cardCollectionRef);
      const cards = data.docs
        .map((doc) => ({
          ...doc.data(),
          cardId: doc.id,
        }))
        .filter((doc) => auth.currentUser.uid === doc.userId);
      setCards(cards);
    };
    getCards();
  }, []);
  async function handleOrder() {
    if (selectedCard === "") {
      if (cards.length === 0) {
        showToast("Please add a card");
      } else {
        showToast("Please select a card");
      }
    } else {
      try {
        const docRef = await addDoc(collection(db, "order"), {
          userId: auth.currentUser.uid,
          userName: auth.currentUser.displayName,
          paymentMethod: selectedCard,
          orderDetail: items,
          price: calculateTotalPrice(),
          shippedTo: user[0].address,
          date: new Date().toLocaleString(),
        });
        showToast("Thanks for your order", "success");

        for (let i = 0; i < items.length; i++) {
          await deleteDoc(doc(db, "cart", items[i].productId));
        }

        navigate("/confirmation", { state: { currentOrderId: docRef.id } });
      } catch (error) {
        showToast("error, ", error.code, "error");
      }
    }
  }
  function calculateTotalPrice() {
    let sum = 0;
    items.forEach((item) => {
      sum += item.price * item.quantity;
    });
    if (shippingOption === "standard") {
      sum += 10;
    } else if (shippingOption === "fast") {
      sum += 30;
    }

    return sum;
  }

  async function handleAddCard(e) {
    e.preventDefault();
    if (
      cardName === "" ||
      cardHolder === "" ||
      cardNumber === "" ||
      cardSecurityCode === "" ||
      month === "" ||
      year === ""
    ) {
      toast("Please fill all card information fields", "error");
    } else {
      try {
        await addDoc(collection(db, "card"), {
          cardName,
          cardHolder,
          cardNumber,
          cardSecurityCode,
          month,
          year,
          userId: auth.currentUser.uid,
        });
        showToast("Card successfully added!", "success");
        setCards((prev) => {
          return [
            ...prev,
            {
              cardName,
              cardHolder,
              cardNumber,
              cardSecurityCode,
              month,
              year,
              userId: auth.currentUser.uid,
            },
          ];
        });
        setCardHolder("");
        setCardName("");
        setCardName("");
        setCardNumber("");
        setCardSecurityCode("");
      } catch (error) {
        showToast("error,", error, "error");
      }
    }
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-10">
        <div className="flex flex-col lg:flex-row  my-10">
          <div className="w-full lg:w-4/6 bg-white px-10 py-5">
            <div className="flex flex-row items-center ">
              <Link to="/cart">
                <h1 className="font-base text-md text-gray-400">Cart</h1>
              </Link>
              <MdKeyboardArrowRight className="mx-1 text-gray-400" />
              <h1 className="font-base text-md text-black">Check Out</h1>
              <MdKeyboardArrowRight className="mx-1 text-gray-400" />
              <h1 className="font-base  text-md text-gray-400">Confirmation</h1>
            </div>
            <div className="flex border-b py-8">
              <h1 className="font-bold text-2xl">Check Out</h1>
            </div>
            <form className="mt-10 flex flex-col space-y-4 ">
              <div>
                <label
                  htmlFor="card-name"
                  className="text-xs font-bold text-gray-500"
                >
                  Card Type
                </label>
                <input
                  onChange={(e) => {
                    setCardName(e.target.value);
                  }}
                  value={cardName}
                  type="text"
                  id="card-name"
                  name="card-name"
                  placeholder="VISA, Master Card"
                  className="mt-1 w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-black"
                />
              </div>
              <div>
                <label
                  htmlFor="card-holder"
                  className="text-xs font-bold text-gray-500"
                >
                  Card Holder
                </label>
                <input
                  value={cardHolder}
                  onChange={(e) => {
                    setCardHolder(e.target.value);
                  }}
                  type="text"
                  id="card-holder"
                  name="card-holder"
                  placeholder="Card Holder"
                  className="mt-1 w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-black"
                />
              </div>
              <div>
                <label
                  htmlFor="card-number"
                  className="text-xs font-bold text-gray-500"
                >
                  Card Number
                </label>
                <input
                  value={cardNumber}
                  onChange={(e) => {
                    setCardNumber(e.target.value);
                  }}
                  type="text"
                  id="card-number"
                  name="card-number"
                  placeholder="1234-5678-XXXX-XXXX"
                  className="w-full rounded border-gray-300 bg-gray-50 py-3 px-4 pr-10 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-black"
                />
                <img
                  src="/images/uQUFIfCYVYcLK0qVJF5Yw.png"
                  alt=""
                  className="absolute bottom-3 right-3 max-h-4"
                />
              </div>
              <div className="flex flex-col">
                <p className="text-xs font-bold text-gray-500 w-full">
                  Expiration date
                </p>
                <div className="grid grid-cols-3 gap-1 py-1">
                  <div className="w-full grid-span-1">
                    <label htmlFor="month" className="sr-only">
                      Select expiration month
                    </label>
                    <select
                      name="month"
                      id="month"
                      value={month}
                      className="w-full cursor-pointer rounded border-gray-300 py-3 px-4 bg-gray-50  text-sm shadow-sm outline-none transition focus:ring-2 focus:ring-black"
                    >
                      <option value="01">01</option>
                      <option value="02">02</option>
                      <option value="03">03</option>
                      <option value="04">04</option>
                      <option value="05">05</option>
                      <option value="06">06</option>
                      <option value="07">07</option>
                      <option value="08">08</option>
                      <option value="09">09</option>
                      <option value="10">10</option>
                      <option value="11">11</option>
                      <option value="12">12</option>
                    </select>
                  </div>

                  <div className="w-full grid-span-1">
                    <label htmlFor="year" className="sr-only">
                      Select expiration year
                    </label>
                    <select
                      name="year"
                      id="year"
                      value={year}
                      className="w-full cursor-pointer rounded border-gray-300 py-3 px-4 bg-gray-50  text-sm shadow-sm outline-none transition focus:ring-2 focus:ring-black"
                    >
                      <option value="2023">2023</option>
                      <option value="2024">2024</option>
                      <option value="2025">2025</option>
                      <option value="2026">2026</option>
                      <option value="2027">2027</option>
                      <option value="2028">2028</option>
                      <option value="2029">2029</option>
                      <option value="2030">2030</option>
                    </select>
                  </div>
                  <div className="w-full grid-span-1">
                    <label htmlFor="security-code" className="sr-only">
                      Security code
                    </label>
                    <input
                      value={cardSecurityCode}
                      onChange={(e) => {
                        setCardSecurityCode(e.target.value);
                      }}
                      type="text"
                      id="security-code"
                      name="security-code"
                      placeholder="Security code"
                      className="w-full  rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-black"
                    />
                  </div>
                </div>
                <div className="w-full ">
                  <button
                    onClick={handleAddCard}
                    className="mt-2 rounded-md bg-black py-3 px-4 text-sm font-bold text-white shadow-sm  w-full transition hover:bg-gray-900 "
                  >
                    Add
                  </button>
                </div>
              </div>
            </form>
            <div className="flex border-b pb-8 mt-6 mb-6">
              <h1 className="font-bold text-2xl">My Cards</h1>
            </div>
            <div className="flex flex-col gap-2">
              {cards.map((card) => (
                <div
                  key={card.userId}
                  className="flex items-center pl-4 border border-gray-200 rounded "
                >
                  <input
                    onClick={() => {
                      setSelectedCard(card.cardName);
                    }}
                    id="bordered-radio-1"
                    type="radio"
                    value=""
                    name="bordered-radio"
                    className="w-4 h-4 text-black bg-gray-100 border-gray-300 focus:ring-black "
                  />
                  <label
                    htmlFor="bordered-radio-1"
                    className="w-full py-4 ml-2 text-sm font-medium text-gray-900 "
                  >
                    {card.cardName}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div id="summary" className="w-full lg:w-2/6 px-8 py-10 lg:mt-[40px]">
            <h1 className="font-bold text-2xl border-b pb-8">Order Summary</h1>
            <div className="flex flex-col mt-5">
              <span className="font-bold text-sm uppercase">Your Order</span>
              {items.map((item) => {
                return (
                  <div
                    key={item.productId}
                    className="flex hover:bg-gray-100 -mx-8 px-6 py-5"
                  >
                    <div className="flex w-4/5">
                      <div className="w-20">
                        <img
                          className="h-24 object-cover"
                          src={item.img}
                          alt=""
                        />
                      </div>
                      <div className="flex flex-col justify-between ml-4 flex-grow">
                        <span className="font-bold text-sm">{item.name}</span>
                        <span className="text-gray-400  text-xs">
                          ${item.price}
                        </span>
                        <span className="text-gray-400 text-xs">
                          x{item.quantity}
                        </span>
                      </div>
                    </div>

                    <span className="text-center w-1/5 font-bold text-sm">
                      ${item.price * item.quantity}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="border-t mt-8">
              <div className="flex font-bold justify-between py-6 text-sm uppercase">
                <span>Grand Total</span>
                <span>${calculateTotalPrice()}</span>
              </div>

              <button
                onClick={handleOrder}
                className="mt-2 rounded-md bg-black py-3 px-4 text-sm font-bold text-white shadow-sm  w-full transition hover:bg-gray-900 "
              >
                Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CheckOut;
