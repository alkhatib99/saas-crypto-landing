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
import Comments from './components/Comments.jsx'
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
    starter: { name: 'Basic Website', price: 1999 },
    pro: { name: 'Mobile App', price: 2999 },
    enterprise: { name: 'Custom Software', price: 4999 }
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
              <a href="#support" className="text-slate-600 hover:text-blue-600 transition-colors">Support</a>
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
            Professional Development Services
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Available Now</span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
            CloudFlow Pro offers professional mobile app development, web application development, 
            and custom software solutions. Get your project built by experienced developers and 
            pay securely with cryptocurrency through our integrated Cryptomus payment system.
          </p>
          <div className="bg-green-100 border border-green-300 rounded-lg p-4 mb-6 max-w-2xl mx-auto">
            <p className="text-green-800 font-semibold">📱 Mobile & App Development Services - Ready to Order</p>
            <p className="text-green-700 text-sm">Professional development team accepting crypto payments</p>
          </div>
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

      {/* Development Services for Sale Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">📱 Development Services Available for Purchase</h2>
          <p className="text-xl mb-8 opacity-90">
            Professional mobile and web development services with crypto payment options
          </p>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card className="bg-white/10 border-white/20 text-white">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Smartphone className="w-6 h-6 mr-2" />
                  Mobile App Development
                </CardTitle>
                <CardDescription className="text-white/80">
                  iOS and Android native apps, React Native, Flutter development
                  <br />
                  <span className="font-semibold text-yellow-300">Starting at $2,999</span>
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-white/10 border-white/20 text-white">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Globe className="w-6 h-6 mr-2" />
                  Web Application Development
                </CardTitle>
                <CardDescription className="text-white/80">
                  React, Vue.js, Angular, Node.js, full-stack solutions
                  <br />
                  <span className="font-semibold text-yellow-300">Starting at $1,999</span>
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-white/10 border-white/20 text-white">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <BarChart3 className="w-6 h-6 mr-2" />
                  Custom Software Solutions
                </CardTitle>
                <CardDescription className="text-white/80">
                  Enterprise software, APIs, databases, cloud deployment
                  <br />
                  <span className="font-semibold text-yellow-300">Starting at $4,999</span>
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
          <div className="mt-8 space-y-4">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100 mr-4"
              onClick={() => handleGetStarted('pro')}
            >
              Order Development Services
              <Bitcoin className="w-5 h-5 ml-2" />
            </Button>
            <div className="text-white/90 text-sm">
              ✅ Pay with Bitcoin, Ethereum, USDT, and 12+ other cryptocurrencies
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
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Development Service Packages</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Professional development services with transparent pricing. Pay securely with cryptocurrency through Cryptomus.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Basic Website Package */}
            <Card className={`border-2 ${selectedPlan === 'starter' ? 'border-blue-500' : 'border-slate-200'} hover:shadow-lg transition-all`}>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Basic Website</CardTitle>
                <div className="text-4xl font-bold text-slate-800 mt-4">$1,999<span className="text-lg text-slate-500"> one-time</span></div>
                <CardDescription>Professional website development</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>Responsive design (mobile-friendly)</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>Up to 10 pages</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>Contact forms & SEO optimization</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>30 days support</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>Pay with crypto (2% fee)</span>
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
                  Order Website
                </Button>
              </CardContent>
            </Card>

            {/* Mobile App Package */}
            <Card className={`border-2 ${selectedPlan === 'pro' ? 'border-blue-500' : 'border-slate-200'} hover:shadow-lg transition-all relative`}>
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">Most Popular</Badge>
              </div>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Mobile App</CardTitle>
                <div className="text-4xl font-bold text-slate-800 mt-4">$2,999<span className="text-lg text-slate-500"> one-time</span></div>
                <CardDescription>iOS & Android app development</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>Native iOS & Android apps</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>Custom UI/UX design</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>API integration & backend</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>App store submission</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>90 days support</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>Pay with crypto (1.5% fee)</span>
                  </li>
                </ul>
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" 
                  onClick={() => {
                    setSelectedPlan('pro')
                    handleGetStarted('pro')
                  }}
                >
                  Order Mobile App
                </Button>
              </CardContent>
            </Card>

            {/* Custom Software Package */}
            <Card className={`border-2 ${selectedPlan === 'enterprise' ? 'border-blue-500' : 'border-slate-200'} hover:shadow-lg transition-all`}>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Custom Software</CardTitle>
                <div className="text-4xl font-bold text-slate-800 mt-4">$4,999<span className="text-lg text-slate-500"> one-time</span></div>
                <CardDescription>Enterprise software solutions</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>Custom enterprise software</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>Database design & APIs</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>Cloud deployment & scaling</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>Security & compliance</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>6 months support</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>Pay with crypto (0.8% fee)</span>
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
                  Order Custom Software
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
              <h2 className="text-4xl font-bold text-slate-800 mb-6">Development Company Contact</h2>
              <p className="text-xl text-slate-600 mb-8">
                CloudFlow Pro is a professional software development company specializing in mobile apps, 
                web applications, and custom software solutions. Contact us for project quotes and consultations.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-blue-800 mb-2">🏢 Software Development Company</h3>
                <p className="text-blue-700 text-sm">CloudFlow Pro Development LLC</p>
                <p className="text-blue-700 text-sm">Specializing in: Mobile Apps, Web Development, Custom Software</p>
                <p className="text-blue-700 text-sm">Business License: DEV-2024-001</p>
                <p className="text-blue-700 text-sm">Accepting Cryptocurrency Payments via Cryptomus</p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">General Inquiries</h3>
                    <p className="text-slate-600">hello@cloudflowpro.com</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                    <Mail className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">Technical Support</h3>
                    <p className="text-slate-600">abedalqader.work@gmail.com</p>
                    <p className="text-slate-600 text-sm">aboodjob@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">Phone Support</h3>
                    <p className="text-slate-600">+962792506055</p>
                    <p className="text-slate-600 text-sm">Mon-Fri 9AM-6PM EST</p>
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

      {/* Comments Section */}
      <Comments />

      {/* Footer */}
      <footer id="support" className="bg-slate-900 text-white py-12 px-4">
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
                Professional software development company offering mobile apps, web development, and custom software solutions with crypto payment options.
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
              <h3 className="font-semibold mb-4">Technical Support</h3>
              <ul className="space-y-2 text-slate-400">
                <li className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  <a href="mailto:abedalqader.work@gmail.com" className="hover:text-white transition-colors">abedalqader.work@gmail.com</a>
                </li>
                <li className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  <a href="mailto:aboodjob@gmail.com" className="hover:text-white transition-colors">aboodjob@gmail.com</a>
                </li>
                <li className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  <a href="tel:+962792506055" className="hover:text-white transition-colors">+962792506055</a>
                </li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Docs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Live Chat Support</a></li>
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
