import React, { useState, useEffect } from 'react';
import NavigationHeader from '../../components/ui/NavigationHeader';
import SidebarNavigation from '../../components/ui/SidebarNavigation';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import BreadcrumbNavigation from './components/BreadcrumbNavigation';
import DeviceSpecsPanel from './components/DeviceSpecsPanel';
import SensitivitySliders from './components/SensitivitySliders';
import PreviewPanel from './components/PreviewPanel';
import ActionButtons from './components/ActionButtons';
import Icon from '../../components/AppIcon';

const SensitivityCalculator = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [deviceSpecs, setDeviceSpecs] = useState({
    resolution: '1080p',
    fps: '60',
    ram: '4gb',
    dpi: '600'
  });

  const [sensitivities, setSensitivities] = useState({
    general: 50,
    redDot: 45,
    scope2x: 40,
    scope4x: 35,
    scope8x: 30,
    freeCamera: 55
  });

  // Load saved configuration on mount
  useEffect(() => {
    const savedConfig = localStorage.getItem('current_sensitivity_config');
    if (savedConfig) {
      try {
        const config = JSON.parse(savedConfig);
        if (config?.sensitivities) setSensitivities(config?.sensitivities);
        if (config?.deviceSpecs) setDeviceSpecs(config?.deviceSpecs);
      } catch (error) {
        console.error('Error loading saved configuration:', error);
      }
    }

    // Check for import parameter in URL
    const urlParams = new URLSearchParams(window.location.search);
    const importData = urlParams?.get('import');
    if (importData) {
      try {
        const decoded = JSON.parse(atob(importData));
        if (decoded?.s) setSensitivities(decoded?.s);
        if (decoded?.d) setDeviceSpecs(decoded?.d);
      } catch (error) {
        console.error('Error importing configuration:', error);
      }
    }
  }, []);

  // Auto-save current configuration
  useEffect(() => {
    const config = { sensitivities, deviceSpecs };
    localStorage.setItem('current_sensitivity_config', JSON.stringify(config));
  }, [sensitivities, deviceSpecs]);

  const handleSpecChange = (key, value) => {
    setDeviceSpecs(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSensitivityChange = (key, value) => {
    setSensitivities(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleApplySuggestions = async () => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Smart suggestions based on device specs
    let baseSensitivity = 50;
    
    // Adjust based on RAM
    if (deviceSpecs?.ram === '2gb') baseSensitivity = 35;
    else if (deviceSpecs?.ram === '6gb') baseSensitivity = 65;
    
    // Adjust based on FPS
    if (deviceSpecs?.fps === '30') baseSensitivity -= 5;
    else if (deviceSpecs?.fps === '60') baseSensitivity += 5;
    
    // Adjust based on DPI
    const dpi = parseInt(deviceSpecs?.dpi) || 600;
    if (dpi < 500) baseSensitivity += 10;
    else if (dpi > 700) baseSensitivity -= 10;
    
    // Adjust based on resolution
    if (deviceSpecs?.resolution === '720p') baseSensitivity += 5;
    
    // Generate optimized sensitivity values
    const optimizedSensitivities = {
      general: Math.max(1, Math.min(100, baseSensitivity)),
      redDot: Math.max(1, Math.min(100, baseSensitivity - 5)),
      scope2x: Math.max(1, Math.min(100, baseSensitivity - 10)),
      scope4x: Math.max(1, Math.min(100, baseSensitivity - 15)),
      scope8x: Math.max(1, Math.min(100, baseSensitivity - 20)),
      freeCamera: Math.max(1, Math.min(100, baseSensitivity + 5))
    };
    
    setSensitivities(optimizedSensitivities);
    setIsLoading(false);
  };

  const handleSaveConfiguration = (config) => {
    console.log('Configuration saved:', config);
  };

  const handleExportSettings = (data) => {
    console.log('Settings exported:', data);
  };

  const handleGenerateQR = (qrData) => {
    console.log('QR code generated:', qrData);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <NavigationHeader />
      <SidebarNavigation 
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <BottomTabNavigation />

      {/* Main Content */}
      <main className={`pt-16 pb-20 lg:pb-8 gaming-transition ${
        sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Section */}
          <div className="mb-8">
            <BreadcrumbNavigation className="mb-4" />
            
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
                  Sensitivity Calculator
                </h1>
                <p className="text-muted-foreground">
                  Generate custom Free Fire sensitivity configurations based on your device specifications
                </p>
              </div>
              
              <div className="hidden lg:flex items-center space-x-2 bg-card rounded-lg p-3 gaming-border-subtle border">
                <Icon name="Zap" size={20} className="text-primary" />
                <span className="text-sm font-medium text-foreground">Smart Calculator</span>
              </div>
            </div>
          </div>

          {/* Calculator Interface */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Panel - Input Controls */}
            <div className="space-y-6">
              {/* Device Specifications */}
              <DeviceSpecsPanel
                deviceSpecs={deviceSpecs}
                onSpecChange={handleSpecChange}
                onApplySuggestions={handleApplySuggestions}
                isLoading={isLoading}
              />

              {/* Sensitivity Sliders */}
              <SensitivitySliders
                sensitivities={sensitivities}
                onSensitivityChange={handleSensitivityChange}
              />

              {/* Action Buttons - Mobile */}
              <div className="lg:hidden">
                <ActionButtons
                  sensitivities={sensitivities}
                  deviceSpecs={deviceSpecs}
                  onSave={handleSaveConfiguration}
                  onExport={handleExportSettings}
                  onGenerateQR={handleGenerateQR}
                />
              </div>
            </div>

            {/* Right Panel - Preview & Actions */}
            <div className="space-y-6">
              {/* Live Preview */}
              <PreviewPanel
                sensitivities={sensitivities}
                deviceSpecs={deviceSpecs}
              />

              {/* Action Buttons - Desktop */}
              <div className="hidden lg:block">
                <ActionButtons
                  sensitivities={sensitivities}
                  deviceSpecs={deviceSpecs}
                  onSave={handleSaveConfiguration}
                  onExport={handleExportSettings}
                  onGenerateQR={handleGenerateQR}
                />
              </div>

              {/* Tips Card */}
              <div className="bg-card rounded-lg gaming-border-subtle border p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Icon name="Lightbulb" size={20} className="text-primary" />
                  <h3 className="font-heading font-semibold text-foreground">Pro Tips</h3>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start space-x-2">
                    <Icon name="Check" size={14} className="text-primary mt-0.5 flex-shrink-0" />
                    <span>Start with lower sensitivity for better accuracy</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Icon name="Check" size={14} className="text-primary mt-0.5 flex-shrink-0" />
                    <span>Adjust scope sensitivities based on your playstyle</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Icon name="Check" size={14} className="text-primary mt-0.5 flex-shrink-0" />
                    <span>Test settings in training mode before ranked matches</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Icon name="Check" size={14} className="text-primary mt-0.5 flex-shrink-0" />
                    <span>Save multiple configurations for different situations</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Footer Info */}
          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground">
              Optimized for Free Fire • Generated by VIZxSENSI Calculator • 
              <span className="text-primary ml-1">@vizxsensi</span>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SensitivityCalculator;