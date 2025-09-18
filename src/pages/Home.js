import React, { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { FaArrowDown, FaGithub, FaLinkedin, FaEnvelope, FaCode, FaBrain, FaRocket, FaInstagram, FaTrophy, FaShieldAlt, FaNetworkWired } from 'react-icons/fa';
import { ReactTyped as Typed } from 'react-typed';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import ResumeViewer from '../components/ResumeViewer';
import './Home.css';

const CounterAnimation = ({ target, duration = 2000 }) => {
  const [count, setCount] = React.useState(0);
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const increment = target / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          // Handle decimal numbers
          if (target % 1 !== 0) {
            setCount(parseFloat(start.toFixed(1)));
          } else {
            setCount(Math.floor(start));
          }
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [inView, target, duration]);

  return <span ref={ref}>{count}{target >= 100 ? '+' : ''}</span>;
};

const Home = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const [ref1, inView1] = useInView({ threshold: 0.3, triggerOnce: true });
  const [ref2, inView2] = useInView({ threshold: 0.3, triggerOnce: true });

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const particlesLoaded = (container) => {
    console.log('Particles loaded', container);
  };

  const typingTexts = [
    "Java Developer",
    "Problem Solver",
    "Full Stack Developer"
  ];

  const stats = [
    { number: 100, label: "LeetCode Problems Solved", icon: FaCode },
    { number: 500, label: "CodeChef Difficulty Rating Problems Solved", icon: FaBrain },
    { number: 50, label: "LeetCode Consistency Days", icon: FaTrophy },
     { number: 8.1, label: "CGPA", icon: FaRocket },
    { number: 8, label: "Certificates", icon: FaCode },
  ];

  return (
    <div className="home">
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: "transparent",
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#00ffff",
            },
            links: {
              color: "#00ffff",
              distance: 150,
              enable: true,
              opacity: 0.3,
              width: 1,
            },
            collisions: {
              enable: true,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 1,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        }}
      />

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <div className="gradient-overlay"></div>
        </div>
        
        <motion.div 
          className="hero-container"
          style={{ y }}
        >
          <div className="hero-content">
            <motion.div 
              className="hero-text"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <motion.div 
                className="hero-badge"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <FaCode />
                <span>Available for opportunities</span>
              </motion.div>

              <motion.h1 
                className="hero-title"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                <span className="greeting">Hi, I'm</span>
                <span className="name-highlight">Ranga Lakshman Sampath Kumar</span>
              </motion.h1>

              <motion.div 
                className="hero-subtitle"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <Typed
                  strings={typingTexts}
                  typeSpeed={50}
                  backSpeed={30}
                  backDelay={2000}
                  loop
                  className="typed-text"
                />
              </motion.div>

              <motion.p 
                className="hero-description"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                Passionate about creating efficient solutions and building reliable, scalable systems.
                Based in Macherla, building the future one line of code at a time.
              </motion.p>

              <motion.div 
                className="hero-buttons"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <Link to="/contact" className="btn btn-primary btn-glow">
                  <span>Get In Touch</span>
                  <FaEnvelope />
                </Link>
                <Link to="/projects" className="btn btn-secondary">
                  <span>View Projects</span>
                  <FaCode />
                </Link>
                <ResumeViewer />
              </motion.div>
            </motion.div>

            <motion.div 
              className="hero-image"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <div className="profile-card">
                <div className="profile-img">
                  <img 
                    src="/static/images/Gemini_Generated_Image_en93open93open93.png" 
                    alt="Ranga Lakshman Sampath Kumar"
                    className="profile-photo"
                  />
                  <div className="profile-overlay">
                    <div className="profile-status">
                      <div className="status-dot"></div>
                      <span>Available</span>
                    </div>
                  </div>
                </div>
                <div className="floating-icons">
                  <motion.div 
                    className="floating-icon"
                    animate={{ y: [-10, 10, -10] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 0 }}
                  >
                    <FaCode />
                  </motion.div>
                  <motion.div 
                    className="floating-icon"
                    animate={{ y: [-10, 10, -10] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  >
                    <FaBrain />
                  </motion.div>
                  <motion.div 
                    className="floating-icon"
                    animate={{ y: [-10, 10, -10] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 2 }}
                  >
                    <FaRocket />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div 
          className="scroll-indicator"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <FaArrowDown />
          <span>Scroll to explore</span>
        </motion.div>
      </section>

      {/* Achievements Section (replaces coding platforms) */}
      <section className="quick-stats" ref={ref1}>
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            animate={inView1 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="section-title">ACHIEVEMENTS</h2>
            <p className="section-subtitle">Milestones that reflect consistency and growth</p>
          </motion.div>

          <motion.div 
            className="stats-grid"
            initial={{ opacity: 0, y: 30 }}
            animate={inView1 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            {stats.map(({ number, label, icon: Icon }, idx) => (
              <motion.div key={label} className="stat-card" whileHover={{ y: -8, scale: 1.02 }}>
                <Icon className="stat-card-icon" />
                <div className="stat-card-number"><CounterAnimation target={number} /></div>
                <div className="stat-card-label">{label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Projects Preview */}
      <section className="featured-projects">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">FEATURED PROJECTS</h2>
            <p className="section-subtitle">Innovative solutions showcasing technical expertise and creative problem-solving</p>
          </motion.div>

          <motion.div 
            className="projects-preview"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="project-preview-card"
              whileHover={{ y: -10, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="project-icon">
                <FaShieldAlt />
              </div>
              <div className="project-info">
                <h3>DDoS Attack Classification System</h3>
                <p>Advanced machine learning system achieving 96.8% accuracy in detecting and classifying DDoS attacks using Random Forest algorithm. Features comprehensive data preprocessing and real-time threat detection.</p>
                <div className="project-tech">
                  <span>Python</span>
                  <span>Machine Learning</span>
                  <span>Scikit-learn</span>
                  <span>Random Forest</span>
                  <span>Security Analytics</span>
                </div>
                <div className="project-metrics">
                  <span className="metric">96.8% Accuracy</span>
                  <span className="metric">Real-time Detection</span>
                  <span className="metric">Multiple Algorithms</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="project-preview-card"
              whileHover={{ y: -10, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="project-icon">
                <FaNetworkWired />
              </div>
              <div className="project-info">
                <h3>Network Anomaly Detection System</h3>
                <p>Sophisticated network security system using machine learning to detect anomalous behavior and potential threats in network traffic with automated early warning capabilities.</p>
                <div className="project-tech">
                  <span>Python</span>
                  <span>Network Security</span>
                  <span>Anomaly Detection</span>
                  <span>Machine Learning</span>
                  <span>Real-time Monitoring</span>
                </div>
                <div className="project-metrics">
                  <span className="metric">Real-time Analysis</span>
                  <span className="metric">Automated Alerts</span>
                  <span className="metric">Pattern Recognition</span>
                </div>
              </div>
            </motion.div>



            <div className="view-all-projects">
              <Link to="/projects" className="btn btn-outline">
                <span>View All Projects</span>
                <FaRocket />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Social Links Section */}
      <section className="social-links" ref={ref2}>
        <div className="container">
          <motion.div 
            className="social-grid"
            initial={{ opacity: 0, y: 50 }}
            animate={inView2 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.a 
              href="https://github.com/rlsampath2004" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-card github"
              whileHover={{ y: -10, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaGithub className="social-icon" />
              <div className="social-info">
                <h3>GitHub</h3>
                <p>Check out my projects</p>
              </div>
            </motion.a>

            <motion.a 
              href="https://www.linkedin.com/in/lakshman-sampath-kumar-ranga-1100b12a5" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-card linkedin"
              whileHover={{ y: -10, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaLinkedin className="social-icon" />
              <div className="social-info">
                <h3>LinkedIn</h3>
                <p>Connect with me</p>
              </div>
            </motion.a>

            <motion.a 
              href="https://instagram.com/sampath.ranga.106" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-card instagram"
              whileHover={{ y: -10, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaInstagram className="social-icon" />
              <div className="social-info">
                <h3>Instagram</h3>
                <p>Follow my journey</p>
              </div>
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home; 