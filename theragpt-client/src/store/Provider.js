'use client';

import { createContext, useState } from 'react';

export const Context = createContext();

export default function Provider({ children }) {
  const [user, setUser] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [subscriptionStatus, setSubscriptionStatus] = useState('inactive'); // add this line

  return (
    <Context.Provider
      value={{
        user,
        userEmail,
        subscriptionStatus,
        setUser,
        setUserEmail,
        setSubscriptionStatus,
      }}
    >
      {children}
    </Context.Provider>
  );
}
