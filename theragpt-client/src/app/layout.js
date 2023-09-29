import Provider from 'store/Provider';
import { Box } from '@mui/material';
import { cookies } from 'next/headers';
import { getAuth } from 'libs/firebase-admin';
import 'styles/globals.css';
import '@fortawesome/fontawesome-free/css/all.css';

export const metadata = {
  title: 'Jung GPT | Emotional Reflection Feedback Tool | AI Chat Support',
  icons: {
    icon: '/images/will-3.png',
  },
};

export default async function RootLayout({ children }) {
  let user;

  try {
    const session = cookies().get('session')?.value || '';
    const decodedClaims = await getAuth().verifySessionCookie(session, true);
    user = { uid: decodedClaims.uid, email: decodedClaims.email };
  } catch (error) {
    user = null;
  }

  return (
    <html lang="en">
      <head></head>
      <body>
        <Provider user={user}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100vh',
              justifyContent: 'space-between',
            }}
          >
            {children}
          </Box>
        </Provider>
      </body>
    </html>
  );
}
