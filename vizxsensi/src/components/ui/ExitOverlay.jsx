import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const ExitOverlay = ({ onExit, showSettings = false, onToggleSettings, className = '' }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleSettingsToggle = () => {
    const newState = !isSettingsOpen;
    setIsSettingsOpen(newState);
    if (onToggleSettings) {
      onToggleSettings(newState);
    }
  };

  const handleExit = () => {
    if (onExit) {
      onExit();
    } else {
      window.history?.back();
    }
  };

  return (
    <div className={`fixed inset-0 z-1100 ${className}`}>
      {/* Exit Button */}
      <div className="absolute top-4 left-4 z-1100">
        <Button
          variant="secondary"
          size="icon"
          onClick={handleExit}
          className="bg-card/90 backdrop-blur-sm gaming-shadow-secondary hover:bg-card gaming-transition"
        >
          <Icon name="X" size={20} />
        </Button>
      </div>
      {/* Settings Toggle */}
      {showSettings && (
        <div className="absolute top-4 right-4 z-1100">
          <Button
            variant="secondary"
            size="icon"
            onClick={handleSettingsToggle}
            className={`bg-card/90 backdrop-blur-sm gaming-shadow-secondary hover:bg-card gaming-transition ${
              isSettingsOpen ? 'bg-primary text-primary-foreground' : ''
            }`}
          >
            <Icon name="Settings" size={20} />
          </Button>
        </div>
      )}
      {/* Settings Panel */}
      {showSettings && isSettingsOpen && (
        <div className="absolute top-16 right-4 w-80 max-w-[calc(100vw-2rem)] z-1100">
          <div className="bg-card/95 backdrop-blur-md rounded-lg gaming-shadow-primary border gaming-border-subtle p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-heading font-semibold text-foreground">
                Testing Settings
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleSettingsToggle}
                className="hover:bg-muted"
              >
                <Icon name="X" size={16} />
              </Button>
            </div>

            <div className="space-y-4">
              {/* Crosshair Settings */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Crosshair Style
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Default', 'Dot', 'Cross']?.map((style) => (
                    <Button
                      key={style}
                      variant="outline"
                      size="sm"
                      className="text-xs"
                    >
                      {style}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Target Settings */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Target Size
                </label>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="icon">
                    <Icon name="Minus" size={16} />
                  </Button>
                  <span className="text-sm font-mono text-foreground px-3">Medium</span>
                  <Button variant="outline" size="icon">
                    <Icon name="Plus" size={16} />
                  </Button>
                </div>
              </div>

              {/* Performance Stats */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Show Stats
                </label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded border-border" defaultChecked />
                    <span className="text-sm text-foreground">Accuracy</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded border-border" defaultChecked />
                    <span className="text-sm text-foreground">Speed</span>
                  </label>
                </div>
              </div>

              {/* Reset Button */}
              <div className="pt-2 border-t gaming-border-subtle">
                <Button
                  variant="outline"
                  fullWidth
                  iconName="RotateCcw"
                  iconPosition="left"
                >
                  Reset Session
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Gesture Hint */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-1100">
        <div className="bg-card/90 backdrop-blur-sm rounded-full px-4 py-2 gaming-shadow-secondary">
          <p className="text-xs text-muted-foreground font-caption">
            Swipe up to exit • Tap settings for options
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExitOverlay;