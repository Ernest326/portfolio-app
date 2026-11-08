// GitHub serves the same file from /blob/...?raw=true and /raw/..., so treat those as equal.
function normalizeImageUrl(url: string): string {
  return url.trim().replace('/blob/', '/raw/').replace(/\?raw=true$/, '');
}

export function contentHasImage(content: string, imageUrl: string): boolean {
  const target = normalizeImageUrl(imageUrl);
  return Array.from(content.matchAll(/!\[[^\]]*\]\(\s*<?([^)\s>]+)/g)).some(
    (match) => normalizeImageUrl(match[1]) === target,
  );
}

const MARKDOWN_LINK = /\[([^\]]*)\]\(\s*<?([^)\s>]+)>?\s*\)/g;
const GITHUB_URL = /^https?:\/\/(www\.)?github\.com\//i;
const normalizeText = (text: string) => text.toLowerCase().replace(/[^a-z0-9]/g, '');

/**
 * Display-only tidy-up of a post's opening lines (the stored text is never modified).
 * Posts often start with a heading that repeats the page title and/or a bare "GitHub page" link;
 * those are dropped from the body and the GitHub URL is returned so the page can show it as a button.
 */
export function preparePostContent(content: string, title: string): { content: string; sourceUrl: string | null } {
  const lines = content.split('\n');
  let sourceUrl: string | null = null;
  let inspected = 0;

  for (let i = 0; i < lines.length && inspected < 4; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    inspected++;

    const heading = /^#{1,6}\s+(.*)$/.exec(line);
    const text = heading ? heading[1] : line;
    const links = Array.from(text.matchAll(MARKDOWN_LINK));
    const githubLink = links.find((link) => GITHUB_URL.test(link[2]));
    const remainder = text.replace(MARKDOWN_LINK, '').trim();

    const headingText = normalizeText(remainder);
    const titleText = normalizeText(title);
    // A heading that equals the title, or is the start of it ("KarbonV2" for "KarbonV2 Game Engine"), adds nothing.
    const repeatsTitle =
      heading !== null &&
      headingText.length >= 4 &&
      titleText.startsWith(headingText) &&
      links.every((link) => GITHUB_URL.test(link[2]));
    const isLoneGithubLink = remainder === '' && links.length === 1 && githubLink !== undefined;

    if (repeatsTitle || isLoneGithubLink) {
      sourceUrl ??= githubLink?.[2] ?? null;
      lines[i] = '';
      continue;
    }
    // Keep scanning past other headings, but stop at the first real paragraph.
    if (!heading) break;
  }

  return { content: lines.join('\n').trimStart(), sourceUrl };
}

export function excerpt(markdown: string, maxLength = 160): string {
  const text = markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/^#{1,6}\s+.*$/gm, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(MARKDOWN_LINK, '$1')
    .replace(/^>\s?/gm, '')
    .replace(/[*_`~]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (text.length <= maxLength) return text;
  return `${text.slice(0, text.lastIndexOf(' ', maxLength)).trimEnd()}…`;
}
