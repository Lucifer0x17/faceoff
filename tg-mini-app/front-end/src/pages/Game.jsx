import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { DynamicWidget, useDynamicContext, useTelegramLogin } from '@dynamic-labs/sdk-react-core';

export default function Home() {
    const [results, setResults] = useState(Array(3).fill(projectSymbols[0]))
    const [isSpinning, setIsSpinning] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const { user } = useDynamicContext();
    const [audioInitialized, setAudioInitialized] = useState(false)
    const audioContext = useRef(null)
    const slotAudio = useRef(null)
    const winAudio = useRef(null)

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

        return () => {
            clearTimeout(timer)
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
        if (isSpinning || !user) return
        setIsSpinning(true)
        playSound(slotAudio.current)

        const newResults = results.map(() => projectSymbols[0])
        setResults(newResults)

        const spinDuration = 5000 // 5 seconds of spinning
        const intervalDuration = 100 // Update every 100ms for smooth animation

        const startTime = Date.now()
        const spinInterval = setInterval(() => {
            setResults(prev => prev.map(() => projectSymbols[Math.floor(Math.random() * projectSymbols.length)]))

            if (Date.now() - startTime >= spinDuration) {
                clearInterval(spinInterval)
                const finalResults = results.map(() => projectSymbols[Math.floor(Math.random() * projectSymbols.length)])
                setResults(finalResults)
                setIsSpinning(false)
                playSound(winAudio.current)
            }
        }, intervalDuration)
    }

    if (isLoading) {
        return (
            <div style={styles.pageContainer}>
                <div style={{ fontSize: '2rem' }}>Loading...</div>
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
            {!user && (
                <p style={styles.connectMessage}>
                    Connect wallet to play!
                </p>
            )}
        </div>
    );
}

<div style={styles.pageContainer}>
    <main style={styles.mainContent}>
        <h2 style={styles.heading}>Slot Machine</h2>
        <p style={styles.description}>
            Bet on Projects and Win Money!!
        </p>
        {user ? (
            <button style={styles.button}>
            </button>
        ) : (
            <p style={styles.connectMessage}>Please connect your wallet to continue.</p>
        )}
    </main>
</div>
