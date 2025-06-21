import { MessageCircle, Send, Webhook } from 'lucide-react'
import React from 'react'

const WorksSection = () => {
  return (
    <div>
       <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              How it{" "}
              <span className="bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
                works
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Connect your WhatsApp Business account to your applications in three simple steps.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-8 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-green-500 to-emerald-600 opacity-30"></div>

            {[
              {
                step: "01",
                title: "Connect WhatsApp",
                description:
                  "Link your WhatsApp Business account using our secure authentication process. Get verified in minutes.",
                icon: MessageCircle,
              },
              {
                step: "02",
                title: "Configure Webhooks",
                description:
                  "Set up webhook endpoints to receive real-time notifications for messages, delivery status, and more.",
                icon: Webhook,
              },
              {
                step: "03",
                title: "Send & Receive",
                description:
                  "Start sending messages via API and receiving webhooks. Scale your WhatsApp communication effortlessly.",
                icon: Send,
              },
            ].map((item, index) => (
              <div key={index} className="text-center relative">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default WorksSection
