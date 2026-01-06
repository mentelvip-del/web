import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const SidebarNavigation = ({ isCollapsed = false, onToggleCollapse, className = '' }) => {
  const [activeItem, setActiveItem] = useState('/dashboard-home');

  const navigationItems = [
    {
      label: 'Home',
      path: '/dashboard-home',
      icon: 'Home',
      tooltip: 'Dashboard & Featured Presets'
    },
    {
      label: 'Calculator',
      path: '/sensitivity-calculator',
      icon: 'Calculator',
      tooltip: 'Sensitivity Configuration Tool'
    },
    {
      label: 'Tester',
      path: '/sensitivity-tester',
      icon: 'Target',
      tooltip: 'Practice Environment'
    },
    {
      label: 'Guide',
      path: '/tutorial-guide',
      icon: 'BookOpen',
      tooltip: 'Tutorial & Tips'
    },
    {
      label: 'Profile',
      path: '/user-profile',
      icon: 'User',
      tooltip: 'Personal Settings & Stats'
    }
  ];

  const handleNavigation = (path) => {
    setActiveItem(path);
    window.location.href = path;
  };

  return (
    <aside 
      className={`fixed left-0 top-16 bottom-0 z-999 bg-card border-r gaming-border-subtle gaming-transition hidden lg:flex flex-col ${
        isCollapsed ? 'w-16' : 'w-64'
      } ${className}`}
    >
      {/* Toggle Button */}
      <div className="flex items-center justify-end p-4 border-b gaming-border-subtle">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCollapse}
          className="hover:bg-muted"
        >
          <Icon name={isCollapsed ? "ChevronRight" : "ChevronLeft"} size={20} />
        </Button>
      </div>
      {/* Navigation Items */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems?.map((item) => (
          <div key={item?.path} className="relative group">
            <Button
              variant={activeItem === item?.path ? "default" : "ghost"}
              onClick={() => handleNavigation(item?.path)}
              className={`w-full justify-start gaming-transition ${
                isCollapsed ? 'px-3' : 'px-4'
              } ${
                activeItem === item?.path 
                  ? 'bg-primary text-primary-foreground gaming-shadow-primary' 
                  : 'hover:bg-muted text-foreground hover:text-primary'
              }`}
            >
              <Icon name={item?.icon} size={20} className="flex-shrink-0" />
              {!isCollapsed && (
                <span className="ml-3 font-medium">{item?.label}</span>
              )}
            </Button>

            {/* Tooltip for collapsed state */}
            {isCollapsed && (
              <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-3 py-2 bg-popover text-popover-foreground text-sm rounded-md gaming-shadow-secondary opacity-0 group-hover:opacity-100 gaming-transition pointer-events-none whitespace-nowrap z-1100">
                {item?.tooltip}
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-popover rotate-45"></div>
              </div>
            )}
          </div>
        ))}
      </nav>
      {/* Footer */}
      <div className="p-4 border-t gaming-border-subtle">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <Icon name="Zap" size={16} color="white" />
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">Gaming Mode</p>
              <p className="text-xs text-muted-foreground">Optimized Performance</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default SidebarNavigation;