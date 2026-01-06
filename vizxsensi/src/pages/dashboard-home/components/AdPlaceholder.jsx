import React from 'react';
import Icon from '../../../components/AppIcon';

const AdPlaceholder = ({ size = 'banner', className = '' }) => {
  const adSizes = {
    banner: {
      height: 'h-24',
      width: 'w-full',
      text: 'Advertisement Banner'
    },
    square: {
      height: 'h-64',
      width: 'w-full',
      text: 'Advertisement'
    },
    sidebar: {
      height: 'h-48',
      width: 'w-full',
      text: 'Sponsored Content'
    }
  };

  const currentSize = adSizes?.[size] || adSizes?.banner;

  return (
    <div className={`${currentSize?.height} ${currentSize?.width} ${className}`}>
      <div className="w-full h-full bg-muted/50 border-2 border-dashed border-muted-foreground/20 rounded-lg flex flex-col items-center justify-center gaming-transition hover:border-muted-foreground/40">
        <Icon name="Megaphone" size={24} className="text-muted-foreground/60 mb-2" />
        <span className="text-sm font-medium text-muted-foreground/80">
          {currentSize?.text}
        </span>
        <span className="text-xs text-muted-foreground/60 mt-1">
          {size === 'banner' ? '728x90' : size === 'square' ? '300x250' : '160x600'}
        </span>
      </div>
    </div>
  );
};

export default AdPlaceholder;