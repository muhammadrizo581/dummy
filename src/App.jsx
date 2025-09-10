import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Foods from "./Components/Foods";
import Products from "./Components/Products";
import Users from "./Components/Users";

export default function App() {
  return (
    <>
      <Header />
      <main className="p-6">
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/foods" element={<Foods />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </main>
    </>
  );
}
