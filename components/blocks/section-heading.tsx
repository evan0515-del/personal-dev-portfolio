import type {LucideIcon} from 'lucide-react';

import {cn} from '@/lib/utils';

export function SectionHeading({
  eyebrow,
  title,
  description,
  icon: Icon,
  className
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  icon?: LucideIcon;
  className?: string;
}) {
  return (
    <div className={cn('max-w-3xl', className)}>
      {eyebrow || Icon ? (
        <div className="flex items-center gap-3">
          {Icon ? (
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-border/80 bg-card/70">
              <Icon className="h-4 w-4 text-accent" />
            </span>
          ) : null}
          {eyebrow ? (
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-accent">{eyebrow}</p>
          ) : null}
        </div>
      ) : null}
      <h2 className="mt-4 font-serif text-4xl font-semibold text-foreground sm:text-5xl">{title}</h2>
      {description ? <p className="mt-4 text-base leading-8 text-muted-foreground">{description}</p> : null}
    </div>
  );
}
