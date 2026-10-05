# Tazminur Rahman Tanim — Portfolio

A modern, full-stack portfolio website built with Next.js 16, featuring a public-facing site and a secure admin dashboard for managing all content dynamically.

**Live:** [tazminur.me](https://tazminur.me)

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 & Custom CSS Shaders
- **Physics & Motion Engine:** Framer Motion 12 (3D Tilt & Magnetic Physics)
- **Design Aesthetic:** 3D Antigravity & Cyber-Void (OLED Void #010103)
- **Database:** MongoDB with Mongoose
- **Image Storage:** Cloudinary
- **Authentication:** JWT (jose) with HTTP-only cookies
- **Deployment:** Vercel

## Features

### Public Site (3D Antigravity & Cyber-Void UI/UX)
- **Floating Island Cyber-Pill Navbar** with ambient neon backlight and spring sliding indicator
- **Asymmetric 3D Hero** with kinetic typography, magnetic CTAs, and orbital framed profile visual
- **Symmetrical 2x2 Bento Matrix** for Featured Projects with live status tags and deep telemetry modal
- **3D Gyroscopic TiltCards** with dynamic specular cursor spotlight gradients
- **Magnetic Physics Buttons** with gravitational cursor attraction and zero-layout shift
- **Kinetic Capabilities Radar** on Skills page with spring-animated domain filtering
- **Holographic Experience Timeline** and Bento Metrics Grid on About page
- **Verified Accreditations Gallery** on Certificates page with issue/expiry formatters
- **Client Endorsement Carousel & Archive Grid** on Testimonials page
- **Transmission Terminal** Contact Form saving directly to MongoDB
- **Open Graph Metadata** with dynamic profile image for social sharing
- **Zero Layout Shift (CLS 0)** optimized for 60-120 FPS performance

### Admin Dashboard (`/dashboard`)
- Password-protected with JWT authentication and middleware route protection
- **Projects CRUD** — Add, edit, delete projects with image upload, tech stack autocomplete suggestions, and priority ordering
- **Certificates CRUD** — LinkedIn-style form with issue/expiration dates, credential ID, skill suggestions, and priority ordering
- **Testimonials CRUD** — Manage client testimonials with status control
- **Messages Inbox** — View, read, and delete contact form submissions
- **Profile Picture** — Upload/manage the profile image (updates Hero, About, and OG image)
- **Dashboard Overview** — Real-time stats and recent activity from all collections
- SweetAlert2 notifications throughout

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Cloudinary account

### Environment Variables

Create a `.env` file in the root:

```env
MONGO_URI=your_mongodb_connection_string
Cloudinary_API_SECRET=your_cloudinary_secret
Cloudinary_API_KEY=your_cloudinary_key
Cloudinary_CLOUD_NAME=your_cloud_name
Clodinary_FOLDER=portfolio
NEXT_PUBLIC_SITE_URL=https://your-domain.com
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
JWT_SECRET=your_jwt_secret
```

### Install & Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the public site and [http://localhost:3000/dashboard](http://localhost:3000/dashboard) for the admin panel.

## Project Structure

```
app/
├── (site)/              # Public pages (home, about, skills, projects, etc.)
├── dashboard/           # Admin dashboard pages
├── api/                 # API routes (projects, certificates, testimonials, messages, auth, og)
├── components/          # Shared components (Hero, Navbar, Footer, SectionHeading)
├── layout.tsx           # Root layout with metadata & OG config
lib/                     # MongoDB connection & Cloudinary utilities
models/                  # Mongoose models (Project, Certificate, Testimonial, Message, SiteSettings)
middleware.ts            # Dashboard route protection
```

## Deployment

Deploy to Vercel and add all environment variables in the Vercel dashboard settings.

```bash
vercel --prod
```

## Author

**Tazminur Rahman Tanim**
- GitHub: [tazminur12](https://github.com/tazminur12)
- LinkedIn: [tazminur-rahman-tanim](https://www.linkedin.com/in/tazminur-rahman-tanim-305315336)
- Facebook: [tan.im.921025](https://www.facebook.com/tan.im.921025)
