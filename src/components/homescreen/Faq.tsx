import React from 'react'

const Faq = () => {
  return (
    <div>
       <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Frequently asked{" "}
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                questions
              </span>
            </h2>
            <p className="text-lg text-muted-foreground">Everything you need to know about WhatsApp Gateway</p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "What is WhatsApp Gateway?",
                answer:
                  "WhatsApp Gateway is a service that allows you to integrate WhatsApp Business API into your applications. Send messages, receive webhooks, and manage WhatsApp communication programmatically.",
              },
              {
                question: "Do I need a WhatsApp Business account?",
                answer:
                  "Yes, you need a verified WhatsApp Business account. We'll help you set it up and get it approved by WhatsApp if you don't have one already.",
              },
              {
                question: "How do webhooks work?",
                answer:
                  "Webhooks are real-time notifications sent to your application when events occur (message received, delivered, read, etc.). You provide an endpoint URL, and we'll send HTTP POST requests with event data.",
              },
              {
                question: "What types of messages can I send?",
                answer:
                  "You can send text messages, images, documents, videos, audio files, location data, and interactive messages like buttons and lists through our API.",
              },
              {
                question: "Is there a rate limit?",
                answer:
                  "WhatsApp has messaging limits based on your business verification status. We help you manage these limits and provide guidance on scaling your messaging volume.",
              },
              {
                question: "How secure is the service?",
                answer:
                  "We use enterprise-grade security with end-to-end encryption, secure API authentication, and comply with WhatsApp's security requirements and data protection policies.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold mb-2">{faq.question}</h3>
                <p className="text-muted-foreground text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Faq
