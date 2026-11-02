export type ResearchArea = {
  id: string;
  number: string;
  title: string;
  note: string;
  question: string;
  methods: string;
};

export type ArchivePublication = {
  title: string;
  authors: string;
  journal: string;
  year: string;
  discipline: string;
  type: string;
  doi?: string;
  template: boolean;
};

export type Milestone = {
  year: string;
  title: string;
  kind: string;
  detail: string;
};

export const profile = {
  name: 'Your Name',
  role: 'Biotechnology Researcher',
  affiliation: 'Add institutional affiliation',
  location: 'Add location',
  contactEmail: '',
  linkedin: '',
  googleScholar: '',
  orcid: '',
};

export const researchAreas: ResearchArea[] = [
  {
    id: 'molecular',
    number: '01',
    title: 'Molecular biology',
    note: 'Example topic · replace with your research focus',
    question: 'Add a question your work is investigating at the molecular scale.',
    methods: 'Add verified methods and approaches used in your research.',
  },
  {
    id: 'plant',
    number: '02',
    title: 'Plant biotechnology',
    note: 'Example topic · replace with your research focus',
    question: 'Describe a research question about plants, cells, or biological systems.',
    methods: 'Add the relevant experimental or computational methods.',
  },
  {
    id: 'genetics',
    number: '03',
    title: 'Genetics & engineering',
    note: 'Example topic · replace with your research focus',
    question: 'Add a specific, verified scientific question from your work.',
    methods: 'Add the methods that can be shared publicly.',
  },
  {
    id: 'cell',
    number: '04',
    title: 'Cell biology',
    note: 'Example topic · replace with your research focus',
    question: 'Describe the biological question and the context behind it.',
    methods: 'Add relevant imaging, assay, or analysis methods.',
  },
  {
    id: 'microbiology',
    number: '05',
    title: 'Microbiology',
    note: 'Example topic · replace with your research focus',
    question: 'Add a verified question about microorganisms or their systems.',
    methods: 'Add the methods and models used in your research.',
  },
  {
    id: 'bioinformatics',
    number: '06',
    title: 'Bioinformatics',
    note: 'Example topic · replace with your research focus',
    question: 'Add a research question informed by biological data.',
    methods: 'Add the tools, data types, and analytical methods you use.',
  },
];

export const publications: ArchivePublication[] = [
  {
    title: 'Add a verified publication title',
    authors: 'Add author names',
    journal: 'Add journal title',
    year: 'YEAR',
    discipline: 'Add research discipline',
    type: 'Publication type',
    template: true,
  },
];

export const milestones: Milestone[] = [
  {
    year: 'YEAR',
    title: 'Add a verified qualification',
    kind: 'Education',
    detail: 'Replace with the qualification, institution, and year.',
  },
  {
    year: 'YEAR',
    title: 'Add a research appointment',
    kind: 'Position',
    detail: 'Replace with a verified role, institution, and dates.',
  },
  {
    year: 'YEAR',
    title: 'Add teaching experience',
    kind: 'Teaching',
    detail: 'Replace with courses, supervision, or other verified teaching.',
  },
  {
    year: 'YEAR',
    title: 'Add an award or grant',
    kind: 'Recognition',
    detail: 'Only include publicly verifiable recognition or funded work.',
  },
];

export const gallery = [
  {
    src: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1400&q=85',
    alt: 'Sunlight falling across a small green plant',
    caption: 'Illustrative botanical image · replace with a research photograph',
    shape: 'gallery-tall',
  },
  {
    src: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=85',
    alt: 'Laboratory equipment arranged on a research bench',
    caption: 'Illustrative laboratory image · replace with your own',
    shape: 'gallery-wide',
  },
  {
    src: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=1200&q=85',
    alt: 'Colorful microscopic view of biological cells',
    caption: 'Illustrative microscopy image · replace with your own',
    shape: 'gallery-square',
  },
  {
    src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=85',
    alt: 'Soft morning light moving through a green landscape',
    caption: 'Illustrative field image · replace with your own',
    shape: 'gallery-wide',
  },
];
