import { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';

interface SafeImageProps {
  src?: string;
  alt: string;
  sx?: SxProps<Theme>;
}

// Renders nothing when the image fails, so dead external links don't show a broken-image icon.
export default function SafeImage({ src, alt, sx }: SafeImageProps) {
  const ref = useRef<HTMLImageElement>(null);
  const [failed, setFailed] = useState(false);

  // An image can fail before hydration attaches onError, so check its state once on mount too.
  useEffect(() => {
    const img = ref.current;
    if (img?.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  if (!src || failed) return null;
  return (
    <Box
      component="img"
      ref={ref}
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      sx={sx}
    />
  );
}
