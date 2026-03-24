import type {ComponentPropsWithoutRef} from 'react';

type AnchorProps = ComponentPropsWithoutRef<'a'>;

function MdxAnchor({href = '', ...props}: AnchorProps) {
  const isExternal = href.startsWith('http');

  return (
    <a
      href={href}
      {...props}
      target={isExternal ? '_blank' : props.target}
      rel={isExternal ? 'noreferrer' : props.rel}
      className="font-medium text-accent underline decoration-accent/40 underline-offset-4"
    />
  );
}

export const mdxComponents = {
  h2: (props: ComponentPropsWithoutRef<'h2'>) => (
    <h2 className="mt-14 scroll-mt-24 font-serif text-3xl font-semibold text-foreground" {...props} />
  ),
  h3: (props: ComponentPropsWithoutRef<'h3'>) => (
    <h3 className="mt-10 font-serif text-2xl font-semibold text-foreground" {...props} />
  ),
  p: (props: ComponentPropsWithoutRef<'p'>) => (
    <p className="leading-8 text-muted-foreground" {...props} />
  ),
  ul: (props: ComponentPropsWithoutRef<'ul'>) => <ul className="space-y-3" {...props} />,
  ol: (props: ComponentPropsWithoutRef<'ol'>) => <ol className="space-y-3" {...props} />,
  li: (props: ComponentPropsWithoutRef<'li'>) => <li className="leading-8 text-muted-foreground" {...props} />,
  blockquote: (props: ComponentPropsWithoutRef<'blockquote'>) => (
    <blockquote
      className="rounded-r-3xl border-l-4 border-accent bg-muted/40 px-5 py-1 italic text-foreground"
      {...props}
    />
  ),
  a: MdxAnchor,
  pre: (props: ComponentPropsWithoutRef<'pre'>) => (
    <pre className="overflow-x-auto rounded-3xl border border-border/80 bg-muted/80 p-5 text-sm" {...props} />
  ),
  code: ({className, ...props}: ComponentPropsWithoutRef<'code'>) =>
    className ? (
      <code className={className} {...props} />
    ) : (
      <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[0.95em] text-foreground" {...props} />
    ),
  hr: () => <hr className="my-10 border-border/80" />
};
