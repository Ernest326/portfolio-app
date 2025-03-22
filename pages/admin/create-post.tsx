import { useState, useEffect } from 'react';
import {Container, TextField, Button, Typography, Box, FormControl, MenuItem, Select, InputLabel, Autocomplete} from '@mui/material';
import MarkdownPreview from '@/components/MarkdownPreview';
import ImageUploader from '@/components/ImageUploader';
import { useAdmin } from '@/context/AdminContext';
import AdminLogin from './login';

export default function CreatePost() {

  const { isAdmin, logout } = useAdmin();
  const [token, setToken] = useState('');
  const [authenticated, setAuthenticated] = useState(false);

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-secret': token,
      },
      body: JSON.stringify({ title, slug, description, content, coverImage, status, tags }),
    });

    if (res.ok) {
      setSuccess(true);
      setTitle('');
      setSlug('');
      setDescription('');
      setContent('');
      setCoverImage('');
      setStatus('');
      setTags([]);
    } else {
      alert('Failed to create project');
    }
  };

  return (

    <Container maxWidth="sm" sx={{ mt: 4 }}>
      {!isAdmin ? (
        <>
          <AdminLogin/>
        </>
      ) : (
        <>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h4" gutterBottom>Create New Project</Typography>
            <Button color="error" onClick={logout}>Logout</Button>
          </Box>

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
                </Select>
            </FormControl>
            <Autocomplete multiple freeSolo options={[]} value={tags} onChange={(_, newValue) => setTags(newValue)} renderInput={(params) => (
                <TextField {...params} variant="outlined" label="Tags / Technologies" placeholder="Add tags (e.g. React, MongoDB)" margin="normal" fullWidth/>
                )}
            />
            <TextField label="Description" fullWidth value={description} onChange={e => setDescription(e.target.value)} margin="normal" />
            <ImageUploader onUpload={(imageMarkdown) => setContent((prev) => prev + `\n\n${imageMarkdown}\n\n`)}/>
            <TextField label="Markdown Content" fullWidth required multiline minRows={6} value={content} onChange={e => setContent(e.target.value)} margin="normal" />

            <Typography variant="subtitle1" sx={{mt:3}}> Live Preview:</Typography>
            <Box sx={{ border: '1px solid #ccc', borderRadius: 2, p: 2, backgroundColor: '#f9f9f9', whiteSpace: 'pre-wrap', mt: 1,}}>
            <MarkdownPreview content={content}></MarkdownPreview>
            </Box>

            <Box mt={2}>
              <Button type="submit" variant="contained" color="primary">Create Project</Button>
            </Box>
            {success && (
              <Typography color="success.main" mt={2}>✅ Project created successfully!</Typography>
            )}
          </form>
        </>
      )}
    </Container>

  );
}
