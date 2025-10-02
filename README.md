# CloudFlow Pro - SaaS Landing Page with Crypto Payments

A modern SaaS landing page with integrated cryptocurrency payment processing powered by Cryptomus API.

## Features

- 🎨 Modern, responsive design built with React and Tailwind CSS
- 💳 Cryptocurrency payment integration via Cryptomus
- 💬 Customer comment system
- 📱 Mobile-friendly interface
- 🔒 Secure payment processing
- 📧 Contact form with technical support information

## Technical Stack

### Frontend
- React 18+ with Vite
- Tailwind CSS for styling
- shadcn/ui components
- Lucide React icons

### Backend
- Node.js with Express
- Cryptomus Payment API integration
- Webhook support for payment notifications

## Getting Started

### Prerequisites

- Node.js 16+ installed
- npm or yarn package manager
- Cryptomus merchant account (get one at https://app.cryptomus.com)

### Installation

#### 1. Clone the repository

```bash
git clone https://github.com/alkhatib99/saas-crypto-landing.git
cd saas-crypto-landing
```

#### 2. Install frontend dependencies

```bash
npm install
```

#### 3. Install backend dependencies

```bash
cd server
npm install
cd ..
```

#### 4. Configure environment variables

**Frontend (.env):**
```bash
cp .env.example .env
```

Edit `.env` and set:
```
VITE_API_URL=http://localhost:3001/api
```

**Backend (server/.env):**
```bash
cp server/.env.example server/.env
```

Edit `server/.env` and set your Cryptomus credentials:
```
CRYPTOMUS_MERCHANT_ID=your-merchant-uuid-here
CRYPTOMUS_API_KEY=your-payment-api-key-here
PORT=3001
FRONTEND_URL=http://localhost:5173
BACKEND_URL=http://localhost:3001
```

### Getting Cryptomus API Credentials

1. Sign up at https://app.cryptomus.com
2. Create a new merchant
3. Go to Settings and configure:
   - Project URL: Your website URL
   - Project name: Your project name
4. Confirm domain ownership (DNS, meta tag, or HTML file)
5. Wait for moderation approval (up to 24 hours)
6. Once approved, copy your:
   - Merchant ID (UUID)
   - Payment API Key

### Running the Application

#### Development Mode

**Terminal 1 - Frontend:**
```bash
npm run dev
```
Frontend will run on http://localhost:5173

**Terminal 2 - Backend:**
```bash
cd server
npm run dev
```
Backend will run on http://localhost:3001

## Support & Contact

### Technical Support
- **Email:** abedalqader.work@gmail.com, aboodjob@gmail.com
- **Phone:** +962792506055
- **Response Time:** Within 24 hours

## Payment Fees

- **Accepting payments:** 2%
- **Withdrawals:** 0% (only blockchain network fee)

## License

MIT License - feel free to use this project for your own purposes.

## Credits

- Built by Abdalqader
- Payment processing by Cryptomus

---

For more information or support, please contact:
- Email: abedalqader.work@gmail.com
- Phone: +962792506055
