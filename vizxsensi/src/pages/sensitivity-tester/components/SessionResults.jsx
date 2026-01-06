import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SessionResults = ({ 
  isOpen, 
  onClose, 
  results = {}, 
  onSaveResults, 
  onShareResults,
  onRetry 
}) => {
  const [isSaving, setIsSaving] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const {
    score = 0,
    accuracy = 0,
    hits = 0,
    shots = 0,
    bestCombo = 0,
    testDuration = 60,
    averageReactionTime = 0,
    settings = {}
  } = results;

  const getPerformanceRating = () => {
    if (accuracy >= 90) return { rating: 'Exceptional', color: 'text-success', icon: 'Trophy' };
    if (accuracy >= 80) return { rating: 'Excellent', color: 'text-success', icon: 'Award' };
    if (accuracy >= 70) return { rating: 'Good', color: 'text-warning', icon: 'Target' };
    if (accuracy >= 60) return { rating: 'Average', color: 'text-warning', icon: 'TrendingUp' };
    return { rating: 'Keep Practicing', color: 'text-error', icon: 'TrendingDown' };
  };

  const getSensitivityRecommendation = () => {
    if (accuracy < 60) {
      return {
        title: 'Lower Sensitivity Recommended',
        description: 'Try reducing your sensitivity for better precision',
        icon: 'ArrowDown',
        color: 'text-primary'
      };
    }
    if (accuracy > 85 && averageReactionTime > 300) {
      return {
        title: 'Higher Sensitivity Recommended',
        description: 'You can handle faster movements for quicker reactions',
        icon: 'ArrowUp',
        color: 'text-success'
      };
    }
    return {
      title: 'Current Settings Look Good',
      description: 'Your sensitivity appears well-balanced',
      icon: 'CheckCircle',
      color: 'text-success'
    };
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Save to localStorage
      const savedResults = JSON.parse(localStorage.getItem('testerResults') || '[]');
      const newResult = {
        id: Date.now(),
        timestamp: new Date()?.toISOString(),
        ...results
      };
      savedResults?.unshift(newResult);
      
      // Keep only last 10 results
      if (savedResults?.length > 10) {
        savedResults?.splice(10);
      }
      
      localStorage.setItem('testerResults', JSON.stringify(savedResults));
      
      if (onSaveResults) {
        await onSaveResults(newResult);
      }
    } catch (error) {
      console.error('Failed to save results:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleShare = async () => {
    setIsSharing(true);
    try {
      const shareText = `🎯 Free Fire Sensitivity Test Results\n\n` +
        `📊 Score: ${score?.toLocaleString()}\n` +
        `🎯 Accuracy: ${accuracy?.toFixed(1)}%\n` +
        `💥 Best Combo: ${bestCombo}x\n` +
        `⚡ Hits: ${hits}/${shots}\n\n` +
        `Test your aim at VIZxSENSI!\n` +
        `#FreeFire #Gaming #AimTraining`;

      if (navigator.share) {
        await navigator.share({
          title: 'My Sensitivity Test Results',
          text: shareText
        });
      } else {
        // Fallback to clipboard
        await navigator.clipboard?.writeText(shareText);
        alert('Results copied to clipboard!');
      }
      
      if (onShareResults) {
        await onShareResults(results);
      }
    } catch (error) {
      console.error('Failed to share results:', error);
    } finally {
      setIsSharing(false);
    }
  };

  if (!isOpen) return null;

  const performance = getPerformanceRating();
  const recommendation = getSensitivityRecommendation();

  return (
    <div className="fixed inset-0 z-1100 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Results Panel */}
      <div className="relative bg-card rounded-lg gaming-shadow-primary border gaming-border-subtle w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="text-center p-6 border-b gaming-border-subtle">
          <div className="flex items-center justify-center mb-4">
            <div className={`p-3 rounded-full bg-primary/10 ${performance?.color}`}>
              <Icon name={performance?.icon} size={32} />
            </div>
          </div>
          <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
            Test Complete!
          </h2>
          <p className={`text-lg font-semibold ${performance?.color}`}>
            {performance?.rating}
          </p>
        </div>

        {/* Main Stats */}
        <div className="p-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-mono font-bold text-primary mb-1">
                {score?.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Score</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-mono font-bold text-success mb-1">
                {accuracy?.toFixed(1)}%
              </div>
              <div className="text-sm text-muted-foreground">Accuracy</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-mono font-bold text-warning mb-1">
                {bestCombo}x
              </div>
              <div className="text-sm text-muted-foreground">Best Combo</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-mono font-bold text-foreground mb-1">
                {hits}/{shots}
              </div>
              <div className="text-sm text-muted-foreground">Hits</div>
            </div>
          </div>

          {/* Detailed Stats */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Test Duration</span>
              <span className="text-sm font-mono text-foreground">
                {Math.floor(testDuration / 60)}:{(testDuration % 60)?.toString()?.padStart(2, '0')}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Average Reaction Time</span>
              <span className="text-sm font-mono text-foreground">
                {averageReactionTime}ms
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Targets Hit Rate</span>
              <span className="text-sm font-mono text-foreground">
                {shots > 0 ? ((hits / shots) * 100)?.toFixed(1) : 0}%
              </span>
            </div>
          </div>

          {/* Recommendation */}
          <div className="bg-muted/30 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-lg bg-card ${recommendation?.color}`}>
                <Icon name={recommendation?.icon} size={20} />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground mb-1">
                  {recommendation?.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {recommendation?.description}
                </p>
              </div>
            </div>
          </div>

          {/* Test Settings Used */}
          <div className="text-xs text-muted-foreground mb-6">
            <p>Test Settings: {settings?.crosshairStyle || 'default'} crosshair, {settings?.targetSize || 'medium'} targets</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between p-6 border-t gaming-border-subtle">
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={handleSave}
              loading={isSaving}
              iconName="Save"
              iconPosition="left"
            >
              Save
            </Button>
            <Button
              variant="outline"
              onClick={handleShare}
              loading={isSharing}
              iconName="Share"
              iconPosition="left"
            >
              Share
            </Button>
          </div>
          <div className="flex space-x-3">
            <Button
              variant="ghost"
              onClick={onClose}
            >
              Close
            </Button>
            <Button
              variant="default"
              onClick={() => {
                onClose();
                if (onRetry) onRetry();
              }}
              iconName="RotateCcw"
              iconPosition="left"
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionResults;