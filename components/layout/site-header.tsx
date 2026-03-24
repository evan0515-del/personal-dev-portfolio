import {getTranslations} from 'next-intl/server';

import {LocaleSwitcher} from '@/components/layout/locale-switcher';
import {ThemeToggle} from '@/components/layout/theme-toggle';
import {Container} from '@/components/ui/container';
import {Link} from '@/i18n/navigation';
import type {AppLocale} from '@/i18n/routing';
import {siteConfig} from '@/lib/site';

export async function SiteHeader({locale}: {locale: AppLocale}) {
  const t = await getTranslations({locale, namespace: 'Navigation'});

  const navigation = [
    {href: '/', label: t('home')},
    {href: '/projects', label: t('projects')},
    {href: '/blog', label: t('blog')},
    {href: '/about', label: t('about')}
  ] as const;

  return (
    <header className="relative z-10 py-6">
      <Container>
        <div className="surface flex flex-col gap-5 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="group inline-flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent font-serif text-lg font-semibold text-accent-foreground">
                {siteConfig.name
                  .split(' ')
                  .filter(Boolean)
                  .slice(0, 2)
                  .map((part) => part[0])
                  .join('')
                  .toUpperCase()}
              </div>
              <div>
                <p className="font-medium text-foreground">{siteConfig.name}</p>
                <p className="text-sm text-muted-foreground">{siteConfig.jobTitle[locale]}</p>
              </div>
            </Link>
            <div className="flex items-center gap-2 sm:hidden">
              <LocaleSwitcher />
              <ThemeToggle />
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <nav className="flex flex-wrap items-center gap-2">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="hidden items-center gap-2 sm:flex">
              <LocaleSwitcher />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}
