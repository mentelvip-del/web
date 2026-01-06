import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ConfigurationCard = ({ config, onEdit, onDelete, onDuplicate, onShare }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const getDeviceIcon = (deviceType) => {
    switch (deviceType) {
      case '2gb': return 'Smartphone';
      case '4gb': return 'Tablet';
      case '6gb+': return 'Monitor';
      default: return 'Smartphone';
    }
  };

  const getPlaystyleColor = (playstyle) => {
    switch (playstyle) {
      case 'aggressive': return 'text-error';
      case 'sniper': return 'text-warning';
      case 'balanced': return 'text-success';
      default: return 'text-foreground';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const handleShare = () => {
    const shareText = `Check out my Free Fire sensitivity config: ${config?.name}\nGeneral: ${config?.settings?.general}\nRed Dot: ${config?.settings?.redDot}\n2x Scope: ${config?.settings?.scope2x}\n4x Scope: ${config?.settings?.scope4x}\n\nOptimized for ${config?.deviceType} devices with ${config?.playstyle} playstyle!\n\n#FreeFire #VIZxSENSI`;
    
    if (navigator.share) {
      navigator.share({
        title: `${config?.name} - Free Fire Config`,
        text: shareText,
        url: window.location?.href
      });
    } else {
      navigator.clipboard?.writeText(shareText);
      onShare(config);
    }
  };

  return (
    <div className="bg-card rounded-lg gaming-border-subtle border gaming-shadow-secondary hover:gaming-shadow-primary gaming-transition">
      {/* Header */}
      <div 
        className="p-4 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name={getDeviceIcon(config?.deviceType)} size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-foreground">
                {config?.name}
              </h3>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <span>{formatDate(config?.createdAt)}</span>
                <span>•</span>
                <span className={getPlaystyleColor(config?.playstyle)}>
                  {config?.playstyle?.charAt(0)?.toUpperCase() + config?.playstyle?.slice(1)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {config?.isShared && (
              <div className="w-6 h-6 bg-success/10 rounded-full flex items-center justify-center">
                <Icon name="Share2" size={12} className="text-success" />
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e?.stopPropagation();
                setShowActions(!showActions);
              }}
            >
              <Icon name="MoreVertical" size={16} />
            </Button>
            <Icon 
              name={isExpanded ? "ChevronUp" : "ChevronDown"} 
              size={16} 
              className="text-muted-foreground" 
            />
          </div>
        </div>
      </div>
      {/* Expanded Content */}
      {isExpanded && (
        <div className="px-4 pb-4 border-t gaming-border-subtle">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">General</label>
              <div className="text-sm font-mono text-foreground bg-muted px-2 py-1 rounded">
                {config?.settings?.general}
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Red Dot</label>
              <div className="text-sm font-mono text-foreground bg-muted px-2 py-1 rounded">
                {config?.settings?.redDot}
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">2x Scope</label>
              <div className="text-sm font-mono text-foreground bg-muted px-2 py-1 rounded">
                {config?.settings?.scope2x}
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">4x Scope</label>
              <div className="text-sm font-mono text-foreground bg-muted px-2 py-1 rounded">
                {config?.settings?.scope4x}
              </div>
            </div>
          </div>

          {/* Performance Stats */}
          {config?.performance && (
            <div className="mt-4 p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Best Accuracy:</span>
                <span className="text-success font-medium">{config?.performance?.bestAccuracy}%</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-1">
                <span className="text-muted-foreground">Times Used:</span>
                <span className="text-foreground font-medium">{config?.performance?.usageCount}</span>
              </div>
            </div>
          )}
        </div>
      )}
      {/* Action Menu */}
      {showActions && (
        <div className="absolute right-4 mt-2 w-48 bg-popover border gaming-border-subtle rounded-lg gaming-shadow-primary z-50">
          <div className="py-2">
            <button
              onClick={() => {
                onEdit(config);
                setShowActions(false);
              }}
              className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-muted gaming-transition flex items-center space-x-2"
            >
              <Icon name="Edit" size={16} />
              <span>Edit Configuration</span>
            </button>
            <button
              onClick={() => {
                onDuplicate(config);
                setShowActions(false);
              }}
              className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-muted gaming-transition flex items-center space-x-2"
            >
              <Icon name="Copy" size={16} />
              <span>Duplicate</span>
            </button>
            <button
              onClick={() => {
                handleShare();
                setShowActions(false);
              }}
              className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-muted gaming-transition flex items-center space-x-2"
            >
              <Icon name="Share2" size={16} />
              <span>Share Config</span>
            </button>
            <div className="border-t gaming-border-subtle my-1"></div>
            <button
              onClick={() => {
                onDelete(config);
                setShowActions(false);
              }}
              className="w-full px-4 py-2 text-left text-sm text-destructive hover:bg-destructive/10 gaming-transition flex items-center space-x-2"
            >
              <Icon name="Trash2" size={16} />
              <span>Delete</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfigurationCard;