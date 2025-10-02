import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { 
  Bitcoin, 
  Copy, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Loader2,
  QrCode,
  CreditCard,
  Wallet
} from 'lucide-react'
import { createPayment, generateOrderId } from '../services/paymentService'

const PaymentModal = ({ isOpen, onClose, planDetails }) => {
  const [paymentStep, setPaymentStep] = useState('method') // method, crypto, processing, success, error
  const [selectedCrypto, setSelectedCrypto] = useState('USDT')
  const [supportedCurrencies, setSupportedCurrencies] = useState([])
  const [paymentData, setPaymentData] = useState(null)
  const [conversionRate, setConversionRate] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [customerEmail, setCustomerEmail] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (isOpen) {
      loadSupportedCurrencies()
      setPaymentStep('method')
      setError(null)
    }
  }, [isOpen])

  useEffect(() => {
    if (selectedCrypto && planDetails) {
      loadConversionRate()
    }
  }, [selectedCrypto, planDetails])

  const loadSupportedCurrencies = async () => {
    try {
      const currencies = await cryptomusService.getSupportedCurrencies()
      setSupportedCurrencies(currencies)
    } catch (err) {
      setError('Failed to load supported currencies')
    }
  }

  const loadConversionRate = async () => {
    try {
      const rate = await cryptomusService.getConversionRate('USD', selectedCrypto, planDetails.price)
      setConversionRate(rate.data)
    } catch (err) {
      console.error('Failed to load conversion rate:', err)
    }
  }

  const handleCryptoPayment = async () => {
    if (!customerEmail) {
      setError('Please enter your email address')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const orderId = generateOrderId()
      
      const paymentData = {
        amount: planDetails.price.toString(),
        currency: 'USD',
        order_id: orderId,
        plan_name: planDetails.name,
        customer_email: customerEmail
      }

      const response = await createPayment(paymentData)
      
      if (response.success && response.payment_url) {
        // Redirect to Cryptomus payment page
        window.location.href = response.payment_url
      } else {
        throw new Error('Failed to create payment invoice')
      }
    } catch (err) {
      setError(err.message || 'Failed to initiate payment')
      setPaymentStep('error')
    } finally {
      setLoading(false)
    }
  }

  const startPaymentPolling = (invoiceId) => {
    const pollInterval = setInterval(async () => {
      try {
        const status = await cryptomusService.getPaymentStatus(invoiceId)
        
        if (status.success) {
          const paymentStatus = status.data.status
          
          if (paymentStatus === 'completed') {
            setPaymentStep('success')
            clearInterval(pollInterval)
          } else if (paymentStatus === 'expired' || paymentStatus === 'failed') {
            setPaymentStep('error')
            setError('Payment failed or expired')
            clearInterval(pollInterval)
          }
        }
      } catch (err) {
        console.error('Error polling payment status:', err)
      }
    }, 5000) // Poll every 5 seconds

    // Stop polling after 30 minutes
    setTimeout(() => {
      clearInterval(pollInterval)
    }, 30 * 60 * 1000)
  }

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleClose = () => {
    setPaymentStep('method')
    setPaymentData(null)
    setError(null)
    setCustomerEmail('')
    onClose()
  }

  if (!planDetails) return null

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bitcoin className="w-5 h-5 text-orange-500" />
            Crypto Payment - {planDetails.name} Plan
          </DialogTitle>
          <DialogDescription>
            Complete your subscription payment using cryptocurrency
          </DialogDescription>
        </DialogHeader>

        {paymentStep === 'method' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <span className="font-medium">{planDetails.name} Plan (Monthly)</span>
                  <span className="font-bold">${planDetails.price}</span>
                </div>
                <div className="flex justify-between items-center text-sm text-slate-600">
                  <span>Processing Fee (2%)</span>
                  <span>${(planDetails.price * 0.02).toFixed(2)}</span>
                </div>
                <hr className="my-3" />
                <div className="flex justify-between items-center font-bold">
                  <span>Total</span>
                  <span>${(planDetails.price * 1.02).toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                required
              />
            </div>

            <Tabs value="crypto" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="crypto" className="flex items-center gap-2">
                  <Bitcoin className="w-4 h-4" />
                  Cryptocurrency
                </TabsTrigger>
                <TabsTrigger value="card" disabled className="flex items-center gap-2 opacity-50">
                  <CreditCard className="w-4 h-4" />
                  Credit Card (Coming Soon)
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="crypto" className="space-y-4">
                <div>
                  <Label className="text-base font-medium mb-3 block">Select Cryptocurrency</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {supportedCurrencies.map((currency) => (
                      <Card
                        key={currency.code}
                        className={`cursor-pointer transition-all hover:shadow-md ${
                          selectedCrypto === currency.code 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-slate-200'
                        }`}
                        onClick={() => setSelectedCrypto(currency.code)}
                      >
                        <CardContent className="p-3 text-center">
                          <div className="text-lg font-bold mb-1">{currency.icon}</div>
                          <div className="font-medium text-sm">{currency.code}</div>
                          <div className="text-xs text-slate-500">{currency.network}</div>
                          <Badge variant="secondary" className="text-xs mt-1">
                            {currency.fee}
                          </Badge>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {conversionRate && (
                  <Card className="bg-slate-50">
                    <CardContent className="p-4">
                      <div className="text-sm text-slate-600 mb-2">Conversion Rate</div>
                      <div className="flex justify-between items-center">
                        <span>${planDetails.price} USD</span>
                        <span>≈ {conversionRate.amount_to} {selectedCrypto}</span>
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        Rate expires in 5 minutes
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Button 
                  className="w-full" 
                  onClick={handleCryptoPayment}
                  disabled={loading || !customerEmail}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creating Payment...
                    </>
                  ) : (
                    <>
                      <Wallet className="w-4 h-4 mr-2" />
                      Pay with {selectedCrypto}
                    </>
                  )}
                </Button>
              </TabsContent>
            </Tabs>

            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">{error}</span>
              </div>
            )}
          </div>
        )}

        {paymentStep === 'processing' && paymentData && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Waiting for Payment</h3>
              <p className="text-slate-600">
                Send exactly {conversionRate?.amount_to} {selectedCrypto} to the address below
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-center">Payment Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <img 
                    src={paymentData.qr_code} 
                    alt="Payment QR Code" 
                    className="mx-auto mb-4 border rounded-lg"
                  />
                  <Badge variant="outline" className="mb-2">
                    {selectedCrypto} - {supportedCurrencies.find(c => c.code === selectedCrypto)?.network}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Payment Address</Label>
                  <div className="flex items-center gap-2">
                    <Input 
                      value={paymentData.payment_address} 
                      readOnly 
                      className="font-mono text-sm"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(paymentData.payment_address)}
                    >
                      {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Amount to Send</Label>
                  <div className="flex items-center gap-2">
                    <Input 
                      value={`${conversionRate?.amount_to} ${selectedCrypto}`}
                      readOnly 
                      className="font-mono text-sm"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(conversionRate?.amount_to)}
                    >
                      {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5" />
                    <div className="text-sm text-yellow-800">
                      <p className="font-medium mb-1">Important:</p>
                      <ul className="space-y-1 text-xs">
                        <li>• Send the exact amount shown above</li>
                        <li>• Use the {supportedCurrencies.find(c => c.code === selectedCrypto)?.network} network</li>
                        <li>• Payment expires in 30 minutes</li>
                        <li>• Do not send from an exchange wallet</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="text-center text-sm text-slate-600">
              <Loader2 className="w-4 h-4 animate-spin inline mr-2" />
              Monitoring blockchain for your payment...
            </div>
          </div>
        )}

        {paymentStep === 'success' && (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Payment Successful!</h3>
              <p className="text-slate-600">
                Your {planDetails.name} plan has been activated. You'll receive a confirmation email shortly.
              </p>
            </div>
            <Button onClick={handleClose} className="w-full">
              Continue to Dashboard
            </Button>
          </div>
        )}

        {paymentStep === 'error' && (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Payment Failed</h3>
              <p className="text-slate-600">
                {error || 'Something went wrong with your payment. Please try again.'}
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setPaymentStep('method')} className="flex-1">
                Try Again
              </Button>
              <Button onClick={handleClose} className="flex-1">
                Close
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default PaymentModal
