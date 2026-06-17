import { Metadata } from 'next';
import { siteConfig } from '@/lib/site-config';
import { generateSchemaOrgJsonLd } from '@/lib/utils';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.seo.keywords,
  authors: [{ name: siteConfig.author.name }],
  creator: siteConfig.author.name,
  publisher: siteConfig.author.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: siteConfig.seo.openGraph.type as 'website',
    locale: siteConfig.seo.openGraph.locale,
    url: siteConfig.url,
    siteName: siteConfig.seo.openGraph.siteName,
    title: siteConfig.name,
    description: siteConfig.description,
  },
  twitter: {
    card: siteConfig.seo.twitter.card as 'summary_large_image',
    site: siteConfig.seo.twitter.site,
    creator: siteConfig.seo.twitter.creator,
    title: siteConfig.name,
    description: siteConfig.description,
  },
  verification: {
    google: 'your-google-site-verification-code',
  },
  other: {
    'schema.org': JSON.stringify(generateSchemaOrgJsonLd()),
  },
};