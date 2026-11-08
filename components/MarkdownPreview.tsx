import dynamic from 'next/dynamic';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Box } from '@mui/material';
import SafeImage from '@/components/SafeImage';
import { monoFontFamily } from '@/lib/fonts';

// Only pages that actually contain fenced code download the highlighter.
const CodeBlock = dynamic(() => import('@/components/CodeBlock'));

type HastNode = { type: string; value?: string; tagName?: string; children?: HastNode[] };

function toText(node?: HastNode): string {
  if (!node) return '';
  if (node.type === 'text') return node.value ?? '';
  return (node.children ?? []).map(toText).join('');
}

function isStandaloneImage(node?: HastNode): boolean {
  const children = (node?.children ?? []).filter((child) => !(child.type === 'text' && !child.value?.trim()));
  if (children.length !== 1) return false;
  const [only] = children;
  if (only.tagName === 'img') return true;
  return only.tagName === 'a' && only.children?.length === 1 && only.children[0].tagName === 'img';
}

const OWN_SITE = /^https?:\/\/(www\.)?ernestooo\.dev/i;

// The post title is the page's only h1, so markdown headings are shifted down one level.
const components: Components = {
  h1: ({ children }) => <h2>{children}</h2>,
  h2: ({ children }) => <h3>{children}</h3>,
  h3: ({ children }) => <h4>{children}</h4>,
  h4: ({ children }) => <h5>{children}</h5>,
  h5: ({ children }) => <h6>{children}</h6>,
  p: ({ node, children }) =>
    isStandaloneImage(node) ? <div className="md-figure">{children}</div> : <p>{children}</p>,
  a: ({ href = '', children }) => {
    const external = /^https?:\/\//i.test(href) && !OWN_SITE.test(href);
    return (
      <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
        {children}
      </a>
    );
  },
  img: ({ src, alt }) => <SafeImage src={typeof src === 'string' ? src : undefined} alt={alt ?? ''} />,
  blockquote: ({ node, children }) => {
    const label = /^\s*(note|tip|info|warning|caution|important)\s*:/i.exec(toText(node))?.[1];
    if (!label) return <blockquote>{children}</blockquote>;
    const tone = /warning|caution|important/i.test(label) ? 'warning' : 'note';
    return (
      <div className={`md-callout md-callout-${tone}`} role="note">
        {children}
      </div>
    );
  },
  pre: ({ children }) => <>{children}</>,
  code: ({ className, children }) => {
    const language = /language-([\w-]+)/.exec(className ?? '')?.[1];
    const text = String(children ?? '');
    if (!language && !text.includes('\n')) return <code>{children}</code>;
    return <CodeBlock language={language} code={text.replace(/\n$/, '')} />;
  },
  table: ({ children }) => (
    <div className="md-table">
      <table>{children}</table>
    </div>
  ),
};

const proseSx = {
  fontSize: { xs: '1rem', sm: '1.0625rem' },
  lineHeight: 1.75,
  overflowWrap: 'break-word',
  '& > :first-child': { mt: 0 },
  '& > :last-child': { mb: 0 },
  '& p': { my: 2.5 },
  '& h2, & h3, & h4, & h5, & h6': {
    fontWeight: 600,
    lineHeight: 1.3,
    letterSpacing: '-0.015em',
    mt: 6,
    mb: 2,
  },
  '& h2': { fontSize: '1.5rem' },
  '& h3': { fontSize: '1.25rem', mt: 5 },
  '& h4, & h5, & h6': { fontSize: '1.0625rem', mt: 4 },
  '& a': {
    color: 'text.primary',
    textDecoration: 'underline',
    textDecorationThickness: '1px',
    textUnderlineOffset: '3px',
    textDecorationColor: 'rgba(100, 116, 139, 0.5)',
    '&:hover': { textDecorationColor: 'currentColor' },
  },
  '& strong': { fontWeight: 600 },
  '& ul, & ol': { my: 2.5, pl: 3 },
  '& li': { my: 0.75, pl: 0.5 },
  '& li > ul, & li > ol': { my: 0.75 },
  '& li::marker': { color: 'text.secondary' },
  '& hr': { border: 0, borderTop: 1, borderColor: 'divider', my: 6 },
  '& img': { maxWidth: '100%', height: 'auto', verticalAlign: 'middle' },
  // Images written straight into a paragraph are content screenshots; linked images (badges) stay inline.
  '& p > img': { display: 'block', mx: 'auto', my: 3, borderRadius: 2, border: 1, borderColor: 'divider' },
  '& .md-figure': {
    my: 4,
    '& img': { display: 'block', mx: 'auto', borderRadius: 2, border: 1, borderColor: 'divider' },
  },
  '& :not(pre) > code': {
    fontFamily: monoFontFamily,
    fontSize: '0.875em',
    px: 0.75,
    py: 0.25,
    borderRadius: 1,
    border: 1,
    borderColor: 'divider',
    bgcolor: 'action.hover',
  },
  '& .md-code': {
    my: 3,
    p: 2.5,
    overflowX: 'auto',
    borderRadius: 2,
    border: 1,
    borderColor: 'divider',
    bgcolor: '#0b1220',
    color: '#e2e8f0',
    fontFamily: monoFontFamily,
    fontSize: '0.875rem',
    lineHeight: 1.7,
    '& pre, & code': { m: 0, fontFamily: 'inherit' },
  },
  '& blockquote': {
    mx: 0,
    my: 3,
    pl: 2.5,
    borderLeft: 3,
    borderColor: 'divider',
    color: 'text.secondary',
    '& > p': { my: 1 },
  },
  '& .md-callout': {
    my: 3,
    px: 2.5,
    py: 1.75,
    borderRadius: 2,
    border: 1,
    borderColor: 'divider',
    borderLeftWidth: 3,
    bgcolor: 'action.hover',
    '& > p': { my: 0.75 },
  },
  '& .md-callout-note': { borderLeftColor: '#0ea5e9' },
  '& .md-callout-warning': { borderLeftColor: '#f59e0b' },
  '& .md-table': { my: 3, overflowX: 'auto' },
  '& table': { width: '100%', borderCollapse: 'collapse', fontSize: '0.9375rem' },
  '& th, & td': { textAlign: 'left', py: 1, px: 1.5, borderBottom: 1, borderColor: 'divider' },
  '& th': { fontWeight: 600 },
};

export default function MarkdownPreview({ content }: { content: string }) {
  return (
    <Box sx={proseSx}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </Box>
  );
}
