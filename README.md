# 🚗 AutoPile - Premium Auto Parts E-commerce Platform

## 🌟 Overview
AutoPile is a modern e-commerce platform specializing in premium auto parts and accessories. Built with Next.js 14, TypeScript, and Tailwind CSS, it offers a seamless shopping experience for automotive enthusiasts.

🔗 **Live Demo**: [https://www.autopile.store](https://www.autopile.store)  
⚙️ **Backend Repository**: [AutoPile Backend](https://github.com/Linwentao-tech/AutoPile)

## ✨ Features
- 🛍️ Comprehensive product catalog with detailed descriptions
- 🔍 Advanced search and filtering capabilities
- 🛒 Seamless shopping cart experience
- 💳 Secure payment processing with Stripe
- 👤 User authentication and profile management
- 📱 Responsive design for all devices
- ⭐ Product reviews and ratings
- 🗺️ Order tracking with dynamic maps
- 📊 Interactive dashboard for order management

## 🛠️ Tech Stack
- **Frontend**:
  - Next.js 14 (App Router)
  - TypeScript
  - Tailwind CSS
  - Shadcn UI
  - React Hook Form
  - Zod Validation
- **Backend Integration**:
  - RESTful API
  - JWT Authentication
  - Stripe Payment Integration
  - Azure Blob Storage

## 🚀 Getting Started

### Demo Account
You can explore the platform using our test account:
- **Email**: johndoe@example.com
- **Password**: Test@1234

This account has been pre-configured with sample data to showcase all features of the platform.

### Local Development
1. Clone the repository:
```bash
git clone [your-repository-url]
cd autopile
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📚 Project Structure
```
autopile/
├── app/               # Next.js app directory
│   ├── actions/      # Server actions
│   ├── components/   # React components
│   ├── lib/          # Utility functions
│   └── pages/        # App routes
├── public/           # Static assets
└── styles/           # Global styles
```

## 🌐 Deployment
The application is deployed on Vercel with automatic deployments from the main branch. Visit [https://www.autopile.store](https://www.autopile.store) to see it in action.
