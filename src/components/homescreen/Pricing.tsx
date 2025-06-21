import { CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

const Pricing = () => {
  return (
    <div>
      <section id="pricing" className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Simple, transparent{" "}
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">pricing</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Pay only for what you use. No hidden fees, no setup costs. Scale as your business grows.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Starter",
                price: "$29",
                description: "Perfect for small businesses",
                features: [
                  "1,000 messages/month",
                  "1 WhatsApp number",
                  "Basic webhooks",
                  "Email support",
                  "Message templates",
                ],
                popular: false,
              },
              {
                name: "Business",
                price: "$99",
                description: "For growing companies",
                features: [
                  "10,000 messages/month",
                  "3 WhatsApp numbers",
                  "Advanced webhooks",
                  "Priority support",
                  "Custom templates",
                  "Analytics dashboard",
                ],
                popular: true,
              },
              {
                name: "Enterprise",
                price: "$299",
                description: "For large organizations",
                features: [
                  "Unlimited messages",
                  "Unlimited numbers",
                  "Custom integrations",
                  "24/7 phone support",
                  "SLA guarantee",
                  "Dedicated account manager",
                ],
                popular: false,
              },
            ].map((plan, index) => (
              <div
                key={index}
                className={`bg-card border rounded-2xl p-8 relative ${
                  plan.popular ? "border-green-500 shadow-lg scale-105" : "border-border"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-center mb-8">
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/register"
                  className={`w-full py-3 rounded-lg font-medium transition-all text-center block ${
                    plan.popular ? "bg-green-500 text-white hover:bg-green-600" : "border border-border hover:bg-accent"
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Pricing
