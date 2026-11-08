import { monoFontFamily } from '@/lib/fonts';

export const CONTENT_MAX_WIDTH = 1072;
// Long-form text stays at a comfortable line length even though the page is wider.
export const READING_MAX_WIDTH = 760;

export const labelColumnSx = {
  display: 'grid',
  gridTemplateColumns: { xs: 'minmax(0, 1fr)', sm: '152px minmax(0, 1fr)' },
  columnGap: 4,
  rowGap: 0.25,
};

export const cardSx = {
  border: 1,
  borderColor: 'divider',
  borderRadius: 3,
  bgcolor: 'background.paper',
};

export const twoColumnSx = {
  display: 'grid',
  gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'minmax(0, 7fr) minmax(0, 5fr)' },
  columnGap: 8,
};

export const twoColumnReverseSx = {
  ...twoColumnSx,
  gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'minmax(0, 5fr) minmax(0, 7fr)' },
};

export const metaTextSx = {
  fontFamily: monoFontFamily,
  fontSize: '0.8125rem',
  lineHeight: '1.7rem',
  color: 'text.secondary',
};
