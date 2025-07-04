import React, { useState, useEffect } from 'react';
import './Pages.css';

const Leads = () => {
const [leads, setLeads] = useState([]);
const [loading, setLoading] = useState(true);
const [showModal, setShowModal] = useState(false);
const [editingLead, setEditingLead] = useState(null);
const [filters, setFilters] = useState({
status: '',
origem: ''
});
const [formData, setFormData] = useState({
nome: '',
whatsapp: '',
origem: '',
status: 'novo'
});

const statusOptions = [
{ value: 'novo', label: 'Novo' },
{ value: 'qualificado', label: 'Qualificado' },
{ value: 'duplicado', label: 'Duplicado' },
{ value: 'sem_whatsapp_ativo', label: 'WhatsApp Inativo' }
];

const origemOptions = [
{ value: 'Meta Ads', label: 'Meta Ads' },
{ value: 'Google Ads', label: 'Google Ads' },
{ value: 'TikTok Ads', label: 'TikTok Ads' },
{ value: 'Google Maps', label: 'Google Maps' },
{ value: 'Indicação', label: 'Indicação' },
{ value: 'Site', label: 'Site' }
];

useEffect(() => {
loadLeads();
}, [filters]);

const loadLeads = async () => {
try {
const params = new URLSearchParams();
if (filters.status) params.append('status', filters.status);
if (filters.origem) params.append('origem', filters.origem);

  const response = await fetch(`/api/leads?${params}`);
  if (response.ok) {
    const data = await response.json();
    setLeads(data);
  }
} catch (error) {
  console.error('Erro ao carregar leads:', error);
} finally {
  setLoading(false);
}

};

const isValidPhone = (phone) => {
return /^ \d{4,5}-\d{4}$/.test(phone);
};

const handleSubmit = async (e) => {
e.preventDefault();

if (!isValidPhone(formData.whatsapp)) {
  alert('Por favor, insira um número de WhatsApp válido no formato (11) 99999-9999');
  return;
}

try {
  const method = editingLead ? 'PUT' : 'POST';
  const endpoint = editingLead ? `/api/leads/${editingLead.id}` : '/api/leads';

  const response = await fetch(endpoint, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  if (response.ok) {
    setShowModal(false);
    setEditingLead(null);
    setFormData({ nome: '', whatsapp: '', origem: '', status: 'novo' });
    setFilters({ ...filters }); // Força reload
  }
} catch (error) {
  console.error('Erro ao salvar lead:', error);
}

};

const handleStatusChange = async (leadId, newStatus) => {
try {
const response = await fetch(/api/leads/${leadId}, {
method: 'PUT',
headers: {
'Content-Type': 'application/json',
},
body: JSON.stringify({ status: newStatus }),
});

  if (response.ok) {
    loadLeads();
  }
} catch (error) {
  console.error('Erro ao atualizar status:', error);
}

};

const handleEdit = (lead) => {
setEditingLead(lead);
setFormData({
nome: lead.nome || '',
whatsapp: lead.whatsapp || '',
origem: lead.origem || '',
status: lead.status || 'novo'
});
setShowModal(true);
};

const getStatusColor = (status) => {
const colors = {
'novo': 'primary',
'qualificado': 'success',
'duplicado': 'warning',
'sem_whatsapp_ativo': 'error'
};
return colors[status] || 'primary';
};

const filteredLeads = leads.filter(lead => {
if (filters.status && lead.status !== filters.status) return false;
if (filters.origem && lead.origem !== filters.origem) return false;
return true;
});

if (loading) {
return (


Carregando leads...

);
}

return (




🎯
Captação de Leads


Gerencie seus leads e acompanhe as conversões


<button
className="btn btn-primary"
onClick={() => {
setShowModal(true);
setEditingLead(null);
setFormData({ nome: '', whatsapp: '', origem: '', status: 'novo' });
}}
>
+
Novo Lead



  <div className="page-stats">
    <div className="stat-item">
      <span className="stat-number">{leads.length}</span>
      <span className="stat-label">Total de Leads</span>
    </div>
    <div className="stat-item">
      <span className="stat-number">{leads.filter(l => l.status === 'novo').length}</span>
      <span className="stat-label">Novos</span>
    </div>
    <div className="stat-item">
      <span className="stat-number">{leads.filter(l => l.status === 'qualificado').length}</span>
      <span className="stat-label">Qualificados</span>
    </div>
    <div className="stat-item">
      <span className="stat-number">{leads.filter(l => l.status === 'duplicado').length}</span>
      <span className="stat-label">Duplicados</span>
    </div>
  </div>

  {/* Filtros */}
  <div className="filters-section">
    <div className="filters-grid">
      <div className="filter-group">
        <label className="filter-label">Status</label>
        <select
          className="select"
          value={filters.status}
          onChange={(e) => setFilters({...filters, status: e.target.value})}
        >
          <option value="">Todos os status</option>
          {statusOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="filter-group">
        <label className="filter-label">Origem</label>
        <select
          className="select"
          value={filters.origem}
          onChange={(e) => setFilters({...filters, origem: e.target.value})}
        >
          <option value="">Todas as origens</option>
          {origemOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="filter-group">
        <button 
          className="btn btn-secondary"
          onClick={() => setFilters({ status: '', origem: '' })}
        >
          Limpar Filtros
        </button>
      </div>
    </div>
  </div>

  <div className="page-content">
    {filteredLeads.length === 0 ? (
      <div className="empty-state">
        <div className="empty-icon">🎯</div>
        <h3>Nenhum lead encontrado</h3>
        <p>Comece captando seus primeiros leads</p>
        <button 
          className="btn btn-primary"
          onClick={() => setShowModal(true)}
        >
          Adicionar Lead
        </button>
      </div>
    ) : (
      <div className="data-grid">
        {filteredLeads.map((lead) => (
          <div key={lead.id} className="data-card">
            <div className="card-header">
              <h3 className="card-title">{lead.nome || 'Lead sem nome'}</h3>
              <span className={`status-badge ${lead.status}`}>
                {statusOptions.find(s => s.value === lead.status)?.label || lead.status}
              </span>
            </div>
            <div className="card-content">
              <div className="info-item">
                <span className="info-label">WhatsApp:</span>
                <span className="info-value">{lead.whatsapp}</span>
              </div>
              {lead.origem && (
                <div className="info-item">
                  <span className="info-label">Origem:</span>
                  <span className="info-value">{lead.origem}</span>
                </div>
              )}
              <div className="info-item">
                <span className="info-label">Status:</span>
                <select
                  className="select"
                  value={lead.status}
                  onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                  style={{ fontSize: '0.8rem', padding: '4px 8px' }}
                >
                  {statusOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="card-footer">
              <span className="card-date">
                Captado em {new Date(lead.data_captacao).toLocaleDateString('pt-BR')}
              </span>
              <button 
                className="btn btn-secondary btn-sm"
                onClick={() => handleEdit(lead)}
              >
                ✏️ Editar
              </button>
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
          <h2>{editingLead ? 'Editar Lead' : 'Novo Lead'}</h2>
          <button 
            className="modal-close"
            onClick={() => {
              setShowModal(false);
              setEditingLead(null);
              setFormData({ nome: '', whatsapp: '', origem: '', status: 'novo' });
            }}
          >
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label className="form-label">Nome</label>
            <input
              type="text"
              className="input"
              value={formData.nome}
              onChange={(e) => setFormData({...formData, nome: e.target.value})}
              placeholder="Nome do lead (opcional)"
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
            <label className="form-label">Origem</label>
            <select
              className="select"
              value={formData.origem}
              onChange={(e) => setFormData({...formData, origem: e.target.value})}
            >
              <option value="">Selecione a origem</option>
              {origemOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Status</label>
            <select
              className="select"
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              {editingLead ? 'Atualizar Lead' : 'Cadastrar Lead'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )}
</div>

);
};

export default Leads;

const response = await fetch(`/api/leads?${params}`);
  if (response.ok) {
    const data = await response.json();
    setLeads(data);
  }
} catch (error) {
  console.error('Erro ao carregar leads:', error);
} finally {
  setLoading(false);
}};

const isValidPhone = (phone) => {
return /^ \d{4,5}-\d{4}$/.test(phone);
};

const handleSubmit = async (e) => {
e.preventDefault();
  if (!isValidPhone(formData.whatsapp)) {
  alert('Por favor, insira um número de WhatsApp válido no formato (11) 99999-9999');
  return;
}

try {
  const method = editingLead ? 'PUT' : 'POST';
  const endpoint = editingLead ? `/api/leads/${editingLead.id}` : '/api/leads';

  const response = await fetch(endpoint, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  if (response.ok) {
    setShowModal(false);
    setEditingLead(null);
    setFormData({ nome: '', whatsapp: '', origem: '', status: 'novo' });
    setFilters({ ...filters }); // Força reload
  }
} catch (error) {
  console.error('Erro ao salvar lead:', error);
}};

const handleStatusChange = async (leadId, newStatus) => {
try {
const response = await fetch(/api/leads/${leadId}, {
method: 'PUT',
headers: {
'Content-Type': 'application/json',
},
body: JSON.stringify({ status: newStatus }),
});
  if (response.ok) {
    loadLeads();
  }
} catch (error) {
  console.error('Erro ao atualizar status:', error);
}};

const handleEdit = (lead) => {
setEditingLead(lead);
setFormData({
nome: lead.nome || '',
whatsapp: lead.whatsapp || '',
origem: lead.origem || '',
status: lead.status || 'novo'
});
setShowModal(true);
};

const getStatusColor = (status) => {
const colors = {
'novo': 'primary',
'qualificado': 'success',
'duplicado': 'warning',
'sem_whatsapp_ativo': 'error'
};
return colors[status] || 'primary';
};

const filteredLeads = leads.filter(lead => {
if (filters.status && lead.status !== filters.status) return false;
if (filters.origem && lead.origem !== filters.origem) return false;
return true;
});

if (loading) {
return (


Carregando leads...

);
}

return (




🎯
Captação de Leads


Gerencie seus leads e acompanhe as conversões


<button
className="btn btn-primary"
onClick={() => {
setShowModal(true);
setEditingLead(null);
setFormData({ nome: '', whatsapp: '', origem: '', status: 'novo' });
}}
>
+
Novo Lead<div className="page-stats">
    <div className="stat-item">
      <span className="stat-number">{leads.length}</span>
      <span className="stat-label">Total de Leads</span>
    </div>
    <div className="stat-item">
      <span className="stat-number">{leads.filter(l => l.status === 'novo').length}</span>
      <span className="stat-label">Novos</span>
    </div>
    <div className="stat-item">
      <span className="stat-number">{leads.filter(l => l.status === 'qualificado').length}</span>
      <span className="stat-label">Qualificados</span>
    </div>
    <div className="stat-item">
      <span className="stat-number">{leads.filter(l => l.status === 'duplicado').length}</span>
      <span className="stat-label">Duplicados</span>
    </div>
  </div>

  {/* Filtros */}
  <div className="filters-section">
    <div className="filters-grid">
      <div className="filter-group">
        <label className="filter-label">Status</label>
        <select
          className="select"
          value={filters.status}
          onChange={(e) => setFilters({...filters, status: e.target.value})}
        >
          <option value="">Todos os status</option>
          {statusOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="filter-group">
        <label className="filter-label">Origem</label>
        <select
          className="select"
          value={filters.origem}
          onChange={(e) => setFilters({...filters, origem: e.target.value})}
        >
          <option value="">Todas as origens</option>
          {origemOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="filter-group">
        <button 
          className="btn btn-secondary"
          onClick={() => setFilters({ status: '', origem: '' })}
        >
          Limpar Filtros
        </button>
      </div>
    </div>
  </div>

  <div className="page-content">
    {filteredLeads.length === 0 ? (
      <div className="empty-state">
        <div className="empty-icon">🎯</div>
        <h3>Nenhum lead encontrado</h3>
        <p>Comece captando seus primeiros leads</p>
        <button 
          className="btn btn-primary"
          onClick={() => setShowModal(true)}
        >
          Adicionar Lead
        </button>
      </div>
    ) : (
      <div className="data-grid">
        {filteredLeads.map((lead) => (
          <div key={lead.id} className="data-card">
            <div className="card-header">
              <h3 className="card-title">{lead.nome || 'Lead sem nome'}</h3>
              <span className={`status-badge ${lead.status}`}>
                {statusOptions.find(s => s.value === lead.status)?.label || lead.status}
              </span>
            </div>
            <div className="card-content">
              <div className="info-item">
                <span className="info-label">WhatsApp:</span>
                <span className="info-value">{lead.whatsapp}</span>
              </div>
              {lead.origem && (
                <div className="info-item">
                  <span className="info-label">Origem:</span>
                  <span className="info-value">{lead.origem}</span>
                </div>
              )}
              <div className="info-item">
                <span className="info-label">Status:</span>
                <select
                  className="select"
                  value={lead.status}
                  onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                  style={{ fontSize: '0.8rem', padding: '4px 8px' }}
                >
                  {statusOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="card-footer">
              <span className="card-date">
                Captado em {new Date(lead.data_captacao).toLocaleDateString('pt-BR')}
              </span>
              <button 
                className="btn btn-secondary btn-sm"
                onClick={() => handleEdit(lead)}
              >
                ✏️ Editar
              </button>
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
          <h2>{editingLead ? 'Editar Lead' : 'Novo Lead'}</h2>
          <button 
            className="modal-close"
            onClick={() => {
              setShowModal(false);
              setEditingLead(null);
              setFormData({ nome: '', whatsapp: '', origem: '', status: 'novo' });
            }}
          >
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label className="form-label">Nome</label>
            <input
              type="text"
              className="input"
              value={formData.nome}
              onChange={(e) => setFormData({...formData, nome: e.target.value})}
              placeholder="Nome do lead (opcional)"
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
            <label className="form-label">Origem</label>
            <select
              className="select"
              value={formData.origem}
              onChange={(e) => setFormData({...formData, origem: e.target.value})}
            >
              <option value="">Selecione a origem</option>
              {origemOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Status</label>
            <select
              className="select"
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              {editingLead ? 'Atualizar Lead' : 'Cadastrar Lead'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )}
</div>);
};

export default Leads;

