'use client';

import { useContext } from 'react';
import { Context } from 'store/Provider';
import AudioRecorder from 'components/AudioRecorder';
import Footer from 'components/Footer';

export default function AudioRecorderPage() {
  const { user, subscriptionStatus, setUser, setSubscriptionStatus } =
    useContext(Context);

  return (
    <>
      <AudioRecorder
        user={user}
        subscriptionStatus={subscriptionStatus}
        setUser={setUser}
        setSubscriptionStatus={setSubscriptionStatus}
      />
      <Footer />
    </>
  );
}
