'use client';

import { useContext } from 'react';
import { Context } from 'store/Provider';
import Footer from 'components/Footer';
import Terms from 'components/Terms';

export default function TermsPage() {
  const { user, setUser } = useContext(Context);

  return (
    <>
      <Terms user={user} setUser={setUser} />
      <Footer />
    </>
  );
}
