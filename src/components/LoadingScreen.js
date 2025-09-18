import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaBrain, FaRocket, FaShieldAlt, FaCog, FaTerminal } from 'react-icons/fa';
import './LoadingScreen.css';

// Props: onComplete (function), isAdmin (boolean)
const LoadingScreen = ({ onComplete, isAdmin = false }) => {
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(0);
  
  const loadingMessages = [
    "INITIALIZING QUANTUM CORE...",
    "LOADING NEURAL NETWORKS...",
    "CONNECTING TO MATRIX...",
    "COMPILING ALGORITHMS...",
    "OPTIMIZING PERFORMANCE...",
    "ACTIVATING CYBER DEFENSE...",
    "LOADING PORTFOLIO DATA...",
    "ESTABLISHING SECURE CONNECTION...",
    "RLSK PORTFOLIO SYSTEM ONLINE"
  ];

  // Keep progress/messages running during loader animation (purely visual)
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 100;
        const increment = Math.random() * 10 + 3;
        return Math.min(prev + increment, 100);
      });
    }, 250);

    const messageInterval = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % loadingMessages.length);
    }, 500);

    return () => {
      clearInterval(interval);
      clearInterval(messageInterval);
    };
  }, [loadingMessages.length]);

  // Text for the attached panel
  const panelText = isAdmin ? 'HELLO ADMIN' : 'Welcome to my portfolio';

  // Animation timings
  const totalDuration = 5.0; // a bit longer
  const keyTimes = [0, 0.55, 1];

  return (
    <div className="loading-screen" style={{"--notchRadius": "calc((min(70vw, 340px) / 2) * 0.22)"}}>
      {/* Animated Background Grid */}
      <div className="cyber-grid">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="grid-line"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.3, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.1
            }}
          />
        ))}
      </div>

      {/* Matrix Rain Effect */}
      <div className="matrix-rain">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="matrix-column"
            style={{ left: `${(i * 2)}%` }}
            initial={{ y: -100 }}
            animate={{ y: typeof window !== 'undefined' ? window.innerHeight + 100 : 800 }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 2
            }}
          >
            {Array.from({ length: 10 }, (_, j) => (
              <span key={j} className="matrix-char">
                {String.fromCharCode(0x30A0 + Math.random() * 96)}
              </span>
            ))}
          </motion.div>
        ))}
      </div>

      {/* Floating Particles */}
      <div className="cyber-particles">
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            className="cyber-particle"
            initial={{
              x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : Math.random() * 1200,
              y: typeof window !== 'undefined' ? Math.random() * window.innerHeight : Math.random() * 800,
              opacity: 0
            }}
            animate={{
              x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : Math.random() * 1200,
              y: typeof window !== 'undefined' ? Math.random() * window.innerHeight : Math.random() * 800,
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Main Loading Content */}
      <div className="loading-content">
        {/* Logo sequence: move left with attached text, then return to center */}
        <motion.div
          className="logo-sequence"
          style={{ margin: '0 auto', display: 'flex', alignItems: 'center' }}
          initial={{ x: 0 }}
          animate={{ x: [0, -160, 0] }}
          transition={{ duration: totalDuration, ease: "easeInOut", times: keyTimes }}
          onAnimationComplete={() => {
            // Snap to exact center to avoid sub-pixel drift
            const el = document.querySelector('.logo-sequence');
            if (el) el.style.transform = 'translateX(0px)';
            if (typeof onComplete === 'function') onComplete();
          }}
        >
          <motion.div
            className="holo-logo"
            initial={{ scale: 0, rotateY: -180, opacity: 0 }}
            animate={{ scale: 1, rotateY: 0, opacity: 1 }}
            transition={{ duration: 1.5, type: "spring", bounce: 0.4 }}
          >
            <div className="logo-core">
              <motion.div
                className="logo-ring"
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <div className="ring-segment"></div>
                <div className="ring-segment"></div>
                <div className="ring-segment"></div>
              </motion.div>
              <motion.div 
                className="logo-center"
                initial={{ scale: 0.95 }}
                animate={{ scale: [0.95, 1, 0.98] }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
              >
                <motion.span 
                  className="logo-text"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 1 }}
                >
                  RLSK
                </motion.span>
              </motion.div>
            </div>
            
            {/* Logo Glow Effect */}
            <motion.div
              className="logo-glow"
              animate={{ 
                scale: [1, 1.06, 1],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </motion.div>

          {/* Attached parallelogram text panel */}
          <motion.div
            className="attached-panel"
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: [0, 1, 0], x: [8, 0, -8] }}
            transition={{ duration: totalDuration * 0.9, ease: "easeInOut", times: [0, 0.6, 1] }}
          >
            <div className="panel-content">{panelText}</div>
          </motion.div>
        </motion.div>

        {/* Cyber HUD Elements */}
        <div className="cyber-hud">
          <div className="hud-corner top-left"></div>
          <div className="hud-corner top-right"></div>
          <div className="hud-corner bottom-left"></div>
          <div className="hud-corner bottom-right"></div>
        </div>

        {/* Loading Message */}
        <motion.div
          className="loading-message"
          key={currentMessage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <FaTerminal className="terminal-icon" />
          <span>{loadingMessages[currentMessage]}</span>
        </motion.div>

        {/* Progress Bar */}
        <div className="cyber-progress">
          <div className="progress-container">
            <motion.div
              className="progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
            <div className="progress-glow"></div>
          </div>
          <div className="progress-text">{Math.floor(progress)}%</div>
        </div>

        {/* System Icons */}
        <motion.div
          className="system-icons"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          {[FaCode, FaBrain, FaRocket, FaShieldAlt, FaCog, FaTerminal].map((Icon, index) => (
            <motion.div
              key={index}
              className="system-icon"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.3
              }}
            >
              <Icon />
            </motion.div>
          ))}
        </motion.div>

        {/* Scanning Lines */}
        <motion.div
          className="scan-line"
          animate={{ y: [0, 400, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
    </div>
  );
};

export default LoadingScreen; 