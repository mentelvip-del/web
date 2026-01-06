import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const DeviceGallery = ({ devices, className = '' }) => {
  const [selectedDevice, setSelectedDevice] = useState(devices?.[0]?.id || null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const selectedDeviceData = devices?.find(device => device?.id === selectedDevice);

  const handlePrevImage = () => {
    if (selectedDeviceData) {
      setCurrentImageIndex(prev => 
        prev === 0 ? selectedDeviceData?.images?.length - 1 : prev - 1
      );
    }
  };

  const handleNextImage = () => {
    if (selectedDeviceData) {
      setCurrentImageIndex(prev => 
        prev === selectedDeviceData?.images?.length - 1 ? 0 : prev + 1
      );
    }
  };

  if (!devices || devices?.length === 0) {
    return null;
  }

  return (
    <div className={`bg-card rounded-lg border gaming-border-subtle gaming-shadow-secondary ${className}`}>
      <div className="p-4 border-b gaming-border-subtle">
        <h3 className="font-heading font-semibold text-foreground flex items-center space-x-2">
          <Icon name="Smartphone" size={20} className="text-primary" />
          <span>Device Setup Gallery</span>
        </h3>
      </div>
      <div className="p-4">
        {/* Device Selector */}
        <div className="flex flex-wrap gap-2 mb-4">
          {devices?.map((device) => (
            <Button
              key={device?.id}
              variant={selectedDevice === device?.id ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setSelectedDevice(device?.id);
                setCurrentImageIndex(0);
              }}
              className={selectedDevice === device?.id ? 'gaming-shadow-primary' : ''}
            >
              <Icon name={device?.icon} size={16} className="mr-2" />
              {device?.name}
            </Button>
          ))}
        </div>

        {/* Image Gallery */}
        {selectedDeviceData && (
          <div>
            <div className="relative bg-background rounded-lg overflow-hidden mb-4">
              <div className="aspect-video relative">
                <Image
                  src={selectedDeviceData?.images?.[currentImageIndex]?.url}
                  alt={selectedDeviceData?.images?.[currentImageIndex]?.caption}
                  className="w-full h-full object-cover"
                />
                
                {/* Navigation Arrows */}
                {selectedDeviceData?.images?.length > 1 && (
                  <>
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={handlePrevImage}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-card/90 backdrop-blur-sm hover:bg-card"
                    >
                      <Icon name="ChevronLeft" size={20} />
                    </Button>
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={handleNextImage}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-card/90 backdrop-blur-sm hover:bg-card"
                    >
                      <Icon name="ChevronRight" size={20} />
                    </Button>
                  </>
                )}

                {/* Image Counter */}
                <div className="absolute bottom-2 right-2 bg-card/90 backdrop-blur-sm rounded-full px-3 py-1">
                  <span className="text-xs text-foreground font-medium">
                    {currentImageIndex + 1} / {selectedDeviceData?.images?.length}
                  </span>
                </div>
              </div>
            </div>

            {/* Image Caption */}
            <div className="mb-4">
              <h4 className="font-medium text-foreground mb-2">
                {selectedDeviceData?.images?.[currentImageIndex]?.title}
              </h4>
              <p className="text-sm text-muted-foreground">
                {selectedDeviceData?.images?.[currentImageIndex]?.caption}
              </p>
            </div>

            {/* Thumbnail Strip */}
            {selectedDeviceData?.images?.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {selectedDeviceData?.images?.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 gaming-transition ${
                      currentImageIndex === index 
                        ? 'border-primary gaming-shadow-primary' 
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <Image
                      src={image?.url}
                      alt={image?.title}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Device Specs */}
            <div className="mt-4 bg-muted/30 rounded-lg p-3 border gaming-border-subtle">
              <h4 className="text-sm font-medium text-foreground mb-2">Device Specifications</h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-muted-foreground">RAM:</span>
                  <span className="text-foreground ml-1">{selectedDeviceData?.specs?.ram}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Resolution:</span>
                  <span className="text-foreground ml-1">{selectedDeviceData?.specs?.resolution}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">FPS:</span>
                  <span className="text-foreground ml-1">{selectedDeviceData?.specs?.fps}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">DPI:</span>
                  <span className="text-foreground ml-1">{selectedDeviceData?.specs?.dpi}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeviceGallery;