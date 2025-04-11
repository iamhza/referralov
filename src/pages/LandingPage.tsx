import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Check, 
  Search, 
  Filter, 
  BarChart3, 
  Diamond, 
  User2, 
  Clock, 
  Bell, 
  Building2, 
  CheckCircle2, 
  BedDouble, 
  CheckCircle 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Logo from '@/components/Logo';

type TabId = "dashboard" | "matched" | "provider-profile";

const renderTabContent = (activeTab: TabId) => {
  switch (activeTab) {
    case "dashboard":
      return (
        <div className="space-y-8">
          {/* Overview Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { 
                label: "Total Referrals", 
                value: "247", 
                trend: "↑ 12% this month", 
                trendColor: "text-emerald-600",
                icon: (
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-emerald-600" />
                  </div>
                )
              },
              { 
                label: "Pending Matches", 
                value: "28", 
                trend: "5 urgent cases", 
                trendColor: "text-amber-600",
                icon: (
                  <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-amber-600" />
                  </div>
                )
              },
              { 
                label: "Matched Providers", 
                value: "183", 
                trend: "92% success rate", 
                trendColor: "text-blue-600",
                icon: (
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                    <User2 className="w-6 h-6 text-blue-600" />
                  </div>
                )
              },
              { 
                label: "Response Time", 
                value: "2.4h", 
                trend: "Within target", 
                trendColor: "text-violet-600",
                icon: (
                  <div className="w-12 h-12 rounded-xl bg-violet-50 flex items-center justify-center">
                    <Bell className="w-6 h-6 text-violet-600" />
                  </div>
                )
              },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-4 md:p-6 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors">
                <div className="flex items-start justify-between">
                  {stat.icon}
                  <div className={`px-2 py-1 rounded-lg bg-opacity-10 ${stat.trendColor} text-xs font-medium`}>
                    {stat.trend}
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-sm font-semibold text-black">{stat.label}</div>
                  <div className="text-2xl font-bold text-black mt-1">{stat.value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Active Referrals Table */}
          <div className="bg-white rounded-xl border border-slate-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between p-4 md:p-6 border-b border-slate-200">
              <div className="flex items-center gap-4 mb-4 md:mb-0">
                <h2 className="text-lg font-semibold text-slate-900">Active Referrals</h2>
                <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-xs font-medium">
                  Last 24 hours
                </span>
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search referrals..."
                    className="w-full md:w-[280px] h-10 pl-10 pr-4 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-referra-500 focus:border-transparent"
                  />
                </div>
                <button className="h-10 px-4 rounded-lg border border-slate-200 text-sm font-medium inline-flex items-center gap-2 hover:bg-slate-50 text-slate-600">
                  <Filter className="h-4 w-4" />
                  Filters
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/50">
                    <th className="text-left py-4 px-6 text-sm font-medium text-slate-500">Client Location</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-slate-500">Service Requested</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-slate-500">Urgency</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-slate-500">Status</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-slate-500">Last Updated</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-slate-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {[
                    {
                      location: "Minneapolis",
                      service: "Housing Stabilization",
                      urgency: { level: "High", color: "bg-red-500" },
                      status: { text: "Pending", color: "bg-amber-500" },
                      updated: "2 hours ago",
                    },
                    {
                      location: "Saint Paul",
                      service: "Mental Health Support",
                      urgency: { level: "Medium", color: "bg-amber-500" },
                      status: { text: "Matched", color: "bg-emerald-500" },
                      updated: "5 hours ago",
                    },
                    {
                      location: "Bloomington",
                      service: "Financial Counseling",
                      urgency: { level: "Low", color: "bg-blue-500" },
                      status: { text: "In Progress", color: "bg-blue-500" },
                      updated: "1 hour ago",
                    },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50/50">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 font-medium">
                            {row.location.charAt(0)}
                          </div>
                          <span className="text-sm text-slate-900">{row.location}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-sm text-slate-900">{row.service}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${row.urgency.color}`} />
                          <span className="text-sm text-slate-600">{row.urgency.level}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium ${
                          row.status.text === "Matched" 
                            ? "bg-emerald-50 text-emerald-700"
                            : row.status.text === "Pending"
                              ? "bg-amber-50 text-amber-700"
                              : "bg-blue-50 text-blue-700"
                        }`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${row.status.color}`} />
                          {row.status.text}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-sm text-slate-500">{row.updated}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <button className="text-referra-600 hover:text-referra-700 text-sm font-medium">View</button>
                          <span className="text-slate-200">|</span>
                          <button className="text-referra-600 hover:text-referra-700 text-sm font-medium">Edit</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );

    case "matched":
      return (
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Matching Process</h2>
            <div className="flex gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search matches..."
                  className="w-[280px] h-10 pl-10 pr-4 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-referra-500 focus:border-transparent"
                />
              </div>
              <button className="h-10 px-4 rounded-lg border border-gray-200 text-sm font-medium inline-flex items-center gap-2 hover:bg-gray-50">
                <Filter className="h-4 w-4" />
                Filters
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 -translate-x-1/2 z-0"></div>
            
            <div className="space-y-8">
              {[
                {
                  side: "left",
                  title: "Referral Created",
                  description: "Case manager submitted new referral for housing support",
                  time: "2 hours ago",
                  status: "completed",
                },
                {
                  side: "right",
                  title: "Provider Matched",
                  description: "Hope Housing Services identified as potential match",
                  time: "1 hour ago",
                  status: "completed",
                },
                {
                  side: "left",
                  title: "Initial Contact",
                  description: "Case manager reviewed and approved the match",
                  time: "45 minutes ago",
                  status: "active",
                },
                {
                  side: "right",
                  title: "Provider Review",
                  description: "Provider reviewing client details and requirements",
                  time: "Now",
                  status: "pending",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`flex ${item.side === "right" ? "justify-start pl-8 md:pl-1/2" : "justify-end pr-8 md:pr-1/2"} relative`}
                >
                  <div
                    className={`w-full md:w-1/2 bg-white p-4 rounded-lg border ${
                      item.status === "completed"
                        ? "border-green-100 shadow-green-100/50"
                        : item.status === "active"
                          ? "border-blue-100 shadow-blue-100/50"
                          : "border-gray-100"
                    } shadow-sm`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          item.status === "completed"
                            ? "bg-green-50 text-green-600"
                            : item.status === "active"
                              ? "bg-blue-50 text-blue-600"
                              : "bg-gray-50 text-gray-400"
                        }`}
                      >
                        {item.status === "completed" ? "✓" : item.status === "active" ? "●" : "○"}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{item.title}</h3>
                        <p className="text-sm text-gray-500">{item.description}</p>
                        <p className="text-xs text-gray-400 mt-1">{item.time}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case "provider-profile":
      return (
        <div className="space-y-8">
          {/* Provider Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
                <Building2 className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">Sunrise Living Service Inc.</h2>
                <p className="text-gray-600">Assisted Living & Specialized Care Services</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-referra-600 text-white rounded-lg hover:bg-referra-700 transition-colors">
              Update Availability
            </button>
          </div>

          {/* Provider Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Active Referrals", value: "5", trend: "Current cases", trendColor: "text-blue-600" },
              { label: "Success Rate", value: "94%", trend: "Above average", trendColor: "text-green-600" },
              { label: "Response Time", value: "24h", trend: "Average reply time", trendColor: "text-blue-600" },
              { label: "Total Reviews", value: "156", trend: "4.8/5 rating ⭐", trendColor: "text-yellow-600" },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <div className="text-base font-semibold text-black">{stat.label}</div>
                <div className="text-3xl md:text-4xl font-bold text-black">{stat.value}</div>
                <div className={`text-sm ${stat.trendColor} mt-1`}>{stat.trend}</div>
              </div>
            ))}
          </div>

          {/* Provider Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Services Offered</h3>
                <div className="grid grid-cols-1 gap-4">
                  {[
                    "Adult companion services",
                    "Adult day services (ADS)",
                    "Adult rehabilitative mental health services (ARMHS)",
                    "Assisted living facility with dementia care",
                  ].map((service, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                      <span className="text-sm text-gray-900">{service}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Location & Transportation</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Address</h4>
                    <p className="text-sm text-gray-900">1234 Elm Street, Minneapolis, MN 55401</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Nearby Transportation</h4>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-900">🚍 Bus Line 5 (1 block away)</p>
                      <p className="text-sm text-gray-900">🚆 Metro Light Rail Green Line (0.5 miles)</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Counties Served</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {["Hennepin", "Ramsey", "Anoka", "Dakota"].map((county, i) => (
                        <div key={i} className="text-sm text-gray-900">{county}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Availability & Capacity</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">Status</span>
                    <div className="flex items-center gap-2 text-emerald-600">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">Accepting Referrals</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">Bed Capacity</span>
                    <div className="flex items-center gap-1.5">
                      <BedDouble className="w-4 h-4 text-gray-900" />
                      <span className="text-sm text-gray-900">2 Open Beds</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">Email</span>
                    <span className="text-sm text-blue-600">contact@provider.com</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">Phone</span>
                    <span className="text-sm text-gray-900">(612) 555-0123</span>
                  </div>
                  <div className="pt-4">
                    <button className="w-full px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium">
                      Send Message
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
  }
};

const LandingPage = () => {
  const [activeTab, setActiveTab] = useState<TabId>("dashboard");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleStartNow = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      navigate(`/signup?email=${encodeURIComponent(email)}`);
    } else {
      navigate('/signup');
    }
  };

  const AnnouncementBanner = () => (
    <div className="inline-flex items-center gap-2 rounded-full bg-referra-50 border border-referra-100 px-4 py-1.5 text-sm font-medium text-referra-700">
      <Badge className="bg-referra-200 text-referra-700 hover:bg-referra-200 px-2 py-0.5 text-[11px]">NEW</Badge>
      <span>Now offering AI-powered provider matching</span>
      <ArrowRight className="h-3.5 w-3.5" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#ecf4fc]">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <Logo className="h-8 w-8" />
              <span className="text-xl font-semibold">Referra</span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent">Solutions</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid w-[400px] gap-3 p-4">
                        <NavigationMenuLink className="group block">
                          <div className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-md">
                            <div className="p-2 rounded-md bg-referra-50 text-referra-500">
                              <User2 className="h-5 w-5" />
                            </div>
                            <div>
                              <div className="font-medium">For Case Managers</div>
                              <div className="text-sm text-gray-500">Streamline your referral process</div>
                            </div>
                          </div>
                        </NavigationMenuLink>
                        <NavigationMenuLink className="group block">
                          <div className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-md">
                            <div className="p-2 rounded-md bg-blue-50 text-blue-500">
                              <Building2 className="h-5 w-5" />
                            </div>
                            <div>
                              <div className="font-medium">For Providers</div>
                              <div className="text-sm text-gray-500">Grow your practice with qualified referrals</div>
                            </div>
                          </div>
                        </NavigationMenuLink>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Features
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      About
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" asChild>
                <Link to="/signin">Sign In</Link>
              </Button>
              <Button variant="default" className="bg-referra-500 hover:bg-referra-600" asChild>
                <Link to="/signup">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <section className="container mx-auto px-4 md:px-8 pt-16 md:pt-32 pb-16 relative">
        <div className="max-w-3xl mx-auto space-y-8 md:space-y-12">
          <div className="flex justify-center">
            <AnnouncementBanner />
          </div>

          <div className="space-y-6 md:space-y-8 text-center">
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight text-gray-900">
              Effortless <span className="bg-gradient-to-r from-referra-700 to-referra-500 bg-clip-text text-transparent">AI-Powered Referrals</span>
            </h1>
            <div className="space-y-3 max-w-3xl mx-auto">
              <p className="text-lg md:text-xl text-gray-600">
                Referra connects case managers with pre-vetted service providers in seconds.
              </p>
              <div className="flex flex-col md:flex-row justify-center gap-4 text-base text-gray-800">
                <span className="flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-referra-600" />
                  No manual searches
                </span>
                <span className="flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-referra-600" />
                  Qualified referrals
                </span>
                <span className="flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-referra-600" />
                  Enhanced outcomes
                </span>
              </div>
            </div>

            <div className="pt-4">
              <form onSubmit={handleStartNow} className="max-w-md mx-auto">
                <div className="bg-white rounded-full p-1.5 flex items-center border-2 border-referra-200">
                  <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 text-base text-gray-900 placeholder-gray-500 focus:outline-none rounded-l-full"
                  />
                  <button 
                    type="submit"
                    className="px-6 py-2 bg-referra-600 text-white text-sm font-medium rounded-full hover:bg-referra-700 transition-colors whitespace-nowrap"
                  >
                    Start now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-16 md:mt-24 max-w-5xl mx-auto relative z-20">
          <div className="relative bg-white rounded-2xl shadow-[0_20px_50px_-20px_rgba(0,0,0,0.15),0_0_60px_-20px_rgba(99,102,241,0.25)] overflow-hidden transform hover:scale-[1.01] transition-all duration-300">
            <div className="bg-[#f8fafc] border-b border-slate-200 px-6 py-3">
              <div className="absolute left-4 top-[14px] flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57] border border-[#e0443e]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e] border border-[#d4a032]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840] border border-[#27aa35]" />
              </div>
              
              <div className="mx-auto max-w-sm bg-white/80 backdrop-blur-sm border border-slate-200 rounded-lg px-4 py-2 flex items-center gap-2">
                <div className="flex-shrink-0 w-4 h-4 rounded-full bg-emerald-400" />
                <span className="text-sm text-slate-400 font-medium">referra.ai</span>
              </div>

              <div className="flex items-center justify-center gap-1 mt-4 overflow-x-auto">
                {[
                  { id: "dashboard" as TabId, label: "Dashboard", icon: BarChart3 },
                  { id: "matched" as TabId, label: "Matched", icon: Diamond },
                  { id: "provider-profile" as TabId, label: "Provider Profile", icon: User2 },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 text-sm font-medium flex items-center gap-2 rounded-t-lg transition-colors relative ${
                      activeTab === tab.id 
                        ? "text-referra-600 bg-white border-t border-x border-slate-200" 
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span className="whitespace-nowrap">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 md:p-8 bg-white relative z-10">
              {renderTabContent(activeTab)}
            </div>
          </div>
          
          <div className="absolute -inset-x-20 -bottom-20 h-40 bg-gradient-to-t from-[#ecf4fc] to-transparent transform-gpu" />
        </div>
      </section>

      <section id="features" className="py-20 md:py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
        
        <div className="container mx-auto px-4 md:px-8 relative">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 md:mb-20">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Let&apos;s transform your referral process
              </h2>
              <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
                Whether you&apos;re a case manager looking to streamline referrals or a provider wanting to grow your client base, 
                Referra&apos;s intelligent platform makes the entire process seamless.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 md:gap-12">
              {[
                {
                  title: "For Case Managers",
                  description: "Streamline your referral process with our intelligent matching system. Find and connect with the right providers instantly.",
                  features: [
                    "Intelligent matching",
                    "Status updates",
                    "Case management"
                  ]
                },
                {
                  title: "For Providers",
                  description: "Grow your practice with perfectly matched referrals. Increase visibility and connect with qualified clients instantly.",
                  features: [
                    "Enhanced visibility",
                    "Qualified referrals",
                    "Practice growth"
                  ]
                },
                {
                  title: "Seamless Matching",
                  description: "Experience fast, efficient referrals with our automated matching system. Stay informed and connected throughout the process.",
                  features: [
                    "Real-time updates",
                    "Secure messaging",
                    "Complete tracking"
                  ]
                }
              ].map((card, index) => (
                <div key={index} className="group relative min-h-[420px]">
                  <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  <div className="relative h-full flex flex-col">
                    <div className="w-16 h-16 rounded-xl bg-referra-600 flex items-center justify-center">
                      <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="1" y="1" width="12" height="12" rx="2" stroke="#5D5FEF" strokeWidth="2"/>
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1 mt-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{card.title}</h3>
                      <p className="text-gray-700 leading-relaxed mb-8">
                        {card.description}
                      </p>
                      <ul className="space-y-4">
                        {card.features.map((feature, i) => (
                          <li key={i} className="flex items-center text-gray-700">
                            <div className="w-6 flex-shrink-0">
                              <CheckCircle2 className="w-5 h-5 text-referra-600 stroke-[2.5]" />
                            </div>
                            <div className="ml-2">
                              <span className="text-[15px] font-medium">{feature}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-[#f0f4fc] to-white relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                Meet <span className="text-referra-700">Casey</span> and <span className="text-referra-700">Pat</span>
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Follow their journey from frustration to efficiency with Referra
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="character-card relative bg-white p-8 rounded-2xl shadow-lg border border-slate-100 transform transition-all duration-500 hover:shadow-xl">
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-32 h-32 flex items-center justify-center">
                  <div className="character-image relative w-full h-full">
                    <div className="w-28 h-28 bg-amber-100 rounded-full flex items-center justify-center text-2xl font-bold text-amber-800">
                      CM
                    </div>
                    <div className="absolute -right-2 top-2">
                      <div className="w-6 h-6 bg-orange-400 rounded-full opacity-20"></div>
                    </div>
                    <div className="absolute -left-2 bottom-2">
                      <div className="w-4 h-4 bg-teal-400 rounded-full opacity-20"></div>
                    </div>
                  </div>
                </div>
                <div className="mt-16 text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Casey the Case Manager</h3>
                  <p className="text-gray-600 mb-6">Overwhelmed with paperwork and manual provider searches</p>
                  
                  <div className="space-y-4 text-left">
                    <div className="challenge-item flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-red-500">✗</div>
                      <p className="text-gray-700">Spends hours searching for appropriate providers</p>
                    </div>
                    <div className="challenge-item flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-red-500">✗</div>
                      <p className="text-gray-700">Manages referrals through endless email chains</p>
                    </div>
                    <div className="challenge-item flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-red-500">✗</div>
                      <p className="text-gray-700">Struggles to track referral status and outcomes</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="character-card relative bg-white p-8 rounded-2xl shadow-lg border border-slate-100 transform transition-all duration-500 hover:shadow-xl">
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-32 h-32 flex items-center justify-center">
                  <div className="character-image relative w-full h-full">
                    <div className="w-28 h-28 bg-blue-100 rounded-full flex items-center justify-center text-2xl font-bold text-blue-800">
                      SP
                    </div>
                    <div className="absolute -right-2 top-2">
                      <div className="w-6 h-6 bg-orange-400 rounded-full opacity-20"></div>
                    </div>
                    <div className="absolute -left-2 bottom-2">
                      <div className="w-4 h-4 bg-teal-400 rounded-full opacity-20"></div>
                    </div>
                  </div>
                </div>
                <div className="mt-16 text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Pat the Provider</h3>
                  <p className="text-gray-600 mb-6">Frustrated with unqualified referrals and wasted time</p>
                  
                  <div className="space-y-4 text-left">
                    <div className="challenge-item flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-red-500">✗</div>
                      <p className="text-gray-700">Receives referrals that don't match services offered</p>
                    </div>
                    <div className="challenge-item flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-red-500">✗</div>
                      <p className="text-gray-700">Lacks visibility into upcoming client needs</p>
                    </div>
                    <div className="challenge-item flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-red-500">✗</div>
                      <p className="text-gray-700">Wastes resources on administrative coordination</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-20 relative">
              <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-blue-100 -translate-x-1/2 z-0"></div>
              
              <div className="relative z-10 space-y-16">
                <div className="solution-step flex flex-col md:flex-row items-center gap-8">
                  <div className="w-16 h-16 rounded-full bg-referra-600 text-white flex items-center justify-center text-xl font-bold flex-shrink-0">1</div>
                  <div className="bg-white p-6 rounded-xl shadow-md border border-slate-100 md:w-3/4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Casey discovers Referra</h3>
                    <p className="text-gray-700">
                      Casey signs up for Referra and creates her first referral request using the smart questionnaire, 
                      specifying exactly what her client needs.
                    </p>
                  </div>
                </div>

                <div className="solution-step flex flex-col md:flex-row md:flex-row-reverse items-center gap-8">
                  <div className="w-16 h-16 rounded-full bg-referra-600 text-white flex items-center justify-center text-xl font-bold flex-shrink-0">2</div>
                  <div className="bg-white p-6 rounded-xl shadow-md border border-slate-100 md:w-3/4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Pat receives a perfect match</h3>
                    <p className="text-gray-700">
                      Pat gets notified about a new referral that perfectly matches his services and availability. 
                      The client details are exactly what he needs to prepare.
                    </p>
                  </div>
                </div>

                <div className="solution-step flex flex-col md:flex-row items-center gap-8">
                  <div className="w-16 h-16 rounded-full bg-referra-600 text-white flex items-center justify-center text-xl font-bold flex-shrink-0">3</div>
                  <div className="bg-white p-6 rounded-xl shadow-md border border-slate-100 md:w-3/4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Seamless collaboration</h3>
                    <p className="text-gray-700">
                      Casey and Pat communicate through Referra's platform, sharing updates and tracking progress. 
                      No more lost emails or phone tag.
                    </p>
                  </div>
                </div>

                <div className="solution-step flex flex-col md:flex-row md:flex-row-reverse items-center gap-8">
                  <div className="w-16 h-16 rounded-full bg-referra-600 text-white flex items-center justify-center text-xl font-bold flex-shrink-0">4</div>
                  <div className="bg-white p-6 rounded-xl shadow-md border border-slate-100 md:w-3/4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Success for everyone</h3>
                    <p className="text-gray-700">
                      The client gets faster service, Casey saves hours of work, and Pat grows his practice with 
                      perfectly matched clients. Everyone wins with Referra!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-referra-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              Ready to transform your referral process?
            </h2>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Join thousands of case managers and providers who are already experiencing 
              the benefits of our AI-powered platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-referra-600 hover:bg-referra-700 text-white h-14 px-8 text-lg"
                asChild
              >
                <Link to="/signin">
                  Get Started Today <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-referra-200 text-referra-700 hover:bg-referra-100 h-14 px-8 text-lg"
                asChild
              >
                <Link to="/provider">
                  Learn More
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-white border-t border-gray-200">
        <div className="container mx-auto px-4 md:px-8 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
              <div className="md:col-span-2 space-y-6">
                <Link to="/" className="inline-flex items-center gap-2">
                  <Logo className="h-8 w-8" />
                  <span className="text-xl font-bold">Referra</span>
                </Link>
                <p className="text-gray-600 text-sm max-w-sm">
                  Transforming healthcare referrals with intelligent matching and seamless collaboration.
                </p>
                <div className="flex items-center gap-6">
                  <a href="#" className="text-gray-400 hover:text-referra-600 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-referra-600 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-referra-600 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Solutions</h3>
                <ul className="space-y-3">
                  <li><Link to="/case-manager" className="text-gray-600 hover:text-referra-600 text-sm">For Case Managers</Link></li>
                  <li><Link to="/provider" className="text-gray-600 hover:text-referra-600 text-sm">For Providers</Link></li>
                  <li><Link to="#features" className="text-gray-600 hover:text-referra-600 text-sm">Features</Link></li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Company</h3>
                <ul className="space-y-3">
                  <li><Link to="/" className="text-gray-600 hover:text-referra-600 text-sm">About</Link></li>
                  <li><Link to="/signin" className="text-gray-600 hover:text-referra-600 text-sm">Sign In</Link></li>
                  <li><Link to="/admin/login" className="text-gray-600 hover:text-referra-600 text-sm">Admin Access</Link></li>
                </ul>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-center text-sm text-gray-600">
                © {new Date().getFullYear()} Referra. All rights reserved. Demo version for conference presentation.
              </p>
            </div>
          </div>
        </div>
      </footer>

      <style jsx="true" global="true">{`
        @keyframes fadeInOut {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
        .character-card {
          transition: all 0.5s ease;
        }
        .character-card:hover {
          transform: translateY(-5px);
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
