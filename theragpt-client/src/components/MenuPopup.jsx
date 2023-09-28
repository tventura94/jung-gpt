import { useRouter } from 'next/navigation';
import * as React from 'react';
import { signOut } from 'firebase/auth';
import { ManageAccounts as ManageAccountsIcon } from '@mui/icons-material';
import {
  Button,
  MenuItem,
  Typography,
  Drawer,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { auth } from 'components/Fire';

export default function MenuPopupState({ setUserEmail, user }) {
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  function handleSignOut() {
    signOut(auth).then(() => {
      setUserEmail(null);
      router.push('/login');
    });
  }

  function handleUpgrade() {
    router.push('/upgrade');
  }

  function accountSettings() {
    router.push('/account-settings');
  }

  function backButton() {
    router.push('/selector');
  }
  function Faq() {
    router.push('/faq');
  }

  return (
    <React.Fragment>
      <Button
        style={{
          backgroundColor: '#5B6B7F',
          borderLeft: '1px solid silver',
          height: '3rem',
          width: '3rem',
          boxShadow: 'none',
          borderRadius: '0rem',
          color: 'whitesmoke',
          margin: 0,
          padding: 0,
        }}
        variant="contained"
        onClick={() => setIsDrawerOpen(true)}
      >
        <ManageAccountsIcon />
      </Button>

      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <MenuItem onClick={() => setIsDrawerOpen(false)}>
          <Typography
            color="textSecondary"
            variant="body1"
            fontFamily={'Montserrat'}
            sx={{ fontSize: isMobile ? '.75rem' : '1rem' }}
          >
            Logged in as {user.email}
          </Typography>
        </MenuItem>

        <MenuItem
          sx={{
            fontFamily: 'League Spartan',
            fontSize: isMobile ? '1.3rem' : '1.3rem',
          }}
          onClick={backButton}
        >
          Dashboard
        </MenuItem>
        <MenuItem
          sx={{
            fontFamily: 'League Spartan',
            fontSize: isMobile ? '1.3rem' : '1.3rem',
          }}
          onClick={Faq}
        >
          Learn More (FAQ)
        </MenuItem>
        <MenuItem
          sx={{
            fontFamily: 'League Spartan',
            fontSize: isMobile ? '1.3rem' : '1.3rem',
          }}
          onClick={accountSettings}
        >
          Account Settings
        </MenuItem>
        <MenuItem
          sx={{
            fontFamily: 'League Spartan',
            fontSize: isMobile ? '1.4rem' : '1.5rem',
            color: '#5484AB',
          }}
          onClick={handleUpgrade}
        >
          <b>Upgrade</b>
        </MenuItem>
        <MenuItem
          sx={{
            fontFamily: 'League Spartan',
            fontSize: isMobile ? '1.3rem' : '1.3rem',
          }}
          onClick={handleSignOut}
        >
          Logout
        </MenuItem>
      </Drawer>
    </React.Fragment>
  );
}
