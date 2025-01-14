export interface Document {
  id: string;
  title: string;
  content: string;
  url: string;
  source: 'segment' | 'mparticle' | 'lytics' | 'zeotap';
  score?: number;
}