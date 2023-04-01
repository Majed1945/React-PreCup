import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Payment from "./pages/CheckOut";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Confirmation from "./pages/Confirmation";
function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/cart" element={<Cart />} />
      <Route exact path="/profile" element={<Profile />} />
      <Route exact path="/checkOut" element={<Payment />} />
      <Route exact path="/confirmation" element={<Confirmation />} />

    </Routes>
  );
}

export default App;
