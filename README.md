# 🏠 RentNest - Modern Rental Property Marketplace

> "Find & List Rental Properties with Ease"

RentNest is a full-featured, modern, and responsive property rental marketplace application built with **Next.js** (App Router). It bridges the gap between tenants looking for ideal homes, landlords managing their properties and requests, and administrators overseeing platform health.

---

## 🚀 Live Demo & Links
* **Live Deployment:** https://rentnest-navy.vercel.app
* **Backend Repository:** https://github.com/tamjid97/RentNest_epickdev.git
* **Video Walkthrough:** https://youtu.be/_ZtuveLOK4A?si=o-idrNiUKaLr8uXw

---

## ✨ Key Features & Functionalities

### 🌍 Public Features
* **Responsive Property Grid:** Displays available properties optimized with Next.js `next/image`, pricing, locations, and key amenities.
* **Advanced Search & Filter:** Real-time filtering by location, price range, property type, and features.
* **Property Details Page:** Comprehensive view featuring an image gallery, detailed descriptions, landlord information, and a seamless "Request to Rent" call-to-action.
* **Robust UI States:** Elegant skeleton loaders for data fetching and graceful error fallbacks (`error.tsx`).

### 👤 Tenant Features
* **Authentication Flows:** Secure registration and login forms with validation error handling.
* **Interactive Rental Request Flow:** Submit requests with preferred dates. Approved listings unlock the integrated payment gateway checkout ("Pay Now" CTA).
* **Payment Integration:** Secure checkout integration with Stripe, paired with dedicated success and cancel redirection pages.
* **Tenant Dashboard:** Track rental request histories (with color-coded status badges: *Pending, Approved, Rejected, Active, Completed*), view payment histories, and submit post-stay reviews.

### 🏘️ Landlord Features
* **Landlord Dashboard:** High-level overview of total properties, active rental requests, and earnings.
* **Property Management (CRUD):** Complete forms to create, edit, and remove property listings with image URL uploads and availability toggles.
* **Request Management Table:** Review incoming tenant requests with instant "Approve" and "Reject" action triggers accompanied by toast notifications.

### 🛡️ Admin Features
* **Admin Platform Dashboard:** Global platform insights displaying total users, active properties, and platform health.
* **User Management:** Data tables with search, pagination, and user moderation controls (*Ban/Unban* actions).
* **Content Moderation:** Comprehensive views to inspect all listings and requests across the platform.

---

## 🛠️ Tech Stack & Tools

* **Framework:** Next.js (App Router, Server Actions, Server Components)
* **Styling:** Tailwind CSS, Lucide React (Icons)
* **State Management & Data Fetching:** React Hooks, Native `fetch` with Next.js caching & revalidation (`revalidatePath`)
* **Authentication & Security:** JWT (JSON Web Tokens), Cookies, Next.js Middleware for role-based route protection
* **Database & ORM (Backend):** Prisma ORM, PostgreSQL
* **Deployment:** Vercel

---

## 📂 Project Routing Structure (Next.js App Router)

| Route Path | Component / Feature | Access Level |
| :--- | :--- | :--- |
| `/` | Home page with featured properties & categories | Public |
| `/properties` | Browse & filter all properties | Public |
| `/properties/[id]` | Property details & rental request action | Public / Tenant |
| `/register` | Role selection & registration form | Public |
| `/login` | Login form | Public |
| `/tenant` | Tenant overview & request history | Tenant Only |
| `/tenant/properties/[id]` | Payment initiation page | Tenant Only |
| `/payment/success` & `/payment/cancel` | Payment outcome feedback pages | Tenant Only |
| `/landlord` | Landlord overview & property list | Landlord Only |
| `/landlord/property-manage` | Create/Edit property form | Landlord Only |
| `/landlord/rental-requests` | Manage incoming tenant requests | Landlord Only |
| `/admin` | Admin platform overview & user management | Admin Only |

---

## 🔐 Administrative Test Credentials

For evaluation and grading purposes, you can access the pre-configured admin account using the following credentials:

> **Email:** `admin@example.com`  
> **Password:** `password123`

---

## 👨‍💻 Author
Built with ❤️ by https://epickdev.vercel.app 
*Assignment 5 - Frontend Web Development*
