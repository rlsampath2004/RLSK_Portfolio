import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCode, FaBrain, FaRocket, FaAward, FaTrophy, FaMedal, FaEye, FaExternalLinkAlt, FaTimes } from 'react-icons/fa';
import './Certifications.css';

const SlidingCertificates = ({ images, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="sliding-certificates">
      <div className="slide-container">
        {images.map((image, index) => (
          <motion.img
            key={index}
            src={image}
            alt={`${title} ${index + 1}`}
            className={`slide-image ${index === currentIndex ? 'active' : ''}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentIndex ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          />
        ))}
      </div>
      <div className="slide-indicators">
        {images.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

const CertificateModal = ({ cert, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Handle multiple images for Coincent certificates
  const images = cert.images || [cert.image];
  const hasMultipleImages = images.length > 1;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <motion.div
      className="cert-modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="cert-modal"
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 50 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="cert-modal-close" onClick={onClose}>
          <FaTimes />
        </button>
        
        <div className="cert-modal-header">
          <h3>{cert.title}</h3>
          <p>{cert.organization}</p>
          {hasMultipleImages && (
            <p className="cert-counter">
              {currentImageIndex + 1} of {images.length}
            </p>
          )}
        </div>
        
        <div className="cert-modal-content">
          {hasMultipleImages && (
            <button className="cert-nav-btn cert-nav-prev" onClick={prevImage}>
              ‹
            </button>
          )}
          
          <img 
            src={images[currentImageIndex]} 
            alt={`${cert.title} ${currentImageIndex + 1}`}
            className="cert-modal-image"
          />
          
          {hasMultipleImages && (
            <button className="cert-nav-btn cert-nav-next" onClick={nextImage}>
              ›
            </button>
          )}
        </div>
        
        {hasMultipleImages && (
          <div className="cert-modal-indicators">
            {images.map((_, index) => (
              <button
                key={index}
                className={`cert-modal-indicator ${index === currentImageIndex ? 'active' : ''}`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

const Certifications = () => {
  const [selectedCert, setSelectedCert] = useState(null);
  const certifications = [
    {
      id: 1,
      title: "100+ LeetCode Problems Solved",
      organization: "LeetCode",
      date: "2024",
      description: "Successfully solved over 100 coding problems demonstrating strong algorithmic thinking and problem-solving capabilities across various data structures and algorithms.",
      skills: ["Data Structures", "Algorithms", "Problem Solving", "Time Complexity"],
      image: "/static/images/leetcode-problems.png",
      icon: FaCode,
      color: "#FFA116",
      link: "https://leetcode.com/u/bcR8GKUbcX/",
      achievements: [
        "Solved 100+ problems across different difficulty levels",
        "Mastered array, string, and tree-based algorithms",
        "Optimized solutions for time and space complexity",
        "Consistent daily practice and improvement"
      ]
    },
    {
      id: 2,
      title: "50 Days Consistent Coding Badge",
      organization: "LeetCode",
      date: "2024",
      description: "Achieved 50 days of consistent coding practice on LeetCode, demonstrating dedication and continuous learning in programming and algorithmic problem-solving.",
      skills: ["Daily Practice", "Consistency", "Problem Solving", "Algorithmic Thinking"],
      image: "/static/images/leetcode-consistent.png",
      icon: FaBrain,
      color: "#00D4AA",
      link: "https://leetcode.com/u/bcR8GKUbcX/",
      achievements: [
        "Maintained 50+ days of consistent daily coding",
        "Solved problems across various difficulty levels",
        "Built strong programming discipline",
        "Improved algorithmic thinking through daily practice"
      ]
    },
    {
      id: 3,
      title: "CodeChef 500 Difficulty Problem Solving",
      organization: "CodeChef",
      date: "2024",
      description: "Successfully solved 500 difficulty rating problems on CodeChef platform, showcasing advanced competitive programming skills and algorithmic expertise.",
      skills: ["Competitive Programming", "Advanced Algorithms", "Mathematical Problem Solving", "Time Optimization"],
      image: "/static/images/codechef-achievement.png",
      icon: FaRocket,
      color: "#5B4638",
      link: "#",
      achievements: [
        "Achieved 500 difficulty rating problems solved certificate in competitive programming",
        "Participated in monthly long challenges",
        "Solved complex algorithmic problems",
        "Improved ranking through consistent practice"
      ]
    },
    {
      id: 4,
      title: "Salesforce Agentforce Certificate",
      organization: "Salesforce",
      date: "2024",
      description: "Professional certification in Salesforce Agentforce platform, covering AI-powered customer service solutions and CRM automation.",
      skills: ["Salesforce", "AI Customer Service", "CRM", "Cloud Solutions", "Automation"],
      image: "/static/images/salesforce-cert.png",
      icon: FaAward,
      color: "#00A1E0",
      link: "#",
      achievements: [
        "Mastered Salesforce Agentforce platform",
        "Implemented AI-powered customer service solutions",
        "Configured CRM automation workflows",
        "Achieved professional certification status"
      ]
    },
    {
      id: 5,
      title: "CodeTantra Python Course Completion",
      organization: "CodeTantra",
      date: "2023",
      description: "Comprehensive Python programming course covering fundamentals, data structures, object-oriented programming, and web development concepts.",
      skills: ["Python", "Data Structures", "OOP", "Web Development", "Problem Solving"],
      image: "/static/images/codetantra-python.png",
      icon: FaTrophy,
      color: "#3776AB",
      link: "#",
      achievements: [
        "Completed comprehensive Python curriculum",
        "Built multiple Python projects",
        "Mastered data structures and algorithms in Python",
        "Achieved course completion certificate"
      ]
    },
    {
      id: 6,
      title: "AICTE Google Cloud Gen AI",
      organization: "AICTE & Google Cloud",
      date: "2024",
      description: "Advanced certification in Generative AI using Google Cloud Platform, covering AI model development, deployment, and cloud-based AI solutions.",
      skills: ["Generative AI", "Google Cloud", "AI", "Model Development", "Cloud Computing"],
      image: "/static/images/AICTE Gen-Ai.png",
      icon: FaBrain,
      color: "#4285F4",
      link: "#",
      achievements: [
        "Mastered Generative AI concepts and applications",
        "Implemented AI models on Google Cloud Platform",
        "Learned cloud-based AI deployment strategies",
        "Completed AICTE-Google Cloud partnership program"
      ]
    },
    {
      id: 7,
      title: "Oasis Web Internship",
      organization: "Oasis Infobyte",
      date: "2023",
      description: "Completed web development internship focusing on full-stack development, modern web technologies, and real-world project implementation.",
      skills: ["HTML5", "CSS3", "JavaScript", "React", "Full-Stack Development", "Web Design"],
      image: "/static/images/oasis-internship.png",
      icon: FaCode,
      color: "#FF6B35",
      link: "#",
      achievements: [
        "Completed full-stack web development internship",
        "Built responsive web applications",
        "Worked with modern JavaScript frameworks",
        "Delivered real-world client projects"
      ]
    },
    {
      id: 8,
      title: "CodSoft Java Internship Certificate",
      organization: "CodSoft",
      date: "2023",
      description: "Java development internship certificate covering enterprise Java development, Spring Boot framework, and software engineering best practices.",
      skills: ["Java", "Spring Boot", "Enterprise Development", "Software Engineering", "Database Integration"],
      image: "/static/images/codsoft.png",
      icon: FaAward,
      color: "#ED8B00",
      link: "#",
      achievements: [
        "Completed Java enterprise development internship",
        "Built Java Enterprise applications",
        "Implemented database integration solutions",
        "Followed software engineering best practices"
      ]
    },
    {
      id: 9,
      title: "Coincent Internship Certifications",
      organization: "Coincent",
      date: "2024",
      description: "Complete internship program with certification, participation, and completion certificates demonstrating comprehensive engagement in professional development activities.",
      skills: ["Professional Development", "Internship Program", "Industry Experience", "Skill Development"],
      images: [
        "/static/images/coincent certification.png",
        "/static/images/coincent participation.png", 
        "/static/images/coincent completion.png"
      ],
      icon: FaTrophy,
      color: "#00D4AA",
      link: "#",
      achievements: [
        "Completed comprehensive internship program",
        "Received certification for professional development",
        "Active participation in all program activities",
        "Successfully completed all internship requirements"
      ],
      isSliding: true
    },
    {
      id: 10,
      title: "Oasis Data Science Internship",
      organization: "Oasis Infobyte",
      date: "2023",
      description: "Data Science internship focusing on data analysis, machine learning, feature engineering, and model evaluation with real-world datasets.",
      skills: ["Python", "Pandas", "NumPy", "Data Visualization", "Machine Learning", "Feature Engineering", "Model Evaluation"],
      image: "/static/images/Oasis-Datascience.png",
      icon: FaAward,
      color: "#ED8B00",
      link: "#",
      achievements: [
        "Completed end-to-end data science internship projects",
        "Performed data cleaning, EDA, and feature engineering",
        "Built and evaluated ML models (e.g., Logistic Regression, Random Forest)",
        "Communicated insights using visualizations and reports"
      ]
    }
  ];

  const stats = [
    { number: 100, label: "Problems Solved in Leetcode", icon: FaCode },
    { number: 50, label: "Days Consistent", icon: FaBrain },
    { number: 500, label: "Difficulty Rating Problems Solved in Codechef", icon: FaRocket },
    { number: 8, label: "Certifications", icon: FaMedal }
  ];

  return (
    <div className="certifications-page">
      {/* Hero Section */}
      <section className="cert-hero">
        <div className="container">
          <motion.div
            className="cert-hero-content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="cert-hero-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Certifications & Achievements
            </motion.h1>
            <motion.p 
              className="cert-hero-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Professional certifications and competitive programming achievements that showcase my technical expertise and continuous learning journey.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="cert-stats">
        <div className="container">
          <motion.div 
            className="stats-grid"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div 
                  key={index}
                  className="stat-card"
                  whileHover={{ y: -10, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Icon className="stat-icon" />
                  <div className="stat-number">{stat.number}+</div>
                  <div className="stat-label">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Certifications Grid */}
      <section className="cert-grid-section">
        <div className="container">
          <motion.div 
            className="certifications-grid"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {certifications.map((cert, index) => {
              const Icon = cert.icon;
              return (
                <motion.div 
                  key={cert.id}
                  className="cert-card"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  viewport={{ once: true }}
                >
                  <div className="cert-image">
                    {cert.isSliding ? (
                      <SlidingCertificates images={cert.images} title={cert.title} />
                    ) : (
                      <img src={cert.image} alt={cert.title} />
                    )}
                    <div className="cert-overlay">
                      <Icon className="cert-icon" style={{ color: cert.color }} />
                    </div>
                  </div>
                  
                  <div className="cert-content">
                    <div className="cert-header">
                      <h3 className="cert-title">{cert.title}</h3>
                      <div className="cert-org">{cert.organization}</div>
                      <div className="cert-date">{cert.date}</div>
                    </div>
                    
                    <p className="cert-description">{cert.description}</p>
                    
                    <div className="cert-achievements">
                      <h4>Key Achievements:</h4>
                      <ul>
                        {cert.achievements.map((achievement, idx) => (
                          <li key={idx}>{achievement}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="cert-skills">
                      {cert.skills.map((skill, idx) => (
                        <span key={idx} className="skill-tag">{skill}</span>
                      ))}
                    </div>
                    
                    <div className="cert-actions">
                      {cert.link !== "#" && (
                        <a 
                          href={cert.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="cert-link"
                        >
                          <FaExternalLinkAlt />
                          View Profile
                        </a>
                      )}
                      <button 
                        className="cert-view"
                        onClick={() => setSelectedCert(cert)}
                      >
                        <FaEye />
                        View Certificate
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Certificate Viewer Modal */}
      <AnimatePresence>
        {selectedCert && (
          <CertificateModal 
            cert={selectedCert} 
            onClose={() => setSelectedCert(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Certifications;