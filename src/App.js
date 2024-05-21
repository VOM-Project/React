import "./App.css";
import LoginPage from "../src/pages/LoginPage";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginCallback from "../src/components/LoginPage/LoginCallback";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 기본 경로를 /login으로 설정 */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/login/auth/callback/google" element={<LoginCallback />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
