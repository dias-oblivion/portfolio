import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Github, Linkedin, Mail, ArrowRight,
  Terminal, Database, Layout, Cloud, Server, Menu, X, ChevronRight,
  ChevronLeft, Maximize, Minimize
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import i18n from './i18n';
import { PROJECTS } from './data/projects';
import screenshotEditor from './assets/markdown-editor.jpg';
import screenshotDbQuery from './assets/db-query-app.png';
import screenshotFocusGuard from './assets/focus-guard.png';

const projectImages: Record<string, string> = {
  'markdown-editor': screenshotEditor,
  'db-query-app': screenshotDbQuery,
  'focus-guard': screenshotFocusGuard
};

// ── Navbar ────────────────────────────────────────────────────────────────────

const Navbar = () => {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { name: t('nav.about'), id: 'sobre' },
    { name: t('nav.skills'), id: 'tecnologias' },
    { name: t('nav.projects'), id: 'projetos' },
    { name: t('nav.contact'), id: 'contato' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass py-3 shadow-sm' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <motion.button
          onClick={() => scrollToSection('sobre')}
          className="font-display font-bold text-xl tracking-tight flex items-center gap-2 cursor-pointer"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <span className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">G</span>
          <span>Gabriel<span className="text-brand-600">.</span></span>
        </motion.button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <motion.button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="text-sm font-medium text-zinc-600 hover:text-brand-600 transition-colors cursor-pointer"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              {link.name}
            </motion.button>
          ))}
          <motion.button
            onClick={() => {
              const newLang = i18n.language === 'en-US' ? 'pt-BR' : 'en-US';
              i18n.changeLanguage(newLang);
            }}
            className="px-4 py-2 bg-zinc-900 text-white text-xs font-bold rounded-full hover:bg-zinc-700 transition-colors cursor-pointer"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            {i18n.language === 'en-US' ? 'EN-US' : 'PT-BR'}
          </motion.button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-zinc-900 cursor-pointer"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-zinc-100 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-lg font-medium text-zinc-900 text-left cursor-pointer"
                >
                  {link.name}
                </button>
              ))}
              <button
                onClick={() => {
                  const newLang = i18n.language === 'en-US' ? 'pt-BR' : 'en-US';
                  i18n.changeLanguage(newLang);
                }}
                className="w-fit px-4 py-2 bg-zinc-900 text-white text-xs font-bold rounded-full cursor-pointer"
              >
                {i18n.language === 'en-US' ? 'EN-US' : 'PT-BR'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// ── Hero ──────────────────────────────────────────────────────────────────────

const Hero = () => {
  const { t } = useTranslation();

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="sobre" className="relative pt-28 pb-20 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-brand-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">

          {/* Left: Text */}
          <motion.div
            className="flex-1 text-center md:text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Available badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 border border-brand-100 text-brand-700 text-xs font-semibold mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500" />
              </span>
              {t('hero.available')}
            </div>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
              {t('hero.headline1')}{' '}
              <span className="text-gradient">{t('hero.headline2')}</span>.
            </h1>

            <p className="text-lg text-zinc-600 mb-10 max-w-xl leading-relaxed"
              dangerouslySetInnerHTML={{ __html: t('hero.description') }}
            />

            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <button
                onClick={() => scrollToSection('projetos')}
                className="group px-8 py-4 bg-zinc-900 text-white font-medium rounded-xl hover:bg-zinc-800 transition-all flex items-center gap-2 shadow-lg shadow-zinc-200 cursor-pointer"
              >
                {t('hero.viewWork')}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => scrollToSection('contato')}
                className="px-8 py-4 bg-white text-zinc-900 font-medium rounded-xl border border-zinc-200 hover:bg-zinc-50 transition-all cursor-pointer"
              >
                {t('hero.getInTouch')}
              </button>
            </div>
          </motion.div>

          {/* Right: Image */}
          <motion.div
            className="relative shrink-0"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-3xl overflow-hidden border-8 border-white shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
              <img
                src="https://avatars.githubusercontent.com/u/141333557?v=4"
                alt="Gabriel"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-5 -left-6 glass p-4 rounded-2xl shadow-xl hidden md:block">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600">
                  <Terminal size={20} />
                </div>
                <div>
                  <div className="text-xs text-zinc-500 font-medium">Backend Expert</div>
                  <div className="text-sm font-bold">Go &amp; Node.js</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ── Tech Stack ────────────────────────────────────────────────────────────────

type SkillCategory = 'frontend' | 'backend' | 'database' | 'devops';

const SKILLS: { name: string; icon: React.ReactNode; category: SkillCategory; color: string }[] = [
  { name: 'React',       icon: <Layout size={24} />,   category: 'frontend',  color: 'text-sky-500' },
  { name: 'TypeScript',  icon: <Terminal size={24} />,  category: 'frontend',  color: 'text-blue-600' },
  { name: 'Go',          icon: <Terminal size={24} />,  category: 'backend',   color: 'text-cyan-500' },
  { name: 'Node.js',     icon: <Server size={24} />,    category: 'backend',   color: 'text-green-600' },
  { name: 'Java Spring', icon: <Terminal size={24} />,  category: 'backend',   color: 'text-orange-600' },
  { name: 'Python',      icon: <Terminal size={24} />,  category: 'backend',   color: 'text-yellow-600' },
  { name: 'PostgreSQL',  icon: <Database size={24} />,  category: 'database',  color: 'text-indigo-600' },
  { name: 'Docker',      icon: <Cloud size={24} />,     category: 'devops',    color: 'text-blue-500' },
  { name: 'AWS',         icon: <Cloud size={24} />,     category: 'devops',    color: 'text-orange-500' },
];

import React from 'react';

const TechStack = () => {
  const { t } = useTranslation();

  return (
    <section id="tecnologias" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">{t('skills.title')}</h2>
          <p className="text-zinc-500 max-w-xl mx-auto">{t('skills.subtitle')}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {SKILLS.map((skill, i) => (
            <motion.div
              key={skill.name}
              className="p-6 rounded-2xl border border-zinc-100 bg-zinc-50/50 hover:bg-white hover:shadow-xl hover:shadow-zinc-100 transition-all group cursor-default"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <div className={`mb-4 transition-transform group-hover:scale-110 duration-300 ${skill.color}`}>
                {skill.icon}
              </div>
              <h3 className="font-semibold text-zinc-900 text-sm">{skill.name}</h3>
              <p className="text-xs text-zinc-400 mt-1 uppercase tracking-wider font-medium">{skill.category}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── Image Lightbox ────────────────────────────────────────────────────────────

type LightboxProps = {
  images: { src: string; alt: string }[];
  initialIndex: number;
  onClose: () => void;
};

const ImageLightbox = ({ images, initialIndex, onClose }: LightboxProps) => {
  const [index, setIndex] = useState(initialIndex);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') { e.stopImmediatePropagation(); prev(); }
      if (e.key === 'ArrowRight') { e.stopImmediatePropagation(); next(); }
    };
    document.addEventListener('keydown', handleKey, true);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey, true);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  useEffect(() => {
    const onChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) containerRef.current?.requestFullscreen();
    else document.exitFullscreen();
  };

  const { src, alt } = images[index];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <button
        onClick={(e) => { e.stopPropagation(); prev(); }}
        className="flex-shrink-0 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer mx-4"
        aria-label="Anterior"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <div
        ref={containerRef}
        className="relative flex flex-col flex-1 max-w-5xl max-h-[90vh] bg-zinc-950 rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'lightbox-in 180ms ease-out' }}
      >
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/10">
          <span className="text-sm font-medium text-white/70 truncate">{alt}</span>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-xs text-white/40 tabular-nums mr-1">{index + 1} / {images.length}</span>
            <button
              onClick={toggleFullscreen}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center p-4 md:p-8 bg-zinc-950">
          <img
            key={src}
            src={src}
            alt={alt}
            className="max-w-full max-h-[75vh] object-contain rounded-lg select-none"
            draggable={false}
            style={{ animation: 'lightbox-in 150ms ease-out' }}
          />
        </div>

        <div className="flex justify-center gap-1.5 py-3">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${i === index ? 'bg-white w-5' : 'bg-white/30 w-1.5 hover:bg-white/50'}`}
              aria-label={`Imagem ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <button
        onClick={(e) => { e.stopPropagation(); next(); }}
        className="flex-shrink-0 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer mx-4"
        aria-label="Próximo"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      <style>{`
        @keyframes lightbox-in {
          from { opacity: 0; transform: scale(0.96) translateY(8px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
};

// ── Projects ──────────────────────────────────────────────────────────────────

const Projects = () => {
  const { t } = useTranslation();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const lightboxImages = PROJECTS.map((p) => ({
    src: projectImages[p.id],
    alt: t(`projects.${p.id}.name`),
  }));

  return (
    <section id="projetos" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">{t('projects.title')}</h2>
            <p className="text-zinc-500 max-w-xl">{t('projects.subtitle')}</p>
          </div>
          <div className="flex gap-2 shrink-0">
            <button className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center hover:bg-zinc-900 hover:text-white hover:border-zinc-900 transition-all cursor-pointer">
              <ChevronRight size={20} className="rotate-180" />
            </button>
            <button className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center hover:bg-zinc-900 hover:text-white hover:border-zinc-900 transition-all cursor-pointer">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.id}
              className="group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              {/* Image — clicável para abrir lightbox */}
              <button
                className="relative w-full aspect-[16/10] rounded-3xl overflow-hidden mb-8 bg-zinc-100 cursor-zoom-in text-left"
                onClick={() => setLightboxIndex(i)}
                aria-label={`Ver ${t(`projects.${project.id}.name`)} em detalhes`}
              >
                <img
                  src={projectImages[project.id]}
                  alt={t(`projects.${project.id}.name`)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-white text-zinc-900 flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
                      aria-label="GitHub"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github size={20} />
                    </a>
                  )}
                  <div className="w-12 h-12 rounded-full bg-white text-zinc-900 flex items-center justify-center hover:scale-110 transition-transform">
                    <Maximize size={20} />
                  </div>
                </div>
              </button>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-zinc-100 text-zinc-600 text-[10px] font-bold uppercase tracking-widest rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h3 className="font-display text-2xl font-bold mb-3 group-hover:text-brand-600 transition-colors">
                {t(`projects.${project.id}.name`)}
              </h3>

              {/* Description */}
              <p className="text-zinc-600 mb-6 leading-relaxed">
                {t(`projects.${project.id}.description`)}
              </p>

              {/* Features */}
              <ul className="space-y-2">
                {Array.from({ length: project.featureCount }, (_, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-zinc-500">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0" />
                    {t(`projects.${project.id}.features.${idx}`)}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {lightboxIndex !== null && (
        <ImageLightbox
          images={lightboxImages}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </section>
  );
};

// ── Contact ───────────────────────────────────────────────────────────────────

const Contact = () => {
  const { t } = useTranslation();

  return (
    <section id="contato" className="py-24 bg-zinc-900 text-white overflow-hidden relative">
      {/* Decorative blur */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-600/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="max-w-3xl mx-auto px-6 relative text-center">
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 leading-tight">
          {t('contact.title')}{' '}
          <span className="text-brand-400">{t('contact.titleHighlight')}</span>{' '}
          {t('contact.titleEnd')}
        </h2>
        <p className="text-zinc-400 text-lg mb-12 leading-relaxed">
          {t('contact.description')}
        </p>

        <a href="mailto:gabrieldias335@gmail.com" className="inline-flex items-center gap-4 group mb-10">
          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-brand-600 group-hover:border-brand-600 transition-all">
            <Mail size={20} />
          </div>
          <div className="text-left">
            <div className="text-xs text-zinc-500 font-medium uppercase tracking-wider">{t('contact.emailLabel')}</div>
            <div className="text-base font-medium">gabrieldias335@gmail.com</div>
          </div>
        </a>

        <div className="flex justify-center gap-4">
          <a
            href="https://github.com/dias-oblivion"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white hover:text-zinc-900 transition-all"
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/gabriel-dias-dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white hover:text-zinc-900 transition-all"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </a>
        </div>
      </div>
    </section>
  );
};

// ── Footer ────────────────────────────────────────────────────────────────────

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="py-10 border-t border-zinc-100 bg-white">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-zinc-500 text-sm">{t('footer.copyright')}</div>
        <div className="flex gap-8">
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-zinc-400 hover:text-zinc-900 transition-colors">{t('footer.twitter')}</a>
          <a href="https://github.com/dias-oblivion" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-zinc-400 hover:text-zinc-900 transition-colors">{t('footer.github')}</a>
          <a href="https://www.linkedin.com/in/gabriel-dias-dev/" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-zinc-400 hover:text-zinc-900 transition-colors">{t('footer.linkedin')}</a>
        </div>
      </div>
    </footer>
  );
};

// ── App ───────────────────────────────────────────────────────────────────────

export default function Portfolio() {
  return (
    <div className="min-h-screen font-sans">
      <Navbar />
      <main>
        <Hero />
        <TechStack />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
