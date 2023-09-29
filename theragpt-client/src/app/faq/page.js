'use client';

import { useContext } from 'react';
import { Context } from 'store/Provider';
import Faq from 'components/Faq';
import Footer from 'components/Footer';

export default function FaqPage() {
  const { user, setUser, setSubscriptionStatus } = useContext(Context);

  return (
    <>
      <Faq
        user={user}
        setUser={setUser}
        setSubscriptionStatus={setSubscriptionStatus}
      />
      <Footer />
    </>
  );
}
