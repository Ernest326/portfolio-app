import { useState } from 'react';
import { Autocomplete, Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import ImageUploader from '@/components/ImageUploader';
import MarkdownPreview from '@/components/MarkdownPreview';
import { PROJECT_STATUSES, type Project } from '@/lib/types';
import { READING_MAX_WIDTH } from '@/lib/ui';

export type ProjectFormData = Pick<
  Project,
  'title' | 'slug' | 'description' | 'content' | 'coverImage' | 'status' | 'tags' | 'githubUrl' | 'liveUrl'
>;

interface ProjectFormProps {
  initialData?: Partial<Project>;
  onSubmit: (data: ProjectFormData) => Promise<void>;
}

export default function ProjectForm({ initialData, onSubmit }: ProjectFormProps) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [status, setStatus] = useState(initialData?.status || '');
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);
  const [content, setContent] = useState(initialData?.content || '');
  const [coverImage, setCoverImage] = useState(initialData?.coverImage || '');
  const [githubUrl, setGithubUrl] = useState(initialData?.githubUrl || '');
  const [liveUrl, setLiveUrl] = useState(initialData?.liveUrl || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({ title, slug, description, content, coverImage, status, tags, githubUrl, liveUrl });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: READING_MAX_WIDTH }}>
      <TextField label="Title" fullWidth required value={title} onChange={(e) => setTitle(e.target.value)} margin="normal" />

      <ImageUploader
        onUpload={(markdown) => {
          const url = markdown.match(/\((.*?)\)/)?.[1];
          if (url) setCoverImage(url);
        }}
      />
      <TextField label="Cover image URL" fullWidth value={coverImage} onChange={(e) => setCoverImage(e.target.value)} margin="normal" />
      {coverImage && (
        <Box
          component="img"
          src={coverImage}
          alt="Cover preview"
          sx={{ width: '100%', maxHeight: 200, objectFit: 'cover', mt: 2, borderRadius: 2, border: 1, borderColor: 'divider' }}
        />
      )}

      <TextField label="Slug" fullWidth required value={slug} onChange={(e) => setSlug(e.target.value)} margin="normal" />
      <FormControl fullWidth margin="normal">
        <InputLabel>Status</InputLabel>
        <Select value={status} label="Status" onChange={(e) => setStatus(e.target.value)}>
          {PROJECT_STATUSES.map((value) => (
            <MenuItem key={value} value={value}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Autocomplete
        multiple
        freeSolo
        options={[]}
        value={tags}
        onChange={(_, newValue) => setTags(newValue)}
        renderInput={(params) => (
          <TextField {...params} label="Tags / Technologies" placeholder="Add tags (e.g. React, MongoDB)" margin="normal" fullWidth />
        )}
      />
      <TextField label="Description" fullWidth value={description} onChange={(e) => setDescription(e.target.value)} margin="normal" />
      <TextField
        label="GitHub URL"
        type="url"
        fullWidth
        value={githubUrl}
        onChange={(e) => setGithubUrl(e.target.value)}
        margin="normal"
        placeholder="https://github.com/Ernest326/..."
      />
      <TextField
        label="Live site URL"
        type="url"
        fullWidth
        value={liveUrl}
        onChange={(e) => setLiveUrl(e.target.value)}
        margin="normal"
      />
      <ImageUploader onUpload={(imageMarkdown) => setContent((prev) => `${prev}\n\n${imageMarkdown}\n\n`)} />
      <TextField
        label="Markdown content"
        fullWidth
        required
        multiline
        minRows={6}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        margin="normal"
      />

      <Typography variant="overline" component="p" color="textSecondary" sx={{ mt: 3, mb: 1 }}>
        Live preview
      </Typography>
      <Box sx={{ border: 1, borderColor: 'divider', borderRadius: 2, p: { xs: 2, sm: 3 } }}>
        <MarkdownPreview content={content} />
      </Box>

      <Button type="submit" variant="contained" sx={{ mt: 3 }}>
        Save project
      </Button>
    </Box>
  );
}
