import React from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const DeviceSpecsPanel = ({ 
  deviceSpecs, 
  onSpecChange, 
  onApplySuggestions,
  isLoading = false 
}) => {
  const resolutionOptions = [
    { value: '720p', label: '720p (1280x720)' },
    { value: '1080p', label: '1080p (1920x1080)' }
  ];

  const fpsOptions = [
    { value: '30', label: '30 FPS' },
    { value: '60', label: '60 FPS' }
  ];

  const ramOptions = [
    { value: '2gb', label: '2GB RAM' },
    { value: '4gb', label: '4GB RAM' },
    { value: '6gb', label: '6GB+ RAM' }
  ];

  const dpiPresets = [400, 600, 800];

  const handleDpiPreset = (dpi) => {
    onSpecChange('dpi', dpi?.toString());
  };

  return (
    <div className="bg-card rounded-lg gaming-border-subtle border p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-heading font-semibold text-foreground">
          Device Specifications
        </h2>
        <Icon name="Smartphone" size={24} className="text-primary" />
      </div>
      <div className="space-y-4">
        {/* Screen Resolution */}
        <Select
          label="Screen Resolution"
          description="Your device's display resolution"
          options={resolutionOptions}
          value={deviceSpecs?.resolution}
          onChange={(value) => onSpecChange('resolution', value)}
          className="w-full"
        />

        {/* FPS Setting */}
        <Select
          label="Frame Rate (FPS)"
          description="Your game's frame rate setting"
          options={fpsOptions}
          value={deviceSpecs?.fps}
          onChange={(value) => onSpecChange('fps', value)}
          className="w-full"
        />

        {/* RAM Category */}
        <Select
          label="RAM Category"
          description="Your device's RAM capacity"
          options={ramOptions}
          value={deviceSpecs?.ram}
          onChange={(value) => onSpecChange('ram', value)}
          className="w-full"
        />

        {/* DPI Input */}
        <div className="space-y-3">
          <Input
            label="DPI Setting"
            type="number"
            description="Your mouse/touch DPI value"
            value={deviceSpecs?.dpi}
            onChange={(e) => onSpecChange('dpi', e?.target?.value)}
            placeholder="Enter DPI value"
            min="100"
            max="3200"
            className="w-full"
          />

          {/* DPI Presets */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Quick presets:</span>
            {dpiPresets?.map((dpi) => (
              <Button
                key={dpi}
                variant="outline"
                size="sm"
                onClick={() => handleDpiPreset(dpi)}
                className={`text-xs ${
                  deviceSpecs?.dpi === dpi?.toString() 
                    ? 'bg-primary text-primary-foreground border-primary' 
                    : ''
                }`}
              >
                {dpi}
              </Button>
            ))}
          </div>
        </div>

        {/* Auto-Suggestion Button */}
        <div className="pt-4 border-t gaming-border-subtle">
          <Button
            variant="default"
            fullWidth
            onClick={onApplySuggestions}
            loading={isLoading}
            iconName="Zap"
            iconPosition="left"
            className="gaming-shadow-primary"
          >
            Apply Smart Suggestions
          </Button>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Get optimized settings based on your device specs
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeviceSpecsPanel;