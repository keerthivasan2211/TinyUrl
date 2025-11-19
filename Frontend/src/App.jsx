import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/DashBoard";
import Stats from "./pages/Stats";
import "./index.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { ToastContainer } from "react-toastify";
export default function App() {
  return (
    <BrowserRouter>
    
<Header />
    <div className="content">
       <ToastContainer position="top-right" autoClose={2000} />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/code/:code" element={<Stats />} />
      </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}
