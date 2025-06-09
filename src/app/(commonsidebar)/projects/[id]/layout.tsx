import React from "react";

export default function NoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>; // no layout at all
}
