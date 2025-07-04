import React, { useState, useEffect } from 'react';
import './Pages.css';

const Relatorios = () => {
  const [relatorios, setRelatorios] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [filters, setFilters] = useState({
    cliente_id: '',
    tipo_relatorio: '',
    status_envio: ''
  });
  const [formData, setFormData] = useState({
    cliente_id: '',
    tipo_relatorio: '',
    periodicidade: 'mensal',
    conteudo: ''
  });

  const tiposRelatorio = [
    'SEO Mensal',
    'Google Perfis',
    'Tráfego Pago',
    'Redes Sociais',
    'Captação de Leads',
    'Performance Geral',
    'Relatório Personalizado'
  ];

  const periodicidades = [
    { value: 'diario', label: 'Diário' },
    { value: 'semanal', label: 'Semanal' },
    { value: 'mensal', label: 'Mensal' },
    { value: 'trimestral', label: 'Trimestral' }
  ];

  const statusEnvio = [
    { value: 'pendente', label: 'Pendente' },
    { value: 'enviado', label: 'Enviado' },
    { value: 'visualizado', label: 'Visualizado' }
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Carregar clientes
      const clientesResponse = await fetch('/api/clientes');
      if (clientesResponse.ok) {
        const clientesData = await clientesResponse.json();
        setClientes(clientesData);
      }

      // Carregar relatórios (simulado - em produção seria uma API real)
      const relatoriosSimulados = [
        {
          id: '1',
          cliente_id: clientesData[0]?.id,
          cliente_nome: clientesData[0]?.nome,
          tipo_relatorio: 'SEO Mensal',
          status_envio: 'enviado',
          periodicidade: 'mensal',
          data_geracao: new Date().toISOString(),
          data_envio: new Date().toISOString(),
          conteudo: 'Relatório de SEO com métricas de posicionamento e tráfego orgânico'
        },
        {
          id: '2',
          cliente_id: clientesData[1]?.id,
          cliente_nome: clientesData[1]?.nome,
          tipo_relatorio: 'Google Perfis',
          status_envio: 'pendente',
          periodicidade: 'mensal',
          data_geracao: new Date().toISOString(),
          conteudo: 'Relatório de performance do Google Meu Negócio'
        }
      ];
      setRelatorios(relatoriosSimulados);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Simular criação de relatório
      const novoRelatorio = {
        id: Date.now().toString(),
        ...formData,
        cliente_nome: clientes.find(c => c.id === formData.cliente_id)?.nome,
        status_envio: 'pendente',
        data_geracao: new Date().toISOString()
      };

      setRelatorios([...relatorios, novoRelatorio]);
      setShowModal(false);
      setFormData({
        cliente_id: '',
        tipo_relatorio: '',
        periodicidade: 'mensal',
        conteudo: ''
      });
    } catch (error) {
      console.error('Erro ao criar relatório:', error);
    }
  };

  const handleEnviarRelatorio = async (relatorioId) => {
    try {
      // Simular envio de relatório
      setRelatorios(relatorios.map(r => 
        r.id === relatorioId 
          ? { ...r, status_envio: 'enviado', data_envio: new Date().toISOString() }
          : r
      ));
    } catch (error) {
      console.error('Erro ao enviar relatório:', error);
    }
  };

  const filteredRelatorios = relatorios.filter(relatorio => {
    if (filters.cliente_id && relatorio.cliente_id !== filters.cliente_id) return false;
    if (filters.tipo_relatorio && relatorio.tipo_relatorio !== filters.tipo_relatorio) return false;
    if (filters.status_envio && relatorio.status_envio !== filters.status_envio) return false;
    return true;
  });

  if (loading) {
    return (
      <div className="page-loading">
        <div className="loading-spinner"></div>
        <p>Carregando relatórios...</p>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-title-section">
          <h1 className="page-title">
            <span className="page-icon">📊</span>
            Gestão de Relatórios
          </h1>
          <p className="page-subtitle">
            Crie e gerencie relatórios para seus clientes
          </p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => setShowModal(true)}
        >
          <span>+</span>
          Novo Relatório
        </button>
      </div>

      <div className="page-stats">
        <div className="stat-item">
          <span className="stat-number">{relatorios.length}</span>
          <span className="stat-label">Total de Relatórios</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{relatorios.filter(r => r.status_envio === 'pendente').length}</span>
          <span className="stat-label">Pendentes</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{relatorios.filter(r => r.status_envio === 'enviado').length}</span>
          <span className="stat-label">Enviados</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{relatorios.filter(r => r.periodicidade === 'mensal').length}</span>
          <span className="stat-label">Mensais</span>
        </div>
      </div>

      {/* Filtros */}
      <div className="filters-section">
        <div className="filters-grid">
          <div className="filter-group">
            <label className="filter-label">Cliente</label>
            <select
              className="select"
              value={filters.cliente_id}
              onChange={(e) => setFilters({...filters, cliente_id: e.target.value})}
            >
              <option value="">Todos os clientes</option>
              {clientes.map(cliente => (
                <option key={cliente.id} value={cliente.id}>
                  {cliente.nome}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label className="filter-label">Tipo de Relatório</label>
            <select
              className="select"
              value={filters.tipo_relatorio}
              onChange={(e) => setFilters({...filters, tipo_relatorio: e.target.value})}
            >
              <option value="">Todos os tipos</option>
              {tiposRelatorio.map(tipo => (
                <option key={tipo} value={tipo}>
                  {tipo}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label className="filter-label">Status</label>
            <select
              className="select"
              value={filters.status_envio}
              onChange={(e) => setFilters({...filters, status_envio: e.target.value})}
            >
              <option value="">Todos os status</option>
              {statusEnvio.map(status => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <button 
              className="btn btn-secondary"
              onClick={() => setFilters({ cliente_id: '', tipo_relatorio: '', status_envio: '' })}
            >
              Limpar Filtros
            </button>
          </div>
        </div>
      </div>

      <div className="page-content">
        {filteredRelatorios.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📊</div>
            <h3>Nenhum relatório encontrado</h3>
            <p>Comece criando relatórios para seus clientes</p>
            <button 
              className="btn btn-primary"
              onClick={() => setShowModal(true)}
            >
              Criar Relatório
            </button>
          </div>
        ) : (
          <div className="data-grid">
            {filteredRelatorios.map((relatorio) => (
              <div key={relatorio.id} className="data-card">
                <div className="card-header">
                  <h3 className="card-title">{relatorio.tipo_relatorio}</h3>
                  <span className={`status-badge ${relatorio.status_envio}`}>
                    {statusEnvio.find(s => s.value === relatorio.status_envio)?.label}
                  </span>
                </div>
                <div className="card-content">
                  <div className="info-item">
                    <span className="info-label">Cliente:</span>
                    <span className="info-value">{relatorio.cliente_nome}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Periodicidade:</span>
                    <span className="info-value">
                      {periodicidades.find(p => p.value === relatorio.periodicidade)?.label}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Gerado em:</span>
                    <span className="info-value">
                      {new Date(relatorio.data_geracao).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  {relatorio.data_envio && (
                    <div className="info-item">
                      <span className="info-label">Enviado em:</span>
                      <span className="info-value">
                        {new Date(relatorio.data_envio).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  )}
                  {relatorio.conteudo && (
                    <div className="info-item" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                      <span className="info-label">Conteúdo:</span>
                      <span className="info-value" style={{ marginTop: '4px', fontSize: '0.85rem' }}>
                        {relatorio.conteudo}
                      </span>
                    </div>
                  )}
                </div>
                <div className="card-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="card-date">
                    ID: {relatorio.id}
                  </span>
                  {relatorio.status_envio === 'pendente' && (
                    <button 
                      className="btn btn-success"
                      style={{ fontSize: '0.8rem', padding: '6px 12px' }}
                      onClick={() => handleEnviarRelatorio(relatorio.id)}
                    >
                      📤 Enviar
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal de cadastro */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Novo Relatório</h2>
              <button 
                className="modal-close"
                onClick={() => {
                  setShowModal(false);
                  setFormData({
                    cliente_id: '',
                    tipo_relatorio: '',
                    periodicidade: 'mensal',
                    conteudo: ''
                  });
                }}
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label className="form-label">Cliente *</label>
                <select
                  className="select"
                  value={formData.cliente_id}
                  onChange={(e) => setFormData({...formData, cliente_id: e.target.value})}
                  required
                >
                  <option value="">Selecione um cliente</option>
                  {clientes.map(cliente => (
                    <option key={cliente.id} value={cliente.id}>
                      {cliente.nome}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Tipo de Relatório *</label>
                <select
                  className="select"
                  value={formData.tipo_relatorio}
                  onChange={(e) => setFormData({...formData, tipo_relatorio: e.target.value})}
                  required
                >
                  <option value="">Selecione o tipo</option>
                  {tiposRelatorio.map(tipo => (
                    <option key={tipo} value={tipo}>
                      {tipo}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Periodicidade</label>
                <select
                  className="select"
                  value={formData.periodicidade}
                  onChange={(e) => setFormData({...formData, periodicidade: e.target.value})}
                >
                  {periodicidades.map(periodo => (
                    <option key={periodo.value} value={periodo.value}>
                      {periodo.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Conteúdo/Observações</label>
                <textarea
                  className="input"
                  value={formData.conteudo}
                  onChange={(e) => setFormData({...formData, conteudo: e.target.value})}
                  placeholder="Descreva o conteúdo do relatório..."
                  rows="4"
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  Criar Relatório
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Relatorios;

