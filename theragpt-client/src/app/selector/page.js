'use client';

import { useContext } from 'react';
import { Context } from 'store/Provider';
import Footer from 'components/Footer';
import Selector from 'components/Selector';

export default function SelectrPage() {
  const { user, subscriptionStatus, setUser, setSubscriptionStatus } =
    useContext(Context);

  return (
    <>
      <Selector
        user={user}
        setUser={setUser}
        subscriptionStatus={subscriptionStatus}
        setSubscriptionStatus={setSubscriptionStatus}
      />
      <Footer />
    </>
  );
}
