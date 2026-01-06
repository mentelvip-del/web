import React, { useState } from 'react';
import Icon from '../AppIcon';

const BottomTabNavigation = ({ className = '' }) => {
  const [activeTab, setActiveTab] = useState('/dashboard-home');

  const navigationTabs = [
    {
      label: 'Home',
      path: '/dashboard-home',
      icon: 'Home'
    },
    {
      label: 'Calculator',
      path: '/sensitivity-calculator',
      icon: 'Calculator'
    },
    {
      label: 'Tester',
      path: '/sensitivity-tester',
      icon: 'Target'
    },
    {
      label: 'Guide',
      path: '/tutorial-guide',
      icon: 'BookOpen'
    },
    {
      label: 'Profile',
      path: '/user-profile',
      icon: 'User'
    }
  ];

  const handleTabPress = (path) => {
    setActiveTab(path);
    // Add haptic feedback for mobile devices
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
    window.location.href = path;
  };

  return (
    <nav 
      className={`fixed bottom-0 left-0 right-0 z-998 bg-card border-t gaming-border-subtle lg:hidden ${className}`}
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="flex items-center justify-around px-2 py-2">
        {navigationTabs?.map((tab) => (
          <button
            key={tab?.path}
            onClick={() => handleTabPress(tab?.path)}
            className={`flex flex-col items-center justify-center min-w-0 flex-1 py-2 px-1 gaming-transition ${
              activeTab === tab?.path
                ? 'text-primary' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            <div className={`p-1 rounded-lg ${
              activeTab === tab?.path ? 'bg-primary/10' : ''
            }`}>
              <Icon 
                name={tab?.icon} 
                size={20} 
                className={activeTab === tab?.path ? 'text-primary' : 'text-current'}
              />
            </div>
            <span className={`text-xs font-medium mt-1 truncate ${
              activeTab === tab?.path ? 'text-primary' : 'text-current'
            }`}>
              {tab?.label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomTabNavigation;