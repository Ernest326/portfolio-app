import NextLink from 'next/link';
import { Box, Link } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';
import { monoFontFamily } from '@/lib/fonts';

interface TagListProps {
  tags: string[];
  max?: number;
  onTagClick?: (tag: string) => void;
  linkTags?: boolean;
  // Bordered pills (as in the skills cards) instead of plain monospace text.
  pills?: boolean;
  sx?: SxProps<Theme>;
}

const textTagSx = {
  fontFamily: monoFontFamily,
  fontSize: '0.75rem',
  lineHeight: 1.6,
  color: 'text.secondary',
};

const pillTagSx = {
  display: 'inline-block',
  px: 1,
  py: 0.25,
  borderRadius: 1.5,
  border: 1,
  borderColor: 'divider',
  bgcolor: 'background.default',
  fontSize: '0.8125rem',
  lineHeight: 1.6,
  color: 'text.primary',
  textDecoration: 'none',
};

const interactiveTagSx = {
  ...textTagSx,
  p: 0,
  border: 0,
  background: 'none',
  cursor: 'pointer',
  '&:hover': { color: 'text.primary', textDecoration: 'underline' },
};

export default function TagList({ tags, max, onTagClick, linkTags, pills, sx }: TagListProps) {
  if (tags.length === 0) return null;

  const visible = max ? tags.slice(0, max) : tags;
  const hidden = tags.length - visible.length;
  const tagSx = pills ? pillTagSx : textTagSx;
  const linkHoverSx = pills ? { borderColor: 'text.secondary' } : { color: 'text.primary' };

  return (
    <Box
      component="ul"
      sx={[
        {
          listStyle: 'none',
          m: 0,
          p: 0,
          display: 'flex',
          flexWrap: 'wrap',
          columnGap: pills ? 0.75 : 1.5,
          rowGap: pills ? 0.75 : 0.5,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {visible.map((tag) => (
        <li key={tag}>
          {onTagClick ? (
            <Box component="button" type="button" onClick={() => onTagClick(tag)} sx={interactiveTagSx}>
              {tag}
            </Box>
          ) : linkTags ? (
            <Link
              component={NextLink}
              href={{ pathname: '/projects', query: { tag } }}
              underline={pills ? 'none' : 'hover'}
              sx={{ ...tagSx, '&:hover': linkHoverSx }}
            >
              {tag}
            </Link>
          ) : (
            <Box component="span" sx={tagSx}>
              {tag}
            </Box>
          )}
        </li>
      ))}
      {hidden > 0 && (
        <Box component="li" sx={tagSx}>
          +{hidden}
        </Box>
      )}
    </Box>
  );
}
