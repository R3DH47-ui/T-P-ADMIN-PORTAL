'use client';

import React, { useState, useEffect, createContext, useContext } from 'react';
import AuthScreen from './AuthScreen';
import { getAdminMe, adminLogout } from '@/lib/authApi';

const AdminAuthContext = createContext(null);

export function useAdminAuth() {
  return useContext(AdminAuthContext);
}

export default function AuthGuard({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function checkAuth() {
      try {
        // Fast optimistic hydration from localStorage
        const cachedUser = localStorage.getItem('rimt_admin_user');
        if (cachedUser) {
          try {
            setAdmin(JSON.parse(cachedUser));
          } catch (e) {}
        }

        // Verify with live backend session
        const liveAdmin = await getAdminMe();
        if (isMounted) {
          if (liveAdmin) {
            setAdmin(liveAdmin);
          } else {
            setAdmin(null);
            localStorage.removeItem('rimt_admin_user');
            localStorage.removeItem('rimt_admin_token');
          }
        }
      } catch (err) {
        console.warn('Auth check error:', err);
        if (isMounted) {
          setAdmin(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSignOut = async () => {
    await adminLogout();
    setAdmin(null);
  };

  const handleAuthenticated = (adminData) => {
    setAdmin(adminData);
  };

  // Full-screen institutional loading indicator while checking session
  if (loading) {
    return (
      <div className="min-h-screen w-full bg-[#F7F4EE] flex flex-col items-center justify-center relative overflow-hidden select-none">
        <div className="relative w-16 h-16 rounded-2xl bg-white p-2.5 shadow-md flex items-center justify-center border border-[#E5DEC9] mb-4 animate-pulse">
          <img
            alt="RIMT Logo"
            className="h-full w-full object-contain"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC19AQmgWL-gUir-ndxuF4jup3xrY5qBj64LUXlgD9RJE6IRXQl7Uw9pQ_cKLppluBw_ZpAaGrjzn9MM_33NeGwHee4byWlTWDl3k3ZH1ODJBySdYc1fAI_vX56Ks6Y_9rsUeDdfxgzgIKrwrKJRiXXd43-8bqVix0hb9h_KVy-x333S8_1qgi_MEC7mirEEZdIdmjQrVxbxQLOkTdB8x3YlxqRC5q1PzKVSKVWY-4rZfKHynQQWu8oLw4z4yUS8WIugw"
          />
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-[#5C5246]">
          <span className="w-3.5 h-3.5 border-2 border-[#7A1D27] border-t-transparent rounded-full animate-spin" />
          Verifying Institutional Session...
        </div>
      </div>
    );
  }

  // Not authenticated: render the AuthScreen
  if (!admin) {
    return <AuthScreen onAuthenticated={handleAuthenticated} />;
  }

  // Authenticated: provide context and render admin app
  return (
    <AdminAuthContext.Provider
      value={{
        admin,
        setAdmin,
        signOut: handleSignOut,
        isAuthenticated: true,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}
