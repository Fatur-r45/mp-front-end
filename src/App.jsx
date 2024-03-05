import { Login, Register } from "./pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./route";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
