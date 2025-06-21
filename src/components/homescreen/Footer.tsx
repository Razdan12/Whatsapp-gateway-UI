import { Github, Linkedin, MessageCircle, Twitter } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div>
            <footer className="border-t border-border py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-5 gap-8">
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-green-500 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold">WhatsApp Gateway</span>
              </div>
              <p className="text-sm text-muted-foreground max-w-md">
                Connect your applications to WhatsApp Business API with our reliable, secure, and scalable gateway
                service.
              </p>
              <div className="flex space-x-4">
                <Link to="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Twitter className="w-5 h-5" />
                </Link>
                <Link to="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Github className="w-5 h-5" />
                </Link>
                <Link to="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Linkedin className="w-5 h-5" />
                </Link>
              </div>
            </div>

            {[
              {
                title: "Product",
                links: ["Features", "Pricing", "Documentation", "API Reference", "Status"],
              },
              {
                title: "Solutions",
                links: ["E-commerce", "Customer Support", "Marketing", "Notifications", "Automation"],
              },
              {
                title: "Resources",
                links: ["Help Center", "Tutorials", "Blog", "Community", "Changelog"],
              },
            ].map((section) => (
              <div key={section.title} className="space-y-4">
                <h3 className="font-semibold">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link}>
                      <Link to="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">© 2024 WhatsApp Gateway. All rights reserved.</p>
            <p className="text-sm text-muted-foreground mt-4 md:mt-0">Made with ❤️ for businesses worldwide</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
