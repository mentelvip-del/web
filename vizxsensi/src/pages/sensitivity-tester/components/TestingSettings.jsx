import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const TestingSettings = ({ 
  isOpen, 
  onClose, 
  settings = {}, 
  onSettingsChange,
  onResetSession 
}) => {
  const [localSettings, setLocalSettings] = useState({
    crosshairStyle: 'default',
    targetSize: 'medium',
    targetSpeed: 'normal',
    testDuration: 60,
    showStats: true,
    showCombo: true,
    soundEffects: false,
    ...settings
  });

  const crosshairOptions = [
    { value: 'default', label: 'Default Crosshair' },
    { value: 'dot', label: 'Dot' },
    { value: 'cross', label: 'Cross' }
  ];

  const targetSizeOptions = [
    { value: 'small', label: 'Small (20px)' },
    { value: 'medium', label: 'Medium (30px)' },
    { value: 'large', label: 'Large (40px)' }
  ];

  const targetSpeedOptions = [
    { value: 'slow', label: 'Slow' },
    { value: 'normal', label: 'Normal' },
    { value: 'fast', label: 'Fast' }
  ];

  const durationOptions = [
    { value: 30, label: '30 seconds' },
    { value: 60, label: '1 minute' },
    { value: 120, label: '2 minutes' },
    { value: 300, label: '5 minutes' }
  ];

  const handleSettingChange = (key, value) => {
    const newSettings = { ...localSettings, [key]: value };
    setLocalSettings(newSettings);
    if (onSettingsChange) {
      onSettingsChange(newSettings);
    }
  };

  const handleApplySettings = () => {
    if (onSettingsChange) {
      onSettingsChange(localSettings);
    }
    onClose();
  };

  const handleResetToDefaults = () => {
    const defaultSettings = {
      crosshairStyle: 'default',
      targetSize: 'medium',
      targetSpeed: 'normal',
      testDuration: 60,
      showStats: true,
      showCombo: true,
      soundEffects: false
    };
    setLocalSettings(defaultSettings);
    if (onSettingsChange) {
      onSettingsChange(defaultSettings);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-1100 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Settings Panel */}
      <div className="relative bg-card rounded-lg gaming-shadow-primary border gaming-border-subtle w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b gaming-border-subtle">
          <h2 className="text-xl font-heading font-bold text-foreground">
            Testing Settings
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-muted"
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Settings Content */}
        <div className="p-6 space-y-6">
          {/* Crosshair Settings */}
          <div>
            <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
              Crosshair
            </h3>
            <Select
              label="Crosshair Style"
              options={crosshairOptions}
              value={localSettings?.crosshairStyle}
              onChange={(value) => handleSettingChange('crosshairStyle', value)}
              className="mb-4"
            />
          </div>

          {/* Target Settings */}
          <div>
            <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
              Targets
            </h3>
            <Select
              label="Target Size"
              options={targetSizeOptions}
              value={localSettings?.targetSize}
              onChange={(value) => handleSettingChange('targetSize', value)}
              className="mb-4"
            />
            <Select
              label="Target Speed"
              options={targetSpeedOptions}
              value={localSettings?.targetSpeed}
              onChange={(value) => handleSettingChange('targetSpeed', value)}
            />
          </div>

          {/* Test Settings */}
          <div>
            <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
              Test Configuration
            </h3>
            <Select
              label="Test Duration"
              options={durationOptions}
              value={localSettings?.testDuration}
              onChange={(value) => handleSettingChange('testDuration', value)}
            />
          </div>

          {/* Display Settings */}
          <div>
            <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
              Display Options
            </h3>
            <div className="space-y-3">
              <Checkbox
                label="Show Performance Stats"
                checked={localSettings?.showStats}
                onChange={(e) => handleSettingChange('showStats', e?.target?.checked)}
              />
              <Checkbox
                label="Show Combo Multiplier"
                checked={localSettings?.showCombo}
                onChange={(e) => handleSettingChange('showCombo', e?.target?.checked)}
              />
              <Checkbox
                label="Sound Effects"
                description="Enable audio feedback for hits and misses"
                checked={localSettings?.soundEffects}
                onChange={(e) => handleSettingChange('soundEffects', e?.target?.checked)}
              />
            </div>
          </div>

          {/* Preset Configurations */}
          <div>
            <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
              Quick Presets
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const beginnerSettings = {
                    ...localSettings,
                    targetSize: 'large',
                    targetSpeed: 'slow',
                    testDuration: 60
                  };
                  setLocalSettings(beginnerSettings);
                }}
              >
                <Icon name="User" size={16} className="mr-2" />
                Beginner
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const proSettings = {
                    ...localSettings,
                    targetSize: 'small',
                    targetSpeed: 'fast',
                    testDuration: 120
                  };
                  setLocalSettings(proSettings);
                }}
              >
                <Icon name="Zap" size={16} className="mr-2" />
                Pro
              </Button>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between p-6 border-t gaming-border-subtle">
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={handleResetToDefaults}
              iconName="RotateCcw"
              iconPosition="left"
            >
              Reset
            </Button>
            {onResetSession && (
              <Button
                variant="destructive"
                onClick={() => {
                  onResetSession();
                  onClose();
                }}
                iconName="Trash2"
                iconPosition="left"
              >
                Clear Session
              </Button>
            )}
          </div>
          <div className="flex space-x-3">
            <Button
              variant="ghost"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handleApplySettings}
            >
              Apply Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestingSettings;