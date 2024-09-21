import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { DynamicWidget, useDynamicContext } from '@dynamic-labs/sdk-react-core';

export default function Game() {
    const [results, setResults] = useState(Array(3).fill(projectSymbols[0]))
    const [isSpinning, setIsSpinning] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const { user } = useDynamicContext();
    const [audioInitialized, setAudioInitialized] = useState(false)
    const audioContext = useRef(null)
    const slotAudio = useRef(null)
    const winAudio = useRef(null)
    const [prizePool, setPrizePool] = useState(10000) // Example value
    const [timeLeft, setTimeLeft] = useState(300) // 5 minutes in seconds

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 2000)

        const initializeAudio = () => {
            if (!audioInitialized) {
                audioContext.current = new (window.AudioContext || window.webkitAudioContext)()
                slotAudio.current = new Audio('/slot.wav')
                winAudio.current = new Audio('/win-sound.mp3')
                setAudioInitialized(true)
            }
        }

        const handleInteraction = () => {
            initializeAudio()
            document.removeEventListener('click', handleInteraction)
        }

        document.addEventListener('click', handleInteraction)

        // Timer for countdown
        const countdownInterval = setInterval(() => {
            setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0))
        }, 1000)

        return () => {
            clearTimeout(timer)
            clearInterval(countdownInterval)
            document.removeEventListener('click', handleInteraction)
            if (audioContext.current) {
                audioContext.current.close()
            }
        }
    }, [audioInitialized])

    const playSound = (audio) => {
        if (audio && audioInitialized) {
            audio.currentTime = 0
            audio.play()
        }
    }

    const spin = () => {
        // ... (keep the existing spin logic)
    }

    if (isLoading) {
        return (
            <div style={styles.pageContainer}>
                <div style={styles.loadingText}>Loading...</div>
            </div>
        )
    }

    return (
        <div style={styles.pageContainer}>
            <h1 style={styles.title}>Crypto Slots</h1>
            <p style={styles.subtitle}>Bet on Projects and Win Big!</p>
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                style={styles.slotMachine}
            >
                <div style={styles.reelsContainer}>
                    {results.map((result, index) => (
                        <motion.div
                            key={index}
                            style={styles.reel}
                            animate={isSpinning ? { rotateX: 360 } : { rotateX: 0 }}
                            transition={{ duration: 0.5, repeat: isSpinning ? Infinity : 0 }}
                        >
                            <img
                                src={result.logo}
                                alt={result.name}
                                style={styles.reelImage}
                            />
                        </motion.div>
                    ))}
                </div>
                <div style={styles.leverContainer}>
                    <motion.div
                        style={styles.lever}
                        whileTap={{ scale: 0.95 }}
                        onClick={spin}
                    >
                        <motion.div
                            style={styles.leverHandle}
                            animate={isSpinning ? { rotateZ: 45 } : { rotateZ: 0 }}
                            transition={{ duration: 0.2 }}
                        />
                    </motion.div>
                </div>
            </motion.div>
            <div style={styles.infoContainer}>
                <div style={styles.infoBox}>
                    <span style={styles.infoLabel}>Prize Pool:</span>
                    <span style={styles.infoValue}>${prizePool.toLocaleString()}</span>
                </div>
                <div style={styles.infoBox}>
                    <span style={styles.infoLabel}>Next Spin In:</span>
                    <span style={styles.infoValue}>
                        {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                    </span>
                </div>
            </div>
            {!user && (
                <p style={styles.connectMessage}>
                    Connect wallet to play!
                </p>
            )}
        </div>
    );
}

const styles = {
    pageContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#1a1a2e',
        padding: '20px',
        boxSizing: 'border-box',
        fontFamily: '"Press Start 2P", cursive',
        color: '#ffffff',
        imageRendering: 'pixelated',
    },
    loadingText: {
        fontSize: '2rem',
        color: '#ffd700',
        textShadow: '2px 2px #ff0000',
    },
    title: {
        fontSize: '4rem',
        color: '#ffd700',
        textShadow: '4px 4px #ff0000',
        marginBottom: '20px',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: '1.8rem',
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
    infoContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: '600px',
        marginTop: '30px',
    },
    infoBox: {
        backgroundColor: '#4a4e69',
        borderRadius: '10px',
        padding: '15px',
        border: '4px solid #ffd700',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '45%',
    },
    infoLabel: {
        fontSize: '1.2rem',
        color: '#00ff00',
        marginBottom: '10px',
    },
    infoValue: {
        fontSize: '1.8rem',
        color: '#ffd700',
        textShadow: '2px 2px #ff0000',
    },
    connectMessage: {
        fontSize: '1.5rem',
        color: '#ff0000',
        backgroundColor: '#ffd700',
        padding: '15px',
        borderRadius: '10px',
        marginTop: '30px',
        textAlign: 'center',
    },
};