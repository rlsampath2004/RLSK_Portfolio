import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaDownload, FaEye, FaTimes } from 'react-icons/fa';
import './ResumeViewer.css';

const ResumeViewer = () => {
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const resumeUrl = "/static/resume/resume.pdf";

  return (
    <>
      <div className="resume-actions">
        <motion.button
          className="btn btn-primary resume-view-btn"
          onClick={() => setIsViewerOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaEye />
          <span>View Resume</span>
        </motion.button>
        
        <motion.a
          href={resumeUrl}
          download="resume.pdf"
          className="btn btn-secondary resume-download-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaDownload />
          <span>Download Resume</span>
        </motion.a>
      </div>

      <AnimatePresence>
        {isViewerOpen && (
          <motion.div
            className="resume-viewer-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsViewerOpen(false)}
          >
            <motion.div
              className="resume-viewer-container"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="resume-viewer-header">
                <h3>Resume - Ranga Lakshman Sampath Kumar</h3>
                <div className="resume-viewer-actions">
                  <a
                    href={resumeUrl}
                    download="resume.pdf"
                    className="btn btn-sm btn-primary"
                  >
                    <FaDownload />
                    Download
                  </a>
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => setIsViewerOpen(false)}
                  >
                    <FaTimes />
                    Close
                  </button>
                </div>
              </div>
              
              <div className="resume-viewer-content">
                <iframe
                  src={resumeUrl}
                  title="Resume"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ResumeViewer;