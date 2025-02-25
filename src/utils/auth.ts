import { useState, useEffect } from 'react';

export interface User {
  token: string;
  username: string;
}

// Fungsi untuk login ke Baserow
export async function loginToBaserow(email: string, password: string): Promise<User> {
  try {
    const response = await fetch('https://api.baserow.io/api/user/token-auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    
    // Simpan token ke localStorage
    console.log('ini token baserow'+localStorage.getItem('baserow_token'));
    localStorage.setItem('baserow_token', data.token);
    localStorage.setItem('baserow_user', JSON.stringify({ 
      token: data.token, 
      username: email.split('@')[0] 
    }));
    
    return { token: data.token, username: email.split('@')[0] };
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

// fungsi untuk mengelola autentikasi
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('baserow_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const user = await loginToBaserow(email, password);
      setUser(user);
      return user;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('baserow_token');
    localStorage.removeItem('baserow_user');
    setUser(null);
    window.location.reload();
  };

  return { user, login, logout, loading };
}

// Fungsi mengambil token baserow
export const getBaserowToken = () => {
  return localStorage.getItem('baserow_token');
};