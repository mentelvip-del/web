import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const QuickRecommendationQuiz = ({ className = '' }) => {
  const [deviceType, setDeviceType] = useState('');
  const [playstyle, setPlaystyle] = useState('');
  const [dpi, setDpi] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const deviceOptions = [
    { value: '2gb', label: '2GB RAM Device' },
    { value: '4gb', label: '4GB RAM Device' },
    { value: '6gb', label: '6GB+ RAM Device' }
  ];

  const playstyleOptions = [
    { value: 'aggressive', label: 'Aggressive Player' },
    { value: 'sniper', label: 'Sniper/Long Range' },
    { value: 'balanced', label: 'Balanced Playstyle' }
  ];

  const dpiOptions = [
    { value: '400', label: '400 DPI' },
    { value: '600', label: '600 DPI' },
    { value: '800', label: '800 DPI' }
  ];

  const handleGetSettings = async () => {
    if (!deviceType || !playstyle || !dpi) {
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to calculator with pre-filled values
      const params = new URLSearchParams({
        device: deviceType,
        style: playstyle,
        dpi: dpi
      });
      window.location.href = `/sensitivity-calculator?${params?.toString()}`;
    }, 1500);
  };

  const isFormValid = deviceType && playstyle && dpi;

  return (
    <div className={`bg-card rounded-lg gaming-shadow-primary border gaming-border-subtle p-6 ${className}`}>
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="Zap" size={20} className="text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-heading font-bold text-foreground">
            Quick Recommendation Quiz
          </h2>
          <p className="text-sm text-muted-foreground">
            Get personalized sensitivity settings in seconds
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Select
          label="Device Type"
          placeholder="Select your device"
          options={deviceOptions}
          value={deviceType}
          onChange={setDeviceType}
          className="w-full"
        />

        <Select
          label="Playstyle"
          placeholder="Choose your style"
          options={playstyleOptions}
          value={playstyle}
          onChange={setPlaystyle}
          className="w-full"
        />

        <Select
          label="DPI Setting"
          placeholder="Select DPI"
          options={dpiOptions}
          value={dpi}
          onChange={setDpi}
          className="w-full"
        />
      </div>
      <Button
        variant="default"
        size="lg"
        fullWidth
        loading={isLoading}
        disabled={!isFormValid}
        onClick={handleGetSettings}
        iconName="Target"
        iconPosition="left"
        className="gaming-shadow-primary"
      >
        {isLoading ? 'Generating Settings...' : 'Get My Settings'}
      </Button>
      {isFormValid && !isLoading && (
        <div className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/20">
          <p className="text-xs text-primary font-medium">
            ✓ Ready to generate optimized settings for {deviceOptions?.find(d => d?.value === deviceType)?.label} with {playstyleOptions?.find(p => p?.value === playstyle)?.label} at {dpi} DPI
          </p>
        </div>
      )}
    </div>
  );
};

export default QuickRecommendationQuiz;