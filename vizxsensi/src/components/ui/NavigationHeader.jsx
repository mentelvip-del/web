import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';

const NavigationHeader = ({ className = '' }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setSearchQuery('');
    }
  };

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim()) {
      console.log('Search query:', searchQuery);
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-1000 bg-background border-b gaming-border-subtle ${className}`}>
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <span className="text-2xl font-heading font-bold text-primary">VIZ</span>
            <span className="text-2xl font-heading font-bold text-foreground">x</span>
            <span className="text-2xl font-heading font-bold text-accent">SENSI</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          <a 
            href="/dashboard-home" 
            className="text-foreground hover:text-primary gaming-transition font-medium"
          >
            Home
          </a>
          <a 
            href="/sensitivity-calculator" 
            className="text-foreground hover:text-primary gaming-transition font-medium"
          >
            Calculator
          </a>
          <a 
            href="/sensitivity-tester" 
            className="text-foreground hover:text-primary gaming-transition font-medium"
          >
            Tester
          </a>
          <a 
            href="/tutorial-guide" 
            className="text-foreground hover:text-primary gaming-transition font-medium"
          >
            Guide
          </a>
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-3">
          {/* Search */}
          <div className="relative">
            {isSearchOpen ? (
              <form onSubmit={handleSearchSubmit} className="flex items-center">
                <Input
                  type="search"
                  placeholder="Search presets, guides..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                  className="w-64 h-10"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleSearchToggle}
                  className="ml-2"
                >
                  <Icon name="X" size={20} />
                </Button>
              </form>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleSearchToggle}
                className="hover:bg-muted"
              >
                <Icon name="Search" size={20} />
              </Button>
            )}
          </div>

          {/* Profile */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => window.location.href = '/user-profile'}
            className="hover:bg-muted"
          >
            <Icon name="User" size={20} />
          </Button>

          {/* Settings */}
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-muted"
          >
            <Icon name="Settings" size={20} />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default NavigationHeader;