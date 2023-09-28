'use client';

import { useContext } from 'react';
import { Context } from 'store/Provider';
import Dbt from 'components/Dbt';
import Footer from 'components/Footer';

export default function DbtPage() {
  const { user, subscriptionStatus, setUserEmail, setSubscriptionStatus } =
    useContext(Context);

  return (
    <>
      <Dbt
        user={user}
        subscriptionStatus={subscriptionStatus}
        setUserEmail={setUserEmail}
        setSubscriptionStatus={setSubscriptionStatus}
      />
      <Footer />
    </>
  );
}
