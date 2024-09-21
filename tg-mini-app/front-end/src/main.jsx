import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import World from "./pages/World.jsx";
import Game from "./pages/Game.jsx";
import { DynamicContextProvider, DynamicWidget, useDynamicContext, useTelegramLogin } from '@dynamic-labs/sdk-react-core';
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { Auth0Provider } from "@auth0/auth0-react";
import Txn from "./pages/Txn.jsx";
import { headFiles } from "./utils/constants.js";
import NounBg from "./components/NounBg.jsx";
import "./index.css"

const ProtectedRoute = ({ children }) => {
  const { user } = useDynamicContext();
  return user ? children : null;
};

const AppContent = () => {
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
  

  if (!user) {
    return (
      <div style={styles.pageContainer}>
        <img src="/logo.svg" alt="logo" className="z-10" />
        <div style={styles.contentContainer}>
          <h1 style={styles.title}>BetOnBuild</h1>
          <p style={styles.subtitle}>Crypto Slot Adventure</p>
          {isLoading ? (
            <div style={styles.loadingText}>Loading...</div>
          ) : (
            <div style={styles.widgetContainer}>
              <DynamicWidget />
            </div>
          )}
          <button style={styles.playButton} onClick={() => {}}>
            Connect Wallet to Play!
          </button>
        </div>
        {/* <NounBg/> */}
      </div>
    );
  }

  return <RouterProvider router={router} />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/world",
    element: <World />,
  },
  {
    path: "/game",
    element: <Game />,
  },
  {
    path: "/txn",
    element: <Txn/>
  }
  ]);

const App = () => (
  <React.StrictMode>
    <DynamicContextProvider
      settings={{
        environmentId: '563e0d9c-0c48-4afe-bafd-11ab2a1309aa',
        walletConnectors: [EthereumWalletConnectors],
      }}
    >
      <Auth0Provider 
        domain="dev-8ytr3rxa7tb5zxef.us.auth0.com" 
        clientId="P9GTebKHMDMAOQwcNwhNxa8QuRazLI1E" 
        authorizationParams={{
          redirect_uri: window.location.origin, 
          audience: "https://dev-8ytr3rxa7tb5zxef.us.auth0.com/api/v2/",
          scope: "read:current_user update:current_user_metadata"
        }}
      >
        <AppContent />
      </Auth0Provider>
    </DynamicContextProvider>
  </React.StrictMode>
);

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

export default App;

const styles = {
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#D5D7E1',
    padding: '20px',
    boxSizing: 'border-box',
    fontFamily: '"Press Start 2P", cursive',
    color: '#ffffff',
    // position: 'relative',
    backgroundImage: 'url("/bgNouns.png")', // Add your image URL here
    backgroundSize: 'cover', // Ensures the image covers the entire container
    backgroundPosition: 'center', // Centers the background image
    backgroundRepeat: 'no-repeat', // Prevents the image from repeating
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    height: '100vh',
  },
  title: {
    fontSize: '27px',
    color: '#ffd700',
    textShadow: '4px 4px #ff0000',
    marginBottom: '20px',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: '15px',
    color: '#00ff00',
    marginBottom: '30px',
    textAlign: 'center',
  },
  loadingText: {
    fontSize: '2rem',
    color: '#ffd700',
    marginBottom: '20px',
  },
  widgetContainer: {
    marginBottom: '30px',
  },
  playButton: {
    fontSize: '12px',
    padding: '15px 9px',
    backgroundColor: '#ff4500',
    color: '#ffffff',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 0 10px rgba(255, 69, 0, 0.5)',
    fontFamily: '"Press Start 2P", cursive',
    textTransform: 'uppercase',
    // letterSpacing: '2px',
    marginTop: '20px',
    '&:hover': {
      backgroundColor: '#ff6347',
      transform: 'scale(1.05)',
    },
    '&:active': {
      transform: 'scale(0.95)',
    },
  },
};