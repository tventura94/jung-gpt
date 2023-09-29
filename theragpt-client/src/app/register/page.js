'use client';

import Register from 'components/Register';
import Footer from 'components/Footer';
import { useContext } from 'react';
import { Context } from 'store/Provider';

export default function RegisterPage() {
  const { setUser } = useContext(Context);

  return (
    <>
      <Register setUser={setUser} />
      <Footer />
    </>
  );
}
