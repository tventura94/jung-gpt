'use client';

import { useContext } from 'react';
import { Context } from 'store/Provider';
import AccountSettings from 'components/AccountSettings';
import Footer from 'components/Footer';

export default function AccountSettingsPage() {
  const { user, setUserEmail } = useContext(Context);

  return (
    <>
      <AccountSettings user={user} setUserEmail={setUserEmail} />
      <Footer />
    </>
  );
}
