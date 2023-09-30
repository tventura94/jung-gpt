import { useParams, usePathname, useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { routes } from 'libs/routes';
import { Context } from 'store/Provider';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from 'libs/firebase';

export default function useAuth() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const { user, setUser, subscriptionStatus } = useContext(Context);
  const route = routes.find((route) => route.path(params) === pathname);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const unSubscribeAuth = onAuthStateChanged(
      auth,
      async (authenticatedUser) => {
        setShow(false);

        if (user?.uid !== authenticatedUser?.uid) {
          if (authenticatedUser) {
            setUser({
              uid: authenticatedUser.uid,
              email: authenticatedUser.email,
            });
          } else {
            setUser(null);
          }
        }

        if (route.auth === true) {
          if (!authenticatedUser) {
            router.push('/signin');
            return;
          }
        }
        if (route.auth === false) {
          if (authenticatedUser) {
            router.push('/selector');
            return;
          }
        }
        if (pathname === '/audio-recorder') {
          if (
            authenticatedUser?.uid !== '9ODBIC3Ir5bWiZGb4B2MnatmVMY2' &&
            authenticatedUser?.uid !== 'vg9Y3qcy2VcGiueua2SHzk30Srl2'
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
      }
    );
    return unSubscribeAuth;
  }, [user?.uid, subscriptionStatus]);

  return [show];
}
