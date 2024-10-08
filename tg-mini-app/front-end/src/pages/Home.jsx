
import { useNavigate } from 'react-router-dom';
// import { useAuth0 } from '@auth0/auth0-react';
import { DynamicWidget } from '@dynamic-labs/sdk-react-core';
// import WorldCoinBtn from '../components/WorldCoinBtn';

const Home = () => {
  // const { user, isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();

  // if (isLoading) {
  //   return <div style={styles.loadingMessage}>Loading...</div>;
  // }

  const handlePlayClick = () => {
    navigate('/game');
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.header}>
        <img src="/logo.svg" alt="Logo" style={styles.logo} />
      
        <div style={styles.authWidgets}>
          {/* <WorldCoinBtn /> */}
          <DynamicWidget />
        </div>
      </div>
      
      {/* {isAuthenticated ? ( */}
        <div style={styles.content}>
          <h1 style={styles.title}>Welcome to BetOnBuild</h1>
          <p style={styles.subtitle}>Experience the thrill of blockchain gaming!</p>
          <button onClick={handlePlayClick} style={styles.playButton}>
            Let's Play!
          </button>
        </div>
      {/* ) : 
      (
        <div style={styles.connectMessage}>
          Please connect your wallet to access the game.
        </div>
      )} */}
    </div>
  );
};

export default Home;

const styles = {
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#D5D7E1',
    fontFamily: '"Press Start 2P", cursive',
    color: '#ffffff',
    padding: '20px',
    boxSizing: 'border-box',
    backgroundImage: 'url("/bgNouns.png")', // Add your image URL here
    backgroundSize: 'cover', // Ensures the image covers the entire container
    backgroundPosition: 'center', // Centers the background image
    backgroundRepeat: 'no-repeat', // Prevents the image from repeating
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: '0px',
  },
  logo: {
    width: '210px',
    height: 'auto',
    paddingBottom: "30px"
  },
  authWidgets: {
    display: 'flex',
    gap: '10px',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  title: {
    fontSize: '27px',
    color: '#ffd700',
    textShadow: '2px 2px #ff0000',
    marginBottom: '20px',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: '15px',
    color: '#00ff00',
    marginBottom: '30px',
    textAlign: 'center',
  },
  playButton: {
    fontSize: '18px',
    padding: '15px 30px',
    backgroundColor: '#ff4500',
    color: '#ffffff',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 0 10px rgba(255, 69, 0, 0.5)',
    ':hover': {
      backgroundColor: '#ff6347',
      transform: 'scale(1.05)',
    },
  },
  connectMessage: {
    fontSize: '1.2rem',
    color: '#ff0000',
    backgroundColor: '#ffd700',
    padding: '15px',
    borderRadius: '10px',
    marginTop: '30px',
    textAlign: 'center',
  },
  loadingMessage: {
    fontSize: '1.5rem',
    color: '#ffffff',
    textAlign: 'center',
    marginTop: '50px',
  },
};