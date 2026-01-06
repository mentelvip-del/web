import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const CommunityShares = ({ className = '' }) => {
  const communityShares = [
    {
      id: 'share-1',
      creator: '@ff_pro_gamer',
      creatorName: 'ProGamer FF',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      presetName: 'Clutch Master',
      description: 'Perfect for 1v4 situations and close combat',
      thumbnail: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?w=300&h=200&fit=crop',
      likes: 1240,
      shares: 89,
      timeAgo: '2h ago',
      isVerified: true,
      tags: ['Aggressive', '4GB RAM', '800 DPI']
    },
    {
      id: 'share-2',
      creator: '@sniper_king_ff',
      creatorName: 'Sniper King',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      presetName: 'Long Range Beast',
      description: 'Dominate with AWM and Kar98k using these settings',
      thumbnail: 'https://images.pixabay.com/photo/2017/05/09/03/46/alberta-2297204_1280.jpg?w=300&h=200&fit=crop',
      likes: 2150,
      shares: 156,
      timeAgo: '4h ago',
      isVerified: true,
      tags: ['Sniper', '6GB+ RAM', '600 DPI']
    },
    {
      id: 'share-3',
      creator: '@mobile_legend_ff',
      creatorName: 'Mobile Legend',
      avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
      presetName: 'Budget Device Pro',
      description: 'Optimized for 2GB RAM devices without lag',
      thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=300&h=200&fit=crop',
      likes: 890,
      shares: 67,
      timeAgo: '6h ago',
      isVerified: false,
      tags: ['Balanced', '2GB RAM', '400 DPI']
    }
  ];

  const handleShareClick = (shareId) => {
    window.location.href = `/sensitivity-calculator?share=${shareId}`;
  };

  const handleCreatorClick = (creator) => {
    // Open Instagram profile
    window.open(`https://instagram.com/${creator?.replace('@', '')}`, '_blank');
  };

  const handleLike = (shareId, e) => {
    e?.stopPropagation();
    // Handle like functionality
    console.log('Liked share:', shareId);
  };

  const handleShare = (shareId, e) => {
    e?.stopPropagation();
    // Handle share functionality
    const shareUrl = `${window.location?.origin}/sensitivity-calculator?share=${shareId}`;
    if (navigator.share) {
      navigator.share({
        title: 'Check out this Free Fire sensitivity preset!',
        url: shareUrl
      });
    } else {
      navigator.clipboard?.writeText(shareUrl);
      // Show toast notification
    }
  };

  return (
    <div className={`${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
            <Icon name="Users" size={16} className="text-success" />
          </div>
          <div>
            <h2 className="text-xl font-heading font-bold text-foreground">
              Community Shares
            </h2>
            <p className="text-sm text-muted-foreground">
              Latest presets shared by the community
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => window.open('https://instagram.com/vizxsensi', '_blank')}
          iconName="Instagram"
          iconPosition="right"
        >
          Follow Us
        </Button>
      </div>
      <div className="space-y-4">
        {communityShares?.map((share) => (
          <div
            key={share?.id}
            className="bg-card rounded-lg gaming-shadow-secondary border gaming-border-subtle p-4 hover:gaming-shadow-primary gaming-transition cursor-pointer group"
            onClick={() => handleShareClick(share?.id)}
          >
            <div className="flex items-start space-x-4">
              {/* Creator Avatar */}
              <div className="relative flex-shrink-0">
                <img
                  src={share?.avatar}
                  alt={share?.creatorName}
                  className="w-12 h-12 rounded-full object-cover"
                  onError={(e) => {
                    e.target.src = '/assets/images/no_image.png';
                  }}
                />
                {share?.isVerified && (
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                    <Icon name="Check" size={12} className="text-white" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                {/* Header */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={(e) => {
                        e?.stopPropagation();
                        handleCreatorClick(share?.creator);
                      }}
                      className="text-sm font-medium text-foreground hover:text-primary gaming-transition"
                    >
                      {share?.creatorName}
                    </button>
                    <span className="text-xs text-muted-foreground">
                      {share?.creator}
                    </span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">
                      {share?.timeAgo}
                    </span>
                  </div>
                </div>

                {/* Preset Info */}
                <div className="mb-3">
                  <h3 className="font-heading font-semibold text-foreground group-hover:text-primary gaming-transition mb-1">
                    {share?.presetName}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {share?.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex items-center space-x-2 mb-3">
                  {share?.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={(e) => handleLike(share?.id, e)}
                      className="flex items-center space-x-1 text-muted-foreground hover:text-primary gaming-transition"
                    >
                      <Icon name="Heart" size={16} />
                      <span className="text-sm">{share?.likes}</span>
                    </button>
                    <button
                      onClick={(e) => handleShare(share?.id, e)}
                      className="flex items-center space-x-1 text-muted-foreground hover:text-primary gaming-transition"
                    >
                      <Icon name="Share" size={16} />
                      <span className="text-sm">{share?.shares}</span>
                    </button>
                  </div>
                  <Button
                    variant="outline"
                    size="xs"
                    onClick={(e) => {
                      e?.stopPropagation();
                      handleShareClick(share?.id);
                    }}
                  >
                    Try Preset
                  </Button>
                </div>
              </div>

              {/* Thumbnail */}
              <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-muted">
                <img
                  src={share?.thumbnail}
                  alt={share?.presetName}
                  className="w-full h-full object-cover group-hover:scale-105 gaming-transition"
                  onError={(e) => {
                    e.target.src = '/assets/images/no_image.png';
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Load More */}
      <div className="text-center mt-6">
        <Button
          variant="outline"
          onClick={() => window.open('https://instagram.com/vizxsensi', '_blank')}
          iconName="Instagram"
          iconPosition="left"
        >
          View More on Instagram
        </Button>
      </div>
    </div>
  );
};

export default CommunityShares;