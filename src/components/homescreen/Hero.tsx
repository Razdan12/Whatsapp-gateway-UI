import { ArrowRight, BarChart3, MessageCircle, Phone, Send, Terminal, Webhook } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {

    function AnimatedCounter({ end, duration = 2000, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
      const [count, setCount] = useState(0)
    
      useEffect(() => {
        let startTime: number
        let animationFrame: number
    
        const animate = (currentTime: number) => {
          if (!startTime) startTime = currentTime
          const progress = Math.min((currentTime - startTime) / duration, 1)
    
          setCount(Math.floor(progress * end))
    
          if (progress < 1) {
            animationFrame = requestAnimationFrame(animate)
          }
        }
    
        animationFrame = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(animationFrame)
      }, [end, duration])
    
      return (
        <span>
          {count.toLocaleString()}
          {suffix}
        </span>
      )
    }

    function FloatingUIElement({
  children,
  delay = 0,
  className = "",
}: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <div
      className={`animate-float ${className}`}
      style={{
        animationDelay: `${delay}s`,
        animationDuration: `${8 + delay}s`,
      }}
    >
      {children}
    </div>
  )
}

  return (
    <div>
       <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Connect your apps to
                  <br />
                  <span className="bg-gradient-to-r from-green-500 via-green-600 to-emerald-600 bg-clip-text text-transparent">
                    WhatsApp APIs
                  </span>
                </h1>
                <div className="space-y-2 text-lg text-muted-foreground max-w-lg">
                  <p>WhatsApp Gateway is the bridge you need!</p>
                  <p>Send messages, receive webhooks, and integrate</p>
                  <p>WhatsApp API into your applications seamlessly.</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/register"
                  className="bg-green-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center justify-center group"
                >
                  Start Integration
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="#demo"
                  className="border border-border px-6 py-3 rounded-lg font-medium hover:bg-accent transition-colors flex items-center justify-center"
                >
                  <Send className="mr-2 w-4 h-4" />
                  View Demo
                </Link>
              </div>

              {/* Stats */}
              <div className="flex items-center space-x-8 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    <AnimatedCounter end={50} suffix="K+" />
                  </div>
                  <div className="text-sm text-muted-foreground">Messages/Day</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    <AnimatedCounter end={99.9} suffix="%" />
                  </div>
                  <div className="text-sm text-muted-foreground">Delivery Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    <AnimatedCounter end={500} suffix="+" />
                  </div>
                  <div className="text-sm text-muted-foreground">Businesses</div>
                </div>
              </div>
            </div>

            {/* Right Floating Elements */}
            <div className="relative h-96 lg:h-[600px]">
              {/* WhatsApp Chat Mockup */}
              <FloatingUIElement delay={0} className="absolute top-0 right-0 w-80 h-64">
                <div className="bg-base-100 border border-border rounded-xl p-4 shadow-lg">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                      <MessageCircle className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">Customer Support</h3>
                      <p className="text-xs text-muted-foreground">Online</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-muted rounded-lg p-2 max-w-[200px]">
                      <p className="text-xs">Hi! I need help with my order #23123</p>
                    </div>
                    <div className="bg-green-500 text-white rounded-lg p-2 max-w-[200px] ml-auto">
                      <p className="text-xs">Let me check your order status...</p>
                    </div>
                    <div className="bg-green-500 text-white rounded-lg p-2 max-w-[200px] ml-auto">
                      <p className="text-xs">Your order is being prepared and will be delivered by 6 PM today! 📦</p>
                    </div>
                    <div className="bg-muted rounded-lg p-2 max-w-[200px]">
                      <p className="text-xs">Perfect! Thank you so much! 😊</p>
                    </div>
                  </div>
                </div>
              </FloatingUIElement>

              {/* Webhook Events */}
              <FloatingUIElement delay={1} className="absolute top-20 left-0 w-64 h-40">
                <div className="bg-base-100 border border-border rounded-xl p-4 shadow-lg">
                  <div className="flex items-center mb-3">
                    <Webhook className="w-4 h-4 mr-2 text-purple-500" />
                    <span className="font-medium text-sm">Webhook Events</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span>message.received</span>
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span>message.delivered</span>
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span>message.read</span>
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span>status.update</span>
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </FloatingUIElement>

              {/* API Integration */}
              <FloatingUIElement delay={2} className="absolute bottom-32 right-8 w-72 h-44">
                <div className="bg-gray-900 border border-gray-700 rounded-xl p-4 shadow-lg">
                  <div className="flex items-center mb-3">
                    <Terminal className="w-4 h-4 mr-2 text-green-400" />
                    <span className="font-medium text-sm text-gray-300">API Integration</span>
                  </div>
                  <div className="space-y-1 text-xs font-mono">
                    <div className="text-blue-400">POST /api/v1/messages</div>
                    <div className="text-gray-400">{"{"}</div>
                    <div className="text-yellow-400 ml-2">"to": "+1234567890",</div>
                    <div className="text-yellow-400 ml-2">"message": "Hello from API!"</div>
                    <div className="text-gray-400">{"}"}</div>
                    <div className="text-green-400 mt-2">✓ Message sent successfully</div>
                    <div className="text-green-400">✓ Webhook delivered</div>
                  </div>
                </div>
              </FloatingUIElement>

              {/* Message Analytics */}
              <FloatingUIElement delay={3} className="absolute bottom-0 left-12 w-56 h-32">
                <div className="bg-base-100 border border-border rounded-xl p-4 shadow-lg">
                  <div className="flex items-center mb-3">
                    <BarChart3 className="w-4 h-4 mr-2 text-blue-500" />
                    <span className="font-medium text-sm">Message Analytics</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <div className="text-muted-foreground">Sent Today</div>
                      <div className="text-lg font-bold">1,247</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Delivered</div>
                      <div className="text-lg font-bold text-green-500">98.5%</div>
                    </div>
                  </div>
                </div>
              </FloatingUIElement>

              {/* Phone Numbers */}
              <FloatingUIElement delay={4} className="absolute top-40 right-20 w-48 h-28 ">
                <div className="bg-base-100 border border-border rounded-xl p-4 shadow-lg">
                  <div className="flex items-center mb-3">
                    <Phone className="w-4 h-4 mr-2 text-green-500" />
                    <span className="font-medium text-sm">Phone Numbers</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span>+1 (555) 123-4567</span>
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>+44 20 7946 0958</span>
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>+91 98765 43210</span>
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </FloatingUIElement>

              {/* Message Templates */}
              <FloatingUIElement delay={5} className="absolute bottom-16 right-32 w-52 h-36">
                <div className=" bg-base-100 border border-border rounded-xl p-4 shadow-lg">
                  <div className="flex items-center mb-3">
                    <Send className="w-4 h-4 mr-2 text-blue-500" />
                    <span className="font-medium text-sm">Templates</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="bg-muted rounded p-2">
                      <div className="font-medium">Order Confirmation</div>
                      <div className="text-muted-foreground">Your order #dasdas has been confirmed!</div>
                    </div>
                    <div className="bg-muted rounded p-2">
                      <div className="font-medium">Welcome Message</div>
                      <div className="text-muted-foreground">Welcome to dasdas! 🎉</div>
                    </div>
                  </div>
                </div>
              </FloatingUIElement>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
