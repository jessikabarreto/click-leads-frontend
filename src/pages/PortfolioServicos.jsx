import React, { useState, useEffect } from 'react';
import { apiRequest } from '../config';
import './Pages.css';

const PortfolioServicos = ({ categoria = null }) => {
  const [servicos, setServicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingServico, setEditingServico] = useState(null);
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    preco_base: '',
    categoria: categoria || 'seo_sites',
    detalhes: {}
  });

  const categorias = [
    { value: 'seo_sites', label: 'SEO Sites', icon: '🌐' },
    { value: 'google_perfil', label: 'Google Perfil', icon: '📍' },
    { value: 'redes_sociais', label: 'Redes Sociais', icon: '📱' },
    { value: 'trafego_pago', label: 'Tráfego Pago', icon: '💰' }
  ];

  useEffect(() => {
    loadServicos();
  }, [categoria]);

  const loadServicos = async () => {
    try {
      const params = categoria ? `?categoria=${categoria}` : '';
      const data = await apiRequest(`/portfolio-servicos${params}`);
      setServicos(data);
    } catch (error) {
      console.error('Erro ao carregar serviços:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = editingServico ? `/portfolio-servicos/${editingServico.id}` : '/portfolio-servicos';
      const method = editingServico ? 'PUT' : 'POST';
      
      await apiRequest(endpoint, {
        method,
        body: JSON.stringify({
          ...formData,
          preco_base: formData.preco_base ? parseFloat(formData.preco_base) : null
        }),
      });

      loadServicos();
      setShowModal(false);
      setEditingServico(null);
      setFormData({
        nome: '',
        descricao: '',
        preco_base: '',
        categoria: categoria || 'seo_sites',
        detalhes: {}
      });
    } catch (error) {
      console.error('Erro ao salvar serviço:', error);
      alert('Erro ao salvar serviço. Tente novamente.');
    }
  };

  const handleEdit = (servico) => {
    setEditingServico(servico);
    setFormData({
      nome: servico.nome,
      descricao: servico.descricao || '',
      preco_base: servico.preco_base ? servico.preco_base.toString() : '',
      categoria: servico.categoria,
      detalhes: servico.detalhes || {}
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este serviço?')) {
      try {
        await apiRequest(`/portfolio-servicos/${id}`, {
          method: 'DELETE',
        });
        loadServicos();
      } catch (error) {
        console.error('Erro ao excluir serviço:', error);
        alert('Erro ao excluir serviço. Tente novamente.');
      }
    }
  };

  const formatCurrency = (value) => {
    if (!value) return 'Não definido';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getCategoriaInfo = (cat) => {
    return categorias.find(c => c.value === cat) || { label: cat, icon: '📋' };
  };

  const filteredServicos = categoria 
    ? servicos.filter(s => s.categoria === categoria)
    : servicos;

  if (loading) {
    return (
      <div className="page-loading">
        <div className="loading-spinner"></div>
        <p>Carregando portfólio de serviços...</p>
      </div>
    );
  }

  const pageTitle = categoria 
    ? `${getCategoriaInfo(categoria).icon} ${getCategoriaInfo(categoria).label}`
    : '🎨 Portfólio de Serviços';

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-title-section">
          <h1 className="page-title">
            {pageTitle}
          </h1>
          <p className="page-subtitle">
            {categoria 
              ? `Gerencie os serviços de ${getCategoriaInfo(categoria).label.toLowerCase()}`
              : 'Gerencie todos os serviços oferecidos pela agência'
            }
          </p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => setShowModal(true)}
        >
          <span>+</span>
          Novo Serviço
        </button>
      </div>

      {!categoria && (
        <div className="page-stats">
          {categorias.map(cat => {
            const count = servicos.filter(s => s.categoria === cat.value).length;
            return (
              <div key={cat.value} className="stat-item">
                <span className="stat-icon">{cat.icon}</span>
                <span className="stat-number">{count}</span>
                <span className="stat-label">{cat.label}</span>
              </div>
            );
          })}
        </div>
      )}

      <div className="page-content">
        {filteredServicos.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🎨</div>
            <h3>Nenhum serviço encontrado</h3>
            <p>Comece adicionando serviços ao seu portfólio</p>
            <button 
              className="btn btn-primary"
              onClick={() => setShowModal(true)}
            >
              Adicionar Serviço
            </button>
          </div>
        ) : (
          <div className="data-grid">
            {filteredServicos.map((servico) => {
              const catInfo = getCategoriaInfo(servico.categoria);
              return (
                <div key={servico.id} className="data-card service-card">
                  <div className="card-header">
                    <div className="service-title">
                      <span className="service-icon">{catInfo.icon}</span>
                      <h3 className="card-title">{servico.nome}</h3>
                    </div>
                    <div className="card-actions">
                      <button 
                        className="btn-icon"
                        onClick={() => handleEdit(servico)}
                        title="Editar"
                      >
                        ✏️
                      </button>
                      <button 
                        className="btn-icon"
                        onClick={() => handleDelete(servico.id)}
                        title="Excluir"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                  
                  <div className="card-content">
                    <div className="service-category">
                      <span className={`category-badge ${servico.categoria}`}>
                        {catInfo.label}
                      </span>
                    </div>
                    
                    {servico.descricao && (
                      <div className="service-description">
                        {servico.descricao}
                      </div>
                    )}
                    
                    <div className="service-price">
                      <span className="price-label">Preço Base:</span>
                      <span className={`price-value ${servico.preco_base ? 'defined' : 'undefined'}`}>
                        {formatCurrency(servico.preco_base)}
                      </span>
                    </div>
                    
                    {servico.detalhes && Object.keys(servico.detalhes).length > 0 && (
                      <div className="service-details">
                        <h4>Detalhes:</h4>
                        {servico.detalhes.inclui && (
                          <div className="detail-item">
                            <strong>Inclui:</strong> {servico.detalhes.inclui.join(', ')}
                          </div>
                        )}
                        {servico.detalhes.prazo_entrega && (
                          <div className="detail-item">
                            <strong>Prazo:</strong> {servico.detalhes.prazo_entrega}
                          </div>
                        )}
                        {servico.detalhes.garantia && (
                          <div className="detail-item">
                            <strong>Garantia:</strong> {servico.detalhes.garantia}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div className="card-footer">
                    <span className="card-date">
                      Criado em {new Date(servico.data_criacao).toLocaleDateString('pt-BR')}
                    </span>
                    <span className={`status-badge ${servico.status}`}>
                      {servico.status === 'ativo' ? 'Ativo' : 'Inativo'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal de cadastro/edição */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>{editingServico ? 'Editar Serviço' : 'Novo Serviço'}</h2>
              <button 
                className="modal-close"
                onClick={() => {
                  setShowModal(false);
                  setEditingServico(null);
                  setFormData({
                    nome: '',
                    descricao: '',
                    preco_base: '',
                    categoria: categoria || 'seo_sites',
                    detalhes: {}
                  });
                }}
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label className="form-label">Nome do Serviço *</label>
                <input
                  type="text"
                  className="input"
                  value={formData.nome}
                  onChange={(e) => setFormData({...formData, nome: e.target.value})}
                  required
                />
              </div>
              
              {!categoria && (
                <div className="form-group">
                  <label className="form-label">Categoria *</label>
                  <select
                    className="select"
                    value={formData.categoria}
                    onChange={(e) => setFormData({...formData, categoria: e.target.value})}
                    required
                  >
                    {categorias.map(cat => (
                      <option key={cat.value} value={cat.value}>
                        {cat.icon} {cat.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              
              <div className="form-group">
                <label className="form-label">Descrição</label>
                <textarea
                  className="input"
                  value={formData.descricao}
                  onChange={(e) => setFormData({...formData, descricao: e.target.value})}
                  rows="4"
                  placeholder="Descreva o serviço..."
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Preço Base (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  className="input"
                  value={formData.preco_base}
                  onChange={(e) => setFormData({...formData, preco_base: e.target.value})}
                  placeholder="0,00"
                />
              </div>
              
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingServico ? 'Atualizar' : 'Cadastrar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioServicos;

