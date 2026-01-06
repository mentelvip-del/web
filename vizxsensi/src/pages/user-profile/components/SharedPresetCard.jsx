import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SharedPresetCard = ({ preset, onUnshare, onViewStats }) => {
  const [showStats, setShowStats] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const getEngagementColor = (count) => {
    if (count >= 100) return 'text-success';
    if (count >= 50) return 'text-warning';
    return 'text-muted-foreground';
  };

  const handleCopyLink = () => {
    const shareLink = `${window.location?.origin}/preset/${preset?.id}`;
    navigator.clipboard?.writeText(shareLink);
    // You could add a toast notification here
  };

  const handleInstagramShare = () => {
    const shareText = `🎯 New Free Fire sensitivity preset: "${preset?.name}"\n\n📱 Device: ${preset?.deviceType}\n🎮 Style: ${preset?.playstyle}\n⚡ General: ${preset?.settings?.general}\n🔴 Red Dot: ${preset?.settings?.redDot}\n🔍 2x Scope: ${preset?.settings?.scope2x}\n🎯 4x Scope: ${preset?.settings?.scope4x}\n\n#FreeFire #VIZxSENSI #GamingTips`;
    
    const instagramUrl = `https://www.instagram.com/create/story/?text=${encodeURIComponent(shareText)}`;
    window.open(instagramUrl, '_blank');
  };

  return (
    <div className="bg-card rounded-lg gaming-border-subtle border gaming-shadow-secondary">
      {/* Header */}
      <div className="p-4 border-b gaming-border-subtle">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="Share2" size={20} className="text-success" />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-foreground">
                {preset?.name}
              </h3>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <span>Shared {formatDate(preset?.sharedAt)}</span>
                <span>•</span>
                <span className="text-success">Public</span>
              </div>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowStats(!showStats)}
          >
            <Icon name={showStats ? "ChevronUp" : "ChevronDown"} size={16} />
          </Button>
        </div>
      </div>
      {/* Engagement Stats */}
      <div className="p-4">
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className={`text-lg font-heading font-bold ${getEngagementColor(preset?.stats?.views)}`}>
              {preset?.stats?.views}
            </div>
            <div className="text-xs text-muted-foreground">Views</div>
          </div>
          <div className="text-center">
            <div className={`text-lg font-heading font-bold ${getEngagementColor(preset?.stats?.downloads)}`}>
              {preset?.stats?.downloads}
            </div>
            <div className="text-xs text-muted-foreground">Downloads</div>
          </div>
          <div className="text-center">
            <div className={`text-lg font-heading font-bold ${getEngagementColor(preset?.stats?.likes)}`}>
              {preset?.stats?.likes}
            </div>
            <div className="text-xs text-muted-foreground">Likes</div>
          </div>
        </div>

        {/* Quick Settings Preview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-4">
          <div className="bg-muted/50 rounded px-2 py-1">
            <div className="text-xs text-muted-foreground">General</div>
            <div className="text-sm font-mono text-foreground">{preset?.settings?.general}</div>
          </div>
          <div className="bg-muted/50 rounded px-2 py-1">
            <div className="text-xs text-muted-foreground">Red Dot</div>
            <div className="text-sm font-mono text-foreground">{preset?.settings?.redDot}</div>
          </div>
          <div className="bg-muted/50 rounded px-2 py-1">
            <div className="text-xs text-muted-foreground">2x Scope</div>
            <div className="text-sm font-mono text-foreground">{preset?.settings?.scope2x}</div>
          </div>
          <div className="bg-muted/50 rounded px-2 py-1">
            <div className="text-xs text-muted-foreground">4x Scope</div>
            <div className="text-sm font-mono text-foreground">{preset?.settings?.scope4x}</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyLink}
            iconName="Link"
            iconPosition="left"
          >
            Copy Link
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleInstagramShare}
            iconName="Instagram"
            iconPosition="left"
          >
            Share on IG
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewStats(preset)}
            iconName="BarChart3"
            iconPosition="left"
          >
            View Stats
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onUnshare(preset)}
            iconName="EyeOff"
            iconPosition="left"
          >
            Unshare
          </Button>
        </div>
      </div>
      {/* Detailed Stats */}
      {showStats && (
        <div className="px-4 pb-4 border-t gaming-border-subtle">
          <div className="mt-4 space-y-3">
            <h4 className="font-medium text-foreground">Recent Activity</h4>
            
            {preset?.recentActivity?.map((activity, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <Icon 
                    name={activity?.type === 'view' ? 'Eye' : activity?.type === 'download' ? 'Download' : 'Heart'} 
                    size={14} 
                    className="text-muted-foreground" 
                  />
                  <span className="text-muted-foreground">
                    {activity?.type === 'view' ? 'Viewed' : 
                     activity?.type === 'download' ? 'Downloaded' : 'Liked'} by {activity?.user}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {formatDate(activity?.timestamp)}
                </span>
              </div>
            ))}

            {preset?.recentActivity?.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">
                No recent activity yet
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SharedPresetCard;