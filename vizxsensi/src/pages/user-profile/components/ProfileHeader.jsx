import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ProfileHeader = ({ userProfile, onUpdateProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    username: userProfile?.username,
    deviceType: userProfile?.deviceType,
    playstyle: userProfile?.playstyle
  });

  const deviceOptions = [
    { value: '2gb', label: '2GB RAM Device' },
    { value: '4gb', label: '4GB RAM Device' },
    { value: '6gb+', label: '6GB+ RAM Device' }
  ];

  const playstyleOptions = [
    { value: 'aggressive', label: 'Aggressive' },
    { value: 'sniper', label: 'Sniper' },
    { value: 'balanced', label: 'Balanced' }
  ];

  const handleSave = () => {
    onUpdateProfile(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      username: userProfile?.username,
      deviceType: userProfile?.deviceType,
      playstyle: userProfile?.playstyle
    });
    setIsEditing(false);
  };

  return (
    <div className="bg-card rounded-lg gaming-border-subtle border p-6 gaming-shadow-secondary">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Avatar and Basic Info */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
              <Icon name="User" size={32} color="white" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full border-2 border-card flex items-center justify-center">
              <Icon name="Zap" size={12} color="black" />
            </div>
          </div>

          <div className="flex-1">
            {isEditing ? (
              <Input
                type="text"
                value={editData?.username}
                onChange={(e) => setEditData({ ...editData, username: e?.target?.value })}
                placeholder="Enter username"
                className="mb-2"
              />
            ) : (
              <h2 className="text-2xl font-heading font-bold text-foreground">
                {userProfile?.username}
              </h2>
            )}
            <p className="text-sm text-muted-foreground">
              Free Fire Player • Level {userProfile?.level}
            </p>
            <div className="flex items-center space-x-2 mt-1">
              <Icon name="Calendar" size={14} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                Joined {userProfile?.joinDate}
              </span>
            </div>
          </div>
        </div>

        {/* Gaming Preferences */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Device Type</label>
            {isEditing ? (
              <Select
                options={deviceOptions}
                value={editData?.deviceType}
                onChange={(value) => setEditData({ ...editData, deviceType: value })}
                placeholder="Select device"
              />
            ) : (
              <div className="px-3 py-2 bg-muted rounded-md">
                <span className="text-sm text-foreground">
                  {deviceOptions?.find(d => d?.value === userProfile?.deviceType)?.label}
                </span>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Playstyle</label>
            {isEditing ? (
              <Select
                options={playstyleOptions}
                value={editData?.playstyle}
                onChange={(value) => setEditData({ ...editData, playstyle: value })}
                placeholder="Select playstyle"
              />
            ) : (
              <div className="px-3 py-2 bg-muted rounded-md">
                <span className="text-sm text-foreground">
                  {playstyleOptions?.find(p => p?.value === userProfile?.playstyle)?.label}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          {isEditing ? (
            <>
              <Button variant="default" onClick={handleSave} iconName="Check" iconPosition="left">
                Save
              </Button>
              <Button variant="outline" onClick={handleCancel} iconName="X" iconPosition="left">
                Cancel
              </Button>
            </>
          ) : (
            <Button variant="outline" onClick={() => setIsEditing(true)} iconName="Edit" iconPosition="left">
              Edit Profile
            </Button>
          )}
        </div>
      </div>
      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-6 border-t gaming-border-subtle">
        <div className="text-center">
          <div className="text-2xl font-heading font-bold text-primary">
            {userProfile?.stats?.savedConfigs}
          </div>
          <div className="text-xs text-muted-foreground">Saved Configs</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-heading font-bold text-accent">
            {userProfile?.stats?.testSessions}
          </div>
          <div className="text-xs text-muted-foreground">Test Sessions</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-heading font-bold text-success">
            {userProfile?.stats?.avgAccuracy}%
          </div>
          <div className="text-xs text-muted-foreground">Avg Accuracy</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-heading font-bold text-warning">
            {userProfile?.stats?.sharedPresets}
          </div>
          <div className="text-xs text-muted-foreground">Shared Presets</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;