'use client';

import { useContext } from 'react';
import { Context } from 'store/Provider';
import { routes } from 'libs/routes';
import { useParams, usePathname, useRouter } from 'next/navigation';

export default function RootTemplate({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const { user } = useContext(Context);
  const route = routes.find((route) => route.path(params) === pathname);

  if (route.auth === true) {
    if (!user) {
      router.push('/signin');
      return null;
    }
  }

  if (route.auth === false) {
    if (user) {
      router.push('/selector');
      return null;
    }
  }

  if (pathname === '/audio-recorder') {
    if (
      user?.uid !== '9ODBIC3Ir5bWiZGb4B2MnatmVMY2' ||
      user?.uid !== 'vg9Y3qcy2VcGiueua2SHzk30Srl2'
    ) {
      router.push('/selector');
      return null;
    }
  }

  return children;
}
