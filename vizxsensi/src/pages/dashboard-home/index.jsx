import React, { useState, useEffect } from 'react';
import NavigationHeader from '../../components/ui/NavigationHeader';
import SidebarNavigation from '../../components/ui/SidebarNavigation';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import QuickRecommendationQuiz from './components/QuickRecommendationQuiz';
import FeaturedPresets from './components/FeaturedPresets';
import CommunityShares from './components/CommunityShares';
import QuickAccessCard from './components/QuickAccessCard';
import SearchBar from './components/SearchBar';
import AdPlaceholder from './components/AdPlaceholder';

const DashboardHome = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const formatTime = (date) => {
    return date?.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  const formatDate = (date) => {
    return date?.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <NavigationHeader />
      {/* Sidebar Navigation - Desktop */}
      <SidebarNavigation
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={handleToggleSidebar}
      />
      {/* Main Content */}
      <main className={`pt-16 pb-20 lg:pb-8 gaming-transition ${
        isSidebarCollapsed ? 'lg:pl-16' : 'lg:pl-64'
      }`}>
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="mb-4 lg:mb-0">
                <h1 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-2">
                  Welcome to VIZxSENSI
                </h1>
                <p className="text-muted-foreground">
                  Optimize your Free Fire sensitivity settings for better gameplay
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-mono font-bold text-primary">
                  {formatTime(currentTime)}
                </div>
                <div className="text-sm text-muted-foreground">
                  {formatDate(currentTime)}
                </div>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <SearchBar className="mb-8" />

          {/* Quick Recommendation Quiz */}
          <QuickRecommendationQuiz className="mb-8" />

          {/* Ad Placeholder */}
          <AdPlaceholder size="banner" className="mb-8" />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Left Column - Featured Content */}
            <div className="xl:col-span-2 space-y-8">
              {/* Featured Presets */}
              <FeaturedPresets />

              {/* Ad Placeholder */}
              <AdPlaceholder size="square" />

              {/* Community Shares */}
              <CommunityShares />
            </div>

            {/* Right Column - Quick Access & Sidebar Content */}
            <div className="space-y-8">
              {/* Quick Access */}
              <QuickAccessCard />

              {/* Ad Placeholder - Sidebar */}
              <AdPlaceholder size="sidebar" />

              {/* Gaming Stats Card */}
              <div className="bg-card rounded-lg gaming-shadow-secondary border gaming-border-subtle p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <span className="text-primary font-heading font-bold text-sm">FF</span>
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-foreground">
                      Gaming Stats
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Your performance overview
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Presets Tried</span>
                    <span className="text-sm font-mono font-medium text-foreground">12</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Aim Tests</span>
                    <span className="text-sm font-mono font-medium text-foreground">8</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Best Accuracy</span>
                    <span className="text-sm font-mono font-medium text-success">87%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Avg. Response</span>
                    <span className="text-sm font-mono font-medium text-warning">1.2s</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t gaming-border-subtle">
                  <div className="text-center">
                    <div className="text-2xl font-heading font-bold text-primary mb-1">
                      Pro
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Gaming Level
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Tips Card */}
              <div className="bg-card rounded-lg gaming-shadow-secondary border gaming-border-subtle p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
                    <span className="text-success text-lg">💡</span>
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-foreground">
                      Pro Tip
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Daily gaming advice
                    </p>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-sm text-foreground leading-relaxed">
                    "Start with lower sensitivity settings and gradually increase them. This helps build muscle memory and improves long-term accuracy in Free Fire."
                  </p>
                </div>

                <div className="mt-4 text-xs text-muted-foreground text-center">
                  Tip updates daily • Follow @vizxsensi for more
                </div>
              </div>
            </div>
          </div>

          {/* Footer Section */}
          <div className="mt-12 pt-8 border-t gaming-border-subtle">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <span className="text-2xl font-heading font-bold text-primary">VIZ</span>
                <span className="text-2xl font-heading font-bold text-foreground">x</span>
                <span className="text-2xl font-heading font-bold text-accent">SENSI</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Optimize your Free Fire gameplay with professional sensitivity settings
              </p>
              <div className="flex items-center justify-center space-x-6 text-xs text-muted-foreground">
                <span>© {new Date()?.getFullYear()} VIZxSENSI</span>
                <span>•</span>
                <button 
                  onClick={() => window.open('https://instagram.com/vizxsensi', '_blank')}
                  className="hover:text-primary gaming-transition"
                >
                  @vizxsensi
                </button>
                <span>•</span>
                <button className="hover:text-primary gaming-transition">
                  Privacy Policy
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Bottom Tab Navigation - Mobile */}
      <BottomTabNavigation />
    </div>
  );
};

export default DashboardHome;