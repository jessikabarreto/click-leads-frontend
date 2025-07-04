import React, { useState, useEffect } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalClientes: 0,
    totalLeads: 0,
    totalProjetos: 0,
    faturamentoMensal: 0
  });

  const [recentActivities, setRecentActivities] = useState([
    {
      id: 1,
      type: 'lead',
      title: 'Novo lead captado',
      description: 'Lead do Google Maps - Restaurante Sabor & Arte',
      time: '5 min atrás',
      icon: '🎯'
    },
    {
      id: 2,
      type: 'client',
      title: 'Cliente adicionado',
      description: 'Clínica Odontológica Sorriso Perfeito',
      time: '1 hora atrás',
      icon: '👥'
    },
    {
      id: 3,
      type: 'report',
      title: 'Relatório enviado',
      description: 'Relatório mensal de SEO para Padaria do João',
      time: '2 horas atrás',
      icon: '📊'
    },
    {
      id: 4,
      type: 'campaign',
      title: 'Campanha otimizada',
      description: 'Google Ads - Academia Fitness Pro',
      time: '3 horas atrás',
      icon: '💰'
    }
  ]);

  const quickActions = [
    {
      id: 'add-client',
      title: 'Adicionar Cliente',
      description: 'Cadastrar novo cliente',
      icon: '👥',
      color: 'primary'
    },
    {
      id: 'capture-leads',
      title: 'Captar Leads',
      description: 'Iniciar captação de leads',
      icon: '🎯',
      color: 'success'
    },
    {
      id: 'create-report',
      title: 'Gerar Relatório',
      description: 'Criar novo relatório',
      icon: '📊',
      color: 'warning'
    },
    {
      id: 'send-whatsapp',
      title: 'Enviar WhatsApp',
      description: 'Mensagem via WhatsApp',
      icon: '💬',
      color: 'secondary'
    }
  ];

  const moduleStats = [
    { name: 'SEO Sites', active: 12, total: 15, percentage: 80 },
    { name: 'Google Perfis', active: 8, total: 10, percentage: 80 },
    { name: 'Tráfego Pago', active: 6, total: 8, percentage: 75 },
    { name: 'Redes Sociais', active: 10, total: 12, percentage: 83 }
  ];

  useEffect(() => {
    // Simular carregamento de dados
    const loadStats = async () => {
      // Em produção, isso seria uma chamada para a API
      setTimeout(() => {
        setStats({
          totalClientes: 47,
          totalLeads: 156,
          totalProjetos: 23,
          faturamentoMensal: 45780
        });
      }, 1000);
    };

    loadStats();
  }, []);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="welcome-section">
          <h1 className="dashboard-title">
            Bem-vindo ao Click Leads! 🚀
          </h1>
          <p className="dashboard-subtitle">
            Gerencie seus clientes, leads e projetos de forma inteligente
          </p>
        </div>
        <div className="dashboard-date">
          {new Date().toLocaleDateString('pt-BR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
      </div>

      {/* Estatísticas principais */}
      <div className="stats-grid">
        <div className="stat-card primary">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <div className="stat-number">{stats.totalClientes}</div>
            <div className="stat-label">Clientes Ativos</div>
          </div>
          <div className="stat-trend positive">+12%</div>
        </div>

        <div className="stat-card success">
          <div className="stat-icon">🎯</div>
          <div className="stat-content">
            <div className="stat-number">{stats.totalLeads}</div>
            <div className="stat-label">Leads Captados</div>
          </div>
          <div className="stat-trend positive">+28%</div>
        </div>

        <div className="stat-card warning">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <div className="stat-number">{stats.totalProjetos}</div>
            <div className="stat-label">Projetos Ativos</div>
          </div>
          <div className="stat-trend positive">+5%</div>
        </div>

        <div className="stat-card secondary">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <div className="stat-number">{formatCurrency(stats.faturamentoMensal)}</div>
            <div className="stat-label">Faturamento Mensal</div>
          </div>
          <div className="stat-trend positive">+18%</div>
        </div>
      </div>

      <div className="dashboard-content">
        {/* Ações rápidas */}
        <div className="dashboard-section">
          <h2 className="section-title">Ações Rápidas</h2>
          <div className="quick-actions-grid">
            {quickActions.map((action) => (
              <div key={action.id} className={`quick-action-card ${action.color}`}>
                <div className="action-icon">{action.icon}</div>
                <div className="action-content">
                  <h3 className="action-title">{action.title}</h3>
                  <p className="action-description">{action.description}</p>
                </div>
                <button className="action-btn">
                  <span>→</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-row">
          {/* Atividades recentes */}
          <div className="dashboard-section">
            <h2 className="section-title">Atividades Recentes</h2>
            <div className="activities-list">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="activity-item">
                  <div className="activity-icon">{activity.icon}</div>
                  <div className="activity-content">
                    <h4 className="activity-title">{activity.title}</h4>
                    <p className="activity-description">{activity.description}</p>
                    <span className="activity-time">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance dos módulos */}
          <div className="dashboard-section">
            <h2 className="section-title">Performance dos Módulos</h2>
            <div className="modules-performance">
              {moduleStats.map((module, index) => (
                <div key={index} className="module-stat">
                  <div className="module-info">
                    <span className="module-name">{module.name}</span>
                    <span className="module-numbers">{module.active}/{module.total}</span>
                  </div>
                  <div className="module-progress">
                    <div 
                      className="progress-bar"
                      style={{ width: `${module.percentage}%` }}
                    ></div>
                  </div>
                  <span className="module-percentage">{module.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

