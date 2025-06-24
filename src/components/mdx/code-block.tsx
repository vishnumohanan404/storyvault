import React from 'react';

const CodeBlock = ({
  children,
  className = '',
}: React.PropsWithChildren<{ className?: string }>) => {
  const language = className.replace('language-', '') || 'plaintext';

  return (
    <pre className="my-4 overflow-x-auto rounded-lg bg-zinc-900 p-4 text-sm text-zinc-100">
      <code className={`language-${language}`}>{children}</code>
    </pre>
  );
};

export default CodeBlock;
