
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Simple navigation */}
      <header className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="bg-referra-500 text-white p-1.5 rounded">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
              </div>
              <span className="text-xl font-semibold">Referra</span>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" asChild>
                <Link to="/provider">Provider Login</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/signin">Case Manager Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">
            Smarter Referrals, Faster Matches
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            Referra connects case managers with pre-vetted service providers through an 
            AI-powered matching system that ensures the perfect fit for every client.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-referra-500 hover:bg-referra-600 text-white h-14 px-8 text-lg"
              asChild
            >
              <Link to="/signin">
                Case Manager Sign In <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-referra-200 text-referra-700 hover:bg-referra-50 h-14 px-8 text-lg"
              asChild
            >
              <Link to="/provider">
                Join as a Provider
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Feature section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">How Referra Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="bg-referra-100 text-referra-700 w-10 h-10 rounded-full flex items-center justify-center mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3">Submit a Referral</h3>
              <p className="text-gray-600">
                Case managers submit client information and service needs through our simplified guided workflow.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="bg-referra-100 text-referra-700 w-10 h-10 rounded-full flex items-center justify-center mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3">Match with Providers</h3>
              <p className="text-gray-600">
                Our AI matches clients with the most appropriate pre-vetted service providers based on needs and availability.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="bg-referra-100 text-referra-700 w-10 h-10 rounded-full flex items-center justify-center mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3">Track & Communicate</h3>
              <p className="text-gray-600">
                Follow referral progress, manage tasks, and communicate directly with providers in one seamless interface.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Benefits for Case Managers</h2>
              <ul className="space-y-4">
                {[
                  'Reduce referral time from days to minutes',
                  'Access a network of pre-vetted, quality providers',
                  'Track referral status in real-time',
                  'Communicate directly with providers',
                  'Get matched with providers who have confirmed capacity'
                ].map((benefit, i) => (
                  <li key={i} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <Button 
                className="mt-8 bg-referra-500 hover:bg-referra-600"
                asChild
              >
                <Link to="/signin">
                  Sign In as Case Manager <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Benefits for Providers</h2>
              <ul className="space-y-4">
                {[
                  'Receive qualified client referrals that match your services',
                  'Reduce administrative overhead with our streamlined process',
                  'Improve visibility through our featured provider program',
                  'Communicate directly with case managers',
                  'Track and update service delivery in one central location'
                ].map((benefit, i) => (
                  <li key={i} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <Button 
                variant="outline" 
                className="mt-8 border-referra-200 text-referra-700 hover:bg-referra-50"
                asChild
              >
                <Link to="/provider">
                  Join Our Provider Network
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Simple footer */}
      <footer className="bg-gray-50 border-t py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="bg-referra-500 text-white p-1.5 rounded">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
              </div>
              <span className="text-xl font-semibold">Referra</span>
            </div>
            <div className="flex flex-col items-center md:items-end">
              <div className="text-sm text-gray-500 mb-2">
                © 2023 Referra. All rights reserved. Demo version for conference presentation.
              </div>
              <Link to="/admin/login" className="text-xs text-gray-400 hover:text-referra-600 transition-colors">
                Admin Access
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
