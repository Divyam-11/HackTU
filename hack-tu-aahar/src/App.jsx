import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Chatbot from "./components/ChatBot";
import DiseaseDetection from "./pages/Disease";
import Marketplace from "./pages/Marketplace";
function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/disease" element={<DiseaseDetection />} />
        <Route path="/marketplace" element={<Marketplace />} />
      </Routes>
      <Chatbot />
    </>
  );
}

export default App;
