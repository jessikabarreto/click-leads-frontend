import React from 'react';
import './Sidebar.css';

const Sidebar = ({ currentPage, setCurrentPage, isOpen, setIsOpen }) => {
  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: '📊',
      category: 'principal'
    },
    {
      id: 'clientes',
      label: 'Clientes',
      icon: '👥',
      category: 'gestao'
    },
    {
      id: 'leads',
      label: 'Captação de Leads',
      icon: '🎯',
      category: 'marketing'
    },
    {
      id: 'seo-sites',
      label: 'SEO Sites',
      icon: '🌐',
      category: 'marketing'
    },
    {
      id: 'google-perfis',
      label: 'Google Perfis',
      icon: '📍',
      category: 'marketing'
    },
    {
      id: 'trafego-pago',
      label: 'Tráfego Pago',
      icon: '💰',
      category: 'marketing'
    },
    {
      id: 'redes-sociais',
      label: 'Redes Sociais',
      icon: '📱',
      category: 'marketing'
    },
    {
      id: 'relatorios',
      label: 'Relatórios',
      icon: '📈',
      category: 'gestao'
    },
    {
      id: 'sucesso-cliente',
      label: 'Sucesso do Cliente',
      icon: '⭐',
      category: 'gestao'
    },
    {
      id: 'financeiro',
      label: 'Financeiro',
      icon: '💳',
      category: 'gestao'
    },
    {
      id: 'contratos',
      label: 'Contratos',
      icon: '📄',
      category: 'gestao'
    },
    {
      id: 'equipe',
      label: 'Gestão de Equipe',
      icon: '👨‍💼',
      category: 'gestao'
    },
    {
      id: 'metas',
      label: 'Metas',
      icon: '🎯',
      category: 'gestao'
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      icon: '💬',
      category: 'comunicacao'
    },
    {
      id: 'marketing',
      label: 'Marketing Interno',
      icon: '📢',
      category: 'comunicacao'
    },
    {
      id: 'precificacao',
      label: 'Precificação IA',
      icon: '🤖',
      category: 'ia'
    },
    {
      id: 'otimizacao',
      label: 'Entrega Otimização',
      icon: '🚀',
      category: 'ia'
    },
    {
      id: 'servicos',
      label: 'Serviços',
      icon: '⚙️',
      category: 'configuracao'
    }
  ];

  const categories = {
    principal: 'Principal',
    gestao: 'Gestão',
    marketing: 'Marketing',
    comunicacao: 'Comunicação',
    ia: 'Inteligência Artificial',
    configuracao: 'Configuração'
  };

  const groupedItems = menuItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <div className="logo">
          <span className="logo-icon">🚀</span>
          {isOpen && <span className="logo-text">Click Leads</span>}
        </div>
        <button 
          className="toggle-btn"
          onClick={() => setIsOpen(!isOpen)}
          title={isOpen ? 'Recolher menu' : 'Expandir menu'}
        >
          {isOpen ? '◀' : '▶'}
        </button>
      </div>

      <nav className="sidebar-nav">
        {Object.entries(groupedItems).map(([category, items]) => (
          <div key={category} className="nav-category">
            {isOpen && (
              <div className="category-title">
                {categories[category]}
              </div>
            )}
            <ul className="nav-list">
              {items.map((item) => (
                <li key={item.id} className="nav-item">
                  <button
                    className={`nav-link ${currentPage === item.id ? 'active' : ''}`}
                    onClick={() => setCurrentPage(item.id)}
                    title={!isOpen ? item.label : ''}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    {isOpen && <span className="nav-label">{item.label}</span>}
                    {currentPage === item.id && <div className="active-indicator" />}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        {isOpen && (
          <div className="user-info">
            <div className="user-avatar">👤</div>
            <div className="user-details">
              <div className="user-name">Administrador</div>
              <div className="user-role">Super Admin</div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;

