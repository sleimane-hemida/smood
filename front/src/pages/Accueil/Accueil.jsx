import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Accueil.css'; // Import global pur pour garantir la compatibilité exacte du template
import smoodNuitDinfo from '../../assets/smood-nuit-dinfo.png';
import smood2 from '../../assets/smood2.png';
import smoodNb from '../../assets/smood-nb.jpeg';
import HeroAnimation from './HeroAnimation';

export default function Accueil() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  useEffect(() => {
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.1,
    });

    revealElements.forEach(el => revealObserver.observe(el));

    return () => revealObserver.disconnect();
  }, []);

  return (
    <div className="accueil-page">
      {/* En-tête avec navigation */}
      <header role="banner" className="header">
        <div className="container">
          <Link to="/" className="logo" aria-label="Accueil SMOOD Tech">
            <img src="/icon.png" alt="SMOOD Tech" className="logo-icon" />
          </Link>
          
          <nav role="navigation" aria-label="Menu principal">
            <ul className={menuOpen ? 'active' : ''}>
              <li><Link to="/" className="nav-link active" aria-current="page" onClick={closeMenu}>Accueil</Link></li>
              <li><Link to="/services" className="nav-link" onClick={closeMenu}>Services</Link></li>
              <li><Link to="/projets" className="nav-link" onClick={closeMenu}>Projets</Link></li>
              <li><Link to="/apropos" className="nav-link" onClick={closeMenu}>À propos</Link></li>
            </ul>
          </nav>
          
          <button
            className={`menu-toggle${menuOpen ? ' active' : ''}`}
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* Contenu principal */}
      <main role="main">
        {/* Section Hero */}
        <section className="hero" role="region" aria-label="Présentation SMOOD Tech">
          <div className="hero-content">
            <h1>Solutions digitales <span className="expert-italic">sur mesure</span> pour votre entreprise</h1>
            <p>Créez votre présence digitale avec des solutions web et mobiles performantes</p>
            <div className="cta-group">
              <a href="#services" className="btn btn-black">NOS SERVICES</a>
              <Link to="/apropos" className="btn btn-outline">À PROPOS &nbsp;&rarr;</Link>
            </div>
          </div>

          <HeroAnimation />

          <div className="gallery-container">
            <div className="chevron-line line-1">
              <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400" alt="Code et développement" />
              <img src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400" alt="Programmation web" />
              <img src="https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=400" alt="Développement informatique" />
              <img src="https://images.unsplash.com/photo-1484417894907-623942c8ee29?auto=format&fit=crop&w=400" alt="Workspace développeur" />
            </div>

            <div className="chevron-line line-2">
              <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=400" alt="Applications mobiles" />
              <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400" alt="Équipe de développeurs" />
              <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400" alt="Analytics et données" />
            </div>
          </div>
        </section>

        {/* Section Services */}
        <section id="services" className="services scroll-reveal" role="region" aria-label="Nos services">
          <div className="container">
            <h2>Nos services de développement</h2>
            <div className="services-grid">
              <article className="service-card">
                <div className="service-icon">💻</div>
                <h3>Développement Web</h3>
                <p>Création de sites web responsives, applications web progressives (PWA) et solutions e-commerce.</p>
                <a href="/services#web" className="btn-secondary">En savoir plus</a>
              </article>
              
              <article className="service-card">
                <div className="service-icon">📱</div>
                <h3>Applications Mobiles</h3>
                <p>Développement d'applications iOS et Android natives et cross-platform (React Native, Flutter).</p>
                <a href="/services#mobile" className="btn-secondary">En savoir plus</a>
              </article>
              
              <article className="service-card">
                <div className="service-icon">🔗</div>
                <h3>Intégration API</h3>
                <p>Conception et intégration d'API RESTful sécurisées pour connecter vos systèmes.</p>
                <a href="/services#api" className="btn-secondary">En savoir plus</a>
              </article>
            </div>
          </div>
        </section>

        {/* Section À propos */}
        <section className="about scroll-reveal" role="region" aria-label="À propos de SMOOD Tech">
          <div className="container">
            <div className="about-content">
              <div className="about-text">
                <h2>Pourquoi choisir SMOOD Tech ?</h2>
                <p>Fondée en 2024, SMOOD Tech est une entreprise spécialisée dans le <strong>développement informatique sur mesure</strong>. Notre équipe d'experts vous accompagne dans la digitalisation de vos processus métier.</p>
                <p>Nous combinons <strong>expertise technique</strong> et <strong>approche centrée utilisateur</strong> pour créer des solutions qui répondent précisément à vos besoins.</p>
                <ul>
                  <li>✅ Développement agile et itératif</li>
                  <li>✅ Code propre et maintenable</li>
                  <li>✅ Sécurité des données prioritaire</li>
                  <li>✅ Support technique réactif</li>
                </ul>
              </div>
              <div className="about-image">
                <img
                  src={smoodNuitDinfo}
                  alt="Équipe de développement SMOOD Tech avec projets"
                  width="600"
                  height="400"
                  loading="lazy"
                  className="about-image-main"
                />
                <div className="about-image-grid">
                  <img
                    src={smoodNb}
                    alt="Équipe de développement SMOOD Tech technique"
                    width="600"
                    height="400"
                    loading="lazy"
                    className="about-image-small"
                  />
                  <img
                    src={smood2}
                    alt="Équipe SMOOD Tech en présentation"
                    width="600"
                    height="400"
                    loading="lazy"
                    className="about-image-small about-image-small-no-crop"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section CTA */}
        <section className="cta scroll-reveal" role="region" aria-label="Contactez-nous">
          <div className="container">
            <h2>Prêt à transformer votre projet digital ?</h2>
            <p>Contactez-nous pour une consultation gratuite et un devis personnalisé.</p>
            <a href="/apropos#contact" className="btn-primary">Nous contacter</a>
          </div>
        </section>
      </main>

      {/* Pied de page */}
      <footer role="contentinfo">
        <div className="footer-main">
          <div className="container">
            <div className="footer-content">
              {/* Colonne À propos */}
              <div className="footer-about">
                <div className="footer-logo">
                  <img src="/icon.png" alt="SMOOD Tech" className="footer-logo-img" />
                  <h3>SMOOD Tech</h3>
                </div>
                <p className="footer-description">Solutions digitales sur mesure pour propulser votre entreprise vers le futur. Innovation, expertise et accompagnement personnalisé.</p>
                <div className="footer-social">
                  <a href="#" aria-label="LinkedIn" className="social-link">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  </a>
                  <a href="#" aria-label="Twitter" className="social-link">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                  </a>
                  <a href="#" aria-label="GitHub" className="social-link">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  </a>
                </div>
              </div>
              
              <div className="footer-links">
                <h4>Navigation</h4>
                <ul>
                  <li><Link to="/">Accueil</Link></li>
                  <li><Link to="/services">Services</Link></li>
                  <li><Link to="/projets">Projets</Link></li>
                  <li><Link to="/apropos">À propos</Link></li>
                </ul>
              </div>
              {/* commentaire pour tester le déploiement de la branche de développement */}
              
              <div className="footer-links">
                <h4>Services</h4>
                <ul>
                  <li><a href="/services#web">Développement Web</a></li>
                  <li><a href="/services#mobile">Applications Mobiles</a></li>
                  <li><a href="/services#api">Intégration API</a></li>
                  <li><a href="/services#consulting">Consulting IT</a></li>
                </ul>
              </div>
              
              <div className="footer-contact">
                <h4>Contact</h4>
                <ul className="contact-list">
                  <li>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    <a href="mailto:juleediengg@gmail.com">juleediengg@gmail.com</a>
                  </li>
                  <li>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    <span>00 222 44590985</span>
                  </li>
                  <li>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    <span>Nouakchott, Mauritanie</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="container">
            <p>&copy; 2026 SMOOD Tech</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
