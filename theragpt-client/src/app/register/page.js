'use client';

import { useContext } from 'react';
import { Context } from 'store/Provider';
import Register from 'components/Register';
import Footer from 'components/Footer';

export default function RegisterPage() {
  const { setUser } = useContext(Context);

  return (
    <>
      <Register setUser={setUser} />
      <Footer />
    </>
  );
}
