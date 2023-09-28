'use client';

import { useContext } from 'react';
import { Context } from 'store/Provider';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from 'components/Fire';

export default function Auth() {
  const { user, userEmail, subscriptionStatus, setUser, setUserEmail } =
    useContext(Context);

  React.useEffect(() => {
    const unSubscribeAuth = onAuthStateChanged(
      auth,
      async (authenticatedUser) => {
        if (authenticatedUser) {
          setUser(authenticatedUser);
          setUserEmail(authenticatedUser);
        } else {
          setUser(null);
          setUserEmail(null);
        }
      }
    );
    return unSubscribeAuth;
  }, [user, userEmail, subscriptionStatus]);

  return null;
}
