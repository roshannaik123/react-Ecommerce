# 🛒 React E-Commerce Store

A performance-optimized e-commerce web application built using React.js with focus on scalability, clean architecture, and Core Web Vitals improvement.

🔗 Live Demo:https://whimsical-moonbeam-59444e.netlify.app/
📂 GitHub Repository: https://github.com/roshannaik123/react-Ecommerce 

---

## 📌 Project Overview

This project is a production-ready e-commerce platform designed to demonstrate modern frontend engineering practices including performance optimization, scalable state management, and clean component architecture.

The application allows users to browse products, search, filter, authenticate securely, and manage cart functionality with optimized rendering performance.

---

## 🛠 Tech Stack

- React.js
- Redux Toolkit
- React Query (Server-State Management)
- Firebase Authentication
- Tailwind CSS
- Vite
- Axios / Fetch API
- JavaScript (ES6+)

---

## 🚀 Features

- 🛍 Product listing with filtering & pagination
- 🔍 Debounced product search
- 🛒 Add to cart & cart state management
- 🔐 Secure authentication with protected routes
- ⚡ Performance optimized rendering
- 📱 Fully responsive UI (mobile-first design)
- 🌙 Dark / Light theme support

---

## ⚡ Performance Improvements & Optimizations

### 🚀 1. Reduced Initial Load Time (~30%)
- Implemented code splitting using dynamic imports.
- Applied lazy loading for non-critical components.
- Optimized bundle size by removing unused dependencies.

### 🎯 2. Improved Core Web Vitals (LCP Optimization)
- Optimized product images (compression + proper sizing).
- Prioritized above-the-fold content rendering.
- Deferred non-critical resources for faster initial paint.

### 🔄 3. Minimized Unnecessary Re-renders
- Used `React.memo` for pure components.
- Applied `useMemo` for expensive computations.
- Centralized state management using Redux Toolkit.

### 📡 4. Optimized API Performance
- Implemented React Query caching.
- Reduced redundant API calls with background refetching.
- Managed loading and error states efficiently.

### 🔍 5. Improved User Experience
- Implemented debounced search input to reduce API load.
- Added filtering and pagination for scalability.
- Integrated protected routes using Firebase Authentication.

---

## 🧠 Architecture Highlights

- Component-based architecture
- Centralized global state using Redux Toolkit
- Server-state management using React Query
- Separation of UI, business logic, and API services
- Clean folder structure for scalability

---

## 📂 Folder Structure

  ```
src/
 ├── components/
 ├── pages/
 ├── store/
 ├── services/
 ├── hooks/
 ├── utils/
 └── App.jsx
```

---

## 📦 Installation & Setup

Clone the repository:

```
git clone https://github.com/roshannaik123/react-Ecommerce
```

Navigate to project directory:

```
cd react-Ecommerce
```

Install dependencies:

```
npm install
```

Run the development server:

```
npm run dev
```

---

## 🔐 Authentication

- Firebase Authentication is used.
- Protected routes restrict access to authenticated users.
- User sessions are managed securely.

---

## 📊 Performance Focus

This project was built with emphasis on:

- Core Web Vitals improvement
- Efficient rendering strategies
- Scalable state management
- Optimized network requests
- Clean and maintainable code

---

## 📬 Contact

👤 Roshan Naik  
📧 naikr9972@gmail.com  
🔗 LinkedIn:https://www.linkedin.com/in/roshannaik1/
💻 GitHub: https://github.com/roshannaik123  

---

⭐ If you found this project useful, consider giving it a star!
