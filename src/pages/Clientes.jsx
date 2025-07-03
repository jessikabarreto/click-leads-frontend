import React, { useState, useEffect } from 'react';
import { apiRequest } from '../config';
import './Pages.css';

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCliente, setEditingCliente] = useState(null);
  const [formData, setFormData] = useState({
    nome: '',
    whatsapp: '',
    email: '',
    endereco: '',
    tipo_negocio: ''
  });

  useEffect(() => {
    loadClientes();
  }, []);

  const loadClientes = async () => {
    try {
      const data = await apiRequest('/clientes');
      setClientes(data);
    } catch (error) {
      console.error('Erro ao carregar clientes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = editingCliente ? `/clientes/${editingCliente.id}` : '/clientes';
      const method = editingCliente ? 'PUT' : 'POST';
      
      await apiRequest(endpoint, {
        method,
        body: JSON.stringify(formData),
      });

      loadClientes();
      setShowModal(false);
      setEditingCliente(null);
      setFormData({
        nome: '',
        whatsapp: '',
        email: '',
        endereco: '',
        tipo_negocio: ''
      });
    } catch (error) {
      console.error('Erro ao salvar cliente:', error);
      alert('Erro ao salvar cliente. Tente novamente.');
    }
  };

  const handleEdit = (cliente) => {
    setEditingCliente(cliente);
    setFormData({
      nome: cliente.nome,
      whatsapp: cliente.whatsapp,
      email: cliente.email || '',
      endereco: cliente.endereco || '',
      tipo_negocio: cliente.tipo_negocio || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
      try {
        await apiRequest(`/clientes/${id}`, {
          method: 'DELETE',
        });
        loadClientes();
      } catch (error) {
        console.error('Erro ao excluir cliente:', error);
        alert('Erro ao excluir cliente. Tente novamente.');
      }
    }
  };

  if (loading) {
    return (
      <div className="page-loading">
        <div className="loading-spinner"></div>
        <p>Carregando clientes...</p>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-title-section">
          <h1 className="page-title">
            <span className="page-icon">👥</span>
            Gestão de Clientes
          </h1>
          <p className="page-subtitle">
            Gerencie seus clientes e acompanhe seus projetos
          </p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => setShowModal(true)}
        >
          <span>+</span>
          Novo Cliente
        </button>
      </div>

      <div className="page-stats">
        <div className="stat-item">
          <span className="stat-number">{clientes.length}</span>
          <span className="stat-label">Total de Clientes</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{clientes.filter(c => c.projetos?.length > 0).length}</span>
          <span className="stat-label">Clientes Ativos</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{clientes.filter(c => !c.projetos?.length).length}</span>
          <span className="stat-label">Sem Projetos</span>
        </div>
      </div>

      <div className="page-content">
        {clientes.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">👥</div>
            <h3>Nenhum cliente cadastrado</h3>
            <p>Comece adicionando seu primeiro cliente</p>
            <button 
              className="btn btn-primary"
              onClick={() => setShowModal(true)}
            >
              Adicionar Cliente
            </button>
          </div>
        ) : (
          <div className="data-grid">
            {clientes.map((cliente) => (
              <div key={cliente.id} className="data-card">
                <div className="card-header">
                  <h3 className="card-title">{cliente.nome}</h3>
                  <div className="card-actions">
                    <button 
                      className="btn-icon"
                      onClick={() => handleEdit(cliente)}
                      title="Editar"
                    >
                      ✏️
                    </button>
                    <button 
                      className="btn-icon"
                      onClick={() => handleDelete(cliente.id)}
                      title="Excluir"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
                <div className="card-content">
                  <div className="info-item">
                    <span className="info-label">WhatsApp:</span>
                    <span className="info-value">{cliente.whatsapp}</span>
                  </div>
                  {cliente.email && (
                    <div className="info-item">
                      <span className="info-label">Email:</span>
                      <span className="info-value">{cliente.email}</span>
                    </div>
                  )}
                  {cliente.tipo_negocio && (
                    <div className="info-item">
                      <span className="info-label">Tipo de Negócio:</span>
                      <span className="info-value">{cliente.tipo_negocio}</span>
                    </div>
                  )}
                </div>
                <div className="card-footer">
                  <span className="card-date">
                    Cadastrado em {new Date(cliente.data_criacao).toLocaleDateString('pt-BR')}
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
              <h2>{editingCliente ? 'Editar Cliente' : 'Novo Cliente'}</h2>
              <button 
                className="modal-close"
                onClick={() => {
                  setShowModal(false);
                  setEditingCliente(null);
                  setFormData({
                    nome: '',
                    whatsapp: '',
                    email: '',
                    endereco: '',
                    tipo_negocio: ''
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
              <div className="form-group">
                <label className="form-label">WhatsApp *</label>
                <input
                  type="text"
                  className="input"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                  placeholder="(11) 99999-9999"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="input"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Tipo de Negócio</label>
                <input
                  type="text"
                  className="input"
                  value={formData.tipo_negocio}
                  onChange={(e) => setFormData({...formData, tipo_negocio: e.target.value})}
                  placeholder="Ex: Restaurante, Clínica, Loja..."
                />
              </div>
              <div className="form-group">
                <label className="form-label">Endereço</label>
                <textarea
                  className="input"
                  value={formData.endereco}
                  onChange={(e) => setFormData({...formData, endereco: e.target.value})}
                  rows="3"
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingCliente ? 'Atualizar' : 'Cadastrar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Clientes;

