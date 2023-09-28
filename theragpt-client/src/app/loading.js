import { CircularProgress } from '@mui/material';

export default function RootLoading() {
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
