'use client';

import { useContext } from 'react';
import { Context } from 'store/Provider';
import Dashboard from 'components/Dashboard';

export default function DashboardPage() {
  const { user, subscriptionStatus, setUser, setSubscriptionStatus } =
    useContext(Context);

  return (
    <Dashboard
      user={user}
      subscriptionStatus={subscriptionStatus}
      setUser={setUser}
      setSubscriptionStatus={setSubscriptionStatus}
    />
  );
}
