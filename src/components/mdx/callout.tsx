
import React from 'react';

const Callout = ({
  title,
  subtext,
  children,
}: {
  title: string;
  subtext: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="space-y-8">
      <div className="bg-card text-card-foreground overflow-hidden rounded-lg border shadow-sm">
        <div className="from-primary/5 to-accent/5 flex flex-col space-y-1.5 bg-gradient-to-r p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div>
                <h3 className="text-xl font-semibold tracking-tight">
                  {title}
                </h3>
                <p className="text-muted-foreground text-sm">{subtext}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Callout;
