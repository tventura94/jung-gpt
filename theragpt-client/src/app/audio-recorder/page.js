'use client';

import { useContext } from 'react';
import { Context } from 'store/Provider';
import AudioRecorder from 'components/AudioRecorder';
import Footer from 'components/Footer';

export default function AudioRecorderPage() {
  const { user, subscriptionStatus, setUserEmail, setSubscriptionStatus } =
    useContext(Context);

  return (
    <>
      <AudioRecorder
        user={user}
        subscriptionStatus={subscriptionStatus}
        setUserEmail={setUserEmail}
        setSubscriptionStatus={setSubscriptionStatus}
      />
      <Footer />
    </>
  );
}
