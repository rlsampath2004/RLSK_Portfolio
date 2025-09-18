import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaCode, FaBrain, FaGraduationCap, FaMapMarkerAlt, FaDownload, FaJava, FaPython, FaHtml5, FaCss3Alt, FaChartBar } from 'react-icons/fa';
import './About.css';

const About = () => {
  const [ref1, inView1] = useInView({ threshold: 0.3, triggerOnce: true });
  const [ref2, inView2] = useInView({ threshold: 0.3, triggerOnce: true });
  const [ref3, inView3] = useInView({ threshold: 0.3, triggerOnce: true });

  const skills = [
    { name: 'Java', icon: FaJava, level: 90, category: 'Programming' },
    { name: 'Python', icon: FaPython, level: 85, category: 'Programming' },
    { name: 'HTML5', icon: FaHtml5, level: 88, category: 'Frontend' },
    { name: 'CSS3', icon: FaCss3Alt, level: 85, category: 'Frontend' },
    { name: 'Power BI', icon: FaChartBar, level: 80, category: 'Analytics' },
  ];

  const experience = [
    {
      title: 'DSA Expert',
      company: 'Leetcode',
      period: '2025 - Present',
      description: 'Solved 200+ coding problems in Leetcode platform.'
    },
    {
      title: 'Problem Solver',
      company: 'CodeChef',
      period: '2024',
      description: 'Solved 100+ coding problems in CodeChef platform and acheived the certificate solving problems with 500 difficulty rating in codechef platform.'
    },
    {
      title: 'Learning Basics of Java',
      company: 'Beginner Stage',
      period: '2023',
      description: 'Through reading a book "Core Java An Integrated Approach" by Dr.R.Nageswara Rao.'
    }
  ];

  return (
    <div className="about-page">
      
      <div className="container">
        
        {/* Hero Section */}
        <motion.section 
          className="about-hero"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="page-title">About Me</h1>
          <p className="page-subtitle">Passionate Java Developer & Problem Solver</p>
        </motion.section>

        {/* Personal Info Section */}
        <section className="personal-info" ref={ref1}>
          <motion.div 
            className="info-content"
            initial={{ opacity: 0, x: -50 }}
            animate={inView1 ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="info-text">
              <h2>Who I Am</h2>
              <p>
                I'm a passionate Java Developer with a strong foundation in software development and machine learning.
                Currently pursuing my B.Tech at QIS College of Engineering and Technology, Ongole, I'm dedicated to
                creating innovative solutions that make a difference.
              </p>
              <p>
                My journey in programming started with Java, and I've since expanded my skills to include Python and
                modern web development. I love solving complex problems and turning ideas into reality.
              </p>
            </div>
            
            <div className="info-details">
              <div className="detail-item">
                <FaMapMarkerAlt className="detail-icon" />
                <div className="detail-content">
                  <span className="detail-label">Location</span>
                  <span className="detail-value">Macherla, India</span>
                </div>
              </div>
              <div className="detail-item">
                <FaGraduationCap className="detail-icon" />
                <div className="detail-content">
                  <span className="detail-label">Education</span>
                  <span className="detail-value">QIS College of Engineering and Technology, Ongole</span>
                </div>
              </div>
              <div className="detail-item">
                <FaCode className="detail-icon" />
                <div className="detail-content">
                  <span className="detail-label">Role</span>
                  <span className="detail-value">Java Developer</span>
                </div>
              </div>
            </div>

            <motion.button
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => alert('Resume will be available soon!')}
            >
              <FaDownload />
              <span>Download Resume</span>
            </motion.button>
          </motion.div>
        </section>
        

        {/* Skills Section */}
        <section className="skills-section" ref={ref2}>
          <motion.div 
            className="skills-content"
            initial={{ opacity: 0, y: 50 }}
            animate={inView2 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="section-title">Skills & Technologies</h2>
            
            <div className="skills-grid">
              {['Programming', 'Frontend', 'Analytics'].map((category) => (
                <div key={category} className="skill-category">
                  <h3 className="category-title">{category}</h3>
                  <div className="skill-items">
                    {skills
                      .filter(skill => skill.category === category)
                      .map((skill, index) => {
                        const Icon = skill.icon;
                        return (
                          <motion.div 
                            key={skill.name}
                            className="skill-item"
                            initial={{ opacity: 0, x: -20 }}
                            animate={inView2 ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                          >
                            <div className="skill-info">
                              <Icon className="skill-icon" />
                              <span className="skill-name">{skill.name}</span>
                            </div>
                            <div className="skill-level">
                              <div className="skill-bar">
                                <motion.div 
                                  className="skill-fill"
                                  initial={{ width: 0 }}
                                  animate={inView2 ? { width: `${skill.level}%` } : {}}
                                  transition={{ duration: 1, delay: index * 0.1 }}
                                />
                              </div>
                              <span className="skill-percentage">{skill.level}%</span>
                            </div>
                          </motion.div>
                        );
                      })}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Experience Section */}
        <section className="experience-section" ref={ref3}>
          <motion.div 
            className="experience-content"
            initial={{ opacity: 0, y: 50 }}
            animate={inView3 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="section-title">My Coding Journey</h2>
            
            <div className="experience-timeline">
              {experience.map((exp, index) => (
                <motion.div 
                  key={index}
                  className="timeline-item"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={inView3 ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  <div className="timeline-content">
                    <div className="timeline-header">
                      <h3 className="timeline-title">{exp.title}</h3>
                      <span className="timeline-period">{exp.period}</span>
                    </div>
                    <div className="timeline-company">{exp.company}</div>
                    <p className="timeline-description">{exp.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default About; 