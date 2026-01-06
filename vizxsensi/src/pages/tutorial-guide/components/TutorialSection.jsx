import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TutorialSection = ({ section, isExpanded, onToggle, sectionIndex }) => {
  const [copiedStep, setCopiedStep] = useState(null);

  const handleCopyValue = async (value, stepIndex) => {
    try {
      await navigator.clipboard?.writeText(value);
      setCopiedStep(stepIndex);
      setTimeout(() => setCopiedStep(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const renderStep = (step, stepIndex) => (
    <div key={stepIndex} className="bg-muted/30 rounded-lg p-4 border gaming-border-subtle">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">
          {stepIndex + 1}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-foreground mb-2">{step?.title}</h4>
          <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
            {step?.description}
          </p>
          
          {step?.image && (
            <div className="mb-3 rounded-lg overflow-hidden">
              <Image 
                src={step?.image} 
                alt={step?.title}
                className="w-full h-48 object-cover"
              />
            </div>
          )}

          {step?.values && step?.values?.length > 0 && (
            <div className="space-y-2 mb-3">
              {step?.values?.map((valueItem, valueIndex) => (
                <div key={valueIndex} className="flex items-center justify-between bg-card rounded-md p-3 border gaming-border-subtle">
                  <div>
                    <span className="text-sm font-medium text-foreground">{valueItem?.label}:</span>
                    <span className="text-sm font-mono text-primary ml-2">{valueItem?.value}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleCopyValue(valueItem?.value, `${sectionIndex}-${stepIndex}-${valueIndex}`)}
                    className="hover:bg-muted"
                  >
                    <Icon 
                      name={copiedStep === `${sectionIndex}-${stepIndex}-${valueIndex}` ? "Check" : "Copy"} 
                      size={16} 
                    />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {step?.warning && (
            <div className="bg-warning/10 border border-warning/20 rounded-lg p-3 mb-3">
              <div className="flex items-start space-x-2">
                <Icon name="AlertTriangle" size={16} className="text-warning flex-shrink-0 mt-0.5" />
                <p className="text-sm text-warning-foreground">{step?.warning}</p>
              </div>
            </div>
          )}

          {step?.tip && (
            <div className="bg-success/10 border border-success/20 rounded-lg p-3">
              <div className="flex items-start space-x-2">
                <Icon name="Lightbulb" size={16} className="text-success flex-shrink-0 mt-0.5" />
                <p className="text-sm text-success-foreground">{step?.tip}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-card rounded-lg border gaming-border-subtle gaming-shadow-secondary">
      <button
        onClick={() => onToggle(section?.id)}
        className="w-full p-6 text-left hover:bg-muted/50 gaming-transition rounded-lg"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name={section?.icon} size={24} className="text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-heading font-semibold text-foreground">
                {section?.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {section?.description}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
              {section?.steps?.length} steps
            </span>
            <Icon 
              name={isExpanded ? "ChevronUp" : "ChevronDown"} 
              size={20} 
              className="text-muted-foreground"
            />
          </div>
        </div>
      </button>
      {isExpanded && (
        <div className="px-6 pb-6 space-y-4">
          {section?.steps?.map((step, stepIndex) => renderStep(step, stepIndex))}
          
          {section?.videoUrl && (
            <div className="bg-muted/30 rounded-lg p-4 border gaming-border-subtle">
              <div className="flex items-center space-x-3 mb-3">
                <Icon name="Play" size={20} className="text-primary" />
                <h4 className="font-medium text-foreground">Video Tutorial</h4>
              </div>
              <div className="aspect-video bg-background rounded-lg overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src={section?.videoUrl}
                  title={`${section?.title} Tutorial`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TutorialSection;