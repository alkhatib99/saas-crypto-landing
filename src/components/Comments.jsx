import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { MessageSquare, User, Calendar } from 'lucide-react'

function Comments() {
  const [comments, setComments] = useState([
    {
      id: 1,
      name: 'John Smith',
      email: 'john@example.com',
      comment: 'Great service! The crypto payment integration is seamless and the development team is very professional.',
      date: '2024-10-01',
      rating: 5
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      comment: 'Excellent mobile app development services. Highly recommended for anyone looking for quality work.',
      date: '2024-09-28',
      rating: 5
    }
  ])

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    comment: ''
  })

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (formData.name && formData.email && formData.comment) {
      const newComment = {
        id: comments.length + 1,
        name: formData.name,
        email: formData.email,
        comment: formData.comment,
        date: new Date().toISOString().split('T')[0],
        rating: 5
      }
      
      setComments([newComment, ...comments])
      setFormData({ name: '', email: '', comment: '' })
      alert('Thank you for your comment! It has been posted successfully.')
    }
  }

  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-800 mb-4 flex items-center justify-center">
            <MessageSquare className="w-8 h-8 mr-3 text-blue-600" />
            Customer Comments & Reviews
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            See what our clients are saying about our services and share your own experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Comment Form */}
          <Card className="border-slate-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Leave a Comment</CardTitle>
              <CardDescription>
                Share your thoughts, questions, or feedback with us.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    name="name"
                    placeholder="Your Name *"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Your Email *"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Textarea
                    name="comment"
                    placeholder="Your Comment *"
                    value={formData.comment}
                    onChange={handleInputChange}
                    rows={5}
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Post Comment
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Comment Statistics */}
          <Card className="border-slate-200 shadow-lg bg-gradient-to-br from-blue-50 to-purple-50">
            <CardHeader>
              <CardTitle className="text-2xl">Community Feedback</CardTitle>
              <CardDescription>
                Join the conversation and connect with our community.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="text-4xl font-bold text-blue-600 mb-2">{comments.length}</div>
                <div className="text-slate-600">Total Comments</div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="text-4xl font-bold text-green-600 mb-2">5.0</div>
                <div className="text-slate-600">Average Rating</div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="text-4xl font-bold text-purple-600 mb-2">100%</div>
                <div className="text-slate-600">Customer Satisfaction</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Comments List */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-slate-800 mb-6">Recent Comments</h3>
          {comments.map((comment) => (
            <Card key={comment.id} className="border-slate-200 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-slate-800 text-lg">{comment.name}</h4>
                      <div className="flex items-center text-slate-500 text-sm">
                        <Calendar className="w-4 h-4 mr-1" />
                        {comment.date}
                      </div>
                    </div>
                    <div className="flex items-center mb-3">
                      {[...Array(comment.rating)].map((_, i) => (
                        <span key={i} className="text-yellow-400 text-lg">★</span>
                      ))}
                    </div>
                    <p className="text-slate-600 leading-relaxed">{comment.comment}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Comments
