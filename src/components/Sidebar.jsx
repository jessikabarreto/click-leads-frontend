import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = ({ currentPage, setCurrentPage, isOpen, setIsOpen }) => {
  const [expandedSections, setExpandedSections] = useState({
    'gestao-interna': false,
    'portfolio-servicos': false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: '📊',
      type: 'page'
    },
    {
      id: 'clientes',
      label: 'Clientes',
      icon: '👥',
      type: 'page'
    },
    {
      id: 'leads',
      label: 'Captação de Leads',
      icon: '🎯',
      type: 'page'
    },
    {
      id: 'relatorios',
      label: 'Relatórios',
      icon: '📈',
      type: 'page'
    },
    {
      id: 'portfolio-servicos',
      label: 'Portfólio de Serviços',
      icon: '🎨',
      type: 'section',
      children: [
        { id: 'seo-sites', label: 'SEO Sites', icon: '🌐' },
        { id: 'google-perfil', label: 'Google Perfil', icon: '📍' },
        { id: 'redes-sociais', label: 'Redes Sociais', icon: '📱' },
        { id: 'trafego-pago', label: 'Tráfego Pago', icon: '💰' }
      ]
    },
    {
      id: 'gestao-interna',
      label: 'Gestão Interna',
      icon: '⚙️',
      type: 'section',
      children: [
        { id: 'captacao-leads-interno', label: 'Captação de Leads', icon: '🎯' },
        { id: 'sucesso-cliente', label: 'Sucesso do Cliente', icon: '🤝' },
        { id: 'relatorios-interno', label: 'Relatórios', icon: '📊' },
        { id: 'gestao-equipe', label: 'Gestão de Equipe', icon: '👥' },
        { id: 'contratos', label: 'Contratos', icon: '📄' },
        { id: 'financeiro', label: 'Financeiro', icon: '💳' },
        { id: 'precificacao-ia', label: 'Precificação com IA', icon: '🤖' },
        { id: 'metas', label: 'Metas', icon: '🎯' },
        { id: 'marketing-interno', label: 'Marketing Interno', icon: '📢' },
        { id: 'whatsapp', label: 'WhatsApp Integrado', icon: '💬' },
        { id: 'entrega-otimizacao', label: 'Entrega de Otimização', icon: '🚀' }
      ]
    }
  ];

  const handleItemClick = (item) => {
    if (item.type === 'section') {
      toggleSection(item.id);
    } else {
      setCurrentPage(item.id);
    }
  };

  return (
    <>
      {/* Overlay para mobile */}
      {isOpen && (
        <div 
          className="sidebar-overlay"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <div className="logo-section">
            <div className="logo">✨</div>
            <h2 className="logo-text">Click Leads</h2>
          </div>
          <button 
            className="sidebar-toggle"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? '←' : '→'}
          </button>
        </div>

        <nav className="sidebar-nav">
          <ul className="nav-list">
            {menuItems.map((item) => (
              <li key={item.id} className="nav-item">
                <button
                  className={`nav-link ${
                    item.type === 'page' && currentPage === item.id ? 'active' : ''
                  } ${item.type === 'section' ? 'section-header' : ''}`}
                  onClick={() => handleItemClick(item)}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                  {item.type === 'section' && (
                    <span className={`expand-icon ${expandedSections[item.id] ? 'expanded' : ''}`}>
                      ▼
                    </span>
                  )}
                </button>

                {/* Submenu para seções */}
                {item.type === 'section' && expandedSections[item.id] && (
                  <ul className="submenu">
                    {item.children.map((child) => (
                      <li key={child.id} className="submenu-item">
                        <button
                          className={`submenu-link ${currentPage === child.id ? 'active' : ''}`}
                          onClick={() => setCurrentPage(child.id)}
                        >
                          <span className="submenu-icon">{child.icon}</span>
                          <span className="submenu-label">{child.label}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">👤</div>
            <div className="user-details">
              <span className="user-name">Admin</span>
              <span className="user-role">Administrador</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

