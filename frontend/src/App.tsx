import { useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronDown,
  Dna,
  Leaf,
  Menu,
  Microscope,
  Moon,
  MoveUpRight,
  Sun,
  X,
} from 'lucide-react';
import {
  gallery,
  milestones,
  profile,
  publications,
  researchAreas,
  type ArchivePublication,
  type Milestone,
  type ResearchArea,
} from './content';

const navigation = [
  { label: 'Perspective', href: '#perspective' },
  { label: 'Research', href: '#research' },
  { label: 'Stories', href: '#stories' },
  { label: 'Library', href: '#publications' },
  { label: 'Contact', href: '#contact' },
];

function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: reduceMotion ? 0 : 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({
  index,
  eyebrow,
  title,
  children,
  dark = false,
}: {
  index: string;
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  dark?: boolean;
}) {
  return (
    <div className={`section-heading ${dark ? 'section-heading-dark' : ''}`}>
      <div className="section-index">
        <span>{index}</span>
        <span className="index-rule" />
        <span>{eyebrow}</span>
      </div>
      <h2>{title}</h2>
      {children && <div className="section-heading-copy">{children}</div>}
    </div>
  );
}

function BotanicalLine({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`botanical-line ${className}`}
      viewBox="0 0 220 310"
      fill="none"
      aria-hidden="true"
    >
      <path pathLength={1} d="M111 300C108 244 106 199 113 153C119 111 135 72 176 25" />
      <path pathLength={1} d="M111 220C81 205 58 180 47 146C75 148 102 166 112 192" />
      <path pathLength={1} d="M113 173C144 158 166 131 174 96C146 101 123 119 115 147" />
      <path pathLength={1} d="M108 258C83 246 65 228 57 202C80 204 101 219 109 240" />
      <path pathLength={1} d="M124 129C114 103 115 78 130 54C145 73 148 99 135 119" />
      <path pathLength={1} d="M104 299H153" />
    </svg>
  );
}

function Header({ dark, onThemeChange }: { dark: boolean; onThemeChange: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [menuOpen]);

  return (
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label="The Living Archive, home">
        <span className="wordmark-mark"><Leaf size={17} strokeWidth={1.4} /></span>
        <span>THE LIVING ARCHIVE</span>
      </a>
      <nav id="main-navigation" className={`main-nav ${menuOpen ? 'main-nav-open' : ''}`} aria-label="Main navigation">
        {navigation.map((item) => (
          <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
            {item.label}
          </a>
        ))}
        <button
          className="theme-toggle mobile-theme-toggle"
          type="button"
          onClick={onThemeChange}
          aria-label={`Switch to ${dark ? 'light' : 'dark'} appearance`}
        >
          {dark ? <Sun size={16} /> : <Moon size={16} />}
          <span>{dark ? 'Light' : 'Dark'} appearance</span>
        </button>
      </nav>
      <div className="header-actions">
        <a className="header-contact" href="#contact">Start a conversation <ArrowUpRight size={14} /></a>
        <button
          className="theme-toggle desktop-theme-toggle"
          type="button"
          onClick={onThemeChange}
          aria-label={`Switch to ${dark ? 'light' : 'dark'} appearance`}
        >
          {dark ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-grain" aria-hidden="true" />
      <div className="hero-copy">
        <Reveal>
          <p className="eyebrow hero-eyebrow"><span className="eyebrow-dot" /> A researcher's field notes</p>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="hero-name">{profile.name}<span> · {profile.role}</span></p>
        </Reveal>
        <Reveal delay={0.14}>
          <h1 id="hero-title">
            Exploring the intricate systems that <em>make life possible.</em>
          </h1>
        </Reveal>
        <Reveal delay={0.22}>
          <p className="hero-description">
            Bridging molecular discovery, biological understanding, and scientific innovation.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <a className="text-link hero-link" href="#research">
            Explore the research <span className="link-arrow"><ArrowDown size={16} /></span>
          </a>
        </Reveal>
        <p className="hero-affiliation">{profile.affiliation}</p>
      </div>

      <div className="hero-art">
        <div className="hero-image-wrap">
          <img
            src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1600&q=88"
            alt="A young green plant opening toward the light"
            loading="eager"
          />
        </div>
        <div className="hero-image-caption">
          <span>01 / 06</span>
          <span>Life, observed closely</span>
        </div>
        <div className="hero-orbit">
          <span className="orbit-label">AREAS OF CURIOSITY</span>
          <span>Molecules</span>
          <i />
          <span>Living systems</span>
          <i />
          <span>Discovery</span>
        </div>
        <div className="hero-stamp" aria-hidden="true">
          <span>SCIENCE</span>
          <Dna size={24} strokeWidth={1.1} />
          <span>& NATURE</span>
        </div>
        <BotanicalLine className="hero-botanical" />
      </div>
      <div className="hero-side-note" aria-hidden="true">AN OPEN NOTEBOOK ON LIVING SYSTEMS</div>
    </section>
  );
}

function Perspective() {
  return (
    <section className="perspective section-pad" id="perspective">
      <SectionHeading index="01" eyebrow="A way of seeing" title={<>Curiosity is the beginning<br />of every <em>discovery.</em></>}>
        <p>
          Science begins with attention: to a pattern, an anomaly, a question that refuses to go away.
          This space brings together the ideas, observations, and conversations behind a research practice.
        </p>
        <p className="editable-note">Replace with a personal research philosophy and verified academic background.</p>
      </SectionHeading>
      <Reveal className="perspective-visual">
        <div className="perspective-image">
          <img
            src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1400&q=85"
            alt="An illustrative view of a laboratory research environment"
            loading="lazy"
          />
        </div>
        <div className="image-index">FIELD NOTE&nbsp; / &nbsp;01</div>
        <div className="perspective-note">
          <span className="note-mark">“</span>
          <p>Look closely.<br />Ask better questions.</p>
          <span className="note-caption">A working philosophy</span>
        </div>
        <BotanicalLine className="perspective-botanical" />
      </Reveal>
    </section>
  );
}

function ResearchEcosystem({
  activeArea,
  onSelect,
}: {
  activeArea: string;
  onSelect: (area: ResearchArea) => void;
}) {
  const active = researchAreas.find((area) => area.id === activeArea) ?? researchAreas[0];
  return (
    <section className="ecosystem section-pad" id="research">
      <div className="ecosystem-top">
        <SectionHeading index="02" eyebrow="The biological ecosystem" title={<>Questions in the<br /><em>living world.</em></>} />
        <p className="editable-note">Illustrative topics only · replace with your verified research interests.</p>
      </div>
      <div className="ecosystem-layout">
        <div className="domain-list" role="list" aria-label="Example research areas">
          {researchAreas.map((area) => (
            <button
              className={`domain-item ${active.id === area.id ? 'domain-item-active' : ''}`}
              key={area.id}
              type="button"
              onClick={() => onSelect(area)}
              aria-pressed={active.id === area.id}
            >
              <span className="domain-number">{area.number}</span>
              <span className="domain-title">{area.title}</span>
              <span className="domain-open">{active.id === area.id ? <Check size={16} /> : <ArrowUpRight size={16} />}</span>
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            className="domain-detail"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
          >
            <span className="detail-index">AREA {active.number} / EXAMPLE</span>
            <div className="detail-illustration"><Microscope size={43} strokeWidth={1} /></div>
            <h3>{active.title}</h3>
            <p className="domain-note">{active.note}</p>
            <div className="question-block">
              <span>THE QUESTION</span>
              <p>{active.question}</p>
            </div>
            <div className="question-block">
              <span>METHODS & APPROACHES</span>
              <p>{active.methods}</p>
            </div>
            <a className="text-link small-link" href="#stories">See research stories <ArrowRight size={15} /></a>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="ecosystem-foot"><span>01—06</span><span>Topics are editable in <code>src/content.ts</code></span><span>THE LIVING ARCHIVE</span></div>
    </section>
  );
}

function ResearchStory() {
  const visualRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: visualRef, offset: ['start end', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['-3%', '3%']);

  return (
    <section className="stories" id="stories">
      <div className="story-intro">
        <div className="story-intro-copy">
          <p className="eyebrow light-eyebrow"><span className="eyebrow-dot" /> Selected research</p>
          <h2>Every finding<br />begins with a <em>question.</em></h2>
          <p className="story-description">
            A space for the ideas, methods, and evidence behind a piece of research. Each story should
            make the science legible without losing its complexity.
          </p>
          <span className="story-tag">PROJECT STORY TEMPLATE</span>
        </div>
        <div className="story-visual" ref={visualRef}>
          <motion.img
            src="https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=1400&q=85"
            alt="Illustrative microscopic image with colorful biological structures"
            loading="lazy"
            style={{ y: imageY }}
          />
          <span className="story-image-label">ILLUSTRATIVE IMAGE · REPLACE WITH VERIFIED PROJECT IMAGERY</span>
          <div className="story-orbit" aria-hidden="true"><span>OBSERVE</span><span>QUESTION</span><span>UNDERSTAND</span></div>
        </div>
      </div>
      <div className="story-details">
        <div className="story-meta"><span>RESEARCH DISCIPLINE</span><span>YEAR</span><span>PUBLICATION / DOI</span></div>
        <div className="story-placeholder">
          <span className="story-number">01</span>
          <h3>Add a verified<br /><em>research story.</em></h3>
          <p>Introduce the scientific background, research objective, methods, key findings, and implications here. Leave out any detail that cannot be verified or shared publicly.</p>
          <a className="text-link small-link" href="#contact">Discuss a collaboration <ArrowUpRight size={15} /></a>
        </div>
        <div className="story-fields">
          <div><span>01 / OBJECTIVE</span><p>Add the research question and its context.</p></div>
          <div><span>02 / APPROACH</span><p>Describe verified methods and collaborators.</p></div>
          <div><span>03 / FINDINGS</span><p>Share results only when ready for public release.</p></div>
        </div>
      </div>
    </section>
  );
}

function PublicationArchive() {
  const [year, setYear] = useState('all');
  const [discipline, setDiscipline] = useState('all');
  const [type, setType] = useState('all');

  const years = useMemo(() => [...new Set(publications.map((item) => item.year))].sort().reverse(), []);
  const disciplines = useMemo(() => [...new Set(publications.map((item) => item.discipline))].sort(), []);
  const types = useMemo(() => [...new Set(publications.map((item) => item.type))].sort(), []);
  const filtered = publications.filter((item: ArchivePublication) =>
    (year === 'all' || item.year === year)
      && (discipline === 'all' || item.discipline === discipline)
      && (type === 'all' || item.type === type),
  );

  return (
    <section className="publications section-pad" id="publications">
      <div className="publication-heading">
        <SectionHeading index="03" eyebrow="The botanical library" title={<>A record of<br /><em>inquiry.</em></>}>
          <p>A considered archive of papers, reviews, and other contributions to the scientific conversation.</p>
        </SectionHeading>
        <BookOpen className="library-mark" size={76} strokeWidth={0.8} aria-hidden="true" />
      </div>
      <div className="archive-toolbar">
        <span className="archive-count">{publications.length.toString().padStart(2, '0')} RECORDS</span>
        <div className="archive-filters" aria-label="Filter publications">
          <label>
            <span className="sr-only">Filter by year</span>
            <select value={year} onChange={(event) => setYear(event.target.value)}>
              <option value="all">All years</option>
              {years.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
            <ChevronDown size={14} />
          </label>
          <label>
            <span className="sr-only">Filter by discipline</span>
            <select value={discipline} onChange={(event) => setDiscipline(event.target.value)}>
              <option value="all">All disciplines</option>
              {disciplines.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
            <ChevronDown size={14} />
          </label>
          <label>
            <span className="sr-only">Filter by publication type</span>
            <select value={type} onChange={(event) => setType(event.target.value)}>
              <option value="all">All types</option>
              {types.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
            <ChevronDown size={14} />
          </label>
        </div>
      </div>
      {filtered.length > 0 ? (
        <div className="publication-list">
          {filtered.map((publication, index) => (
            <article className="publication-row" key={`${publication.title}-${index}`}>
              <span className="publication-year">{publication.year}</span>
              <div className="publication-copy">
                <h3>{publication.title}</h3>
                <p>{publication.authors} · <em>{publication.journal}</em></p>
                {publication.template && <span className="publication-template-label">EDITABLE PLACEHOLDER · REPLACE WITH VERIFIED DETAILS</span>}
              </div>
              <span className="publication-discipline">{publication.discipline}</span>
              {publication.doi && <a className="publication-doi" href={`https://doi.org/${publication.doi}`} target="_blank" rel="noreferrer">View publication <MoveUpRight size={15} /></a>}
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-archive">
          <span className="empty-archive-mark"><BookOpen size={22} strokeWidth={1.2} /></span>
          <div>
            <h3>{publications.length === 0 ? 'The archive is ready for its first entry.' : 'No entries match these filters.'}</h3>
            <p>{publications.length === 0
              ? 'Add verified titles, author lists, journal details, years, and DOI links to the publications array in src/content.ts.'
              : 'Try a different year, discipline, or publication type.'}</p>
          </div>
        </div>
      )}
      <p className="archive-footnote">The sample row is an editable template, not a publication claim. Replace it with verified records in src/content.ts.</p>
    </section>
  );
}

function AcademicJourney() {
  const [open, setOpen] = useState<string | null>(milestones[0]?.title ?? null);
  return (
    <section className="journey section-pad" id="journey">
      <div className="journey-heading">
        <SectionHeading index="04" eyebrow="Growth rings" title={<>A journey shaped<br />by <em>questions.</em></>}>
          <p>Education, research, teaching, and the moments that move an academic life forward.</p>
        </SectionHeading>
      </div>
      {milestones.length > 0 ? (
        <div className="timeline">
          {milestones.map((event: Milestone) => (
            <article className={`timeline-item ${open === event.title ? 'timeline-item-open' : ''}`} key={`${event.year}-${event.title}`}>
              <span className="timeline-year">{event.year}</span>
              <span className="timeline-node" aria-hidden="true" />
              <button
                type="button"
                className="timeline-toggle"
                aria-expanded={open === event.title}
                onClick={() => setOpen(open === event.title ? null : event.title)}
              >
                <span className="timeline-kind">{event.kind}</span>
                <span className="timeline-title">{event.title}</span>
                <ChevronDown size={17} />
              </button>
              <AnimatePresence>
                {open === event.title && (
                  <motion.p
                    className="timeline-detail"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    {event.detail}
                  </motion.p>
                )}
              </AnimatePresence>
            </article>
          ))}
        </div>
      ) : (
        <div className="timeline-empty">
          <div className="timeline-empty-ring"><span /><span /><span /></div>
          <div><span className="eyebrow">YOUR ACADEMIC JOURNEY</span><h3>Milestones, in their own time.</h3>
            <p>Add verified qualifications, appointments, research positions, teaching, and awards to the milestones array in <code>src/content.ts</code>.</p>
          </div>
        </div>
      )}
    </section>
  );
}

function ResearchEnvironment({ onImageOpen }: { onImageOpen: (index: number) => void }) {
  return (
    <section className="environment section-pad" id="environment">
      <div className="environment-heading">
        <SectionHeading index="05" eyebrow="Inside the field notes" title={<>A closer look at<br /><em>discovery.</em></>}>
          <p>Small details, considered carefully. Replace these illustrative images with your own lab, field, and research photography.</p>
        </SectionHeading>
        <span className="environment-count">A VISUAL NOTEBOOK&nbsp; / &nbsp;04 FRAGMENTS</span>
      </div>
      <div className="gallery-grid">
        {gallery.map((image, index) => (
          <button
            className={`gallery-item ${image.shape}`}
            type="button"
            key={image.src}
            onClick={() => onImageOpen(index)}
            aria-label={`Open image: ${image.caption}`}
          >
            <img src={image.src} alt={image.alt} loading="lazy" />
            <span className="gallery-caption"><span>{image.caption}</span><ArrowUpRight size={17} /></span>
          </button>
        ))}
      </div>
    </section>
  );
}

function Teaching() {
  return (
    <section className="teaching section-pad" id="teaching">
      <div className="teaching-quote">
        <span className="eyebrow">A shared pursuit</span>
        <h2>Knowledge grows<br />when it is <em>shared.</em></h2>
        <p>Teaching is another way of looking closely: learning to ask better questions together, and making room for the next generation of ideas.</p>
        <span className="editable-note">Replace with your verified teaching and mentorship philosophy.</span>
      </div>
      <div className="teaching-list">
        <div className="teaching-list-heading"><span>TEACHING & MENTORSHIP</span><span>DETAILS TO ADD</span></div>
        {[
          { number: '01', title: 'Courses & subjects', detail: 'Add verified courses and areas of expertise.' },
          { number: '02', title: 'Research supervision', detail: 'Add current or completed supervision details.' },
          { number: '03', title: 'Workshops & seminars', detail: 'Add selected academic contributions.' },
        ].map((item) => (
          <div className="teaching-item" key={item.number}>
            <span className="teaching-number">{item.number}</span>
            <div><h3>{item.title}</h3><p>{item.detail}</p></div>
            <ArrowUpRight size={16} />
          </div>
        ))}
        <p className="teaching-note">Update this section with verified information before publishing.</p>
      </div>
      <BotanicalLine className="teaching-botanical" />
    </section>
  );
}

function Contact() {
  const [status, setStatus] = useState('');
  const [sending, setSending] = useState(false);

  function submitMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!profile.contactEmail.trim()) {
      setStatus('Add a verified recipient address to contactEmail in src/content.ts before enabling message delivery.');
      return;
    }

    const formData = new FormData(event.currentTarget);
    const sender = String(formData.get('name') ?? '').trim();
    const senderEmail = String(formData.get('email') ?? '').trim();
    const message = String(formData.get('message') ?? '').trim();
    const subject = encodeURIComponent(`Research inquiry from ${sender}`);
    const body = encodeURIComponent(`${message}\n\n${sender}\n${senderEmail}`);
    setSending(true);
    window.location.href = `mailto:${profile.contactEmail}?subject=${subject}&body=${body}`;
    setStatus('Your email application should open with the message ready to send.');
    setSending(false);
  }

  const profiles = [
    { label: 'LinkedIn', href: profile.linkedin },
    { label: 'Google Scholar', href: profile.googleScholar },
    { label: 'ORCID', href: profile.orcid },
  ];

  return (
    <section className="contact" id="contact">
      <div className="contact-grain" aria-hidden="true" />
      <BotanicalLine className="contact-botanical" />
      <div className="contact-content">
        <SectionHeading index="06" eyebrow="Let ideas grow" dark title={<>Every meaningful discovery<br />begins with a <em>conversation.</em></>}>
          <p>For research collaborations, academic correspondence, and thoughtful questions.</p>
        </SectionHeading>
        <div className="contact-lower">
          <div className="contact-details">
            <span className="contact-label">INSTITUTIONAL AFFILIATION</span>
            <p>{profile.affiliation}</p>
            <span className="contact-label">ACADEMIC PROFILES</span>
            <div className="profile-links">
              {profiles.map((item) => item.href ? (
                <a key={item.label} href={item.href} target="_blank" rel="noreferrer">{item.label}<ArrowUpRight size={13} /></a>
              ) : (
                <span key={item.label} className="profile-unset">{item.label} · add URL</span>
              ))}
            </div>
            <p className="contact-config-note">Add verified profile URLs in <code>src/content.ts</code> to activate links.</p>
          </div>
          <form className="contact-form" onSubmit={submitMessage}>
            <label>
              <span>Your name</span>
              <input name="name" type="text" autoComplete="name" placeholder="How should I address you?" required />
            </label>
            <label>
              <span>Email address</span>
              <input name="email" type="email" autoComplete="email" placeholder="you@institution.org" required />
            </label>
            <label>
              <span>Your message</span>
              <textarea name="message" rows={3} placeholder="A few words about what brings you here…" required />
            </label>
            <button className="contact-submit" type="submit" disabled={sending}>
              Prepare a message <ArrowUpRight size={16} />
            </button>
            <p className="form-status" role="status" aria-live="polite">
              {status || 'Message delivery uses your email application; add a recipient address in src/content.ts.'}
            </p>
          </form>
        </div>
        <div className="contact-footer">
          <span>THE LIVING ARCHIVE</span>
          <span>{profile.location}</span>
          <a href="#top">Back to the beginning <ArrowUpRight size={13} /></a>
        </div>
      </div>
    </section>
  );
}

function ImageLightbox({ imageIndex, onClose, onMove }: {
  imageIndex: number | null;
  onClose: () => void;
  onMove: (direction: -1 | 1) => void;
}) {
  useEffect(() => {
    if (imageIndex === null) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') onMove(1);
      if (event.key === 'ArrowLeft') onMove(-1);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [imageIndex, onClose, onMove]);

  const image = imageIndex === null ? null : gallery[imageIndex];
  return (
    <AnimatePresence>
      {image && (
        <motion.div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <button className="lightbox-close" onClick={onClose} aria-label="Close image viewer" type="button"><X size={21} /></button>
          <button className="lightbox-prev" onClick={(event) => { event.stopPropagation(); onMove(-1); }} aria-label="Previous image" type="button">←</button>
          <figure onClick={(event) => event.stopPropagation()}>
            <img src={image.src} alt={image.alt} />
            <figcaption>{image.caption}</figcaption>
          </figure>
          <button className="lightbox-next" onClick={(event) => { event.stopPropagation(); onMove(1); }} aria-label="Next image" type="button">→</button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  const [dark, setDark] = useState(false);
  const [activeArea, setActiveArea] = useState(researchAreas[0].id);
  const [imageIndex, setImageIndex] = useState<number | null>(null);

  function moveImage(direction: -1 | 1) {
    setImageIndex((current) => current === null ? null : (current + direction + gallery.length) % gallery.length);
  }

  return (
    <div className={`site-shell ${dark ? 'theme-dark' : ''}`}>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header dark={dark} onThemeChange={() => setDark((value) => !value)} />
      <main id="main">
        <Hero />
        <Perspective />
        <ResearchEcosystem activeArea={activeArea} onSelect={(area) => setActiveArea(area.id)} />
        <ResearchStory />
        <PublicationArchive />
        <AcademicJourney />
        <ResearchEnvironment onImageOpen={setImageIndex} />
        <Teaching />
        <Contact />
      </main>
      <ImageLightbox
        imageIndex={imageIndex}
        onClose={() => setImageIndex(null)}
        onMove={moveImage}
      />
    </div>
  );
}
