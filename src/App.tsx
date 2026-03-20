import { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, ExternalLink, ArrowRight, Code, Database, BoxesIcon, Cloud, Coffee, Server, Layers, Globe, ChevronLeft, ChevronRight, X, Maximize, Minimize } from 'lucide-react';
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

type LightboxImage = { src: string; alt: string };

type LightboxProps = {
  images: LightboxImage[];
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
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const { src, alt } = images[index];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      {/* Prev button — outside modal */}
      <button
        onClick={(e) => { e.stopPropagation(); prev(); }}
        className="flex-shrink-0 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer mx-4"
        aria-label="Projeto anterior"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Modal container */}
      <div
        ref={containerRef}
        className="relative flex flex-col flex-1 max-w-5xl max-h-[90vh] bg-gray-950 rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'lightbox-in 180ms ease-out' }}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/10">
          <span className="text-sm font-medium text-white/70 truncate">{alt}</span>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-xs text-white/40 tabular-nums mr-1">{index + 1} / {images.length}</span>
            <button
              onClick={toggleFullscreen}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title={isFullscreen ? 'Sair do fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Fechar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Image area */}
        <div className="flex items-center justify-center p-4 md:p-8 bg-gray-950">
          <img
            key={src}
            src={src}
            alt={alt}
            className="max-w-full max-h-[75vh] object-contain rounded-lg select-none"
            draggable={false}
            style={{ animation: 'lightbox-in 150ms ease-out' }}
          />
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-1.5 py-3">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${i === index ? 'bg-white w-5' : 'bg-white/30 w-1.5 hover:bg-white/50'}`}
              aria-label={`Ver imagem ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Next button — outside modal */}
      <button
        onClick={(e) => { e.stopPropagation(); next(); }}
        className="flex-shrink-0 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer mx-4"
        aria-label="Próximo projeto"
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

const Portfolio = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [activeProject, setActiveProject] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const prevProject = () => setActiveProject((p) => (p - 1 + PROJECTS.length) % PROJECTS.length);
  const nextProject = () => setActiveProject((p) => (p + 1) % PROJECTS.length);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') setActiveProject((p) => (p - 1 + PROJECTS.length) % PROJECTS.length);
      if (e.key === 'ArrowRight') setActiveProject((p) => (p + 1) % PROJECTS.length);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const skills = [
    { name: 'React', color: 'bg-blue-50 text-blue-700', Icon: Code },
    { name: 'TypeScript', color: 'bg-blue-50 text-blue-700', Icon: Code },
    { name: 'Go', color: 'bg-cyan-50 text-cyan-700', Icon: Layers },
    { name: 'Java Spring', color: 'bg-orange-50 text-orange-700', Icon: Coffee },
    { name: 'Python', color: 'bg-amber-50 text-amber-700', Icon: Code },
    { name: 'Node.js', color: 'bg-green-50 text-green-700', Icon: Server },
    { name: 'PostgreSQL', color: 'bg-slate-50 text-slate-700', Icon: Database },
    { name: 'Docker', color: 'bg-sky-50 text-sky-700', Icon: BoxesIcon },
    { name: 'AWS', color: 'bg-orange-50 text-orange-700', Icon: Cloud }
  ];

  const socialLinks = [
    { icon: Github, label: 'GitHub', url: 'https://github.com/dias-oblivion' },
    { icon: Linkedin, label: 'LinkedIn', url: 'https://www.linkedin.com/in/gabriel-dias-dev/' },
    { icon: Mail, label: 'Email', url: 'mailto:gabrieldias335@gmail.com' }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Navigation */}
      <nav className="border-b border-gray-200 sticky top-0 bg-white/95 backdrop-blur-sm z-40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center gap-6">
          {/* Nav Links - Center */}
          <div className="flex-1 flex justify-center gap-12">
            {[
              { name: t('nav.about'), id: 'about' },
              { name: t('nav.skills'), id: 'skills' },
              { name: t('nav.projects'), id: 'projects' },
              { name: t('nav.contact'), id: 'contact' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Language Toggle - Right */}
          <button
            onClick={() => {
              const newLang = i18n.language === 'en-US' ? 'pt-BR' : 'en-US';
              i18n.changeLanguage(newLang);
            }}
            className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all text-xs font-medium text-gray-700 cursor-pointer whitespace-nowrap"
            title="Toggle language"
          >
            <Globe className="w-4 h-4" />
            <span>{i18n.language === 'en-US' ? 'EN-US' : 'PT-BR'}</span>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="about" className="py-32 px-6">
        <div className="max-w-3xl mx-auto">
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="flex items-center gap-6 mb-8">
              <img 
                src="https://avatars.githubusercontent.com/u/141333557?v=4" 
                alt="Gabriel Avatar"
                className="w-16 h-16 rounded-full ring-2 ring-gray-200 shadow-md flex-shrink-0"
              />
              <h1 className="text-5xl md:text-6xl font-bold">
                {t('hero.title')}
              </h1>
            </div>
            <p className="text-lg text-gray-600 leading-relaxed mb-10">
              {t('hero.description')}
            </p>
            <div className="flex gap-6">
              <button 
                onClick={() => scrollToSection('projects')}
                className="flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded transition-all hover:bg-gray-700 cursor-pointer font-medium"
              >
                {t('hero.viewWork')}
                <ArrowRight className="w-4 h-4" />
              </button>
              <a 
                href="mailto:gabrieldias335@gmail.com"
                className="flex items-center gap-2 border border-gray-300 text-gray-900 px-6 py-3 rounded hover:bg-gray-50 transition-all cursor-pointer font-medium"
              >
                {t('hero.getInTouch')}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-2xl font-bold">{t('projects.title')}</h2>
            <div className="flex items-center gap-3">
              <button
                onClick={prevProject}
                className="w-9 h-9 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
                aria-label="Previous project"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-sm text-gray-500 font-medium tabular-nums">
                {activeProject + 1} / {PROJECTS.length}
              </span>
              <button
                onClick={nextProject}
                className="w-9 h-9 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
                aria-label="Next project"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Carousel */}
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeProject * 100}%)` }}
            >
              {PROJECTS.map((project) => (
                <div key={project.id} className="w-full flex-shrink-0">
                  <div className="grid md:grid-cols-2 gap-12 items-start">

                    {/* Project Screenshot */}
                    <button
                      className="group relative bg-gray-900 border border-gray-200 rounded-xl overflow-hidden aspect-video flex items-center justify-center cursor-zoom-in w-full text-left"
                      onClick={() => setLightboxIndex(PROJECTS.findIndex((p) => p.id === project.id))}
                      aria-label={`Ver imagem de ${t(`projects.${project.id}.name`)}`}
                    >
                      <img
                        src={projectImages[project.id]}
                        alt={t(`projects.${project.id}.name`)}
                        className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      {/* Hover overlay hint */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/20">
                        <div className="bg-black/60 text-white text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5 backdrop-blur-sm">
                          <Maximize className="w-3 h-3" />
                          Ver em detalhes
                        </div>
                      </div>
                    </button>

                    {/* Project Info */}
                    <div className="py-2">
                      <h3 className="text-2xl font-bold mb-2">
                        {t(`projects.${project.id}.name`)}
                      </h3>
                      <p className="text-sm text-gray-500 font-medium mb-6">
                        {t(`projects.${project.id}.stack`)}
                      </p>

                      <p className="text-gray-700 mb-8 leading-relaxed">
                        {t(`projects.${project.id}.description`)}
                      </p>

                      <ul className="space-y-3 mb-8 text-sm text-gray-600">
                        {Array.from({ length: project.featureCount }, (_, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <span className="text-gray-400 mt-0.5">→</span>
                            <span>{t(`projects.${project.id}.features.${idx}`)}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex gap-4">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-gray-900 hover:text-gray-600 font-medium cursor-pointer"
                          >
                            <Github className="w-4 h-4" />
                            {t('projects.repository')}
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-gray-900 hover:text-gray-600 font-medium cursor-pointer"
                          >
                            <ExternalLink className="w-4 h-4" />
                            {t('projects.learnMore')}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-10">
            {PROJECTS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveProject(idx)}
                className={`w-2 h-2 rounded-full transition-all cursor-pointer ${idx === activeProject ? 'bg-gray-900 w-6' : 'bg-gray-300 hover:bg-gray-400'}`}
                aria-label={`Go to project ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-6 border-t border-gray-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-12">{t('skills.title')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {skills.map((skill) => (
              <div key={skill.name} className="group">
                <div className={`${skill.color} px-4 py-4 border border-gray-200 rounded hover:shadow-md transition-all cursor-default flex items-center gap-3`}>
                  <skill.Icon className="w-5 h-5" />
                  <span className="font-medium">{skill.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 border-t border-gray-200">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-6">{t('contact.title')}</h2>
          <p className="text-lg text-gray-600 mb-16">
            {t('contact.description')}
          </p>
          
          <div className="flex justify-center gap-8 mb-16">
            {socialLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <a 
                  key={link.label}
                  href={link.url}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
                  title={link.label}
                >
                  <IconComponent className="w-5 h-5" />
                  <span className="text-sm font-medium">{link.label}</span>
                </a>
              );
            })}
          </div>
          
          <a 
            href="mailto:gabrieldias335@gmail.com"
            className="inline-block bg-gray-900 text-white px-8 py-3 rounded hover:bg-gray-700 transition-all cursor-pointer font-medium"
          >
            {t('contact.sendEmail')}
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8 px-6">
        <div className="max-w-4xl mx-auto text-center text-sm text-gray-500">
          <p>{t('footer.copyright')}</p>
        </div>
      </footer>

      {/* Image Lightbox */}
      {lightboxIndex !== null && (
        <ImageLightbox
          images={PROJECTS.map((p) => ({ src: projectImages[p.id], alt: t(`projects.${p.id}.name`) }))}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </div>
  );
};

export default Portfolio;