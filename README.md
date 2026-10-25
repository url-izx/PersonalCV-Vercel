# Personal CV Web Application (Vercel Edition)

A modern, responsive, and interactive Personal Curriculum Vitae (CV) and developer portfolio website built for academic compliance and professional industry presentation.

---

## 👨‍💻 Student Information
- **Student Name:** Earl Laurence R. Masana
- **Degree / Program:** Bachelor of Science in Information Technology (BSIT)
- **Current Year Level:** 4th Year Senior
- **Institution:** Davao del Norte State College (DNSC)
- **Senior High School:** Southern Davao National High School
- **Specialization / Career Title:** Web Developer & Aspiring Full-Stack Software Engineer
- **GitHub Account:** [@url-izx](https://github.com/url-izx)
- **Email:** [earlmasana1@gmail.com](mailto:earlmasana1@gmail.com)

---

## 🌐 Live Deployment
- **Live Vercel Link:** [https://personal-cv-vercel.vercel.app](https://personal-cv-vercel.vercel.app) *(or connect your repository directly via [Vercel](https://vercel.com))*
- **GitHub Repository:** [https://github.com/url-izx/PersonalCV-Vercel.git](https://github.com/url-izx/PersonalCV-Vercel.git)

---

## 🛠️ Technologies Used
- **Frontend Core:** HTML5 (Semantic Structure, Accessible Landmarks, SEO Tags)
- **Styling:** Vanilla CSS3 (Custom Design System, CSS Variables, Glassmorphism, Flexbox, CSS Grid)
- **Logic & Interactivity:** Vanilla JavaScript (ES6+, IntersectionObserver, DOM Manipulation, LocalStorage)
- **Backend Handler:** PHP 8 (`backend/contact.php` for form validation, sanitization, and logging)
- **Icons & Typography:** Font Awesome 6, Google Fonts (`Outfit` & `Plus Jakarta Sans`)
- **Version Control & Hosting:** Git, GitHub, Vercel

---

## 📋 Comprehensive 10 CV Sections Included
1. **Personal Profile**: Full name, career title, professional portrait photo, personal intro, and career objective.
2. **Basic Information**: Location (Panabo / Davao del Norte), email address with one-click copy, contact phone, personal summary, and career interests.
3. **Education**: Davao del Norte State College (BSIT 4th Year) & Southern Davao National High School with academic achievements and milestones.
4. **Technical & Professional Skills**: HTML, CSS, JavaScript, Web Development, PHP, MySQL Database Management, Git & GitHub, UI/UX Design, Problem Solving, and Team Communication with animated progress indicators and category filters.
5. **Projects**: Featured web systems with previews, tech stacks, repository links, and interactive modal details:
   - *DNSC Student Information & Academic Portal*
   - *BarangayConnect: Resident Records Management System*
   - *Aura POS & Smart Inventory System*
   - *Personal CV & Developer Portfolio*
6. **GitHub Profile**: Working link to [@url-izx](https://github.com/url-izx) with quick repo highlights.
7. **LinkedIn Profile**: Dedicated professional spotlight card for recruiter connections.
8. **Social Media Links**: Facebook, Instagram, LinkedIn, GitHub, and direct email channels.
9. **Achievements & Certifications**: Dean's Honor recognition, Web Development Bootcamp certificate, Git seminar, and Hackathon participation.
10. **Experience**: Capstone Project Lead, IT Department Student Assistant, Freelance Web Developer, and SITS organizational involvement.

---

## ✨ Interactive & UI Features
- **Dark / Light Theme Switcher**: Persisted across visits via browser `localStorage`.
- **Scroll-Triggered Animations**: Smooth reveal animations powered by modern `IntersectionObserver`.
- **Animated Skill Meters**: Progress bars that fill dynamically when scrolled into view.
- **Interactive Project Modal**: Pop-up window displaying system architectural features and high-res previews.
- **Interactive Category Filtering**: Filter skills and projects dynamically by category.
- **Copy-to-Clipboard**: One-click email copying with visual feedback.
- **Print / PDF Optimized Stylesheet**: Dedicated `@media print` styling for clean, professional PDF resume export.
- **Fully Responsive**: Optimized for mobile phones, tablets, laptops, and ultra-wide screens.

---

## 📂 Project Directory Structure
```text
PersonalCV-Vercel/
├── assets/
│   └── images/
│       ├── profile.jpg             # Professional profile photograph
│       ├── project-dnsc.jpg        # DNSC Portal system preview
│       ├── project-barangay.jpg    # Barangay records preview
│       └── project-inventory.jpg   # POS & inventory system preview
├── backend/
│   └── contact.php                 # PHP endpoint for contact form handling
├── css/
│   └── style.css                   # Complete design system & responsive styling
├── js/
│   └── main.js                     # Theme toggle, scroll animations, modals & filters
├── index.html                      # Semantic HTML5 single-page CV web application
└── README.md                       # Documentation & course submission details
```

---

## 🚀 How to Run Locally & Deploy to Vercel

### 1. Run Locally (Static or XAMPP)
- **Static Frontend**: Simply open `index.html` in any web browser, or run a local server (e.g., Live Server in VS Code).
- **With PHP Backend (XAMPP / LAMP)**:
  1. Clone this repository into your `xampp/htdocs/` folder.
  2. Start **Apache** in the XAMPP Control Panel.
  3. Navigate to `http://localhost/PersonalCV-Vercel/` in your browser.

### 2. Deploy to Vercel
1. Ensure your latest changes are pushed to GitHub:
   ```bash
   git push origin main
   ```
2. Go to [https://vercel.com](https://vercel.com) and log in with your GitHub account.
3. Click **Add New...** -> **Project**.
4. Select `PersonalCV-Vercel` from your GitHub repository list.
5. Keep default settings (Framework: *Other*, Root Directory: `./`).
6. Click **Deploy**. Vercel will build and provide your live URL in seconds!

---

*Academic Project Submission for BSIT - Davao del Norte State College (DNSC)*