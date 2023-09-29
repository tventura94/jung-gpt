'use client';

import { useContext } from 'react';
import { Context } from 'store/Provider';
import Footer from 'components/Footer';
import SignIn from 'components/SignIn';

export default function SignInPage() {
  const { setUser } = useContext(Context);

  return (
    <>
      <SignIn setUser={setUser} />
      <Footer />
    </>
  );
}
