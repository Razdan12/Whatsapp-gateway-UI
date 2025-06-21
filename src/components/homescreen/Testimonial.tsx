import { Star } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const Testimonial = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      name: 'Carlos Rodriguez',
      role: 'CTO at E-Commerce Plus',
      avatar: 'CR',
      content:
        'WhatsApp Gateway transformed our customer service. We now handle 10x more customer inquiries through WhatsApp with automated responses and seamless API integration.',
      rating: 5,
    },
    {
      name: 'Priya Sharma',
      role: 'Lead Developer at FinTech Solutions',
      avatar: 'PS',
      content:
        'The webhook integration is flawless. We receive real-time notifications for every WhatsApp message and can respond instantly through our CRM system.',
      rating: 5,
    },
    {
      name: 'Ahmed Hassan',
      role: 'Product Manager at DeliveryApp',
      avatar: 'AH',
      content:
        'Order confirmations, delivery updates, and customer support - all through WhatsApp. Our customer satisfaction increased by 85% since implementing this gateway.',
      rating: 5,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div>
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Loved by{' '}
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                businesses
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See how companies are transforming their customer communication
              with WhatsApp Gateway
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                {[...Array(testimonials[activeTestimonial].rating)].map(
                  (_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  )
                )}
              </div>
              <blockquote className="text-lg mb-8 leading-relaxed">
                "{testimonials[activeTestimonial].content}"
              </blockquote>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-semibold">
                    {testimonials[activeTestimonial].avatar}
                  </span>
                </div>
                <div>
                  <div className="font-semibold">
                    {testimonials[activeTestimonial].name}
                  </div>
                  <div className="text-muted-foreground text-sm">
                    {testimonials[activeTestimonial].role}
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === activeTestimonial
                      ? 'bg-green-500 w-8'
                      : 'bg-muted-foreground/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonial;
