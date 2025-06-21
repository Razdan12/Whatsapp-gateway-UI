import { BarChart3, Code, Send, Shield, Users, Webhook } from 'lucide-react'
import React from 'react'

const Feature = () => {
  return (
    <div>
       <section id="features" className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Everything you{" "}
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">need</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive WhatsApp Business API integration with powerful features for modern applications.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Send,
                title: "Message API",
                description: "Send text, media, documents, and interactive messages through simple REST API calls.",
                gradient: "from-green-500 to-emerald-500",
              },
              {
                icon: Webhook,
                title: "Real-time Webhooks",
                description:
                  "Receive instant notifications for message delivery, read receipts, and incoming messages.",
                gradient: "from-purple-500 to-pink-500",
              },
              {
                icon: Users,
                title: "Contact Management",
                description: "Manage contacts, groups, and broadcast lists with comprehensive API endpoints.",
                gradient: "from-blue-500 to-cyan-500",
              },
              {
                icon: Shield,
                title: "Enterprise Security",
                description: "End-to-end encryption, secure authentication, and compliance with WhatsApp policies.",
                gradient: "from-yellow-500 to-orange-500",
              },
              {
                icon: BarChart3,
                title: "Analytics Dashboard",
                description: "Track message delivery rates, response times, and engagement metrics in real-time.",
                gradient: "from-red-500 to-pink-500",
              },
              {
                icon: Code,
                title: "Developer Tools",
                description:
                  "SDKs, code examples, testing tools, and comprehensive documentation for quick integration.",
                gradient: "from-indigo-500 to-purple-500",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 group"
              >
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Feature
