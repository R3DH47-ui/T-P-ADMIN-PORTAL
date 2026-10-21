'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import AuthScreen from '@/components/auth/AuthScreen';

export default function CompanyAuthRoute() {
  const router = useRouter();

  const handleAuthenticated = () => {
    router.push('/company');
  };

  return <AuthScreen onAuthenticated={handleAuthenticated} initialPortalType="company" />;
}
