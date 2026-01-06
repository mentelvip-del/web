import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TutorialNavigation = ({ sections, activeSection, onSectionClick, className = '' }) => {
  return (
    <div className={`bg-card rounded-lg border gaming-border-subtle gaming-shadow-secondary ${className}`}>
      <div className="p-4 border-b gaming-border-subtle">
        <h3 className="font-heading font-semibold text-foreground flex items-center space-x-2">
          <Icon name="BookOpen" size={20} className="text-primary" />
          <span>Tutorial Sections</span>
        </h3>
      </div>
      <nav className="p-2">
        {sections?.map((section, index) => (
          <Button
            key={section?.id}
            variant={activeSection === section?.id ? "default" : "ghost"}
            onClick={() => onSectionClick(section?.id)}
            className={`w-full justify-start mb-1 ${
              activeSection === section?.id 
                ? 'bg-primary text-primary-foreground gaming-shadow-primary' 
                : 'hover:bg-muted text-foreground hover:text-primary'
            }`}
          >
            <div className="flex items-center space-x-3 w-full">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                activeSection === section?.id ? 'bg-primary-foreground/20' : 'bg-primary/10'
              }`}>
                <Icon 
                  name={section?.icon} 
                  size={16} 
                  className={activeSection === section?.id ? 'text-primary-foreground' : 'text-primary'}
                />
              </div>
              <div className="flex-1 text-left min-w-0">
                <div className="font-medium truncate">{section?.title}</div>
                <div className={`text-xs truncate ${
                  activeSection === section?.id ? 'text-primary-foreground/70' : 'text-muted-foreground'
                }`}>
                  {section?.steps?.length} steps
                </div>
              </div>
              <div className={`text-xs px-2 py-1 rounded-full ${
                section?.completed 
                  ? 'bg-success/20 text-success' 
                  : activeSection === section?.id 
                    ? 'bg-primary-foreground/20 text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'
              }`}>
                {section?.completed ? 'Done' : `${index + 1}`}
              </div>
            </div>
          </Button>
        ))}
      </nav>
      <div className="p-4 border-t gaming-border-subtle">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Progress</span>
          <span className="text-foreground font-medium">
            {sections?.filter(s => s?.completed)?.length}/{sections?.length}
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2 mt-2">
          <div 
            className="bg-primary h-2 rounded-full gaming-transition"
            style={{ 
              width: `${(sections?.filter(s => s?.completed)?.length / sections?.length) * 100}%` 
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TutorialNavigation;