import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const QuickActions = ({ onSearch, onBookmark, onShare, className = '' }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim()) {
      onSearch(searchQuery?.trim());
    }
  };

  const handleSearchToggle = () => {
    setIsSearchExpanded(!isSearchExpanded);
    if (!isSearchExpanded) {
      setSearchQuery('');
    }
  };

  const quickLinks = [
    { label: 'Device Setup', icon: 'Smartphone', action: () => onSearch('device setup') },
    { label: 'Sensitivity Values', icon: 'Settings', action: () => onSearch('sensitivity') },
    { label: 'Common Issues', icon: 'AlertCircle', action: () => onSearch('troubleshooting') },
    { label: 'Advanced Tips', icon: 'Zap', action: () => onSearch('advanced') }
  ];

  return (
    <div className={`bg-card rounded-lg border gaming-border-subtle gaming-shadow-secondary ${className}`}>
      <div className="p-4 border-b gaming-border-subtle">
        <h3 className="font-heading font-semibold text-foreground flex items-center space-x-2">
          <Icon name="Zap" size={20} className="text-primary" />
          <span>Quick Actions</span>
        </h3>
      </div>
      <div className="p-4 space-y-4">
        {/* Search */}
        <div>
          {isSearchExpanded ? (
            <form onSubmit={handleSearchSubmit} className="flex items-center space-x-2">
              <Input
                type="search"
                placeholder="Search tutorials..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e?.target?.value)}
                className="flex-1"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={handleSearchToggle}
              >
                <Icon name="X" size={16} />
              </Button>
            </form>
          ) : (
            <Button
              variant="outline"
              onClick={handleSearchToggle}
              iconName="Search"
              iconPosition="left"
              fullWidth
            >
              Search Tutorials
            </Button>
          )}
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">Quick Links</h4>
          <div className="grid grid-cols-2 gap-2">
            {quickLinks?.map((link, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                onClick={link?.action}
                className="justify-start text-xs h-auto py-2"
              >
                <Icon name={link?.icon} size={14} className="mr-2" />
                {link?.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2">
          <Button
            variant="outline"
            onClick={onBookmark}
            iconName="Bookmark"
            iconPosition="left"
            fullWidth
          >
            Bookmark Section
          </Button>
          
          <Button
            variant="outline"
            onClick={onShare}
            iconName="Share"
            iconPosition="left"
            fullWidth
          >
            Share Tutorial
          </Button>
        </div>

        {/* Help */}
        <div className="bg-muted/30 rounded-lg p-3 border gaming-border-subtle">
          <div className="flex items-start space-x-2">
            <Icon name="HelpCircle" size={16} className="text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-foreground font-medium mb-1">Need Help?</p>
              <p className="text-xs text-muted-foreground">
                Contact us on Instagram @vizxsensi for personalized assistance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;