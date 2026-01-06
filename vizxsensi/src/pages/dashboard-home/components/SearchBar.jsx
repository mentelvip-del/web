import React, { useState, useRef, useEffect } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SearchBar = ({ className = '' }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);

  // Mock search data
  const searchData = [
    {
      id: 'headshot-pro',
      type: 'preset',
      title: 'Headshot Pro',
      description: 'Optimized for precise headshots',
      category: 'Sniper',
      route: '/sensitivity-calculator?preset=headshot-pro'
    },
    {
      id: 'no-recoil',
      type: 'preset',
      title: 'No Recoil Master',
      description: 'Minimizes weapon recoil',
      category: 'Aggressive',
      route: '/sensitivity-calculator?preset=no-recoil'
    },
    {
      id: 'sensitivity-guide',
      type: 'guide',
      title: 'Sensitivity Optimization Guide',
      description: 'Learn how to optimize your settings',
      category: 'Tutorial',
      route: '/tutorial-guide?section=sensitivity'
    },
    {
      id: 'device-setup',
      type: 'guide',
      title: 'Device Setup Tutorial',
      description: 'Configure your device for gaming',
      category: 'Tutorial',
      route: '/tutorial-guide?section=device'
    },
    {
      id: 'aim-training',
      type: 'tool',
      title: 'Aim Training',
      description: 'Practice your aim skills',
      category: 'Tester',
      route: '/sensitivity-tester'
    }
  ];

  const popularSearches = [
    'Headshot settings',
    'No recoil config',
    'Best DPI for Free Fire',
    'Device optimization',
    'Aim training'
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef?.current && !searchRef?.current?.contains(event?.target)) {
        setShowResults(false);
        setIsSearchFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchChange = (e) => {
    const query = e?.target?.value;
    setSearchQuery(query);

    if (query?.trim()?.length > 0) {
      const filtered = searchData?.filter(item =>
        item?.title?.toLowerCase()?.includes(query?.toLowerCase()) ||
        item?.description?.toLowerCase()?.includes(query?.toLowerCase()) ||
        item?.category?.toLowerCase()?.includes(query?.toLowerCase())
      );
      setSearchResults(filtered);
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim()) {
      window.location.href = `/sensitivity-calculator?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  const handleResultClick = (route) => {
    setShowResults(false);
    setSearchQuery('');
    window.location.href = route;
  };

  const handlePopularSearchClick = (search) => {
    setSearchQuery(search);
    setShowResults(false);
    window.location.href = `/sensitivity-calculator?search=${encodeURIComponent(search)}`;
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'preset':
        return 'Settings';
      case 'guide':
        return 'BookOpen';
      case 'tool':
        return 'Target';
      default:
        return 'Search';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'preset':
        return 'text-primary';
      case 'guide':
        return 'text-success';
      case 'tool':
        return 'text-accent';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <form onSubmit={handleSearchSubmit} className="relative">
        <Input
          type="search"
          placeholder="Search presets, guides, tutorials..."
          value={searchQuery}
          onChange={handleSearchChange}
          onFocus={() => {
            setIsSearchFocused(true);
            if (searchQuery?.trim()?.length === 0) {
              setShowResults(true);
            }
          }}
          className={`pl-12 pr-4 h-12 gaming-transition ${
            isSearchFocused ? 'ring-2 ring-primary/20' : ''
          }`}
        />
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
          <Icon name="Search" size={20} className="text-muted-foreground" />
        </div>
        {searchQuery && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => {
              setSearchQuery('');
              setSearchResults([]);
              setShowResults(false);
            }}
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
          >
            <Icon name="X" size={16} />
          </Button>
        )}
      </form>
      {/* Search Results Dropdown */}
      {showResults && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card rounded-lg gaming-shadow-primary border gaming-border-subtle z-50 max-h-96 overflow-y-auto">
          {searchQuery?.trim()?.length === 0 ? (
            /* Popular Searches */
            (<div className="p-4">
              <h4 className="text-sm font-medium text-foreground mb-3">
                Popular Searches
              </h4>
              <div className="space-y-2">
                {popularSearches?.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handlePopularSearchClick(search)}
                    className="flex items-center space-x-3 w-full p-2 rounded-lg hover:bg-muted gaming-transition text-left"
                  >
                    <Icon name="TrendingUp" size={16} className="text-muted-foreground" />
                    <span className="text-sm text-foreground">{search}</span>
                  </button>
                ))}
              </div>
            </div>)
          ) : searchResults?.length > 0 ? (
            /* Search Results */
            (<div className="p-2">
              {searchResults?.map((result) => (
                <button
                  key={result?.id}
                  onClick={() => handleResultClick(result?.route)}
                  className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-muted gaming-transition text-left"
                >
                  <div className={`w-8 h-8 bg-muted rounded-lg flex items-center justify-center`}>
                    <Icon name={getTypeIcon(result?.type)} size={16} className={getTypeColor(result?.type)} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-foreground truncate">
                        {result?.title}
                      </span>
                      <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                        {result?.category}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      {result?.description}
                    </p>
                  </div>
                  <Icon name="ArrowRight" size={16} className="text-muted-foreground" />
                </button>
              ))}
            </div>)
          ) : (
            /* No Results */
            (<div className="p-8 text-center">
              <Icon name="Search" size={32} className="text-muted-foreground mx-auto mb-3" />
              <h4 className="text-sm font-medium text-foreground mb-1">
                No results found
              </h4>
              <p className="text-xs text-muted-foreground">
                Try searching for presets, guides, or tutorials
              </p>
            </div>)
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;