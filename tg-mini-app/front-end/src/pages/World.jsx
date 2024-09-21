import { useAuth0 } from "@auth0/auth0-react";


const World = () => {
    const { loginWithRedirect } = useAuth0();
  
    return (
      <div style={styles.pageContainer}>
        <button onClick={() => loginWithRedirect()}>Log In with redirect</button>;
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

export default World;
