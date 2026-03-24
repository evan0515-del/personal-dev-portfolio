import {getTranslations} from 'next-intl/server';

import {Container} from '@/components/ui/container';
import {Link} from '@/i18n/navigation';

export default async function LocalizedNotFound() {
  const t = await getTranslations('NotFound');

  return (
    <Container className="pb-24 pt-16">
      <div className="surface px-8 py-12 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-accent">404</p>
        <h1 className="mt-4 font-serif text-4xl font-semibold text-foreground">{t('title')}</h1>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">{t('description')}</p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-accent px-5 py-3 text-sm font-medium text-accent-foreground"
        >
          {t('backHome')}
        </Link>
      </div>
    </Container>
  );
}
