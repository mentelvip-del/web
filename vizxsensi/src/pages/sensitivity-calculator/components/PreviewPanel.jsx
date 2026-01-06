import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const PreviewPanel = ({ 
  sensitivities, 
  deviceSpecs,
  className = '' 
}) => {
  const [crosshairPosition, setCrosshairPosition] = useState({ x: 50, y: 50 });
  const [isAnimating, setIsAnimating] = useState(false);

  // Simulate crosshair movement based on sensitivity
  const simulateMovement = () => {
    setIsAnimating(true);
    const generalSens = sensitivities?.general || 50;
    const movementRange = (generalSens / 100) * 30; // Scale movement based on sensitivity
    
    const newX = Math.max(20, Math.min(80, crosshairPosition?.x + (Math.random() - 0.5) * movementRange));
    const newY = Math.max(20, Math.min(80, crosshairPosition?.y + (Math.random() - 0.5) * movementRange));
    
    setCrosshairPosition({ x: newX, y: newY });
    
    setTimeout(() => setIsAnimating(false), 500);
  };

  useEffect(() => {
    const interval = setInterval(simulateMovement, 2000);
    return () => clearInterval(interval);
  }, [sensitivities?.general, crosshairPosition]);

  const getSensitivityLevel = (value) => {
    if (value < 30) return { level: 'Low', color: 'text-blue-400', bg: 'bg-blue-500/10' };
    if (value < 70) return { level: 'Medium', color: 'text-green-400', bg: 'bg-green-500/10' };
    return { level: 'High', color: 'text-orange-400', bg: 'bg-orange-500/10' };
  };

  const generalLevel = getSensitivityLevel(sensitivities?.general || 50);

  return (
    <div className={`bg-card rounded-lg gaming-border-subtle border p-6 space-y-6 ${className}`}>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-heading font-semibold text-foreground">
          Live Preview
        </h2>
        <Icon name="Eye" size={24} className="text-primary" />
      </div>
      {/* Preview Area */}
      <div className="relative bg-muted rounded-lg h-64 overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-8 grid-rows-6 h-full">
            {Array.from({ length: 48 })?.map((_, i) => (
              <div key={i} className="border border-foreground/10"></div>
            ))}
          </div>
        </div>

        {/* Crosshair */}
        <div
          className={`absolute w-6 h-6 transform -translate-x-1/2 -translate-y-1/2 gaming-transition ${
            isAnimating ? 'duration-500' : 'duration-200'
          }`}
          style={{
            left: `${crosshairPosition?.x}%`,
            top: `${crosshairPosition?.y}%`
          }}
        >
          <div className="relative w-full h-full">
            {/* Crosshair lines */}
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-primary transform -translate-y-1/2"></div>
            <div className="absolute left-1/2 top-0 w-0.5 h-full bg-primary transform -translate-x-1/2"></div>
            {/* Center dot */}
            <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-primary rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
        </div>

        {/* Movement indicator */}
        <div className="absolute bottom-4 right-4">
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${generalLevel?.bg} ${generalLevel?.color}`}>
            {generalLevel?.level} Sensitivity
          </div>
        </div>
      </div>
      {/* Device Info */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Monitor" size={16} className="text-primary" />
            <span className="text-sm font-medium text-foreground">Display</span>
          </div>
          <p className="text-xs text-muted-foreground">
            {deviceSpecs?.resolution} @ {deviceSpecs?.fps}fps
          </p>
        </div>

        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Cpu" size={16} className="text-primary" />
            <span className="text-sm font-medium text-foreground">Hardware</span>
          </div>
          <p className="text-xs text-muted-foreground">
            {deviceSpecs?.ram?.toUpperCase()} • {deviceSpecs?.dpi} DPI
          </p>
        </div>
      </div>
      {/* Sensitivity Breakdown */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-foreground">Current Settings</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex justify-between">
            <span className="text-muted-foreground">General:</span>
            <span className="text-foreground font-mono">{sensitivities?.general || 50}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Red Dot:</span>
            <span className="text-foreground font-mono">{sensitivities?.redDot || 50}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">2x Scope:</span>
            <span className="text-foreground font-mono">{sensitivities?.scope2x || 50}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">4x Scope:</span>
            <span className="text-foreground font-mono">{sensitivities?.scope4x || 50}</span>
          </div>
        </div>
      </div>
      {/* Manual Test Button */}
      <button
        onClick={simulateMovement}
        className="w-full py-2 px-4 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 gaming-transition text-sm font-medium"
      >
        Test Movement
      </button>
    </div>
  );
};

export default PreviewPanel;