import { cookies } from 'next/headers';
import Script from 'next/script';
import Provider from 'store/Provider';
import { getAuth } from 'libs/firebase-admin';
import { Box } from '@mui/material';
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
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4736749900506771"
          crossorigin="anonymous"
        />
        <Script
          src="https://kit.fontawesome.com/625c8351aa.js"
          crossorigin="anonymous"
        />
        <Script async src="https://js.stripe.com/v3/pricing-table.js" />
        <Script
          src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js"
          integrity="sha256-WBkoXOwTeyKclOHuWtc+i2uENFpDZ9YPdf5Hf+D7ewM="
          crossorigin=""
        />
        <Script src="https://apis.google.com/js/platform.js" async defer />
      </head>
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
