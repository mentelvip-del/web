import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FAQSection = ({ faqs, className = '' }) => {
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFAQs = faqs?.filter(faq =>
    faq?.question?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    faq?.answer?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );

  const toggleFAQ = (faqId) => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId);
  };

  return (
    <div className={`bg-card rounded-lg border gaming-border-subtle gaming-shadow-secondary ${className}`}>
      <div className="p-4 border-b gaming-border-subtle">
        <h3 className="font-heading font-semibold text-foreground flex items-center space-x-2">
          <Icon name="HelpCircle" size={20} className="text-primary" />
          <span>Frequently Asked Questions</span>
        </h3>
      </div>
      <div className="p-4">
        {/* Search */}
        <div className="mb-4">
          <div className="relative">
            <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e?.target?.value)}
              className="w-full pl-10 pr-4 py-2 bg-background border gaming-border-subtle rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary gaming-transition"
            />
          </div>
        </div>

        {/* FAQ List */}
        <div className="space-y-2">
          {filteredFAQs?.length === 0 ? (
            <div className="text-center py-8">
              <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">No FAQs found matching your search.</p>
            </div>
          ) : (
            filteredFAQs?.map((faq) => (
              <div key={faq?.id} className="border gaming-border-subtle rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleFAQ(faq?.id)}
                  className="w-full p-4 text-left hover:bg-muted/50 gaming-transition"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-start space-x-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        faq?.category === 'technical' ? 'bg-primary/10 text-primary' :
                        faq?.category === 'gameplay'? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                      }`}>
                        <Icon 
                          name={
                            faq?.category === 'technical' ? 'Settings' :
                            faq?.category === 'gameplay'? 'Target' : 'AlertCircle'
                          } 
                          size={12} 
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground text-sm leading-relaxed">
                          {faq?.question}
                        </h4>
                        {faq?.tags && faq?.tags?.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {faq?.tags?.map((tag, index) => (
                              <span 
                                key={index}
                                className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <Icon 
                      name={expandedFAQ === faq?.id ? "ChevronUp" : "ChevronDown"} 
                      size={16} 
                      className="text-muted-foreground flex-shrink-0"
                    />
                  </div>
                </button>

                {expandedFAQ === faq?.id && (
                  <div className="px-4 pb-4">
                    <div className="pl-9">
                      <div className="bg-muted/30 rounded-lg p-4 border gaming-border-subtle">
                        <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">
                          {faq?.answer}
                        </p>
                        
                        {faq?.relatedLinks && faq?.relatedLinks?.length > 0 && (
                          <div className="mt-3 pt-3 border-t gaming-border-subtle">
                            <p className="text-xs text-muted-foreground mb-2">Related:</p>
                            <div className="flex flex-wrap gap-2">
                              {faq?.relatedLinks?.map((link, index) => (
                                <Button
                                  key={index}
                                  variant="ghost"
                                  size="sm"
                                  className="text-xs h-auto py-1 px-2 text-primary hover:text-primary hover:bg-primary/10"
                                >
                                  {link?.title}
                                </Button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Contact Support */}
        <div className="mt-6 bg-primary/5 rounded-lg p-4 border border-primary/20">
          <div className="flex items-start space-x-3">
            <Icon name="MessageCircle" size={20} className="text-primary flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-medium text-foreground mb-1">Still need help?</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Can't find what you're looking for? Reach out to our community on Instagram.
              </p>
              <Button
                variant="outline"
                size="sm"
                iconName="Instagram"
                iconPosition="left"
                className="border-primary/20 text-primary hover:bg-primary/10"
              >
                Contact @vizxsensi
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;