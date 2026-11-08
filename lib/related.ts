import type { ProjectSummary } from '@/lib/types';

// Ranks other projects by how many tags they share with this one (case-insensitive), newest first on ties.
export function relatedProjects(project: ProjectSummary, all: ProjectSummary[], count = 3): ProjectSummary[] {
  const tags = new Set(project.tags.map((tag) => tag.toLowerCase()));
  return all
    .filter((other) => other.slug !== project.slug)
    .map((other) => ({ other, shared: other.tags.filter((tag) => tags.has(tag.toLowerCase())).length }))
    .sort((a, b) => b.shared - a.shared || (b.other.createdAt ?? '').localeCompare(a.other.createdAt ?? ''))
    .slice(0, count)
    .map(({ other }) => other);
}
