import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Coffee, Code, Database, Server, Construction, Wrench } from 'lucide-react';

const Portfolio = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
      @keyframes scroll {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(-33.333%);
        }
      }
      @keyframes moveGrid {
        0% {
          transform: translate(0, 0);
        }
        100% {
          transform: translate(50px, 50px);
        }
      }
      @keyframes float {
        0%, 100% {
          transform: translateY(0px) rotate(0deg);
        }
        50% {
          transform: translateY(-20px) rotate(180deg);
        }
      }
      @keyframes beam {
        0% {
          opacity: 0;
          transform: translateX(-100px);
        }
        50% {
          opacity: 1;
        }
        100% {
          opacity: 0;
          transform: translateX(100px);
        }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const scrollToSection = (sectionId: any) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const skills = [
    'React', 'TypeScript', 'Go', 'Java Spring', 'Python', 'Node.js', 
    'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'AWS', 'Git',
    'RESTful APIs', 'Microservices', 'GraphQL', 'Pub/Sub'
  ];

  const AnimatedBackground = () => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated Dot Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle, #10b981 1px, transparent 1px)`,
              backgroundSize: '50px 50px',
              animation: 'moveGrid 20s linear infinite'
            }}
          />
        </div>
        
        {/* Floating Orbs */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-emerald-400/10 to-blue-400/10 blur-xl"
            style={{
              width: `${100 + Math.random() * 200}px`,
              height: `${100 + Math.random() * 200}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}

        {/* Animated Beams */}
        <div className="absolute inset-0">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent"
              style={{
                width: '200px',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `beam ${3 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 3}s`
              }}
            />
          ))}
        </div>
      </div>
    );
  };

  const GhibliCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
    <div className={`relative bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10 ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/5 to-blue-600/5 rounded-2xl" />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      <AnimatedBackground />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-sm border-b border-gray-700/50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Coffee className="w-8 h-8 text-emerald-400" />
            </div>
            <div className="flex items-center space-x-6">
              {[
                { name: 'Início', id: 'home' },
                { name: 'Tecnologias', id: 'skills' },
                { name: 'Projetos', id: 'projects' },
                { name: 'Contato', id: 'contact' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 text-sm font-medium"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="text-center mb-16">
              <div className="inline-block p-1 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full mb-6">
                <div className="bg-gray-900 rounded-full p-1">
                  <img 
                    src="https://avatars.githubusercontent.com/u/141333557?v=4" 
                    alt="Gabriel Avatar"
                    className="w-16 h-16 rounded-full"
                  />
                </div>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Gabriel
                </span>
                <br />
                <span className="text-white text-3xl md:text-5xl">Full Stack Developer</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Transformar ideias em código é algo incrível. Soluções completas que conectam 
                front-end elegante com back-end robusto. Foco em materializar visões 
                em aplicações funcionais e escaláveis.
              </p>
              <div className="flex items-center justify-center space-x-4">
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white px-8 py-3 rounded-full font-medium transition-all duration-200 transform hover:scale-105"
                >
                  Contato
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Workspace Preview */}
        <div className="max-w-4xl mx-auto mt-16">
          <GhibliCard className="overflow-hidden">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 to-blue-600/10 rounded-xl" />
              <img 
                src="https://raw.githubusercontent.com/dias-oblivion/dias-oblivion/main/wallpaper.gif"
                alt="Gabriel's Workspace"
                className="w-full h-48 md:h-64 object-cover rounded-xl opacity-80 hover:opacity-100 transition-opacity duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent rounded-xl" />
            </div>
          </GhibliCard>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              Experiência & Valores
            </h2>
            <p className="text-gray-300 text-lg">Como abordo o desenvolvimento de software</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <GhibliCard className="text-center">
              <div className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center">
                  <Code className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold">Código Limpo</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Código que outros desenvolvedores conseguem entender e manter. 
                  Prioridade em legibilidade, boas práticas e documentação clara.
                </p>
              </div>
            </GhibliCard>

            <GhibliCard className="text-center">
              <div className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <Server className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold">Escalabilidade</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Aplicações pensadas para crescimento. Arquiteturas que suportam 
                  aumento de usuários e funcionalidades sem comprometer a performance.
                </p>
              </div>
            </GhibliCard>

            <GhibliCard className="text-center">
              <div className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                  <Database className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold">Performance</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Otimização desde o banco de dados até a interface do usuário. 
                  Cada milissegundo importa na experiência final.
                </p>
              </div>
            </GhibliCard>
          </div>

          <div className="mt-16 text-center">
            <GhibliCard className="max-w-4xl mx-auto">
              <div className="space-y-6">
                <div className="flex items-center justify-center space-x-3">
                  <Coffee className="w-6 h-6 text-emerald-400" />
                  <h3 className="text-2xl font-bold">Metodologia de Trabalho</h3>
                </div>
                <p className="text-gray-300 leading-relaxed text-lg">
                  Comunicação clara, entregas incrementais e feedback constante. 
                  Trabalho com metodologias ágeis, sempre focando em entregar valor real para o usuário final. 
                  Cada projeto é uma oportunidade de aprender algo novo e aplicar as melhores práticas do mercado.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
                  {['Agile/Scrum', 'TDD', 'CI/CD', 'Code Review'].map((methodology, index) => (
                    <div key={index} className="bg-gray-800/50 rounded-lg p-3">
                      <span className="text-emerald-400 font-medium text-sm">{methodology}</span>
                    </div>
                  ))}
                </div>
              </div>
            </GhibliCard>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6 bg-gray-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              Tecnologias
            </h2>
            <p className="text-gray-300 text-lg">Stack completo para desenvolvimento moderno</p>
          </div>
          
          {/* Animated Skills Banner */}
          <div className="relative overflow-hidden bg-gray-900/50 rounded-2xl border border-gray-700/50 p-8">
            <div className="flex animate-scroll whitespace-nowrap">
              {skills.concat(skills).concat(skills).map((skill, index) => (
                <div 
                  key={index}
                  className="flex-shrink-0 mx-4 px-6 py-3 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-full border border-emerald-400/30"
                >
                  <span className="text-emerald-300 font-medium">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
      `}</style>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              Projetos
            </h2>
            <p className="text-gray-300 text-lg">Showcase dos meus trabalhos em desenvolvimento</p>
          </div>
          
          <GhibliCard className="max-w-4xl mx-auto text-center">
            <div className="py-16 space-y-8">
              <div className="flex items-center justify-center space-x-4">
                <Construction className="w-16 h-16 text-yellow-400 animate-bounce" />
                <Wrench className="w-12 h-12 text-gray-400 animate-pulse" />
              </div>
              
              <div className="space-y-4">
                <h3 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  Seção em Construção
                </h3>
              </div>
              
              <div className="flex items-center justify-center space-x-6 pt-8">
                <a 
                  href="https://github.com/dias-oblivion" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-full transition-all duration-200 transform hover:scale-105"
                >
                  <Github className="w-5 h-5" />
                  <span>Ver no GitHub</span>
                </a>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white px-6 py-3 rounded-full transition-all duration-200 transform hover:scale-105"
                >
                  <Mail className="w-5 h-5" />
                  <span>Conversar sobre Projetos</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8 opacity-60">
                <div className="bg-gray-800/50 rounded-lg p-4 border-2 border-dashed border-gray-600">
                  <div className="h-20 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded mb-3" />
                  <div className="h-4 bg-gray-700 rounded mb-2" />
                  <div className="h-3 bg-gray-700 rounded w-3/4" />
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4 border-2 border-dashed border-gray-600">
                  <div className="h-20 bg-gradient-to-r from-green-600/20 to-teal-600/20 rounded mb-3" />
                  <div className="h-4 bg-gray-700 rounded mb-2" />
                  <div className="h-3 bg-gray-700 rounded w-2/3" />
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4 border-2 border-dashed border-gray-600">
                  <div className="h-20 bg-gradient-to-r from-orange-600/20 to-red-600/20 rounded mb-3" />
                  <div className="h-4 bg-gray-700 rounded mb-2" />
                  <div className="h-3 bg-gray-700 rounded w-4/5" />
                </div>
              </div>
            </div>
          </GhibliCard>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-gray-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              Contato
            </h2>
            <p className="text-gray-300 text-lg">
              Sempre aberto para novas oportunidades
            </p>
          </div>
          
          <GhibliCard className="max-w-2xl mx-auto">
            <div className="space-y-8">
              <div className="flex items-center justify-center space-x-2">
                <Coffee className="w-6 h-6 text-emerald-400" />
                <span className="text-lg">Que tal tomarmos um café e conversarmos sobre seu projeto?</span>
              </div>
              
              <div className="flex items-center justify-center space-x-8">
                <a 
                  href="https://github.com/dias-oblivion" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-300 hover:text-emerald-400 transition-colors"
                >
                  <Github className="w-6 h-6" />
                  <span>GitHub</span>
                </a>
                <a 
                  href="https://www.linkedin.com/in/gabriel-dias-dev/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 transition-colors"
                >
                  <Linkedin className="w-6 h-6" />
                  <span>LinkedIn</span>
                </a>
                <a 
                  href="mailto:gabrieldias335@gmail.com" 
                  className="flex items-center space-x-2 text-gray-300 hover:text-purple-400 transition-colors"
                >
                  <Mail className="w-6 h-6" />
                  <span>Email</span>
                </a>
              </div>
              
              <a 
                href="mailto:gabrieldias335@gmail.com"
                className="inline-block w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white py-3 rounded-full font-medium transition-all duration-200 transform hover:scale-105"
              >
                Enviar Mensagem
              </a>
            </div>
          </GhibliCard>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-700/50">
        <div className="max-w-6xl mx-auto text-center text-gray-400">
          <p>© 2024 • @dias_oblivion</p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;