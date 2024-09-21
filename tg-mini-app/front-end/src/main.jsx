import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import { DynamicContextProvider, DynamicWidget, useDynamicContext, useTelegramLogin } from '@dynamic-labs/sdk-react-core';
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";

const ProtectedRoute = ({ children }) => {
  console.log('location', window.location);
  const { user } = useDynamicContext();
  if (!user) {
    return null; // Won't render the protected component if the user is not connected.
  }
  return children;
};

const AppContent = () => {

      const { user, sdkHasLoaded } = useDynamicContext();
      const { telegramSignIn } = useTelegramLogin();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!sdkHasLoaded) return;

    const signIn = async () => {
      if (!user) {
        console.log("=============",user)
        await telegramSignIn({ forceCreateUser: true });
      }
      setIsLoading(false);
    };

    signIn();
  }, [sdkHasLoaded]);
  console.log("user main",user)
  if (!user) {
    // Show only the wallet connect button if the user is not connected
    return (
      // <div style={styles.centerContainer}>
      //   <DynamicWidget />
      //   <p>Please connect your wallet to continue.</p>
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
  }

  // Once the user is connected, show the main app content
  return <RouterProvider router={router} />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  ]);

const App = () => (
  <React.StrictMode>
    <DynamicContextProvider
      settings={{
        environmentId: '563e0d9c-0c48-4afe-bafd-11ab2a1309aa',
        walletConnectors: [EthereumWalletConnectors],
      }}
    >
      <AppContent />
    </DynamicContextProvider>
  </React.StrictMode>
);

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

export default App;

const styles = {
  centerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    minHeight: '100vh', // Full viewport height
    backgroundColor: '#f0f4f8',
  },
};
