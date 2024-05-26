import "./App.css";
import LoginPage from "../src/pages/LoginPage";
import HomepyPage from './pages/homepyPage.js';
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginCallback from "./components/LoginPage/LoginCallback.js";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 기본 경로를 /login으로 설정 */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/login/auth/callback/google" element={<LoginCallback />} />
        <Route path="/homepy" element={<HomepyPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
