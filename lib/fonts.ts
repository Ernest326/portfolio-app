import { Geist, Geist_Mono } from 'next/font/google';

const geistSans = Geist({ subsets: ['latin'], display: 'swap' });
const geistMono = Geist_Mono({ subsets: ['latin'], display: 'swap' });

export const sansFontFamily = `${geistSans.style.fontFamily}, ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif`;
export const monoFontFamily = `${geistMono.style.fontFamily}, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;
