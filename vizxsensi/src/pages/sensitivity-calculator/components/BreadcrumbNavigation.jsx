import React from 'react';
import Icon from '../../../components/AppIcon';

const BreadcrumbNavigation = ({ className = '' }) => {
  const breadcrumbs = [
    { label: 'Home', path: '/dashboard-home', icon: 'Home' },
    { label: 'Calculator', path: '/sensitivity-calculator', icon: 'Calculator', current: true }
  ];

  const handleNavigation = (path) => {
    if (path !== '/sensitivity-calculator') {
      window.location.href = path;
    }
  };

  return (
    <nav className={`flex items-center space-x-2 text-sm ${className}`} aria-label="Breadcrumb">
      {breadcrumbs?.map((item, index) => (
        <React.Fragment key={item?.path}>
          {index > 0 && (
            <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
          )}
          <button
            onClick={() => handleNavigation(item?.path)}
            className={`flex items-center space-x-1 gaming-transition ${
              item?.current
                ? 'text-primary font-medium cursor-default' :'text-muted-foreground hover:text-foreground'
            }`}
            disabled={item?.current}
          >
            <Icon name={item?.icon} size={14} />
            <span>{item?.label}</span>
          </button>
        </React.Fragment>
      ))}
    </nav>
  );
};

export default BreadcrumbNavigation;