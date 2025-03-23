import { useState, useEffect } from 'react';
import {TextField, Button, Typography, Box, FormControl, MenuItem, Select, InputLabel, Autocomplete} from '@mui/material';
import MarkdownPreview from '@/components/MarkdownPreview';
import ImageUploader from '@/components/ImageUploader';

interface ProjectFormProps {
    initialData?: any;
    onSubmit: (data: any) => Promise<void>;
}

export default function ProjectForm({initialData, onSubmit}: ProjectFormProps) {

  const [title, setTitle] = useState(initialData?.title || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [status, setStatus] = useState(initialData?.status || '');
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);
  const [content, setContent] = useState(initialData?.content || '');
  const [coverImage, setCoverImage] = useState(initialData?.coverImage || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({ title, slug, description, content, coverImage, status, tags });
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField label="Title" fullWidth required value={title} onChange={e => setTitle(e.target.value)} margin="normal" />

      <ImageUploader onUpload={(markdown) => {
          const url = markdown.match(/\((.*?)\)/)?.[1]; // Extract URL from markdown
          if (url) setCoverImage(url);
      }} />
      {coverImage && (<Box component="img" src={coverImage} alt="Cover Preview" sx={{ width: '100%', maxHeight: 200, objectFit: 'cover', mt: 2, borderRadius: 2 }}/>)}

      <TextField label="Slug" fullWidth required value={slug} onChange={e => setSlug(e.target.value)} margin="normal" />
      <FormControl fullWidth margin="normal">
      <InputLabel>Status</InputLabel>
          <Select value={status} label="Status" onChange={(e) => setStatus(e.target.value as typeof status)}>
              <MenuItem value="Completed">Completed</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Planned">Planned</MenuItem>
              <MenuItem value="Dropped">Dropped</MenuItem>
          </Select>
      </FormControl>
      <Autocomplete multiple freeSolo options={[]} value={tags} onChange={(_, newValue) => setTags(newValue)} renderInput={(params) => (
          <TextField {...params} variant="outlined" label="Tags / Technologies" placeholder="Add tags (e.g. React, MongoDB)" margin="normal" fullWidth/>
          )}
      />
      <TextField label="Description" fullWidth value={description} onChange={e => setDescription(e.target.value)} margin="normal" />
      <ImageUploader onUpload={(imageMarkdown) => setContent((prev:any) => prev + `\n\n${imageMarkdown}\n\n`)}/>
      <TextField label="Markdown Content" fullWidth required multiline minRows={6} value={content} onChange={e => setContent(e.target.value)} margin="normal" />

      <Typography variant="subtitle1" sx={{mt:3}}> Live Preview:</Typography>
      <Box sx={{ border: '1px solid #ccc', borderRadius: 2, p: 2, backgroundColor: '#f9f9f9', whiteSpace: 'pre-wrap', mt: 1,}}>
      <MarkdownPreview content={content}></MarkdownPreview>
      </Box>

      <Box mt={2}>
        <Button type="submit" variant="contained" color="error">Submit Project</Button>
      </Box>
    </form>

  );
}
