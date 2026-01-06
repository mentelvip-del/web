import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Icon from '../../../components/AppIcon';

const TestResultsChart = ({ testData, chartType = 'line' }) => {
  const formatTooltipValue = (value, name) => {
    if (name === 'accuracy') return [`${value}%`, 'Accuracy'];
    if (name === 'speed') return [`${value}ms`, 'Avg Speed'];
    if (name === 'sessions') return [`${value}`, 'Sessions'];
    return [value, name];
  };

  const formatXAxisLabel = (tickItem) => {
    const date = new Date(tickItem);
    return date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border gaming-border-subtle rounded-lg p-3 gaming-shadow-secondary">
          <p className="text-sm font-medium text-foreground mb-2">
            {new Date(label)?.toLocaleDateString('en-US', { 
              weekday: 'short', 
              month: 'short', 
              day: 'numeric' 
            })}
          </p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry?.color }}
              ></div>
              <span className="text-sm text-muted-foreground">{entry?.name}:</span>
              <span className="text-sm font-medium text-foreground">
                {entry?.name === 'accuracy' ? `${entry?.value}%` : 
                 entry?.name === 'speed' ? `${entry?.value}ms` : entry?.value}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  if (!testData || testData?.length === 0) {
    return (
      <div className="bg-card rounded-lg gaming-border-subtle border p-8 text-center">
        <Icon name="TrendingUp" size={48} className="text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
          No Test Data Yet
        </h3>
        <p className="text-muted-foreground mb-4">
          Start practicing with the sensitivity tester to see your progress here.
        </p>
        <button 
          onClick={() => window.location.href = '/sensitivity-tester'}
          className="text-primary hover:text-primary/80 gaming-transition font-medium"
        >
          Start Testing →
        </button>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg gaming-border-subtle border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Performance Trends
          </h3>
          <p className="text-sm text-muted-foreground">
            Your accuracy and speed over the last 30 days
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span>Accuracy</span>
          </div>
          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            <div className="w-3 h-3 bg-accent rounded-full"></div>
            <span>Speed</span>
          </div>
        </div>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'line' ? (
            <LineChart data={testData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
              <XAxis 
                dataKey="date" 
                tickFormatter={formatXAxisLabel}
                stroke="rgba(255, 255, 255, 0.6)"
                fontSize={12}
              />
              <YAxis 
                stroke="rgba(255, 255, 255, 0.6)"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="accuracy" 
                stroke="var(--color-primary)" 
                strokeWidth={2}
                dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'var(--color-primary)', strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="speed" 
                stroke="var(--color-accent)" 
                strokeWidth={2}
                dot={{ fill: 'var(--color-accent)', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'var(--color-accent)', strokeWidth: 2 }}
              />
            </LineChart>
          ) : (
            <BarChart data={testData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
              <XAxis 
                dataKey="date" 
                tickFormatter={formatXAxisLabel}
                stroke="rgba(255, 255, 255, 0.6)"
                fontSize={12}
              />
              <YAxis 
                stroke="rgba(255, 255, 255, 0.6)"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="sessions" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t gaming-border-subtle">
        <div className="text-center">
          <div className="text-xl font-heading font-bold text-primary">
            {Math.max(...testData?.map(d => d?.accuracy))}%
          </div>
          <div className="text-xs text-muted-foreground">Best Accuracy</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-heading font-bold text-accent">
            {Math.min(...testData?.map(d => d?.speed))}ms
          </div>
          <div className="text-xs text-muted-foreground">Fastest Time</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-heading font-bold text-success">
            {testData?.reduce((sum, d) => sum + d?.sessions, 0)}
          </div>
          <div className="text-xs text-muted-foreground">Total Sessions</div>
        </div>
      </div>
    </div>
  );
};

export default TestResultsChart;