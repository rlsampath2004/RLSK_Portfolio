import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaTrash, FaEye, FaDownload, FaSync, FaCheckCircle, FaSignOutAlt } from "react-icons/fa";
import contactDatabase from "../utils/contactDatabase";
import AdminLogin from "./AdminLogin";
import "./ContactAdmin.css";

const ContactAdmin = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const loggedIn = sessionStorage.getItem('adminLoggedIn');
    const loginTime = sessionStorage.getItem('adminLoginTime');
    
    // Session expires after 2 hours
    if (loggedIn && loginTime && (Date.now() - parseInt(loginTime)) < 2 * 60 * 60 * 1000) {
      setIsLoggedIn(true);
      loadContacts();
    } else {
      // Clear expired session
      sessionStorage.removeItem('adminLoggedIn');
      sessionStorage.removeItem('adminLoginTime');
    }
  }, []);

  const loadContacts = () => {
    const stored = contactDatabase.getAllContacts();
    setContacts(stored);
  };

  const deleteContact = (id) => {
    if (contactDatabase.deleteContact(id)) {
      setContacts(contacts.filter((c) => c.id !== id));
    }
  };

  const exportToCSV = () => {
    contactDatabase.exportToCSV();
  };

  const exportToExcel = () => {
    contactDatabase.exportToExcel();
  };

  const markAsReplied = (id) => {
    if (contactDatabase.updateContactStatus(id, 'replied')) {
      setContacts(contacts.map(c => 
        c.id === id ? { ...c, status: 'replied' } : c
      ));
    }
  };

  const replyToContact = (contact) => {
    // Changed to in-app mark as replied (no external redirect)
    markAsReplied(contact.id);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminLoggedIn');
    sessionStorage.removeItem('adminLoginTime');
    setIsLoggedIn(false);
    setContacts([]);
    setSelectedContact(null);
    setShowModal(false);
  };

  // Show login screen if not authenticated
  if (!isLoggedIn) {
    return <AdminLogin onLogin={setIsLoggedIn} />;
  }

  const filtered = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="contact-admin">
      <div className="admin-header">
        <div className="admin-title">
          <h2>Contact Messages Admin</h2>
          <p>Logged in as: <strong>rlsk_admin</strong></p>
        </div>
        <div className="admin-actions">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="admin-search"
          />
          <button onClick={loadContacts} className="admin-btn refresh"><FaSync /> Refresh</button>
          <button onClick={exportToCSV} className="admin-btn export" disabled={contacts.length === 0}><FaDownload /> CSV</button>
          <button onClick={exportToExcel} className="admin-btn export" disabled={contacts.length === 0}><FaDownload /> Excel</button>
          <button onClick={() => { if(window.confirm("Clear all?")) { contactDatabase.clearAll(); setContacts([]); }}} className="admin-btn danger" disabled={contacts.length === 0}><FaTrash /> Clear All</button>
          <button onClick={handleLogout} className="admin-btn logout"><FaSignOutAlt /> Logout</button>
        </div>
      </div>

      <div className="contacts-table">
        {filtered.length === 0 ? (
          <p className="no-contacts">No contacts found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Date</th><th>Name</th><th>Email</th><th>Subject</th><th>Status</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <motion.tr key={c.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <td>{new Date(c.timestamp).toLocaleDateString()}</td>
                  <td>{c.name}</td>
                  <td>{c.email}</td>
                  <td>{c.subject}</td>
                  <td><span className={`status-badge ${c.status}`}>{c.status}</span></td>
                  <td>
                    <button className="action-btn view" onClick={() => { setSelectedContact(c); setShowModal(true); }} title="View Details"><FaEye /></button>
                    <button className="action-btn reply" onClick={() => replyToContact(c)} title="Mark as Replied"><FaCheckCircle /></button>
                    <button className="action-btn delete" onClick={() => deleteContact(c.id)} title="Delete"><FaTrash /></button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showModal && selectedContact && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <motion.div className="modal-content" onClick={(e) => e.stopPropagation()} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            <div className="modal-header">
              <h3>Message Details</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <p><strong>Name:</strong> {selectedContact.name}</p>
              <p><strong>Email:</strong> {selectedContact.email}</p>
              <p><strong>Subject:</strong> {selectedContact.subject}</p>
              <p><strong>Date:</strong> {new Date(selectedContact.timestamp).toLocaleString()}</p>
              <p><strong>Status:</strong> {selectedContact.status}</p>
              <div className="message-content">{selectedContact.message}</div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ContactAdmin;
