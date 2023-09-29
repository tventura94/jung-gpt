import Image from 'next/image';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { motion } from 'framer-motion';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import ReactGA from 'react-ga4';
import { logPageView } from 'libs/analytics';
import { getUserData, db, auth } from 'libs/firebase';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Checkbox,
  FormControlLabel,
  Tooltip,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  IconButton,
  useMediaQuery,
} from '@mui/material';
import {
  ArrowForward as ArrowForwardIcon,
  ArrowBack as ArrowBackIcon,
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import MenuPopupState from 'components/MenuPopup';
import Welcome from 'components/Welcome';
import GoogleAd from 'components/googleAd';

ReactGA.send({ hitType: 'pageview', page: '/Selector', title: 'Selector' });
ReactGA.initialize('AW-11340712718');

export default function Selector({
  user,
  setUser,
  subscriptionStatus,
  setSubscriptionStatus,
}) {
  const router = useRouter();
  const [logoSrc, setLogoSrc] = useState('/images/will.png');
  const [checkedSecond, setCheckedSecond] = React.useState(false);
  const [hasJob, setHasJob] = useState(false);
  const [hasDescription, setHasDescription] = useState(false);
  const [hasName, setHasName] = useState(false);
  const [hasJobString, setHasJobString] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    if (!user) {
      return;
    }

    const checkJobCollection = async () => {
      const jobCollectionRef = collection(db, 'users', user.uid, 'job');
      const snapshot = await getDocs(jobCollectionRef);

      // Checking if any document within 'job' collection contains a string
      const jobStringExists = snapshot.docs.some((doc) => {
        const data = doc.data();
        return Object.values(data).some(
          (value) => typeof value === 'string' && value.trim() !== ''
        );
      });

      setHasJobString(jobStringExists);
      setLoading(false); // Set loading to false after check is done
    };

    checkJobCollection();
  }, [user?.uid, db]);

  useEffect(() => {
    if (!user) {
      return;
    }

    const checkCollections = async () => {
      const jobCollection = await getDocs(
        collection(db, 'users', user.uid, 'job')
      );
      const descriptionCollection = await getDocs(
        collection(db, 'users', user.uid, 'description')
      );
      const nameCollection = await getDocs(
        collection(db, 'users', user.uid, 'name')
      );

      setHasJob(!jobCollection.empty);
      setHasDescription(!descriptionCollection.empty);
      setHasName(!nameCollection.empty);
    };

    checkCollections();
  }, [user?.uid]);

  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const testimonials = [
    {
      id: 1,
      name: 'Sarah',
      feedback:
        "I've been using JungGPT for a few months now and it's been an absolute lifesaver. It has helped me to understand and navigate my emotions in a more constructive way. I use it regularly and have noticed a huge difference in my ability to process my feelings. This tool is truly remarkable.",
    },
    {
      id: 2,
      name: 'Tom',
      feedback:
        "I've never come across an app like JungGPT. The Emotional Reflection tool is like having a therapist in my pocket! It's been an incredible support system for me. The insights it provides are truly enlightening and have helped me manage my emotional well-being. It has changed my life.",
    },
    {
      id: 3,
      name: 'Aisha',
      feedback:
        "JungGPT is a game changer. It's taught me so much about myself and my emotional responses. The personalized feedback has been invaluable to my self-discovery journey. I've been able to take control of my emotional health in a way I never thought possible before.",
    },
    {
      id: 4,
      name: 'Josh',
      feedback:
        "Using JungGPT has had a profound impact on my mental health. It's given me clarity and helped me process my feelings in a meaningful way. The tool is user-friendly and incredibly intuitive. It's been a major asset in my mental wellness routine.",
    },
    {
      id: 5,
      name: 'Emily',
      feedback:
        "I've been blown away by the personalized feedback from JungGPT. It's helped me understand my emotions on a much deeper level. This is the best self-help tool I've come across. I've recommended it to all my friends and family members.",
    },
    {
      id: 6,
      name: 'Matthew',
      feedback:
        "JungGPT has been instrumental in my emotional self-improvement journey. The insights it provides are profound and easy to understand. I've learned so much about myself and how to manage my emotions effectively. I can't recommend it enough!",
    },
  ];

  const handleSignOut = () => {
    signOut(auth).then(() => {
      setUserEmail(null);
      router.push('/login');
    });
  };

  const handleNext = () => {
    setCurrentTestimonial((prev) => {
      const increment = isMobile ? 1 : 3;
      if (prev + increment >= testimonials.length) {
        return 0; // Wrap around to the start of the array
      }
      return prev + increment;
    });
  };

  const handleBack = () => {
    setCurrentTestimonial((prev) => {
      const decrement = isMobile ? 1 : 3;
      if (prev - decrement < 0) {
        // Find the index of the last set of testimonials
        let lastIndex = testimonials.length - decrement;
        if (lastIndex < 0) lastIndex = 0; // Fallback to 0 if the array has less than decrement items
        return lastIndex;
      }
      return (prev - decrement + testimonials.length) % testimonials.length;
    });
  };

  useEffect(() => {
    logPageView('/Selector');
  }, []);

  useEffect(() => {
    if (!user) {
      return;
    }

    const unsubscribe = onSnapshot(
      collection(db, 'users', user.uid, 'subscriptions'),
      (snapshot) => {
        let activeSubs = snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((sub) => ['trialing', 'active'].includes(sub.status));

        const newSub = activeSubs[0];

        if (newSub) {
          if (newSub.status === 'active') {
            setSubscriptionStatus(newSub.status);
            setLogoSrc('/images/gpt-gold.png');
          } else {
            setSubscriptionStatus(newSub.status);
            setLogoSrc('/images/will.png');
          }
        } else {
          setSubscriptionStatus('Free Plan');
          setLogoSrc('/images/will.png');
        }
      }
    );

    return () => {
      unsubscribe();
    };
  }, [user?.uid]);

  useEffect(() => {
    if (!user) {
      return;
    }

    const fetchData = async () => {
      try {
        await getUserData(user.email);
      } catch (error) {}
    };

    fetchData();
  }, [user?.email]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isMed = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState(false);

  React.useEffect(() => {
    const hasAcceptedTerms = localStorage.getItem('hasAcceptedTerms');

    if (!hasAcceptedTerms) {
      setOpen(true);
    }
  }, []);

  const handleClose = () => {
    if (bothChecked) {
      localStorage.setItem('hasAcceptedTerms', 'true');
      setOpen(false);
    }
  };

  const bothChecked = checked && checkedSecond;

  const handleCheckboxChange = (event, checkedSetter) => {
    checkedSetter(event.target.checked);
  };

  const boxStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8E1DC',
    borderRadius: '2em',
    padding: '0em',
    width: '100%',
    maxWidth: isMobile ? '7vw' : '30vw',
    minWidth: '500px',
    margin: isMobile ? '1em 0' : '0',
    transition: isMobile ? '' : 'transform 0.15s ease-in-out',
    ':hover': isMobile ? '' : { transform: 'scale(1.05)' },
    fontFamily: "'League Spartan', serif",
    lineHeight: '1.6rem',
    '@media (max-width: 1096px)': {
      minWidth: '390px',
    },
    border: '2px solid silver',
    boxShadow: '0px 10px 15px -3px rgba(0,0,0,0.1)',
  };

  return (
    <div
      className={isMobile ? 'jung-background-2' : 'jung-background-2'}
      style={{
        boxSizing: 'border-box',
        backgroundPositionY: isMobile ? '52.4%' : '104%',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
      }}
    >
      <div
        className="main"
        style={{
          position: isMobile ? 'fixed' : 'fixed',
          zIndex: isMobile ? '100' : '100',
        }}
      >
        <Image
          src={'/images/gpt-text-1.png'}
          width={48}
          height={48}
          alt=""
          style={{
            color: 'white',
            right: '5%',
            bottom: '94.2%',
            marginLeft: isMobile ? '0rem' : '0rem',
            marginRight: isMobile ? '1rem' : '1rem',
          }}
        />
        <MenuPopupState user={user} setUser={setUser} />
      </div>
      {!loading && !hasJobString && <Welcome />}
      <div
        className="div"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: isMobile ? '#607E92' : '',
          background: isMobile
            ? `linear-gradient(165deg, rgba(255,255,255,1) 0%, rgba(175,175,175,1) 100%), url(${'/images/dec3.svg'})`
            : `url(${'/images/dec3.svg'})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          borderBottom: isMobile ? 'silver 3px solid' : '',
          padding: isMobile ? '0em' : '1em',
          paddingBottom: '0rem',
        }}
      >
        {/* MAINTENANCE MODAL****************************************** */}
        {/* <Modal
          open={true}
          aria-labelledby="maintenance-modal-title"
          aria-describedby="maintenance-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography
              id="maintenance-modal-title"
              variant="h6"
              component="h2"
              fontSize="26px"
            >
              A message from the JungGPT Team 8/13/23
            </Typography>
            <Typography id="maintenance-modal-description" variant="body1">
              <br />
              HOLY COW Everybody! We gained 600 users in 4 days!
              <br />
              <br />
              Unfortunately, we have to take a few days to focus on enhancing
              our infrastructure and implementing essential updates before
              things get too out of control on our end. Still, this is a very
              cool problem to have and we're so grateful for all the positive
              feedback we've been getting <br />
              <br />
              We appreciate your patience and understanding, and we'll be back
              up and running in the next few days! Feel free to reach out to our
              support team at support@ventura-ux.com if you have any questions
              or concerns. Thank you for being a part of our community!
              <br />
              <br />
              We will be notifying all users through their account emails when
              we are back online!
            </Typography>
            <Typography
              sx={{
                marginTop: "1rem",
                fontSize: "22px",
              }}
            >
              We should be back up no later than Wednesday 8/16!
            </Typography>
            <Box
              sx={{
                display: "flex",
                marginTop: "2rem",
                margin: "0 auto",
                justifyContent: "left",
                alignItems: "center",
              }}
            >
              <Typography>The </Typography>{" "}
              <Image
                src={"/images/will.png"}
                alt=""
                style={{
                  padding: "0rem",
                  width: "30%",
                }}
              />
              <Typography>Team </Typography>
            </Box>

            <Button onClick={handleSignOut}>Sign Out</Button>
          </Box>
        </Modal> */}
        {/*************************************************************** */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-evenly',
            alignItems: isMobile ? 'center' : 'top',
            width: '100%',
            maxWidth: '95vw',
            marginBottom: isMobile ? '3rem' : '0',
            margin: isMobile ? '0rem' : '0',
            backgroundColor: isMobile ? '' : '',

            padding: isMobile ? '' : '5.5rem',
            marginTop: isMobile ? '2.5rem' : '0rem',
            borderRadius: '30px',
            marginBottom: '0rem',
          }}
        >
          <motion.div
            className="box"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0, ease: [0, 0.71, 0.2, 1.01] }}
          >
            <Box sx={boxStyles}>
              <Button
                style={{
                  width: '100%',
                  height: '8rem',
                }}
                onClick={() => router.push('/dashboard')}
              >
                <Image
                  src={logoSrc} // Use the logoSrc state variable here
                  width={isMobile ? 256 : 288}
                  height={isMobile ? 256 : 288}
                  alt=""
                />
              </Button>
              <div
                style={{
                  wordWrap: 'break-word', // add this line
                  width: isMobile ? '83%' : '80%',
                  maxWidth: '100%', // add this line
                  marginBottom: '1rem',
                  lineHeight: '2rem',
                }}
              >
                <p
                  style={{
                    marginBottom: '0rem',
                  }}
                >
                  {' '}
                  <b
                    style={{
                      fontSize: isMobile ? '20px' : '26px',
                    }}
                  >
                    Our very first Emotional Reflection Feedback tool
                  </b>{' '}
                </p>
                <br />
                An advanced language model that facilitates emotional
                understanding. It processes user input, deciphers the inherent
                emotional context, and reflects it back to the user for enhanced
                clarity. Leveraging this understanding, JungGPT provides
                personalized, strategic suggestions for emotional navigation and
                progression. <br />{' '}
                <b>(Responses vary between 2-8 second wait times)</b>
              </div>
              <Button
                sx={{
                  backgroundColor: 'white',
                  color: '#56778D',
                  borderRadius: '10em',
                  fontSize: isMobile ? '11px' : '14px',
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
                  },
                  '&:active': {
                    transform: 'translateY(2px) translateX(1px)',
                    boxShadow: '0 0 0 0 #2D2D2D',
                    color: '#607E92',
                  },
                  fontFamily: 'League Spartan, serif',
                  width: isMobile ? '50%' : '40%',
                }}
                onClick={() => router.push('/dashboard')}
              >
                <b>Chat Now</b>
              </Button>
            </Box>
          </motion.div>
          <motion.div
            className="box"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.3,
              delay: 0.1,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            <Box sx={boxStyles}>
              <div
                style={{
                  position: 'relative',
                  cursor:
                    subscriptionStatus === 'active' ? 'pointer' : 'not-allowed',
                }}
              >
                <Tooltip
                  style={{
                    fontSize: '40px',
                  }}
                  title="Sorry, this is only for our Premium Members!"
                  arrow
                  disableHoverListener={subscriptionStatus === 'active'}
                  placement="top"
                >
                  <div>
                    <Button
                      style={{
                        width: '100%',
                        height: '8rem',
                      }}
                      onClick={() => {
                        if (subscriptionStatus === 'active') {
                          router.push('/dbt');
                        }
                      }}
                      disabled={subscriptionStatus !== 'active'}
                    >
                      <Image
                        src={'/images/jungSmart.png'}
                        width={isMobile ? 256 : 288}
                        height={isMobile ? 256 : 288}
                        alt=""
                      />
                    </Button>
                  </div>
                </Tooltip>
              </div>
              <div
                style={{
                  wordWrap: 'break-word', // add this line
                  width: '80%',
                  maxWidth: '100%', // add this line
                  marginBottom: '1rem',
                  lineHeight: '2rem',

                  width: isMobile ? '83%' : '80%',
                }}
              >
                <p
                  style={{
                    marginBottom: '0rem',
                  }}
                >
                  {' '}
                  <b
                    style={{
                      fontSize: isMobile ? '20px' : '26px',
                    }}
                  >
                    Our groundbreaking SMART Tool, JungSMART
                  </b>
                </p>{' '}
                <br />
                SMART stands for Specific, Measurable, Achievable, Relevant, and
                Time-bound. These critical aspects foster effective goal
                setting. This AI, like an intelligent mentor, offers
                comprehensive guidance in crafting SMART goals and developing
                action plans that lead to success. JungSMART helps you create a
                path to reach your goals faster!
                <br />
                <b> (Only Available for Premium users) </b>
              </div>

              <Button
                sx={{
                  backgroundColor: 'white',
                  color: '#56778D',
                  borderRadius: '10em',
                  fontSize: isMobile ? '11px' : '14px',
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
                  },
                  '&:active': {
                    transform: 'translateY(2px) translateX(1px)',
                    boxShadow: '0 0 0 0 #2D2D2D',
                    color: '#607E92',
                  },
                  fontFamily: 'League Spartan, serif',
                  width: isMobile ? '50%' : '40%',
                }}
                onClick={() => router.push('/dbt')}
                disabled={subscriptionStatus !== 'active'}
              >
                <b>Chat Now</b>{' '}
              </Button>
            </Box>
          </motion.div>
          {/* JungTALK****************************** */}
          {user &&
            (user.uid === '9ODBIC3Ir5bWiZGb4B2MnatmVMY2' ||
              user.uid === 'vg9Y3qcy2VcGiueua2SHzk30Srl2') && (
              <motion.div
                className="box"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.3,
                  delay: 0.1,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
              >
                <Box sx={boxStyles}>
                  <Button
                    sx={{
                      backgroundColor: 'white',
                      color: '#56778D',
                      borderRadius: '10em',
                      fontSize: isMobile ? '11px' : '14px',
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
                      },
                      '&:active': {
                        transform: 'translateY(2px) translateX(1px)',
                        boxShadow: '0 0 0 0 #2D2D2D',
                        color: '#607E92',
                      },
                      fontFamily: 'League Spartan, serif',
                      width: isMobile ? '50%' : '40%',
                    }}
                    onClick={() => router.push('/audio-recorder')}
                  >
                    <b>JungTALK</b>
                  </Button>
                </Box>
              </motion.div>
            )}
        </Box>
      </div>
      <Image
        priority
        src={
          isMobile ? '/images/notjustsmart2.png' : '/images/notjustsmart.svg'
        }
        width={1900}
        height={1500}
        alt=""
        style={{
          width: '100%',
          height: 'auto',
          marginTop: '0rem',
          borderTop: '.3rem silver solid',
        }}
      />
      <Grid
        container
        spacing={isMobile ? 5 : 8}
        style={{
          marginBottom: '3rem',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          margin: '0 auto',
          justifyContent: 'center',
          width: '100%',
          backgroundImage: `url(${
            isMobile ? '/images/dec2.png' : '/images/dec.svg'
          })`,

          backgroundRepeat: 'no-repeat',
          backgroundSize: isMobile ? 'contain' : 'contain',
        }}
      >
        <Grid item xs={11} sm={6} md={4} lg={3}>
          <Box
            sx={{
              padding: '1rem',
              textAlign: 'center',
              boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
              borderRadius: '40px',
            }}
          >
            <Grid
              sx={{
                display: 'flex',
                flexDirection: 'column',
                margin: '0 auto',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '1rem',
              }}
            >
              <Image
                priority
                src="/images/PSY.png"
                width={866}
                height={650}
                alt=""
                style={{
                  width: '50%',
                  height: 'auto',
                }}
              />
              <Typography
                sx={{
                  width: isMobile ? '90%' : '100%',
                  textAlign: 'center',
                  margin: '0 auto',
                  fontFamily: 'Montserrat',
                  fontSize: '19px',
                }}
              >
                At JungGPT, we've had the privilege of consulting with a team of
                psychologists who have completed Ivy-League Fellowships, taught
                multiple psychology courses in undergraduate and graduate
                programs, and directed psychology training programs. These
                seasoned experts have contributed their deep insights to the
                careful design of our conversational prompts, ensuring they meet
                high ethical and psychological standards.
              </Typography>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={11} sm={6} md={4} lg={3}>
          <Box
            sx={{
              padding: '1rem',
              textAlign: 'center',
              boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
              borderRadius: '40px',
            }}
          >
            <Grid
              sx={{
                display: 'flex',
                flexDirection: 'column',
                margin: '0 auto',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '1rem',
              }}
            >
              <Image
                priority
                src={'/images/SAPP.png'}
                width={866}
                height={650}
                alt=""
                style={{
                  width: '50%',
                  height: 'auto',
                }}
              />
              <Typography
                sx={{
                  width: '100%',
                  textAlign: 'center',
                  margin: '0 auto',
                  fontFamily: 'Montserrat',
                }}
              >
                <b
                  style={{
                    fontSize: '20px',
                  }}
                >
                  {' '}
                  Introducing SAPP — Sentiment Adaptive Pre-Processor.
                </b>{' '}
                <br />
                SAPP is an custom in-house techology built from the ingenuity of
                our developers at Ventura UX. Imagine a chatbot that doesn't
                just respond but actually 'feels' the vibe of the conversation
                and changes its decision making real-time based on user input.
                <br />
                <b>
                  Our tool is the most dynamic emotional support tool to date!
                </b>
                <br />
                <br />{' '}
                <span
                  style={{
                    color: '#496D96',
                  }}
                >
                  {' '}
                </span>{' '}
              </Typography>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={11} sm={5} md={4} lg={3}>
          <Box
            sx={{
              padding: '1rem',
              textAlign: 'center',
              boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
              borderRadius: '40px',
            }}
          >
            <Image
              priority
              src={'/images/Over80.png'}
              width={866}
              height={650}
              alt=""
              style={{
                width: '100%',
                height: 'auto',
              }}
            />
          </Box>
        </Grid>
      </Grid>

      {/* Terms of Service Dialog */}
      <Dialog open={open}>
        <DialogTitle id="alert-dialog-title">Terms of Service</DialogTitle>
        <DialogContent>
          <Paper
            style={{
              maxHeight: '50vh',
              overflow: 'auto',
              marginBottom: '1rem',
            }}
          >
            <Typography variant="body1">
              {/* Replace this with your actual Terms of Service text */}
              {`  Welcome to JungGPT. The following Terms of Service ("TOS") contain the
          terms and conditions that govern your use of the JungGPT application
          ("Application") and the services provided by the Application
          ("Services"). By using the Application, you agree to be bound by these
          TOS, as they may be amended by Ventura UX, LLC from time to time in
          its sole discretion.
         
          1. **License**: Subject to your compliance with these Terms of Service
          (TOS), Ventura UX, LLC grants you a limited, non-exclusive,
          non-transferable, non-sublicensable license to access and use the
          Application. This license is for your personal and non-commercial use
          only. This means that you are permitted to use the Application as it
          is provided to you by Ventura UX, LLC, but you may not copy, modify,
          distribute, sell, or lease any part of the Application, nor may you
          reverse engineer or attempt to extract the source code of the
          software, unless laws prohibit those restrictions or you have our
          written permission. The Application and its original content,
          features, and functionality are owned by Ventura UX, LLC and are
          protected by international copyright, trademark, patent, trade secret,
          and other intellectual property or proprietary rights laws. Any rights
          not expressly granted herein are reserved by Ventura UX, LLC. Your use
          of the Application does not grant you any right, title, or interest in
          the Application or the content in the Application. Please note that we
          may revoke this license at our discretion, without notice and without
          liability, for any reason or for no reason. Any unauthorized use of
          the Application terminates the permissions and/or licenses granted by
          Ventura UX LLC pursuant to these TOS. Also, you agree to respect all
          copyright and other legal notices, information, and restrictions
          contained in any content accessed through the Application. You also
          agree not to change, translate, or otherwise create derivative works
          of the Application. This license will remain in effect unless and
          until you violate these TOS or this license is terminated by you or
          Ventura UX, LLC.
         
          2. **Eligibility**: By using the Application, you affirm that you are
          at least 18 years of age. The Application is intended for use by
          individuals who are 18 years or older. If you are under 18 years of
          age, you may only use the Application with the consent and supervision
          of a parent or legal guardian. By using the Application, you represent
          and warrant that you have reached the age of majority in your
          jurisdiction or that you have obtained the necessary consent from your
          parent or legal guardian to use the Application. Ventura UX, LLC
          reserves the right, in its sole discretion, to refuse to offer the
          Application to any person or entity and to change the eligibility
          criteria at any time without prior notice. By accessing or using the
          Application, you acknowledge and agree that Ventura UX, LLC shall not
          be liable for any consequences or damages resulting from your use of
          the Application in violation of these eligibility requirements. It is
          your responsibility to ensure that you meet the eligibility criteria
          before using the Application. If you do not meet the specified
          eligibility requirements, you should refrain from using the
          Application and discontinue any ongoing use immediately.
         
          3. **Purpose**: JungGPT is an AI model designed to assist individuals
          in understanding their emotions and providing insights. The primary
          purpose of the tool is to serve as an emotional reflection tool and
          provide a platform for individuals to explore their thoughts and
          feelings. It is important to note that JungGPT is not intended to
          replace professional therapy or serve as a substitute for mental
          health treatment. While it may provide support and guidance, it does
          not constitute medical advice, diagnosis, or treatment. JungGPT should
          be used as a tool to complement and enhance personal growth and
          self-awareness. It can offer reflections, suggestions, and insights
          based on its training and knowledge in the fields of psychology,
          psychiatry, medicine, and philosophy. It is essential to understand
          that the information provided by JungGPT should not be relied upon as
          a substitute for professional advice or treatment from qualified
          mental health professionals. If you are experiencing a mental health
          crisis, have severe emotional distress, or require immediate
          assistance, it is crucial to seek help from a licensed therapist,
          counselor, or healthcare provider. By using JungGPT, you acknowledge
          and understand that it is not a substitute for professional therapy or
          treatment. You are solely responsible for your well-being and should
          use the tool at your own discretion, taking into consideration your
          individual circumstances and seeking appropriate professional help
          when needed. JungGPT aims to provide a supportive and empathetic
          environment to help individuals explore and understand their emotions,
          but it is important to prioritize your mental health and consult with
          qualified professionals for personalized and comprehensive assistance.
         
          4.**Data Privacy, Confidentiality, and Usage**: At Ventura UX, LLC, our priority is the confidentiality and security of user data in the JungGPT application. Here's what you need to know:
          Strict Confidentiality: All personal data, including location, messages, number of messages, number of words, and number of characters, is kept strictly confidential. We do not sell, trade, or transfer your information to outside parties.
          Data Retention for Legal Reasons: Conversations are stored and tracked, but solely for legal purposes. Access to this data is strictly controlled, and no one is permitted to view it without proper authorization.
          No Usage for Model Training: The data collected is not used to train or enhance our models. Your interactions with the Application remain private and are not utilized for any development or improvement of our AI algorithms.
          Data We Collect: Specific data related to your use of the Application is collected, including location, time spent using the app, frequency of use, the text of messages sent, the number of messages, number of words, and number of characters in each message.
          
          Purpose of Data Collection: We track this data to understand user engagement with the app, to enhance our services, and to fulfill legal obligations. This information helps us gain insights into user behavior, improve the overall user experience, and protect the company legally.
          
          Commitment to Privacy and Security: We are committed to maintaining the highest standards of privacy and have implemented robust security measures to safeguard your information. By using the JungGPT application, you acknowledge and agree to our data handling practices as outlined above.
         
          5. **Medical Assistance**: It is important to note that the Services
          provided by JungGPT are not intended to replace professional medical
          advice, diagnosis, or treatment. While JungGPT can assist in
          understanding emotions and providing insights, it is not a substitute
          for medical or mental health care. The information and guidance
          provided by JungGPT should not be considered as medical, psychiatric,
          or therapeutic advice. It is always recommended that you consult with
          qualified healthcare professionals, such as doctors, therapists, or
          counselors, for any medical or mental health concerns. If you are
          experiencing a medical emergency or require immediate medical
          attention, please contact your local healthcare provider or emergency
          services right away. JungGPT is not designed or equipped to handle
          medical emergencies, and timely medical assistance should always be
          sought in such situations. While JungGPT aims to provide support and
          guidance, it cannot provide a diagnosis or treatment plan for any
          medical or mental health condition. The responsibility for making
          decisions about your health and well-being lies with you and your
          healthcare providers. By using the Services, you acknowledge and
          understand that JungGPT is not a substitute for professional medical
          or mental health care. It is essential to seek appropriate medical
          advice and treatment from qualified professionals for any
          health-related concerns or conditions. JungGPT encourages you to
          prioritize your health and well-being and seeks to complement, not
          replace, the care provided by medical and mental health professionals.
          Always consult with healthcare providers who are familiar with your
          specific circumstances and can provide personalized advice and
          treatment options. Please consult our Terms of Service and Privacy
          Policy for further details regarding the limitations of the Services
          and your responsibilities as a user.
         
          6. **Limitation of Liability**: Ventura UX, its officers, directors,
          employees, or agents shall not be held liable for any damages arising
          out of or in connection with your use of the Application or Services.
          This includes, but is not limited to, indirect, incidental, special,
          punitive, or consequential damages, regardless of whether such damages
          are foreseeable or Ventura UX, LLC, has been advised of the
          possibility of such damages. By using the Application and Services,
          you agree that Ventura UX, LLC, shall not be responsible for any
          direct or indirect harm, loss, or damage that may result from your
          interactions with the Application or Services. This includes, but is
          not limited to, any errors or inaccuracies in the information provided
          by JungGPT, any interruption or cessation of services, or any
          unauthorized access to or use of your personal information. The
          foregoing limitation of liability applies to the fullest extent
          permitted by law in the applicable jurisdiction. It is important to
          understand that while JungGPT strives to provide accurate and reliable
          information, there may be limitations and inherent risks associated
          with the use of an AI language model. Therefore, it is your
          responsibility to use the Application and Services at your own
          discretion and assess the suitability and accuracy of the information
          provided. JungGPT encourages you to exercise caution and seek
          professional advice when appropriate. The limitations of liability
          outlined in these Terms of Service are designed to protect Ventura UX,
          LLC and its affiliates to the fullest extent permitted by law, and by
          using the Application and Services, you acknowledge and accept these
          limitations.
         
          7. **User Responsibilities**: By using the Application and Services,
          you agree to comply with all applicable laws, regulations, and
          guidelines. You are responsible for maintaining the confidentiality of
          your account information and for all activities that occur under your
          account. You agree not to use the Application for any unlawful or
          unauthorized purposes and to refrain from engaging in any activity
          that may disrupt or interfere with the proper functioning of the
          Application or Services.
         
          8. **Intellectual Property**: All intellectual property rights in the
          Application and Services, including but not limited to trademarks,
          logos, graphics, and content, are owned by or licensed to Ventura UX,
          LLC. You agree not to use, modify, reproduce, distribute, or exploit
          any intellectual property without the explicit permission of Ventura
          UX, LLC.
         
          9. **Termination**: Ventura UX, LLC reserves the right to suspend or
          terminate your access to the Application and Services at any time,
          with or without cause or notice. In the event of termination, you will
          no longer have access to your account or any data associated with it.
         
          10. **Third-Party Links**: The Application and Services may contain
          links to third-party websites or resources. JungGPT is not responsible
          for the availability, accuracy, or content of such external sites or
          resources. You acknowledge and agree that JungGPT is not liable for
          any loss or damage caused by your use of any third-party websites or
          resources.
         
          11. **Indemnification**: You agree to indemnify and hold Ventura UX,
          LLC, its officers, directors, employees, and agents harmless from any
          claims, liabilities, damages, losses, or expenses arising out of or in
          connection with your use of the Application or Services, including any
          violation of these Terms of Service.
         
          12. **Governing Law**: These TOS are governed by the laws of the
          jurisdiction in which Ventura UX operates. Any disputes arising out of
          these TOS will be adjudicated in the courts of that jurisdiction.
         
          13. **Arbitration**: Except for any disputes, claims, suits, actions,
          causes of action, demands or proceedings (collectively, "Disputes") in
          which either Party seeks to bring an individual action in small claims
          court or seeks injunctive or other equitable relief for the alleged
          unlawful use of intellectual property, including, without limitation,
          copyrights, trademarks, trade names, logos, trade secrets or patents,
          you and Ventura UX, LLC agree (a) to waive your and Ventura UX, LLC’s
          respective rights to have any and all Disputes arising from or related
          to these TOS, the Application, or the Services, resolved in a court,
          and (b) to waive your and Ventura UX, LLC’s respective rights to a
          jury trial. Instead, you and Ventura UX, LLC agree to arbitrate
          Disputes through binding arbitration (which is the referral of a
          Dispute to one or more persons charged with reviewing the Dispute and
          making a final and binding determination to resolve it instead of
          having the Dispute decided by a judge or jury in court).
         
          14. **No Class Arbitrations, Class Actions or Representative
          Actions**: You and Ventura UX, LLC agree that any Dispute arising out
          of or related to these TOS, the Application or the Services is
          personal to you and Ventura UX, LLC and that such Dispute will be
          resolved solely through individual arbitration and will not be brought
          as a class arbitration, class action or any other type of
          representative proceeding. You and Ventura UX, LLC agree that there
          will be no class arbitration or arbitration in which an individual
          attempts to resolve a Dispute as a representative of another
          individual or group of individuals. Further, you and Ventura UX, LLC
          agree that a Dispute cannot be brought as a class or other type of
          representative action, whether within or outside of arbitration, or on
          behalf of any other individual or group of individuals.
         
          15. **Delegation Clause** You and Ventura UX, LLC agree that any and
          all disputes or claims related to the interpretation, enforceability,
          or formation of this arbitration agreement, including but not limited
          to any claim that all or any part of this arbitration agreement is
          void or voidable, or whether a claim is subject to arbitration, shall
          be resolved exclusively by the appointed arbitrator and not by any
          court. This includes the scope, applicability, validity, and
          enforceability of the arbitration agreement. This arbitration
          agreement allows for the arbitrator, not any federal, state, or local
          court or agency, to have exclusive authority to resolve any dispute
          relating to the interpretation, applicability, enforceability or
          formation of this arbitration agreement, including, but not limited
          to, any claim that all or any part of this arbitration agreement is
          void or voidable. The arbitrator will decide all issues of this nature
          before addressing the merits of the dispute, claim or controversy that
          is subject to arbitration as provided under these TOS.
         
          16. **Amendments**: Ventura UX, LLC, reserves the right to modify or
          replace any of these TOS at any time by posting a notice on the
          Application. It is your responsibility to check these TOS periodically
          for changes.
         
          17. **Entire Agreement**: These Terms of Service constitute the entire
          agreement between you and Ventura UX, LLC, regarding the use of the
          Application and Services, superseding any prior agreements or
          understandings.

          18. **Billing and Fees**: By signing up and using the JungGPT
          application, you agree to pay a monthly subscription fee of $7. In
          addition to the subscription fee, you also acknowledge that your usage
          of tokens will be billed at a rate of $0.000056 per thousand tokens
          used. The total token usage fee will be calculated based on the number
          of tokens consumed during your interactions with the application.
          Ventura UX, LLC reserves the right to modify the subscription fee and
          token usage rate with prior notice. Payment for the subscription fee
          and token usage will be processed through the billing information
          provided by you. You are responsible for ensuring that your billing
          information is accurate and up to date. Failure to make timely
          payments may result in a suspension or termination of your access to
          the Application and Services. By signing up and using the Application,
          you acknowledge and agree to the billing terms outlined in this
          clause.
         
          
          Last updated on 8/22/23 `}
            </Typography>
          </Paper>
          <FormControlLabel
            sx={{
              marginBottom: '1rem',
            }}
            control={
              <Checkbox
                checked={checked}
                onChange={(e) => handleCheckboxChange(e, setChecked)}
              />
            }
            label="By continuing, you agree to our Terms of Service"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={checkedSecond}
                onChange={(e) => handleCheckboxChange(e, setCheckedSecond)}
              />
            }
            label="I understand that this platform provides AI chat-based support and is NOT a replacement for professional mental health services.
            I understand and acknowledge that I am using this chat bot at my own volition and that I should NOT use this bot if I am having feelings of self harm, suicidal ideation, or am having a panic attack.
             This service does not constitute mental health therapy, counseling, medical or psychological diagnosis, or professional mental health advice.
              If I am in crisis, feel like I may harm myself or others, I understand it is essential to seek immediate professional help.
               "
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={handleClose}
            disabled={!bothChecked}
            disableBackdropClick
            disableEscapeKeyDown
          >
            Enter
          </Button>
        </DialogActions>
      </Dialog>

      <div
        style={{
          marginTop: isMobile ? '' : '3rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            margin: '0 auto',
            width: isMobile ? '90%' : '50%',
            justifyContent: 'space-evenly',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              margin: '0 auto',
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1rem',
              width: '100%',
              padding: '2rem',
            }}
          >
            <Typography
              variant="body1"
              style={{
                minWidth: '50%', // Add this line
                marginTop: isMobile ? '0rem' : '2rem',
                marginBottom: isMobile ? '0rem' : '1rem',
                textAlign: 'center',
                marginLeft: isMobile ? '' : '4rem',
                marginRight: isMobile ? '' : '2rem',
                lineHeight: isMobile ? '1.8125rem' : '2rem',
                paddingTop: isMobile ? '4.8rem' : '1rem',
                fontFamily: "'Roboto Slab', serif",
                fontSize: isMobile ? '1.05rem' : '1.1875rem',
                color: '#121212',
                padding: '1rem',
                borderRadius: '30px',
              }}
            >
              <b>
                <span
                  style={{
                    fontSize: isMobile ? '1.875rem' : '3rem',
                    color: '#4E708B',
                    wordSpacing: '.3rem',
                  }}
                >
                  Get real relief{' '}
                </span>
                chatting with our highly customized{' '}
                <span
                  style={{
                    fontSize: '1.375rem',
                    wordSpacing: '.3rem',
                  }}
                >
                  Emotional Reflection Feedback Tool!{' '}
                </span>
              </b>{' '}
              <br /> <br />
              JungGPT was developed by the ingenuity of web developers and
              psychologists working together at Ventura UX to realize the
              potentiallity of a tool that could be used to help people work
              through their emotional states, conflicting thoughts and feelings,
              and negative self-talk.
            </Typography>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: 'center',
              justifyContent: 'center',
              margin: isMobile ? '0em' : '2em',
              width: '100%',

              marginBottom: '2rem',
            }}
          >
            <ArrowBackIcon
              onClick={handleBack}
              style={{
                display: isMobile ? 'none' : '',
                cursor: 'pointer',
                marginRight: '1em',
              }}
            />

            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '2em',
                marginBottom: '1rem',
                marginTop: '1rem',
                margin: '0 auto',
              }}
            >
              {testimonials
                .slice(
                  currentTestimonial,
                  currentTestimonial + (isMobile ? 1 : 3)
                )
                .map((testimonial, index) => (
                  <motion.div
                    key={testimonial.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#F5F5F5',
                        color: '#607E92',
                        padding: isMobile ? '1.5em' : '2em',
                        width: isMobile ? '100%' : '400px', // Default to 100% on mobile and 400px on larger screens
                        margin: isMobile ? '1em 0' : '0',
                        marginBottom: isMobile ? '2.5rem' : '2rem',
                        marginTop: isMobile ? '3rem' : '',
                        fontFamily: "'League Spartan', serif",
                        lineHeight: '1.6rem',
                        boxShadow: '0px 10px 15px -3px rgba(0,0,0,0.1)',
                        '@media(max-width: 1458px)': {
                          width: '300px',
                        },

                        '@media(max-width: 1259px)': {
                          width: '300px',
                        },

                        '@media (min-width: 600px) and (max-width: 1224px)': {
                          width: '200px',
                        },
                        '@media(max-width: 845px)': {
                          width: '150px',
                        },
                        '@media(max-width: 600px)': {
                          width: '360px',
                        },
                      }}
                    >
                      <p
                        style={{
                          color: '#868a72',
                          fontSize: '18px',
                          textAlign: 'left',
                          lineHeight: '30px',
                          width: '100%',
                        }}
                      >
                        {testimonial.feedback}
                      </p>
                      <h3
                        style={{
                          textAlign: 'left',
                          paddingTop: '1rem',
                          width: '100%',
                        }}
                      >
                        {testimonial.name}
                      </h3>
                    </Box>
                  </motion.div>
                ))}
            </div>
            <div
              style={{
                display: 'flex',
                width: '90%',
                margin: '0 auto',
                justifyContent: 'right',
                alignItems: 'right',
              }}
            >
              <ArrowBackIcon
                onClick={handleBack}
                style={{
                  display: isMobile ? '' : 'none',
                  cursor: 'pointer',
                  marginRight: '1em',
                }}
              />
              <ArrowForwardIcon
                onClick={handleNext}
                style={{ cursor: 'pointer', marginLeft: '1em' }}
              />
            </div>
          </div>
          <Typography
            variant="body1"
            style={{
              fontSize: '40px',
              marginTop: isMobile ? '2rem' : '1rem',
              marginBottom: '1rem',
              color: '#484b52',
              wordSpacing: '20px',
              letterSpacing: '4px',
              fontFamily: 'Roboto',
              borderRadius: '4px',
              margin: '0 auto',
              width: '100%',
              borderTop: '2px silver solid',
              paddingTop: isMobile ? '1.5rem' : '2.5rem',
              paddingBottom: isMobile ? '.8rem' : '1.5rem',
              fontFamily: "'Roboto Slab', serif",
            }}
          >
            <b>Frequently Asked Questions</b>
          </Typography>
          <div>
            <Accordion
              style={{
                backgroundColor: '#5E7E91',
                marginTop: '16px',
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography
                  style={{
                    fontFamily: "'Roboto Slab', serif",
                    color: 'whitesmoke',
                  }}
                >
                  Is this some sort of attempt to replace therapists with AI?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography
                  style={{
                    textAlign: 'left',
                    color: 'whitesmoke',
                    fontFamily: "'Roboto Slab', serif",
                  }}
                >
                  Nope... And even if we were... we just don't have that kind of
                  influence. <br />
                  <br />
                  JungGPT is absolutely not therapy and should not be
                  interpreted as such.
                  <br />
                  <br />
                  <b>In no way</b> does anyone at Ventura UX, believe that this
                  tool is a replacement for the therapeutic relationship.
                  Therapy is based on understanding, trust, and as stated - a
                  relationship. JungGPT is an first of its kind ERF (Emotional
                  Reflection Feedback) Tool. It takes the users input, and based
                  on the data its been trained on, analyzes the emotional
                  context of your situation. It then offers a way to reframe
                  your thoughts or the situation, and asks you questions to help
                  you gain clarity about what you're going through.
                  <br />
                  <br />
                  It is important to understand you get out of JungGPT what you
                  put in. Try and use it in the moment, with a real life problem
                  you are struggling with. However, if you are struggling with
                  serious depression, suicidality, or thoughts of harming
                  others, JungGPT is NOT the tool to use. Please seek the
                  guidance of a professional mental health counselor, and we
                  also hope you reach out to a friend or family member who loves
                  you that you can talk to. Your safety is incredibly important
                  to your friends, your family, and to us, its never worth it to
                  risk it. Seek help if you're feeling truly awful. Connection
                  with others and self-exploration with the help of a trained
                  professional are vital steps toward growth and healing.
                  <br />
                  <br /> While JungGPT does have a "form" of empathy, it does
                  not feel empathy itself, but understands it based on its
                  training to do so and through analyzing text in different
                  context. It is our belief at Ventura UX that based on its
                  extensive training on all types of text, it has gathered the
                  ability to logically deduce a simulacrum of empathy and ask
                  questions to prompt the user to gain clarity about their
                  situation and emotions, effectively becoming a truly nonbiased
                  ear to talk to.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              style={{
                marginTop: '16px',

                backgroundColor: '#BABEA8',
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography
                  style={{
                    fontFamily: "'Roboto Slab', serif",
                    color: 'white',
                  }}
                >
                  I've never seen something like this. How can I trust it?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography
                  style={{
                    fontFamily: "'Roboto Slab', serif",
                    color: 'white',
                  }}
                >
                  This is an AI trained on trillions of data points about
                  psychology, and has been trained on a large amount of text.
                  Because of this, we've found that while JungGPT may not be
                  "sentient" it still has the ability to decode linguistic
                  information for its inherent emotional context, and then
                  creatively work with the user in an meaningful interaction
                  using this information. We are truly benevolent in our goal to
                  give people a tool that can help them with their emotions, we
                  wish to create a better world, alas things aren't free! We
                  need your help to run the app!
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              style={{
                backgroundColor: '#5E7E91',
                marginTop: '16px',
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography
                  style={{
                    fontFamily: "'Roboto Slab', serif",
                    color: 'whitesmoke',
                  }}
                >
                  What are the benefits of subscribing?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography
                  style={{
                    textAlign: 'left',
                    color: 'whitesmoke',
                    fontFamily: "'Roboto Slab', serif",
                  }}
                >
                  If you subscribe, you gain unlimited messaging and access to
                  all models current and future. <br />
                  You are helping a small team keep a very helpful product
                  alive. <br />
                  <br />
                  By helping keep this app alive, you are also helping members
                  who find this this app useful but cannot afford the premium
                  tool.
                  <br />
                  If you believe in this technology and its benefits, consider
                  subscribing! You are helping keep this up for those who are
                  less fortunate!
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              style={{
                backgroundColor: '#95baa3',
                marginTop: '16px',
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography
                  style={{
                    fontFamily: "'Roboto Slab', serif",
                    color: 'whitesmoke',
                  }}
                >
                  Do you store data of our conversations?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography
                  style={{
                    fontFamily: "'Roboto Slab', serif",
                    color: 'whitesmoke',
                  }}
                >
                  We do store the data of conversations for legal purposes
                  within a double-encrypted server, we cannot read your
                  conversations, and privacy is of the utmost importance to us.
                  What we do read and collect is your usage amount on the app,
                  how many words per message you send, how many characters per
                  message you send, your demographics and what time you message
                  at. We do not sell your data to any third-parties. We do not
                  use your data to train our models.
                  <br />
                  <br />
                  All data is kept strictly confidential in a private database
                  that is double encrypted by both us and Google.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              style={{
                backgroundColor: '#5E7E91',
                marginBottom: '16px',
                marginTop: '16px',
                color: 'whitesmoke',
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography
                  style={{
                    fontFamily: "'Roboto Slab', serif",
                    color: 'whitesmoke',
                  }}
                >
                  Is JungGPT Multilingual?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography
                  style={{
                    textAlign: 'left',
                    fontFamily: "'Roboto Slab', serif",
                    color: 'whitesmoke',
                  }}
                >
                  Yes! JungGPT is fluent in almost every modern language! Making
                  it an effective companion for all citizens around the globe!
                </Typography>
              </AccordionDetails>
            </Accordion>
            {/* Add more Accordion components for more FAQ items */}
          </div>
        </div>
      </div>

      <Box
        sx={{
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto',
          padding: '2rem',
          width: isMobile ? '90%' : '40%',
        }}
      >
        {' '}
        <Typography
          variant="body1"
          style={{
            fontSize: '40px',
            marginTop: '0rem',
            marginBottom: '2rem',
            width: '100%',
            fontFamily: "'League Spartan', serif",
            color: '#8c7c66',
          }}
        >
          <b>Let us know how you feel!</b>
        </Typography>
        <Typography
          variant="body1"
          style={{
            justifySelf: 'center',
            alignSelf: 'center',
            textAlign: 'center',
            marginBottom: '1rem',
            width: '100%',
            lineHeight: '35px',
            fontFamily: "'Roboto Slab', serif",
          }}
        >
          We value user feedback greatly.
          <br /> Please feel free to contact us for more information or to
          submit your meaningful interactions or buggy interactions so we can
          further improve the software.
        </Typography>
        <Box
          sx={{
            justifySelf: 'center',
            alignSelf: 'center',
            textAlign: 'center',
            marginBottom: '1rem',
            marginTop: '3rem',
            width: '100%',
            backgroundColor: '#5B6B7F',
            borderRadius: '10px',
            padding: '.5rem',
            width: isMobile ? '100%' : '100%',
          }}
        >
          <Typography
            sx={{
              margin: '.5rem',

              color: 'white',
              fontSize: '1rem',

              fontFamily: "'League Spartan', serif",
            }}
          >
            {' '}
            Contact:
          </Typography>
          <Typography
            sx={{
              margin: '.7rem',
              color: 'white',

              fontFamily: "'League Spartan', serif",
              fontSize: '.9rem',
            }}
          >
            support@ventura-ux.com
          </Typography>
          <Typography
            sx={{
              margin: '.5rem',
              marginTop: '1rem',
              color: 'white',
              fontSize: '1rem',

              fontFamily: "'League Spartan', serif",
            }}
          >
            {' '}
            Media Inquiries and Press:
          </Typography>
          <Typography
            sx={{
              margin: '.7rem',
              color: 'white',

              fontFamily: "'League Spartan', serif",
              fontSize: '.9rem',
            }}
          >
            media@ventura-ux.com
          </Typography>

          <Typography
            sx={{
              margin: '.7rem',

              fontFamily: "'League Spartan', serif",
              color: 'white',
              fontSize: '.8rem',
            }}
          >
            We look forward to hearing from you!
          </Typography>
          <Box
            sx={{
              display: 'flex',
              margin: '0 auto',
              marginLeft: '1.5rem',
              width: '20%',
              justifyContent: 'center',
            }}
          >
            <IconButton
              sx={{
                color: 'whitesmoke',
              }}
              onClick={() =>
                window.open('https://www.tiktok.com/@junggpt', '_blank')
              }
            >
              <i className="fa-brands fa-tiktok"></i>
            </IconButton>
            <IconButton
              sx={{
                marginLeft: '1rem',
                color: 'whitesmoke',
              }}
              onClick={() =>
                window.open('https://www.instagram.com/junggpt', '_blank')
              }
            >
              <i className="fa fa-instagram"></i>
            </IconButton>
          </Box>
        </Box>
        <GoogleAd />
      </Box>
    </div>
  );
}
