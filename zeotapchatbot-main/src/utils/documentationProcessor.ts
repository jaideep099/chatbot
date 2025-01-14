import { Document } from '@/types/documentation';

// Enhanced TF-IDF implementation with cross-CDP comparison support
const calculateTFIDF = (term: string, doc: string, allDocs: string[]) => {
  const tf = doc.toLowerCase().split(' ').filter(word => word === term.toLowerCase()).length;
  const docsWithTerm = allDocs.filter(doc => doc.toLowerCase().includes(term.toLowerCase())).length;
  const idf = Math.log(allDocs.length / (docsWithTerm || 1));
  return tf * idf;
};

export const findRelevantDocs = (query: string, docs: Document[]): Document[] => {
  console.log('Processing query:', query);
  
  // Check if it's a comparison query
  const isComparisonQuery = query.toLowerCase().includes(' vs ') || 
    query.toLowerCase().includes('compare') || 
    query.toLowerCase().includes('difference');

  // Extract CDP names from query for comparison
  const cdpNames = ['segment', 'mparticle', 'lytics', 'zeotap'];
  const mentionedCDPs = cdpNames.filter(cdp => 
    query.toLowerCase().includes(cdp.toLowerCase())
  );

  const terms = query.toLowerCase()
    .split(' ')
    .filter(term => term.length > 2 && !['how', 'to', 'the', 'and', 'or'].includes(term));

  const scores = docs.map(doc => {
    let score = terms.reduce((sum, term) => {
      return sum + calculateTFIDF(term, doc.content, docs.map(d => d.content));
    }, 0);

    // Boost score for comparison queries
    if (isComparisonQuery && mentionedCDPs.includes(doc.source)) {
      score *= 1.5;
    }

    // Boost score for 'how-to' queries
    if (query.toLowerCase().includes('how to') && 
        doc.content.toLowerCase().includes('step')) {
      score *= 1.3;
    }

    return { ...doc, score };
  });

  console.log('Found matches:', scores.filter(doc => doc.score > 0).length);
  
  return scores
    .sort((a, b) => b.score - a.score)
    .filter(doc => doc.score > 0)
    .slice(0, 3);
};

// Enhanced mock documentation with comparison data
export const mockDocumentation: Document[] = [
  {
    id: '1',
    title: 'Segment Integration Guide',
    content: 'To integrate Segment, first create an account and obtain your write key. Then initialize the analytics object with your write key.',
    url: 'https://segment.com/docs/getting-started',
    source: 'segment'
  },
  {
    id: '2',
    title: 'mParticle Setup',
    content: 'Setting up mParticle requires creating a workspace and configuring your data inputs. Start by creating an input and getting your API credentials.',
    url: 'https://docs.mparticle.com/setup',
    source: 'mparticle'
  },
  {
    id: '3',
    title: 'Lytics Configuration',
    content: 'Configure Lytics by setting up your data streams and creating a new project. You\'ll need to set up authentication using your API token.',
    url: 'https://docs.lytics.com/config',
    source: 'lytics'
  },
  {
    id: '4',
    title: 'Segment vs Lytics: Audience Segmentation',
    content: 'Segment offers rule-based audience segmentation with real-time updates, while Lytics provides AI-powered behavioral scoring and predictive segments. Segment focuses on event-based triggers, whereas Lytics emphasizes machine learning for audience discovery.',
    url: 'https://docs.segment.com/audiences',
    source: 'segment'
  },
  {
    id: '5',
    title: 'Advanced Lytics Segmentation',
    content: 'Lytics behavioral scoring uses machine learning to automatically identify high-value audience segments based on user interactions and attributes. Step 1: Define behavior signals. Step 2: Set scoring criteria. Step 3: Apply machine learning models.',
    url: 'https://docs.lytics.com/segments',
    source: 'lytics'
  }
];