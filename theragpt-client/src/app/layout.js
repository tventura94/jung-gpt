import Script from 'next/script';
import Provider from 'store/Provider';
import { Box } from '@mui/material';
import 'styles/globals.css';
import '@fortawesome/fontawesome-free/css/all.css';

export const metadata = {
  title: 'Jung GPT | Emotional Reflection Feedback Tool | AI Chat Support',
  description:
    'JungGPT is an emotional reflection feedback tool that helps users navigate their emotions and bring clarity to their inner lives.',
  icons: {
    icon: '/images/will-3.png',
  },
  other: {
    'google-signin-client_id':
      '1032806576342-417perrakl4nt74get9p7nhgdq09d4lr.apps.googleusercontent.com.apps.googleusercontent.com',
  },
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-L8FEQH21J8"
        />
        <Script id="gtm-script">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag() {
              dataLayer.push(arguments);
            }
            gtag('js', new Date());
            gtag('config', 'G-L8FEQH21J8');
          `}
        </Script>
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
        <Script src="https://apis.google.com/js/platform.js" async defer />
      </head>
      <body>
        <Provider user={null}>
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
