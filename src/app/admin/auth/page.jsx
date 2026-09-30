'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import AuthScreen from '@/components/auth/AuthScreen';

export default function AdminAuthRoute() {
  const router = useRouter();

  const handleAuthenticated = () => {
    router.push('/');
  };

  return <AuthScreen onAuthenticated={handleAuthenticated} />;
}
