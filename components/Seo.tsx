import Head from 'next/head';
import { profile } from '@/content/profile';

interface SeoProps {
  title?: string;
  description?: string;
  image?: string;
  path?: string;
  type?: 'website' | 'article';
  noindex?: boolean;
}

const DEFAULT_IMAGE = `${profile.siteUrl}/og.png`;

export default function Seo({ title, description, image, path, type = 'website', noindex }: SeoProps) {
  const fullTitle = title ? `${title} · ${profile.name}` : profile.name;
  const ogImage = image && /^https?:\/\//.test(image) ? image : DEFAULT_IMAGE;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta property="og:title" content={fullTitle} key="og:title" />
      <meta property="og:type" content={type} key="og:type" />
      <meta property="og:image" content={ogImage} key="og:image" />
      <meta name="twitter:card" content="summary_large_image" key="twitter:card" />
      {description && <meta name="description" content={description} key="description" />}
      {description && <meta property="og:description" content={description} key="og:description" />}
      {path && <meta property="og:url" content={`${profile.siteUrl}${path}`} key="og:url" />}
      {path && <link rel="canonical" href={`${profile.siteUrl}${path}`} key="canonical" />}
      {noindex && <meta name="robots" content="noindex" key="robots" />}
    </Head>
  );
}
