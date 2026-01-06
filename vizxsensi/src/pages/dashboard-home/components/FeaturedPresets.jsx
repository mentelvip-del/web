import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FeaturedPresets = ({ className = '' }) => {
  const featuredPresets = [
    {
      id: 'headshot-pro',
      name: 'Headshot Pro',
      description: 'Optimized for precise headshots and long-range combat',
      category: 'Sniper',
      deviceType: '4GB+ RAM',
      dpi: '600',
      sensitivity: {
        general: 85,
        redDot: 78,
        scope2x: 65,
        scope4x: 52,
        scope8x: 35
      },
      rating: 4.8,
      downloads: 15420,
      isNew: true,
      thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=200&fit=crop'
    },
    {
      id: 'no-recoil',
      name: 'No Recoil Master',
      description: 'Minimizes weapon recoil for spray control',
      category: 'Aggressive',
      deviceType: '6GB+ RAM',
      dpi: '800',
      sensitivity: {
        general: 92,
        redDot: 88,
        scope2x: 75,
        scope4x: 62,
        scope8x: 45
      },
      rating: 4.9,
      downloads: 23150,
      isNew: false,
      thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=200&fit=crop'
    },
    {
      id: 'balanced-pro',
      name: 'Balanced Pro',
      description: 'Perfect balance for all combat situations',
      category: 'Balanced',
      deviceType: '2GB+ RAM',
      dpi: '400',
      sensitivity: {
        general: 75,
        redDot: 70,
        scope2x: 58,
        scope4x: 45,
        scope8x: 30
      },
      rating: 4.7,
      downloads: 18900,
      isNew: false,
      thumbnail: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=200&fit=crop'
    }
  ];

  const handlePresetClick = (presetId) => {
    window.location.href = `/sensitivity-calculator?preset=${presetId}`;
  };

  const handleViewAll = () => {
    window.location.href = '/sensitivity-calculator?tab=presets';
  };

  return (
    <div className={`${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="Star" size={16} className="text-accent" />
          </div>
          <div>
            <h2 className="text-xl font-heading font-bold text-foreground">
              Featured Presets
            </h2>
            <p className="text-sm text-muted-foreground">
              Top-rated configurations from the community
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleViewAll}
          iconName="ArrowRight"
          iconPosition="right"
        >
          View All
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {featuredPresets?.map((preset) => (
          <div
            key={preset?.id}
            className="bg-card rounded-lg gaming-shadow-secondary border gaming-border-subtle overflow-hidden hover:gaming-shadow-primary gaming-transition cursor-pointer group"
            onClick={() => handlePresetClick(preset?.id)}
          >
            {/* Thumbnail */}
            <div className="relative h-32 bg-muted overflow-hidden">
              <img
                src={preset?.thumbnail}
                alt={preset?.name}
                className="w-full h-full object-cover group-hover:scale-105 gaming-transition"
                onError={(e) => {
                  e.target.src = '/assets/images/no_image.png';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              
              {/* Badges */}
              <div className="absolute top-3 left-3 flex items-center space-x-2">
                {preset?.isNew && (
                  <span className="px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                    NEW
                  </span>
                )}
                <span className="px-2 py-1 bg-card/90 text-foreground text-xs font-medium rounded-full">
                  {preset?.category}
                </span>
              </div>

              {/* Rating */}
              <div className="absolute top-3 right-3 flex items-center space-x-1 bg-card/90 rounded-full px-2 py-1">
                <Icon name="Star" size={12} className="text-warning fill-current" />
                <span className="text-xs font-medium text-foreground">{preset?.rating}</span>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-heading font-semibold text-foreground group-hover:text-primary gaming-transition">
                  {preset?.name}
                </h3>
                <Button
                  variant="ghost"
                  size="icon"
                  className="opacity-0 group-hover:opacity-100 gaming-transition"
                  onClick={(e) => {
                    e?.stopPropagation();
                    // Handle favorite/bookmark
                  }}
                >
                  <Icon name="Heart" size={16} />
                </Button>
              </div>

              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {preset?.description}
              </p>

              {/* Device & DPI Info */}
              <div className="flex items-center space-x-4 mb-3 text-xs text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icon name="Smartphone" size={12} />
                  <span>{preset?.deviceType}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="MousePointer" size={12} />
                  <span>{preset?.dpi} DPI</span>
                </div>
              </div>

              {/* Sensitivity Preview */}
              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="text-center">
                  <div className="text-xs text-muted-foreground">General</div>
                  <div className="text-sm font-mono font-medium text-foreground">{preset?.sensitivity?.general}</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-muted-foreground">Red Dot</div>
                  <div className="text-sm font-mono font-medium text-foreground">{preset?.sensitivity?.redDot}</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-muted-foreground">2x Scope</div>
                  <div className="text-sm font-mono font-medium text-foreground">{preset?.sensitivity?.scope2x}</div>
                </div>
              </div>

              {/* Downloads */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <Icon name="Download" size={12} />
                  <span>{preset?.downloads?.toLocaleString()} downloads</span>
                </div>
                <Button
                  variant="outline"
                  size="xs"
                  onClick={(e) => {
                    e?.stopPropagation();
                    handlePresetClick(preset?.id);
                  }}
                >
                  Try Now
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedPresets;