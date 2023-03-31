import Login from "./pages/Login";
import Register from "./pages/Register";
import ShoppingCart from "./pages/ShoppingCart";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Ai from "./pages/Ai";
import ProductDetails from "./pages/ProductDetails";
function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/cart" element={<ShoppingCart />} />
      <Route exact path="/products" element={<Products />} />
      <Route exact path="/productDetails" element={<ProductDetails />} />
      <Route exact path="/ai" element={<Ai />} />
    </Routes>
  );
}

export default App;
