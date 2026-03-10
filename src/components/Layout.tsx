import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import Joyride, { CallBackProps, STATUS } from 'react-joyride';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  ShieldAlert, 
  DollarSign, 
  FileCode2, 
  History,
  Bell,
  Search,
  UserCircle,
  Settings,
  LogOut,
  Cloud,
  HelpCircle,
  Menu,
  X
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useToast } from './Toast';
import Modal from './Modal';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard, tourId: 'tour-dashboard' },
  { name: 'Cost Management', href: '/cost', icon: DollarSign, tourId: 'tour-cost' },
  { name: 'Security & Compliance', href: '/compliance', icon: ShieldAlert, tourId: 'tour-compliance' },
  { name: 'IaC & Blueprints', href: '/blueprints', icon: FileCode2, tourId: 'tour-blueprints' },
  { name: 'Audit & Reporting', href: '/audit', icon: History, tourId: 'tour-audit' },
  { name: 'Cloud Integrations', href: '/integrations', icon: Cloud, tourId: 'tour-integrations' },
];

export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { showToast } = useToast();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [runTour, setRunTour] = useState(false);

  useEffect(() => {
    // Run tour automatically for new users who just completed onboarding
    const hasSeenTour = localStorage.getItem('jade_tour_completed');
    if (!hasSeenTour && user && !user.isNewUser) {
      setRunTour(true);
    }
  }, [user]);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];
    
    if (finishedStatuses.includes(status)) {
      setRunTour(false);
      localStorage.setItem('jade_tour_completed', 'true');
    }
  };

  const startTour = () => {
    setRunTour(true);
  };

  const handleSignOut = () => {
    signOut();
    navigate('/signin');
  };

  const tourSteps = [
    {
      target: '.tour-dashboard',
      content: 'Welcome to your Dashboard! Here you can see a high-level overview of your cloud costs, compliance posture, and active alerts.',
      disableBeacon: true,
    },
    {
      target: '.tour-compliance',
      content: 'Real-time Compliance Monitoring Dashboard: Set customizable alerts and notifications for security, cost, and compliance policy violations to enable swift corrective actions.',
    },
    {
      target: '.tour-audit',
      content: 'Automated Compliance Reporting and Audit Trail: Generate detailed, auditable records of governance decisions, policy changes, and infrastructure provisioning activities.',
    },
    {
      target: '.tour-cost',
      content: 'Cost Management: Analyze your cloud spend, identify waste, and apply AI-driven cost optimization recommendations.',
    },
    {
      target: '.tour-search',
      content: 'Global Search & Notifications: Quickly find resources or check your customizable alerts across all your connected cloud environments.',
    }
  ];

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      showToast(`Searching for "${searchQuery}"...`, 'info');
      setSearchQuery('');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Joyride
        steps={tourSteps}
        run={runTour}
        continuous
        showProgress
        showSkipButton
        callback={handleJoyrideCallback}
        styles={{
          options: {
            primaryColor: 'var(--color-jade-blue)',
            textColor: 'var(--color-jade-dark)',
            zIndex: 10000,
          },
          tooltipContainer: {
            textAlign: 'left'
          },
          buttonNext: {
            backgroundColor: 'var(--color-jade-blue)',
          },
          buttonBack: {
            color: 'var(--color-jade-blue)',
          }
        }}
      />

      {/* Mobile Sidebar Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "w-64 bg-slate-900 text-slate-300 flex flex-col fixed inset-y-0 left-0 z-50 transform transition-transform duration-200 ease-in-out md:translate-x-0",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800">
          <div className="flex items-center">
            <img 
              src="https://www.jadeglobal.com/themes/custom/jade_subtheme/images/Jade-logo.svg" 
              alt="Jade Global" 
              className="h-8 w-auto mr-3 filter brightness-0 invert"
            />
            <span className="text-lg font-semibold text-white tracking-tight truncate">GovernAI</span>
          </div>
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="md:hidden text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <NavLink
                key={item.name}
                to={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors",
                  item.tourId,
                  isActive 
                    ? "bg-slate-800 text-white" 
                    : "hover:bg-slate-800/50 hover:text-white"
                )}
              >
                <item.icon className={cn(
                  "w-5 h-5 mr-3",
                  isActive ? "text-emerald-400" : "text-slate-400"
                )} />
                {item.name}
              </NavLink>
            );
          })}
        </div>

        <div className="p-4 border-t border-slate-800 space-y-1">
          <div 
            onClick={startTour}
            className="flex items-center px-3 py-2 text-sm font-medium rounded-lg hover:bg-slate-800/50 cursor-pointer transition-colors"
          >
            <HelpCircle className="w-5 h-5 mr-3 text-slate-400" />
            Product Tour
          </div>
          <div 
            onClick={() => setIsSettingsOpen(true)}
            className="flex items-center px-3 py-2 text-sm font-medium rounded-lg hover:bg-slate-800/50 cursor-pointer transition-colors"
          >
            <Settings className="w-5 h-5 mr-3 text-slate-400" />
            Settings
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:pl-64 min-w-0">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 sticky top-0 z-30">
          <div className="flex items-center flex-1">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 mr-2 text-slate-500 hover:bg-slate-100 rounded-lg"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="relative w-full max-w-md tour-search hidden sm:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
                placeholder="Search resources, policies, or alerts... (Press Enter)" 
                className="w-full pl-10 pr-4 py-2 bg-slate-100 border-transparent rounded-lg text-sm focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all outline-none"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4 relative">
            <button 
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors rounded-full hover:bg-slate-100"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-px bg-slate-200 mx-2"></div>
            
            <div className="relative">
              <button 
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center space-x-2 text-sm font-medium text-slate-700 hover:text-slate-900 focus:outline-none"
              >
                <div className="w-8 h-8 bg-jade-blue text-white rounded-full flex items-center justify-center font-semibold">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <span>{user?.name || 'User'}</span>
              </button>

              {isNotificationsOpen && (
                <div className="absolute right-12 mt-2 w-80 bg-white rounded-lg shadow-lg border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <h3 className="text-sm font-semibold text-slate-900">Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    <div className="px-4 py-3 hover:bg-slate-50 border-b border-slate-50 cursor-pointer">
                      <p className="text-sm font-medium text-slate-900">High Cost Anomaly</p>
                      <p className="text-xs text-slate-500 mt-0.5">RDS instance cost spiked by 45% in us-east-1.</p>
                      <p className="text-xs text-slate-400 mt-1">10 mins ago</p>
                    </div>
                    <div className="px-4 py-3 hover:bg-slate-50 border-b border-slate-50 cursor-pointer">
                      <p className="text-sm font-medium text-slate-900">Compliance Violation</p>
                      <p className="text-xs text-slate-500 mt-0.5">S3 bucket missing encryption.</p>
                      <p className="text-xs text-slate-400 mt-1">1 hour ago</p>
                    </div>
                    <div className="px-4 py-3 hover:bg-slate-50 cursor-pointer">
                      <p className="text-sm font-medium text-slate-900">Blueprint Approved</p>
                      <p className="text-xs text-slate-500 mt-0.5">Data Lake Foundation v1.1.0 was approved.</p>
                      <p className="text-xs text-slate-400 mt-1">2 hours ago</p>
                    </div>
                  </div>
                  <div className="px-4 py-2 border-t border-slate-100 text-center">
                    <button className="text-xs font-medium text-emerald-600 hover:text-emerald-700">Mark all as read</button>
                  </div>
                </div>
              )}

              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-100 py-1 z-50 animate-in fade-in slide-in-from-top-2">
                  <button 
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      showToast('Profile settings opened', 'info');
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center"
                  >
                    <UserCircle className="w-4 h-4 mr-2 text-slate-400" />
                    My Profile
                  </button>
                  <button 
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 flex items-center border-t border-slate-100 mt-1 pt-2"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto overflow-x-hidden">
          <Outlet />
        </main>
      </div>

      <Modal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        title="Global Settings"
        footer={
          <>
            <button onClick={() => setIsSettingsOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200 rounded-lg transition-colors">
              Cancel
            </button>
            <button onClick={() => { setIsSettingsOpen(false); showToast('Settings saved successfully', 'success'); }} className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors">
              Save Changes
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Theme</label>
            <select className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none">
              <option>System Default</option>
              <option>Light</option>
              <option>Dark</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email Notifications</label>
            <select className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none">
              <option>All Alerts</option>
              <option>Critical Only</option>
              <option>None</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Default Currency</label>
            <select className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none">
              <option>USD ($)</option>
              <option>EUR (€)</option>
              <option>GBP (£)</option>
            </select>
          </div>
        </div>
      </Modal>
    </div>
  );
}
