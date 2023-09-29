'use client';

import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';
import { Context } from 'store/Provider';
import { CircularProgress } from '@mui/material';

export default function HomePage() {
  const { user } = useContext(Context);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/signin');
    }

    if (user) {
      router.push('/selector');
    }
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <CircularProgress
        style={{
          color: '#5E7E91',
        }}
        size={100}
      />
    </div>
  );
}
