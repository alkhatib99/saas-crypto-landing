const crypto = require('crypto');

/**
 * Cryptomus Payment API Integration
 * 
 * This module handles payment processing through the Cryptomus API.
 * You need to set your API credentials in environment variables:
 * - CRYPTOMUS_MERCHANT_ID: Your merchant UUID
 * - CRYPTOMUS_API_KEY: Your payment API key
 */

class CryptomusAPI {
  constructor(merchantId, apiKey) {
    this.merchantId = merchantId || process.env.CRYPTOMUS_MERCHANT_ID;
    this.apiKey = apiKey || process.env.CRYPTOMUS_API_KEY;
    this.baseUrl = 'https://api.cryptomus.com/v1';
  }

  /**
   * Generate signature for API request
   * @param {Object} data - Request body data
   * @returns {string} MD5 signature
   */
  generateSignature(data) {
    const jsonData = JSON.stringify(data);
    const base64Data = Buffer.from(jsonData).toString('base64');
    const signature = crypto.createHash('md5').update(base64Data + this.apiKey).digest('hex');
    return signature;
  }

  /**
   * Make API request to Cryptomus
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Request body data
   * @returns {Promise<Object>} API response
   */
  async makeRequest(endpoint, data = {}) {
    const signature = this.generateSignature(data);
    
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'merchant': this.merchantId,
        'sign': signature
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    return await response.json();
  }

  /**
   * Create a payment invoice
   * @param {Object} params - Invoice parameters
   * @param {string} params.amount - Amount to be paid
   * @param {string} params.currency - Currency code (e.g., 'USD')
   * @param {string} params.order_id - Unique order ID
   * @param {string} [params.network] - Blockchain network (optional)
   * @param {string} [params.url_return] - Return URL (optional)
   * @param {string} [params.url_success] - Success URL (optional)
   * @param {string} [params.url_callback] - Webhook URL (optional)
   * @returns {Promise<Object>} Invoice details
   */
  async createInvoice(params) {
    const {
      amount,
      currency,
      order_id,
      network,
      url_return,
      url_success,
      url_callback,
      to_currency,
      lifetime = 3600,
      is_payment_multiple = true
    } = params;

    const data = {
      amount,
      currency,
      order_id,
      lifetime,
      is_payment_multiple
    };

    // Add optional parameters
    if (network) data.network = network;
    if (url_return) data.url_return = url_return;
    if (url_success) data.url_success = url_success;
    if (url_callback) data.url_callback = url_callback;
    if (to_currency) data.to_currency = to_currency;

    return await this.makeRequest('/payment', data);
  }

  /**
   * Get payment information
   * @param {string} uuid - Invoice UUID
   * @returns {Promise<Object>} Payment details
   */
  async getPaymentInfo(uuid) {
    return await this.makeRequest('/payment/info', { uuid });
  }

  /**
   * Verify webhook signature
   * @param {Object} data - Webhook data
   * @param {string} receivedSignature - Signature from webhook header
   * @returns {boolean} True if signature is valid
   */
  verifyWebhookSignature(data, receivedSignature) {
    const calculatedSignature = this.generateSignature(data);
    return calculatedSignature === receivedSignature;
  }
}

module.exports = CryptomusAPI;
