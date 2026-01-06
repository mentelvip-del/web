import React, { useState, useEffect } from 'react';
import NavigationHeader from '../../components/ui/NavigationHeader';
import SidebarNavigation from '../../components/ui/SidebarNavigation';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import ExitOverlay from '../../components/ui/ExitOverlay';
import TestingCanvas from './components/TestingCanvas';
import TestingHUD from './components/TestingHUD';
import TestingSettings from './components/TestingSettings';
import SessionResults from './components/SessionResults';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const SensitivityTester = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isResultsOpen, setIsResultsOpen] = useState(false);
  const [currentStats, setCurrentStats] = useState({});
  const [currentScore, setCurrentScore] = useState(0);
  const [sessionResults, setSessionResults] = useState({});
  const [testSettings, setTestSettings] = useState({
    crosshairStyle: 'default',
    targetSize: 'medium',
    targetSpeed: 'normal',
    testDuration: 60,
    showStats: true,
    showCombo: true,
    soundEffects: false
  });

  // Handle fullscreen mode
  const enterFullscreen = () => {
    setIsFullscreen(true);
    if (document.documentElement?.requestFullscreen) {
      document.documentElement?.requestFullscreen()?.catch(console.error);
    }
  };

  const exitFullscreen = () => {
    setIsFullscreen(false);
    if (document.exitFullscreen) {
      document.exitFullscreen()?.catch(console.error);
    }
  };

  // Handle test completion
  const handleTestComplete = (finalStats) => {
    const results = {
      ...finalStats,
      testDuration: testSettings?.testDuration,
      settings: testSettings,
      timestamp: new Date()?.toISOString(),
      averageReactionTime: Math.floor(Math.random() * 200) + 200 // Mock reaction time
    };
    setSessionResults(results);
    setIsResultsOpen(true);
  };

  // Handle stats updates
  const handleStatsUpdate = (stats) => {
    setCurrentStats(stats);
    
    // Check if test is complete
    if (stats?.timeLeft === 0 && stats?.shots > 0) {
      handleTestComplete(stats);
    }
  };

  const handleScoreUpdate = (score) => {
    setCurrentScore(score);
  };

  const handleSettingsChange = (newSettings) => {
    setTestSettings(newSettings);
  };

  const handleSaveResults = async (results) => {
    // Save to localStorage and potentially sync with profile
    console.log('Saving results:', results);
  };

  const handleShareResults = async (results) => {
    // Handle sharing functionality
    console.log('Sharing results:', results);
  };

  const handleResetSession = () => {
    setCurrentStats({});
    setCurrentScore(0);
    setSessionResults({});
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e?.key === 'Escape' && isFullscreen) {
        exitFullscreen();
      }
      if (e?.key === 's' && e?.ctrlKey) {
        e?.preventDefault();
        setIsSettingsOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isFullscreen]);

  // Fullscreen layout
  if (isFullscreen) {
    return (
      <div className="fixed inset-0 bg-black z-1000">
        <ExitOverlay 
          onExit={exitFullscreen}
          showSettings={true}
          onToggleSettings={setIsSettingsOpen}
        />
        <TestingCanvas
          isActive={true}
          crosshairStyle={testSettings?.crosshairStyle}
          targetSize={testSettings?.targetSize}
          onScoreUpdate={handleScoreUpdate}
          onStatsUpdate={handleStatsUpdate}
          testDuration={testSettings?.testDuration}
        />
        {testSettings?.showStats && (
          <TestingHUD
            stats={currentStats}
            isVisible={true}
            position="top-right"
            showCombo={testSettings?.showCombo}
          />
        )}
        <TestingSettings
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          settings={testSettings}
          onSettingsChange={handleSettingsChange}
          onResetSession={handleResetSession}
        />
        <SessionResults
          isOpen={isResultsOpen}
          onClose={() => setIsResultsOpen(false)}
          results={sessionResults}
          onSaveResults={handleSaveResults}
          onShareResults={handleShareResults}
          onRetry={() => {
            setIsResultsOpen(false);
            handleResetSession();
          }}
        />
      </div>
    );
  }

  // Regular layout
  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      <SidebarNavigation 
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      <main className={`pt-16 pb-20 lg:pb-0 gaming-transition ${
        isSidebarCollapsed ? 'lg:pl-16' : 'lg:pl-64'
      }`}>
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
              Sensitivity Tester
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Practice your aim and validate your Free Fire sensitivity settings with our interactive testing environment
            </p>
          </div>

          {/* Quick Stats */}
          {currentScore > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-card rounded-lg p-4 text-center gaming-shadow-secondary">
                <div className="text-2xl font-mono font-bold text-primary mb-1">
                  {currentScore?.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Current Score</div>
              </div>
              <div className="bg-card rounded-lg p-4 text-center gaming-shadow-secondary">
                <div className="text-2xl font-mono font-bold text-success mb-1">
                  {currentStats?.accuracy || '0.0'}%
                </div>
                <div className="text-sm text-muted-foreground">Accuracy</div>
              </div>
              <div className="bg-card rounded-lg p-4 text-center gaming-shadow-secondary">
                <div className="text-2xl font-mono font-bold text-warning mb-1">
                  {currentStats?.combo || 0}x
                </div>
                <div className="text-sm text-muted-foreground">Combo</div>
              </div>
              <div className="bg-card rounded-lg p-4 text-center gaming-shadow-secondary">
                <div className="text-2xl font-mono font-bold text-foreground mb-1">
                  {currentStats?.hits || 0}/{currentStats?.shots || 0}
                </div>
                <div className="text-sm text-muted-foreground">Hits</div>
              </div>
            </div>
          )}

          {/* Testing Area Preview */}
          <div className="bg-card rounded-lg gaming-shadow-primary border gaming-border-subtle overflow-hidden mb-8">
            <div className="aspect-video bg-black relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <Icon name="Target" size={32} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                    Ready to Test Your Aim?
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Enter fullscreen mode for the best testing experience
                  </p>
                  <Button
                    variant="default"
                    size="lg"
                    onClick={enterFullscreen}
                    iconName="Maximize"
                    iconPosition="left"
                    className="gaming-shadow-primary"
                  >
                    Start Fullscreen Test
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Settings Preview */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-card rounded-lg p-6 gaming-shadow-secondary border gaming-border-subtle">
              <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
                Current Settings
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Crosshair</span>
                  <span className="text-sm font-mono text-foreground capitalize">
                    {testSettings?.crosshairStyle}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Target Size</span>
                  <span className="text-sm font-mono text-foreground capitalize">
                    {testSettings?.targetSize}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Duration</span>
                  <span className="text-sm font-mono text-foreground">
                    {Math.floor(testSettings?.testDuration / 60)}:{(testSettings?.testDuration % 60)?.toString()?.padStart(2, '0')}
                  </span>
                </div>
              </div>
              <Button
                variant="outline"
                fullWidth
                onClick={() => setIsSettingsOpen(true)}
                iconName="Settings"
                iconPosition="left"
                className="mt-4"
              >
                Customize Settings
              </Button>
            </div>

            <div className="bg-card rounded-lg p-6 gaming-shadow-secondary border gaming-border-subtle">
              <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
                Quick Tips
              </h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Icon name="Target" size={16} className="text-primary mt-1" />
                  <p className="text-sm text-muted-foreground">
                    Click or tap targets as quickly and accurately as possible
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <Icon name="Zap" size={16} className="text-warning mt-1" />
                  <p className="text-sm text-muted-foreground">
                    Build combos by hitting consecutive targets for bonus points
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <Icon name="Settings" size={16} className="text-success mt-1" />
                  <p className="text-sm text-muted-foreground">
                    Adjust settings to match your Free Fire configuration
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Results */}
          <div className="bg-card rounded-lg p-6 gaming-shadow-secondary border gaming-border-subtle">
            <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
              Recent Test Results
            </h3>
            <div className="text-center py-8">
              <Icon name="BarChart3" size={48} className="text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                Complete a test to see your results and progress tracking
              </p>
            </div>
          </div>
        </div>
      </main>
      <BottomTabNavigation />
      {/* Settings Modal */}
      <TestingSettings
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={testSettings}
        onSettingsChange={handleSettingsChange}
        onResetSession={handleResetSession}
      />
      {/* Results Modal */}
      <SessionResults
        isOpen={isResultsOpen}
        onClose={() => setIsResultsOpen(false)}
        results={sessionResults}
        onSaveResults={handleSaveResults}
        onShareResults={handleShareResults}
        onRetry={() => {
          setIsResultsOpen(false);
          handleResetSession();
          enterFullscreen();
        }}
      />
    </div>
  );
};

export default SensitivityTester;