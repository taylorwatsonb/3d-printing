
# 3D Printing Production Dashboard

A comprehensive real-time dashboard for monitoring and managing 3D printing operations, built with modern web technologies.

**Developer:** Taylor Watson

## 🚀 Project Overview

This production dashboard provides real-time monitoring and analytics for 3D printing operations, featuring machine status tracking, production metrics, order management, and intelligent alerting systems. The application is designed for manufacturing environments that require continuous oversight of multiple 3D printing machines.

## ✨ Key Features

### 📊 **Real-Time Monitoring**
- Live machine status updates with health indicators
- Real-time production metrics and performance tracking
- Automated alert system for maintenance and errors
- Interactive charts and data visualizations

### 🔧 **Machine Management**
- Individual machine detail pages with comprehensive status information
- Maintenance scheduling and alerts
- Performance analytics and historical data
- Integration with popular slicing software (Prusa Slicer, Cura)

### 📋 **Order & Production Management**
- Order status tracking and workflow management
- Production queue optimization
- File management system for 3D models
- Batch processing capabilities

### 👥 **User Management & Settings**
- Role-based access control
- Customizable notification preferences (Email, SMS)
- Comprehensive settings management
- User activity tracking

### 📈 **Analytics & Reporting**
- Production efficiency metrics
- Machine utilization reports
- Predictive maintenance insights
- Custom dashboard configurations

## 🛠️ Technical Stack

### **Frontend**
- **React 18** - Modern UI library with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern component library

### **State Management & Data**
- **TanStack React Query** - Server state management
- **Supabase** - Backend-as-a-Service with real-time capabilities
- **React Router** - Client-side routing

### **Visualization & UX**
- **Recharts** - Interactive charts and graphs
- **Lucide React** - Modern icon library
- **React Hook Form** - Form management
- **Sonner** - Toast notifications

## 🏗️ Architecture

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── AlertPanel.tsx  # Real-time alerts display
│   ├── MachineStatus.tsx
│   └── ProductionMetrics.tsx
├── pages/              # Route components
│   ├── Index.tsx       # Main dashboard
│   ├── Settings.tsx    # Configuration panel
│   ├── Analytics.tsx   # Analytics dashboard
│   └── MachineDetail.tsx
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
│   ├── analytics.ts    # Google Analytics integration
│   ├── supabaseClient.ts
│   └── types.ts        # TypeScript definitions
└── integrations/       # External service integrations
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd 3d-printing-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Configure your Supabase credentials and other environment variables
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

### Production Build
```bash
npm run build
npm run preview
```

## 📱 Responsive Design

The dashboard is fully responsive and optimized for:
- **Desktop** - Full-featured dashboard experience
- **Tablet** - Adapted layouts for medium screens
- **Mobile** - Touch-optimized interface for on-the-go monitoring

## 🔒 Security Features

- Role-based access control
- Secure authentication with Supabase
- Real-time data encryption
- Session management
- Input validation and sanitization

## 📊 Performance Optimizations

- Code splitting and lazy loading
- Optimized bundle size with Vite
- Efficient state management with React Query
- Real-time updates with minimal re-renders
- Image optimization and lazy loading

## 🧪 Testing & Quality

- TypeScript for type safety
- ESLint for code quality
- Responsive design testing
- Cross-browser compatibility

## 🚀 Deployment

The application can be deployed to various platforms:
- **Vercel** - Recommended for easy deployment
- **Netlify** - Static site hosting
- **Custom server** - Self-hosted options available

## 🔮 Future Enhancements

- [ ] Mobile app development (React Native)
- [ ] Advanced AI-powered predictive maintenance
- [ ] Integration with more 3D printing software
- [ ] Advanced reporting and export features
- [ ] Multi-language support

## 📝 License

This project is private and proprietary.

## 👨‍💻 About the Developer

Developed by **Taylor Watson** as a demonstration of modern web development skills and expertise in creating production-ready applications for industrial use cases.

### Skills Demonstrated
- Full-stack web development
- Real-time data processing
- Modern React development patterns
- TypeScript implementation
- Responsive UI/UX design
- Database integration and management
- Production deployment and optimization

---

*This project showcases proficiency in modern web technologies and the ability to create comprehensive, production-ready applications for industrial environments.*
