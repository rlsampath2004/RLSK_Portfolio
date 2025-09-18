import React, { useEffect, useState } from 'react';
import './Projects.css';
import { FaGithub, FaChevronDown, FaTimes, FaShieldAlt, FaRobot, FaNetworkWired, FaChartBar } from 'react-icons/fa';
import { motion } from 'framer-motion';

// Reusable section inside the details modal
const Section = ({ title, children }) => (
  <div className="project-block">
    <h3 className="side-heading">{title}</h3>
    {children}
  </div>
);

const SummaryChips = ({ chips = [] }) => (
  <div className="summary-chips">
    {chips.map((chip, idx) => (
      <span key={idx} className={`chip ${chip.variant ? `chip--${chip.variant}` : ''}`}>
        {chip.icon && <span className="chip-icon" aria-hidden>{chip.icon}</span>}
        {chip.label}
      </span>
    ))}
  </div>
);

const ProjectCard = ({
  title,
  titleIcon,
  imageSrc,
  imageAlt,
  githubUrl,
  summaryChips,
  overview,
  objectives,
  dataset,
  preprocessing,
  models,
  metrics,
  implementation,
  results,
  conclusion,
  futureWork,
  badges = [],
  overlayIcon,
  id,
}) => {
  const [expanded, setExpanded] = useState(false);

  // lock page scroll while details are open and close on Escape
  useEffect(() => {
    let prev;
    const onKey = (e) => {
      if (e.key === 'Escape') setExpanded(false);
    };
    if (expanded) {
      prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', onKey);
    }
    return () => {
      if (expanded) {
        document.body.style.overflow = prev;
        window.removeEventListener('keydown', onKey);
      }
    };
  }, [expanded]);

  return (
    <>
      {/* Basic card (compact) */}
      <motion.section 
        className="project-card"
        id={id}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ y: -10, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="project-media">
          <img src={imageSrc} alt={imageAlt} className="project-image" />
          <div className="project-overlay">
            <div className="project-overlay-icon">{overlayIcon || titleIcon}</div>
          </div>
        </div>
        <div className="project-content">
          <div className="project-header">
            <h2 className="project-title gradient-title">
              <span className="title-icon" aria-hidden>{titleIcon}</span>
              {title}
            </h2>
            <div className="project-actions">
              <a
                className="github-link"
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Open project on GitHub"
              >
                <FaGithub />
                <span>GitHub</span>
              </a>
            </div>
          </div>

          {summaryChips?.length ? <SummaryChips chips={summaryChips} /> : null}

          {badges?.length > 0 && (
            <div className="project-badges">
              {badges.map((b, i) => (
                <span key={i} className="badge">
                  {b.icon} <span className="badge-text">{b.label}</span>
                </span>
              ))}
            </div>
          )}

          {overview && (
            <p className="overview-snippet">{overview}</p>
          )}

          <button
            type="button"
            className="toggle-btn"
            onClick={() => setExpanded(true)}
            aria-expanded={expanded}
          >
            View Details <FaChevronDown />
          </button>
        </div>
      </motion.section>

      {/* Full-page details modal */}
      {expanded && (
        <motion.div
          className="details-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="details-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`details-title-${id}`}
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ duration: 0.35 }}
          >
            <button className="close-btn" aria-label="Close details" onClick={() => setExpanded(false)}>
              <FaTimes />
            </button>

            <header className="details-header">
              <div className="details-heading-label">View Details</div>
              <h2 id={`details-title-${id}`} className="details-title gradient-title">
                <span className="title-icon" aria-hidden>{titleIcon}</span>
                {title}
              </h2>
              <a
                className="github-link"
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Open project on GitHub"
              >
                <FaGithub />
                <span>Open on GitHub</span>
              </a>
            </header>

            <div className="details-content">
              {overview && (
                <Section title="📌 Overview">
                  <p>{overview}</p>
                </Section>
              )}

              {objectives && (
                <Section title="🎯 Objectives">
                  <ul>
                    {objectives.map((obj, idx) => (
                      <li key={idx}>{obj}</li>
                    ))}
                  </ul>
                </Section>
              )}

              {dataset && (
                <Section title="📦 Dataset">
                  <ul>
                    {dataset.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </Section>
              )}

              {preprocessing && (
                <Section title="🧹 Data Preprocessing">
                  <ul>
                    {preprocessing.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </Section>
              )}

              {models && (
                <Section title="🤖 Machine Learning Models">
                  <ul>
                    {models.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </Section>
              )}

              {metrics && (
                <Section title="📊 Evaluation Metrics">
                  <ul>
                    {metrics.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </Section>
              )}

              {implementation && (
                <Section title="⚙️ Implementation">
                  <ul>
                    {implementation.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </Section>
              )}

              {results && (
                <Section title="📈 Results">
                  <div className="code-like">{results}</div>
                </Section>
              )}

              {conclusion && (
                <Section title="🧠 Conclusion">
                  <p>{conclusion}</p>
                </Section>
              )}

              {futureWork && (
                <Section title="🚀 Future Work">
                  <ul>
                    {futureWork.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </Section>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

const Projects = () => {
  // Attach global escape listener once
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setActiveCard(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="projects-page">
      <header className="projects-header">
        <div className="container">
          <motion.h1 
            className="section-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            PROJECTS
          </motion.h1>
          <motion.p
            className="projects-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            A snapshot of my hands-on work—ML pipelines, security analytics, and polished implementations.
          </motion.p>
        </div>
      </header>

      {/* Two cards side-by-side */}
      <div className="projects-grid">
        <ProjectCard
          id="project-ddos"
          cardId="project-ddos"
          title="DDoS Attack Classification Using Machine Learning with CIC-DDoS-2019 Dataset"
          titleIcon="🛡️"
          imageSrc="/static/images/ddos_detection.webp"
          imageAlt="Illustration representing DDoS detection using machine learning"
          githubUrl="https://github.com/rlsampath2004/Ddos-classification"
          summaryChips={[
            { label: 'Dataset: CIC-DDoS-2019', variant: 'dataset', icon: '📦' },
            { label: 'Top Models: RF, XGBoost', variant: 'model', icon: '🤖' },
            { label: 'Accuracy: 99.99%', variant: 'score', icon: '🏆' },
          ]}
          badges={[
            { label: 'Security', icon: <FaShieldAlt /> },
            { label: 'Networking', icon: <FaNetworkWired /> },
            { label: 'ML', icon: <FaRobot /> },
            { label: 'Metrics', icon: <FaChartBar /> },
          ]}
          overlayIcon={<FaShieldAlt />}
          overview={
            'ML-based classification model to detect and classify DDoS attacks using the CIC-DDoS-2019 dataset. Ensures timely detection to maintain availability and reliability of services.'
          }
          objectives={[
            'Preprocess and analyze the CIC-DDoS-2019 dataset',
            'Build and evaluate ML models for DDoS attack classification',
            'Compare performance metrics across multiple algorithms',
            'Accurately detect different DDoS attack types',
          ]}
          dataset={[
            'Dataset: CIC-DDoS-2019 by the Canadian Institute for Cybersecurity',
            'Includes attack types: HTTP Flood, UDP Flood, TCP SYN Flood, Port Scan, Slowloris, WebDDoS, etc.',
            '80+ traffic-based features (Flow Duration, Packet Length, Protocol, etc.)',
            'Labeled classes: BENIGN, DDoS-UDP, DDoS-SYN, DDoS-HTTP, etc.',
          ]}
          preprocessing={[
            'Loaded and merged CSVs across attack types',
            'Removed nulls, duplicates, and non-informative features',
            'Label-encoded categorical fields (attack types, protocols)',
            'Feature selection via correlation and variance threshold',
            'Train-test split (typically 80:20)',
          ]}
          models={[
            'Random Forest — Ensemble of decision trees',
            'Logistic Regression — Linear classifier',
            'K-Nearest Neighbors — Distance-based',
            'Support Vector Machine (SVM) — Effective in high-dimensional spaces',
            'XGBoost — Gradient-boosted trees',
          ]}
          metrics={['Accuracy', 'Precision', 'Recall', 'F1 Score', 'Confusion Matrix', 'ROC-AUC']}
          implementation={[
            'Python with pandas, numpy for data handling',
            'Visualization: matplotlib, seaborn',
            'Modeling: scikit-learn, xgboost',
          ]}
          results={`Accuracy: 0.9999\nF1 Score: 0.9999\n\nClassification Report (excerpt):\n  0  1.00  1.00  1.00   835\n  1  1.00  1.00  1.00  7795\n  2  1.00  1.00  1.00  8066\n  3  1.00  1.00  1.00  8028\n  4  1.00  1.00  1.00  7598\n  5  1.00  1.00  1.00  7940\n  6  1.00  1.00  1.00  7982\n  7  1.00  1.00  1.00  8049\n  8  1.00  1.00  1.00  7963\n  9  1.00  1.00  1.00  7994\n 10  1.00  1.00  1.00  7913\n 11  1.00  1.00  1.00  7820\n 12  0.94 1.00  0.97    17\n\naccuracy: 1.00 (n=88000)`}
          conclusion={
            'Ensemble models (Random Forest, XGBoost) achieved >99% accuracy and proved robust for non-linear patterns. The approach is suitable for integration into real-time monitoring systems.'
          }
          futureWork={[
            'Integrate with real-time capture tools (Wireshark/Zeek)',
            'Deploy via Flask/FastAPI as a REST API',
            'Explore deep learning (CNN/LSTM) for temporal patterns',
            'Apply dimensionality reduction (e.g., PCA) for efficiency',
          ]}
        />

        <ProjectCard
          id="project-network"
          cardId="project-network"
          title="Network Anomaly Detection using Machine Learning (KDD Cup 1999)"
          titleIcon="🛰️"
          imageSrc="/static/images/network-anomaly.jpeg"
          imageAlt="Illustration showing network anomaly detection system"
          githubUrl="https://github.com/rlsampath2004/Network-anomaly"
          summaryChips={[
            { label: 'Dataset: KDD Cup 1999', variant: 'dataset', icon: '📦' },
            { label: 'Models: LR, RF, XGBoost', variant: 'model', icon: '🤖' },
            { label: 'Intrusion Detection', variant: 'theme', icon: '🛡️' },
          ]}
          badges={[
            { label: 'Security', icon: <FaShieldAlt /> },
            { label: 'Networking', icon: <FaNetworkWired /> },
            { label: 'ML', icon: <FaRobot /> },
            { label: 'Metrics', icon: <FaChartBar /> },
          ]}
          overlayIcon={<FaNetworkWired />}
          overview={
            'A supervised ML pipeline to detect anomalous network traffic patterns and classify traffic as normal or malicious with high accuracy.'
          }
          objectives={[
            'Detect and classify various network intrusions (DoS, DDoS, Probe, etc.)',
            'Build a robust anomaly detection pipeline with strong generalization',
          ]}
          dataset={[
            'Name: KDD Cup 1999',
            'Description: Labeled network traffic records including normal and multiple attack categories',
            'Features: protocol type, service, connection duration, packet statistics, etc.',
          ]}
          preprocessing={[
            'Comprehensive data cleaning and handling of missing values',
            'Feature engineering and selection for improved detection',
            'Train/validation/test splits',
          ]}
          models={['Logistic Regression', 'Random Forest Classifier', 'XGBoost']}
          metrics={['Accuracy', 'Precision', 'Recall', 'F1-Score']}
          implementation={[
            'Python 3.x, Jupyter Notebook',
            'Libraries: pandas, numpy, scikit-learn, xgboost',
            'Visualization: matplotlib, seaborn',
          ]}
          results={'Delivered strong classification performance; confusion matrices and feature importance visualizations support model interpretability.'}
          conclusion={
            'Demonstrated an effective ML-based approach for network intrusion detection, balancing accuracy and interpretability.'
          }
          futureWork={[
            'Extend to streaming/online detection scenarios',
            'Experiment with autoencoders or isolation forests for unsupervised detection',
          ]}
        />
      </div>
    </div>
  );
};

export default Projects;
