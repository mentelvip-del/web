import React, { useState, useEffect } from 'react';
import NavigationHeader from '../../components/ui/NavigationHeader';
import SidebarNavigation from '../../components/ui/SidebarNavigation';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import ProfileHeader from './components/ProfileHeader';
import ConfigurationCard from './components/ConfigurationCard';
import TestResultsChart from './components/TestResultsChart';
import SharedPresetCard from './components/SharedPresetCard';
import SettingsPanel from './components/SettingsPanel';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const UserProfile = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('configurations');
  const [userProfile, setUserProfile] = useState({
    username: "ProGamer_FF",
    level: 45,
    joinDate: "March 2024",
    deviceType: "4gb",
    playstyle: "aggressive",
    stats: {
      savedConfigs: 12,
      testSessions: 89,
      avgAccuracy: 78,
      sharedPresets: 3
    }
  });

  const [savedConfigurations, setSavedConfigurations] = useState([
    {
      id: 1,
      name: "Headshot Master",
      deviceType: "4gb",
      playstyle: "aggressive",
      createdAt: "2025-08-25T10:30:00Z",
      isShared: true,
      settings: {
        general: "85",
        redDot: "78",
        scope2x: "65",
        scope4x: "45"
      },
      performance: {
        bestAccuracy: 89,
        usageCount: 24
      }
    },
    {
      id: 2,
      name: "Sniper Elite",
      deviceType: "6gb+",
      playstyle: "sniper",
      createdAt: "2025-08-20T14:15:00Z",
      isShared: false,
      settings: {
        general: "70",
        redDot: "65",
        scope2x: "55",
        scope4x: "35"
      },
      performance: {
        bestAccuracy: 92,
        usageCount: 18
      }
    },
    {
      id: 3,
      name: "Balanced Pro",
      deviceType: "4gb",
      playstyle: "balanced",
      createdAt: "2025-08-18T09:45:00Z",
      isShared: true,
      settings: {
        general: "75",
        redDot: "70",
        scope2x: "60",
        scope4x: "40"
      },
      performance: {
        bestAccuracy: 85,
        usageCount: 31
      }
    }
  ]);

  const [testResults, setTestResults] = useState([
    { date: "2025-08-20", accuracy: 72, speed: 450, sessions: 3 },
    { date: "2025-08-21", accuracy: 75, speed: 420, sessions: 4 },
    { date: "2025-08-22", accuracy: 78, speed: 400, sessions: 2 },
    { date: "2025-08-23", accuracy: 80, speed: 380, sessions: 5 },
    { date: "2025-08-24", accuracy: 77, speed: 390, sessions: 3 },
    { date: "2025-08-25", accuracy: 82, speed: 360, sessions: 4 },
    { date: "2025-08-26", accuracy: 85, speed: 340, sessions: 6 },
    { date: "2025-08-27", accuracy: 83, speed: 350, sessions: 3 },
    { date: "2025-08-28", accuracy: 87, speed: 320, sessions: 5 },
    { date: "2025-08-29", accuracy: 89, speed: 310, sessions: 4 }
  ]);

  const [sharedPresets, setSharedPresets] = useState([
    {
      id: 1,
      name: "Headshot Master",
      deviceType: "4GB RAM",
      playstyle: "Aggressive",
      sharedAt: "2025-08-25T10:30:00Z",
      settings: {
        general: "85",
        redDot: "78",
        scope2x: "65",
        scope4x: "45"
      },
      stats: {
        views: 234,
        downloads: 89,
        likes: 67
      },
      recentActivity: [
        { type: 'download', user: 'FireKing_99', timestamp: '2025-08-29T08:15:00Z' },
        { type: 'like', user: 'SnipeQueen', timestamp: '2025-08-29T07:30:00Z' },
        { type: 'view', user: 'ProShooter', timestamp: '2025-08-29T06:45:00Z' }
      ]
    },
    {
      id: 2,
      name: "Balanced Pro",
      deviceType: "4GB RAM",
      playstyle: "Balanced",
      sharedAt: "2025-08-18T09:45:00Z",
      settings: {
        general: "75",
        redDot: "70",
        scope2x: "60",
        scope4x: "40"
      },
      stats: {
        views: 156,
        downloads: 45,
        likes: 32
      },
      recentActivity: [
        { type: 'view', user: 'GamerBoy_21', timestamp: '2025-08-28T19:20:00Z' },
        { type: 'download', user: 'AimBot_Pro', timestamp: '2025-08-28T15:10:00Z' }
      ]
    }
  ]);

  const [userSettings, setUserSettings] = useState({
    defaultDevice: "4gb",
    defaultResolution: "1080p",
    defaultFPS: "60",
    notifications: {
      newPresets: true,
      communityUpdates: true,
      performanceTips: false
    },
    privacy: {
      publicProfile: true,
      shareTestResults: true,
      analytics: true
    }
  });

  useEffect(() => {
    // Load data from localStorage
    const savedProfile = localStorage.getItem('userProfile');
    const savedConfigs = localStorage.getItem('savedConfigurations');
    const savedTestResults = localStorage.getItem('testResults');
    const savedSettings = localStorage.getItem('userSettings');

    if (savedProfile) setUserProfile(JSON.parse(savedProfile));
    if (savedConfigs) setSavedConfigurations(JSON.parse(savedConfigs));
    if (savedTestResults) setTestResults(JSON.parse(savedTestResults));
    if (savedSettings) setUserSettings(JSON.parse(savedSettings));
  }, []);

  const handleUpdateProfile = (updatedProfile) => {
    const newProfile = { ...userProfile, ...updatedProfile };
    setUserProfile(newProfile);
    localStorage.setItem('userProfile', JSON.stringify(newProfile));
  };

  const handleEditConfiguration = (config) => {
    // Navigate to calculator with preset data
    localStorage.setItem('editingConfig', JSON.stringify(config));
    window.location.href = '/sensitivity-calculator';
  };

  const handleDeleteConfiguration = (config) => {
    if (confirm(`Are you sure you want to delete "${config?.name}"?`)) {
      const updatedConfigs = savedConfigurations?.filter(c => c?.id !== config?.id);
      setSavedConfigurations(updatedConfigs);
      localStorage.setItem('savedConfigurations', JSON.stringify(updatedConfigs));
    }
  };

  const handleDuplicateConfiguration = (config) => {
    const newConfig = {
      ...config,
      id: Date.now(),
      name: `${config?.name} (Copy)`,
      createdAt: new Date()?.toISOString(),
      isShared: false,
      performance: {
        bestAccuracy: 0,
        usageCount: 0
      }
    };
    
    const updatedConfigs = [...savedConfigurations, newConfig];
    setSavedConfigurations(updatedConfigs);
    localStorage.setItem('savedConfigurations', JSON.stringify(updatedConfigs));
  };

  const handleShareConfiguration = (config) => {
    alert(`Configuration "${config?.name}" copied to clipboard! Share it on Instagram with #VIZxSENSI`);
  };

  const handleUnsharePreset = (preset) => {
    if (confirm(`Are you sure you want to unshare "${preset?.name}"?`)) {
      const updatedPresets = sharedPresets?.filter(p => p?.id !== preset?.id);
      setSharedPresets(updatedPresets);
      
      // Also update the configuration to not shared
      const updatedConfigs = savedConfigurations?.map(c => 
        c?.name === preset?.name ? { ...c, isShared: false } : c
      );
      setSavedConfigurations(updatedConfigs);
      localStorage.setItem('savedConfigurations', JSON.stringify(updatedConfigs));
    }
  };

  const handleViewPresetStats = (preset) => {
    alert(`Detailed stats for "${preset?.name}":\n\nViews: ${preset?.stats?.views}\nDownloads: ${preset?.stats?.downloads}\nLikes: ${preset?.stats?.likes}\n\nRecent activity: ${preset?.recentActivity?.length} interactions`);
  };

  const handleUpdateSettings = (newSettings) => {
    setUserSettings(newSettings);
    localStorage.setItem('userSettings', JSON.stringify(newSettings));
  };

  const tabs = [
    { id: 'configurations', label: 'Saved Configs', icon: 'Settings', count: savedConfigurations?.length },
    { id: 'results', label: 'Test Results', icon: 'TrendingUp', count: testResults?.length },
    { id: 'shared', label: 'Shared Presets', icon: 'Share2', count: sharedPresets?.length },
    { id: 'settings', label: 'Settings', icon: 'Sliders', count: null }
  ];

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      <SidebarNavigation 
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <main className={`pt-16 pb-20 lg:pb-8 gaming-transition ${
        sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
      }`}>
        <div className="container mx-auto px-4 lg:px-6 py-6">
          {/* Profile Header */}
          <ProfileHeader 
            userProfile={userProfile}
            onUpdateProfile={handleUpdateProfile}
          />

          {/* Tab Navigation */}
          <div className="mt-8">
            <div className="border-b gaming-border-subtle">
              <nav className="flex space-x-8 overflow-x-auto">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap gaming-transition ${
                      activeTab === tab?.id
                        ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                    }`}
                  >
                    <Icon name={tab?.icon} size={16} />
                    <span>{tab?.label}</span>
                    {tab?.count !== null && (
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        activeTab === tab?.id 
                          ? 'bg-primary/10 text-primary' :'bg-muted text-muted-foreground'
                      }`}>
                        {tab?.count}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="mt-6">
            {activeTab === 'configurations' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-heading font-semibold text-foreground">
                    Saved Configurations
                  </h2>
                  <Button
                    variant="default"
                    onClick={() => window.location.href = '/sensitivity-calculator'}
                    iconName="Plus"
                    iconPosition="left"
                  >
                    New Config
                  </Button>
                </div>

                {savedConfigurations?.length === 0 ? (
                  <div className="bg-card rounded-lg gaming-border-subtle border p-8 text-center">
                    <Icon name="Settings" size={48} className="text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                      No Configurations Yet
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Create your first sensitivity configuration to get started.
                    </p>
                    <Button
                      variant="default"
                      onClick={() => window.location.href = '/sensitivity-calculator'}
                      iconName="Plus"
                      iconPosition="left"
                    >
                      Create Configuration
                    </Button>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {savedConfigurations?.map((config) => (
                      <ConfigurationCard
                        key={config?.id}
                        config={config}
                        onEdit={handleEditConfiguration}
                        onDelete={handleDeleteConfiguration}
                        onDuplicate={handleDuplicateConfiguration}
                        onShare={handleShareConfiguration}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'results' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-heading font-semibold text-foreground">
                    Test Results & Analytics
                  </h2>
                  <Button
                    variant="outline"
                    onClick={() => window.location.href = '/sensitivity-tester'}
                    iconName="Target"
                    iconPosition="left"
                  >
                    Start Testing
                  </Button>
                </div>

                <TestResultsChart testData={testResults} />

                {/* Recent Sessions */}
                <div className="bg-card rounded-lg gaming-border-subtle border p-6">
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
                    Recent Test Sessions
                  </h3>
                  
                  <div className="space-y-3">
                    {testResults?.slice(-5)?.reverse()?.map((result, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Icon name="Target" size={16} className="text-primary" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-foreground">
                              {new Date(result.date)?.toLocaleDateString('en-US', { 
                                weekday: 'short', 
                                month: 'short', 
                                day: 'numeric' 
                              })}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {result?.sessions} sessions
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-success">
                            {result?.accuracy}% accuracy
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {result?.speed}ms avg
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'shared' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-heading font-semibold text-foreground">
                    Shared Presets
                  </h2>
                  <Button
                    variant="outline"
                    onClick={() => setActiveTab('configurations')}
                    iconName="Share2"
                    iconPosition="left"
                  >
                    Share More
                  </Button>
                </div>

                {sharedPresets?.length === 0 ? (
                  <div className="bg-card rounded-lg gaming-border-subtle border p-8 text-center">
                    <Icon name="Share2" size={48} className="text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                      No Shared Presets Yet
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Share your configurations with the Free Fire community.
                    </p>
                    <Button
                      variant="default"
                      onClick={() => setActiveTab('configurations')}
                      iconName="Share2"
                      iconPosition="left"
                    >
                      Share Configuration
                    </Button>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {sharedPresets?.map((preset) => (
                      <SharedPresetCard
                        key={preset?.id}
                        preset={preset}
                        onUnshare={handleUnsharePreset}
                        onViewStats={handleViewPresetStats}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'settings' && (
              <div>
                <h2 className="text-xl font-heading font-semibold text-foreground mb-6">
                  Settings & Preferences
                </h2>
                <SettingsPanel 
                  settings={userSettings}
                  onUpdateSettings={handleUpdateSettings}
                />
              </div>
            )}
          </div>
        </div>
      </main>
      <BottomTabNavigation />
    </div>
  );
};

export default UserProfile;