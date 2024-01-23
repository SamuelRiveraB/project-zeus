import ChatPage from "./Pages/ChatPage";
import ListPage from "./Pages/ListPage";
import LoginPage from "./Pages/LoginPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProfilePage from "./Pages/ProfilePage";
import Layout from "./Pages/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<LoginPage />}></Route>
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<ListPage />}></Route>
          <Route path="chat" element={<ChatPage />}></Route>
          <Route path="profile" element={<ProfilePage />}></Route>
        </Route>
        <Route path="*" element={<Navigate to="/Dashboard" />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
