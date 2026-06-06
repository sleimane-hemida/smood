import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Accueil/Accueil.css'; // On réutilise le même CSS global (style.css)

export default function Projets() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  const openProject = (projectId) => {
    setSelectedProject(projectId);
    
    // Défiler automatiquement vers le panneau des détails après son apparition
    setTimeout(() => {
      const panel = document.getElementById('projectDetailsPanel');
      if (panel) {
        panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  const closeProject = () => {
    setSelectedProject(null);
  };

  return (
    <div className="projets-page">
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
              <li><Link to="/projets" className="nav-link active" aria-current="page" onClick={closeMenu}>Projets</Link></li>
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
      
      <main role="main">
        {/* Section Titre Principal */}
        <section className="page-hero" style={{ padding: '120px 20px 60px', textAlign: 'center', background: 'linear-gradient(135deg, #1a1a1a 0%, #000000 100%)' }}>
          <div className="container">
            <h1 style={{ fontSize: '3.5rem', fontWeight: 800, color: '#ffffff', marginBottom: '20px', fontFamily: "'Inter', sans-serif" }}>
              Nos <span style={{ color: '#ff6600' }}>Projets</span> Innovants
            </h1>
            <p style={{ fontSize: '1.3rem', color: 'rgba(255, 255, 255, 0.8)', maxWidth: '800px', margin: '0 auto', lineHeight: 1.6 }}>
              Découvrez nos réalisations en développement web, mobile et IA pour entreprises et organisations en Mauritanie
            </p>
          </div>
        </section>
        
        {/* Hub Design avec Logo au Centre et Projets en Étoile */}
        <section className="projects-hub">
          <div className="hub-container">
            {/* Logo Central */}
            <div className="hub-center">
              <div className="hub-logo-circle">
                <img src="/icon.png" alt="SMOOD Tech Hub" className="hub-logo" />
                <h2 className="hub-title">SMOOD Tech</h2>
                <p className="hub-subtitle">Nos Projets</p>
              </div>
            </div>
            
            {/* Branches et Projets */}
            {/* Projet 1: Bia Safia (Haut) */}
            <div className="project-branch branch-1" onClick={() => openProject('bia-safia')} style={{ cursor: 'pointer' }}>
              <div className="branch-line"></div>
              <div className="project-node">
                <div className="node-content">
                  <div className="node-icon">📱</div>
                  <h3>Bia Safia</h3>
                  <span className="node-category">App Mobile</span>
                </div>
              </div>
            </div>
            
            {/* Projet 2: Suivi Tender (Droite Haut) */}
            <div className="project-branch branch-2" onClick={() => openProject('suivi-tender')} style={{ cursor: 'pointer' }}>
              <div className="branch-line"></div>
              <div className="project-node">
                <div className="node-content">
                  <div className="node-icon">💼</div>
                  <h3>Suivi Tender</h3>
                  <span className="node-category">Gestion</span>
                </div>
              </div>
            </div>
            
            {/* Projet 3: Kadou (Droite Bas) */}
            <div className="project-branch branch-3" onClick={() => openProject('kadou')} style={{ cursor: 'pointer' }}>
              <div className="branch-line"></div>
              <div className="project-node">
                <div className="node-content">
                  <div className="node-icon">🤖</div>
                  <h3>Kadou</h3>
                  <span className="node-category">IA</span>
                </div>
              </div>
            </div>

            {/* Projet 5: Telemédecine (Gauche Bas) */}
            <div className="project-branch branch-5" onClick={() => openProject('telemedecine')} style={{ cursor: 'pointer' }}>
              <div className="branch-line"></div>
              <div className="project-node">
                <div className="node-content">
                  <div className="node-icon">🏥</div>
                  <h3>Télémédecine</h3>
                  <span className="node-category">Santé</span>
                </div>
              </div>
            </div>
            
            {/* Projet 6: Gestion Scolaire (Gauche Haut) */}
            <div className="project-branch branch-6" onClick={() => openProject('gestion-scolaire')} style={{ cursor: 'pointer' }}>
              <div className="branch-line"></div>
              <div className="project-node">
                <div className="node-content">
                  <div className="node-icon">🎓</div>
                  <h3>Gestion Scolaire</h3>
                  <span className="node-category">Éducation</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Section d'affichage des détails du projet (Conditionnellement affichée) */}
        {selectedProject && (
          <section className={`project-details-panel ${selectedProject ? 'active' : ''}`} id="projectDetailsPanel">
            <div className="container">
              <button className="close-details" onClick={closeProject} aria-label="Fermer les détails">&times;</button>
              
              <div className="project-details-content">
                {/* Bia Safia Details */}
                {selectedProject === 'bia-safia' && (
                  <div className="project-info active">
                    <div className="project-header">
                      <div className="project-badge-detail">Application Mobile</div>
                      <h2>Bia Safia</h2>
                      <p className="project-tagline">Application mobile de sensibilisation aux causes humanitaires</p>
                    </div>
                    
                    <div className="project-body">
                      <div className="project-description">
                        <h3>À propos du projet</h3>
                        <p><strong>Bia Safia</strong> est une application mobile innovante conçue pour sensibiliser les jeunes mauritaniens aux causes humanitaires et encourager l'engagement citoyen. Cette plateforme digitale permet de connecter les organisations humanitaires avec la jeunesse mauritanienne.</p>
                      </div>
                      
                      <div className="project-features">
                        <h3>Fonctionnalités principales</h3>
                        <ul>
                          <li>📱 Interface mobile intuitive adaptée aux jeunes utilisateurs</li>
                          <li>🎯 Campagnes de sensibilisation aux causes locales</li>
                          <li>👥 Engagement communautaire et participation aux actions</li>
                          <li>📊 Suivi d'impact et visualisation des contributions</li>
                          <li>🔔 Notifications push pour nouveaux événements</li>
                          <li>🗺️ Géolocalisation des actions près de vous</li>
                        </ul>
                      </div>
                      
                      <div className="project-tech">
                        <h3>Technologies utilisées</h3>
                        <div className="tech-tags">
                          <span className="tech-tag">React Native</span>
                          <span className="tech-tag">Firebase</span>
                          <span className="tech-tag">Node.js</span>
                          <span className="tech-tag">MongoDB</span>
                          <span className="tech-tag">Google Maps</span>
                        </div>
                      </div>
                      
                      
                      <div className="project-image">
                        <img src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80" alt="Interface Bia Safia" />
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Suivi Tender Details */}
                {selectedProject === 'suivi-tender' && (
                  <div className="project-info active">
                    <div className="project-header">
                      <div className="project-badge-detail business">Application Entreprise</div>
                      <h2>Suivi Tender</h2>
                      <p className="project-tagline">Plateforme de gestion d'appels d'offres</p>
                    </div>
                    
                    <div className="project-body">
                      <div className="project-description">
                        <h3>À propos du projet</h3>
                        <p><strong>Suivi Tender</strong> est une solution complète de gestion des appels d'offres pour les entreprises mauritaniennes. La plateforme centralise la recherche, le suivi et la soumission aux appels d'offres publics et privés.</p>
                      </div>
                      
                      <div className="project-features">
                        <h3>Fonctionnalités principales</h3>
                        <ul>
                          <li>💼 Centralisation des appels d'offres nationaux</li>
                          <li>🔍 Recherche et filtrage avancés par secteur</li>
                          <li>⏰ Alertes automatiques pour nouveaux tenders</li>
                          <li>📝 Gestion des dossiers de soumission</li>
                          <li>📈 Dashboard analytics et reporting</li>
                          <li>🔒 Sécurité et confidentialité des données</li>
                        </ul>
                      </div>
                      
                      <div className="project-tech">
                        <h3>Technologies utilisées</h3>
                        <div className="tech-tags">
                          <span className="tech-tag">Angular</span>
                          <span className="tech-tag">Spring Boot</span>
                          <span className="tech-tag">PostgreSQL</span>
                          <span className="tech-tag">Docker</span>
                          <span className="tech-tag">AWS</span>
                        </div>
                      </div>
                      
                      
                      <div className="project-image">
                        <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80" alt="Dashboard Suivi Tender" />
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Kadou Details */}
                {selectedProject === 'kadou' && (
                  <div className="project-info active">
                    <div className="project-header">
                      <div className="project-badge-detail ai">Intelligence Artificielle</div>
                      <h2>Kadou</h2>
                      <p className="project-tagline">Traduction IA pour langues mauritaniennes</p>
                    </div>
                    
                    <div className="project-body">
                      <div className="project-description">
                        <h3>À propos du projet</h3>
                        <p><strong>Kadou</strong> est une solution d'intelligence artificielle révolutionnaire pour la traduction des langues mauritaniennes. Le système utilise le machine learning pour traduire entre le hassaniya, le wolof, le pulaar, le soninké et le français/arabe.</p>
                      </div>
                      
                      <div className="project-features">
                        <h3>Fonctionnalités principales</h3>
                        <ul>
                          <li>🤖 Traduction IA multilingue performante</li>
                          <li>🗣️ Support hassaniya, wolof, pulaar, soninké</li>
                          <li>🎤 Reconnaissance vocale en temps réel</li>
                          <li>📖 Dictionnaire contextuel intelligent</li>
                          <li>⚡ Traduction instantanée avec 92% précision</li>
                          <li>📱 API intégrable dans apps tierces</li>
                        </ul>
                      </div>
                      
                      <div className="project-tech">
                        <h3>Technologies utilisées</h3>
                        <div className="tech-tags">
                          <span className="tech-tag">Python</span>
                          <span className="tech-tag">TensorFlow</span>
                          <span className="tech-tag">NLP</span>
                          <span className="tech-tag">FastAPI</span>
                          <span className="tech-tag">Redis</span>
                        </div>
                      </div>
                      
                      
                      <div className="project-image">
                        <img src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80" alt="Interface Kadou IA" />
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Télémédecine Details */}
                {selectedProject === 'telemedecine' && (
                  <div className="project-info active">
                    <div className="project-header">
                      <div className="project-badge-detail health">Santé Digitale</div>
                      <h2>Plateforme Télémédecine</h2>
                      <p className="project-tagline">Consultation médicale à distance</p>
                    </div>
                    
                    <div className="project-body">
                      <div className="project-description">
                        <h3>À propos du projet</h3>
                        <p>Solution de télémédecine permettant des consultations à distance entre patients et médecins en Mauritanie. Améliore l'accès aux soins dans les zones rurales.</p>
                      </div>
                      
                      <div className="project-features">
                        <h3>Fonctionnalités principales</h3>
                        <ul>
                          <li>🏥 Consultations vidéo sécurisées</li>
                          <li>📋 Dossier médical électronique</li>
                          <li>💊 Prescriptions et ordonnances digitales</li>
                          <li>📅 Prise de rendez-vous en ligne</li>
                          <li>🔔 Rappels et suivi des traitements</li>
                          <li>🔒 Conformité HIPAA et sécurité des données</li>
                        </ul>
                      </div>
                      
                      <div className="project-tech">
                        <h3>Technologies utilisées</h3>
                        <div className="tech-tags">
                          <span className="tech-tag">Vue.js</span>
                          <span className="tech-tag">WebRTC</span>
                          <span className="tech-tag">Laravel</span>
                          <span className="tech-tag">MySQL</span>
                          <span className="tech-tag">Socket.io</span>
                        </div>
                      </div>
                      
                      <div className="project-image">
                        <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80" alt="Télémédecine" />
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Gestion Scolaire Details */}
                {selectedProject === 'gestion-scolaire' && (
                  <div className="project-info active">
                    <div className="project-header">
                      <div className="project-badge-detail education">Éducation</div>
                      <h2>Système Gestion Scolaire</h2>
                      <p className="project-tagline">Gestion complète d'établissements scolaires</p>
                    </div>
                    
                    <div className="project-body">
                      <div className="project-description">
                        <h3>À propos du projet</h3>
                        <p>Système de gestion intégré pour établissements scolaires mauritaniens. Centralise la gestion des élèves, notes, emplois du temps, finances et communication parents-école.</p>
                      </div>
                      
                      <div className="project-features">
                        <h3>Fonctionnalités principales</h3>
                        <ul>
                          <li>👨‍🎓 Gestion des inscriptions et dossiers élèves</li>
                          <li>📝 Saisie des notes et bulletins automatisés</li>
                          <li>📅 Emplois du temps dynamiques</li>
                          <li>💰 Gestion financière et scolarité</li>
                          <li>📱 Application mobile pour parents</li>
                          <li>📊 Rapports et statistiques académiques</li>
                        </ul>
                      </div>
                      
                      <div className="project-tech">
                        <h3>Technologies utilisées</h3>
                        <div className="tech-tags">
                          <span className="tech-tag">React</span>
                          <span className="tech-tag">Node.js</span>
                          <span className="tech-tag">Express</span>
                          <span className="tech-tag">MongoDB</span>
                          <span className="tech-tag">React Native</span>
                        </div>
                      </div>
                      
                      <div className="project-image">
                        <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80" alt="Gestion Scolaire" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}
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
