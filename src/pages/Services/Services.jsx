import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../Accueil/Accueil.css'; // On réutilise le même CSS global (style.css)

export default function Services() {
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

    // Gestion du scroll vers les sections si on arrive avec un hash dans l'URL (#web, #mobile...)
    if (window.location.hash) {
      setTimeout(() => {
        const id = window.location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 0);
    }

    return () => revealObserver.disconnect();
  }, []);

  return (
    <div className="services-page">
      {/* En-tête avec navigation */}
      <header role="banner" className="header">
        <div className="container">
          <Link to="/" className="logo" aria-label="Accueil SMOOD Tech">
            <img src="/assets/icon.png" alt="SMOOD Tech" className="logo-icon" />
          </Link>
          
          <nav role="navigation" aria-label="Menu principal">
            <ul>
              <li><Link to="/" className="nav-link">Accueil</Link></li>
              <li><Link to="/services" className="nav-link active" aria-current="page">Services</Link></li>
              <li><Link to="/projets" className="nav-link">Projets</Link></li>
              <li><Link to="/apropos" className="nav-link">À propos</Link></li>
            </ul>
          </nav>
          
          <button className="menu-toggle" aria-label="Ouvrir le menu" aria-expanded="false">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>
      
      {/* Hero Section Services */}
      <section className="services-hero" style={{ padding: '120px 20px 60px', textAlign: 'center', background: 'linear-gradient(135deg, #1a1a1a 0%, #000000 100%)', color: 'white' }}>
        <div className="container">
          <h1 className="services-hero-title" style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '20px', color: '#ffffff' }}>
            Nos <span className="services-title-accent" style={{ color: '#ff6600' }}>Services</span>
          </h1>
          <p className="services-hero-subtitle" style={{ fontSize: '1.2rem', color: '#ccc', maxWidth: '700px', margin: '0 auto' }}>
            Solutions digitales complètes pour transformer votre entreprise à Nouakchott et partout en Mauritanie
          </p>
        </div>
      </section>

      <main role="main">
        {/* Section Développement Web */}
        <section id="web" className="service-detail scroll-reveal" style={{ padding: '80px 0', background: '#fff' }}>
          <div className="container">
            <div className="service-detail-content" style={{ display: 'flex', gap: '40px', alignItems: 'center', flexWrap: 'wrap' }}>
              <div className="service-detail-text" style={{ flex: '1 1 500px' }}>
                <h2 style={{ fontSize: '2.5rem', color: '#1a1a1a', marginBottom: '10px' }}>Développement Web Sur Mesure</h2>
                <h3 style={{ fontSize: '1.2rem', color: '#ff6600', marginBottom: '20px' }}>Création de sites internet professionnels adaptés à vos besoins</h3>
                <p style={{ marginBottom: '20px', lineHeight: 1.6 }}>
                  Notre équipe de développeurs web expérimentés crée des <strong>sites internet performants et optimisés</strong>. Nous développons des solutions web complètes qui propulsent votre présence en ligne.
                </p>
                
                <ul className="service-features" style={{ listStyle: 'none', padding: 0 }}>
                  <li style={{ marginBottom: '10px' }}>✅ <strong>Sites vitrine professionnels</strong> - Présentez votre entreprise avec élégance</li>
                  <li style={{ marginBottom: '10px' }}>✅ <strong>E-commerce et boutiques en ligne</strong> - Vendez vos produits 24h/24</li>
                  <li style={{ marginBottom: '10px' }}>✅ <strong>Applications web sur mesure</strong> - Solutions personnalisées pour votre métier</li>
                  <li style={{ marginBottom: '10px' }}>✅ <strong>Design responsive mobile-first</strong> - Adapté à tous les écrans</li>
                  <li style={{ marginBottom: '10px' }}>✅ <strong>Performance et vitesse optimales</strong> - Temps de chargement ultra-rapides</li>
                </ul>
                
                <div className="service-tech" style={{ marginTop: '30px' }}>
                  <h4 style={{ marginBottom: '10px' }}>Technologies utilisées</h4>
                  <div className="tech-tags" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <span className="tech-tag" style={{ padding: '5px 15px', background: '#f0f0f0', borderRadius: '20px', fontSize: '0.9rem' }}>React</span>
                    <span className="tech-tag" style={{ padding: '5px 15px', background: '#f0f0f0', borderRadius: '20px', fontSize: '0.9rem' }}>Vue.js</span>
                    <span className="tech-tag" style={{ padding: '5px 15px', background: '#f0f0f0', borderRadius: '20px', fontSize: '0.9rem' }}>Node.js</span>
                    <span className="tech-tag" style={{ padding: '5px 15px', background: '#f0f0f0', borderRadius: '20px', fontSize: '0.9rem' }}>Python</span>
                  </div>
                </div>
              </div>
              <div className="service-detail-image" style={{ flex: '1 1 400px' }}>
                <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop" alt="Développement web" style={{ width: '100%', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} loading="lazy" />
              </div>
            </div>
          </div>
        </section>

        {/* Section Applications Mobiles */}
        <section id="mobile" className="service-detail service-detail-reverse scroll-reveal" style={{ padding: '80px 0', background: '#f8f9fa' }}>
          <div className="container">
            <div className="service-detail-content" style={{ display: 'flex', gap: '40px', alignItems: 'center', flexWrap: 'wrap', flexDirection: 'row-reverse' }}>
              <div className="service-detail-text" style={{ flex: '1 1 500px' }}>
                <h2 style={{ fontSize: '2.5rem', color: '#1a1a1a', marginBottom: '10px' }}>Applications Mobiles iOS & Android</h2>
                <h3 style={{ fontSize: '1.2rem', color: '#ff6600', marginBottom: '20px' }}>Développement d'applications mobiles performantes et intuitives</h3>
                <p style={{ marginBottom: '20px', lineHeight: 1.6 }}>
                  Développez votre <strong>application mobile professionnelle</strong> avec notre expertise en développement iOS, Android et multiplateforme.
                </p>
                
                <ul className="service-features" style={{ listStyle: 'none', padding: 0 }}>
                  <li style={{ marginBottom: '10px' }}>📱 <strong>Applications natives iOS Swift</strong> - Performance maximale</li>
                  <li style={{ marginBottom: '10px' }}>📱 <strong>Applications natives Android Kotlin</strong> - Expérience optimale</li>
                  <li style={{ marginBottom: '10px' }}>📱 <strong>Apps multiplateformes React Native</strong> - Un code, deux plateformes</li>
                  <li style={{ marginBottom: '10px' }}>📱 <strong>UX/UI design mobile moderne</strong> - Interfaces intuitives</li>
                </ul>
                
                <div className="service-tech" style={{ marginTop: '30px' }}>
                  <h4 style={{ marginBottom: '10px' }}>Technologies mobiles</h4>
                  <div className="tech-tags" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <span className="tech-tag" style={{ padding: '5px 15px', background: '#e0e0e0', borderRadius: '20px', fontSize: '0.9rem' }}>React Native</span>
                    <span className="tech-tag" style={{ padding: '5px 15px', background: '#e0e0e0', borderRadius: '20px', fontSize: '0.9rem' }}>Flutter</span>
                    <span className="tech-tag" style={{ padding: '5px 15px', background: '#e0e0e0', borderRadius: '20px', fontSize: '0.9rem' }}>Swift iOS</span>
                    <span className="tech-tag" style={{ padding: '5px 15px', background: '#e0e0e0', borderRadius: '20px', fontSize: '0.9rem' }}>Kotlin Android</span>
                  </div>
                </div>
              </div>
              <div className="service-detail-image" style={{ flex: '1 1 400px' }}>
                <img src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop" alt="Application mobile" style={{ width: '100%', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} loading="lazy" />
              </div>
            </div>
          </div>
        </section>

        {/* Section Intégration API */}
        <section id="api" className="service-detail scroll-reveal" style={{ padding: '80px 0', background: '#fff' }}>
          <div className="container">
            <div className="service-detail-content" style={{ display: 'flex', gap: '40px', alignItems: 'center', flexWrap: 'wrap' }}>
              <div className="service-detail-text" style={{ flex: '1 1 500px' }}>
                <h2 style={{ fontSize: '2.5rem', color: '#1a1a1a', marginBottom: '10px' }}>Intégration API et Services Web</h2>
                <h3 style={{ fontSize: '1.2rem', color: '#ff6600', marginBottom: '20px' }}>Connexion et synchronisation de vos systèmes</h3>
                <p style={{ marginBottom: '20px', lineHeight: 1.6 }}>
                  Connectez vos applications avec des <strong>API REST performantes et sécurisées</strong>. Nous automatisons vos processus métier.
                </p>
                
                <ul className="service-features" style={{ listStyle: 'none', padding: 0 }}>
                  <li style={{ marginBottom: '10px' }}>🔗 <strong>Développement API REST</strong> - Architecture scalable</li>
                  <li style={{ marginBottom: '10px' }}>🔗 <strong>Intégration APIs tierces</strong> - CRM, ERP, Paiement</li>
                  <li style={{ marginBottom: '10px' }}>🔗 <strong>Microservices</strong> - Systèmes modulaires</li>
                  <li style={{ marginBottom: '10px' }}>🔗 <strong>Sécurité robuste</strong> - OAuth2 et JWT</li>
                </ul>
              </div>
              <div className="service-detail-image" style={{ flex: '1 1 400px' }}>
                <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop" alt="Intégration API" style={{ width: '100%', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} loading="lazy" />
              </div>
            </div>
          </div>
        </section>

        {/* Section Consulting IT */}
        <section id="consulting" className="service-detail service-detail-reverse scroll-reveal" style={{ padding: '80px 0', background: '#f8f9fa' }}>
          <div className="container">
            <div className="service-detail-content" style={{ display: 'flex', gap: '40px', alignItems: 'center', flexWrap: 'wrap', flexDirection: 'row-reverse' }}>
              <div className="service-detail-text" style={{ flex: '1 1 500px' }}>
                <h2 style={{ fontSize: '2.5rem', color: '#1a1a1a', marginBottom: '10px' }}>Consulting IT & Transformation</h2>
                <h3 style={{ fontSize: '1.2rem', color: '#ff6600', marginBottom: '20px' }}>Accompagnement stratégique digital</h3>
                <p style={{ marginBottom: '20px', lineHeight: 1.6 }}>
                  Bénéficiez de notre <strong>expertise en transformation digitale</strong> pour moderniser vos processus.
                </p>
                
                <ul className="service-features" style={{ listStyle: 'none', padding: 0 }}>
                  <li style={{ marginBottom: '10px' }}>💡 <strong>Audit infrastructure</strong> - Analyse complète</li>
                  <li style={{ marginBottom: '10px' }}>💡 <strong>Architecture logicielle</strong> - Conception évolutive</li>
                  <li style={{ marginBottom: '10px' }}>💡 <strong>Migration Cloud</strong> - AWS, Azure</li>
                  <li style={{ marginBottom: '10px' }}>💡 <strong>Optimisation des performances</strong></li>
                </ul>
              </div>
              <div className="service-detail-image" style={{ flex: '1 1 400px' }}>
                <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop" alt="Consulting IT" style={{ width: '100%', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} loading="lazy" />
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="services-cta scroll-reveal" style={{ padding: '80px 0', textAlign: 'center', background: '#ff6600', color: 'white' }}>
          <div className="container">
            <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Prêt à Démarrer Votre Projet Digital ?</h2>
            <p style={{ fontSize: '1.2rem', marginBottom: '30px' }}>Contactez-nous dès aujourd'hui pour discuter de vos besoins</p>
            <div className="cta-buttons" style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/apropos#contact" className="btn" style={{ background: '#1a1a1a', color: 'white', padding: '15px 30px', borderRadius: '5px', fontWeight: 'bold', textDecoration: 'none' }}>Nous contacter</Link>
              <a href="tel:0022244590985" className="btn" style={{ background: 'transparent', border: '2px solid white', color: 'white', padding: '15px 30px', borderRadius: '5px', fontWeight: 'bold', textDecoration: 'none' }}>Appelez-nous: 00 222 44590985</a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer role="contentinfo">
        <div className="footer-main">
          <div className="container">
            <div className="footer-content">
              {/* Colonne À propos */}
              <div className="footer-about">
                <div className="footer-logo">
                  <img src="/assets/icon.png" alt="SMOOD Tech" className="footer-logo-img" />
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
                    <a href="mailto:contact@smooodtech.com">contact@smooodtech.com</a>
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
