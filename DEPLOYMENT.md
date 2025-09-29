# Deployment Guide - CloudFlow Pro

This guide provides step-by-step instructions for deploying the CloudFlow Pro SaaS platform with Cryptomus crypto payment integration.

## 🚀 Quick Deployment to Vercel

### Prerequisites
- Vercel account (free tier available)
- GitHub account
- Cryptomus merchant account

### Step 1: Prepare Repository
```bash
# Initialize git repository (if not already done)
git init
git add .
git commit -m "Initial commit: SaaS platform with crypto payments"

# Push to GitHub
git remote add origin <your-github-repo-url>
git push -u origin main
```

### Step 2: Connect to Vercel
1. Visit [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Select the React framework (auto-detected)
5. Configure build settings:
   - **Build Command**: `pnpm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `pnpm install`

### Step 3: Environment Variables
Add the following environment variables in Vercel dashboard:

| Variable | Value | Description |
|----------|-------|-------------|
| `REACT_APP_CRYPTOMUS_MERCHANT_ID` | `your_merchant_id` | Cryptomus merchant identifier |
| `REACT_APP_CRYPTOMUS_API_KEY` | `your_api_key` | Cryptomus API key for payments |

### Step 4: Deploy
1. Click "Deploy" in Vercel dashboard
2. Wait for build completion (2-3 minutes)
3. Access your live application at the provided URL

## 🔧 Alternative Deployment Methods

### Netlify Deployment

1. **Build the project**
   ```bash
   pnpm run build
   ```

2. **Deploy to Netlify**
   - Visit [netlify.com](https://netlify.com)
   - Drag and drop the `dist` folder
   - Configure environment variables in site settings

### AWS S3 + CloudFront

1. **Build the project**
   ```bash
   pnpm run build
   ```

2. **Create S3 Bucket**
   ```bash
   aws s3 mb s3://your-saas-platform-bucket
   aws s3 sync dist/ s3://your-saas-platform-bucket --delete
   ```

3. **Configure CloudFront**
   - Create CloudFront distribution
   - Point to S3 bucket
   - Configure custom domain

### Docker Deployment

1. **Create Dockerfile**
   ```dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   RUN npm run build
   EXPOSE 3000
   CMD ["npm", "run", "preview"]
   ```

2. **Build and run**
   ```bash
   docker build -t saas-crypto-platform .
   docker run -p 3000:3000 saas-crypto-platform
   ```

## ⚙️ Production Configuration

### Environment Setup

Create production environment variables:

```env
# Production Environment Variables
REACT_APP_CRYPTOMUS_MERCHANT_ID=prod_merchant_id
REACT_APP_CRYPTOMUS_API_KEY=prod_api_key
REACT_APP_ENVIRONMENT=production
REACT_APP_API_BASE_URL=https://api.cryptomus.com/v1
```

### Security Considerations

1. **API Keys**
   - Use production API keys
   - Rotate keys regularly
   - Monitor API usage

2. **HTTPS**
   - Ensure SSL certificate is valid
   - Force HTTPS redirects
   - Use HSTS headers

3. **Domain Configuration**
   - Configure custom domain
   - Set up DNS records
   - Enable domain verification

### Performance Optimization

1. **CDN Configuration**
   - Enable Vercel Edge Network
   - Configure caching headers
   - Optimize asset delivery

2. **Build Optimization**
   ```bash
   # Analyze bundle size
   pnpm run build
   npx vite-bundle-analyzer dist
   ```

## 🔍 Monitoring and Analytics

### Error Tracking
```javascript
// Add to src/main.jsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: process.env.NODE_ENV,
});
```

### Analytics Integration
```javascript
// Google Analytics 4
gtag('config', 'GA_MEASUREMENT_ID', {
  page_title: 'CloudFlow Pro',
  page_location: window.location.href
});
```

## 🧪 Testing Deployment

### Pre-deployment Checklist
- [ ] All environment variables configured
- [ ] Build completes without errors
- [ ] Payment modal functions correctly
- [ ] Contact form submits successfully
- [ ] All images load properly
- [ ] Mobile responsiveness verified
- [ ] Cross-browser compatibility tested

### Post-deployment Verification
```bash
# Test production build locally
pnpm run build
pnpm run preview

# Check deployment status
curl -I https://your-domain.vercel.app
```

### Payment System Testing
1. **Sandbox Testing**
   - Use Cryptomus sandbox environment
   - Test with small amounts
   - Verify payment flow completion

2. **Production Testing**
   - Test with minimal real transactions
   - Monitor payment confirmations
   - Verify webhook functionality

## 🚨 Troubleshooting

### Common Deployment Issues

1. **Build Failures**
   ```bash
   # Clear cache and rebuild
   rm -rf node_modules dist
   pnpm install
   pnpm run build
   ```

2. **Environment Variable Issues**
   - Verify variable names match exactly
   - Check for typos in values
   - Ensure variables are set in deployment platform

3. **Payment Integration Issues**
   - Verify API keys are production keys
   - Check Cryptomus merchant settings
   - Test webhook endpoints

### Debug Commands
```bash
# Check build output
ls -la dist/

# Verify environment variables
echo $REACT_APP_CRYPTOMUS_MERCHANT_ID

# Test API connectivity
curl -X GET "https://api.cryptomus.com/v1/currencies"
```

## 📊 Deployment Metrics

### Performance Targets
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Time to Interactive**: < 3.5s

### Monitoring Tools
- Vercel Analytics
- Google PageSpeed Insights
- GTmetrix
- WebPageTest

## 🔄 Continuous Deployment

### GitHub Actions Workflow
```yaml
name: Deploy to Vercel
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: pnpm install
      - run: pnpm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 📞 Support

For deployment assistance:
- **Email**: abedalqader.work@gmail.com
- **Documentation**: Check README.md for detailed setup
- **Issues**: Create GitHub issues for bugs

---

**Deployment completed successfully! 🎉**
