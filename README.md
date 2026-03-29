# 🚀 Mohamed Ouijjane — Full-Stack Developer Portfolio

<p align="center">
  <a href="https://wejan.vercel.app" target="_blank">
    <img src="https://img.shields.io/badge/Live-Demo-000?style=for-the-badge&logo=vercel" />
  </a>
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" />
  <img src="https://img.shields.io/badge/TypeScript-Strict-blue?style=for-the-badge&logo=typescript" />
  <img src="https://img.shields.io/badge/TailwindCSS-v4-38B2AC?style=for-the-badge&logo=tailwindcss" />
  <img src="https://img.shields.io/badge/Status-Production_Ready-success?style=for-the-badge" />
</p>

---

## 🌐 Live Demo

👉 https://wejan.vercel.app

---

## ✨ Overview

A modern, production-ready full-stack developer portfolio built with Next.js, TypeScript, and Tailwind CSS.

Designed to showcase projects, skills, and technical expertise through a high-quality user experience and strong engineering practices.

**Target audience:**

* Recruiters
* Potential clients
* Developers

**What makes it different:**

* 🌍 Full internationalization (i18n)
* 📩 Advanced contact system with anti-spam protection
* ⚡ High-performance optimizations
* 🎨 Advanced animations and micro-interactions

---

## 🧠 Key Highlights

* 🔒 Secure contact system (anti-spam + rate limiting)
* 🌍 Full internationalization (i18n)
* ⚡ Performance optimized (Web Vitals, images, fonts)
* 🧩 Clean architecture (scalable & maintainable)

---

## 🎯 Why this project

This portfolio is designed not only to showcase projects but to demonstrate real-world engineering practices such as scalability, security, performance optimization, and maintainable architecture.

---

## 🛠 Tech Stack

**Framework**

* Next.js (App Router)

**Language**

* TypeScript

**Styling**

* Tailwind CSS v4
* class-variance-authority
* tailwind-merge

**UI & Animations**

* Framer Motion
* GSAP
* Radix UI
* Lucide React
* Sonner (toast notifications)

**Backend & Validation**

* Resend (Email API)
* Zod (schema validation)

**Internationalization**

* next-intl

---

## ⚡ Features

### 🌍 Internationalization

* Full support for multiple languages (FR / EN)
* Locale-based routing and translations

---

### 📩 Contact System (Production-ready)

* Client & server-side validation (Zod)
* Anti-spam protection:

  * Honeypot field
  * Content-based spam detection
  * Rate limiting (per IP)
* Email delivery using Resend
* Clean HTML email template
* `reply_to` support for direct responses

💡 You can also contact me directly:
**[ouijjanemohamed2024@gmail.com](mailto:ouijjanemohamed2024@gmail.com)**

---

### 🚀 Performance & Optimization

* Optimized images (Next/Image)
* Local fonts (no layout shifts)
* Web Vitals tracking
* Static optimization where possible

---

### 🔍 SEO

* Dynamic sitemap (`/sitemap.xml`)
* Robots.txt configuration
* Structured data (JSON-LD)
* Dynamic metadata per locale

---

### 🎨 User Experience

* Dark / Light mode
* Smooth transitions and animations
* Custom cursor and hover effects
* Decrypt text effect
* Glassmorphism UI elements

---

## 🏗 Architecture

```
app/
 ├── [locale]/        → i18n routing
 ├── api/             → API routes (contact)
components/
 ├── sections/        → Page sections (Hero, Contact, etc.)
 ├── ui/              → Reusable UI components
data/                 → Centralized content (projects, skills)
messages/             → Translations (i18n)
```

### Key Concepts

* Component composition (Radix pattern)
* Data centralization (clean separation of content & UI)
* API route handling via App Router

---

## 📩 Contact Flow

1. User submits the form
2. Frontend validates inputs
3. Request sent to `/api/contact`
4. Backend applies:

   * Rate limiting
   * Honeypot check
   * Spam detection
   * Zod validation
5. Email sent via Resend
6. User receives feedback via toast notification

---

## 🔐 Environment Variables

Create a `.env.local` file:

```
RESEND_API_KEY=your_resend_api_key
CONTACT_RECEIVER_EMAIL=your_email@gmail.com
```

---

## 🚀 Deployment

Deployed on Vercel

```
npm run build
```

Output directory:

```
.next
```

---

## ⚡ Performance & SEO

* Static rendering where possible
* Optimized assets and fonts
* Metadata handled per locale
* Web Vitals monitoring

---

## 🧪 Quality & Testing

* Basic accessibility testing included
* Focus on performance and UX consistency
* Clean and maintainable code structure

---

## 🚧 Future Improvements

* Persistent rate limiting (Redis / Upstash)
* CMS integration (Sanity or Contentful)
* Extended test coverage (unit + E2E)
* Analytics dashboard for interactions

---

## 🧪 Local Development

```
npm install
npm run dev
```

---

## 📦 Production

```
npm run build
npm run start
```

---

## 👤 Author

**Mohamed Ouijjane**

* 🌐 https://wejan.vercel.app
* 💻 https://github.com/MohamedOuijjane

---

## 💡 Final Note

This project reflects a strong focus on clean architecture, scalability, and real-world production practices.
