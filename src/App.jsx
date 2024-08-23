import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import ShareDetail from "./pages/ShareDetail/ShareDetail";
import ShareMain from "./pages/ShareMain/ShareMain";
import ShareNew from "./pages/ShareNew/ShareNew";
import SignUp from "./pages/SignUp/SignUp";
import CommunityMain from "./pages/CommunityMain/CommunityMain";
import CommunityNew from "./pages/CommunityNew/CommunityNew";
import CommunityDetail from "./pages/CommunityDetail/CommunityDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/shareDetail/:id" element={<ShareDetail />} />
        <Route path="/shareMain" element={<ShareMain />} />
        <Route path="/shareNew" element={<ShareNew />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/communityMain" element={<CommunityMain />} />
        <Route path="/communityNew" element={<CommunityNew />} />
        <Route path="/communityDetail/:id" element={<CommunityDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
