import Login from "./pages/Login";
import Register from "./pages/Register";
import ShoppingCart from "./pages/ShoppingCart";
import Profile from "./pages/Profile";
import { Rout, Route, Routes } from "react-router-dom";
function App() {
  return (
    <Routes>
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/cart" element={<ShoppingCart />} />
      <Route exact path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;
