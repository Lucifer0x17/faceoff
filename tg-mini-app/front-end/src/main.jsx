import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import World from "./pages/World.jsx";
import { DynamicContextProvider, DynamicWidget, useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { Auth0Provider } from "@auth0/auth0-react";

const ProtectedRoute = ({ children }) => {
  const { user } = useDynamicContext();
  if (!user) {
    return null; // Won't render the protected component if the user is not connected.
  }
  return children;
};

const AppContent = () => {
  const { user } = useDynamicContext();

  if (!user) {
    // Show only the wallet connect button if the user is not connected
    return (
      <div style={styles.centerContainer}>
        <DynamicWidget />
        <p>Please connect your wallet to continue.</p>
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
  {
    path: "/world",
    element: <World />,
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
      <Auth0Provider domain="dev-8ytr3rxa7tb5zxef.us.auth0.com" 
                      clientId="P9GTebKHMDMAOQwcNwhNxa8QuRazLI1E" 
                      authorizationParams={{
                        redirect_uri: window.location.origin, 
                        audience: "https://dev-8ytr3rxa7tb5zxef.us.auth0.com/api/v2/",
                        scope: "read:current_user update:current_user_metadata"
                      }}>
      <AppContent />
      </Auth0Provider>

    </DynamicContextProvider>
  </React.StrictMode>
);

ReactDOM.createRoot(document.getElementById("root")).render(

                  <App/>
  );

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
