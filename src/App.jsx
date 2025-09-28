import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { 
  CheckCircle, 
  Shield, 
  Zap, 
  Globe, 
  TrendingUp, 
  Users, 
  CreditCard, 
  Mail, 
  Phone, 
  MapPin,
  Bitcoin,
  Smartphone,
  BarChart3,
  Lock
} from 'lucide-react'
import PaymentModal from './components/PaymentModal.jsx'
import dashboardPreview from './assets/dashboard-preview.jpg'
import cryptoPaymentFlow from './assets/crypto-payment-flow.png'
import cryptoProcessing from './assets/crypto-processing.png'
import './App.css'

function App() {
  const [selectedPlan, setSelectedPlan] = useState('pro')
  const [paymentModalOpen, setPaymentModalOpen] = useState(false)
  const [selectedPlanDetails, setSelectedPlanDetails] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  })

  const planDetails = {
    starter: { name: 'Starter', price: 29 },
    pro: { name: 'Pro', price: 79 },
    enterprise: { name: 'Enterprise', price: 199 }
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
    alert('Thank you for your interest! We will contact you soon.')
  }

  const handleGetStarted = (plan) => {
    setSelectedPlanDetails(planDetails[plan])
    setPaymentModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-800">CloudFlow Pro</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-slate-600 hover:text-blue-600 transition-colors">Features</a>
              <a href="#pricing" className="text-slate-600 hover:text-blue-600 transition-colors">Pricing</a>
              <a href="#contact" className="text-slate-600 hover:text-blue-600 transition-colors">Contact</a>
              <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                Sign In
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200">
            <Bitcoin className="w-4 h-4 mr-1" />
            Now accepting crypto payments
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-slate-800 mb-6 leading-tight">
            Scale Your Business with
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Smart SaaS</span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
            CloudFlow Pro delivers enterprise-grade workflow automation, analytics, and team collaboration tools. 
            Pay securely with cryptocurrency through our integrated Cryptomus payment system.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3"
              onClick={() => handleGetStarted('pro')}
            >
              Start Free Trial
              <Zap className="w-5 h-5 ml-2" />
            </Button>
            <Button variant="outline" size="lg" className="border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-3">
              Watch Demo
            </Button>
          </div>
          <div className="relative max-w-4xl mx-auto">
            <img 
              src={dashboardPreview} 
              alt="CloudFlow Pro Dashboard" 
              className="rounded-xl shadow-2xl border border-slate-200"
            />
            <div className="absolute -top-4 -right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              Live Demo
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Powerful Features for Modern Teams</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Everything you need to streamline operations, boost productivity, and scale your business efficiently.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <Card className="border-slate-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>Advanced Analytics</CardTitle>
                <CardDescription>
                  Real-time insights and customizable dashboards to track your business metrics and KPIs.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-slate-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>Team Collaboration</CardTitle>
                <CardDescription>
                  Seamless communication tools, project management, and workflow automation for distributed teams.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-slate-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>Enterprise Security</CardTitle>
                <CardDescription>
                  Bank-grade encryption, SSO integration, and compliance with SOC 2, GDPR, and HIPAA standards.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-slate-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle>Workflow Automation</CardTitle>
                <CardDescription>
                  Automate repetitive tasks, set up custom triggers, and integrate with 500+ popular business tools.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-slate-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-indigo-600" />
                </div>
                <CardTitle>Global Infrastructure</CardTitle>
                <CardDescription>
                  99.9% uptime guarantee with servers across 6 continents and CDN-powered performance optimization.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-slate-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
                  <Bitcoin className="w-6 h-6 text-cyan-600" />
                </div>
                <CardTitle>Crypto Payments</CardTitle>
                <CardDescription>
                  Accept payments in 15+ cryptocurrencies with instant processing and automatic conversion to stablecoins.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Crypto Payment Integration Showcase */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mb-16">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold text-slate-800 mb-4">Seamless Crypto Integration</h3>
                <p className="text-slate-600 mb-6">
                  Powered by Cryptomus, our payment system supports Bitcoin, Ethereum, USDT, and 12+ other cryptocurrencies. 
                  Enjoy 2% transaction fees, instant settlements, and automatic volatility protection.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-slate-700">Zero chargebacks and instant transactions</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-slate-700">Automatic stablecoin conversion</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-slate-700">Global coverage with no rolling reserves</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img 
                  src={cryptoPaymentFlow} 
                  alt="Crypto Payment Processing Flow" 
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 bg-slate-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Choose the perfect plan for your team. All plans include crypto payment processing with competitive rates.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Starter Plan */}
            <Card className={`border-2 ${selectedPlan === 'starter' ? 'border-blue-500' : 'border-slate-200'} hover:shadow-lg transition-all`}>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Starter</CardTitle>
                <div className="text-4xl font-bold text-slate-800 mt-4">$29<span className="text-lg text-slate-500">/month</span></div>
                <CardDescription>Perfect for small teams getting started</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>Up to 5 team members</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>10GB storage</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>Basic analytics</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>Email support</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>Crypto payments (2% fee)</span>
                  </li>
                </ul>
                <Button 
                  className="w-full" 
                  variant={selectedPlan === 'starter' ? 'default' : 'outline'}
                  onClick={() => {
                    setSelectedPlan('starter')
                    handleGetStarted('starter')
                  }}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>

            {/* Pro Plan */}
            <Card className={`border-2 ${selectedPlan === 'pro' ? 'border-blue-500' : 'border-slate-200'} hover:shadow-lg transition-all relative`}>
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">Most Popular</Badge>
              </div>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Pro</CardTitle>
                <div className="text-4xl font-bold text-slate-800 mt-4">$79<span className="text-lg text-slate-500">/month</span></div>
                <CardDescription>Ideal for growing businesses</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>Up to 25 team members</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>100GB storage</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>Advanced analytics & reporting</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>Priority support</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>Workflow automation</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>Crypto payments (1.5% fee)</span>
                  </li>
                </ul>
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" 
                  onClick={() => {
                    setSelectedPlan('pro')
                    handleGetStarted('pro')
                  }}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>

            {/* Enterprise Plan */}
            <Card className={`border-2 ${selectedPlan === 'enterprise' ? 'border-blue-500' : 'border-slate-200'} hover:shadow-lg transition-all`}>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Enterprise</CardTitle>
                <div className="text-4xl font-bold text-slate-800 mt-4">$199<span className="text-lg text-slate-500">/month</span></div>
                <CardDescription>For large organizations</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>Unlimited team members</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>1TB storage</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>Custom integrations</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>24/7 dedicated support</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>Advanced security features</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>Crypto payments (0.8% fee)</span>
                  </li>
                </ul>
                <Button 
                  className="w-full" 
                  variant={selectedPlan === 'enterprise' ? 'default' : 'outline'}
                  onClick={() => {
                    setSelectedPlan('enterprise')
                    handleGetStarted('enterprise')
                  }}
                >
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div>
              <h2 className="text-4xl font-bold text-slate-800 mb-6">Get in Touch</h2>
              <p className="text-xl text-slate-600 mb-8">
                Ready to transform your business with CloudFlow Pro? Our team is here to help you get started 
                and answer any questions about our crypto payment integration.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">Email</h3>
                    <p className="text-slate-600">abedalqader.work@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">Phone</h3>
                    <p className="text-slate-600">+1 (555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                    <MapPin className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">Office</h3>
                    <p className="text-slate-600">123 Business Ave, Tech City, TC 12345</p>
                  </div>
                </div>
              </div>
            </div>
            
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you within 24 hours.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Input
                      name="email"
                      type="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Input
                      name="company"
                      placeholder="Company Name"
                      value={formData.company}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Textarea
                      name="message"
                      placeholder="Tell us about your project..."
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">CloudFlow Pro</span>
              </div>
              <p className="text-slate-400 mb-4">
                Empowering businesses with intelligent workflow automation and secure crypto payment processing.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-700 cursor-pointer">
                  <Bitcoin className="w-4 h-4" />
                </div>
                <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-700 cursor-pointer">
                  <Lock className="w-4 h-4" />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Docs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">
              © 2024 CloudFlow Pro. All rights reserved. Powered by Cryptomus.
            </p>
            <div className="flex space-x-6 text-sm text-slate-400 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Payment Modal */}
      <PaymentModal 
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        planDetails={selectedPlanDetails}
      />
    </div>
  )
}

export default App
