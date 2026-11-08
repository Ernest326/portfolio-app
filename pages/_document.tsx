import { Head, Html, Main, NextScript } from 'next/document';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </Head>
      <body>
        {/* Applies the saved/system colour scheme before first paint, so dark mode never flashes. */}
        <InitColorSchemeScript attribute="class" defaultMode="system" />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
