# RLSK Portfolio - Java Developer & Problem Solver

A modern, responsive portfolio website built with React showcasing Ranga Lakshman Sampath Kumar's achievements and projects.

## 🚀 Features

- **Modern UI/UX**: Cyberpunk-inspired design with smooth animations
- **Responsive Design**: Works perfectly on all devices
- **Contact Form**: Stores messages locally and optionally in Google Sheets/Firebase
- **Advanced Cursor**: Custom cyber cursor with interactive effects
- **Loading Screen**: Beautiful animated loading experience
- **Achievement Showcase**: Highlights coding achievements and certifications

## 🏆 Achievements Displayed

- **100+ LeetCode Problems Solved**
- **500+ CodeChef Difficulty Rating Problems Solved**
- **50 Days Consistent Coding on LeetCode**
- **8.1 CGPA in Academics**
- **9+ Certifications**

## 🛠️ Tech Stack

- **Frontend**: React 18, Framer Motion, CSS3
- **Styling**: Custom CSS with cyberpunk theme
- **Icons**: React Icons
- **Particles**: React TSParticles
- **Storage**: LocalStorage, IndexedDB, Firebase (optional), Google Sheets (optional)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

## 🔧 Configuration

### Basic Setup
The app works out of the box with local storage for contact messages.

### Google Sheets Integration (Optional)
1. Create a Google Sheet with headers: ID, Name, Email, Subject, Message, Timestamp, Status, Source
2. Create Google Apps Script with the code from `GOOGLE_SHEETS_SETUP.md`
3. Deploy as web app and copy the URL
4. Add to `.env`:
   ```
   REACT_APP_SHEETS_WEBHOOK_URL=YOUR_WEB_APP_URL
   ```

### Firebase Integration (Optional)
1. Create a Firebase project
2. Enable Firestore
3. Add to `.env`:
   ```
   REACT_APP_FIREBASE_API_KEY=your_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   ```

## 📱 Pages

- **Home**: Hero section with achievements and featured projects
- **About**: Personal information, skills, and experience
- **Projects**: Detailed project showcase with ML algorithms
- **Certifications**: Professional certifications and achievements
- **Contact**: Contact form with multiple storage options
- **Admin**: Contact message management (`/admin/contacts`)

## 🎨 Customization

### Colors
Update CSS variables in `src/index.css`:
```css
:root {
  --primary-color: #00ffff;
  --secondary-color: #00cccc;
  --accent-color: #0080ff;
  --background-color: #000000;
  --surface-color: #111111;
}
```

### Content
- Update personal information in respective page components
- Modify achievements in `src/pages/Home.js`
- Add/remove projects in `src/pages/Projects.js`
- Update certifications in `src/pages/Certifications.js`

## 📊 Contact Form Storage

The contact form automatically stores messages in:
1. **LocalStorage** (always active)
2. **IndexedDB** (for better persistence)
3. **Firebase Firestore** (if configured)
4. **Google Sheets** (if webhook URL provided)

### Viewing Messages
- **Local Admin**: Visit `/admin/contacts` to view, export, and manage messages
- **CSV Export**: Download all contacts as CSV from admin panel
- **Firebase**: Check Firestore console
- **Google Sheets**: Check your configured spreadsheet

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
1. Connect your GitHub repository
2. Build command: `npm run build`
3. Publish directory: `build`

### Deploy to Vercel
1. Import your GitHub repository
2. Framework preset: Create React App
3. Build command: `npm run build`
4. Output directory: `build`

## 🔍 Troubleshooting

### Contact Form Not Working
- Check browser console for errors
- Ensure all environment variables are set correctly
- Verify Google Sheets webhook URL is accessible
- Check Firebase configuration if using

### Build Errors
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check for syntax errors in components
- Ensure all imports are correct

### Styling Issues
- Check CSS custom properties in `src/index.css`
- Verify all CSS files are imported correctly
- Check for conflicting CSS rules

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For questions or issues:
- Email: r.l.sampath2004@gmail.com
- LinkedIn: [Ranga Lakshman Sampath Kumar](https://www.linkedin.com/in/lakshman-sampath-kumar-ranga-1100b12a5)
- GitHub: [rlsampath2004](https://github.com/rlsampath2004)

---

**Built with ❤️ by Ranga Lakshman Sampath Kumar**