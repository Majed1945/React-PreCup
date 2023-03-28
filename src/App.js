import Login from "./pages/Login";
import Register from "./pages/Register";
import { Rout, Route, Routes } from "react-router-dom";
function App() {
  return (
    <Routes>
      <Route exact path="/login" element={<Login/>} />
      <Route exact path="/register" element={<Register/>} />
    </Routes>
  );
}

export default App;
