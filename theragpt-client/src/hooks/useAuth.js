import { useParams, usePathname, useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { routes } from 'libs/routes';
import { Context } from 'store/Provider';

export default function useAuth() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const { user, subscriptionStatus } = useContext(Context);
  const route = routes.find((route) => route.path(params) === pathname);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(false);

    if (route.auth === true) {
      if (!user) {
        router.push('/signin');
        return;
      }
    }

    if (route.auth === false) {
      if (user) {
        router.push('/selector');
        return;
      }
    }

    if (pathname === '/audio-recorder') {
      if (
        user?.uid !== '9ODBIC3Ir5bWiZGb4B2MnatmVMY2' &&
        user?.uid !== 'vg9Y3qcy2VcGiueua2SHzk30Srl2'
      ) {
        router.push('/selector');
        return;
      }
    }

    if (pathname === '/dbt') {
      if (subscriptionStatus !== 'active') {
        router.push('/selector');
        return;
      }
    }

    setShow(true);
  }, [pathname, user, subscriptionStatus]);

  return [show];
}
