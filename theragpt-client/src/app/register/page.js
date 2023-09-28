'use client';

import { useContext } from 'react';
import { Context } from 'store/Provider';
import Register from 'components/Register';
import Footer from 'components/Footer';

export default function RegisterPage() {
  const { setUserEmail } = useContext(Context);

  return (
    <>
      <Register setUserEmail={setUserEmail} />
      <Footer />
    </>
  );
}
