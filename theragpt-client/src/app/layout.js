import Provider from 'store/Provider';
import { Box } from '@mui/material';
import 'styles/globals.css';
import '@fortawesome/fontawesome-free/css/all.css';

export const metadata = {
  title: 'Jung GPT | Emotional Reflection Feedback Tool | AI Chat Support',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head></head>
      <body>
        <Provider>
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
