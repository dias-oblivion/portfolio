import { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ExternalLink, ArrowRight, Code, Database, BoxesIcon, Cloud, Coffee, Server, Layers, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import i18n from './i18n';
import screenshotEditor from './assets/markdown-editor.jpg';

const Portfolio = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
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
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-16">{t('projects.title')}</h2>
          
          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Project Screenshot */}
            <div className="relative">
              <div className="bg-gray-100 rounded-lg overflow-hidden h-80 flex items-center justify-center">
                <img 
                  src={screenshotEditor}
                  alt="Markdown Editor"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23374151%22 width=%22400%22 height=%22300%22/%3E%3C/svg%3E';
                  }}
                />
              </div>
            </div>
            
            {/* Project Info */}
            <div>
              <h3 className="text-2xl font-bold mb-2">{t('projects.projectName')}</h3>
              <p className="text-sm text-gray-500 font-medium mb-6">{t('projects.stack')}</p>
              
              <p className="text-gray-700 mb-8 leading-relaxed">
                {t('projects.description')}
              </p>
              
              <ul className="space-y-3 mb-8 text-sm text-gray-600">
                <li className="flex items-start gap-3">
                  <span className="text-gray-400 mt-1">→</span>
                  <span>{t('projects.features.0')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gray-400 mt-1">→</span>
                  <span>{t('projects.features.1')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gray-400 mt-1">→</span>
                  <span>{t('projects.features.2')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gray-400 mt-1">→</span>
                  <span>{t('projects.features.3')}</span>
                </li>
              </ul>
              
              <div className="flex gap-4">
                <a 
                  href="https://github.com/dias-oblivion/markdown-editor" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-900 hover:text-gray-600 font-medium cursor-pointer"
                >
                  <Github className="w-4 h-4" />
                  {t('projects.repository')}
                </a>
                <a 
                  href="https://github.com/dias-oblivion/markdown-editor" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-900 hover:text-gray-600 font-medium cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4" />
                  {t('projects.learnMore')}
                </a>
              </div>
            </div>
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
    </div>
  );
};

export default Portfolio;