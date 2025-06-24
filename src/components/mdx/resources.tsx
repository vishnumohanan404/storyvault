import { BookOpenIcon } from 'lucide-react';
import React from 'react';

const Resources = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="space-y-2">
      <h5 className="flex items-center text-sm font-medium">
        <BookOpenIcon className="mr-2 h-4 w-4" />
        Resources
      </h5>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
};

export default Resources;
