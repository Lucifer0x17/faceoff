
import { useAuth0 } from '@auth0/auth0-react';
import { DynamicWidget } from '@dynamic-labs/sdk-react-core';
import WorldCoinBtn from '../components/WorldCoinBtn';

const Home = () => {
  const { user, isAuthenticated, isLoading } = useAuth0()
  console.log(user, isAuthenticated, isLoading)


  
    return (
      !isAuthenticated ? <WorldCoinBtn/> : (
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

// export default function Home() {
//   const [results, setResults] = useState(Array(3).fill(projectSymbols[0]))
//   const [isSpinning, setIsSpinning] = useState(false)
//   const [isLoading, setIsLoading] = useState(true)
//   const { user } = useDynamicContext();
//   const [audioInitialized, setAudioInitialized] = useState(false)
//   const audioContext = useRef(null)
//   const slotAudio = useRef(null)
//   const winAudio = useRef(null)

//   useEffect(() => {
//     const timer = setTimeout(() => setIsLoading(false), 2000)

//     const initializeAudio = () => {
//       if (!audioInitialized) {
//         audioContext.current = new (window.AudioContext || window.webkitAudioContext)()
//         slotAudio.current = new Audio('/slot.wav')
//         winAudio.current = new Audio('/win-sound.mp3')
//         setAudioInitialized(true)
//       }
//     }

//     const handleInteraction = () => {
//       initializeAudio()
//       document.removeEventListener('click', handleInteraction)
//     }

//     document.addEventListener('click', handleInteraction)

//     return () => {
//       clearTimeout(timer)
//       document.removeEventListener('click', handleInteraction)
//       if (audioContext.current) {
//         audioContext.current.close()
//       }
//     }
//   }, [audioInitialized])

//   const playSound = (audio) => {
//     if (audio && audioInitialized) {
//       audio.currentTime = 0
//       audio.play()
//     }
//   }

//   const spin = () => {
//     if (isSpinning || !user) return
//     setIsSpinning(true)
//     playSound(slotAudio.current)

//     const newResults = results.map(() => projectSymbols[0])
//     setResults(newResults)

//     const spinDuration = 5000 // 5 seconds of spinning
//     const intervalDuration = 100 // Update every 100ms for smooth animation

//     const startTime = Date.now()
//     const spinInterval = setInterval(() => {
//       setResults(prev => prev.map(() => projectSymbols[Math.floor(Math.random() * projectSymbols.length)]))
      
//       if (Date.now() - startTime >= spinDuration) {
//         clearInterval(spinInterval)
//         const finalResults = results.map(() => projectSymbols[Math.floor(Math.random() * projectSymbols.length)])
//         setResults(finalResults)
//         setIsSpinning(false)
//         playSound(winAudio.current)
//       }
//     }, intervalDuration)
//   }

//   if (isLoading) {
//     return (
//       <div style={styles.pageContainer}>
//         <div style={{fontSize: '2rem'}}>Loading...</div>
//       </div>
//     )
//   }

//   return (
//     <div style={styles.pageContainer}>
//       <h1 style={styles.title}>Crypto Slots</h1>
//       <p style={styles.subtitle}>Bet on Projects and Win Big!</p>
//       <motion.div
//         initial={{ scale: 0 }}
//         animate={{ scale: 1 }}
//         transition={{ duration: 0.5 }}
//         style={styles.slotMachine}
//       >
//         <div style={styles.reelsContainer}>
//           {results.map((result, index) => (
//             <motion.div
//               key={index}
//               style={styles.reel}
//               animate={isSpinning ? { rotateX: 360 } : { rotateX: 0 }}
//               transition={{ duration: 0.5, repeat: isSpinning ? Infinity : 0 }}
//             >
//               <img 
//                 src={result.logo} 
//                 alt={result.name} 
//                 style={styles.reelImage}
//               />
//             </motion.div>
//           ))}
//         </div>
//         <div style={styles.leverContainer}>
//           <motion.div
//             style={styles.lever}
//             whileTap={{ scale: 0.95 }}
//             onClick={spin}
//           >
//             <motion.div
//               style={styles.leverHandle}
//               animate={isSpinning ? { rotateZ: 45 } : { rotateZ: 0 }}
//               transition={{ duration: 0.2 }}
//             />
//           </motion.div>
//         </div>
//       </motion.div>
//       {!user && (
//         <p style={styles.connectMessage}>
//           Connect wallet to play!
//         </p>
//       )}
//     </div>
//   );
// }