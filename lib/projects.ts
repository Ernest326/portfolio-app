import type { Document, WithId } from 'mongodb';
import clientPromise from '@/lib/mongodb';
import type { EditableProjectFields, Project, ProjectSummary } from '@/lib/types';

const DB_NAME = 'portfolio';

async function database() {
  return (await clientPromise).db(DB_NAME);
}

function toIsoString(value: unknown): string | null {
  if (!value) return null;
  const date = new Date(value as string | number | Date);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

function toSummary(doc: WithId<Document>): ProjectSummary {
  return {
    _id: doc._id.toString(),
    title: String(doc.title ?? ''),
    slug: String(doc.slug ?? ''),
    description: String(doc.description ?? ''),
    coverImage: String(doc.coverImage ?? ''),
    status: String(doc.status ?? ''),
    tags: Array.isArray(doc.tags) ? doc.tags.map(String) : [],
    createdAt: toIsoString(doc.createdAt),
    updatedAt: toIsoString(doc.updatedAt),
  };
}

const newestFirst = (a: ProjectSummary, b: ProjectSummary) =>
  (b.createdAt ?? '').localeCompare(a.createdAt ?? '');

export async function getProjectSummaries(): Promise<ProjectSummary[]> {
  const db = await database();
  const docs = await db.collection('projects').find({}, { projection: { content: 0 } }).toArray();
  return docs.map(toSummary).sort(newestFirst);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const db = await database();
  const doc = await db.collection('projects').findOne({ slug });
  if (!doc) return null;
  return {
    ...toSummary(doc),
    content: String(doc.content ?? ''),
    githubUrl: String(doc.githubUrl ?? ''),
    liveUrl: String(doc.liveUrl ?? ''),
  };
}

export async function getPinnedSlugs(): Promise<string[]> {
  const db = await database();
  const settings = await db
    .collection<{ _id: string; pinnedProjects?: unknown }>('settings')
    .findOne({ _id: 'global' });
  return Array.isArray(settings?.pinnedProjects) ? settings.pinnedProjects.map(String) : [];
}

const STRING_FIELDS = ['title', 'slug', 'content', 'description', 'coverImage', 'status', 'githubUrl', 'liveUrl'] as const;
const LINK_FIELDS = ['githubUrl', 'liveUrl'] as const;

export function pickProjectFields(body: unknown): EditableProjectFields {
  const source = (typeof body === 'object' && body !== null ? body : {}) as Record<string, unknown>;
  const fields: EditableProjectFields = {};
  for (const key of STRING_FIELDS) {
    const value = source[key];
    if (typeof value === 'string') fields[key] = value;
  }
  if (Array.isArray(source.tags)) {
    fields.tags = source.tags.filter((tag): tag is string => typeof tag === 'string');
  }
  return fields;
}

// Link fields are rendered as hrefs, so only allow empty values or real http(s) URLs (never javascript: etc.).
export function projectFieldError(fields: EditableProjectFields): string | null {
  for (const key of LINK_FIELDS) {
    const value = fields[key]?.trim();
    if (!value) continue;
    try {
      const { protocol } = new URL(value);
      if (protocol === 'http:' || protocol === 'https:') continue;
    } catch {
      // fall through to the error below
    }
    return `${key} must be an http(s) URL`;
  }
  return null;
}
