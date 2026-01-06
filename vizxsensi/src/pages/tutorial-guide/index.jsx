import React, { useState, useEffect } from 'react';
import NavigationHeader from '../../components/ui/NavigationHeader';
import SidebarNavigation from '../../components/ui/SidebarNavigation';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import TutorialSection from './components/TutorialSection';
import TutorialNavigation from './components/TutorialNavigation';
import QuickActions from './components/QuickActions';
import DeviceGallery from './components/DeviceGallery';
import FAQSection from './components/FAQSection';

const TutorialGuide = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [expandedSections, setExpandedSections] = useState(new Set(['getting-started']));
  const [activeSection, setActiveSection] = useState('getting-started');
  const [searchResults, setSearchResults] = useState(null);

  // Mock tutorial data
  const tutorialSections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      description: 'Basic setup and first steps',
      icon: 'Play',
      completed: false,
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      steps: [
        {
          title: 'Download Free Fire',
          description: 'Ensure you have the latest version of Free Fire installed on your device from Google Play Store or App Store.',
          image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=800',
          tip: 'Always keep your game updated for the best performance and latest features.'
        },
        {
          title: 'Create Your Account',
          description: 'Set up your Free Fire account and complete the tutorial to unlock sensitivity settings.',
          values: [
            { label: 'Recommended Username Format', value: 'YourName_FF' }
          ]
        },
        {
          title: 'Access Settings Menu',
          description: 'Navigate to the main menu and tap on the settings icon (gear symbol) in the top-right corner.',
          warning: 'Make sure you are not in a match when accessing settings to avoid interruptions.'
        }
      ]
    },
    {
      id: 'device-setup',
      title: 'Device Setup',
      description: 'Configure your device for optimal performance',
      icon: 'Smartphone',
      completed: false,
      steps: [
        {
          title: 'Check Device Specifications',
          description: 'Identify your device RAM, processor, and screen resolution to choose appropriate sensitivity settings.',
          values: [
            { label: 'Low-end devices (2GB RAM)', value: '720p, 30 FPS' },
            { label: 'Mid-range devices (4GB RAM)', value: '1080p, 45 FPS' },
            { label: 'High-end devices (6GB+ RAM)', value: '1080p, 60 FPS' }
          ]
        },
        {
          title: 'Optimize Game Graphics',
          description: 'Set graphics quality based on your device capabilities for smooth gameplay.',
          image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800',
          values: [
            { label: 'Graphics Quality', value: 'Smooth' },
            { label: 'Frame Rate', value: 'Ultra' },
            { label: 'Auto-adjust Graphics', value: 'OFF' }
          ]
        },
        {
          title: 'Enable High Frame Rate',
          description: 'Turn on high frame rate mode if your device supports it for better responsiveness.',
          tip: 'Higher frame rates consume more battery but provide smoother gameplay experience.'
        }
      ]
    },
    {
      id: 'in-game-application',
      title: 'In-Game Application',
      description: 'Apply sensitivity settings in Free Fire',
      icon: 'Target',
      completed: false,
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      steps: [
        {
          title: 'Navigate to Sensitivity Settings',
          description: 'In the settings menu, tap on "Controls" and then select "Sensitivity" to access all sensitivity options.',
          image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=800'
        },
        {
          title: 'Configure General Sensitivity',
          description: 'Set your general sensitivity which affects overall camera movement and aiming speed.',
          values: [
            { label: 'General Sensitivity', value: '95' },
            { label: 'Red Dot Sight', value: '85' },
            { label: '2x Scope', value: '75' },
            { label: '4x Scope', value: '65' },
            { label: '8x Scope', value: '55' }
          ],
          warning: 'Start with these values and adjust based on your comfort level and playstyle.'
        },
        {
          title: 'Test Your Settings',
          description: 'Enter training mode to test your new sensitivity settings with different weapons and scopes.',
          tip: 'Spend at least 10-15 minutes in training mode to get familiar with new settings before playing ranked matches.'
        }
      ]
    },
    {
      id: 'advanced-tips',
      title: 'Advanced Tips',
      description: 'Pro techniques and optimization',
      icon: 'Zap',
      completed: false,
      steps: [
        {
          title: 'Gyroscope Settings',
          description: 'Enable and configure gyroscope for enhanced aiming precision using device tilt movements.',
          values: [
            { label: 'Gyroscope', value: 'ON' },
            { label: 'No Scope', value: '200' },
            { label: 'Red Dot', value: '180' },
            { label: '2x Scope', value: '160' },
            { label: '4x Scope', value: '140' },
            { label: '8x Scope', value: '120' }
          ]
        },
        {
          title: 'Fire Button Customization',
          description: 'Optimize fire button placement and sensitivity for faster reaction times.',
          image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800',
          tip: 'Use multiple fire buttons for different situations - hip fire, ADS, and scope firing.'
        },
        {
          title: 'Advanced Techniques',
          description: 'Master advanced aiming techniques like drag scoping, quick scoping, and pre-aiming.',
          warning: 'These techniques require practice and muscle memory development. Be patient with the learning process.'
        }
      ]
    }
  ];

  // Mock device gallery data
  const deviceGalleryData = [
    {
      id: 'low-end',
      name: '2GB RAM',
      icon: 'Smartphone',
      specs: {
        ram: '2GB',
        resolution: '720p',
        fps: '30 FPS',
        dpi: '400'
      },
      images: [
        {
          url: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=800',
          title: 'Settings Menu Navigation',
          caption: 'Navigate to Settings > Controls > Sensitivity for low-end devices'
        },
        {
          url: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800',
          title: 'Sensitivity Configuration',
          caption: 'Recommended sensitivity values for smooth gameplay on 2GB RAM devices'
        }
      ]
    },
    {
      id: 'mid-range',
      name: '4GB RAM',
      icon: 'Tablet',
      specs: {
        ram: '4GB',
        resolution: '1080p',
        fps: '45 FPS',
        dpi: '600'
      },
      images: [
        {
          url: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800',
          title: 'Graphics Settings',
          caption: 'Optimal graphics configuration for mid-range devices'
        },
        {
          url: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=800',
          title: 'Advanced Controls',
          caption: 'Enhanced control layout for better performance'
        }
      ]
    },
    {
      id: 'high-end',
      name: '6GB+ RAM',
      icon: 'Monitor',
      specs: {
        ram: '6GB+',
        resolution: '1080p',
        fps: '60 FPS',
        dpi: '800'
      },
      images: [
        {
          url: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=800',
          title: 'Ultra Settings',
          caption: 'Maximum performance settings for high-end devices'
        },
        {
          url: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800',
          title: 'Pro Configuration',
          caption: 'Professional-level sensitivity and control setup'
        }
      ]
    }
  ];

  // Mock FAQ data
  const faqData = [
    {
      id: 'faq-1',
      category: 'technical',
      question: 'Why is my aim still inconsistent after applying the sensitivity settings?',
      answer: `Inconsistent aim can be caused by several factors:\n\n1. Device Performance: Ensure your device is running smoothly with sufficient RAM and storage space.\n2. Practice Time: New sensitivity settings require muscle memory development, which takes 3-5 days of regular practice.\n3. Grip and Posture: Maintain consistent hand positioning and device grip.\n4. Screen Cleanliness: Keep your screen clean for smooth finger movement.\n5. Network Lag: High ping can affect aim responsiveness.\n\nRecommendation: Stick with the settings for at least a week before making adjustments.`,
      tags: ['sensitivity', 'aiming', 'performance'],
      relatedLinks: [
        { title: 'Device Optimization Guide', url: '#device-setup' },
        { title: 'Practice Routines', url: '#advanced-tips' }
      ]
    },
    {
      id: 'faq-2',
      category: 'gameplay',
      question: 'Should I use different sensitivity for different weapons?',
      answer: `Yes, different weapons benefit from different sensitivity settings:\n\nAssault Rifles (AK, M4A1): Medium sensitivity (75-85) for balanced control\nSMGs (MP40, Thompson): Higher sensitivity (85-95) for close combat\nSniper Rifles (AWM, Kar98k): Lower sensitivity (55-65) for precision\nShotguns: Higher sensitivity (90-100) for quick target acquisition\n\nThe key is finding the right balance between speed and accuracy for each weapon type.`,
      tags: ['weapons', 'sensitivity', 'strategy'],
      relatedLinks: [
        { title: 'Weapon-Specific Settings', url: '#in-game-application' }
      ]
    },
    {
      id: 'faq-3',
      category: 'troubleshooting',
      question: 'The gyroscope feature is not working properly. How do I fix it?',
      answer: `Gyroscope issues can be resolved by:\n\n1. Device Calibration: Go to your device settings and calibrate the gyroscope sensor\n2. Game Settings: Ensure gyroscope is enabled in Free Fire settings\n3. Sensitivity Values: Start with lower gyroscope sensitivity (100-150) and gradually increase\n4. Device Position: Hold your device at a comfortable angle (usually 30-45 degrees)\n5. Practice: Gyroscope requires significant practice to master\n\nIf issues persist, try restarting the game or your device.`,
      tags: ['gyroscope', 'troubleshooting', 'device'],
      relatedLinks: [
        { title: 'Advanced Gyroscope Setup', url: '#advanced-tips' }
      ]
    },
    {
      id: 'faq-4',
      category: 'technical',
      question: 'How often should I update my sensitivity settings?',
      answer: `Sensitivity settings should be updated based on:\n\nDevice Changes: When you get a new device or major software updates\nSkill Development: As you improve, you might prefer faster or more precise settings\nMeta Changes: When Free Fire updates affect weapon behavior\nComfort Level: If you experience hand fatigue or discomfort\n\nGeneral rule: Don't change settings more than once every 2 weeks to allow proper adaptation.`,
      tags: ['settings', 'updates', 'improvement'],
      relatedLinks: []
    }
  ];

  const handleSectionToggle = (sectionId) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded?.has(sectionId)) {
      newExpanded?.delete(sectionId);
    } else {
      newExpanded?.add(sectionId);
    }
    setExpandedSections(newExpanded);
    setActiveSection(sectionId);
  };

  const handleSearch = (query) => {
    if (!query?.trim()) {
      setSearchResults(null);
      return;
    }

    const results = [];
    tutorialSections?.forEach(section => {
      const matchingSteps = section?.steps?.filter(step =>
        step?.title?.toLowerCase()?.includes(query?.toLowerCase()) ||
        step?.description?.toLowerCase()?.includes(query?.toLowerCase())
      );
      
      if (matchingSteps?.length > 0 || 
          section?.title?.toLowerCase()?.includes(query?.toLowerCase()) ||
          section?.description?.toLowerCase()?.includes(query?.toLowerCase())) {
        results?.push({
          section,
          matchingSteps: matchingSteps?.length > 0 ? matchingSteps : section?.steps
        });
      }
    });

    setSearchResults(results);
  };

  const handleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem('tutorial_bookmarks') || '[]');
    const newBookmark = {
      id: activeSection,
      title: tutorialSections?.find(s => s?.id === activeSection)?.title,
      timestamp: new Date()?.toISOString()
    };
    
    if (!bookmarks?.find(b => b?.id === activeSection)) {
      bookmarks?.push(newBookmark);
      localStorage.setItem('tutorial_bookmarks', JSON.stringify(bookmarks));
    }
  };

  const handleShare = () => {
    const shareData = {
      title: 'VIZxSENSI Tutorial Guide',
      text: 'Check out this comprehensive Free Fire sensitivity guide!',
      url: window.location?.href
    };

    if (navigator.share) {
      navigator.share(shareData);
    } else {
      navigator.clipboard?.writeText(window.location?.href);
    }
  };

  useEffect(() => {
    // Auto-expand first section on load
    if (tutorialSections?.length > 0) {
      setExpandedSections(new Set([tutorialSections[0].id]));
      setActiveSection(tutorialSections?.[0]?.id);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      <SidebarNavigation 
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      <main className={`pt-16 pb-20 lg:pb-8 gaming-transition ${
        isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
      }`}>
        <div className="container mx-auto px-4 lg:px-6 py-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
              <span>Home</span>
              <Icon name="ChevronRight" size={16} />
              <span className="text-foreground">Tutorial Guide</span>
            </div>
            
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-2">
                  Tutorial Guide
                </h1>
                <p className="text-muted-foreground max-w-2xl">
                  Master Free Fire sensitivity optimization with our comprehensive step-by-step tutorials, 
                  device-specific guides, and pro tips from the gaming community.
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  iconName="Download"
                  iconPosition="left"
                >
                  Download Guide
                </Button>
                <Button
                  variant="default"
                  iconName="Play"
                  iconPosition="left"
                  className="gaming-shadow-primary"
                >
                  Watch Video
                </Button>
              </div>
            </div>
          </div>

          {/* Search Results */}
          {searchResults && (
            <div className="mb-8">
              <div className="bg-card rounded-lg border gaming-border-subtle gaming-shadow-secondary p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-heading font-semibold text-foreground">
                    Search Results ({searchResults?.length})
                  </h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSearchResults(null)}
                  >
                    <Icon name="X" size={20} />
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {searchResults?.map((result, index) => (
                    <div key={index} className="border gaming-border-subtle rounded-lg p-4">
                      <h3 className="font-medium text-foreground mb-2">{result?.section?.title}</h3>
                      <div className="space-y-2">
                        {result?.matchingSteps?.slice(0, 3)?.map((step, stepIndex) => (
                          <div key={stepIndex} className="text-sm text-muted-foreground">
                            • {step?.title}
                          </div>
                        ))}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setActiveSection(result?.section?.id);
                          setExpandedSections(new Set([result.section.id]));
                          setSearchResults(null);
                        }}
                        className="mt-2"
                      >
                        Go to Section
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Desktop Sidebar Navigation */}
            <div className="hidden lg:block lg:col-span-1 space-y-6">
              <TutorialNavigation
                sections={tutorialSections}
                activeSection={activeSection}
                onSectionClick={(sectionId) => {
                  setActiveSection(sectionId);
                  setExpandedSections(new Set([sectionId]));
                }}
              />
              
              <QuickActions
                onSearch={handleSearch}
                onBookmark={handleBookmark}
                onShare={handleShare}
              />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Tutorial Sections */}
              <div className="space-y-4">
                {tutorialSections?.map((section, index) => (
                  <TutorialSection
                    key={section?.id}
                    section={section}
                    isExpanded={expandedSections?.has(section?.id)}
                    onToggle={handleSectionToggle}
                    sectionIndex={index}
                  />
                ))}
              </div>

              {/* Device Gallery */}
              <DeviceGallery devices={deviceGalleryData} />

              {/* FAQ Section */}
              <FAQSection faqs={faqData} />

              {/* Mobile Quick Actions */}
              <div className="lg:hidden">
                <QuickActions
                  onSearch={handleSearch}
                  onBookmark={handleBookmark}
                  onShare={handleShare}
                />
              </div>
            </div>
          </div>

          {/* Progress Summary */}
          <div className="mt-12 bg-card rounded-lg border gaming-border-subtle gaming-shadow-secondary p-6">
            <div className="text-center">
              <Icon name="Trophy" size={48} className="text-primary mx-auto mb-4" />
              <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
                Complete Your Learning Journey
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Follow our comprehensive tutorial guide to master Free Fire sensitivity optimization. 
                Join thousands of players who have improved their gameplay with VIZxSENSI.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  variant="default"
                  iconName="Calculator"
                  iconPosition="left"
                  onClick={() => window.location.href = '/sensitivity-calculator'}
                  className="gaming-shadow-primary"
                >
                  Try Calculator
                </Button>
                <Button
                  variant="outline"
                  iconName="Target"
                  iconPosition="left"
                  onClick={() => window.location.href = '/sensitivity-tester'}
                >
                  Practice Now
                </Button>
                <Button
                  variant="ghost"
                  iconName="Instagram"
                  iconPosition="left"
                >
                  Follow @vizxsensi
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <BottomTabNavigation />
    </div>
  );
};

export default TutorialGuide;