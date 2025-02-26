"use client"

import { useState } from "react";
import ProductPage from "./pages/ProductPage";
import { SimpleNavbar } from "./pages/SimpleNavbar";
import { SideBar } from "./pages/SideBar";
import { InputProductPage } from "./pages/InputProductPage";
import { LoginPage } from "./pages/LoginPage";
import { useAuth } from "../utils/auth";

export default function Home() {
  const [activePage, setActivePage] = useState("ProductPage");
  const { user, loading } = useAuth();

  // loading spinner jika status masih proses login
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  // Jika user belum/gagal login, tampilkan halaman login
  if (!user) {
    return <LoginPage />;
  }

  // content utama jika user berhasil login
  return (
    <div className="flex flex-col h-screen">
      <div className="w-full bg-[#F5F6F7] shadow-md">
        <SimpleNavbar username={user.username} />
      </div>
      
      <div className="flex flex-grow mt-4">
        <div className="w-1/5 bg-[#F5F6F7]">
          <SideBar onNavigate={setActivePage} activePage={activePage} />
        </div>
        
        <div className="w-4/5 p-4">
          {activePage === 'InputProductPage' && <InputProductPage/> }
          {activePage === 'ProductPage' && <ProductPage/> }
        </div>
      </div>
    </div>
  );
}
