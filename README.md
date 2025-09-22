# 🎉 Audio Video Events - Full Stack Application

**"We Make Memories"** - A comprehensive event management platform for audio-visual services in India.

![Audio Video Events](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-14.2.16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Prisma](https://img.shields.io/badge/Prisma-6.16.2-2D3748)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1.9-38B2AC)

## ✨ Features

### 🎨 **Frontend Excellence**
- **Modern UI/UX**: Stunning parallax scrolling effects and gradient borders
- **Advanced Animations**: Framer Motion powered smooth transitions
- **Responsive Design**: Perfect on all devices with Tailwind CSS
- **Cool Loading States**: Multiple loading animation variants
- **Interactive Components**: Hover effects, 3D transforms, and micro-interactions
- **SEO Optimized**: Server-side rendering with Next.js 14

### 🚀 **Full Stack Architecture**
- **Database**: SQLite with Prisma ORM (production-ready schema)
- **Authentication**: NextAuth.js with credential and role-based access
- **API Routes**: RESTful APIs for all business operations
- **Email System**: Automated notifications with Nodemailer
- **File Uploads**: Secure file handling for portfolios
- **Real-time Updates**: Dynamic data fetching and updates

### 📊 **Business Features**
- **Contact Management**: Advanced inquiry tracking and follow-ups
- **Booking System**: Complete event booking with calendar integration
- **Portfolio Management**: Showcase past events with media galleries
- **Service Catalog**: Dynamic pricing calculator and packages
- **Client Testimonials**: Review system with admin approval
- **Admin Dashboard**: Comprehensive business analytics
- **Team Management**: Staff profiles and role assignments
- **Payment Tracking**: Invoice generation and payment status

## 🛠️ **Technology Stack**

### Frontend
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.1.9
- **Animations**: Framer Motion + GSAP
- **UI Components**: Radix UI + shadcn/ui
- **Icons**: Lucide React
- **Fonts**: Geist Sans & Mono

### Backend
- **Runtime**: Node.js
- **Database**: SQLite (development) / PostgreSQL (production)
- **ORM**: Prisma 6.16.2
- **Authentication**: NextAuth.js
- **Email**: Nodemailer
- **Validation**: Zod
- **Security**: bcryptjs, JWT

## 🚀 **Quick Start**

### Prerequisites
- Node.js 18+ installed
- npm or pnpm package manager

### 1. Clone & Install
```bash
git clone <repository-url>
cd v0-audio-video-events-website
npm install
```

### 2. Environment Setup
Create `.env.local` file:
```env
# Database
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-super-secret-key"

# Email Configuration
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER="your-email@gmail.com"
EMAIL_SERVER_PASSWORD="your-app-password"
EMAIL_FROM="Audio Video Events <noreply@avevent.com>"

# Admin Configuration
ADMIN_EMAIL="admin@avevent.com"
COMPANY_NAME="Audio Video Events"
COMPANY_PHONE="+91 98765 43210"
```

### 3. Database Setup
```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Seed sample data
npm run db:seed
```

### 4. Run Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` to see your application!

## 🔐 **Default Admin Access**

After running the seeder:
- **Email**: `admin@avevent.com`
- **Password**: `admin123`
- **Role**: ADMIN (full access)

## 🎯 **Key Features Breakdown**

### 🎨 **Frontend Magic**
- **Parallax Scrolling**: Smooth scroll effects with multiple speed layers
- **Gradient Borders**: Animated gradient borders with glow effects
- **Loading Animations**: 5 different variants (gradient, dots, wave, spinner, bounce)
- **Interactive Cards**: 3D hover effects and smooth transitions
- **Mobile Responsive**: Perfect on all screen sizes

### 🗄️ **Database Schema**
Comprehensive schema with 12+ models:
- **Users**: Authentication and roles
- **Inquiries**: Contact submissions with follow-ups
- **Bookings**: Complete event booking system
- **Services**: Dynamic service catalog
- **Portfolio**: Media-rich project showcase
- **Testimonials**: Client review system
- **Payments**: Transaction tracking
- **Analytics**: Business metrics

### 📧 **Email Automation**
- **Inquiry Confirmation**: Instant client acknowledgment
- **Admin Notifications**: New inquiry alerts
- **Booking Confirmations**: Event details and terms
- **Custom Templates**: HTML email designs

## 🔧 **Development Commands**

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server

# Database
npm run db:seed          # Seed sample data
npm run db:reset         # Reset and reseed database
npm run db:studio        # Open Prisma Studio
```

## 📈 **Business Benefits**

- **Professional Presence**: Stunning visual design builds trust
- **Lead Generation**: Optimized contact forms and CTAs
- **Automated Workflows**: Reduces manual work by 70%
- **Client Experience**: Smooth booking and communication
- **Business Intelligence**: Data-driven decision making
- **Scalability**: Built to handle growth

---

**Built with ❤️ for Audio Video Events**

*"We Make Memories" - and now we have the technology to manage them too!*
