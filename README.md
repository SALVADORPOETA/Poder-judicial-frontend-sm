# PJF Data & Messaging Suite

**PJF Data & Messaging Suite** is an advanced automation and data management platform specifically designed for the **Federal Judiciary (Poder Judicial de la Federación)** ecosystem. This frontend project, built from scratch with **React 18** and **TailwindCSS**, allows users to perform deep scraping of judicial profiles, process databases with gender intelligence, and manage personalized messaging campaigns via Email and WhatsApp.

The application is **fully interactive**: you can upload JSON files, edit templates in real-time with variable detection, and manage candidates through a modern, tactile interface that prioritizes operational efficiency.

---

## ✨ Overview

This is not a tutorial project or a generic template. It is a **custom data engineering tool** that combines:

* **Two-Stage Data Extraction:** Interface for link scraping and deep detail collection.
* **Intelligent Processing:** Name cleaning algorithms and automatic gender detection for high-level personalization.
* **Omnichannel Messaging Editor:** Dynamic switching between Email (purple) and WhatsApp (green) modes with visual context changes.
* **Robust Data Architecture:** Blob handling for Excel and JSON export without loss of integrity.
* **High-Precision UI/UX:** Dark mode design inspired by developer tools, optimized for long work sessions.



---

## 🚀 Features

* ✨ **Interactive Dashboard:** Centralized management of all project phases.
* 🔍 **Integrated Scrapers:** Interface to trigger searches for ministers, magistrates, and judges.
* 📊 **Report Generator:** Dynamic conversion of JSON results to Excel files (.xlsx).
* 📥 **Data Dropzone:** File upload area with visual status feedback and type validation.
* ✍️ **Granular Personalization:** Specific modals to edit individual messages before sending.
* 🏷️ **Dynamic Tag System:** Use of variables such as `[nombre]`, `{o|a}`, and `{El|La}` for human-like communication.
* 📱 **Responsive Design:** Optimized for desktop and tablets using TailwindCSS.
* 🎨 **Status Feedback:** Loading spinners, success indicators, and animated error alerts.

---

## 🛠️ Tech Stack

| Category | Technology |
| :--- | :--- |
| **Framework** | React 18 (Vite) |
| **Styling** | TailwindCSS |
| **Iconography** | Lucide React |
| **HTTP Client** | Fetch API |
| **Animations** | Tailwind Animate |
| **State Management** | React Hooks (useState, useEffect, useMemo) |
| **Deployment** | Vercel |

---

## 💻 Getting Started

### Prerequisites

* Node.js 18+
* npm or yarn
* Active Backend API (see backend repository)

### Installation

```bash
# Clone the repository
git clone https://github.com/SALVADORPOETA/Poder-judicial-frontend-sm.git

# Navigate into the project directory
cd poder-judicial-frontend-sm

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the root directory with your API URL:
```env
VITE_APP_PASSWORD=[Your Password]

VITE_MODO_HIBRIDO=false

VITE_API_LOCAL=http://localhost:3001
VITE_API_NGROK=https://your-link.ngrok-free.dev
VITE_API_PROD=https://your-link.vercel.app
```

### Development Server

```bash
npm run dev
```

The application will be available at: `http://localhost:5173`.

---

## ⚙️ Usage

1.  **Extract:** Select a PJF list (e.g., Circuit Magistrates) and download the found links.
2.  **Process:** Upload the links JSON to the "Detail Scraper" to obtain complete profiles with email and phone numbers.
3.  **Configure:** In the Messaging Service, define your template using gender and name tags.
4.  **Review:** Click on any candidate in the table to open the final personalization modal.
5.  **Send:** Toggle between WhatsApp or Email mode and trigger the bulk communication.



---

## 📂 Project Structure

```text
frontend/
├─ src/
│  ├─ components/
│  │  ├─ LinkScraper.jsx      # Phase 1: URL Extraction
│  │  ├─ DetailScraper.jsx    # Phase 2: Deep Scraping
│  │  ├─ DataDropzone.jsx     # File Ingestion
│  │  ├─ TemplateEditor.jsx   # Dynamic Template Editor
│  │  ├─ CandidatesTable.jsx  # Database Management
│  │  ├─ MessageModal.jsx     # Email Fine-tuning
│  │  └─ WhatsAppModal.jsx    # WhatsApp Fine-tuning
│  ├─ apiConfig.js            # Endpoints Configuration
│  ├─ App.jsx                 # Router and Main Layout
│  └─ main.jsx
├─ public/
├─ tailwind.config.js
└─ package.json
```

---

## 🎨 UI & UX Design

* **Channel Visual Identity:** The system automatically switches to green for WhatsApp and purple for Email to prevent human error.
* **Editing Modals:** Clean design with `monospace` typography to facilitate the review of technical texts.
* **Tactile Interactivity:** Buttons with enhanced hover states and smooth transitions.
* **Accessibility:** Use of semantic labels and high contrast for professional environments.

---

## 📌 Originality Statement

This project is **100% original**.
* No pre-made admin templates were used.
* Name and gender processing logic was independently developed.
* The entire component architecture and scraping-to-messaging flow was designed to solve a real need in the legal sector.

---

## 👨🏽‍💻 Author

**Salvador Martínez**
*Full-Stack Developer*

* **GitHub:** [SALVADORPOETA](https://github.com/SALVADORPOETA)
* **LinkedIn:** [Salvador Martínez](https://www.linkedin.com/in/salvador-martinez-sm/)

---

## ⚖️ License

This is a portfolio project created by **Salvador Martínez**.
No commercial use intended without prior consent.
All rights reserved to the author.

---

## 💡 Notes

* Designed to optimize workflows within the Federal Judiciary.
* The frontend demonstrates advanced skills in managing complex states and designing UI for productivity tools.

---

**Would you like me to help you translate the Backend README as well, or should we move on to the next feature of the app?**
