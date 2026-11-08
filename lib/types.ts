export const PROJECT_STATUSES = ['Completed', 'In Progress', 'Planned', 'On Hold', 'Dropped'] as const;

export interface ProjectSummary {
  _id: string;
  title: string;
  slug: string;
  description: string;
  coverImage: string;
  status: string;
  tags: string[];
  createdAt: string | null;
  updatedAt: string | null;
}

export interface Project extends ProjectSummary {
  content: string;
  githubUrl: string;
  liveUrl: string;
}

export type EditableProjectFields = Partial<
  Pick<Project, 'title' | 'slug' | 'content' | 'description' | 'coverImage' | 'status' | 'tags' | 'githubUrl' | 'liveUrl'>
>;
