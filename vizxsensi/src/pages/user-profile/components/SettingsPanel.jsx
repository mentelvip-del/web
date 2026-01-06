import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const SettingsPanel = ({ settings, onUpdateSettings }) => {
  const [localSettings, setLocalSettings] = useState(settings);
  const [exportData, setExportData] = useState(null);

  const deviceOptions = [
    { value: '2gb', label: '2GB RAM Device' },
    { value: '4gb', label: '4GB RAM Device' },
    { value: '6gb+', label: '6GB+ RAM Device' }
  ];

  const resolutionOptions = [
    { value: '720p', label: '720p (HD)' },
    { value: '1080p', label: '1080p (Full HD)' }
  ];

  const fpsOptions = [
    { value: '30', label: '30 FPS' },
    { value: '60', label: '60 FPS' }
  ];

  const handleSettingChange = (key, value) => {
    const newSettings = { ...localSettings, [key]: value };
    setLocalSettings(newSettings);
    onUpdateSettings(newSettings);
  };

  const handleExportData = () => {
    const userData = {
      profile: JSON.parse(localStorage.getItem('userProfile') || '{}'),
      configurations: JSON.parse(localStorage.getItem('savedConfigurations') || '[]'),
      testResults: JSON.parse(localStorage.getItem('testResults') || '[]'),
      settings: localSettings,
      exportDate: new Date()?.toISOString()
    };

    const dataStr = JSON.stringify(userData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `vizxsensi-backup-${new Date()?.toISOString()?.split('T')?.[0]}.json`;
    document.body?.appendChild(link);
    link?.click();
    document.body?.removeChild(link);
    URL.revokeObjectURL(url);

    setExportData(userData);
  };

  const handleImportData = (event) => {
    const file = event?.target?.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e?.target?.result);
        
        if (importedData?.profile) {
          localStorage.setItem('userProfile', JSON.stringify(importedData?.profile));
        }
        if (importedData?.configurations) {
          localStorage.setItem('savedConfigurations', JSON.stringify(importedData?.configurations));
        }
        if (importedData?.testResults) {
          localStorage.setItem('testResults', JSON.stringify(importedData?.testResults));
        }
        if (importedData?.settings) {
          setLocalSettings(importedData?.settings);
          onUpdateSettings(importedData?.settings);
        }

        alert('Data imported successfully! Please refresh the page to see changes.');
      } catch (error) {
        alert('Error importing data. Please check the file format.');
      }
    };
    reader?.readAsText(file);
  };

  const handleClearData = () => {
    if (confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      localStorage.removeItem('userProfile');
      localStorage.removeItem('savedConfigurations');
      localStorage.removeItem('testResults');
      localStorage.removeItem('userSettings');
      alert('All data cleared successfully! Please refresh the page.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Default Device Preferences */}
      <div className="bg-card rounded-lg gaming-border-subtle border p-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
          Default Device Preferences
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div>
            <Select
              label="Default Device Type"
              options={deviceOptions}
              value={localSettings?.defaultDevice}
              onChange={(value) => handleSettingChange('defaultDevice', value)}
            />
          </div>
          <div>
            <Select
              label="Screen Resolution"
              options={resolutionOptions}
              value={localSettings?.defaultResolution}
              onChange={(value) => handleSettingChange('defaultResolution', value)}
            />
          </div>
          <div>
            <Select
              label="Target FPS"
              options={fpsOptions}
              value={localSettings?.defaultFPS}
              onChange={(value) => handleSettingChange('defaultFPS', value)}
            />
          </div>
        </div>
      </div>
      {/* Notification Preferences */}
      <div className="bg-card rounded-lg gaming-border-subtle border p-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
          Notification Preferences
        </h3>
        
        <div className="space-y-4">
          <Checkbox
            label="New Featured Presets"
            description="Get notified when new featured presets are available"
            checked={localSettings?.notifications?.newPresets}
            onChange={(e) => handleSettingChange('notifications', {
              ...localSettings?.notifications,
              newPresets: e?.target?.checked
            })}
          />
          <Checkbox
            label="Community Updates"
            description="Receive updates about community shared configurations"
            checked={localSettings?.notifications?.communityUpdates}
            onChange={(e) => handleSettingChange('notifications', {
              ...localSettings?.notifications,
              communityUpdates: e?.target?.checked
            })}
          />
          <Checkbox
            label="Performance Tips"
            description="Get personalized tips based on your testing results"
            checked={localSettings?.notifications?.performanceTips}
            onChange={(e) => handleSettingChange('notifications', {
              ...localSettings?.notifications,
              performanceTips: e?.target?.checked
            })}
          />
        </div>
      </div>
      {/* Privacy Controls */}
      <div className="bg-card rounded-lg gaming-border-subtle border p-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
          Privacy Controls
        </h3>
        
        <div className="space-y-4">
          <Checkbox
            label="Public Profile"
            description="Allow other users to view your shared presets and stats"
            checked={localSettings?.privacy?.publicProfile}
            onChange={(e) => handleSettingChange('privacy', {
              ...localSettings?.privacy,
              publicProfile: e?.target?.checked
            })}
          />
          <Checkbox
            label="Share Test Results"
            description="Include your test results in community leaderboards"
            checked={localSettings?.privacy?.shareTestResults}
            onChange={(e) => handleSettingChange('privacy', {
              ...localSettings?.privacy,
              shareTestResults: e?.target?.checked
            })}
          />
          <Checkbox
            label="Analytics"
            description="Help improve the app by sharing anonymous usage data"
            checked={localSettings?.privacy?.analytics}
            onChange={(e) => handleSettingChange('privacy', {
              ...localSettings?.privacy,
              analytics: e?.target?.checked
            })}
          />
        </div>
      </div>
      {/* Data Management */}
      <div className="bg-card rounded-lg gaming-border-subtle border p-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
          Data Management
        </h3>
        
        <div className="space-y-4">
          <div className="flex flex-col lg:flex-row gap-3">
            <Button
              variant="outline"
              onClick={handleExportData}
              iconName="Download"
              iconPosition="left"
            >
              Export Data
            </Button>
            
            <div className="relative">
              <input
                type="file"
                accept=".json"
                onChange={handleImportData}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Button
                variant="outline"
                iconName="Upload"
                iconPosition="left"
              >
                Import Data
              </Button>
            </div>
            
            <Button
              variant="destructive"
              onClick={handleClearData}
              iconName="Trash2"
              iconPosition="left"
            >
              Clear All Data
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground">
            Export your data to backup your configurations and settings. Import to restore from a previous backup.
          </p>
        </div>

        {/* Storage Usage */}
        <div className="mt-6 pt-4 border-t gaming-border-subtle">
          <h4 className="font-medium text-foreground mb-3">Storage Usage</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Saved Configurations:</span>
              <span className="text-foreground">
                {JSON.parse(localStorage.getItem('savedConfigurations') || '[]')?.length} items
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Test Results:</span>
              <span className="text-foreground">
                {JSON.parse(localStorage.getItem('testResults') || '[]')?.length} sessions
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total Storage:</span>
              <span className="text-foreground">
                {Math.round((JSON.stringify(localStorage)?.length / 1024))} KB
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* About */}
      <div className="bg-card rounded-lg gaming-border-subtle border p-6">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
          About VIZxSENSI
        </h3>
        
        <div className="space-y-3 text-sm text-muted-foreground">
          <p>
            VIZxSENSI is a Free Fire sensitivity optimization tool designed to help players 
            improve their aiming accuracy and gameplay performance.
          </p>
          <div className="flex items-center space-x-4">
            <span>Version: 1.0.0</span>
            <span>•</span>
            <span>Build: 2025.08.29</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Instagram" size={16} />
            <span>Follow us: @vizxsensi</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;