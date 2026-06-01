import React, { useEffect, useState } from 'react';
import { apiUrl } from '../../app/api';
import './Admin.css';

const metricIcons = ['VI', 'TM', 'PG'];

const dashboard = {
  metrics: [
    {
      label: 'Visiteurs ce mois-ci',
      value: '12 480',
      change: '+18.4%',
    },
    {
      label: 'Temps cumule passe sur le site',
      value: '386 h',
      change: '+9.2%',
    },
    {
      label: 'Pages visitees',
      value: '34 920',
      change: '+11.7%',
    },
  ],
  visitorsTrend: [
    { month: 'Jan', visitors: 4200 },
    { month: 'Fev', visitors: 5100 },
    { month: 'Mar', visitors: 5900 },
    { month: 'Avr', visitors: 6800 },
    { month: 'Mai', visitors: 9250 },
    { month: 'Juin', visitors: 10100 },
    { month: 'Juil', visitors: 11250 },
    { month: 'Aout', visitors: 12480 },
  ],
  contactMessages: [
    {
      id: 1,
      name: 'Aminata Diallo',
      email: 'aminata.diallo@mail.com',
      phone: '+222 44 78 12 30',
      subject: 'Demande de site vitrine',
      message: 'Bonjour, je souhaite un site vitrine moderne pour mon entreprise avec formulaire de contact et presentation des services.',
    },
    {
      id: 2,
      name: 'Mohamed Salem',
      email: 'm.salem@entreprise.mr',
      phone: '+222 36 90 45 11',
      subject: 'Application mobile',
      message: 'Nous cherchons une equipe pour developper une application mobile de suivi de commandes avec espace administrateur.',
    },
    {
      id: 3,
      name: 'Fatimetou Mint Ahmed',
      email: 'fatimetou.ahmed@gmail.com',
      phone: '+222 27 18 04 55',
      subject: 'Refonte de plateforme',
      message: 'Je veux refaire la plateforme actuelle pour avoir un design plus professionnel et une meilleure experience utilisateur.',
    },
    {
      id: 4,
      name: 'Cheikh Ould Mbarek',
      email: 'cheikh.mbarek@smartexample.io',
      phone: '+222 22 60 33 19',
      subject: 'Integration API',
      message: 'Pouvez-vous nous aider a connecter notre site web a une API de paiement et a un tableau de bord interne ?',
    },
  ],
};

function buildChartGeometry(points) {
  if (!points.length) {
    return {
      polylinePoints: '',
      areaPoints: '',
      labels: [],
      yTicks: [],
    };
  }

  const width = 760;
  const height = 260;
  const paddingX = 26;
  const paddingTop = 24;
  const paddingBottom = 34;
  const maxVisitors = Math.max(...points.map((point) => point.visitors));
  const stepX = points.length > 1 ? (width - paddingX * 2) / (points.length - 1) : 0;
  const tickCount = 4;

  const coordinates = points.map((point, index) => {
    const x = paddingX + stepX * index;
    const normalizedValue = maxVisitors === 0 ? 0 : point.visitors / maxVisitors;
    const y = height - paddingBottom - normalizedValue * (height - paddingTop - paddingBottom);

    return {
      ...point,
      x,
      y,
    };
  });

  const polylinePoints = coordinates.map((point) => `${point.x},${point.y}`).join(' ');
  const areaPoints = [
    `${coordinates[0].x},${height - paddingBottom}`,
    polylinePoints,
    `${coordinates[coordinates.length - 1].x},${height - paddingBottom}`,
  ].join(' ');

  const yTicks = Array.from({ length: tickCount + 1 }, (_, index) => {
    const value = Math.round((maxVisitors / tickCount) * (tickCount - index));
    const normalizedValue = maxVisitors === 0 ? 0 : value / maxVisitors;
    const y = height - paddingBottom - normalizedValue * (height - paddingTop - paddingBottom);

    return {
      value,
      y,
    };
  });

  return {
    polylinePoints,
    areaPoints,
    labels: coordinates,
    yTicks,
  };
}

export default function Admin() {
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    return `${year}-${month}`;
  });
  const [analytics, setAnalytics] = useState({
    metrics: dashboard.metrics,
    visitorsTrend: dashboard.visitorsTrend,
    selectedMonthLabel: 'Mois en cours',
  });
  const [messages, setMessages] = useState(dashboard.contactMessages);

  const metrics = analytics.metrics.slice(0, 3);
  const chart = buildChartGeometry(analytics.visitorsTrend);

  useEffect(() => {
    let isMounted = true;

    async function loadAnalytics() {
      try {
        const response = await fetch(apiUrl(`/api/dashboard?month=${selectedMonth}`));

        if (!response.ok) {
          return;
        }

        const data = await response.json();

        if (!isMounted) {
          return;
        }

        setAnalytics({
          metrics: data.metrics || dashboard.metrics,
          visitorsTrend: data.visitorsTrend || dashboard.visitorsTrend,
          selectedMonthLabel: data.selectedMonthLabel || 'Mois en cours',
        });
      } catch (_error) {
        // Keep fallback mock data when analytics data is unavailable.
      }
    }

    async function loadMessages() {
      try {
        const response = await fetch(apiUrl('/api/contact-messages'));

        if (!response.ok) {
          return;
        }

        const data = await response.json();

        if (!isMounted) {
          return;
        }

        setMessages(data.items);
      } catch (_error) {
        // Keep fallback mock data in the admin UI when the API is unavailable.
      }
    }

    loadAnalytics();
    loadMessages();

    return () => {
      isMounted = false;
    };
  }, [selectedMonth]);

  return (
    <div className="admin-shell">
      <main className="admin-main admin-main-simple">
        <section className="admin-heading">
          <div>
            <p className="admin-kicker">Vue generale</p>
            <h1>Statistiques principales</h1>
            <p className="admin-topbar-text">
              Dashboard visuel avec des donnees de demonstration pour travailler le design avant de brancher la vraie logique.
            </p>
          </div>
          <div className="admin-month-filter">
            <label htmlFor="admin-month">Filtrer par mois</label>
            <input
              id="admin-month"
              type="month"
              value={selectedMonth}
              onChange={(event) => setSelectedMonth(event.target.value)}
            />
          </div>
        </section>

        <section className="admin-metrics-grid admin-metrics-grid-top admin-metrics-grid-three">
          {metrics.map((metric, index) => (
            <article key={metric.label} className="admin-metric-card admin-metric-card-clean">
              <div className="admin-metric-icon">{metricIcons[index] || 'S'}</div>
              <strong>{metric.value}</strong>
              <p>{metric.label}</p>
              <span>{metric.change} ce mois-ci</span>
            </article>
          ))}
        </section>

        <section className="admin-chart-panel">
          <div className="admin-chart-header">
            <div>
              <p className="admin-kicker">Evolution mensuelle</p>
              <h2>Courbe des visiteurs</h2>
              <p className="admin-chart-subtitle">Periode selectionnee : {analytics.selectedMonthLabel}</p>
            </div>
            <div className="admin-chart-legend">
              <span className="admin-chart-legend-dot"></span>
              <span>Visiteurs</span>
            </div>
          </div>

          <div className="admin-chart-shell">
            <svg viewBox="0 0 760 260" className="admin-chart" role="img" aria-label="Evolution des visiteurs au cours des mois">
              <defs>
                <linearGradient id="chartAreaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(95, 124, 255, 0.28)" />
                  <stop offset="100%" stopColor="rgba(95, 124, 255, 0.04)" />
                </linearGradient>
              </defs>

              {chart.yTicks.map((tick) => (
                <line key={tick.y} x1="60" y1={tick.y} x2="734" y2={tick.y} className="admin-chart-grid-line" />
              ))}

              {chart.areaPoints && <polygon points={chart.areaPoints} fill="url(#chartAreaGradient)" />}
              {chart.polylinePoints && <polyline points={chart.polylinePoints} className="admin-chart-line" />}

              {chart.labels.map((point) => (
                <g key={point.month}>
                  <circle cx={point.x} cy={point.y} r="3" className="admin-chart-point" />
                  <text x={point.x} y={point.y - 12} textAnchor="middle" className="admin-chart-point-value">
                    {point.visitors.toLocaleString('fr-FR')}
                  </text>
                  <text x={point.x} y="246" textAnchor="middle" className="admin-chart-label">{point.month}</text>
                </g>
              ))}
            </svg>
          </div>
        </section>

        <section className="admin-table-panel">
          <div className="admin-table-header">
            <div>
              <p className="admin-kicker">Section contacter nous</p>
              <h2>Messages recus</h2>
            </div>
            <span className="admin-table-count">{messages.length} messages</span>
          </div>

          <div className="admin-table-shell">
            <table className="admin-message-table">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Email</th>
                  <th>Tel</th>
                  <th>Sujet</th>
                  <th>Message</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>
                      <span className="admin-table-badge">{item.subject}</span>
                    </td>
                    <td className="admin-message-cell">{item.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}