import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useForm } from 'react-hook-form';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, FaCode, FaPaperPlane, FaWhatsapp, FaInstagram } from 'react-icons/fa';
import toast from 'react-hot-toast';
import contactDatabase from '../utils/contactDatabase';
import './Contact.css';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ref1, inView1] = useInView({ threshold: 0.3, triggerOnce: true });
  const [ref2, inView2] = useInView({ threshold: 0.3, triggerOnce: true });

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Always save locally for reliability
      const contactData = {
        name: data.name,
        email: data.email,
        subject: data.subject || 'Portfolio Contact',
        message: data.message
      };

      const savedContact = contactDatabase.saveContact(contactData);

      if (savedContact) {
        toast.success('Message received! I\'ll get back to you within 24 hours.');
        // Email sending and external submissions disabled to avoid redirects
        // contactDatabase.sendEmailNotification(savedContact);
        // Removed external fetch to prevent any navigation/redirect
        reset();
      } else {
        toast.error('Unable to save your message. Please email me directly.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('There was an error sending your message. Please try again or contact me directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: FaEnvelope,
      label: 'Email',
      value: 'r.l.sampath2004@gmail.com',
      link: 'mailto:r.l.sampath2004@gmail.com'
    },
    {
      icon: FaPhone,
      label: 'Phone',
      value: '+91 9059557827',
      link: 'tel:+919059557827'
    },
    {
      icon: FaMapMarkerAlt,
      label: 'Location',
      value: 'Macherla, India',
      link: null
    }
  ];

  const socialLinks = [
    {
      icon: FaLinkedin,
      label: 'LinkedIn',
      value: 'lakshman-sampath-kumar-ranga',
      url: 'https://www.linkedin.com/in/lakshman-sampath-kumar-ranga-1100b12a5'
    },
    {
      icon: FaGithub,
      label: 'GitHub',
      value: 'rlsampath2004',
      url: 'https://github.com/rlsampath2004'
    },
    {
      icon: FaCode,
      label: 'LeetCode',
      value: 'bcR8GKUbcX',
      url: 'https://leetcode.com/u/bcR8GKUbcX/'
    }
  ];

  return (
    <div className="contact-page">
      <div className="container">
        {/* Hero Section */}
        <motion.section 
          className="contact-hero"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="page-title">Get In Touch</h1>
          <p className="page-subtitle">Let's discuss opportunities and collaborations</p>
        </motion.section>

        <div className="contact-content">
          {/* Contact Info */}
          <section className="contact-info" ref={ref1}>
            <motion.div 
              className="info-content"
              initial={{ opacity: 0, x: -50 }}
              animate={inView1 ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <h2>Let's Connect</h2>
              <p>
                I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology.
                Feel free to reach out through any of the platforms below!
              </p>

              <div className="contact-details">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <motion.div
                      key={index}
                      className="contact-item"
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView1 ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Icon className="contact-icon" />
                      <div className="contact-text">
                        <span className="contact-label">{info.label}</span>
                        {info.link ? (
                          <a href={info.link} className="contact-value">
                            {info.value}
                          </a>
                        ) : (
                          <span className="contact-value">{info.value}</span>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="social-links">
                <h3>Follow Me</h3>
                <div className="social-grid">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={inView1 ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Icon className="social-icon" />
                        <div className="social-info">
                          <span className="social-name">{social.label}</span>
                          <span className="social-handle">@{social.value}</span>
                        </div>
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </section>

          {/* Contact Form */}
          <section className="contact-form" ref={ref2}>
            <motion.div 
              className="form-content"
              initial={{ opacity: 0, x: 50 }}
              animate={inView2 ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <h2>Connect With Me</h2>
              <div className="contact-alternatives">
                <div className="contact-methods">
                  <h3>Quick Contact Options</h3>
                  <div className="contact-buttons">
                    <a 
                      href="mailto:r.l.sampath2004@gmail.com?subject=Portfolio Contact&body=Hi Ranga, I'd like to connect with you regarding..."
                      className="contact-btn email-btn"
                    >
                      <FaEnvelope />
                      <span>Email Me Directly</span>
                    </a>
                    
                    <a 
                      href="https://www.linkedin.com/in/ranga-lakshman-sampath-kumar-5b8b8b1b1/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-btn linkedin-btn"
                    >
                      <FaLinkedin />
                      <span>LinkedIn Message</span>
                    </a>
                    
                    <a 
                      href="https://wa.me/919059557827?text=Hi%20Ranga,%20I%20found%20your%20portfolio%20and%20would%20like%20to%20connect"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-btn whatsapp-btn"
                    >
                      <FaWhatsapp />
                      <span>WhatsApp Chat</span>
                    </a>
                    
                    <a 
                      href="https://instagram.com/sampath.ranga.106"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-btn instagram-btn"
                    >
                      <FaInstagram />
                      <span>Instagram DM</span>
                    </a>
                  </div>
                </div>
                
                <div className="contact-form-section">
                  <h3>Or Fill Out This Form</h3>
                  <p className="form-note">I'll get back to you within 24 hours!</p>
                </div>
              </div>
              
              <form onSubmit={handleSubmit(onSubmit)} className="form">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    {...register('name', { required: 'Name is required' })}
                    className={errors.name ? 'error' : ''}
                    placeholder="Your name"
                  />
                  {errors.name && <span className="error-message">{errors.name.message}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    className={errors.email ? 'error' : ''}
                    placeholder="Your email address"
                  />
                  {errors.email && <span className="error-message">{errors.email.message}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    {...register('subject', { required: 'Subject is required' })}
                    className={errors.subject ? 'error' : ''}
                    placeholder="What's this about?"
                  />
                  {errors.subject && <span className="error-message">{errors.subject.message}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    rows="5"
                    {...register('message', { required: 'Message is required' })}
                    className={errors.message ? 'error' : ''}
                    placeholder="Tell me about your project or opportunity..."
                  />
                  {errors.message && <span className="error-message">{errors.message.message}</span>}
                </div>

                <motion.button
                  type="submit"
                  className="btn btn-primary submit-btn"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="spinner"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Contact; 