'use client';

import {MoonStar, SunMedium} from 'lucide-react';
import {useTheme} from 'next-themes';
import {useEffect, useState} from 'react';

import {cn} from '@/lib/utils';

export function ThemeToggle() {
  const {resolvedTheme, setTheme} = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === 'dark';

  return (
    <button
      type="button"
      aria-label="Toggle color theme"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={cn(
        'inline-flex h-11 items-center gap-2 rounded-full border border-border/80 bg-card/80 px-4 text-sm font-medium text-foreground',
        !mounted && 'opacity-70'
      )}
    >
      {isDark ? <SunMedium className="h-4 w-4 text-accent" /> : <MoonStar className="h-4 w-4 text-accent" />}
      <span>{isDark ? 'Light' : 'Dark'}</span>
    </button>
  );
}
