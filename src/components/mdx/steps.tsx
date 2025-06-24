import React from 'react';

interface Steps {
  count: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

const Steps = ({ count, title, subtitle, children }: Steps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-start space-x-3">
        <div className="bg-primary/10 mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full">
          <span className="text-primary text-xs font-medium">{count}</span>
        </div>
        <div className="flex-1 space-y-3">
          <div>
            <h4 className="text-lg font-semibold">{title}</h4>
            <p className="text-muted-foreground">{subtitle}</p>
          </div>
          {children}
        </div>
      </div>
      <div className="bg-border ml-3 h-6 w-px"></div>
    </div>
  );
};

export default Steps;
