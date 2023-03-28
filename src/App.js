import Login from "./pages/Login";
import Register from "./pages/Register";
import ShoppingCart from "./pages/ShoppingCart";
import { Rout, Route, Routes } from "react-router-dom";
import Test from "./pages/Test";
function App() {
  return (
    <Routes>
      <Route exact path="/login" element={<Login/>} />
      <Route exact path="/register" element={<Register/>} />
      <Route exact path="/cart" element={<ShoppingCart/>} />
    </Routes>
  );
}

export default App;
