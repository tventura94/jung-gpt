'use client';

import { useContext } from 'react';
import { Context } from 'store/Provider';
import AccountSettings from 'components/AccountSettings';
import Footer from 'components/Footer';

export default function AccountSettingsPage() {
  const { user, setUser, subscriptionStatus, setSubscriptionStatus } =
    useContext(Context);

  return (
    <>
      <AccountSettings
        user={user}
        setUser={setUser}
        subscriptionStatus={subscriptionStatus}
        setSubscriptionStatus={setSubscriptionStatus}
      />
      <Footer />
    </>
  );
}
