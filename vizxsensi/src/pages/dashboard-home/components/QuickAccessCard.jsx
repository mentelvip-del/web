import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const QuickAccessCard = ({ className = '' }) => {
  const quickActions = [
    {
      id: 'sensitivity-tester',
      title: 'Sensitivity Tester',
      description: 'Test your aim with interactive targets',
      icon: 'Target',
      iconColor: 'text-primary',
      bgColor: 'bg-primary/10',
      route: '/sensitivity-tester',
      features: ['Moving Targets', 'Accuracy Tracking', 'Real-time Stats']
    },
    {
      id: 'calculator',
      title: 'Calculator',
      description: 'Create custom sensitivity settings',
      icon: 'Calculator',
      iconColor: 'text-accent',
      bgColor: 'bg-accent/10',
      route: '/sensitivity-calculator',
      features: ['Device Optimization', 'Real-time Preview', 'Export Settings']
    },
    {
      id: 'tutorial',
      title: 'Tutorial Guide',
      description: 'Learn optimization techniques',
      icon: 'BookOpen',
      iconColor: 'text-success',
      bgColor: 'bg-success/10',
      route: '/tutorial-guide',
      features: ['Step-by-step Guide', 'Video Tutorials', 'Pro Tips']
    }
  ];

  const handleActionClick = (route) => {
    window.location.href = route;
  };

  return (
    <div className={`${className}`}>
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-warning/10 rounded-lg flex items-center justify-center">
          <Icon name="Zap" size={16} className="text-warning" />
        </div>
        <div>
          <h2 className="text-xl font-heading font-bold text-foreground">
            Quick Access
          </h2>
          <p className="text-sm text-muted-foreground">
            Jump into your favorite tools
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {quickActions?.map((action) => (
          <div
            key={action?.id}
            className="bg-card rounded-lg gaming-shadow-secondary border gaming-border-subtle p-6 hover:gaming-shadow-primary gaming-transition cursor-pointer group"
            onClick={() => handleActionClick(action?.route)}
          >
            {/* Icon & Title */}
            <div className="flex items-center space-x-3 mb-4">
              <div className={`w-12 h-12 ${action?.bgColor} rounded-lg flex items-center justify-center group-hover:scale-110 gaming-transition`}>
                <Icon name={action?.icon} size={24} className={action?.iconColor} />
              </div>
              <div className="flex-1">
                <h3 className="font-heading font-semibold text-foreground group-hover:text-primary gaming-transition">
                  {action?.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {action?.description}
                </p>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-2 mb-4">
              {action?.features?.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  <span className="text-xs text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>

            {/* Action Button */}
            <Button
              variant="outline"
              size="sm"
              fullWidth
              onClick={(e) => {
                e?.stopPropagation();
                handleActionClick(action?.route);
              }}
              iconName="ArrowRight"
              iconPosition="right"
              className="group-hover:border-primary group-hover:text-primary"
            >
              Launch Tool
            </Button>
          </div>
        ))}
      </div>
      {/* Sensitivity Tester Preview */}
      <div className="mt-6 bg-card rounded-lg gaming-shadow-secondary border gaming-border-subtle p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-heading font-semibold text-foreground">
              Sensitivity Tester Preview
            </h3>
            <p className="text-sm text-muted-foreground">
              Practice your aim with our interactive testing environment
            </p>
          </div>
          <Button
            variant="default"
            size="sm"
            onClick={() => handleActionClick('/sensitivity-tester')}
            iconName="Play"
            iconPosition="left"
          >
            Start Test
          </Button>
        </div>

        {/* Mini Preview */}
        <div className="relative h-32 bg-muted rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-background to-muted"></div>
          
          {/* Crosshair */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative w-6 h-6">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-primary transform -translate-y-1/2"></div>
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary transform -translate-x-1/2"></div>
              <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-primary rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>
          </div>

          {/* Mock Targets */}
          <div className="absolute top-4 right-8 w-4 h-4 bg-primary rounded-full animate-pulse"></div>
          <div className="absolute bottom-6 left-8 w-3 h-3 bg-accent rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute top-8 left-1/3 w-2 h-2 bg-success rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>

          {/* Stats Overlay */}
          <div className="absolute bottom-2 left-2 bg-card/90 rounded px-2 py-1">
            <div className="flex items-center space-x-3 text-xs">
              <span className="text-success">Accuracy: 87%</span>
              <span className="text-warning">Speed: 1.2s</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickAccessCard;