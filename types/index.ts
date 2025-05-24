export interface GistFile {
  filename: string;
  type: string;
  language: string;
  raw_url: string;
  size: number;
  truncated: boolean;
  content?: string;
}

export interface Gist {
  id: string;
  description: string;
  public: boolean;
  created_at: string;
  updated_at: string;
  files: Record<string, GistFile>;
  owner: {
    login: string;
    id: number;
    avatar_url: string;
    url: string;
    html_url: string;
  };
}

export interface PostMetadata {
  date?: string;
  tags?: string[];
  excerpt?: string;
  image?: string;
}

export interface Post extends Gist {
  metadata?: PostMetadata;
  content?: string;
}
