import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DynamicWidget, useDynamicContext, useTelegramLogin } from '@dynamic-labs/sdk-react-core';

const Home = () => {
    const { user, sdkHasLoaded } = useDynamicContext();
      const { telegramSignIn } = useTelegramLogin();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!sdkHasLoaded) return;

    const signIn = async () => {
      if (!user) {
        await telegramSignIn({ forceCreateUser: true });
      }
      setIsLoading(false);
    };

    signIn();
  }, [sdkHasLoaded]);

  
    return (
      // <div style={styles.pageContainer}>
      //   <main style={styles.mainContent}>
      //     <h2 style={styles.heading}>Slot Machine</h2>
      //     <p style={styles.description}>
      //       Bet on Projects and Win Money!!
      //     </p>
      //     {user ? (
      //       <button style={styles.button}>
      //       </button>
      //     ) : (
      //       <p style={styles.connectMessage}>Please connect your wallet to continue.</p>
      //     )}
      //   </main>
      // </div>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex flex-col items-center justify-center text-white">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center">
            <img src="/logo.png" alt="logo" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4">Onboard the world</h1>
        <p className="text-lg mb-16">
          Web3 login for <span className="text-blue-400">everyone</span>.
        </p>

        {isLoading ? <>Loading ...</> : <DynamicWidget />}
      </div>
    </div>
    );
};

const styles = {
  pageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f4f8',
    padding: '20px',
    boxSizing: 'border-box',
  },
  mainContent: {
    textAlign: 'center',
    maxWidth: '600px',
    width: '100%',
  },
  heading: {
    fontSize: '2.5rem',
    color: '#333',
    marginBottom: '20px',
  },
  description: {
    fontSize: '1.1rem',
    color: '#666',
    marginBottom: '30px',
  },
  button: {
    display: 'inline-block',
    padding: '12px 24px',
    backgroundColor: '#007bff',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    transition: 'background-color 0.3s ease',
  },
  connectMessage: {
    fontSize: '1rem',
    color: '#666',
    padding: '12px 24px',
    backgroundColor: '#f8d7da',
    borderRadius: '4px',
  },
};

export default Home;
