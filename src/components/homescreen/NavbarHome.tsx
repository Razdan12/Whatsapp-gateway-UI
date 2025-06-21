import { Menu, MessageCircle, Search, X } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const NavbarHome = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <div>
      <nav className=" backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">ChatSync</span>
             
            </div>

            {/* Navigation Items */}
            <div className="hidden md:flex items-center space-x-6">
              <Link
                to="/docs"
                className="text-muted-foreground hover:text-foreground transition-colors text-sm"
              >
                Documentation
              </Link>
              <Link
                to="#features"
                className="text-muted-foreground hover:text-foreground transition-colors text-sm"
              >
                Features
              </Link>
              <Link
                to="#pricing"
                className="text-muted-foreground hover:text-foreground transition-colors text-sm"
              >
                Pricing
              </Link>
              {/* <ThemeToggle /> */}
              <Link
                to="/login"
                className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              {/* <ThemeToggle /> */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-9 h-9 rounded-lg bg-background border border-border hover:bg-accent transition-colors flex items-center justify-center"
              >
                {mobileMenuOpen ? (
                  <X className="w-4 h-4" />
                ) : (
                  <Menu className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-border py-4 space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search documentation..."
                  className="w-full pl-10 pr-4 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 text-sm"
                />
              </div>
              <div className="space-y-2">
                <Link
                  to="/docs"
                  className="block text-muted-foreground hover:text-foreground transition-colors text-sm py-2"
                >
                  Documentation
                </Link>
                <Link
                  to="#features"
                  className="block text-muted-foreground hover:text-foreground transition-colors text-sm py-2"
                >
                  Features
                </Link>
                <Link
                  to="#pricing"
                  className="block text-muted-foreground hover:text-foreground transition-colors text-sm py-2"
                >
                  Pricing
                </Link>
                <Link
                  to="/login"
                  className="block bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors text-center"
                >
                  Get Started
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default NavbarHome;
