type Project = {
  id: 'markdown-editor' | 'db-query-app' | 'focus-guard';
  imagePath: string;
  githubUrl: string | null;
  liveUrl: string | null;
  featureCount: number;
  tech: string[];
};

export const PROJECTS: Project[] = [
  {
    id: 'markdown-editor',
    imagePath: './assets/markdown-editor.jpg',
    githubUrl: 'https://github.com/dias-oblivion/markdown-editor',
    liveUrl: null,
    featureCount: 4,
    tech: ['React', 'TypeScript', 'Electron', 'Vite']
  },
  {
    id: 'db-query-app',
    imagePath: './assets/db-query-app.jpg',
    githubUrl: null,
    liveUrl: null,
    featureCount: 4,
    tech: ['React', 'TypeScript', 'Electron', 'PostgreSQL', 'SQLite']
  },
  {
    id: 'focus-guard',
    imagePath: './assets/focus-guard.jpg',
    githubUrl: null,
    liveUrl: null,
    featureCount: 3,
    tech: ['React', 'TypeScript', 'Chrome Extensions API']
  }
];
