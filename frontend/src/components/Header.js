import React, { useState } from 'react';
import './Header.css';

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    {
      id: 1,
      type: 'success',
      title: 'Novo lead captado',
      message: 'Lead do Google Maps foi adicionado com sucesso',
      time: '2 min atrás',
      icon: '🎯'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Relatório pendente',
      message: 'Relatório mensal de SEO precisa ser enviado',
      time: '1 hora atrás',
      icon: '📊'
    },
    {
      id: 3,
      type: 'info',
      title: 'Campanha ativa',
      message: 'Campanha do Google Ads está performando bem',
      time: '3 horas atrás',
      icon: '💰'
    }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Pesquisando por:', searchQuery);
      // Implementar lógica de pesquisa
    }
  };

  return (
    <header className="header">
      <div className="header-left">
        <button 
          className="mobile-menu-btn"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          ☰
        </button>
        
        <div className="breadcrumb">
          <span className="breadcrumb-item">Click Leads</span>
          <span className="breadcrumb-separator">›</span>
          <span className="breadcrumb-item current">Dashboard</span>
        </div>
      </div>

      <div className="header-center">
        <form className="search-form" onSubmit={handleSearch}>
          <div className="search-input-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Pesquisar clientes, leads, projetos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            {searchQuery && (
              <button
                type="button"
                className="clear-search"
                onClick={() => setSearchQuery('')}
              >
                ✕
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="header-right">
        <div className="header-actions">
          <button className="action-btn" title="Ajuda">
            <span className="action-icon">❓</span>
          </button>
          
          <div className="notifications-wrapper">
            <button 
              className="action-btn notifications-btn"
              onClick={() => setShowNotifications(!showNotifications)}
              title="Notificações"
            >
              <span className="action-icon">🔔</span>
              {notifications.length > 0 && (
                <span className="notification-badge">{notifications.length}</span>
              )}
            </button>
            
            {showNotifications && (
              <div className="notifications-dropdown">
                <div className="notifications-header">
                  <h3>Notificações</h3>
                  <button className="mark-all-read">Marcar todas como lidas</button>
                </div>
                <div className="notifications-list">
                  {notifications.map((notification) => (
                    <div key={notification.id} className={`notification-item ${notification.type}`}>
                      <div className="notification-icon">{notification.icon}</div>
                      <div className="notification-content">
                        <div className="notification-title">{notification.title}</div>
                        <div className="notification-message">{notification.message}</div>
                        <div className="notification-time">{notification.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="notifications-footer">
                  <button className="view-all-btn">Ver todas as notificações</button>
                </div>
              </div>
            )}
          </div>

          <div className="user-menu">
            <button className="user-avatar" title="Menu do usuário">
              <span>👤</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

