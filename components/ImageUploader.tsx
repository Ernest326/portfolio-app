import { useState } from 'react';
import { Box, Typography, Button, CircularProgress } from '@mui/material';

interface ImageUploaderProps {
  onUpload: (imageMarkdown: string) => void;
}

export default function ImageUploader({ onUpload }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'portfolio-posts'); // ⬅️ Replace
    formData.append('folder', 'portfolio-posts'); // optional

    setUploading(true);

    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/di6gipnxj/image/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      const imageUrl = data.secure_url;

      const markdown = `![Image](${imageUrl})`;
      onUpload(markdown); // Pass markdown back to parent

    } catch (err) {
      alert('Upload failed');
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box mt={2}>
      <Typography variant="subtitle1" gutterBottom>
        Upload Image to Embed:
      </Typography>
      <Button variant="outlined" component="label" disabled={uploading}>
        {uploading ? 'Uploading...' : 'Choose Image'}
        <input
          type="file"
          accept="image/*"
          hidden
          onChange={handleImageUpload}
        />
      </Button>
      {uploading && <CircularProgress size={24} sx={{ ml: 2 }} />}
    </Box>
  );
}