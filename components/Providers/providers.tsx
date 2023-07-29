'use client';

import * as React from 'react';

import { TooltipProvider } from '@/components/ui/tooltip';
import QueryProvider from '@/components/Providers/QueryProvider';
import { Toaster } from 'react-hot-toast';

export function Providers({ children }: { children: React.ReactElement }) {
  return (
    <QueryProvider>
      <Toaster />
      <TooltipProvider>{children}</TooltipProvider>
    </QueryProvider>
  );
}
