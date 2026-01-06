import React from 'react';
import Icon from '../../../components/AppIcon';

const SensitivitySliders = ({ 
  sensitivities, 
  onSensitivityChange,
  className = '' 
}) => {
  const sensitivityTypes = [
    {
      key: 'general',
      label: 'General Sensitivity',
      icon: 'Move',
      description: 'Overall movement and camera sensitivity',
      min: 1,
      max: 100,
      step: 1
    },
    {
      key: 'redDot',
      label: 'Red Dot Sight',
      icon: 'Target',
      description: 'Sensitivity when using red dot sights',
      min: 1,
      max: 100,
      step: 1
    },
    {
      key: 'scope2x',
      label: '2x Scope',
      icon: 'Search',
      description: 'Sensitivity for 2x scope aiming',
      min: 1,
      max: 100,
      step: 1
    },
    {
      key: 'scope4x',
      label: '4x Scope',
      icon: 'Crosshair',
      description: 'Sensitivity for 4x scope aiming',
      min: 1,
      max: 100,
      step: 1
    },
    {
      key: 'scope8x',
      label: '8x Scope',
      icon: 'Eye',
      description: 'Sensitivity for 8x scope aiming',
      min: 1,
      max: 100,
      step: 1
    },
    {
      key: 'freeCamera',
      label: 'Free Camera',
      icon: 'Camera',
      description: 'Free look camera sensitivity',
      min: 1,
      max: 100,
      step: 1
    }
  ];

  const getPercentage = (value, min, max) => {
    return Math.round(((value - min) / (max - min)) * 100);
  };

  const getRecommendationColor = (percentage) => {
    if (percentage < 30) return 'text-blue-400';
    if (percentage < 70) return 'text-green-400';
    return 'text-orange-400';
  };

  const getRecommendationText = (percentage) => {
    if (percentage < 30) return 'Low - Precise';
    if (percentage < 70) return 'Medium - Balanced';
    return 'High - Fast';
  };

  return (
    <div className={`bg-card rounded-lg gaming-border-subtle border p-6 space-y-6 ${className}`}>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-heading font-semibold text-foreground">
          Sensitivity Settings
        </h2>
        <Icon name="Sliders" size={24} className="text-primary" />
      </div>
      <div className="space-y-6">
        {sensitivityTypes?.map((type) => {
          const value = sensitivities?.[type?.key] || type?.min;
          const percentage = getPercentage(value, type?.min, type?.max);
          
          return (
            <div key={type?.key} className="space-y-3">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon name={type?.icon} size={18} className="text-primary" />
                  <span className="font-medium text-foreground">{type?.label}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-mono font-semibold text-foreground">
                    {value}
                  </span>
                  <span className={`text-sm font-medium ${getRecommendationColor(percentage)}`}>
                    {getRecommendationText(percentage)}
                  </span>
                </div>
              </div>
              {/* Slider */}
              <div className="relative">
                <input
                  type="range"
                  min={type?.min}
                  max={type?.max}
                  step={type?.step}
                  value={value}
                  onChange={(e) => onSensitivityChange(type?.key, parseInt(e?.target?.value))}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider-thumb"
                  style={{
                    background: `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${percentage}%, var(--color-muted) ${percentage}%, var(--color-muted) 100%)`
                  }}
                />
                
                {/* Tick marks */}
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>{type?.min}</span>
                  <span>50</span>
                  <span>{type?.max}</span>
                </div>
              </div>
              {/* Description */}
              <p className="text-sm text-muted-foreground">
                {type?.description}
              </p>
            </div>
          );
        })}
      </div>
      {/* Quick Actions */}
      <div className="pt-4 border-t gaming-border-subtle">
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => {
              sensitivityTypes?.forEach(type => {
                onSensitivityChange(type?.key, 25);
              });
            }}
            className="px-3 py-2 text-xs font-medium bg-blue-500/10 text-blue-400 rounded-md hover:bg-blue-500/20 gaming-transition"
          >
            Low Profile
          </button>
          <button
            onClick={() => {
              sensitivityTypes?.forEach(type => {
                onSensitivityChange(type?.key, 50);
              });
            }}
            className="px-3 py-2 text-xs font-medium bg-green-500/10 text-green-400 rounded-md hover:bg-green-500/20 gaming-transition"
          >
            Balanced
          </button>
          <button
            onClick={() => {
              sensitivityTypes?.forEach(type => {
                onSensitivityChange(type?.key, 75);
              });
            }}
            className="px-3 py-2 text-xs font-medium bg-orange-500/10 text-orange-400 rounded-md hover:bg-orange-500/20 gaming-transition"
          >
            Aggressive
          </button>
        </div>
      </div>
    </div>
  );
};

export default SensitivitySliders;