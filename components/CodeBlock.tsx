import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeBlockProps {
  code: string;
  language?: string;
}

const resetStyle = { margin: 0, padding: 0, background: 'transparent', fontSize: 'inherit', lineHeight: 'inherit' };

export default function CodeBlock({ code, language }: CodeBlockProps) {
  return (
    <div className="md-code">
      {language ? (
        <SyntaxHighlighter
          language={language}
          style={oneDark}
          PreTag="pre"
          customStyle={resetStyle}
          codeTagProps={{ style: { fontFamily: 'inherit' } }}
        >
          {code}
        </SyntaxHighlighter>
      ) : (
        <pre>
          <code>{code}</code>
        </pre>
      )}
    </div>
  );
}
