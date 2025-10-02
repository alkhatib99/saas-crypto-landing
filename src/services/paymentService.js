/**
 * Payment Service
 * Handles communication with the backend payment API
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

/**
 * Create a payment invoice
 * @param {Object} paymentData - Payment details
 * @param {string} paymentData.amount - Amount to pay
 * @param {string} paymentData.currency - Currency code (e.g., 'USD')
 * @param {string} paymentData.order_id - Unique order ID
 * @param {string} paymentData.plan_name - Name of the plan being purchased
 * @returns {Promise<Object>} Payment response with payment_url
 */
export async function createPayment(paymentData) {
  try {
    const response = await fetch(`${API_BASE_URL}/create-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to create payment');
    }

    return data;
  } catch (error) {
    console.error('Error creating payment:', error);
    throw error;
  }
}

/**
 * Get payment status
 * @param {string} invoiceId - Invoice UUID
 * @returns {Promise<Object>} Payment status information
 */
export async function getPaymentStatus(invoiceId) {
  try {
    const response = await fetch(`${API_BASE_URL}/payment-status/${invoiceId}`);
    
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to get payment status');
    }

    return data;
  } catch (error) {
    console.error('Error getting payment status:', error);
    throw error;
  }
}

/**
 * Generate a unique order ID
 * @returns {string} Unique order ID
 */
export function generateOrderId() {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 9);
  return `order_${timestamp}_${random}`;
}
