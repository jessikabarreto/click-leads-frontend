import React, { useState, useEffect } from 'react';
import './Pages.css';

const Servicos = () => {
  const [servicos, setServicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingServico, setEditingServico] = useState(null);
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    preco_base: ''
  });

  useEffect(() => {
    loadServicos();
  }, []);

  const loadServicos = async () => {
    try {
      const response = await fetch('/api/servicos');
      if (response.ok) {
        const data = await response.json();
        setServicos(data);
      }
    } catch (error) {
      console.error('Erro ao carregar serviços:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingServico ? `/api/servicos/${editingServico.id}` : '/api/servicos';
      const method = editingServico ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          preco_base: formData.preco_base ? parseFloat(formData.preco_base) : null
        }),
      });

      if (response.ok) {
        loadServicos();
        setShowModal(false);
        setEditingServico(null);
        setFormData({
          nome: '',
          descricao: '',
          preco_base: ''
        });
      }
    } catch (error) {
      console.error('Erro ao salvar serviço:', error);
    }
  };

  const handleEdit = (servico) => {
    setEditingServico(servico);
    setFormData({
      nome: servico.nome,
      descricao: servico.descricao || '',
      preco_base: servico.preco_base ? servico.preco_base.toString() : ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este serviço?')) {
      try {
        const response = await fetch(`/api/servicos/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          loadServicos();
        } else {
          const error = await response.json();
          alert(error.error || 'Erro ao excluir serviço');
        }
      } catch (error) {
        console.error('Erro ao excluir serviço:', error);
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

  if (loading) {
    return (
      <div className="page-loading">
        <div className="loading-spinner"></div>
        <p>Carregando serviços...</p>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-title-section">
          <h1 className="page-title">
            <span className="page-icon">⚙️</span>
            Gestão de Serviços
          </h1>
          <p className="page-subtitle">
            Configure os serviços oferecidos pela sua agência
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

      <div className="page-stats">
        <div className="stat-item">
          <span className="stat-number">{servicos.length}</span>
          <span className="stat-label">Total de Serviços</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{servicos.filter(s => s.preco_base).length}</span>
          <span className="stat-label">Com Preço Definido</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">
            {formatCurrency(
              servicos.reduce((sum, s) => sum + (s.preco_base || 0), 0) / servicos.length
            )}
          </span>
          <span className="stat-label">Preço Médio</span>
        </div>
      </div>

      <div className="page-content">
        {servicos.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">⚙️</div>
            <h3>Nenhum serviço cadastrado</h3>
            <p>Comece adicionando os serviços da sua agência</p>
            <button 
              className="btn btn-primary"
              onClick={() => setShowModal(true)}
            >
              Adicionar Serviço
            </button>
          </div>
        ) : (
          <div className="data-grid">
            {servicos.map((servico) => (
              <div key={servico.id} className="data-card">
                <div className="card-header">
                  <h3 className="card-title">{servico.nome}</h3>
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
                  {servico.descricao && (
                    <div className="info-item" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                      <span className="info-label">Descrição:</span>
                      <span className="info-value" style={{ marginTop: '4px' }}>
                        {servico.descricao}
                      </span>
                    </div>
                  )}
                  <div className="info-item">
                    <span className="info-label">Preço Base:</span>
                    <span className="info-value" style={{ 
                      fontWeight: '600', 
                      color: servico.preco_base ? 'var(--success-color)' : 'var(--text-tertiary)' 
                    }}>
                      {formatCurrency(servico.preco_base)}
                    </span>
                  </div>
                </div>
                <div className="card-footer">
                  <span className="card-date">
                    Criado em {new Date(servico.data_criacao).toLocaleDateString('pt-BR')}
                  </span>
                </div>
              </div>
            ))}
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
                    preco_base: ''
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
                  placeholder="Ex: SEO Sites, Google Perfis..."
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Descrição</label>
                <textarea
                  className="input"
                  value={formData.descricao}
                  onChange={(e) => setFormData({...formData, descricao: e.target.value})}
                  placeholder="Descreva o que este serviço inclui..."
                  rows="4"
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
                <small style={{ color: 'var(--text-tertiary)', fontSize: '0.8rem', marginTop: '4px' }}>
                  Deixe em branco se o preço for variável
                </small>
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

export default Servicos;

