
import { useAuth0 } from '@auth0/auth0-react';
import { DynamicWidget } from '@dynamic-labs/sdk-react-core';
import WorldCoinBtn from '../components/WorldCoinBtn';

const Home = () => {
  const { user, isAuthenticated, isLoading } = useAuth0()
  console.log(user, isAuthenticated, isLoading)

    return (
      !isAuthenticated ? <WorldCoinBtn/> : (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex flex-col items-center justify-center text-white">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center">
            <img src="/logo.png" alt="logo" />
          </div>
        </div>
        <h3 className="text-4xl font-bold mb-4">{user?.sub}</h3>
        <h1 className="text-4xl font-bold mb-4">Onboard the world</h1>
        <p className="text-lg mb-16">
          Web3 login for <span className="text-blue-400">everyone</span>.
        </p>

        {<DynamicWidget />}
      </div>
    </div>)
    );
};

export default Home;

const styles = {
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#1a1a2e',
    padding: '20px',
    boxSizing: 'border-box',
    fontFamily: '"Press Start 2P", cursive',
    color: '#ffffff',
    imageRendering: 'pixelated',
  },
  title: {
    fontSize: '3rem',
    color: '#ffd700',
    textShadow: '2px 2px #ff0000',
    marginBottom: '20px',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: '1.5rem',
    color: '#00ff00',
    marginBottom: '30px',
    textAlign: 'center',
  },
  slotMachine: {
    backgroundColor: '#4a4e69',
    borderRadius: '20px',
    padding: '30px',
    boxShadow: '0 0 20px rgba(255, 215, 0, 0.5)',
    border: '8px solid #ffd700',
    maxWidth: '90%',
    width: '600px',
  },
  reelsContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    backgroundColor: '#000000',
    padding: '20px',
    borderRadius: '10px',
    marginBottom: '30px',
  },
  reel: {
    width: '120px',
    height: '120px',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '4px solid #ffd700',
  },
  reelImage: {
    width: '80%',
    height: '80%',
    objectFit: 'contain',
  },
  leverContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  lever: {
    width: '60px',
    height: '180px',
    backgroundColor: '#c0c0c0',
    borderRadius: '30px',
    position: 'relative',
    cursor: 'pointer',
  },
  leverHandle: {
    width: '30px',
    height: '90px',
    backgroundColor: '#ff0000',
    position: 'absolute',
    bottom: '0',
    left: '15px',
    borderRadius: '15px 15px 0 0',
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
};