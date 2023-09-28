'use client';

import { useContext } from 'react';
import { Context } from 'store/Provider';
import Footer from 'components/Footer';
import Terms from 'components/Terms';

export default function TermsPage() {
  const { user, setUserEmail } = useContext(Context);

  return (
    <>
      <Terms user={user} setUserEmail={setUserEmail} />
      <Footer />
    </>
  );
}
