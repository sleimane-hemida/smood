import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../Accueil/Accueil.css'; // On réutilise le même CSS global (style.css)
import { apiUrl } from '../../app/api';
import diyeImage from '../../assets/diye.jpeg';
import omarImage from '../../assets/omar.png';
import oumouImage from '../../assets/oumou.png';
import sleimaneImage from '../../assets/sleimane.jpg';
import toureImage from '../../assets/toure.jpeg';

const founders = [
  {
    id: 1,
    name: 'Sleimane Hemida',
    role: 'Développeur Spécialiste',
    specialty: 'Prototype UI/UX',
    image: sleimaneImage,
    description: 'Expert en conception d interfaces utilisateur et prototypage. Maitre des outils comme Figma et Adobe XD, Sleimane transforme les idees en experiences visuelles captivantes et fonctionnelles.',
    skills: ['UI/UX Design', 'Figma', 'Adobe XD', 'Prototypage'],
  },
  {
    id: 2,
    name: 'Mamoudou Touré',
    role: 'Développeur Spécialiste',
    specialty: 'Réseau & Administration',
    image: toureImage,
    description: 'Architecte réseau chevronné, Mamoudou assure la sécurité et l efficacité de nos infrastructures. Expert en administration système et configurations réseau complexes.',
    skills: ['Réseau', 'Administration', 'Sécurité', 'Infrastructure'],
  },
  {
    id: 3,
    name: 'Oumou Diop',
    role: 'Développeuse Spécialiste',
    specialty: 'Technologies Sophistiquées',
    image: oumouImage,
    description: 'Pionnière des technologies avancées, Oumou intègre les solutions les plus innovantes dans nos projets. Spécialiste en IA, machine learning et architectures modernes.',
    skills: ['IA & ML', 'Cloud Computing', 'Big Data', 'Innovation'],
  },
  {
    id: 4,
    name: 'Omar Sall',
    role: 'Développeur Spécialiste',
    specialty: 'Réseau & Administration',
    image: omarImage,
    description: 'Expert en infrastructures réseau et systèmes distribués. Omar garantit la performance et la fiabilité de nos solutions avec une expertise en DevOps et administration système.',
    skills: ['DevOps', 'Réseau', 'Linux', 'Automation'],
  },
  {
    id: 5,
    name: 'Diye Ba',
    role: 'Développeuse Spécialiste',
    specialty: 'Technologies Sophistiquées',
    image: diyeImage,
    description: 'Visionnaire technologique, Diye repousse les limites du possible. Experte en développement full-stack et architectures microservices, elle façonne l avenir de nos applications.',
    skills: ['Full-Stack', 'Microservices', 'API Design', 'Architecture'],
  },
];

export default function Apropos() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  const [submitState, setSubmitState] = useState({ type: '', message: '' });
  const [activeFounderIndex, setActiveFounderIndex] = useState(0);

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

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveFounderIndex((currentIndex) => (currentIndex + 1) % founders.length);
    }, 5000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    };

    setSubmitState({ type: 'loading', message: 'Envoi du message en cours...' });

    try {
      const response = await fetch(apiUrl('/api/contact-messages'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Impossible d envoyer le message.')
      }

      form.reset();
      setSubmitState({
        type: 'success',
        message: 'Votre message a bien ete envoye. Nous vous recontacterons rapidement.',
      });
    } catch (error) {
      setSubmitState({
        type: 'error',
        message: error.message,
      });
    }
  }

  return (
    <div className="apropos-page">
      {/* En-tête avec navigation */}
      <header role="banner" className="header">
        <div className="container">
          <Link to="/" className="logo" aria-label="Accueil SMOOD Tech">
            <img src="/icon.png" alt="SMOOD Tech" className="logo-icon" />
          </Link>
          
          <nav role="navigation" aria-label="Menu principal">
            <ul className={menuOpen ? 'active' : ''}>
              <li><Link to="/" className="nav-link" onClick={closeMenu}>Accueil</Link></li>
              <li><Link to="/services" className="nav-link" onClick={closeMenu}>Services</Link></li>
              <li><Link to="/projets" className="nav-link" onClick={closeMenu}>Projets</Link></li>
              <li><Link to="/apropos" className="nav-link active" aria-current="page" onClick={closeMenu}>À propos</Link></li>
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
      
      <main role="main">
        {/* Section Titre Principal */}
        <section 
          className="page-hero" 
          style={{ padding: '120px 20px 40px', textAlign: 'center', background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)' }}
        >
          <div className="container">
            <h1 style={{ fontSize: '3.5rem', fontWeight: 800, color: '#1a1a1a', marginBottom: '20px', fontFamily: "'Inter', sans-serif" }}>
              L'<span style={{ color: '#ff6600' }}>Équipe</span> SMOOD Tech
            </h1>
            <p style={{ fontSize: '1.3rem', color: '#666', maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}>
              Rencontrez les 5 fondateurs experts qui transforment vos idées en solutions digitales innovantes à Nouakchott, Mauritanie
            </p>
          </div>
        </section>
        
        {/* Section Fondateurs Carousel */}
        <section className="founders-carousel" role="region" aria-label="Nos Fondateurs">
          <div className="carousel-container">
            {founders.map((founder, index) => (
              <div
                key={founder.id}
                className={`founder-slide ${index === activeFounderIndex ? 'active' : ''}`}
                data-founder={founder.id}
                aria-hidden={index === activeFounderIndex ? 'false' : 'true'}
              >
                <div className="founder-image">
                  <img src={founder.image} alt={founder.name} />
                  <div className="founder-overlay"></div>
                </div>
                <div className="founder-content">
                  <div className="founder-number">{String(founder.id).padStart(2, '0')}</div>
                  <h2 className="founder-name">{founder.name}</h2>
                  <p className="founder-role">{founder.role}</p>
                  <p className="founder-specialty">{founder.specialty}</p>
                  <div className="founder-description">
                    <p>{founder.description}</p>
                  </div>
                  <div className="founder-skills">
                    {founder.skills.map((skill) => (
                      <span key={skill} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* Navigation dots */}
            <div className="carousel-dots">
              {founders.map((founder, index) => (
                <button
                  key={founder.id}
                  type="button"
                  className={`dot ${index === activeFounderIndex ? 'active' : ''}`}
                  data-slide={founder.id}
                  aria-label={`Fondateur ${founder.id}`}
                  onClick={() => setActiveFounderIndex(index)}
                ></button>
              ))}
            </div>

            {/* Progress bar */}
            <div className="carousel-progress">
              <div key={activeFounderIndex} className="progress-bar"></div>
            </div>
          </div>
        </section>

        {/* Section À propos de l'entreprise */}
        <section className="company-info scroll-reveal" role="region" aria-label="À propos de SMOOD Tech">
          <div className="container">
            <div className="company-content">
              <div className="company-header">
                <h2>SMOOD <span className="accent">Tech</span></h2>
                <p className="company-tagline">L'innovation au service de vos ambitions</p>
              </div>
              
              <div className="company-description">
                <p>Fondée par une équipe passionnée d'étudiants en Licence 3, <strong>SMOOD Tech</strong> est née de la volonté de transformer les idées innovantes en solutions technologiques concrètes.</p>
                
                <p>Notre équipe multidisciplinaire combine expertise technique et créativité pour offrir des services de développement d'applications web, mobile et desktop de haute qualité. Nous excellons également dans le prototypage et la conception UI/UX avec des outils professionnels comme Figma et Adobe XD.</p>

                <div className="company-values">
                  <div className="value-item">
                    <div className="value-icon">💡</div>
                    <h3>Innovation</h3>
                    <p>Nous restons à la pointe des technologies émergentes</p>
                  </div>
                  <div className="value-item">
                    <div className="value-icon">🤝</div>
                    <h3>Collaboration</h3>
                    <p>Une équipe soudée pour des résultats exceptionnels</p>
                  </div>
                  <div className="value-item">
                    <div className="value-icon">🎯</div>
                    <h3>Excellence</h3>
                    <p>La qualité au cœur de chaque projet</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Contact */}
        <section id="contact" className="contact-section scroll-reveal" role="region" aria-label="Nous contacter">
          <div className="contact-container">
            <div className="contact-header">
              <h2>Contactez <span className="accent">SMOOD Tech</span></h2>
              <p>Transformons ensemble vos idées en solutions digitales innovantes</p>
            </div>

            <div className="contact-wrapper">
              {/* Formulaire de contact */}
              <div className="contact-form-wrapper">
                <form className="modern-contact-form" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                        Nom complet
                      </label>
                      <input type="text" id="name" name="name" placeholder="Ex: Jean Dupont" required />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                          <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                        Email
                      </label>
                      <input type="email" id="email" name="email" placeholder="votre.email@exemple.com" required />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="phone">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                        Téléphone
                      </label>
                      <input type="tel" id="phone" name="phone" placeholder="+222 XX XX XX XX" />
                    </div>

                    <div className="form-group">
                      <label htmlFor="subject">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                        </svg>
                        Sujet
                      </label>
                      <select id="subject" name="subject" required>
                        <option value="">Sélectionnez un sujet</option>
                        <option value="web">Développement Web</option>
                        <option value="mobile">Application Mobile</option>
                        <option value="api">Intégration API</option>
                        <option value="consulting">Consulting IT</option>
                        <option value="autre">Autre demande</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group full-width">
                    <label htmlFor="message">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                      </svg>
                      Votre message
                    </label>
                    <textarea id="message" name="message" rows="6" placeholder="Décrivez-nous votre projet..." required></textarea>
                  </div>

                  <button type="submit" className="submit-btn">
                    <span>Envoyer le message</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                  </button>

                  {submitState.message && (
                    <p className={`contact-form-feedback contact-form-feedback-${submitState.type}`}>
                      {submitState.message}
                    </p>
                  )}
                </form>
              </div>

              {/* Informations de contact */}
              <div className="contact-info-card">
                <h3>Nos coordonnées</h3>
                <div className="info-items">
                  <div className="info-item">
                    <div className="info-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                    </div>
                    <div className="info-content">
                      <h4>Email</h4>
                      <a href="mailto:juleediengg@gmail.com">juleediengg@gmail.com</a>
                    </div>
                  </div>

                  <div className="info-item">
                    <div className="info-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                    </div>
                    <div className="info-content">
                      <h4>Téléphone</h4>
                      <a href="tel:0022244590985">00 222 44590985</a>
                    </div>
                  </div>

                  <div className="info-item">
                    <div className="info-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                    </div>
                    <div className="info-content">
                      <h4>Adresse</h4>
                      <p>Nouakchott, Mauritanie</p>
                    </div>
                  </div>

                  <div className="info-item">
                    <div className="info-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                    </div>
                    <div className="info-content">
                      <h4>Horaires</h4>
                      <p>Lun - Ven: 9h - 18h</p>
                      <p>Sam: 10h - 14h</p>
                    </div>
                  </div>
                </div>

                <div className="social-links">
                  <h4>Suivez-nous</h4>
                  <div className="social-icons">
                    <a href="#" aria-label="LinkedIn">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    </a>
                    <a href="#" aria-label="Twitter">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                    </a>
                    <a href="#" aria-label="GitHub">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

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
