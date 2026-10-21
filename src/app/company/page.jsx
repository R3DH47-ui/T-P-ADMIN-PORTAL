'use client';

import React from 'react';
import { AdminPortalDashboard } from '../page';
import AuthGuard from '@/components/auth/AuthGuard';

export default function CompanyPortalRoute() {
  return (
    <AuthGuard initialPortalType="company">
      <AdminPortalDashboard />
    </AuthGuard>
  );
}
