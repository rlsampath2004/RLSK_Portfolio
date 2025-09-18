// Contact Database Utility with Firebase and Google Sheets support
class ContactDatabase {
  constructor() {
    this.storageKey = 'portfolioContacts';
    this.backupKey = 'portfolioContactsBackup';
    this.firestore = null;
    this.firebaseHelpers = null;
    this.initFirebase();
  }

  // Initialize Firebase if available
  async initFirebase() {
    try {
      const firebaseConfig = {
        apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
        authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
        storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.REACT_APP_FIREBASE_APP_ID,
      };

      if (firebaseConfig.projectId) {
        // Dynamic import to avoid bundling issues
        const { initializeApp } = await import('firebase/app');
        const { getFirestore, addDoc, collection, serverTimestamp } = await import('firebase/firestore');
        
        const app = initializeApp(firebaseConfig);
        this.firestore = getFirestore(app);
        this.firebaseHelpers = { addDoc, collection, serverTimestamp };
      }
    } catch (e) {
      // Firebase not configured/installed; ignore
      console.log('Firebase not configured:', e.message);
    }
  }

  // Save contact to localStorage with backup
  async saveContact(contactData) {
    try {
      const contact = {
        id: Date.now() + Math.random(),
        ...contactData,
        timestamp: new Date().toISOString(),
        status: 'pending',
        source: 'Portfolio Contact Form'
      };

      // Get existing contacts
      const contacts = this.getAllContacts();
      contacts.push(contact);

      // Save to main storage
      localStorage.setItem(this.storageKey, JSON.stringify(contacts));
      
      // Create backup
      localStorage.setItem(this.backupKey, JSON.stringify(contacts));
      
      // Also save to sessionStorage for immediate access
      sessionStorage.setItem('lastContact', JSON.stringify(contact));

      // Try to save to IndexedDB for better persistence
      this.saveToIndexedDB(contact);

      // Also try to save to Firestore if configured
      await this.saveToFirestore(contact);

      // Also try to save to Google Sheets if configured
      await this.saveToGoogleSheets(contact);

      return contact;
    } catch (error) {
      console.error('Error saving contact:', error);
      return null;
    }
  }

  // Get all contacts
  getAllContacts() {
    try {
      const contacts = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
      return contacts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    } catch (error) {
      console.error('Error loading contacts:', error);
      // Try backup
      try {
        const backup = JSON.parse(localStorage.getItem(this.backupKey) || '[]');
        return backup.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      } catch (backupError) {
        console.error('Backup also failed:', backupError);
        return [];
      }
    }
  }

  // Delete contact
  deleteContact(id) {
    try {
      const contacts = this.getAllContacts().filter(contact => contact.id !== id);
      localStorage.setItem(this.storageKey, JSON.stringify(contacts));
      localStorage.setItem(this.backupKey, JSON.stringify(contacts));
      return true;
    } catch (error) {
      console.error('Error deleting contact:', error);
      return false;
    }
  }

  // Update contact status
  updateContactStatus(id, status) {
    try {
      const contacts = this.getAllContacts();
      const contactIndex = contacts.findIndex(contact => contact.id === id);
      
      if (contactIndex !== -1) {
        contacts[contactIndex].status = status;
        contacts[contactIndex].updatedAt = new Date().toISOString();
        
        localStorage.setItem(this.storageKey, JSON.stringify(contacts));
        localStorage.setItem(this.backupKey, JSON.stringify(contacts));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error updating contact status:', error);
      return false;
    }
  }

  // Export to CSV
  exportToCSV() {
    try {
      const contacts = this.getAllContacts();
      if (contacts.length === 0) return null;

      const headers = ['ID', 'Name', 'Email', 'Subject', 'Message', 'Timestamp', 'Status', 'Source'];
      const csvContent = [
        headers.join(','),
        ...contacts.map(contact => [
          contact.id,
          `"${contact.name}"`,
          contact.email,
          `"${contact.subject}"`,
          `"${contact.message.replace(/"/g, '""')}"`,
          contact.timestamp,
          contact.status,
          contact.source || 'Portfolio Contact Form'
        ].join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `portfolio-contacts-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
      
      return true;
    } catch (error) {
      console.error('Error exporting to CSV:', error);
      return false;
    }
  }

  // Export to Excel format
  exportToExcel() {
    try {
      const contacts = this.getAllContacts();
      if (contacts.length === 0) return null;

      // Create Excel-compatible format with proper structure
      const headers = ['ID', 'Name', 'Email', 'Subject', 'Message', 'Date', 'Time', 'Status', 'Source'];
      const excelData = contacts.map(contact => {
        const date = new Date(contact.timestamp);
        return [
          contact.id,
          contact.name,
          contact.email,
          contact.subject,
          contact.message,
          date.toLocaleDateString(),
          date.toLocaleTimeString(),
          contact.status,
          contact.source || 'Portfolio Contact Form'
        ];
      });

      // Create CSV content that Excel can properly read
      const csvContent = [
        headers.join(','),
        ...excelData.map(row => row.map(cell => 
          typeof cell === 'string' && (cell.includes(',') || cell.includes('"') || cell.includes('\n')) 
            ? `"${cell.replace(/"/g, '""')}"` 
            : cell
        ).join(','))
      ].join('\n');

      // Add BOM for proper Excel encoding
      const BOM = '\uFEFF';
      const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `portfolio-contacts-${new Date().toISOString().split('T')[0]}.xlsx.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
      
      return true;
    } catch (error) {
      console.error('Error exporting to Excel:', error);
      return false;
    }
  }

  // Save to IndexedDB for better persistence
  async saveToIndexedDB(contact) {
    try {
      if (!window.indexedDB) return;

      const request = indexedDB.open('PortfolioContacts', 1);
      
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains('contacts')) {
          const objectStore = db.createObjectStore('contacts', { keyPath: 'id' });
          objectStore.createIndex('timestamp', 'timestamp', { unique: false });
          objectStore.createIndex('email', 'email', { unique: false });
        }
      };

      request.onsuccess = (event) => {
        const db = event.target.result;
        const transaction = db.transaction(['contacts'], 'readwrite');
        const objectStore = transaction.objectStore('contacts');
        objectStore.add(contact);
      };
    } catch (error) {
      console.error('IndexedDB save failed:', error);
    }
  }

  // Optional: Save to Firestore if available
  async saveToFirestore(contact) {
    try {
      if (!this.firestore || !this.firebaseHelpers) return false;
      
      const { addDoc, collection, serverTimestamp } = this.firebaseHelpers;
      const docToSave = {
        ...contact,
        createdAt: serverTimestamp(),
      };
      
      await addDoc(collection(this.firestore, 'portfolioContacts'), docToSave);
      return true;
    } catch (error) {
      // Non-fatal
      console.log('Firestore save failed:', error.message);
      return false;
    }
  }

  // Optional: Save to Google Sheets via Apps Script webhook
  async saveToGoogleSheets(contact) {
    try {
      const webhookUrl = process.env.REACT_APP_SHEETS_WEBHOOK_URL;
      if (!webhookUrl) return false;

      const payload = {
        id: contact.id,
        name: contact.name,
        email: contact.email,
        subject: contact.subject,
        message: contact.message,
        timestamp: contact.timestamp,
        status: contact.status,
        source: contact.source || 'Portfolio Contact Form'
      };

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      return true;
    } catch (error) {
      // Non-fatal if webhook fails
      console.log('Google Sheets save failed:', error.message);
      return false;
    }
  }

  // Get statistics
  getStatistics() {
    const contacts = this.getAllContacts();
    const now = new Date();
    const last24h = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    return {
      total: contacts.length,
      pending: contacts.filter(c => c.status === 'pending').length,
      replied: contacts.filter(c => c.status === 'replied').length,
      last24h: contacts.filter(c => new Date(c.timestamp) > last24h).length,
      lastWeek: contacts.filter(c => new Date(c.timestamp) > lastWeek).length
    };
  }

  // Clear all contacts
  clearAll() {
    try {
      localStorage.removeItem(this.storageKey);
      localStorage.removeItem(this.backupKey);
      sessionStorage.removeItem('lastContact');
      return true;
    } catch (error) {
      console.error('Error clearing contacts:', error);
      return false;
    }
  }

  // Send email notification (using mailto)
  sendEmailNotification(contact) {
    try {
      const subject = encodeURIComponent(`New Portfolio Contact: ${contact.subject}`);
      const body = encodeURIComponent(`
New contact form submission:

Name: ${contact.name}
Email: ${contact.email}
Subject: ${contact.subject}
Date: ${new Date(contact.timestamp).toLocaleString()}

Message:
${contact.message}

---
Contact ID: ${contact.id}
Source: ${contact.source}
      `);
      
      const mailtoLink = `mailto:r.l.sampath2004@gmail.com?subject=${subject}&body=${body}`;
      
      // Open in new tab/window
      setTimeout(() => {
        window.open(mailtoLink, '_blank');
      }, 1000);
      
      return true;
    } catch (error) {
      console.error('Error sending email notification:', error);
      return false;
    }
  }
}

// Create and export a single instance
const contactDatabase = new ContactDatabase();
export default contactDatabase;