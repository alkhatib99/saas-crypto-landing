// Cryptomus Payment Integration Service
// This service handles the integration with Cryptomus payment gateway

class CryptomusService {
  constructor() {
    // In production, these would come from environment variables
    this.baseURL = 'https://api.cryptomus.com/v1'
    this.merchantId = process.env.REACT_APP_CRYPTOMUS_MERCHANT_ID || 'demo-merchant'
    this.apiKey = process.env.REACT_APP_CRYPTOMUS_API_KEY || 'demo-api-key'
  }

  // Generate payment signature for security
  generateSignature(data) {
    // In production, this would use proper HMAC-SHA256 with secret key
    // For demo purposes, we'll simulate this
    const dataString = JSON.stringify(data)
    return btoa(dataString).substring(0, 32)
  }

  // Create a new payment invoice
  async createInvoice(paymentData) {
    const {
      amount,
      currency = 'USD',
      orderId,
      description,
      customerEmail,
      callbackUrl,
      successUrl,
      failUrl
    } = paymentData

    const invoiceData = {
      amount: amount.toString(),
      currency,
      order_id: orderId,
      description,
      customer_email: customerEmail,
      url_callback: callbackUrl,
      url_success: successUrl,
      url_fail: failUrl,
      merchant_id: this.merchantId,
      timestamp: Math.floor(Date.now() / 1000)
    }

    // Generate signature
    invoiceData.signature = this.generateSignature(invoiceData)

    try {
      // In production, this would make an actual API call to Cryptomus
      // For demo purposes, we'll simulate the response
      const mockResponse = await this.simulateCreateInvoice(invoiceData)
      return mockResponse
    } catch (error) {
      console.error('Error creating Cryptomus invoice:', error)
      throw new Error('Failed to create payment invoice')
    }
  }

  // Simulate Cryptomus API response for demo
  async simulateCreateInvoice(invoiceData) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    const mockInvoiceId = 'inv_' + Math.random().toString(36).substring(2, 15)
    const mockPaymentAddress = '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa' // Example Bitcoin address
    
    return {
      success: true,
      data: {
        invoice_id: mockInvoiceId,
        payment_url: `https://pay.cryptomus.com/pay/${mockInvoiceId}`,
        payment_address: mockPaymentAddress,
        amount: invoiceData.amount,
        currency: invoiceData.currency,
        status: 'pending',
        expires_at: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 minutes
        qr_code: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${mockPaymentAddress}`,
        supported_currencies: [
          { code: 'BTC', name: 'Bitcoin', network: 'Bitcoin' },
          { code: 'ETH', name: 'Ethereum', network: 'Ethereum' },
          { code: 'USDT', name: 'Tether', network: 'TRC20' },
          { code: 'USDC', name: 'USD Coin', network: 'ERC20' },
          { code: 'BNB', name: 'Binance Coin', network: 'BSC' },
          { code: 'ADA', name: 'Cardano', network: 'Cardano' },
          { code: 'DOT', name: 'Polkadot', network: 'Polkadot' },
          { code: 'MATIC', name: 'Polygon', network: 'Polygon' }
        ]
      }
    }
  }

  // Check payment status
  async getPaymentStatus(invoiceId) {
    try {
      // In production, this would make an actual API call
      const mockStatus = await this.simulatePaymentStatus(invoiceId)
      return mockStatus
    } catch (error) {
      console.error('Error checking payment status:', error)
      throw new Error('Failed to check payment status')
    }
  }

  // Simulate payment status check
  async simulatePaymentStatus(invoiceId) {
    await new Promise(resolve => setTimeout(resolve, 500))

    // Randomly simulate different payment statuses for demo
    const statuses = ['pending', 'paid', 'completed', 'expired', 'failed']
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]

    return {
      success: true,
      data: {
        invoice_id: invoiceId,
        status: randomStatus,
        amount_received: randomStatus === 'completed' ? '100.00' : '0.00',
        currency_received: randomStatus === 'completed' ? 'USDT' : null,
        transaction_hash: randomStatus === 'completed' ? '0x' + Math.random().toString(16).substring(2, 66) : null,
        updated_at: new Date().toISOString()
      }
    }
  }

  // Get supported cryptocurrencies
  async getSupportedCurrencies() {
    return [
      { 
        code: 'BTC', 
        name: 'Bitcoin', 
        network: 'Bitcoin',
        icon: '₿',
        fee: '2.0%'
      },
      { 
        code: 'ETH', 
        name: 'Ethereum', 
        network: 'Ethereum',
        icon: 'Ξ',
        fee: '2.0%'
      },
      { 
        code: 'USDT', 
        name: 'Tether', 
        network: 'TRC20',
        icon: '₮',
        fee: '1.5%'
      },
      { 
        code: 'USDC', 
        name: 'USD Coin', 
        network: 'ERC20',
        icon: '$',
        fee: '1.5%'
      },
      { 
        code: 'BNB', 
        name: 'Binance Coin', 
        network: 'BSC',
        icon: 'BNB',
        fee: '1.8%'
      },
      { 
        code: 'ADA', 
        name: 'Cardano', 
        network: 'Cardano',
        icon: 'ADA',
        fee: '2.0%'
      },
      { 
        code: 'DOT', 
        name: 'Polkadot', 
        network: 'Polkadot',
        icon: 'DOT',
        fee: '2.0%'
      },
      { 
        code: 'MATIC', 
        name: 'Polygon', 
        network: 'Polygon',
        icon: 'MATIC',
        fee: '1.8%'
      }
    ]
  }

  // Calculate conversion rates (mock implementation)
  async getConversionRate(fromCurrency, toCurrency, amount) {
    await new Promise(resolve => setTimeout(resolve, 300))

    // Mock conversion rates
    const rates = {
      'USD_BTC': 0.000023,
      'USD_ETH': 0.00041,
      'USD_USDT': 0.998,
      'USD_USDC': 0.999,
      'USD_BNB': 0.0018,
      'USD_ADA': 2.5,
      'USD_DOT': 0.14,
      'USD_MATIC': 1.2
    }

    const rateKey = `${fromCurrency}_${toCurrency}`
    const rate = rates[rateKey] || 1

    return {
      success: true,
      data: {
        from_currency: fromCurrency,
        to_currency: toCurrency,
        rate: rate,
        amount_from: amount,
        amount_to: (amount * rate).toFixed(8),
        fee_percentage: '2.0',
        fee_amount: (amount * 0.02).toFixed(2),
        expires_at: new Date(Date.now() + 5 * 60 * 1000).toISOString() // 5 minutes
      }
    }
  }

  // Validate webhook signature (for backend integration)
  validateWebhookSignature(payload, signature, secret) {
    // In production, implement proper HMAC validation
    return true
  }

  // Format amount for display
  formatAmount(amount, currency) {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency === 'USDT' || currency === 'USDC' ? 'USD' : currency,
      minimumFractionDigits: currency.startsWith('USD') ? 2 : 8
    })

    return formatter.format(amount)
  }

  // Generate QR code URL for payment address
  generateQRCode(address, amount, currency) {
    const qrData = `${currency.toLowerCase()}:${address}?amount=${amount}`
    return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qrData)}`
  }
}

// Export singleton instance
export const cryptomusService = new CryptomusService()
export default cryptomusService
