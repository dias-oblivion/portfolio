type Project = {
  id: 'markdown-editor' | 'db-query-app' | 'focus-guard';
  imagePath: string;
  githubUrl: string | null;
  liveUrl: string | null;
  featureCount: number;
};

export const PROJECTS: Project[] = [
  {
    id: 'markdown-editor',
    imagePath: './assets/markdown-editor.jpg',
    githubUrl: 'https://github.com/dias-oblivion/markdown-editor',
    liveUrl: null,
    featureCount: 4
  },
  {
    id: 'db-query-app',
    imagePath: './assets/db-query-app.jpg',
    githubUrl: null,
    liveUrl: null,
    featureCount: 4
  },
  {
    id: 'focus-guard',
    imagePath: './assets/focus-guard.jpg',
    githubUrl: null,
    liveUrl: null,
    featureCount: 3
  }
];
