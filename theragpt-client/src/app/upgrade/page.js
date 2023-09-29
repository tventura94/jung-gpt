'use client';

import { useContext } from 'react';
import { Context } from 'store/Provider';
import Footer from 'components/Footer';
import Upgrade from 'components/Upgrade';

export default function UpgradePage() {
  const { user, setUser, subscriptionStatus, setSubscriptionStatus } =
    useContext(Context);

  return (
    <>
      <Upgrade
        user={user}
        setUser={setUser}
        subscriptionStatus={subscriptionStatus}
        setSubscriptionStatus={setSubscriptionStatus}
      />
      <Footer />
    </>
  );
}
