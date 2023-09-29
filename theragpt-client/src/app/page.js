'use client';

import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';
import { Context } from 'store/Provider';

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

  return null;
}
