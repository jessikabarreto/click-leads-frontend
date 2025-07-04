import React, { useState, useEffect } from 'react';
import { apiRequest } from '../config';
import './Pages.css';

const GestaoInterna = ({ categoria = null }) => {
  const [itens, setItens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    categoria: categoria || 'captacao_leads',
    status: 'ativo',
    configuracao: {}
  });

  const categorias = [
    { value: 'captacao_leads', label: 'Captação de Leads', icon: '🎯' },
    { value: 'sucesso_cliente', label: 'Sucesso do Cliente', icon: '🤝' },
    { value: 'relatorios', label: 'Relatórios', icon: '📊' },
    { value: 'gestao_equipe', label: 'Gestão de Equipe', icon: '👥' },
    { value: 'contratos', label: 'Contratos', icon: '📄' },
    { value: 'financeiro', label: 'Financeiro', icon: '💳' },
    { value: 'precificacao_ia', label: 'Precificação com IA', icon: '🤖' },
    { value: 'metas', label: 'Metas', icon: '🎯' },
    { value: 'marketing_interno', label: 'Marketing Interno', icon: '📢' },
    { value: 'whatsapp', label: 'WhatsApp Integrado', icon: '💬' },
    { value: 'entrega_otimizacao', label: 'Entrega de Otimização', icon: '🚀' }
  ];

  useEffect(() => {
    loadItens();
  }, [categoria]);

  const loadItens = async () => {
    try {
      const params = categoria ? `?categoria=${categoria}` : '';
      const data = await apiRequest(`/gestao-interna${params}`);
      setItens(data);
    } catch (error) {
      console.error('Erro ao carregar itens:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = editingItem ? `/gestao-interna/${editingItem.id}` : '/gestao-interna';
      const method = editingItem ? 'PUT' : 'POST';

      await apiRequest(endpoint, {
        method,
        body: JSON.stringify(formData),
      });

      loadItens();
      setShowModal(false);
      setEditingItem(null);
      setFormData({
        nome: '',
        descricao: '',
        categoria: categoria || 'captacao_leads',
        status: 'ativo',
        configuracao: {}
      });
    } catch (error) {
      console.error('Erro ao salvar item:', error);
      alert('Erro ao salvar item. Tente novamente.');
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      nome: item.nome,
      descricao: item.descricao || '',
      categoria: item.categoria,
      status: item.status,
      configuracao: item.configuracao || {}
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este item?')) {
      try {
        await apiRequest(`/gestao-interna/${id}`, {
          method: 'DELETE',
        });
        loadItens();
      } catch (error) {
        console.error('Erro ao excluir item:', error);
        alert('Erro ao excluir item. Tente novamente.');
      }
    }
  };

  const getCategoriaInfo = (cat) => {
    return categorias.find(c => c.value === cat) || { label: cat, icon: '⚙️' };
  };

  const filteredItens = categoria 
    ? itens.filter(item => item.categoria === categoria)
    : itens;

  if (loading) {
    return (
      <div className="page-loading">
        <div className="loading-spinner"></div>
        <p>Carregando gestão interna...</p>
      </div>
    );
  }

  const pageTitle = categoria 
    ? `${getCategoriaInfo(categoria).icon} ${getCategoriaInfo(categoria).label}`
    : '⚙️ Gestão Interna';

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-title-section">
          <h1 className="page-title">
            {pageTitle}
          </h1>
          <p className="page-subtitle">
            {categoria 
              ? `Configure e gerencie ${getCategoriaInfo(categoria).label.toLowerCase()}`
              : 'Configure e gerencie todos os processos internos da agência'
            }
          </p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => setShowModal(true)}
        >
          <span>+</span>
          Novo Item
        </button>
      </div>

      {!categoria && (
        <div className="page-stats">
          {categorias.slice(0, 4).map(cat => {
            const count = itens.filter(item => item.categoria === cat.value).length;
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
        {filteredItens.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">⚙️</div>
            <h3>Nenhum item encontrado</h3>
            <p>Comece configurando os processos internos</p>
            <button 
              className="btn btn-primary"
              onClick={() => setShowModal(true)}
            >
              Adicionar Item
            </button>
          </div>
        ) : (
          <div className="data-grid">
            {filteredItens.map((item) => {
              const catInfo = getCategoriaInfo(item.categoria);
              return (
                <div key={item.id} className="data-card internal-card">
                  <div className="card-header">
                    <div className="item-title">
                      <span className="item-icon">{catInfo.icon}</span>
                      <h3 className="card-title">{item.nome}</h3>
                    </div>
                    <div className="card-actions">
                      <button 
                        className="btn-icon"
                        onClick={() => handleEdit(item)}
                        title="Editar"
                      >
                        ✏️
                      </button>
                      <button 
                        className="btn-icon"
                        onClick={() => handleDelete(item.id)}
                        title="Excluir"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>

                  <div className="card-content">
                    <div className="item-category">
                      <span className={`category-badge ${item.categoria}`}>
                        {catInfo.label}
                      </span>
                    </div>

                    {item.descricao && (
                      <div className="item-description">
                        {item.descricao}
                      </div>
                    )}

                    {item.configuracao && Object.keys(item.configuracao).length > 0 && (
                      <div className="item-config">
                        <h4>Configurações:</h4>
                        {Object.entries(item.configuracao).map(([key, value]) => (
                          <div key={key} className="config-item">
                            <strong>{key.replace(/_/g, ' ')}:</strong>
                            <span>
                              {Array.isArray(value) ? value.join(', ') : String(value)}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="card-footer">
                    <span className="card-date">
                      Criado em {new Date(item.data_criacao).toLocaleDateString('pt-BR')}
                    </span>
                    <span className={`status-badge ${item.status}`}>
                      {item.status === 'ativo' ? 'Ativo' : 'Inativo'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>{editingItem ? 'Editar Item' : 'Novo Item'}</h2>
              <button 
                className="modal-close"
                onClick={() => {
                  setShowModal(false);
                  setEditingItem(null);
                  setFormData({
                    nome: '',
                    descricao: '',
                    categoria: categoria || 'captacao_leads',
                    status: 'ativo',
                    configuracao: {}
                  });
                }}
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label className="form-label">Nome *</label>
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
                  placeholder="Descreva o item..."
                />
              </div>

              <div className="form-group">
                <label className="form-label">Status</label>
                <select
                  className="select"
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                >
                  <option value="ativo">Ativo</option>
                  <option value="inativo">Inativo</option>
                </select>
              </div>

              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingItem ? 'Atualizar' : 'Cadastrar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GestaoInterna;

