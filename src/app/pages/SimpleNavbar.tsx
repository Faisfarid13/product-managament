"use client"

import React from 'react';
import { useAuth } from '../../utils/auth';

interface SimpleNavbarProps {
  username?: string;
}

export function SimpleNavbar({ username }: SimpleNavbarProps) {
  const { logout } = useAuth();

  return (
    <nav className="text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-black"><h1 className="text-2xl font-semibold">Management Product</h1></div>
        
        {username && (
          <div className="flex items-center">
            <span className="mr-4 text-black text-md font-semibold">Halo, {username}</span>
            <button 
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 hover:shadow-md text-white px-3 py-1 rounded"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}