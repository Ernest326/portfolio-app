import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { Box, Typography, Alert } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface MarkdownPreviewProps {
  content: string;
}

export default function MarkdownPreview({ content }: MarkdownPreviewProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  function getTextFromChildren(children: any): string {
    if (typeof children === 'string') return children;
    if (Array.isArray(children)) return children.map(getTextFromChildren).join('');
    if (children?.props?.children) return getTextFromChildren(children.props.children);
    return '';
  }

  return (
    <Box
      sx={{
        border: '1px solid',
        borderColor: theme.palette.divider,
        borderRadius: 2,
        p: 3,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        overflowX: 'auto',
      }}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 4 }}>
              {children}
            </Typography>
          ),
          h2: ({ children }) => (
            <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
              {children}
            </Typography>
          ),
          p: ({ children }) => (
            <Typography variant="body1" paragraph>
              {children}
            </Typography>
          ),
          li: ({ children }) => (
            <li>
              <Typography variant="body1" component="span">
                {children}
              </Typography>
            </li>
          ),
          code({ inline, className, children, ...props } : any) {
            const match = /language-(\w+)/.exec(className || '');

            return !inline && match ? (
              <SyntaxHighlighter
                style={isDark ? oneDark : oneLight}
                language={match[1]}
                PreTag="div"
                wrapLongLines
                customStyle={{
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  margin: '1rem 0',
                }}
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <Box
                component="code"
                sx={{
                  backgroundColor: isDark ? '#2d2d2d' : '#eee',
                  px: 1,
                  py: 0.5,
                  borderRadius: 1,
                  fontSize: '0.85rem',
                  fontFamily: 'monospace',
                }}
                {...props}
              >
                {children}
              </Box>
            );
          },
          img({ src, alt }) {
            return (
              <Box
                component="img"
                src={src || ''}
                alt={alt || ''}
                sx={{
                  maxWidth: '100%',
                  borderRadius: 2,
                  my: 3,
                  boxShadow: 2,
                }}
              />
            );
          },
          blockquote({ children }) {

            let raw = getTextFromChildren(children).trim();

            if (raw.startsWith('Note:')) {
              return (
                <Alert severity="info" sx={{ my: 2 }}>
                  {raw.replace(/^Note:\s*/, '')}
                </Alert>
              );
            }
          
            if (raw.startsWith('Warning:')) {
              return (
                <Alert severity="warning" sx={{ my: 2 }}>
                  {raw.replace(/^Warning:\s*/, '')}
                </Alert>
              );
            }
          
            if (raw.startsWith('Error:')) {
              return (
                <Alert severity="error" sx={{ my: 2 }}>
                  {raw.replace(/^Error:\s*/, '')}
                </Alert>
              );
            }

            return (
              <Box
                component="blockquote"
                sx={{
                  borderLeft: 4,
                  borderColor: 'primary.main',
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#1e1e1e' : '#f5f5f5',
                  px: 2,
                  py: 1,
                  my: 2,
                  mx: 0,
                  fontStyle: 'italic',
                  color: 'text.secondary',
                }}
              >
                {children}
              </Box>
            );
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </Box>
  );
}
