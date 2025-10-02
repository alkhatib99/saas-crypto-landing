const express = require('express');
const cors = require('cors');
const CryptomusAPI = require('./cryptomus');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Cryptomus API
// IMPORTANT: Set these environment variables before running:
// CRYPTOMUS_MERCHANT_ID and CRYPTOMUS_API_KEY
const cryptomus = new CryptomusAPI();

/**
 * Create a payment invoice
 * POST /api/create-payment
 * Body: { amount, currency, order_id, plan_name }
 */
app.post('/api/create-payment', async (req, res) => {
  try {
    const { amount, currency, order_id, plan_name } = req.body;

    if (!amount || !currency || !order_id) {
      return res.status(400).json({
        success: false,
        error: 'Missing required parameters: amount, currency, order_id'
      });
    }

    // Create invoice with Cryptomus
    const invoice = await cryptomus.createInvoice({
      amount: amount.toString(),
      currency: currency,
      order_id: order_id,
      to_currency: 'USDT', // Allow payment in USDT
      url_return: `${process.env.FRONTEND_URL || 'http://localhost:5173'}`,
      url_success: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/payment-success`,
      url_callback: `${process.env.BACKEND_URL || 'http://localhost:3001'}/api/webhook`,
      lifetime: 3600, // 1 hour
      is_payment_multiple: true,
      additional_data: plan_name || ''
    });

    if (invoice.state === 0 && invoice.result) {
      res.json({
        success: true,
        payment_url: invoice.result.url,
        invoice_id: invoice.result.uuid,
        order_id: invoice.result.order_id,
        amount: invoice.result.amount,
        currency: invoice.result.currency
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Failed to create invoice'
      });
    }
  } catch (error) {
    console.error('Error creating payment:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * Get payment status
 * GET /api/payment-status/:uuid
 */
app.get('/api/payment-status/:uuid', async (req, res) => {
  try {
    const { uuid } = req.params;

    const paymentInfo = await cryptomus.getPaymentInfo(uuid);

    if (paymentInfo.state === 0 && paymentInfo.result) {
      res.json({
        success: true,
        payment_status: paymentInfo.result.payment_status,
        order_id: paymentInfo.result.order_id,
        amount: paymentInfo.result.amount,
        currency: paymentInfo.result.currency
      });
    } else {
      res.status(404).json({
        success: false,
        error: 'Payment not found'
      });
    }
  } catch (error) {
    console.error('Error getting payment status:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * Webhook endpoint for payment notifications
 * POST /api/webhook
 */
app.post('/api/webhook', async (req, res) => {
  try {
    const webhookData = req.body;
    const signature = req.headers['sign'];

    // Verify webhook signature
    const isValid = cryptomus.verifyWebhookSignature(webhookData, signature);

    if (!isValid) {
      return res.status(401).json({
        success: false,
        error: 'Invalid signature'
      });
    }

    // Process webhook data
    console.log('Webhook received:', webhookData);
    
    const { order_id, status, payment_status, uuid, amount, currency } = webhookData;

    // Handle different payment statuses
    switch (payment_status) {
      case 'paid':
        console.log(`Payment successful for order ${order_id}`);
        // TODO: Update your database, activate subscription, etc.
        break;
      case 'paid_over':
        console.log(`Overpayment for order ${order_id}`);
        // TODO: Handle overpayment
        break;
      case 'wrong_amount':
        console.log(`Wrong amount for order ${order_id}`);
        // TODO: Handle wrong amount
        break;
      case 'cancel':
        console.log(`Payment cancelled for order ${order_id}`);
        // TODO: Handle cancellation
        break;
      default:
        console.log(`Payment status ${payment_status} for order ${order_id}`);
    }

    // Respond to webhook
    res.json({ success: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * Health check endpoint
 */
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  
  // Check if API credentials are set
  if (!process.env.CRYPTOMUS_MERCHANT_ID || !process.env.CRYPTOMUS_API_KEY) {
    console.warn('\n⚠️  WARNING: Cryptomus API credentials not set!');
    console.warn('Please set the following environment variables:');
    console.warn('  - CRYPTOMUS_MERCHANT_ID');
    console.warn('  - CRYPTOMUS_API_KEY\n');
  }
});

module.exports = app;
