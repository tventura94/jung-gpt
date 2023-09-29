import React, { useState, useEffect } from 'react';
import { collection, setDoc, doc } from 'firebase/firestore';
import { db, auth } from 'libs/firebase';
import { keyframes } from '@mui/system';
import { Box, Button, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-100%);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
    transform: translateX(0);
  }
  100% {
    opacity: 0;
    transform: translateX(100%);
  }
`;
const shake = keyframes`
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }
  
  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }

  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
`;

const WelcomeOverlay = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [job, setJob] = useState('');
  const [description, setDescription] = useState('');
  const [animate, setAnimate] = useState('in');
  const [isOverlayVisible, setIsOverlayVisible] = useState(true);

  // Auto-transition effect for step 5
  useEffect(() => {
    if (step === 6) {
      const timer = setTimeout(() => {
        setIsOverlayVisible(false); // Trigger the fade-out animation for the overlay
      }, 4500); // 5 seconds to allow the welcome text to be read
      return () => clearTimeout(timer);
    }
  }, [step]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (animate === 'out') {
        setStep((prev) => prev + 1);
        setAnimate('in');
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [animate]);

  const nextStep = () => {
    setAnimate('out');
  };

  const saveToFirebase = async (field, value) => {
    const user = auth.currentUser;
    if (user) {
      const userRef = doc(collection(db, 'users', user.uid, field));
      await setDoc(userRef, { value });
    }
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `url("/images/dec3.svg")`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'League Spartan, serif',
        opacity: isOverlayVisible ? 1 : 0,
        transition: 'opacity 1s ease',
        display: isOverlayVisible ? 'flex' : 'none', // Add this line
      }}
    >
      <Box
        sx={{
          fontSize: '24px',
          animation:
            animate === 'in'
              ? `${fadeIn} 1s forwards`
              : `${fadeOut} 1s forwards`,
        }}
      >
        {step === 1 && (
          <>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: isMobile ? '90%' : '',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <p
                style={{
                  fontSize: isMobile ? '20px' : '35px',
                  textAlign: isMobile ? 'center' : '',
                  marginLeft: isMobile ? '1rem' : '',
                }}
              >
                Hey there, Welcome to JungGPT! We're so excited you're here!{' '}
              </p>
              <Button
                sx={{
                  backgroundColor: 'white',
                  color: '#56778D',
                  borderRadius: '10em',
                  fontSize: '14px',
                  fontWeight: 600,
                  backgroundColor: '#E8E2DE',
                  padding: isMobile ? '.3em' : '1em 2em',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease-in-out',
                  border: '1px solid #2D2D2D',
                  boxShadow: '0 0 0 0 #2D2D2D',
                  marginTop: isMobile ? '3rem' : '4rem',
                  '&:hover': {
                    transform: 'translateY(-4px) translateX(-2px)',
                    boxShadow: '2px 5px 0 0 #2D2D2D',
                    backgroundColor: '#607E92',
                    color: 'whitesmoke',
                  },
                  '&:active': {
                    transform: 'translateY(2px) translateX(1px)',
                    boxShadow: '0 0 0 0 white',
                    color: '#607E92',
                  },
                  fontFamily: 'League Spartan, serif',
                  width: '20%',
                  display: 'flex',
                  justifySelf: 'flex-end',
                  alignSelf: 'flex-end',
                }}
                onClick={nextStep}
              >
                Next
              </Button>
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                margin: '0 auto',
                alignItems: 'center',
              }}
            >
              <p
                style={{
                  width: isMobile ? '90%' : '50%',
                  lineHeight: isMobile ? '' : '35px',
                  fontSize: isMobile ? '19px' : '22px',
                }}
              >
                JungGPT is an Emotional Reflection Tool designed to provide
                users feedback on their thoughts, feelings, and behaviors. By
                employing techniques of motivational interviewing, identifying
                cognitive distortions, and offering tailored advice, the tool
                fosters self-awareness and promotes personal growth, ensuring
                users gain insights that might otherwise remain unnoticed.
                <br />
                <br />
                Please understand - JungGPT is not intended to be used as a
                replacement for professional mental health services, but as an
                emotional aid in your daily life.
              </p>
              <Button
                sx={{
                  backgroundColor: 'white',
                  color: '#56778D',
                  borderRadius: '10em',
                  fontSize: '14px',
                  fontWeight: 600,
                  backgroundColor: '#E8E2DE',
                  padding: isMobile ? '.3em' : '1em 2em',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease-in-out',
                  border: '1px solid #2D2D2D',
                  boxShadow: '0 0 0 0 #2D2D2D',
                  marginTop: '4rem',
                  '&:hover': {
                    transform: 'translateY(-4px) translateX(-2px)',
                    boxShadow: '2px 5px 0 0 #2D2D2D',
                    backgroundColor: '#607E92',
                    color: 'whitesmoke',
                  },
                  '&:active': {
                    transform: 'translateY(2px) translateX(1px)',
                    boxShadow: '0 0 0 0 white',
                    color: '#607E92',
                  },
                  fontFamily: 'League Spartan, serif',
                  width: isMobile ? '30%' : '10%',
                }}
                onClick={nextStep}
              >
                Next
              </Button>
            </div>
          </>
        )}
        {step === 3 && (
          <>
            <div
              style={{
                display: 'flex',
                margin: '0 auto',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: isMobile ? '90%' : '',
              }}
            >
              <p
                style={{
                  marginBottom: '.8rem',
                }}
              >
                <b>Awesome! 😊</b> Now that we've covered the basics...
                <br />
                <br />
                We'd like to get to know you a little better!
                <br />
                <br />
                <span style={{ fontSize: isMobile ? '27px' : '30px' }}>
                  First of all, how would you like JungGPT to call you?
                </span>
              </p>
              <input
                style={{
                  backgroundColor: '#E8E2DE',
                  color: '#56778D',
                  borderRadius: '10em',
                  fontSize: '18px',
                  fontWeight: 600,
                  padding: '.5em',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease-in-out',
                  border: '1px solid #2D2D2D',
                  boxShadow: '0 0 0 0 #2D2D2D',
                  margin: '1rem',
                  '&:hover': {
                    transform: 'translateY(-4px) translateX(-2px)',
                    boxShadow: '2px 5px 0 0 #2D2D2D',
                    backgroundColor: '#607E92',
                    color: 'whitesmoke',
                  },
                  '&:active': {
                    transform: 'translateY(2px) translateX(1px)',
                    boxShadow: '0 0 0 0 #2D2D2D',
                    color: '#607E92',
                  },
                  fontFamily: 'League Spartan, serif',
                  width: '40%',
                }}
                type="text"
                onChange={(e) => setName(e.target.value)}
                maxLength={20}
              />
              <Button
                disabled={!name} // This disables the button when 'name' is empty
                sx={{
                  '&[disabled]': {
                    cursor: 'not-allowed',
                    opacity: 0.6,
                  },
                  display: 'flex',
                  backgroundColor: 'white',
                  color: '#56778D',
                  borderRadius: '10em',
                  fontSize: '14px',
                  fontWeight: 600,
                  backgroundColor: '#E8E2DE',
                  padding: isMobile ? '.3em' : '1em 2em',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease-in-out',
                  border: '1px solid #2D2D2D',
                  boxShadow: '0 0 0 0 #2D2D2D',
                  margin: '1rem',
                  '&:hover': {
                    transform: 'translateY(-4px) translateX(-2px)',
                    boxShadow: '2px 5px 0 0 #2D2D2D',
                    backgroundColor: '#607E92',
                    color: 'whitesmoke',
                  },
                  '&:active': {
                    transform: 'translateY(2px) translateX(1px)',
                    boxShadow: '0 0 0 0 #2D2D2D',
                    color: '#607E92',
                  },
                  fontFamily: 'League Spartan, serif',
                  width: '14.5%',
                  alignSelf: 'flex-end',
                  justifyContent: isMobile ? 'center' : 'right',
                }}
                maxLength={40}
                onClick={() => {
                  saveToFirebase('name', name);
                  nextStep();
                }}
              >
                Next
              </Button>
            </div>
          </>
        )}
        {step === 4 && (
          <>
            <p
              style={{
                fontSize: isMobile ? '25px' : '30px',
                marginBottom: '1rem',
                marginLeft: isMobile ? '5rem' : '',
              }}
            >
              Great! And what do you do for a profession?🧑🏾‍💼
            </p>
            <input
              style={{
                backgroundColor: '#E8E2DE',
                color: '#56778D',
                borderRadius: '10em',
                fontSize: '18px',
                fontWeight: 600,
                padding: '.5em',
                cursor: 'pointer',
                transition: 'all 0.3s ease-in-out',
                border: '1px solid #2D2D2D',
                boxShadow: '0 0 0 0 #2D2D2D',
                margin: '1rem',
                '&:hover': {
                  transform: 'translateY(-4px) translateX(-2px)',
                  boxShadow: '2px 5px 0 0 #2D2D2D',
                  backgroundColor: '#607E92',
                  color: 'whitesmoke',
                },
                '&:active': {
                  transform: 'translateY(2px) translateX(1px)',
                  boxShadow: '0 0 0 0 #2D2D2D',
                  color: '#607E92',
                },
                fontFamily: 'League Spartan, serif',
                width: '40%',
                marginLeft: isMobile ? '3rem' : '',
              }}
              maxLength={30}
              type="text"
              onChange={(e) => setJob(e.target.value)}
            />
            <Button
              disabled={!job} // This disables the button when 'name' is empty
              sx={{
                backgroundColor: 'white',
                color: '#56778D',
                borderRadius: '10em',
                fontSize: '14px',
                fontWeight: 600,
                backgroundColor: '#E8E2DE',
                padding: '1em 2em',
                cursor: 'pointer',
                transition: 'all 0.3s ease-in-out',
                border: '1px solid #2D2D2D',
                boxShadow: '0 0 0 0 #2D2D2D',
                margin: '1rem',
                '&:hover': {
                  transform: 'translateY(-4px) translateX(-2px)',
                  boxShadow: '2px 5px 0 0 #2D2D2D',
                  backgroundColor: '#607E92',
                  color: 'whitesmoke',
                },
                '&:active': {
                  transform: 'translateY(2px) translateX(1px)',
                  boxShadow: '0 0 0 0 #2D2D2D',
                  color: '#607E92',
                },
                fontFamily: 'League Spartan, serif',
                width: isMobile ? '33%' : '40%',
              }}
              onClick={() => {
                saveToFirebase('job', job);
                nextStep();
              }}
            >
              Next
            </Button>
          </>
        )}
        {step === 5 && (
          <>
            <div
              style={{
                display: 'flex',
                margin: '0 auto',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <p
                style={{
                  width: isMobile ? '90%' : '52.5%',
                  fontSize: '22px',
                  lineHeight: isMobile ? '30px' : '',
                }}
              >
                Are there any fundamental details about yourself you would like
                JungGPT to know about so that it may be able to assist you
                better? Hobbies? Daily Struggles? (If no, please leave this
                space blank)
              </p>
              <input
                style={{
                  backgroundColor: '#E8E2DE',
                  color: '#56778D',
                  borderRadius: '10em',
                  fontSize: '18px',
                  fontWeight: 600,
                  padding: '.5em',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease-in-out',
                  border: '1px solid #2D2D2D',
                  boxShadow: '0 0 0 0 #2D2D2D',
                  margin: '1rem',
                  '&:hover': {
                    transform: 'translateY(-4px) translateX(-2px)',
                    boxShadow: '2px 5px 0 0 #2D2D2D',
                    backgroundColor: '#607E92',
                    color: 'whitesmoke',
                  },
                  '&:active': {
                    transform: 'translateY(2px) translateX(1px)',
                    boxShadow: '0 0 0 0 #2D2D2D',
                    color: '#607E92',
                  },
                  fontFamily: 'League Spartan, serif',
                  width: '55%',
                  marginTop: '2rem',
                }}
                maxLength={250}
                type="text"
                onChange={(e) => setDescription(e.target.value)}
              />
              <Button
                sx={{
                  backgroundColor: 'white',
                  color: '#56778D',
                  borderRadius: '10em',
                  fontSize: '14px',
                  fontWeight: 600,
                  backgroundColor: '#E8E2DE',
                  padding: isMobile ? '.3em' : '1em 2em',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease-in-out',
                  border: '1px solid #2D2D2D',
                  boxShadow: '0 0 0 0 #2D2D2D',
                  margin: '1rem',
                  '&:hover': {
                    transform: 'translateY(-4px) translateX(-2px)',
                    boxShadow: '2px 5px 0 0 #2D2D2D',
                    backgroundColor: '#607E92',
                    color: 'whitesmoke',
                  },
                  '&:active': {
                    transform: 'translateY(2px) translateX(1px)',
                    boxShadow: '0 0 0 0 #2D2D2D',
                    color: '#607E92',
                  },
                  fontFamily: 'League Spartan, serif',
                  width: '20%',
                }}
                onClick={() => {
                  saveToFirebase('description', description);
                  nextStep();
                }}
              >
                Next
              </Button>
            </div>
          </>
        )}
        {step === 6 && (
          <Box
            sx={{
              animation: `${fadeIn} 3s forwards`,
              fontSize: isMobile ? '40px' : '60px',
              fontFamily: 'League Spartan',
              color: '#607E92',
              width: isMobile ? '90%' : '100%',
              textAlign: isMobile ? 'center' : 'initial',
            }}
          >
            <p>
              <b>Welcome to a Revolution in Self-Help</b>
            </p>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default WelcomeOverlay;
