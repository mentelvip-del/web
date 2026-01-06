import React from 'react';
import Icon from '../../../components/AppIcon';

const TestingHUD = ({ 
  stats = {}, 
  isVisible = true, 
  position = 'top-right',
  showCombo = true 
}) => {
  const {
    accuracy = '0.0',
    hits = 0,
    shots = 0,
    score = 0,
    combo = 0,
    timeLeft = 0
  } = stats;

  if (!isVisible) return null;

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const getPositionClasses = () => {
    switch (position) {
      case 'top-left':
        return 'top-4 left-4';
      case 'top-right':
        return 'top-4 right-4';
      case 'bottom-left':
        return 'bottom-4 left-4';
      case 'bottom-right':
        return 'bottom-4 right-4';
      default:
        return 'top-4 right-4';
    }
  };

  return (
    <div className={`fixed ${getPositionClasses()} z-50 pointer-events-none`}>
      <div className="bg-card/90 backdrop-blur-sm rounded-lg gaming-shadow-secondary border gaming-border-subtle p-4 min-w-[200px]">
        {/* Timer */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} className="text-primary" />
            <span className="text-sm font-mono text-foreground">Time</span>
          </div>
          <span className="text-lg font-mono font-bold text-primary">
            {formatTime(timeLeft)}
          </span>
        </div>

        {/* Score */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Icon name="Trophy" size={16} className="text-warning" />
            <span className="text-sm font-mono text-foreground">Score</span>
          </div>
          <span className="text-lg font-mono font-bold text-warning">
            {score?.toLocaleString()}
          </span>
        </div>

        {/* Accuracy */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Icon name="Target" size={16} className="text-success" />
            <span className="text-sm font-mono text-foreground">Accuracy</span>
          </div>
          <span className="text-lg font-mono font-bold text-success">
            {accuracy}%
          </span>
        </div>

        {/* Hits/Shots */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Icon name="Crosshair" size={16} className="text-foreground" />
            <span className="text-sm font-mono text-foreground">Hits</span>
          </div>
          <span className="text-sm font-mono text-foreground">
            {hits}/{shots}
          </span>
        </div>

        {/* Combo */}
        {showCombo && combo > 0 && (
          <div className="border-t gaming-border-subtle pt-3 mt-3">
            <div className="flex items-center justify-center space-x-2">
              <Icon name="Zap" size={16} className="text-primary" />
              <span className="text-sm font-mono text-foreground">Combo</span>
              <span className="text-xl font-mono font-bold text-primary">
                {combo}x
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2 mt-2">
              <div 
                className="bg-primary h-2 rounded-full gaming-transition"
                style={{ width: `${Math.min(combo * 20, 100)}%` }}
              />
            </div>
          </div>
        )}

        {/* Performance Indicator */}
        <div className="border-t gaming-border-subtle pt-3 mt-3">
          <div className="flex items-center justify-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${
              parseFloat(accuracy) >= 80 ? 'bg-success' :
              parseFloat(accuracy) >= 60 ? 'bg-warning' : 'bg-error'
            }`} />
            <span className="text-xs text-muted-foreground">
              {parseFloat(accuracy) >= 80 ? 'Excellent' :
               parseFloat(accuracy) >= 60 ? 'Good' : 'Keep Practicing'}
            </span>
          </div>
        </div>
      </div>
      {/* Combo Flash Effect */}
      {showCombo && combo > 1 && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 pointer-events-none">
          <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-bold animate-bounce">
            {combo}x COMBO!
          </div>
        </div>
      )}
    </div>
  );
};

export default TestingHUD;