import type {ComponentPropsWithoutRef} from 'react';

import {cn} from '@/lib/utils';

export function Pill({
  className,
  tone = 'accent',
  ...props
}: ComponentPropsWithoutRef<'span'> & {tone?: 'accent' | 'muted'}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em]',
        tone === 'accent'
          ? 'bg-accent/12 text-accent dark:bg-accent/18'
          : 'border border-border/80 bg-muted/50 text-muted-foreground',
        className
      )}
      {...props}
    />
  );
}
