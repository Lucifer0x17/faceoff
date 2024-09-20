import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import { DynamicContextProvider, DynamicWidget, useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";

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
