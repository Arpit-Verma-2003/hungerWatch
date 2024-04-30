import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AfterSign from "./pages/aftersignin";
import Upload from "./pages/upload";
import Fetch from "./pages/fetch";
import FireStorepg from "./pages/fireStore";
import Navbar from "./pages/navbar";
import "./App.css";
import Home from "./pages/home";
import About from "./pages/about"; 
import Location from "./pages/location";
import ChatBot from "./pages/ChatBot";
import Donation from "./pages/Donation";
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/Sign" element={<AfterSign />}></Route>
          <Route path="/upload" element={<Upload />}></Route>
          <Route path="/fetch" element={<Fetch />}></Route>
          <Route path="/firestore" element={<FireStorepg />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/location" element={<Location/>}></Route>
          <Route path="/chatbot" element={<ChatBot/>}></Route>
          <Route path="/donate" element={<Donation/>}></Route>
        </Routes>
      </div>
    </Router>
  );
}
export default App;
