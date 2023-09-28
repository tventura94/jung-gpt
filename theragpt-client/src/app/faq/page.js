'use client';

import { useContext } from 'react';
import { Context } from 'store/Provider';
import Faq from 'components/Faq';
import Footer from 'components/Footer';

export default function FaqPage() {
  const { user, setUserEmail, setSubscriptionStatus } = useContext(Context);

  return (
    <>
      <Faq
        user={user}
        setSubscriptionStatus={setSubscriptionStatus}
        setUserEmail={setUserEmail}
      />
      <Footer />
    </>
  );
}
