'use client';

import { useContext } from 'react';
import { Context } from 'store/Provider';
import AccountSettings from 'components/AccountSettings';
import Footer from 'components/Footer';

export default function AccountSettingsPage() {
  const { user, setUser } = useContext(Context);

  return (
    <>
      <AccountSettings user={user} setUser={setUser} />
      <Footer />
    </>
  );
}
