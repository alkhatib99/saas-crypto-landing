# CloudFlow Pro - SaaS Platform with Crypto Payments

A modern, professional SaaS landing page built with React and integrated with Cryptomus cryptocurrency payment processing. This project demonstrates a complete Software-as-a-Service platform with advanced features including crypto payment integration, responsive design, and deployment-ready architecture.

## 🚀 Features

### Core SaaS Features
- **Modern Landing Page Design**: Professional, responsive design with gradient backgrounds and smooth animations
- **Service Tiers**: Three pricing plans (Starter, Pro, Enterprise) with detailed feature comparisons
- **Contact Form**: Integrated contact system with form validation
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Professional UI Components**: Built with shadcn/ui component library

### Cryptocurrency Payment Integration
- **Cryptomus Integration**: Complete payment gateway integration supporting 15+ cryptocurrencies
- **Multi-Currency Support**: Bitcoin, Ethereum, USDT, USDC, BNB, ADA, DOT, MATIC, and more
- **Real-time Conversion**: Dynamic currency conversion with live rates
- **QR Code Generation**: Automatic QR code generation for payment addresses
- **Payment Monitoring**: Real-time payment status tracking and notifications
- **Security Features**: HMAC signature validation and secure payment processing

### Technical Features
- **React 18**: Modern React with hooks and functional components
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **Lucide Icons**: Beautiful, consistent icon library
- **Component Architecture**: Modular, reusable component structure
- **State Management**: Efficient state handling with React hooks

## 🛠 Technology Stack

- **Frontend**: React 18, Vite, JavaScript (JSX)
- **Styling**: Tailwind CSS, shadcn/ui components
- **Icons**: Lucide React
- **Payment Processing**: Cryptomus API integration
- **Deployment**: Vercel (ready for deployment)
- **Package Manager**: pnpm

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd saas-crypto-landing
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   REACT_APP_CRYPTOMUS_MERCHANT_ID=your_merchant_id
   REACT_APP_CRYPTOMUS_API_KEY=your_api_key
   ```

4. **Development Server**
   ```bash
   pnpm run dev
   ```
   The application will be available at `http://localhost:5173`

5. **Build for Production**
   ```bash
   pnpm run build
   ```

## 🔧 Configuration

### Cryptomus Setup

1. **Create Cryptomus Account**
   - Visit [Cryptomus.com](https://cryptomus.com)
   - Sign up for a merchant account
   - Complete KYB verification

2. **Generate API Keys**
   - Navigate to Business → Merchants
   - Create a new merchant or select existing
   - Go to Settings → Leave a request
   - Enter your domain and description
   - Generate Payment API key

3. **Configure Webhooks**
   - Set up IPN (Instant Payment Notification) endpoints
   - Configure callback URLs for payment status updates
   - Implement webhook signature validation

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `REACT_APP_CRYPTOMUS_MERCHANT_ID` | Your Cryptomus merchant ID | Yes |
| `REACT_APP_CRYPTOMUS_API_KEY` | Your Cryptomus API key | Yes |

## 🎨 Customization

### Branding
- Update company name in `src/App.jsx`
- Replace logo and images in `src/assets/`
- Modify color scheme in `src/App.css`

### Pricing Plans
- Edit plan details in the `planDetails` object in `src/App.jsx`
- Update pricing tiers and features
- Customize payment flow logic

### Contact Information
- Update contact details in the contact section
- Modify business email: `abedalqader.work@gmail.com`
- Update phone and address information

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Connect to Vercel**
   ```bash
   vercel
   ```

2. **Configure Environment Variables**
   - Add environment variables in Vercel dashboard
   - Set up production API keys

3. **Deploy**
   ```bash
   vercel --prod
   ```

### Alternative Deployment Options
- **Netlify**: Drag and drop `dist` folder
- **AWS S3**: Upload build files to S3 bucket
- **GitHub Pages**: Use GitHub Actions for deployment

## 📱 Payment Flow

### User Experience
1. User selects a pricing plan
2. Payment modal opens with plan details
3. User enters email and selects cryptocurrency
4. System generates payment address and QR code
5. User sends payment to provided address
6. System monitors blockchain for confirmation
7. Payment confirmation and service activation

### Technical Implementation
1. **Invoice Creation**: Generate payment invoice via Cryptomus API
2. **Address Generation**: Receive unique payment address
3. **QR Code**: Generate QR code for mobile payments
4. **Status Monitoring**: Poll payment status every 5 seconds
5. **Webhook Processing**: Handle payment confirmations
6. **User Notification**: Send confirmation emails

## 🔐 Security Features

- **API Key Protection**: Environment variable storage
- **HMAC Validation**: Webhook signature verification
- **Input Sanitization**: Form data validation
- **HTTPS Only**: Secure communication protocols
- **No Private Key Storage**: Client-side security

## 📊 Supported Cryptocurrencies

| Currency | Symbol | Network | Fee |
|----------|--------|---------|-----|
| Bitcoin | BTC | Bitcoin | 2.0% |
| Ethereum | ETH | Ethereum | 2.0% |
| Tether | USDT | TRC20 | 1.5% |
| USD Coin | USDC | ERC20 | 1.5% |
| Binance Coin | BNB | BSC | 1.8% |
| Cardano | ADA | Cardano | 2.0% |
| Polkadot | DOT | Polkadot | 2.0% |
| Polygon | MATIC | Polygon | 1.8% |

## 🧪 Testing

### Local Testing
```bash
# Run development server
pnpm run dev

# Build and test production build
pnpm run build
pnpm run preview
```

### Payment Testing
- Use Cryptomus sandbox environment
- Test with small amounts on testnets
- Verify webhook endpoints
- Test payment status polling

## 📈 Performance Optimization

- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: Optimized asset loading
- **CSS Purging**: Unused CSS removal
- **Bundle Analysis**: Webpack bundle analyzer
- **CDN Delivery**: Vercel Edge Network

## 🐛 Troubleshooting

### Common Issues

1. **Payment Modal Not Opening**
   - Check console for JavaScript errors
   - Verify component imports
   - Ensure state management is working

2. **Cryptomus API Errors**
   - Verify API keys are correct
   - Check network connectivity
   - Review API documentation

3. **Build Failures**
   - Clear node_modules and reinstall
   - Check for TypeScript errors
   - Verify all imports are correct

## 📞 Support

For technical support or business inquiries:

- **Email**: abedalqader.work@gmail.com
- **Phone**: +1 (555) 123-4567
- **Address**: 123 Business Ave, Tech City, TC 12345

## 📄 License

This project is proprietary software. All rights reserved.

## 🤝 Contributing

This is a private project. For feature requests or bug reports, please contact the development team directly.

---

**Built with ❤️ using React, Tailwind CSS, and Cryptomus API**
