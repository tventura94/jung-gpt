'use client';

import { useContext } from 'react';
import { Context } from 'store/Provider';
import Footer from 'components/Footer';
import Selector from 'components/Selector';

export default function SelectrPage() {
  const { user, subscriptionStatus, setUserEmail, setSubscriptionStatus } =
    useContext(Context);

  return (
    <>
      <Selector
        user={user}
        subscriptionStatus={subscriptionStatus}
        setUserEmail={setUserEmail}
        setSubscriptionStatus={setSubscriptionStatus}
      />
      <Footer />
    </>
  );
}
