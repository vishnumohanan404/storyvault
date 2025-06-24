import { TerminalIcon } from 'lucide-react';
import React from 'react';

const Commands = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="space-y-2">
      <h5 className="flex items-center text-sm font-medium">
        <TerminalIcon className="mr-2 h-4 w-4" />
        Commands
      </h5>
      <div className="space-y-2">{children}</div>
    </div>
  );
};

export default Commands;
